import { escape } from 'lodash';
import { query } from '@/graphql/hasuraAdmin';

export const PER_PAGE_LIMIT = 10_000;

export const getRootUrl = () =>
  process.env.NODE_ENV === 'production'
    ? 'https://edgein.io'
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
) {
  // We make an API call to gather the URLs for our site
  const { data } = await query<T>({
    query: graphqlQuery,
    variables: { limit: PER_PAGE_LIMIT, offset: offset * PER_PAGE_LIMIT },
  });

  const array = graphqlAccessor(data);
  const rootUrl = getRootUrl();

  return array.map(({ slug, updated_at }) => ({
    loc: `${rootUrl}/${folder}/${escape(slug || '')}`,
    lastmod: updated_at,
  }));
}
