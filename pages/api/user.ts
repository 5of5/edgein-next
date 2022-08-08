import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let user;
  let localUser: any;
  try {
    const token = CookieService.getAuthToken(req.cookies)
    user = await CookieService.getUser(token)

    // get local user from db
    localUser = await queryLocalUser(user, token)

  } catch (error) {
    res.status(401).end()
  }

  // now we have access to the data inside of user
  // and we could make database calls or just send back what we have
  // in the token.
  if (user) {
    res.json({...user, role: localUser.data.users[0].role})
  } else {
    res.status(401).end()
  }
}


+// create an authenticated link for accessing graphql
const getHeaders = (token?: string) => {
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

// queries local user using graphql endpoint
const queryLocalUser = async (user: any, token: string) => {

  const { email } = user

  if (!email) {
    throw new Error('Email not found')
  }

  // prepare gql query
  const fetchQuery = `
    query query_users {
      users(where: {email: {_eq: "${email}"}}, limit: 1) {
        role
        id
        email
        display_name
      }
    }
  `

  const opts = {
    method: 'POST',
    body: JSON.stringify({ operationName: 'query_users', query: fetchQuery, variables: null }),
    headers: getHeaders(token)
  }

  try {
    const user = await fetch(process.env.GRAPHQL_ENDPOINT || '', opts)
    return await user.json();
  } catch (e) {
    throw e
  }
}


export default handler
