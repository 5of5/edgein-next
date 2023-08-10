import { GetEventsPathsDocument, GetEventsPathsQuery } from "@/graphql/types";
import { generateXMLSiteMap } from "@/utils/sitemap";
import { GetServerSidePropsContext } from "next";

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return generateXMLSiteMap(ctx, GetEventsPathsDocument, (data?: GetEventsPathsQuery) => data?.events || [], 'events');
}

export default SiteMap;