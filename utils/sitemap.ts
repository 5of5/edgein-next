import { runGraphQl } from '@/utils';
import { GetServerSidePropsContext } from 'next';
import { escape } from 'lodash';
import { query } from '@/graphql/hasuraAdmin';

export const PER_PAGE_LIMIT = 10_000;

function generateSiteMap<T extends { slug: string | null; updated_at: string }>(
  rootUrl: string,
  folder: string,
  data: T[],
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     ${data
       .map(({ slug, updated_at }) => {
         return slug
           ? `
       <url><loc>${rootUrl}/${folder}/${escape(
               slug,
             )}</loc><lastmod>${updated_at}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
     `
           : '';
       })
       .join('')}
   </urlset>
 `;
}

export async function generateXMLSiteMap<
  T,
  Arr extends { slug: string | null; updated_at: string },
>(
  ctx: GetServerSidePropsContext,
  graphqlQuery: string,
  graphqlAccessor: (result?: T) => Arr[],
  folder: string,
  offset: number,
) {
  // We make an API call to gather the URLs for our site
  const { data } = await query<T>(
    { query: graphqlQuery, variables: { limit: PER_PAGE_LIMIT, offset: offset * PER_PAGE_LIMIT }},
  );

  const array = graphqlAccessor(data);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL!}`,
    folder,
    array || [],
  );

  ctx.res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  ctx.res.write(sitemap);
  ctx.res.end();

  return {
    props: {},
  };
}
