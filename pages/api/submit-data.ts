import { processNotificationOnSubmitData } from "@/utils/notifications";
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
  let hasRelationshipArray: boolean = false;
  let resourceTypeRelationship : ResourceTypes = resourceType;
  let resourceRelationship : Record<string, any> = {};
  let relationshipField : string ="";
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

    for (let key in resourceObj) {
      if (key !== resourceType && Object.keys(NODE_NAME).includes(key)) {
        hasRelationship = true;
        resourceTypeRelationship = key as ResourceTypes;
        relationshipField = key;
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
        for (let key in item) {
          if (key !== resourceType && Object.keys(NODE_NAME).includes(key)) {
            hasRelationship = true;
          }
        }
        if(!hasRelationship){
          properties.push({...item});
        }else{
          let objTemp: Record<string, any> = {};
          for(let key in item){
            if (key !== resourceType && Object.keys(NODE_NAME).includes(key)) {
              objTemp[key] = {...item[key]};
            }else{
              objTemp[key] = item[key];
            }
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
          if((!item?.library || item?.library?.length === 0)){
            (properties as Record<string, any>)[idx].library = ["Web3"];
          }
        })
      }else{
        if((!resourceObj?.library || resourceObj?.library?.length === 0)){
          (properties as Record<string, any>).library = ["Web3"];
        }
      }
    }
    let insertResult: Array<Record<string, any>> | Record<string, any>;
    if(Array.isArray(properties)){
      for(let i=0;i<properties.length;i++){
        // verify each element has relationship field in array 
        for (let key in properties[i]) {
          if (key !== resourceType && Object.keys(NODE_NAME).includes(key)) {
            hasRelationship = true;
            resourceRelationship = {...properties[i]};
            delete resourceRelationship[key];
            resourceTypeRelationship = key as ResourceTypes;
            relationshipField = key;
          }
        }
        if(hasRelationship){
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
          const relatedField= resourceType === "people" ? "person_id" : `${resourceType}_id`;
          properties[i][relationshipField][relatedField]= tempInsertResult.id;
          if(resourceType === "people"){
            if(Array.isArray(properties[i][relationshipField]["companies:name"])){
              for(let j=0;j<properties[i][relationshipField]["companies:name"].length;j++){
                let propertiesRelationship = {...properties[i][relationshipField]};
                delete propertiesRelationship["companies:name"];
                propertiesRelationship["companies:name"] = properties[i][relationshipField]["companies:name"][j];
                tempInsertResult = await mutateActionAndDataRaw(
                  partnerId,
                  user,
                  NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
                  resourceIdRelationShip,
                  propertiesRelationship,
                  resourceTypeRelationship,
                  actionType,
                  forceUpdate,
                );
                insertResultTemp.push({...tempInsertResult});
              }
              hasRelationshipArray = true;
            }else{
              tempInsertResult = await mutateActionAndDataRaw(
                partnerId,
                user,
                NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
                resourceIdRelationShip,
                properties[i][relationshipField],
                resourceTypeRelationship,
                actionType,
                forceUpdate,
              );
              insertResultTemp.push({...tempInsertResult});
            }
          }else if(resourceType === "news"){
            if(Array.isArray(properties[i][relationshipField]["companies:name"])){
              for(let j=0;j<properties[i][relationshipField]["companies:name"].length;j++){
                let propertiesRelationship = {...properties[i][relationshipField]};
                delete propertiesRelationship["companies:name"];
                delete propertiesRelationship["vc_firms:name"];
                propertiesRelationship["companies:name"] = properties[i][relationshipField]["companies:name"][j];
                tempInsertResult = await mutateActionAndDataRaw(
                  partnerId,
                  user,
                  NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
                  resourceIdRelationShip,
                  propertiesRelationship,
                  resourceTypeRelationship,
                  actionType,
                  forceUpdate,
                );
                insertResultTemp.push({...tempInsertResult});
              }
              hasRelationshipArray = true;
            }else{
              tempInsertResult = await mutateActionAndDataRaw(
                partnerId,
                user,
                NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
                resourceIdRelationShip,
                properties[i][relationshipField],
                resourceTypeRelationship,
                actionType,
                forceUpdate,
              );
              insertResultTemp.push({...tempInsertResult});
            }
            if(Array.isArray(properties[i][relationshipField]["vc_firms:name"])){
              for(let j=0;j<properties[i][relationshipField]["vc_firms:name"].length;j++){
                let propertiesRelationship = {...properties[i][relationshipField]};
                delete propertiesRelationship["vc_firms:name"];
                delete propertiesRelationship["companies:name"];
                propertiesRelationship["vc_firms:name"] = properties[i][relationshipField]["vc_firms:name"][j];
                tempInsertResult = await mutateActionAndDataRaw(
                  partnerId,
                  user,
                  NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
                  resourceIdRelationShip,
                  propertiesRelationship,
                  resourceTypeRelationship,
                  actionType,
                  forceUpdate,
                );
                insertResultTemp.push({...tempInsertResult});
              }
              hasRelationshipArray = true;
            }else{
              tempInsertResult = await mutateActionAndDataRaw(
                partnerId,
                user,
                NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
                resourceIdRelationShip,
                properties[i][relationshipField],
                resourceTypeRelationship,
                actionType,
                forceUpdate,
              );
              insertResultTemp.push({...tempInsertResult});
            }

          }
          hasRelationship = false;
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
        resourceRelationship = { ...properties };
        delete resourceRelationship[relationshipField];
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
        const relatedField= resourceType === "people" ? "person_id" : `${resourceType}_id`;
        properties[relationshipField][relatedField]= tempInsertResult.id;
        if(resourceType==="people"){
          if(Array.isArray(properties[relationshipField]["companies:name"])){
            for(let i=0;i<properties[relationshipField]["companies:name"].length;i++){
              let propertiesRelationship = {...properties[relationshipField]};
              delete propertiesRelationship["companies:name"];
              propertiesRelationship["companies:name"] = properties[relationshipField]["companies:name"][i];
              tempInsertResult = await mutateActionAndDataRaw(
                partnerId,
                user,
                NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
                resourceIdRelationShip,
                propertiesRelationship,
                resourceTypeRelationship,
                actionType,
                forceUpdate,
              );
              insertResultTemp.push({...tempInsertResult});
            }
            hasRelationshipArray = true;
          }else{
            tempInsertResult = await mutateActionAndDataRaw(
              partnerId,
              user,
              NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
              resourceIdRelationShip,
              properties[relationshipField],
              resourceTypeRelationship,
              actionType,
              forceUpdate,
            );
            insertResultTemp.push({...tempInsertResult});
          }
        }else if(resourceType==="news"){
          if(Array.isArray(properties[relationshipField]["companies:name"])){
            for(let i=0;i<properties[relationshipField]["companies:name"].length;i++){
              let propertiesRelationship = {...properties[relationshipField]};
              delete propertiesRelationship["companies:name"];
              delete propertiesRelationship["vc_firms:name"];
              propertiesRelationship["companies:name"] = properties[relationshipField]["companies:name"][i];
              tempInsertResult = await mutateActionAndDataRaw(
                partnerId,
                user,
                NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
                resourceIdRelationShip,
                propertiesRelationship,
                resourceTypeRelationship,
                actionType,
                forceUpdate,
              );
              insertResultTemp.push({...tempInsertResult});
            }
            hasRelationshipArray = true;
          }else{
            tempInsertResult = await mutateActionAndDataRaw(
              partnerId,
              user,
              NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
              resourceIdRelationShip,
              properties[relationshipField],
              resourceTypeRelationship,
              actionType,
              forceUpdate,
            );
            insertResultTemp.push({...tempInsertResult});
          }
          if(Array.isArray(properties[relationshipField]["vc_firms:name"])){
            for(let i=0;i<properties[relationshipField]["vc_firms:name"].length;i++){
              let propertiesRelationship = {...properties[relationshipField]};
              delete propertiesRelationship["vc_firms:name"];
              delete propertiesRelationship["companies:name"];
              propertiesRelationship["vc_firms:name"] = properties[relationshipField]["vc_firms:name"][i];
              tempInsertResult = await mutateActionAndDataRaw(
                partnerId,
                user,
                NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
                resourceIdRelationShip,
                propertiesRelationship,
                resourceTypeRelationship,
                actionType,
                forceUpdate,
              );
              insertResultTemp.push({...tempInsertResult});
            }
            hasRelationshipArray = true;
          }else{
            tempInsertResult = await mutateActionAndDataRaw(
              partnerId,
              user,
              NODE_NAME[resourceTypeRelationship as keyof typeof NODE_NAME],
              resourceIdRelationShip,
              properties[relationshipField],
              resourceTypeRelationship,
              actionType,
              forceUpdate,
            );
            insertResultTemp.push({...tempInsertResult});
          }
        }
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
    
    await processNotificationOnSubmitData(
      resourceType,
      resourceObj,
      actionType,
      Array.isArray(insertResult)
        ? insertResult[0]?.actions
        : insertResult?.actions,
      resourceId ||
        (Array.isArray(insertResult) ? insertResult[0]?.id : insertResult?.id)
    );
    
    if(Array.isArray(resourceObj)){
      if(hasRelationship && !hasRelationshipArray){
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
      if(hasRelationship && !hasRelationshipArray){
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
