import type { NextApiRequest, NextApiResponse } from 'next'
import algoliasearch from 'algoliasearch'
import { query, mutate } from '@/graphql/hasuraAdmin'

const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!, process.env.ALGOLIA_WRITE_API_KEY!);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // get the last sync datetime from db
  const lastSyncArray = await queryForlastSync();
  if (!lastSyncArray.length) return res.status(405).end();

  const output: Record<string, any> = {}

  // get last sync info for companies
  const companyLastSync = lastSyncArray.find((lastSync: { key: string; }) => lastSync.key === 'sync_companies');
  output['companyLastSync'] = companyLastSync.value
  if (companyLastSync) {
    try {
      // get all the companies details
      const companyList = await queryForCompanyList(companyLastSync.value);
      output['companyList'] = companyList.map((p:any) => `${p.id} ${p.name}`).length
      for (const company of companyList) {
        if (company.logo) {
          company.logo = company.logo.url;
        }
        company.objectID = company.id;
        delete company.id;
      }
      const companyIndex = client.initIndex('companies');
      await companyIndex.saveObjects(companyList, { autoGenerateObjectIDIfNotExist: true });

       // update the last_sync date to current date
       await mutateForlastSync('sync_companies');
    } catch (error) {
      // update the last_error
      output['companiesError'] = error
      await mutateForError('sync_companies', prepareError(error));
    }
  }

  // get last sync info for investors
  const investorLastSync = lastSyncArray.find((lastSync: { key: string; }) => lastSync.key === 'sync_vc_firms');
  output['vcfirmsLastSync'] = investorLastSync
  if (investorLastSync) {
    try {
      // get all investors details
      const vcfirmsList = await queryForVcFirmsList(investorLastSync.value);
      output['vcfirmsList'] = vcfirmsList.map((p:any) => `${p.id} ${p.name}`).length
      for (const vc_firm of vcfirmsList) {
        if (vc_firm.logo) {
          vc_firm.logo = vc_firm.logo.url;
        }

        vc_firm.objectID = vc_firm.id;
        delete vc_firm.id;
      }
      const investorIndex = client.initIndex('vc_firms');
      await investorIndex.saveObjects(vcfirmsList, { autoGenerateObjectIDIfNotExist: true });

       // update the last_sync date to current date
       await mutateForlastSync('sync_vc_firms');
    } catch (error) {
      // update the last_error
      output['vcfirmsError'] = error
      await mutateForError('sync_vc_firms', prepareError(error));
    }
  }

    // get last sync info for people
    const peopleLastSync = lastSyncArray.find((lastSync: { key: string; }) => lastSync.key === 'sync_people');
    output['peopleLastSync'] = peopleLastSync
    if (peopleLastSync) {
      try {
        // get all people details
        const peopleList = await queryForPeopleList(peopleLastSync.value);
        output['peopleList'] = peopleList.map((p:any) => `${p.id} ${p.name}`).length
        for (const people of peopleList) {
          if (people.picture) {
            people.picture = people.picture.url;
          }
          people.objectID = people.id;
          delete people.id;
        }
        const peopleIndex = client.initIndex('people');
        await peopleIndex.saveObjects(peopleList, { autoGenerateObjectIDIfNotExist: true });

        // update the last_sync date to current date
        await mutateForlastSync('sync_people');
      } catch (error) {
        // update the last_error
        output['peopleError'] = error
        await mutateForError('sync_people', prepareError(error));
      }
    }

    res.send({ success: true, ...output })
}

const prepareError = (error: any) => {
  let preparedError = '';
  if (Array.isArray(error)) {
    // get the error msg from 0th index
    preparedError = error[0].message
  } else {
    preparedError = error.message
  }

  return preparedError;
}

// queries local user using graphql endpoint
const queryForlastSync = async () => {
  // prepare gql query
  const fetchQuery = `
  query query_last_sync {
    application_meta(where: {key: {_in: ["sync_companies", "sync_vc_firms", "sync_people"]}}) {
      id
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
    return data.data.application_meta
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
      aliases
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
const queryForVcFirmsList = async (date: any) => {
  // prepare gql query
  const fetchQuery = `
  query query_vcfirms($date: timestamptz) {
    vc_firms(where: {updated_at: {_gte: $date}}) {
      id
      name
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
    return data.data.vc_firms
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

const mutateForlastSync = async (keyData: String) => {
  const today = new Date();
  const dateInUTC = today.toISOString()
  // prepare gql query
  const updateLatsSyncData = `
  mutation update_application_meta($value: timestamptz, $key: String) {
    update_application_meta(
      where: {key: {_eq: $key}},
      _set: { value: $value, error: "" }
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
  await mutate({
    mutation: updateLatsSyncData,
    variables: { value: dateInUTC, key: keyData }
  });
  } catch (e) {
    throw e
  }
}

const mutateForError = async (keyData: String, error: String) => {
  // prepare gql query
  const updateLatsSyncData = `
  mutation update_application_meta($error: String, $key: String) {
    update_application_meta(
      where: {key: {_eq: $key}},
      _set: { error: $error }
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
  await mutate({
    mutation: updateLatsSyncData,
    variables: { error, key: keyData }
  });
  } catch (e) {
    throw e
  }
}

export default handler
