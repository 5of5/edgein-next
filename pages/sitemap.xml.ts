import { query } from '@/graphql/hasuraAdmin';
import {
  GetSiteMapAggregatesDocument,
  GetSiteMapAggregatesQuery,
} from '@/graphql/types';
import { runGraphQl } from '@/utils';
import { PER_PAGE_LIMIT } from '@/utils/sitemap';
import { GetServerSidePropsContext } from 'next';

const xml = (
  rootUrl: string,
  data?: GetSiteMapAggregatesQuery,
) => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${rootUrl}/sitemap-index.xml</loc></sitemap>
  ${Array.from(
    {
      length: Math.ceil(
        (data?.companies_aggregate.aggregate?.count || 1) / PER_PAGE_LIMIT,
      ),
    },
    (_, i) =>
      `   <sitemap><loc>${rootUrl}/sitemap/companies/${i}.xml</loc></sitemap>
  `,
  ).join('')}
  ${Array.from(
    {
      length: Math.ceil(
        (data?.events_aggregate.aggregate?.count || 1) / PER_PAGE_LIMIT,
      ),
    },
    (_, i) =>
      `   <sitemap><loc>${rootUrl}/sitemap/events/${i}.xml</loc></sitemap>
  `,
  ).join('')}
  ${Array.from(
    {
      length: Math.ceil(
        (data?.vc_firms_aggregate.aggregate?.count || 1) / PER_PAGE_LIMIT,
      ),
    },
    (_, i) =>
      `   <sitemap><loc>${rootUrl}/sitemap/investors/${i}.xml</loc></sitemap>
  `,
  ).join('')}
  ${Array.from(
    {
      length: Math.ceil(
        (data?.people_aggregate.aggregate?.count || 1) / PER_PAGE_LIMIT,
      ),
    },
    (_, i) =>
      `   <sitemap><loc>${rootUrl}/sitemap/people/${i}.xml</loc></sitemap>
  `,
  ).join('')} 
    </sitemapindex>`;

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { data } = await query<GetSiteMapAggregatesQuery>(
    { query: GetSiteMapAggregatesDocument, variables: { }},
  );

  ctx.res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  ctx.res.write(xml(`https://${process.env.NEXT_PUBLIC_VERCEL_URL!}`, data));
  ctx.res.end();

  return {
    props: {},
  };
}

export default SiteMap;
