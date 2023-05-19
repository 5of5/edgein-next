type TResponse<T> = { data: T};

async function hasuraQuery<TResult = any>(
  args: {query: string, variables: Record<string, any>},
  token?: string,
) {
  const opts = {
    method: "POST",
    body: JSON.stringify({
      query: args.query,
      variables: args.variables
    }),
    headers:   {
      'x-hasura-role': 'admin',
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ?? ""
    }        
  }
  if (token) {
    // switch to user creds
  }
  const res = await fetch(process.env.GRAPHQL_ENDPOINT ?? "", opts);

  const json = await res.json()

  if (json.errors) {
    console.log('gql errors', json.errors)
    throw json.errors
  }

  return json as TResponse<TResult>
}

export async function mutate<TResult = any>(args: {mutation: string, variables: Record<string, any>}, token?: string) {
  return hasuraQuery<TResult>({query: args.mutation, variables: args.variables}, token);
}

export async function query<TResult = any>(args: {query: string, variables: Record<string, any>}, token?: string) {
  return hasuraQuery<TResult>(args, token);
}