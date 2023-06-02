import { describe, expect, test } from '@jest/globals';
import { submitData, graphqlQuery, produceInputListNews, produceUpdateListNews, produceDeleteListNews } from "../utils/api-test";
import { insertOneNews, updateOneNews, deleteOneNews, upsertOneNews, upsertNews, insertThreeNewsRelationship } from './dummy-testing-data';

let ret: Record<string, any>  = [];
let retQuery: Record<string, any> = {};
let deleteMethod: boolean = false;

describe("POST / - Unit test", () => {

  test("1. Insert a record into DB", async () => {
    // insert one
    ret = await submitData(insertOneNews, deleteMethod);
    const retData = JSON.parse(ret.text);
    // query to compare
    const queryString = {
      query: `
      query MyQuery {
        news(where: {id: {_eq: "${retData[0].id}"}}) {
          id,link
        }
      }
      `
    };
    retQuery = await graphqlQuery(JSON.stringify(queryString));
    const retQueryData = JSON.parse(retQuery.text);
    expect(ret.statusCode).toBe(200);
    expect(ret.callSubmitdata).toEqual({status : "successful"});
    expect(retQuery.callGraphql).toEqual({status : "successful"});
    expect(retQueryData.data.news[0].link).toEqual("http://test.abc.com");

  });

  test("2. Update one record (force update)", async () => {
    // insert one
    ret = await submitData(insertOneNews, deleteMethod);
    let retData = JSON.parse(ret.text);
    const id = retData[0].id;
    // force update
    updateOneNews.resource_identifier = [{"field": "id", "value":`${id}`,"method":"_eq"}];
    updateOneNews.resource.link = "http://testing.uk";
    await submitData(updateOneNews, deleteMethod);
    // query to compare
    const queryString = {
      query: `
      query MyQuery {
        news(where: {id: {_eq: "${id}"}}) {
          id,link
        }
      }
      `
    };
    retQuery = await graphqlQuery(JSON.stringify(queryString));
    const retQueryData = JSON.parse(retQuery.text);
    expect(ret.statusCode).toBe(200);
    expect(ret.callSubmitdata).toEqual({status : "successful"});
    expect(retQuery.callGraphql).toEqual({status : "successful"});
    expect(retQueryData.data.news[0].link).toEqual("http://testing.uk");

  });

  test("3. Delete one record", async () => {
    // insert one
    ret = await submitData(insertOneNews, deleteMethod);
    let retData = JSON.parse(ret.text);
    const id = retData[0].id;
    // delete one
    deleteMethod = true;
    deleteOneNews.resource_identifier = [{"field": "id", "value":`${id}`,"method":"_eq"}];
    deleteOneNews.resource.id = id;
    await submitData(deleteOneNews, deleteMethod);
    deleteMethod = false;
    // query to compare
    const queryString = {
      query: `
      query MyQuery {
        news(where: {id: {_eq: "${id}"}}) {
          id,link
        }
      }
      `
    };
    retQuery = await graphqlQuery(JSON.stringify(queryString));
    const retQueryData = JSON.parse(retQuery.text);
    expect(ret.statusCode).toBe(200);
    expect(ret.callSubmitdata).toEqual({status : "successful"});
    expect(retQuery.callGraphql).toEqual({status : "successful"});
    expect(retQueryData.data.news).toEqual([]);

  });

  test("4. Upsert a record news.", async () => {
    // insert one with upsertOneNews
    ret = await submitData(upsertOneNews, deleteMethod);
    let retData = JSON.parse(ret.text);
    const id = retData[0].id;
    // upsert one
    upsertNews.resource_identifier = [{"field": "id", "value": id,"method":"_eq"}];
    await submitData(upsertNews, deleteMethod);
    // query to compare
    const queryString = {
      query: `
      query MyQuery {
        news(where: {id: {_eq: "${id}"}}) {
          id,link
        }
      }
      `
    };
    retQuery = await graphqlQuery(JSON.stringify(queryString));
    const retQueryData = JSON.parse(retQuery.text);
    expect(ret.statusCode).toBe(200);
    expect(ret.callSubmitdata).toEqual({status : "successful"});
    expect(retQuery.callGraphql).toEqual({status : "successful"});
    expect(retQueryData.data.news[0].link).toEqual("http://test.abc.com");

  });

  test("5. Insert list of records", async () => {
    const dataSize: number = 5;
    const newsList = produceInputListNews(insertOneNews, dataSize);
    // insert list of records
    ret = await submitData(newsList, deleteMethod);
    let retData = JSON.parse(ret.text);
    let countNews: number = 0;
    let link: string = "";
    retData.forEach((el: { id: number },idx:number) => {
      if(el.id > 0){
        countNews +=1;
        link = retData[idx].resources[2].value;
        expect(link).toBe(`http://test${idx + 1}.abc.com`);
      }
    });
    expect(ret.statusCode).toEqual(200);
    expect(ret.callSubmitdata).toEqual({status : "successful"});
    expect(countNews).toBe(dataSize);

  });

  test("6. Update list of records.", async () => {
    const dataSize: number = 5;
    const newsList = produceInputListNews(insertOneNews, dataSize);
    // insert list of records
    ret = await submitData(newsList, deleteMethod);
    let retData = JSON.parse(ret.text);
    let idList = [];
    for(let i=0;i<retData.length;i++){
      idList.push(retData[i].id);
    }
    // update a list records
    const newsListUpdate: Record<string, any> = produceUpdateListNews(updateOneNews, idList);
    const retUpdate = await submitData(newsListUpdate, deleteMethod);
    let retDataUpdate = JSON.parse(retUpdate.text);
    for(let i=0;i<retData.length;i++){
      expect(retDataUpdate[i].resources[0].value).toEqual(`http://test${i+1}.abc.com`);
    }
    expect(ret.statusCode).toEqual(200);
    expect(retUpdate.statusCode).toEqual(200);
    expect(ret.callSubmitdata).toEqual({status : "successful"});
    expect(retUpdate.callSubmitdata).toEqual({status : "successful"});
    
  });

  test("7. Delete a list of records", async () => {
    const dataSize: number = 5;
    const newsList = produceInputListNews(insertOneNews, dataSize);
    // insert list of records
    ret = await submitData(newsList, deleteMethod);
    let retData = JSON.parse(ret.text);
    let idList: Record<string, any> = [];
    for(let i=0;i<retData.length;i++){
      idList.push(retData[i].id);
    }
    // delete list of records
    deleteMethod = true;
    const newsDeleteList = produceDeleteListNews(deleteOneNews,idList);
    const retDelete = await submitData(newsDeleteList, deleteMethod);
    let retDataDelete = JSON.parse(retDelete.text);
    deleteMethod = false;
    let count: number = 0;
    retDataDelete.forEach((el: { id: number },idx :number) => {
      if(el.id > 0){
        count +=1;
        expect(el.id).toBe(idList[idx]);
      }
    });
    expect(ret.statusCode).toBe(200);
    expect(ret.callSubmitdata).toEqual({status : "successful"});
    expect(retDelete.statusCode).toBe(200);
    expect(retDelete.callSubmitdata).toEqual({status : "successful"});
    expect(count).toBe(dataSize);
  });

});


describe("POST / - Combined test", () => {

  test("8. Insert list of records with relationship", async () => {
    // insert list of records
    ret = await submitData(insertThreeNewsRelationship, deleteMethod);
    let retData = JSON.parse(ret.text);
    let idList = [];
    for(let i=0;i<retData.length;i++){
      idList.push(retData[i].id);
    }
    let companyId = retData[0].relationshipResults[0].resources[0].value;
    // query to compare
    const queryString1 = {
      query: `
      query MyQuery {
        news_organizations(where: {company_id: {_eq: "${companyId}"},news_id: {_eq: "${idList[0]}"}}) {
          id
        }
      }
      `
    };
    let retQuery1 = await graphqlQuery(JSON.stringify(queryString1));
    const retQueryData1 = JSON.parse(retQuery1.text);
    // query 2
    let personId = retData[1].relationshipResults[0].resources[0].value;
    const queryString2 = {
      query: `
      query MyQuery {
        news_person(where: {person_id: {_eq: "${personId}"},news_id: {_eq: "${idList[1]}"}}) {
          id
        }
      }
      `
    };
    let retQuery2 = await graphqlQuery(JSON.stringify(queryString2));
    const retQueryData2 = JSON.parse(retQuery2.text);
    // query 3
    const queryString3 = {
      query: `
      query MyQuery {
        news_related_person(where: {name: {_eq: "Rita Liao"},news_id: {_eq: "${idList[2]}"}}) {
          id
        }
      }
      `
    };
    let retQuery3 = await graphqlQuery(JSON.stringify(queryString3));
    const retQueryData3 = JSON.parse(retQuery3.text);
    // query 4
    const queryString4 = {
      query: `
      query MyQuery {
        news_person(where: {news_id: {_eq: "${idList[2]}"}}) {
          id,person_id
        }
      }
      `
    };
    let retQuery4 = await graphqlQuery(JSON.stringify(queryString4));
    const retQueryData4 = JSON.parse(retQuery4.text);
   
    expect(ret.statusCode).toEqual(200);
    expect(ret.callSubmitdata).toEqual({status : "successful"});
    expect(retQueryData1.data.news_organizations[0].id).toBeGreaterThan(0);
    expect(retQueryData2.data.news_person[0].id).toBeGreaterThan(0);
    expect(retQueryData3.data.news_related_person[0].id).toBeGreaterThan(0);
    expect(retQueryData4).toHaveProperty("errors");
  });

});