import { runGraphQl } from "@/utils";
import { GetServerSidePropsContext } from "next";

function generateSiteMap<T extends { slug: string | null}>(rootUrl: string, folder:string, lastModDate: string, data: T[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     ${data
       .map(({ slug }) => {
         return slug ? `
       <url><loc>${rootUrl}/${folder}/${slug}</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
     ` : '';
       })
       .join('')}
   </urlset>
 `;
}

export async function generateXMLSiteMap<T, Arr extends { slug: string | null }>(ctx: GetServerSidePropsContext, graphqlQuery: string, graphqlAccessor: (result?: T) => Arr[], folder: string) {
  // We make an API call to gather the URLs for our site
  const { data } = await runGraphQl<T>(
    graphqlQuery,
    { },
    undefined,
    true,
  );

  const array = graphqlAccessor(data);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(process.env.NEXT_PUBLIC_VERCEL_URL!, folder, new Date().toISOString(), array || []);

  ctx.res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  ctx.res.write(sitemap);
  ctx.res.end();

  return {
    props: {},
  };
}
