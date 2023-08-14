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
        'companies',
        offset,
      );
    case 'events':
      return generateXMLSiteMap(
        ctx,
        GetEventsPathsDocument,
        (data?: GetEventsPathsQuery) => data?.events || [],
        'events',
        offset,
      );
    case 'investors':
      return generateXMLSiteMap(
        ctx,
        GetVcFirmsPathDocument,
        (data?: GetVcFirmsPathQuery) => data?.vc_firms || [],
        'investors',
        offset,
      );
    case 'people':
      return generateXMLSiteMap(
        ctx,
        GetPersonsPathDocument,
        (data?: GetPersonsPathQuery) => data?.people || [],
        'people',
        offset,
      );
  }
  return {
    props: {},
  };
}

export default SiteMap;
