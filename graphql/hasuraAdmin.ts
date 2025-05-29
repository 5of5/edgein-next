type TResponse<T> = { data: T };

async function hasuraQuery<TResult = any>(
  args: { query: string; variables: Record<string, any> },
  token?: string,
) {
  // Define a fallback URL for the GraphQL endpoint
  const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT!;

  // Use the hardcoded admin secret as fallback if environment variable is not available
  const adminSecret = process.env.HASURA_ADMIN_SECRET!;

  // Log the URL being used (but not the secret)
  console.log('[GraphQL Admin] Using endpoint:', graphqlEndpoint);

  const opts = {
    method: 'POST',
    body: JSON.stringify({
      query: args.query,
      variables: args.variables,
    }),
    headers: {
      'x-hasura-role': 'admin',
      'x-hasura-admin-secret': adminSecret,
      'Content-Type': 'application/json',
    },
  };
  if (token) {
    // switch to user creds
  }

  // Check if the URL is valid before attempting to fetch
  if (!graphqlEndpoint) {
    throw new Error('GraphQL endpoint URL is missing or invalid');
  }

  try {
    const res = await fetch(graphqlEndpoint, opts);

    // If response is not ok, log the status
    if (!res.ok) {
      console.error(
        `[GraphQL Admin] HTTP error: ${res.status} ${res.statusText}`,
      );
    }

    const json = await res.json();

    if (json.errors) {
      console.log('[GraphQL Admin] GraphQL errors:', json.errors);
      throw json.errors;
    }

    return json as TResponse<TResult>;
  } catch (error) {
    console.error('[GraphQL Admin] Fetch error:', error);
    throw error;
  }
}

export async function mutate<TResult = any>(
  args: { mutation: string; variables: Record<string, any> },
  token?: string,
) {
  return hasuraQuery<TResult>(
    { query: args.mutation, variables: args.variables },
    token,
  );
}

export async function query<TResult = any>(
  args: { query: string; variables: Record<string, any> },
  token?: string,
) {
  return hasuraQuery<TResult>(args, token);
}
