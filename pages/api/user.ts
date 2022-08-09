import { User } from '@/models/User';
import { doGraphQlQuery } from '@/utils/hasura-helpers';
import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let user;
  let localUser: User;
  try {
    const token = CookieService.getAuthToken(req.cookies)
    user = await CookieService.getUser(token)

    // get local user from db
    localUser = await queryLocalUser(user, token)

    // now we have access to the data inside of user
    // and we could make database calls or just send back what we have
    // in the token.
    if (user) {
      res.json({ ...user, role: localUser.role })
    } else {
      res.status(401).end()
    }

  } catch (error) {
    res.status(401).end()
  }
}

// queries local user using graphql endpoint
const queryLocalUser = async (user: any, token: string) => {

  // extract email from user
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
      }
    }
  `

  try {
    const user = await doGraphQlQuery({
      operationName: 'query_users',
      query: fetchQuery,
      variables: null
    }, token)

    return user.data.users[0];
  } catch (e) {
    throw e
  }
}


export default handler
