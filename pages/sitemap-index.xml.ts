import { PUBLIC_PAGES } from './_middleware';
import { getServerSideSitemapLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { getRootUrl } from '@/utils/sitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const rootUrl = getRootUrl();

  const fields = PUBLIC_PAGES.map(page => ({
    loc: `${rootUrl}${page}`, // Absolute url
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  }));

  return getServerSideSitemapLegacy(ctx, fields)
}

// Default export to prevent next.js errors
export default function SiteMapIndex() {}