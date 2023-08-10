import { GetServerSidePropsContext } from 'next';

const xml = (rootUrl: string) => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${rootUrl}/sitemap-index.xml</loc></sitemap>
  <sitemap><loc>${rootUrl}/companies/sitemap.xml</loc></sitemap>
  <sitemap><loc>${rootUrl}/events/sitemap.xml</loc></sitemap>
  <sitemap><loc>${rootUrl}/investors/sitemap.xml</loc></sitemap>
  <sitemap><loc>${rootUrl}/people/sitemap.xml</loc></sitemap>
</sitemapindex>`;

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  ctx.res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  ctx.res.write(xml(`https://${process.env.NEXT_PUBLIC_VERCEL_URL!}`));
  ctx.res.end();

  return {
    props: {},
  };
}

export default SiteMap;
