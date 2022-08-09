type Query = {
  operationName: string
  query: string
  variables?: any
}


// create an authenticated link for accessing graphql
export const getHasuraAuthHeaders = (token?: string) => {
  let headers = {}

  // get the authentication token from process if it exists
  if (process.env.DEV_MODE) {
    headers = { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ?? "" }
  } else {
    headers = { Authorization: token ? `Bearer ${token}` : '' }
  }

  // return the headers
  return headers
}

export const doGraphQlQuery = async (query: Query, token: string) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(query),
    headers: getHasuraAuthHeaders(token)
  }

  try {
    const response = await fetch(process.env.GRAPHQL_ENDPOINT || '', opts)
    return await response.json();
  } catch (e) {
    throw e
  }
}
