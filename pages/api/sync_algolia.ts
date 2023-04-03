import type { NextApiRequest, NextApiResponse } from 'next'
import algoliasearch from 'algoliasearch'
import { query, mutate } from '@/graphql/hasuraAdmin'
import {
  GetCompaniesByDateDocument,
  GetCompaniesByDateQuery,
  GetDeleteDataActionsDocument,
  GetDeleteDataActionsQuery,
  GetLastSyncDocument,
  GetLastSyncQuery,
  GetPeopleByDateDocument,
  GetPeopleByDateQuery,
  GetVcFirmsByDateDocument,
  GetVcFirmsByDateQuery,
  UpdateApplicationMetaErrorDocument,
  UpdateApplicationMetaErrorMutation,
  UpdateApplicationMetaValueDocument,
  UpdateApplicationMetaValueMutation,
} from "@/graphql/types";

const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!, process.env.ALGOLIA_WRITE_API_KEY!);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // get the last sync datetime from db
  const lastSyncArray = await queryForlastSync();
  if (!lastSyncArray.length) return res.status(405).end();

  const output: Record<string, any> = {}

  // get last sync info for companies
  const companyLastSync = lastSyncArray.find((lastSync: { key: string; }) => lastSync.key === 'sync_companies');
  output['companyLastSync'] = companyLastSync?.value
  if (companyLastSync) {
    try {
      // get all the companies details
      const companyList: any = await queryForCompanyList(companyLastSync.value);

      for (const company of companyList) {
        if (company.logo) {
          company.logo = company.logo.url;
        }
        if (company.coin) {
          company.coinTicker = company.coin.ticker
          company.coinName = company.coin.name
          company.coin = undefined
        }
        company.objectID = company.id;
        delete company.id;
      }
      const companyIndex = client.initIndex('companies');
      await companyIndex.saveObjects(companyList, { autoGenerateObjectIDIfNotExist: true });

      /** Find deleted companies in actions table and remove them in index */
      const deletedCompanies = await queryForDeletedResources("companies", companyLastSync.value);
      companyIndex.deleteObjects(deletedCompanies.map((item: any) => item.resource_id));

      output['companyList'] = companyList.map((p:any) => `${p.id} ${p.name}`).length - deletedCompanies.length;
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
  output['vcfirmsLastSync'] = investorLastSync?.value
  if (investorLastSync) {
    try {
      // get all investors details
      const vcfirmsList: any = await queryForVcFirmsList(investorLastSync.value);

      for (const vc_firm of vcfirmsList) {
        if (vc_firm.logo) {
          vc_firm.logo = vc_firm.logo.url;
        }

        vc_firm.objectID = vc_firm.id;
        delete vc_firm.id;
      }
      const investorIndex = client.initIndex('vc_firms');
      await investorIndex.saveObjects(vcfirmsList, { autoGenerateObjectIDIfNotExist: true });

      /** Find deleted vc_firms in actions table and remove them in index */
      const deletedVcFirms = await queryForDeletedResources("vc_firms", investorLastSync?.value);
      investorIndex.deleteObjects(deletedVcFirms.map((item: any) => item.resource_id));

      output['vcfirmsList'] = vcfirmsList.map((p:any) => `${p.id} ${p.name}`).length - deletedVcFirms.length

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
    output['peopleLastSync'] = peopleLastSync?.value
    if (peopleLastSync) {
      try {
        // get all people details
        const peopleList: any = await queryForPeopleList(peopleLastSync.value);

        for (const people of peopleList) {
          if (people.picture) {
            people.picture = people.picture.url;
          }
          people.objectID = people.id;
          delete people.id;
        }
        const peopleIndex = client.initIndex('people');
        await peopleIndex.saveObjects(peopleList, { autoGenerateObjectIDIfNotExist: true });

        /** Find deleted people in actions table and remove them in index */
        const deletedPeople = await queryForDeletedResources("people", peopleLastSync?.value);
        peopleIndex.deleteObjects(deletedPeople.map((item: any) => item.resource_id));

        output['peopleList'] = peopleList.map((p:any) => `${p.id} ${p.name}`).length - deletedPeople.length;

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
  try {
    const data = await query<GetLastSyncQuery>({
      query: GetLastSyncDocument,
      variables: {}
    })
    return data.data.application_meta
  } catch (ex) {
    throw ex;
  }
}

// queries local user using graphql endpoint
const queryForCompanyList = async (date: any) => {
  try {
    const data = await query<GetCompaniesByDateQuery>({
      query: GetCompaniesByDateDocument,
      variables: { date }
    })
    return data.data.companies
  } catch (ex) {
    throw ex;
  }
}
// queries local user using graphql endpoint
const queryForVcFirmsList = async (date: any) => {
  try {
    const data = await query<GetVcFirmsByDateQuery>({
      query: GetVcFirmsByDateDocument,
      variables: { date }
    })
    return data.data.vc_firms
  } catch (ex) {
    throw ex;
  }
}
// queries local user using graphql endpoint
const queryForPeopleList = async (date: any) => {
  try {
    const data = await query<GetPeopleByDateQuery>({
      query: GetPeopleByDateDocument,
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
  
try {
  await mutate<UpdateApplicationMetaValueMutation>({
    mutation: UpdateApplicationMetaValueDocument,
    variables: { value: dateInUTC, key: keyData }
  });
  } catch (e) {
    throw e
  }
}

const mutateForError = async (keyData: String, error: String) => {
try {
  await mutate<UpdateApplicationMetaErrorMutation>({
    mutation: UpdateApplicationMetaErrorDocument,
    variables: { error, key: keyData }
  });
  } catch (e) {
    throw e
  }
}

const queryForDeletedResources = async (resourceType: string, date: any) => {
  try {
    const data = await query<GetDeleteDataActionsQuery>({
      query: GetDeleteDataActionsDocument,
      variables: { resourceType, date }
    })
    return data.data.actions
  } catch (ex) {
    throw ex;
  }
}

export default handler
