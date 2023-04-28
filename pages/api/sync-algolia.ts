import type { NextApiRequest, NextApiResponse } from "next";
import algoliasearch from "algoliasearch";
import {
  queryForLastSync,
  syncCompanies,
  syncEvents,
  syncPeople,
  syncVcFirms,
} from "@/utils/algolia";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.ALGOLIA_WRITE_API_KEY!
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // get the last sync datetime from db
  const lastSyncArray = await queryForLastSync();
  if (!lastSyncArray.length) return res.status(405).end();

  const syncWeb3CompaniesOutput = await syncCompanies(
    client,
    lastSyncArray,
    "sync_companies",
    "Web3",
    "companies"
  );
  const syncAICompaniesOutput = await syncCompanies(
    client,
    lastSyncArray,
    "sync_ai_companies",
    "AI",
    "ai_companies"
  );
  const syncWeb3VcFirmsOutput = await syncVcFirms(
    client,
    lastSyncArray,
    "sync_vc_firms",
    "Web3",
    "vc_firms"
  );
  const syncAIVcFirmsOutput = await syncVcFirms(
    client,
    lastSyncArray,
    "sync_ai_vc_firms",
    "AI",
    "ai_vc_firms"
  );
  const syncWeb3PeopleOutput = await syncPeople(
    client,
    lastSyncArray,
    "sync_people",
    "Web3",
    "people"
  );
  const syncAIPeopleOutput = await syncPeople(
    client,
    lastSyncArray,
    "sync_ai_people",
    "AI",
    "ai_people"
  );
  const syncEventsOutput = await syncEvents(client, lastSyncArray);
  const output: Record<string, any> = {
    ...syncWeb3CompaniesOutput,
    ...syncAICompaniesOutput,
    ...syncWeb3VcFirmsOutput,
    ...syncAIVcFirmsOutput,
    ...syncWeb3PeopleOutput,
    ...syncAIPeopleOutput,
    ...syncEventsOutput,
  };

  res.send({ success: true, ...output });
};

export default handler;
