import {
  processNotification,
  processNotificationOnDelete,
} from "@/utils/notifications";
import {
  ActionType,
  ResourceTypes,
  NODE_NAME
} from "@/utils/constants"
import {
  partnerLookUp,
  resourceIdLookup,
  fieldLookup,
  mutateActionAndDataRaw,
  getCompanyByRoundId,
  deleteMainTableRecord,
  insertActionDataChange,
  markDataRawAsInactive,
  insertDataDiscard,
} from "@/utils/submit-data";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../utils/cookie";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!["POST", "PUT", "DELETE"].includes(req.method as string))
    return res.status(405).send({ message: "Method is not allowed" });

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);

  const apiKey: string = req.body.partner_api_key;
  const resourceType: ResourceTypes = req.body.resource_type;
  const resourceIdentifier: Array<Record<string, any>> = req.body.resource_identifier;
  const resourceObj: Record<string, any> = req.body.resource;
  const forceUpdate: Boolean = req.body.force_update;
  let resourceIdDiscard, partnerIdDiscard;
  try {
    if (
      apiKey === undefined ||
      resourceIdentifier === undefined ||
      resourceObj === undefined ||
      resourceType === undefined
    )
      return res.status(400).send({ message: "Bad Request" });

    const partner = await partnerLookUp(apiKey);
    if (partner?.id === undefined) {
      if (!(user?.role === "admin")) {
        return res.status(401).send({ message: "Unauthorized Partner" });
      }
    }

    let identifierColumns: Array<string> = []
    for (const item of resourceIdentifier) {
      if (!item.field)
        continue;
      let identifierColumn = item.field;
      identifierColumns.push(identifierColumn);
      if (identifierColumn !== "id") {
        const lookupField = await fieldLookup(
          `${NODE_NAME[resourceType]}.${identifierColumn}`
        );
  
        if (!lookupField?.is_valid_identifier) {
          return res.status(400).send({
            identifier: identifierColumn,
            message: "Invalid identifier",
          });
        }
      }
    }


    const resourceId: number = await resourceIdLookup(resourceType, resourceIdentifier);
    if (resourceId === undefined && JSON.stringify(identifierColumns) !== JSON.stringify(['id']))
      return res.status(404).send({
        message: `Not found ${JSON.stringify(resourceIdentifier)}`,
      });
    resourceIdDiscard = resourceId;
    if (req.method === "DELETE") {
      await deleteMainTableRecord(resourceType, resourceId);
      const action = await insertActionDataChange(
        "Delete Data",
        resourceId,
        resourceType,
        {},
        user?.id
      );
      await markDataRawAsInactive(resourceType, resourceId);
      await processNotificationOnDelete(
        resourceType,
        resourceId,
        action?.id || 0,
        resourceObj
      );
      return res.send(resourceObj);
    }

    const partnerId: number = partner ? partner.id : 0;
    partnerIdDiscard = partnerId;
    let actionType: ActionType = "Change Data";

    // create a new one
    if (resourceId === undefined) {
      actionType = "Insert Data";
    }

    const properties = {...resourceObj};

    if (
      actionType === "Insert Data" &&
      ["companies", "vc_firms", "people", "events"].includes(resourceType) &&
      (!resourceObj?.library || resourceObj?.library?.length === 0)
    ) {
      properties.library = ["Web3"];
    }

    const insertResult = await mutateActionAndDataRaw(
      partnerId,
      user,
      NODE_NAME[resourceType],
      resourceId,
      properties,
      resourceType,
      actionType,
      forceUpdate,
    );

    if (resourceId === undefined) {
      if (
        resourceType === "investment_rounds" ||
        resourceType === "team_members"
      ) {
        await processNotification(
          resourceObj?.company_id,
          "companies",
          resourceType,
          actionType,
          insertResult?.actions 
        );
      }

      if (resourceType === "investors") {
        await processNotification(
          resourceObj?.vc_firm_id,
          "vc_firms",
          resourceType,
          actionType,
          insertResult?.actions
        );
      }

      if (resourceType === "investments") {
        if (resourceObj?.round_id) {
          const investmentRound = await getCompanyByRoundId(resourceObj.round_id);
          await processNotification(
            investmentRound?.company_id || 0,
            "companies",
            resourceType,
            actionType,
            insertResult?.actions
          );
        }

        await processNotification(
          resourceObj?.vc_firm_id,
          "vc_firms",
          resourceType,
          actionType,
          insertResult?.actions
        );
      }

      if (resourceType === "event_organization") {
        if (resourceObj?.company_id) {
          await processNotification(
            resourceObj.company_id,
            "companies",
            resourceType,
            actionType,
            insertResult?.actions
          );
        }
        if (resourceObj?.vc_firm_id) {
          await processNotification(
            resourceObj.vc_firm_id,
            "vc_firms",
            resourceType,
            actionType,
            insertResult?.actions
          );
        }
      }
    } else {
      // updated exists one
      if (resourceType === "companies" || resourceType === "vc_firms") {
        /** Insert notification */
        await processNotification(
          resourceId,
          resourceType,
          resourceType,
          actionType,
          insertResult?.actions
        );
      }
    }

    return res.send(insertResult);
  } catch (error: any) {
    if (error[0].extensions.code === "validation-failed") {
      let field = "";
      for (let key in resourceObj) {
        const errMessage = error[0].message;
        if (errMessage.includes(key)) {
          field = key;
        }
      }
      const dataObject = [
        {
          resource: resourceType,
          field,
          value: resourceObj[field],
          partner: partnerIdDiscard,
          accuracy_weight: 1,
          resource_id: resourceIdDiscard,
        },
      ];
      const data = await insertDataDiscard(dataObject);
    }
    if(error[0].extensions.code === "constraint-violation"){
      let message:string="";
      if(error[0].message.includes("Not-NULL")){
        message="These fields require the value. However, They receive null values. Please check again"
      }else if(error[0].message.includes("Uniqueness violation")){
        message=`Field "${error[0].message.match(/(?<=").*(?=")/gim)}" requires the unique value. However, It receives duplicate value. Please use another value`;
      }
      if(message.length>0){
        error[0].message=message
      }
    }
    if(error[0].extensions.code==="validation-failed"){
      let message:string="";
      message=`Field "${error[0].message.match(/(?<=").*(?=")/gim)}" not found in this table. Please check again`;
      error[0].message=message
    }
    return res.status(500).send(error[0] || error);
  }
};

export default handler;
