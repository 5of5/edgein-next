import {
  GetCompaniesPathsDocument,
  GetCompaniesPathsQuery,
  GetEventsPathsDocument,
  GetEventsPathsQuery,
  GetPersonsPathDocument,
  GetPersonsPathQuery,
  GetVcFirmsPathDocument,
  GetVcFirmsPathQuery,
} from '@/graphql/types';
import { generateXMLSiteMapPages } from '@/utils/sitemap';
import { GetServerSidePropsContext } from 'next';
import { getServerSideSitemapLegacy } from 'next-sitemap';

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext & { params: { offset: string; type: string } },
) {
  const offset = parseInt(ctx.params.offset) || 0;
  let fields: {
    loc: string;
    lastmod: string;
  }[] = [];
  switch (ctx.params.type) {
    case 'companies':
      fields = await generateXMLSiteMapPages(
        GetCompaniesPathsDocument,
        (data?: GetCompaniesPathsQuery) => data?.companies || [],
        ctx.params.type,
        offset,
      );
      break;
    case 'events':
      fields = await generateXMLSiteMapPages(
        GetEventsPathsDocument,
        (data?: GetEventsPathsQuery) => data?.events || [],
        ctx.params.type,
        offset,
      );
      break;
    case 'investors':
      fields = await generateXMLSiteMapPages(
        GetVcFirmsPathDocument,
        (data?: GetVcFirmsPathQuery) => data?.vc_firms || [],
        ctx.params.type,
        offset,
      );
      break;
    case 'people':
      fields = await generateXMLSiteMapPages(
        GetPersonsPathDocument,
        (data?: GetPersonsPathQuery) => data?.people || [],
        ctx.params.type,
        offset,
      );
      break;
  }
  return getServerSideSitemapLegacy(ctx, fields);
}

export default SiteMap;
