import { escape } from 'lodash';
import { query } from '@/graphql/hasuraAdmin';
import { ISitemapField } from 'next-sitemap';

// Increased pagination size for better performance
export const PER_PAGE_LIMIT = 50_000;

export const getRootUrl = () =>
  process.env.NODE_ENV === 'production'
    ? 'https://www.mentibus.xyz'
    : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

export async function generateXMLSiteMapPages<
  T,
  Arr extends { slug: string | null; updated_at: string },
>(
  graphqlQuery: string,
  graphqlAccessor: (result?: T) => Arr[],
  folder: string,
  offset: number,
): Promise<ISitemapField[]> {
  // We make an API call to gather the URLs for our site
  const { data } = await query<T>({
    query: graphqlQuery,
    variables: { limit: PER_PAGE_LIMIT, offset: offset * PER_PAGE_LIMIT },
  });

  const array = graphqlAccessor(data);
  const rootUrl = getRootUrl();

  // Add priority and changefreq based on content type
  const getPriority = (type: string) => {
    switch (type) {
      case 'events':
        return 0.9;
      case 'companies':
      case 'investors':
      case 'people':
        return 0.8;
      case 'lists':
      case 'news':
        return 0.7;
      default:
        return 0.5;
    }
  };

  const getChangefreq = (type: string): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' => {
    switch (type) {
      case 'events':
        return 'weekly';
      case 'news':
        return 'daily';
      default:
        return 'monthly';
    }
  };

  return array.map(({ slug, updated_at }) => ({
    loc: `${rootUrl}/${folder}/${escape(slug || '')}`,
    lastmod: updated_at,
    priority: getPriority(folder),
    changefreq: getChangefreq(folder),
  }));
}
