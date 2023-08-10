import { GetPersonsPathDocument, GetPersonsPathQuery } from "@/graphql/types";
import { generateXMLSiteMap } from "@/utils/sitemap";
import { GetServerSidePropsContext } from "next";

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return generateXMLSiteMap(ctx, GetPersonsPathDocument, (data?: GetPersonsPathQuery) => data?.people || [], 'people');
}

export default SiteMap;