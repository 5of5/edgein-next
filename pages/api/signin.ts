import qs from "qs";
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
  const data = qs.stringify({
    grant_type: 'password',
    username: email,
    scope: 'offline_access',
    password: password,
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET
  });

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  
  try {
    const fetchRequest = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    });
    if (!fetchRequest.ok) {
      return res.status(fetchRequest.status).send(fetchRequest.statusText)
    }
    const tokenResponse = JSON.parse(await fetchRequest.text());

    // get user info
    myHeaders.append('Authorization', `Bearer ${tokenResponse.access_token}`);
    const userInfoFetchRequest = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    });
    if (!userInfoFetchRequest.ok) {
      return res.status(userInfoFetchRequest.status).send(userInfoFetchRequest.statusText)
    }
    const userInfoInJson = JSON.parse(await userInfoFetchRequest.text());
  
    if (userInfoInJson && userInfoInJson.email) {
      if (!emailExist.is_auth0_verified) {
        // update userInfo
        await updateEmailVerifiedStatus(userInfoInJson.email, userInfoInJson.email_verified);
      }

      // get the user info from the user table
      const { id, email, role, external_id } = await queryForUserInfo(userInfoInJson.email);
      // Author a couple of cookies to persist a user's session
      const token = await new SignJWT({ user: JSON.stringify({id, email, role, publicAddress: external_id}), ...hasuraClaims })
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('90d')
      .sign(new TextEncoder().encode(process.env.ENCRYPTION_SECRET))
      CookieService.setTokenCookie(res, token)
    }
  } catch (ex: any) {
    return res.status(404).send(ex.message)
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
      is_auth0_verified
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

const updateEmailVerifiedStatus = async (email: String, is_auth0_verified: Boolean) => {
  // prepare gql query
  const updateEmailVerified = `
  mutation update_users($email: String, $is_auth0_verified: Boolean) {
    update_users(
      where: {email: {_eq: $email}},
      _set: { is_auth0_verified: $is_auth0_verified }
    ) {
      affected_rows
      returning {
        id
        email
      }
    }
  }
`
try {
  await mutate({
    mutation: updateEmailVerified,
    variables: { email, is_auth0_verified }
  });
  } catch (e) {
    throw e
  }
}

export default handler
