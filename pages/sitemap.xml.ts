import { query } from '@/graphql/hasuraAdmin';
import {
  GetSiteMapAggregatesDocument,
  GetSiteMapAggregatesQuery,
} from '@/graphql/types';
import { PER_PAGE_LIMIT, getRootUrl } from '@/utils/sitemap';
import { getServerSideSitemapIndexLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'

const getIndexes = (
  rootUrl: string,
  data?: GetSiteMapAggregatesQuery,
) => [
  `${rootUrl}/sitemap-index.xml`,
  ...Array.from(
    {
      length: Math.ceil(
        (data?.companies_aggregate.aggregate?.count || 1) / PER_PAGE_LIMIT,
      ),
    },
    (_, i) =>
      `${rootUrl}/sitemap/companies/${i}.xml`
  ),
  ...Array.from(
    {
      length: Math.ceil(
        (data?.events_aggregate.aggregate?.count || 1) / PER_PAGE_LIMIT,
      ),
    },
    (_, i) =>
      `${rootUrl}/sitemap/events/${i}.xml`
  ),
  ...Array.from(
    {
      length: Math.ceil(
        (data?.vc_firms_aggregate.aggregate?.count || 1) / PER_PAGE_LIMIT,
      ),
    },
    (_, i) =>
      `${rootUrl}/sitemap/investors/${i}.xml`,
  ),
  ...Array.from(
    {
      length: Math.ceil(
        (data?.people_aggregate.aggregate?.count || 1) / PER_PAGE_LIMIT,
      ),
    },
    (_, i) =>
      `${rootUrl}/sitemap/people/${i}.xml`),
  ]

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await query<GetSiteMapAggregatesQuery>(
    { query: GetSiteMapAggregatesDocument, variables: { }},
  );

  const urls = getIndexes(getRootUrl(), data);

  return getServerSideSitemapIndexLegacy(ctx, urls)
}

// Default export to prevent next.js errors
export default function SiteMap() {}