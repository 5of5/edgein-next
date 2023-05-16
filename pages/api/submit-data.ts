import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import {
  processNotification,
  processNotificationOnDelete,
} from "@/utils/notifications";
import {
  ActionType,
  ResourceTypes,
  isResourceType,
  NODE_NAME
} from "@/utils/constants";
import { User } from "@/models/user";
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

const sendNotification = async (
  resourceId: number | undefined,
  resourceType: ResourceTypes,
  actionType: ActionType,
  resourceObj: Record<string, any>,
  insertResult: Record<string, any>,
) => {
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
}

const addSpecialRelationships = async (
  resourceType: ResourceTypes,
  resourceObj: Record<string, any>,
) => {
  let specialRelationships: Array<Record<string, any>> = [];
  if (resourceType === "news") {
    const newsContent = resourceObj?.metadata?.description;
    if (newsContent) {
      let newsPeople: Array<Record<string, any>> = [];
      let newscompanies: Array<Record<string, any>> = [];
      const ret = await fetch(`${process.env.DANDLEION_API_URL}?text=${newsContent}&include=types&token=${process.env.DANDLEION_API_TOKEN}`);
      const data = await ret.json();
      if (data.annotations)
        for (const entity of data.annotations) {
          if (entity.types.includes('http://dbpedia.org/ontology/Person') && !newsPeople.map(item => item['people:name']).includes(entity.spot))
            newsPeople.push({'people:name': entity.spot, 'news_id': '&'});
          else if (!newscompanies.map(item => item['companies:name']).includes(entity.spot))
            newscompanies.push({'companies:name': entity.spot, 'news_id': '&'});
        }
      
      if (newsPeople.length > 0)
        specialRelationships.push({'news_person': newsPeople});
      if (newscompanies.length > 0)
        specialRelationships.push({'news_organizations': newscompanies})
    }
  }
  return specialRelationships;
}

const handleResource = async (
  partnerId: number,
  user: User | null,
  resourceId: number | undefined,
  resourceObj: Record<string, any>,
  resourceType: ResourceTypes,
  actionType: ActionType,
  forceUpdate: Boolean
) => {
  const properties = {...resourceObj};

  let resourceRelationships : Array<Record<string, any>> = [];

  if (actionType === "Insert Data") {
    resourceRelationships = [...await addSpecialRelationships(resourceType, resourceObj)];
    for (let key in resourceObj) {
      if (isResourceType(key) && key !== resourceType) {
        resourceRelationships.push({[key]: resourceObj[key]});
        delete resourceObj[key];
      }
    }
  }

  if (
    actionType === "Insert Data" &&
    ["companies", "vc_firms", "people"].includes(resourceType) &&
    (!resourceObj?.library || resourceObj?.library?.length === 0)
  ) {
    properties.library = ["Web3"];
  }

  const insertResult = await mutateActionAndDataRaw(
    partnerId,
    user,
    NODE_NAME[resourceType],
    resourceId as number,
    resourceObj,
    resourceType,
    actionType,
    forceUpdate,
  );

  await sendNotification(
    resourceId,
    resourceType,
    actionType,
    resourceObj,
    insertResult,
  );

  if (actionType === 'Insert Data') {
    let results: Array<Record<string, any>> = [];
    for (let resourceRelationship of resourceRelationships) {
      const resourceRelationshipType = Object.keys(resourceRelationship)[0];
      let resourceRelationshipObjs = Object.values(resourceRelationship)[0];
      if (!Array.isArray(resourceRelationshipObjs))
        resourceRelationshipObjs = [resourceRelationshipObjs];
      
      for (let resourceRelationshipObj of resourceRelationshipObjs) {
        // Replace '&' with resourceId of main record
        Object.keys(resourceRelationshipObj).map(item=>{
          if (resourceRelationshipObj[item] === '&')
          resourceRelationshipObj[item] = insertResult.id;
        })
        const ret = await handleResource(
          partnerId,
          user,
          undefined,
          resourceRelationshipObj,
          resourceRelationshipType as ResourceTypes,
          "Insert Data",
          forceUpdate,
        );
        results.push(ret);
      }
    }

    if (results.length > 0)
      return [insertResult, results];
  }

  return insertResult;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!["POST", "PUT", "DELETE"].includes(req.method as string))
    return res.status(405).send({ message: "Method is not allowed" });

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);

  const apiKey: string = req.body.partner_api_key;
  const resourceType: ResourceTypes = req.body.resource_type;
  const resourceIdentifier: Array<Record<string, any>> = req.body.resource_identifier;
  const resourceObj: Array<Record<string, any>> | Record<string, any> = req.body.resource;
  const forceUpdate: Boolean = req.body.force_update;

  let resourceId: number | undefined = undefined;
  let partnerId: number = 0;
  let actionType: ActionType = "Change Data";

  try {
    if (
      apiKey === undefined ||
      resourceIdentifier === undefined ||
      resourceObj === undefined ||
      resourceType === undefined
    )
      return res.status(400).send({ message: "Bad Request" });

    // Identify partner or admin
    const partner = await partnerLookUp(apiKey);
    if (partner?.id === undefined) {
      if (!(user?.role === "admin")) {
        return res.status(401).send({ message: "Unauthorized Partner" });
      }
    } else {
      partnerId = partner.id;
    }

    // Validate identifier fields (defined in data_fields)
    for (const item of resourceIdentifier) {
      if (!item.field)
        continue;
      let identifierColumn = item.field;
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

    // Identify resource id
    resourceId = await resourceIdLookup(resourceType, resourceIdentifier);
    if (resourceId === undefined) {
      // In 'Insert' case, identifier field is only 'id' without value
      if (JSON.stringify(resourceIdentifier) === JSON.stringify([{'field': 'id'}])) {
        actionType = "Insert Data";
        if (Array.isArray(resourceObj)) {
          // Insert list of records
          let result: Array<Record<string, any>> = [];
          await Promise.all(resourceObj.map( async (item) => {
            const ret = await handleResource(
              partnerId,
              user,
              resourceId,
              item,
              resourceType,
              actionType,
              forceUpdate,
            );
            result.push(ret);
          }));
          return res.send(result);
        }
      } else {
        return res.status(404).send({
          message: `Not found ${JSON.stringify(resourceIdentifier)}`,
        });
      }
    } else if (req.method === "DELETE") {
      // In 'Delete' case, request method is 'DELETE'
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

    // Change record or insert only one record (resourceObj is not array)
    const result = await handleResource(
      partnerId,
      user,
      resourceId,
      resourceObj,
      resourceType,
      actionType,
      forceUpdate,
    );
    return res.send(result);
  } catch (error: any) {
    if (error[0].extensions.code === "validation-failed") {
      let field = "";
      for (let key in resourceObj) {
        const errMessage = error[0].message;
        if (errMessage.includes(key)) {
          field = key;
        }
      }
      if (resourceId) {
        const dataObject = [
          {
            resource: resourceType,
            field,
            value: (resourceObj as Record<string, any>)[field],
            partner: partnerId,
            accuracy_weight: 1,
            resource_id: resourceId,
          },
        ];
        await insertDataDiscard(dataObject);
      }
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
