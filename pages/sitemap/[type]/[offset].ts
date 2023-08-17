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
import { generateXMLSiteMap } from '@/utils/sitemap';
import { GetServerSidePropsContext } from 'next';

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext & { params: { offset: string; type: string } },
) {
  const offset = parseInt(ctx.params.offset) || 0;
  switch (ctx.params.type) {
    case 'companies':
      return generateXMLSiteMap(
        ctx,
        GetCompaniesPathsDocument,
        (data?: GetCompaniesPathsQuery) => data?.companies || [],
        ctx.params.type,
        offset,
      );
    case 'events':
      return generateXMLSiteMap(
        ctx,
        GetEventsPathsDocument,
        (data?: GetEventsPathsQuery) => data?.events || [],
        ctx.params.type,
        offset,
      );
    case 'investors':
      return generateXMLSiteMap(
        ctx,
        GetVcFirmsPathDocument,
        (data?: GetVcFirmsPathQuery) => data?.vc_firms || [],
        ctx.params.type,
        offset,
      );
    case 'people':
      return generateXMLSiteMap(
        ctx,
        GetPersonsPathDocument,
        (data?: GetPersonsPathQuery) => data?.people || [],
        ctx.params.type,
        offset,
      );
  }
  return {
    props: {},
  };
}

export default SiteMap;
