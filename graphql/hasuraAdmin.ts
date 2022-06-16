import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

function newApolloClient(name: string, headers: Record<string,any> = {}) {
  return new ApolloClient({
    name,
    link: ApolloLink.from([
      new HttpLink({
        uri: process.env.GRAPHQL_ENDPOINT,
        fetch,
        headers,
        credentials: 'same-origin'
      })
    ]),
    cache: new InMemoryCache(),
  })
}

export const hasuraAdmin = newApolloClient(
  'hasura-admin',
  {
    'x-hasura-role': 'admin',
    'x-hasura-admin-secret': process.env.HASURA_SECRET
  }
)

async function hasuraMutate<TResult = any>(
  client: ApolloClient<any>,
  args: any,
) {
  const res = await client.mutate<TResult>(args);
  if (res.errors) {
    throw res.errors
  }
}

export async function mutate<TResult = any>(args: any) {
  return hasuraMutate<TResult>(hasuraAdmin, args);
}