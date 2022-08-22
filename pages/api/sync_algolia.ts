import type { NextApiRequest, NextApiResponse } from 'next'
import algoliasearch from 'algoliasearch'
import { query, mutate } from '@/graphql/hasuraAdmin'

const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID!, process.env.ALGOLIA_API_KEY!);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // get the last sync datetime from db
  const lastSyncObject = await queryForlastSync(); // todo: add time also
  if (!lastSyncObject) return res.status(405).end(); // last error : text, add winston for logger

  // get the value for the lastSync
  const lastSyncDate = lastSyncObject.value;

  // get all the companies details
  const companyList = await queryForCompanyList(lastSyncDate);
  for (const company of companyList) {
    if (company.logo) {
      company.logo = company.logo.thumbnails.full.url ? company.logo.thumbnails.full.url : company.logo.url;
    }
    company.objectID = company.id;
    delete company.id;
  }
  const companyIndex = client.initIndex('companies');
  await companyIndex.saveObjects(companyList, { autoGenerateObjectIDIfNotExist: true });

  // get all investors details
  const investorList = await queryForInvestorList(lastSyncDate);
  for (const investor of investorList) {
    if (investor.vc_firm) {
      if (investor.vc_firm.id) investor.vc_firm_id = investor.vc_firm.id;
      if (investor.vc_firm.name) investor.vc_firm_name = investor.vc_firm.name;
      if (investor.vc_firm.slug) investor.vc_firm_slug = investor.vc_firm.slug;
      if (investor.vc_firm.logo) {
        investor.vc_firm_logo = investor.vc_firm.logo.thumbnails.full.url ? investor.vc_firm.logo.thumbnails.full.url : investor.vc_firm.logo.url;
      }
    }

    if (investor.person) {
      if (investor.person.id) investor.person_id = investor.person.id;
      if (investor.person.name) investor.person_name = investor.person.name;
      if (investor.person.slug) investor.person_slug = investor.person.slug;
      if (investor.person.picture) {
        investor.person_picture = investor.person.picture.thumbnails.full.url ? investor.person.picture.thumbnails.full.url : investor.person.picture.url;
      }
    }
    investor.objectID = investor.id;
    delete investor.id;
    delete investor.vc_firm;
    delete investor.person;
  }
  const investorIndex = client.initIndex('investors');
  await investorIndex.saveObjects(investorList, { autoGenerateObjectIDIfNotExist: true });

  // get all people details
  const peopleList = await queryForPeopleList(lastSyncDate);
  for (const people of peopleList) {
    if (people.picture) {
      people.picture = people.picture.thumbnails.full.url ? people.picture.thumbnails.full.url : people.picture.url;
    }
    people.objectID = people.id;
    delete people.id;
  }
  const peopleIndex = client.initIndex('people');
  await peopleIndex.saveObjects(peopleList, { autoGenerateObjectIDIfNotExist: true });

  // update the last_sync date to current date
  await mutateForlastSync();

  res.send({ companyList })
  // res.status(200).end({ companyList, investorList, peopleList });
}

// queries local user using graphql endpoint
const queryForlastSync = async () => {
  // prepare gql query
  const fetchQuery = `
  query query_last_sync {
    application_meta(where: {key: {_eq: "sync_algolia"}}) {
      key
      value
    }
  }
  `
  try {
    const data = await query({
      query: fetchQuery,
      variables: {}
    })
    return data.data.application_meta[0]
  } catch (ex) {
    throw ex;
  }
}

// queries local user using graphql endpoint
const queryForCompanyList = async (date: any) => {
  // prepare gql query
  const fetchQuery = `
  query query_companies($date: timestamptz) {
    companies(where: {updated_at: {_gte: $date}}) {
      id
      name
      overview
      tags
      logo
      slug
    }
  }
  `
  try {
    const data = await query({
      query: fetchQuery,
      variables: { date }
    })
    return data.data.companies
  } catch (ex) {
    throw ex;
  }
}
// queries local user using graphql endpoint
const queryForInvestorList = async (date: any) => {
  // prepare gql query
  const fetchQuery = `
  query query_investors($date: timestamptz) {
    investors(where: {updated_at: {_gte: $date}}) {
      id
      vc_firm {
        id
        name
        logo
        slug
      }
      person {
        id
        name
        picture
        slug
      }
    }
  }
  `
  try {
    const data = await query({
      query: fetchQuery,
      variables: { date }
    })
    return data.data.investors
  } catch (ex) {
    throw ex;
  }
}
// queries local user using graphql endpoint
const queryForPeopleList = async (date: any) => {
  // prepare gql query
  const fetchQuery = `
  query query_people($date: timestamptz) {
    people(where: {updated_at: {_gte: $date}}) {
      id
      name
      work_email
      personal_email
      picture
      slug
    }
  }
  `
  try {
    const data = await query({
      query: fetchQuery,
      variables: { date }
    })
    return data.data.people
  } catch (ex) {
    throw ex;
  }
}

const mutateForlastSync = async () => {
  const today = new Date();
  const dateInUTC = today.toISOString()
  // prepare gql query
  const updateLatsSyncData = `
  mutation update_application_meta($value: timestamptz) {
    update_application_meta(
      where: {key: {_eq: "sync_algolia"}},
      _set: { value: $value }
    ) {
      affected_rows
      returning {
        id
        key
        value
      }
    }
  }
`
try {
  const data = await mutate({
    mutation: updateLatsSyncData,
    variables: { value: dateInUTC }
  });
} catch (e) {
  throw e
}
}

export default handler
