import qs from "qs";
import axios from "axios";
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { User } from '@/models/User'
import { query, mutate } from '@/graphql/hasuraAdmin'
import CookieService from '../../utils/cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

const hasuraClaims = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["user"],
    "x-hasura-default-role": "user",
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // check email exist in allowedEmail table or not
  const email = req.body.email;
  const password = req.body.password;

  const isEmailAllowed = await queryForAllowedEmailCheck(email)

  // when email does not exist in the allowed emails
  if (!isEmailAllowed) {
    // insert user in waitlist table
    await mutateForWaitlistEmail(email)
    return res.status(404).send(`Invalid Email`)
  }

  // check user has done signup or not
  const emailExist = await queryForExistingUsers(email)
  // if email does not exist, then redirect user for registartion
  if (!emailExist) { return res.status(404).send({ nextStep: 'SIGNUP' }) }

  // send data to auth0 to make user login
  var data = qs.stringify({
    grant_type: 'password',
    username: email,
    scope: 'offline_access',
    password: password,
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET
  });
  
  try {
    const result = await axios({
      method: 'post',
      url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data
    })
    if (!result.data) {
      return res.status(404).send(`Invalid Request`)
    }
  
    // get the user info from auth0
    const userInfo = await axios({
      method: 'get',
      url: `${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`,
      headers: { 
        'Authorization': `Bearer ${result.data.access_token}`, 
      }
    })
  
    if (userInfo.data && userInfo.data.email) {
      // get the user info from the user table
      const { id, email, role, external_id } = await queryForUserInfo(userInfo.data.email);
  
        // Author a couple of cookies to persist a user's session
      const token = await new SignJWT({ user: JSON.stringify({id, email, role, publicAddress: external_id}), ...hasuraClaims })
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('90d')
      .sign(new TextEncoder().encode(process.env.ENCRYPTION_SECRET))
  
      CookieService.setTokenCookie(res, token)
    }
  } catch (ex) {
    return res.status(ex.response.status).send(ex.response.data.error_description)
  }

  res.send({ success: true });
}

// queries local user using graphql endpoint
const queryForAllowedEmailCheck = async (email: string) => {
  // prepare gql query
  const fetchQuery = `
  query query_allowed_emails($email: String) {
    allowed_emails(where: {email: {_eq: $email}}, limit: 1) {
      id
      email
    }
  }
  `
  try {
    const data = await query({
      query: fetchQuery,
      variables: { email }
    })
    return data.data.allowed_emails[0] as User
  } catch (ex) {
    throw ex;
  }
}

const mutateForWaitlistEmail = async (email: string) => {
  // prepare gql query
  const upsertWaitListEmail = `
  mutation upsert_waitlist_email($email: String) {
    insert_waitlist_emails(objects: [{email: $email}], on_conflict: {constraint: waitlist_emails_email_key, update_columns: [email]}) {
      returning {
          id
          email
        }
      }
    }
  `
  try {
    await mutate({
      mutation: upsertWaitListEmail,
      variables: { email }
    });
  } catch (e) {
    throw e
  }
}

const queryForExistingUsers = async (email: string) => {
  // prepare gql query
  const fetchQuery = `
  query query_users($email: String) {
    users(where: {email: {_eq: $email}}, limit: 1) {
      id
      email
    }
  }
  `
  try {
    const data = await query({
      query: fetchQuery,
      variables: { email }
    })
    return data.data.users[0] as User
  } catch (ex) {
    throw ex;
  }
}

// queries local user using graphql endpoint
const queryForUserInfo = async (email: string) => {
  // prepare gql query
  const fetchQuery = `
  query query_users($email: String) {
    users(where: {email: {_eq: $email}}, limit: 1) {
      id
      email
      role
      external_id
    }
  }
  `
  try {
    const data = await query({
      query: fetchQuery,
      variables: { email }
    })
    return data.data.users[0] as User
  } catch (ex) {
    throw ex;
  }
}

export default handler
