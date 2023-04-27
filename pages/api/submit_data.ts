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
  const resourceObj: Array<Record<string, any>> | Record<string, any> = req.body.resource;
  const forceUpdate: Boolean = req.body.force_update;
  let insertResultTemp: Array<Record<string, any>> | Record<string, any> = [];
  let hasRelationship: boolean = false;
  let resourceTypeRelationship : ResourceTypes = resourceType;
  let resourceRelationship : Record<string, any> = {};
  let resourceIdDiscard : number = 0, partnerIdDiscard : number = 0;
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

    for(let key in resourceObj){
      if(key === resourceType){
        resourceRelationship={...(resourceObj as Record<string, any>)[key]};
        hasRelationship=true;
      }else{
        let newKey = key.replace("&","");
        if(Object.keys(NODE_NAME).includes(newKey)){
          resourceTypeRelationship = newKey as ResourceTypes;
        }
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

    let properties: Array<Record<string, any>> | Record<string, any> = [];
    if(Array.isArray(resourceObj)){
      resourceObj.forEach((item)=>{
        if(Object.keys(item).length>2){
          properties.push({...item});
        }else{
          let objTemp: Record<string, any> = {};
          for(let key in item){
            objTemp[key]={...item[key]};
          }
          properties.push(objTemp);
        }
      })
    }else{
      properties = {...resourceObj};
    }
    
    if (
      actionType === "Insert Data" &&
      ["companies", "vc_firms", "people"].includes(resourceType) 
    ) {
      if(Array.isArray(resourceObj)){
          resourceObj.forEach((item,idx)=>{
            if(Object.keys(item).length>2){
              if((!item?.library || item?.library?.length === 0)){
                (properties as Record<string, any>)[idx].library = ["Web3"];
              }
            }else{
              for(let key in item){
                if(key === resourceType){
                  if((!item[key]?.library || item[key]?.library?.length === 0)){
                    (properties as Record<string, any>)[idx][key].library = ["Web3"];
                  }
                }
              }
            }
            
          })
      }else{
        if(hasRelationship){
          if((!resourceRelationship?.library || resourceRelationship?.library?.length === 0)){
            resourceRelationship.library = ["Web3"];
          }
        }else{
          if((!resourceObj?.library || resourceObj?.library?.length === 0)){
            (properties as Record<string, any>).library = ["Web3"];
          }
        }
      }
    }
    
    let insertResult: Array<Record<string, any>> | Record<string, any>;
    if(Array.isArray(properties)){
      for(let i=0;i<properties.length;i++){
        // verify each element has relationship field in array 
        if(Object.keys(properties[i]).length>2){
          hasRelationship = false;
        }else{
          hasRelationship = true;
        }
        if(hasRelationship){
          for(let key in properties[i]){
            if(key === resourceType){
              resourceRelationship = {...properties[i][key]};
            }else{
              resourceTypeRelationship = key.replace("&","") as ResourceTypes;
            }
          }
          // implement insert array relationship
          let tempInsertResult = await mutateActionAndDataRaw(
            partnerId,
            user,
            NODE_NAME[resourceType],
            resourceId,
            resourceRelationship,
            resourceType,
            actionType,
            forceUpdate,
          );
          insertResultTemp.push({...tempInsertResult});
          const resourceIdRelationShip: number = await resourceIdLookup(resourceTypeRelationship, resourceIdentifier);
          const relatedField= properties[i][`&${resourceTypeRelationship}`]["relationship_field"];
          properties[i][`&${resourceTypeRelationship}`][relatedField]= tempInsertResult.id;
          delete properties[i][`&${resourceTypeRelationship}`]["relationship_field"];
          tempInsertResult = await mutateActionAndDataRaw(
            partnerId,
            user,
            NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
            resourceIdRelationShip,
            properties[i][`&${resourceTypeRelationship}`],
            resourceTypeRelationship,
            actionType,
            forceUpdate,
          );
          insertResultTemp.push({...tempInsertResult});
        }else{
          let tempInsertResult = await mutateActionAndDataRaw(
            partnerId,
            user,
            NODE_NAME[resourceType],
            resourceId,
            properties[i],
            resourceType,
            actionType,
            forceUpdate,
          );
          insertResultTemp.push({...tempInsertResult});
        }
      }
      insertResult = insertResultTemp;
    }else{
      if(hasRelationship){
        let tempInsertResult = await mutateActionAndDataRaw(
          partnerId,
          user,
          NODE_NAME[resourceType],
          resourceId,
          resourceRelationship,
          resourceType,
          actionType,
          forceUpdate,
        );
        insertResultTemp.push({...tempInsertResult});
        const resourceIdRelationShip: number = await resourceIdLookup(resourceTypeRelationship, resourceIdentifier);
        const relatedField= (resourceObj as Record<string, any>)[`&${resourceTypeRelationship}`]["relationship_field"];
        (resourceObj as Record<string, any>)[`&${resourceTypeRelationship}`][relatedField]= tempInsertResult.id;
        delete (resourceObj as Record<string, any>)[`&${resourceTypeRelationship}`]["relationship_field"];
        tempInsertResult = await mutateActionAndDataRaw(
          partnerId,
          user,
          NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
          resourceIdRelationShip,
          (resourceObj as Record<string, any>)[`&${resourceTypeRelationship}`],
          resourceTypeRelationship,
          actionType,
          forceUpdate,
        );
        insertResultTemp.push({...tempInsertResult});
        insertResult = insertResultTemp;
      }else{
        insertResult = await mutateActionAndDataRaw(
          partnerId,
          user,
          NODE_NAME[resourceType],
          resourceId,
          properties,
          resourceType,
          actionType,
          forceUpdate,
        );
      }
      
    }
    

    if (resourceId === undefined) {
      if (
        resourceType === "investment_rounds" ||
        resourceType === "team_members"
      ) {
        await processNotification(
          (resourceObj as Record<string, any>)?.company_id,
          "companies",
          resourceType,
          actionType,
          Array.isArray(insertResult) ? insertResult[0]?.actions : insertResult?.actions 
        );
      }

      if (resourceType === "investors") {
        await processNotification(
          (resourceObj as Record<string, any>)?.vc_firm_id,
          "vc_firms",
          resourceType,
          actionType,
          Array.isArray(insertResult) ? insertResult[0]?.actions : insertResult?.actions
        );
      }

      if (resourceType === "investments") {
        if ((resourceObj as Record<string, any>)?.round_id) {
          const investmentRound = await getCompanyByRoundId((resourceObj as Record<string, any>).round_id);
          await processNotification(
            investmentRound?.company_id || 0,
            "companies",
            resourceType,
            actionType,
            Array.isArray(insertResult) ? insertResult[0]?.actions : insertResult?.actions
          );
        }

        await processNotification(
          (resourceObj as Record<string, any>)?.vc_firm_id,
          "vc_firms",
          resourceType,
          actionType,
          Array.isArray(insertResult) ? insertResult[0]?.actions : insertResult?.actions
        );
      }

      if (resourceType === "event_organization") {
        if ((resourceObj as Record<string, any>)?.company_id) {
          await processNotification(
            (resourceObj as Record<string, any>).company_id,
            "companies",
            resourceType,
            actionType,
            Array.isArray(insertResult) ? insertResult[0]?.actions : insertResult?.actions
          );
        }
        if ((resourceObj as Record<string, any>)?.vc_firm_id) {
          await processNotification(
            (resourceObj as Record<string, any>).vc_firm_id,
            "vc_firms",
            resourceType,
            actionType,
            Array.isArray(insertResult) ? insertResult[0]?.actions : insertResult?.actions
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
          Array.isArray(insertResult) ? insertResult[0]?.actions : insertResult?.actions
        );
      }
    }
    
    if(Array.isArray(resourceObj)){
      if(hasRelationship){
        insertResult.unshift({"successful-elements":insertResultTemp.length/2});
      }else{
        insertResult.unshift({"successful-elements":insertResultTemp.length});
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
          value: (resourceObj as Record<string, any>)[field],
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
    if(Array.isArray(resourceObj)){
      if(hasRelationship){
        error[0]["failed-element"] = resourceObj[insertResultTemp.length/2 === 0 ? 0 : insertResultTemp.length/2];
        error[0]["successful-elements"] = insertResultTemp.length/2 === 0 ? 0 : insertResultTemp.length/2;
      }else{
        error[0]["failed-element"] = resourceObj[insertResultTemp.length === 0 ? 0 : insertResultTemp.length];
        error[0]["successful-elements"] = insertResultTemp.length === 0 ? 0 : insertResultTemp.length;
      }
    }
    return res.status(500).send(error[0] || error);
  }
};

export default handler;
