import { GetServerSidePropsContext } from "next";

const xml = (rootUrl: string, lastModDate: string) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url><loc>${rootUrl}/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/brand-assets/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/companies/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/contact/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/events/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/groups/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/investors/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/login/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/news/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/pricing/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/privacy/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/signup/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/support/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/team/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
<url><loc>${rootUrl}/terms/</loc><lastmod>${lastModDate}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
</urlset>`;

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  ctx.res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  ctx.res.write(xml(process.env.NEXT_PUBLIC_VERCEL_URL!, new Date().toISOString()));
  ctx.res.end();

  return {
    props: {},
  };
}

export default SiteMap;