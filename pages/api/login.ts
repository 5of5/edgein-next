import {Magic} from '@magic-sdk/admin'
import CookieService from '../../utils/cookie'
import type { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'
import { SignJWT } from 'jose'

const hasuraClaims = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["user"],
    "x-hasura-default-role": "user",
    // "x-hasura-user-id": "1234567890",
    // "x-hasura-org-id": "123",
    // "x-hasura-custom": "custom-value"
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // exchange the did from Magic for some user data
  const bearer = req.headers.authorization?.split('Bearer')
  const did = bearer?.pop()?.trim()
  const user = await new Magic(process.env.MAGIC_SECRET_KEY).users.getMetadataByToken(did || '')

  // Author a couple of cookies to persist a user's session
  const token = await new SignJWT({user: JSON.stringify(user), ...hasuraClaims})
  .setProtectedHeader({ alg: 'HS256' })
  .setJti(nanoid())
  .setIssuedAt()
  .setExpirationTime('90d')
  .sign(new TextEncoder().encode(process.env.ENCRYPTION_SECRET))
  
   // upser user after login
  upsertUser(user, token)

  CookieService.setTokenCookie(res, token)

  res.send({success: true})
}


// create an authenticated link for accessing graphql
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

// userts user to local db using graphql
const upsertUser = async (user: any, token?: string) => {

  // extract name from email
  const emailFragments = user.email.split('@')

  // prepare gql query
  const usertQuery = `
    mutation upsert_users {
      insert_users (
        objects: [
          {
            external_id: "${user.issuer}",
            email: "${user.email}",
            display_name: "${emailFragments[0]}",
            role: "user"
          }
        ],
        on_conflict: {
          constraint: users_email_key,
          update_columns: [external_id]
        }
      ) {
        returning {
          id
          display_name
          email
        }
      }
    }
  `

  const opts = {
    method: 'POST',
    body: JSON.stringify({ operationName: 'upsert_users', query: usertQuery, variables: null }),
    headers: getHeaders(token)
  }

  try {
    await fetch(process.env.GRAPHQL_ENDPOINT || '', opts)
  }
  catch (e) {
      
  }
  
}


export default handler