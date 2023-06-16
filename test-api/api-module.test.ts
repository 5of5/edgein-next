import { describe, expect, test } from '@jest/globals';
import {
  submitData,
  graphqlQuery,
  produceInputListNews,
  produceUpdateListNews,
  produceDeleteListNews,
} from '../utils/api-test';
import {
  insertOneNews,
  updateOneNews,
  deleteOneNews,
  upsertOneNews,
  upsertNews,
  insertThreeNewsRelationship,
  insertOnePerson,
  insertPersonToUpdate,
  insertOwnerVerifiedPersonToUpdate,
} from './dummy-testing-data';

const TEST_TIMEOUT_IN_MS = 30000;
let ret: Record<string, any> = [];
let retQuery: Record<string, any> = {};

describe('POST / - Unit test', () => {
  test('1. Insert a record into DB', async () => {
    // insert one
    ret = await submitData(insertOneNews, 'POST');
    const retData = JSON.parse(ret.text);

    // query to compare
    const queryString = JSON.stringify({
      query: `
      query FetchNews {
        news(where: {id: {_eq: "${retData[0].id}"}}) {
          id,link
        }
      }
      `,
    });
    retQuery = await graphqlQuery(queryString);
    const retQueryData = JSON.parse(retQuery.text);
    expect(ret.statusCode).toBe(200);
    expect(ret.callSubmitdata).toEqual({ status: 'successful' });
    expect(retQuery.callGraphql).toEqual({ status: 'successful' });
    expect(retQueryData.data.news[0].link).toEqual('http://test.abc.com');
  });

  test('2. Update one record (force update)', async () => {
    // insert one
    ret = await submitData(insertOneNews, 'POST');
    const retData = JSON.parse(ret.text);
    const id = retData[0].id;
    // force update
    updateOneNews.resource_identifier = [
      { field: 'id', value: `${id}`, method: '_eq' },
    ];
    updateOneNews.resource.link = 'http://testing.uk';
    await submitData(updateOneNews, 'POST');
    // query to compare
    const queryString = JSON.stringify({
      query: `
      query FetchNews {
        news(where: {id: {_eq: "${id}"}}) {
          id,link
        }
      }
      `,
    });
    retQuery = await graphqlQuery(queryString);
    const retQueryData = JSON.parse(retQuery.text);
    expect(ret.statusCode).toBe(200);
    expect(ret.callSubmitdata).toEqual({ status: 'successful' });
    expect(retQuery.callGraphql).toEqual({ status: 'successful' });
    expect(retQueryData.data.news[0].link).toEqual('http://testing.uk');
  });

  test('3. Delete one record', async () => {
    // insert one
    ret = await submitData(insertOneNews, 'POST');
    const retData = JSON.parse(ret.text);
    const id = retData[0].id;
    // delete one
    deleteOneNews.resource_identifier = [
      { field: 'id', value: `${id}`, method: '_eq' },
    ];
    deleteOneNews.resource.id = id;
    await submitData(deleteOneNews, 'DELETE');
    // query to compare
    const queryString = JSON.stringify({
      query: `
      query FetchNews {
        news(where: {id: {_eq: "${id}"}}) {
          id,link
        }
      }
      `,
    });
    retQuery = await graphqlQuery(queryString);
    const retQueryData = JSON.parse(retQuery.text);
    expect(ret.statusCode).toBe(200);
    expect(ret.callSubmitdata).toEqual({ status: 'successful' });
    expect(retQuery.callGraphql).toEqual({ status: 'successful' });
    expect(retQueryData.data.news).toEqual([]);
  });

  test('4. Upsert a record news.', async () => {
    // insert one with upsertOneNews
    ret = await submitData(upsertOneNews, 'POST');
    const retData = JSON.parse(ret.text);
    const id = retData[0].id;
    // upsert one
    upsertNews.resource_identifier = [
      { field: 'id', value: id, method: '_eq' },
    ];
    await submitData(upsertNews, 'POST');
    // query to compare
    const queryString = JSON.stringify({
      query: `
      query FetchNews {
        news(where: {id: {_eq: "${id}"}}) {
          id,link
        }
      }
      `,
    });
    retQuery = await graphqlQuery(queryString);
    const retQueryData = JSON.parse(retQuery.text);
    expect(ret.statusCode).toBe(200);
    expect(ret.callSubmitdata).toEqual({ status: 'successful' });
    expect(retQuery.callGraphql).toEqual({ status: 'successful' });
    expect(retQueryData.data.news[0].link).toEqual('http://test.abc.com');
  });

  test('5. Insert list of records', async () => {
    const dataSize = 5;
    const newsList = produceInputListNews(insertOneNews, dataSize);
    // insert list of records
    ret = await submitData(newsList, 'POST');
    const retData = JSON.parse(ret.text);
    let countNews = 0;
    let link = '';
    retData.forEach((el: { id: number }, idx: number) => {
      if (el.id > 0) {
        countNews += 1;
        link = retData[idx].resources[2].value;
        expect(link).toBe(`http://test${idx + 1}.abc.com`);
      }
    });
    expect(ret.statusCode).toEqual(200);
    expect(ret.callSubmitdata).toEqual({ status: 'successful' });
    expect(countNews).toBe(dataSize);
  });

  test('6. Update list of records.', async () => {
    const dataSize = 5;
    const newsList = produceInputListNews(insertOneNews, dataSize);
    // insert list of records
    ret = await submitData(newsList, 'POST');
    const retData = JSON.parse(ret.text);
    const idList = [];
    for (let i = 0; i < retData.length; i++) {
      idList.push(retData[i].id);
    }
    // update a list records
    const newsListUpdate: Record<string, any> = produceUpdateListNews(
      updateOneNews,
      idList,
    );
    const retUpdate = await submitData(newsListUpdate, 'POST');
    const retDataUpdate = JSON.parse(retUpdate.text);
    for (let i = 0; i < retData.length; i++) {
      expect(retDataUpdate[i].resources[0].value).toEqual(
        `http://test${i + 1}.abc.com`,
      );
    }
    expect(ret.statusCode).toEqual(200);
    expect(retUpdate.statusCode).toEqual(200);
    expect(ret.callSubmitdata).toEqual({ status: 'successful' });
    expect(retUpdate.callSubmitdata).toEqual({ status: 'successful' });
  });

  test('7. Delete a list of records', async () => {
    const dataSize = 5;
    const newsList = produceInputListNews(insertOneNews, dataSize);
    // insert list of records
    ret = await submitData(newsList, 'POST');
    const retData = JSON.parse(ret.text);
    const idList: Record<string, any> = [];
    for (let i = 0; i < retData.length; i++) {
      idList.push(retData[i].id);
    }
    // delete list of records
    const newsDeleteList = produceDeleteListNews(deleteOneNews, idList);
    const retDelete = await submitData(newsDeleteList, 'DELETE');
    const retDataDelete = JSON.parse(retDelete.text);
    let count = 0;
    retDataDelete.forEach((el: { id: number }, idx: number) => {
      if (el.id > 0) {
        count += 1;
        expect(el.id).toBe(idList[idx]);
      }
    });
    expect(ret.statusCode).toBe(200);
    expect(ret.callSubmitdata).toEqual({ status: 'successful' });
    expect(retDelete.statusCode).toBe(200);
    expect(retDelete.callSubmitdata).toEqual({ status: 'successful' });
    expect(count).toBe(dataSize);
  });
});

describe('POST / - Combined test', () => {
  test('8. Insert list of records with relationship', async () => {
    // insert list of records
    ret = await submitData(insertThreeNewsRelationship, 'POST');
    const retData = JSON.parse(ret.text);
    const idList = [];
    for (let i = 0; i < retData.length; i++) {
      idList.push(retData[i].id);
    }
    const companyId = retData[0].relationshipResults[0].resources[0].value;
    // query to compare
    const queryString1 = JSON.stringify({
      query: `
      query FetchNewsOrg {
        news_organizations(where: {company_id: {_eq: "${companyId}"},news_id: {_eq: "${idList[0]}"}}) {
          id
        }
      }
      `,
    });
    const retQuery1 = await graphqlQuery(queryString1);
    const retQueryData1 = JSON.parse(retQuery1.text);
    // query 2
    const personId = retData[1].relationshipResults[0].resources[0].value;
    const queryString2 = JSON.stringify({
      query: `
      query FetchNewsPerson {
        news_person(where: {person_id: {_eq: "${personId}"},news_id: {_eq: "${idList[1]}"}}) {
          id
        }
      }
      `,
    });
    const retQuery2 = await graphqlQuery(queryString2);
    const retQueryData2 = JSON.parse(retQuery2.text);
    // query 3
    const queryString3 = JSON.stringify({
      query: `
      query FetchNewsRelatedPerson {
        news_related_person(where: {name: {_eq: "Rita Liao"},news_id: {_eq: "${idList[2]}"}}) {
          id
        }
      }
      `,
    });
    const retQuery3 = await graphqlQuery(queryString3);
    const retQueryData3 = JSON.parse(retQuery3.text);
    // query 4
    const queryString4 = JSON.stringify({
      query: `
      query FetchNewsPerson {
        news_person(where: {news_id: {_eq: "${idList[2]}"}}) {
          id,person_id
        }
      }
      `,
    });
    const retQuery4 = await graphqlQuery(queryString4);
    const retQueryData4 = JSON.parse(retQuery4.text);

    expect(ret.statusCode).toEqual(200);
    expect(ret.callSubmitdata).toEqual({ status: 'successful' });
    expect(retQueryData1.data.news_organizations[0].id).toBeGreaterThan(0);
    expect(retQueryData2.data.news_person[0].id).toBeGreaterThan(0);
    expect(retQueryData3.data.news_related_person[0].id).toBeGreaterThan(0);
    expect(retQueryData4.data.news_person).toHaveLength(0);
  });
});

describe('POST / - is owner verified feature for people', () => {
  test(
    '1. Insert a not owner verified person into DB',
    async () => {
      ret = await submitData(insertOnePerson, 'POST');
      const responseData = JSON.parse(ret.text);

      const queryString = JSON.stringify({
        query: `
      query FetchPerson {
        people(where: {id: {_eq: "${responseData[0].id}"}}) {
          id, name, slug
        }
      }
      `,
      });

      retQuery = await graphqlQuery(queryString);
      const responseQueryData = JSON.parse(retQuery.text);

      expect(ret.statusCode).toBe(200);
      expect(ret.callSubmitdata).toEqual({ status: 'successful' });
      expect(retQuery.callGraphql).toEqual({ status: 'successful' });
      expect(responseQueryData.data.people[0].name).toEqual('Unit test person');
      expect(responseQueryData.data.people[0].slug).toEqual('unit-test-person');
    },
    TEST_TIMEOUT_IN_MS,
  );

  test(
    '2. Update one not owner verified person (force update)',
    async () => {
      ret = await submitData(insertPersonToUpdate, 'POST');
      const responseData = JSON.parse(ret.text);

      const updateOneIsOwnerVerifiedPerson = {
        partner_api_key: process.env.PARTNER_API_KEY,
        resource_type: 'people',
        force_update: true,
        resource_identifier: [{ field: 'id', value: responseData[0].id }],
        resource: {
          name: 'Unit test person updated',
          slug: 'unit-test-person-updated',
        },
      };

      await submitData(updateOneIsOwnerVerifiedPerson, 'POST');

      const queryString = JSON.stringify({
        query: `
      query FetchPerson {
        people(where: {id: {_eq: "${responseData[0].id}"}}) {
          id, name, slug
        }
      }
      `,
      });

      retQuery = await graphqlQuery(queryString);
      const responseQueryData = JSON.parse(retQuery.text);

      expect(ret.statusCode).toBe(200);
      expect(ret.callSubmitdata).toEqual({ status: 'successful' });
      expect(retQuery.callGraphql).toEqual({ status: 'successful' });
      expect(responseQueryData.data.people[0].name).toEqual(
        'Unit test person updated',
      );
      expect(responseQueryData.data.people[0].slug).toEqual(
        'unit-test-person-updated',
      );
    },
    TEST_TIMEOUT_IN_MS,
  );

  test(
    '3. Update one not owner verified person (force update) - data should not be changed in people table',
    async () => {
      ret = await submitData(insertOwnerVerifiedPersonToUpdate, 'POST');
      const responseData = JSON.parse(ret.text);

      const updateOneIsOwnerVerifiedPerson = {
        partner_api_key: process.env.PARTNER_API_KEY,
        resource_type: 'people',
        force_update: true,
        resource_identifier: [{ field: 'id', value: responseData[0].id }],
        resource: {
          name: 'Owner verified person updated',
          slug: 'owner-verified-person-updated',
        },
      };

      const updateIsOwnerVerifiedFieldString = JSON.stringify({
        query: `
        mutation UpdateIsOwnerVerifiedField {
          update_data_raw(
            where: {
              _and: [
                { resource: { _eq: "people" } }
                { resource_id: { _eq: ${responseData[0].id} } }
              ]
            },
            _set: { is_owner_verified: true}
          ) {
            affected_rows
            returning {
              id
            }
          }
        }
      `,
      });

      // set is_owner_verified_field to true
      const updateIsOwnerVerifiedFieldQuery = await graphqlQuery(
        updateIsOwnerVerifiedFieldString,
      );
      expect(updateIsOwnerVerifiedFieldQuery.callGraphql).toEqual({
        status: 'successful',
      });

      // we want to update is_owner_verified person from external partner
      await submitData(updateOneIsOwnerVerifiedPerson, 'POST');

      const queryString = JSON.stringify({
        query: `
      query FetchPerson {
        people(where: {id: {_eq: "${responseData[0].id}"}}) {
          id, name, slug
        }
      }
      `,
      });

      retQuery = await graphqlQuery(queryString);
      const responseQueryData = JSON.parse(retQuery.text);

      expect(ret.statusCode).toBe(200);
      expect(ret.callSubmitdata).toEqual({ status: 'successful' });
      expect(retQuery.callGraphql).toEqual({ status: 'successful' });

      // data should not be changed in the people table
      expect(responseQueryData.data.people[0].name).toEqual(
        'Owner verified person',
      );
      expect(responseQueryData.data.people[0].slug).toEqual(
        'owner-verified-person',
      );
    },
    TEST_TIMEOUT_IN_MS,
  );
});
