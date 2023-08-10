import {
  GetCompaniesPathsDocument,
  GetCompaniesPathsQuery,
} from '@/graphql/types';
import { generateXMLSiteMap } from '@/utils/sitemap';
import { GetServerSidePropsContext } from 'next';

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return generateXMLSiteMap(
    ctx,
    GetCompaniesPathsDocument,
    (data?: GetCompaniesPathsQuery) => data?.companies || [],
    'companies',
  );
}

export default SiteMap;
