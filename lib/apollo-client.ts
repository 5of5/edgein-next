import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Get environment variables with fallbacks
const HASURA_ENDPOINT = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL || process.env.GRAPHQL_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

// Only throw errors in development
if (process.env.NODE_ENV === 'development') {
  if (!HASURA_ENDPOINT) {
    console.error('NEXT_PUBLIC_HASURA_GRAPHQL_URL or GRAPHQL_ENDPOINT is not defined');
  }
  if (!HASURA_ADMIN_SECRET) {
    console.error('HASURA_ADMIN_SECRET is not defined');
  }
}

const httpLink = createHttpLink({
  uri: HASURA_ENDPOINT,
  headers: {
    'x-hasura-admin-secret': HASURA_ADMIN_SECRET || '',
  },
});

export function getClient() {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  });
} 