import { query, mutate } from '@/graphql/hasuraAdmin';
import {
  GetCompaniesByDateDocument,
  GetCompaniesByDateQuery,
  GetDeleteDataActionsDocument,
  GetDeleteDataActionsQuery,
  GetEventsByDateDocument,
  GetEventsByDateQuery,
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
} from '@/graphql/types';
import { SearchClient } from 'algoliasearch';

type LibraryTypes = 'Web3' | 'AI';

type SyncParams = {
  client: SearchClient;
  lastSyncArray: GetLastSyncQuery['application_meta'];
  key: string;
  library: LibraryTypes;
  index: string;
};

export const queryForLastSync = async () => {
  const data = await query<GetLastSyncQuery>({
    query: GetLastSyncDocument,
    variables: {},
  });
  return data.data.application_meta;
};

const queryForCompanyList = async (date: any, library: LibraryTypes) => {
  const data = await query<GetCompaniesByDateQuery>({
    query: GetCompaniesByDateDocument,
    variables: { date, library },
  });
  return data.data.companies;
};

const queryForVcFirmsList = async (date: any, library: LibraryTypes) => {
  const data = await query<GetVcFirmsByDateQuery>({
    query: GetVcFirmsByDateDocument,
    variables: { date, library },
  });
  return data.data.vc_firms;
};

const queryForPeopleList = async (date: any, library: LibraryTypes) => {
  const data = await query<GetPeopleByDateQuery>({
    query: GetPeopleByDateDocument,
    variables: { date, library },
  });
  return data.data.people;
};

const queryForEventList = async (date: any, library: LibraryTypes) => {
  const data = await query<GetEventsByDateQuery>({
    query: GetEventsByDateDocument,
    variables: { date, library },
  });
  return data.data.events;
};

const mutateForLastSync = async (keyData: String) => {
  const today = new Date();
  const dateInUTC = today.toISOString();

  await mutate<UpdateApplicationMetaValueMutation>({
    mutation: UpdateApplicationMetaValueDocument,
    variables: { value: dateInUTC, key: keyData },
  });
};

const mutateForError = async (keyData: String, error: String) => {
  await mutate<UpdateApplicationMetaErrorMutation>({
    mutation: UpdateApplicationMetaErrorDocument,
    variables: { error, key: keyData },
  });
};

const queryForDeletedResources = async (resourceType: string, date: any) => {
  const data = await query<GetDeleteDataActionsQuery>({
    query: GetDeleteDataActionsDocument,
    variables: { resourceType, date },
  });
  return data.data.actions;
};

const prepareError = (error: any) => {
  let preparedError = '';
  if (Array.isArray(error)) {
    // get the error msg from 0th index
    preparedError = error[0].message;
  } else {
    preparedError = error.message;
  }

  return preparedError;
};

export const syncCompanies = async (params: SyncParams) => {
  const { client, lastSyncArray, key, library, index } = params;
  const output: Record<string, any> = {};
  const companyLastSync = lastSyncArray.find(
    (lastSync: { key: string }) => lastSync.key === key,
  );
  output[`companyLastSync_${key}`] = companyLastSync?.value;
  if (companyLastSync) {
    try {
      // get all the companies details
      const companyList: any = await queryForCompanyList(
        companyLastSync.value,
        library,
      );

      for (const company of companyList) {
        if (company.logo) {
          company.logo = company.logo.url;
        }
        if (company.coin) {
          company.coinTicker = company.coin.ticker;
          company.coinName = company.coin.name;
          company.coin = undefined;
        }
        company.objectID = company.id;
        delete company.id;
      }
      const companyIndex = client.initIndex(index);
      await companyIndex.saveObjects(companyList, {
        autoGenerateObjectIDIfNotExist: true,
      });

      /** Find deleted companies in actions table and remove them in index */
      const deletedCompanies = await queryForDeletedResources(
        'companies',
        companyLastSync.value,
      );
      companyIndex.deleteObjects(
        deletedCompanies.map((item: any) => item.resource_id),
      );

      output[`companyList_${key}`] =
        companyList.map((p: any) => `${p.id} ${p.name}`).length -
        deletedCompanies.length;
      // update the last_sync date to current date
      await mutateForLastSync(key);
    } catch (error) {
      // update the last_error
      output[`companiesError_${key}`] = error;
      await mutateForError(key, prepareError(error));
    }
  }
  return output;
};

export const syncVcFirms = async (params: SyncParams) => {
  const { client, lastSyncArray, key, library, index } = params;
  const output: Record<string, any> = {};
  const investorLastSync = lastSyncArray.find(
    (lastSync: { key: string }) => lastSync.key === key,
  );
  output[`vcfirmsLastSync${key}`] = investorLastSync?.value;
  if (investorLastSync) {
    try {
      const vcfirmsList: any = await queryForVcFirmsList(
        investorLastSync.value,
        library,
      );

      for (const vc_firm of vcfirmsList) {
        if (vc_firm.logo) {
          vc_firm.logo = vc_firm.logo.url;
        }

        vc_firm.objectID = vc_firm.id;
        delete vc_firm.id;
      }
      const investorIndex = client.initIndex(index);
      await investorIndex.saveObjects(vcfirmsList, {
        autoGenerateObjectIDIfNotExist: true,
      });

      /** Find deleted vc_firms in actions table and remove them in index */
      const deletedVcFirms = await queryForDeletedResources(
        'vc_firms',
        investorLastSync?.value,
      );
      investorIndex.deleteObjects(
        deletedVcFirms.map((item: any) => item.resource_id),
      );

      output[`vcfirmsList_${key}`] =
        vcfirmsList.map((p: any) => `${p.id} ${p.name}`).length -
        deletedVcFirms.length;

      // update the last_sync date to current date
      await mutateForLastSync(key);
    } catch (error) {
      // update the last_error
      output[`vcfirmsError_${key}`] = error;
      await mutateForError(key, prepareError(error));
    }
  }
  return output;
};

export const syncPeople = async (params: SyncParams) => {
  const { client, lastSyncArray, key, library, index } = params;
  const output: Record<string, any> = {};
  const peopleLastSync = lastSyncArray.find(
    (lastSync: { key: string }) => lastSync.key === key,
  );
  output[`peopleLastSync_${key}`] = peopleLastSync?.value;
  if (peopleLastSync) {
    try {
      // get all people details
      const peopleList: any = await queryForPeopleList(
        peopleLastSync.value,
        library,
      );

      for (const people of peopleList) {
        if (people.picture) {
          people.picture = people.picture.url;
        }
        people.objectID = people.id;
        delete people.id;
      }
      const peopleIndex = client.initIndex(index);
      await peopleIndex.saveObjects(peopleList, {
        autoGenerateObjectIDIfNotExist: true,
      });

      /** Find deleted people in actions table and remove them in index */
      const deletedPeople = await queryForDeletedResources(
        'people',
        peopleLastSync?.value,
      );
      peopleIndex.deleteObjects(
        deletedPeople.map((item: any) => item.resource_id),
      );

      output[`peopleList_${key}`] =
        peopleList.map((p: any) => `${p.id} ${p.name}`).length -
        deletedPeople.length;

      // update the last_sync date to current date
      await mutateForLastSync(key);
    } catch (error) {
      // update the last_error
      output[`peopleError_${key}`] = error;
      await mutateForError(key, prepareError(error));
    }
  }
  return output;
};

export const syncEvents = async (params: SyncParams) => {
  const { client, lastSyncArray, key, library, index } = params;
  const output: Record<string, any> = {};
  const eventLastSync = lastSyncArray.find(
    (lastSync: { key: string }) => lastSync.key === key,
  );
  output[`eventLastSync_${key}`] = eventLastSync?.value;
  if (eventLastSync) {
    try {
      // get all the events details
      const eventList: any = await queryForEventList(
        eventLastSync.value,
        library,
      );

      for (const event of eventList) {
        if (event.banner) {
          event.banner = event.banner.url;
        }
        event.objectID = event.id;
        delete event.id;
      }
      const eventIndex = client.initIndex(index);
      await eventIndex.saveObjects(eventList, {
        autoGenerateObjectIDIfNotExist: true,
      });

      /** Find deleted events in actions table and remove them in index */
      const deletedEvents = await queryForDeletedResources(
        'events',
        eventLastSync.value,
      );
      eventIndex.deleteObjects(
        deletedEvents.map((item: any) => item.resource_id),
      );

      output[`eventList_${key}`] =
        eventList.map((p: any) => `${p.id} ${p.name}`).length -
        deletedEvents.length;
      // update the last_sync date to current date
      await mutateForLastSync(key);
    } catch (error) {
      // update the last_error
      output[`eventsError_${key}`] = error;
      await mutateForError(key, prepareError(error));
    }
  }
  return output;
};
