import { GetVcFirmsPathDocument, GetVcFirmsPathQuery } from '@/graphql/types';
import { generateXMLSiteMap } from '@/utils/sitemap';
import { GetServerSidePropsContext } from 'next';

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return generateXMLSiteMap(
    ctx,
    GetVcFirmsPathDocument,
    (data?: GetVcFirmsPathQuery) => data?.vc_firms || [],
    'investors',
  );
}

export default SiteMap;
