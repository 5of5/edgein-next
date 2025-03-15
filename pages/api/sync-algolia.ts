import type { NextApiRequest, NextApiResponse } from 'next';
import algoliasearch from 'algoliasearch';
import {
  queryForLastSync,
  syncCompanies,
  syncEvents,
  syncNews,
  syncPeople,
  syncVcFirms,
} from '@/utils/algolia';
import UserService, { USER_ROLES } from '@/utils/users';

const client = algoliasearch(
  process.env.ALGOLIA_WRITE_APPLICATION_ID!,
  process.env.ALGOLIA_WRITE_API_KEY!,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { role } = (await UserService.getUserByCookies(req.cookies)) ?? {};
  if (role !== USER_ROLES.ADMIN) {
    return res.status(401).json({
      message: 'You are unauthorized for this operation!',
    });
  }
  // get the last sync datetime from db
  const lastSyncArray = await queryForLastSync();
  if (!lastSyncArray.length) return res.status(405).end();

  const syncWeb3CompaniesOutput = await syncCompanies({
    client,
    lastSyncArray,
    key: 'sync_web3_companies',
    library: 'Web3',
    index: 'companies',
  });
  const syncAICompaniesOutput = await syncCompanies({
    client,
    lastSyncArray,
    key: 'sync_ai_companies',
    library: 'AI',
    index: 'ai_companies',
  });
  const syncWeb3VcFirmsOutput = await syncVcFirms({
    client,
    lastSyncArray,
    key: 'sync_web3_vc_firms',
    library: 'Web3',
    index: 'vc_firms',
  });
  const syncAIVcFirmsOutput = await syncVcFirms({
    client,
    lastSyncArray,
    key: 'sync_ai_vc_firms',
    library: 'AI',
    index: 'ai_vc_firms',
  });
  const syncWeb3PeopleOutput = await syncPeople({
    client,
    lastSyncArray,
    key: 'sync_web3_people',
    library: 'Web3',
    index: 'people',
  });
  const syncAIPeopleOutput = await syncPeople({
    client,
    lastSyncArray,
    key: 'sync_ai_people',
    library: 'AI',
    index: 'ai_people',
  });
  const syncWeb3EventsOutput = await syncEvents({
    client,
    lastSyncArray,
    key: 'sync_web3_events',
    library: 'Web3',
    index: 'events',
  });
  const syncAIEventsOutput = await syncEvents({
    client,
    lastSyncArray,
    key: 'sync_ai_events',
    library: 'AI',
    index: 'ai_events',
  });
  const syncWeb3NewsOutput = await syncNews({
    client,
    lastSyncArray,
    key: 'sync_web3_news',
    library: 'Web3',
    index: 'news',
  });
  const syncAINewsOutput = await syncNews({
    client,
    lastSyncArray,
    key: 'sync_ai_news',
    library: 'AI',
    index: 'ai_news',
  });
  const output: Record<string, any> = {
    ...syncWeb3CompaniesOutput,
    ...syncAICompaniesOutput,
    ...syncWeb3VcFirmsOutput,
    ...syncAIVcFirmsOutput,
    ...syncWeb3PeopleOutput,
    ...syncAIPeopleOutput,
    ...syncWeb3EventsOutput,
    ...syncAIEventsOutput,
    ...syncWeb3NewsOutput,
    ...syncAINewsOutput,
  };

  res.send({ success: true, ...output });
};

export default handler;
