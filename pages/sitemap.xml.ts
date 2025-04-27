import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';

const URLS_PER_SITEMAP = 50000;
const CACHE_DURATION = 3600; // Cache for 1 hour

const GET_COUNTS = gql`
  query GetContentCounts {
    companies_aggregate {
      aggregate {
        count
      }
    }
    vc_firms_aggregate {
      aggregate {
        count
      }
    }
    people_aggregate {
      aggregate {
        count
      }
    }
    events_aggregate {
      aggregate {
        count
      }
    }
    lists_aggregate {
      aggregate {
        count
      }
    }
    user_groups_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const generateSitemapIndex = (counts: Record<string, number>) => {
  const baseUrl = process.env.SITE_URL || 'https://www.mentibus.xyz';
  const now = new Date().toISOString();

  const sitemaps = Object.entries(counts).flatMap(([type, count]) => {
    const numSitemaps = Math.ceil(count / URLS_PER_SITEMAP);
    return Array.from({ length: numSitemaps }, (_, i) => ({
      loc: `${baseUrl}/sitemap/${type}/${i}`,
      lastmod: now,
    }));
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps
        .map(
          sitemap => `
        <sitemap>
          <loc>${sitemap.loc}</loc>
          <lastmod>${sitemap.lastmod}</lastmod>
        </sitemap>
      `,
        )
        .join('')}
    </sitemapindex>`;
};

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: GET_COUNTS,
      fetchPolicy: 'no-cache',
    });

    const counts = {
      companies: data.companies_aggregate.aggregate.count,
      investors: data.vc_firms_aggregate.aggregate.count,
      people: data.people_aggregate.aggregate.count,
      events: data.events_aggregate.aggregate.count,
      lists: data.lists_aggregate.aggregate.count,
      groups: data.user_groups_aggregate.aggregate.count,
    };

    const xml = generateSitemapIndex(counts);

    // Set caching headers
    context.res.setHeader(
      'Cache-Control',
      `public, max-age=${CACHE_DURATION}, stale-while-revalidate`,
    );
    context.res.setHeader('Content-Type', 'text/xml');
    context.res.setHeader('Content-Encoding', 'gzip');

    // Compress and send the XML
    const zlib = require('zlib');
    const compressed = zlib.gzipSync(xml);
    context.res.write(compressed);
    context.res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Sitemap index generation error:', error);
    return { notFound: true };
  }
};

export default function SitemapIndex() {
  return null;
}
