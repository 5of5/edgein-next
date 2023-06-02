import request from "supertest";

const urlSubmitdata = process.env.SUMIT_DATA_URL || "";
const urlGraphql = process.env.GRAPHQL_ENDPOINT || "";
const hasuraDev = process.env.HASURA_ADMIN_SECRET || "";

export async function submitData(insertOne: Array<Record<string, any>> | Record<string, any>, deleteMethod: boolean){
  try {
    let ret:Array<Record<string, any>> | Record<string, any> = [];
    if(!deleteMethod){
      ret = await request(urlSubmitdata).post("/").send(JSON.stringify(insertOne)).set('Content-Type', 'application/json').set('Accept', 'application/json');
    }else{
      ret = await request(urlSubmitdata).delete("/").send(JSON.stringify(insertOne)).set('Content-Type', 'application/json').set('Accept', 'application/json');
    }
    ret.callSubmitdata = {status : "successful"};
    return ret;
  } catch (error) {
    return {callSubmitdata: {status : "failed"}};
  }
  
}

export async function graphqlQuery(queryString: string){
  try {
    let retQuery: Record<string, any> = {};
    retQuery = await request(urlGraphql).post("/").send(queryString).set('Accept', "*/*").set('x-hasura-admin-secret', hasuraDev);
    retQuery.callGraphql = {status : "successful"};
    return retQuery;
  } catch (error) {
    return {callGraphql: {status : "failed"}};
  }
}

export function produceInputListNews(dataModel: Record<string, any>, dataSize: number){
  let ret: Array<Record<string, any>> | Record<string, any> ={...dataModel};
  let resource: Array<Record<string, any>> | Record<string, any> =[];
  let resource_identifier: Array<Record<string, any>> | Record<string, any> =[];
  if(dataSize < 1) return [];
  for(let i=1; i<=dataSize; i++){
    let dataObj = {...dataModel.resource};
    dataObj.text = `testing news ${i}`;
    dataObj.link = `http://test${i}.abc.com`;
    resource.push(dataObj);
    resource_identifier.push(dataModel.resource_identifier)
  }
  ret.resource = resource;
  ret.resource_identifier = resource_identifier;
  return ret;
}

export function produceUpdateListNews(dataModel: Record<string, any>, dataSize: Record<string, any>){
  let ret: Array<Record<string, any>> | Record<string, any> ={...dataModel};
  let resource: Array<Record<string, any>> | Record<string, any> =[];
  let resource_identifier: Array<Record<string, any>> | Record<string, any> =[];
  if(dataSize.length < 1) return [];
  for(let i=0; i<dataSize.length; i++){
    let identifier = [{"field": "id", "value":dataSize[i],"method":"_eq"}];
    let dataObj = {...dataModel.resource};
    dataObj.link = `http://test${i+1}.abc.com`;
    resource.push(dataObj);

    resource_identifier.push(identifier)
  }
  ret.resource = resource;
  ret.resource_identifier = resource_identifier;
  return ret;
}

export function produceDeleteListNews(dataModel: Record<string, any>, dataSize: Record<string, any>){
  let ret: Array<Record<string, any>> | Record<string, any> ={...dataModel};
  let resource: Array<Record<string, any>> | Record<string, any> =[];
  let resource_identifier: Array<Record<string, any>> | Record<string, any> =[];
  if(dataSize.length < 1) return [];
  for(let i=0; i<dataSize.length; i++){
    let identifier = [{"field": "id", "value":dataSize[i],"method":"_eq"}];
    let dataObj = {...dataModel.resource};
    dataObj.id = dataSize[i];
    resource.push(dataObj);

    resource_identifier.push(identifier)
  }
  ret.resource = resource;
  ret.resource_identifier = resource_identifier;
  return ret;
}