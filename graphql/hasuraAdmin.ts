async function hasuraMutate<TResult = any>(
  args: {mutation: string, variables: Record<string, any>},
) {
  const opts = {
    method: "POST",
    body: JSON.stringify({
      query: args.mutation,
      variables: args.variables
    }),
    headers:   {
      'x-hasura-role': 'admin',
      'x-hasura-admin-secret': process.env.HASURA_SECRET ?? ""
    }        
  }
  const res = await fetch(process.env.GRAPHQL_ENDPOINT ?? "", opts);

  const json = await res.json()

  if (json.errors) {
    throw json.errors
  }

  return json as TResult
}

export async function mutate<TResult = any>(args: {mutation: string, variables: Record<string, any>}) {
  return hasuraMutate<TResult>(args);
}