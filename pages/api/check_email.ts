import { User } from '@/models/User'
import { query, mutate } from '@/graphql/hasuraAdmin'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // check email exist in allowedEmail table or not
  const email = req.body.email;
  const isEmailAllowed = await queryForAllowedEmailCheck(email)

  // when email does not exist in the allowed emails
  if (!isEmailAllowed) {
    // insert user in waitlist table
    await mutateForWaitlistEmail(email)
    return res.status(404).send(`Invalid Email`)
  }

  // check user exist in user table or not
  const emailExist = await queryForExistingUsers(email)

  let nextStep = 'SIGNUP';
  let loginLink = '';
  if (emailExist) {
    nextStep = 'LOGIN';
    // create the login link
    loginLink = `${process.env.AUTH0_ISSUER_BASE_URL}/authorize?response_type=code&client_id=${process.env.AUTH0_CLIENT_ID}&connection=Username-Password-Authentication&redirect_uri=${process.env.AUTH0_REDIRECT_URL}&scope=openid%20profile%20email%20offline_access`
  }

  res.send({ success: true, nextStep, loginLink });
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
    const data = await mutate({
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

export default handler
