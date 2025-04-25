import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import { NextApiRequest, NextApiResponse } from 'next';

const URLS_PER_SITEMAP = 50000;
const CACHE_DURATION = 3600; // Cache for 1 hour

// Queries for each content type
const QUERIES = {
  companies: gql`
    query GetCompaniesSitemap($offset: Int!, $limit: Int!) {
      companies(offset: $offset, limit: $limit, order_by: {updated_at: desc}) {
        slug
        updated_at
      }
      companies_aggregate {
        aggregate {
          count
        }
      }
    }
  `,
  investors: gql`
    query GetInvestorsSitemap($offset: Int!, $limit: Int!) {
      vc_firms(offset: $offset, limit: $limit, order_by: {updated_at: desc}) {
        slug
        updated_at
      }
      vc_firms_aggregate {
        aggregate {
          count
        }
      }
    }
  `,
  people: gql`
    query GetPeopleSitemap($offset: Int!, $limit: Int!) {
      people(offset: $offset, limit: $limit, order_by: {updated_at: desc}) {
        slug
        updated_at
      }
      people_aggregate {
        aggregate {
          count
        }
      }
    }
  `,
  events: gql`
    query GetEventsSitemap($offset: Int!, $limit: Int!) {
      events(offset: $offset, limit: $limit, order_by: {updated_at: desc}) {
        slug
        updated_at
      }
      events_aggregate {
        aggregate {
          count
        }
      }
    }
  `,
  lists: gql`
    query GetListsSitemap($offset: Int!, $limit: Int!) {
      lists(offset: $offset, limit: $limit, order_by: {updated_at: desc}) {
        id
        updated_at
      }
      lists_aggregate {
        aggregate {
          count
        }
      }
    }
  `,
  groups: gql`
    query GetGroupsSitemap($offset: Int!, $limit: Int!) {
      user_groups(offset: $offset, limit: $limit, order_by: {updated_at: desc}) {
        id
        updated_at
      }
      user_groups_aggregate {
        aggregate {
          count
        }
      }
    }
  `
};

const getDataForType = async (type: string, offset: number) => {
  try {
    const client = getClient();
    const query = QUERIES[type as keyof typeof QUERIES];
    
    if (!query) {
      throw new Error(`Invalid content type: ${type}`);
    }

    const startIndex = offset * URLS_PER_SITEMAP;
    const { data } = await client.query({
      query,
      variables: {
        offset: startIndex,
        limit: URLS_PER_SITEMAP
      },
      fetchPolicy: 'no-cache'
    });

    // Get the total count and validate pagination
    const aggregateKey = type === 'investors' ? 'vc_firms_aggregate' : 
                        type === 'groups' ? 'user_groups_aggregate' : 
                        `${type}_aggregate`;
    const dataKey = type === 'investors' ? 'vc_firms' : 
                   type === 'groups' ? 'user_groups' : 
                   type;
    const totalCount = data[aggregateKey]?.aggregate?.count || 0;
    const maxOffset = Math.ceil(totalCount / URLS_PER_SITEMAP) - 1;

    if (offset > maxOffset) {
      throw new Error(`Invalid offset: ${offset}. Maximum allowed offset is ${maxOffset}`);
    }

    // Only log if there's an issue or if it's useful for monitoring
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Sitemap] ${type}: ${startIndex + 1} to ${Math.min(startIndex + URLS_PER_SITEMAP, totalCount)} of ${totalCount}`);
    }

    return {
      [dataKey]: data[dataKey] || []
    };
  } catch (error) {
    console.error('[Sitemap Error]', error);
    throw error;
  }
};

const generateSitemapXML = (items: any[], type: string) => {
  const baseUrl = process.env.SITE_URL || 'https://www.mentibus.xyz';
  
  const urlPath = type === 'lists' ? 'lists' : 
                  type === 'investors' ? 'investors' :
                  type === 'events' ? 'events' :
                  type === 'people' ? 'people' :
                  type === 'groups' ? 'groups' : 'companies';

  const getSlug = (item: any) => (type === 'lists' || type === 'groups') ? item.id : item.slug;

  const escapeXml = (unsafe: string) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  };

  const urls = items.map(item => ({
    loc: escapeXml(`${baseUrl}/${urlPath}/${getSlug(item)}`),
    lastmod: new Date(item.updated_at).toISOString(),
    changefreq: type === 'events' ? 'daily' : 'weekly',
    priority: type === 'events' ? '0.9' : 
             type === 'companies' || type === 'investors' ? '0.8' : '0.7'
  }));

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return xmlContent.trim();
};

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  try {
    const type = params?.type as string;
    const offset = params?.offset as string;

    if (!type || !offset) {
      return { notFound: true };
    }

    const offsetNum = parseInt(offset, 10);

    if (!QUERIES[type as keyof typeof QUERIES] || isNaN(offsetNum) || offsetNum < 0) {
      return { notFound: true };
    }

    const data = await getDataForType(type as string, offsetNum);
    const dataKey = type === 'investors' ? 'vc_firms' : 
                   type === 'groups' ? 'user_groups' : 
                   type;
    const items = data[dataKey] || [];
    
    if (items.length === 0) {
      return { notFound: true };
    }

    const xml = generateSitemapXML(items, type as string);

    // Set headers
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader(
      'Cache-Control',
      `public, max-age=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`
    );

    // Write the XML directly to the response
    res.write(xml);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('[Sitemap Error]', error);
    return { notFound: true };
  }
};

// This is needed for Next.js but won't be used since we're handling the response directly
export default function SitemapPage() {
  return null;
}
