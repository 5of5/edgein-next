import { doGraphQlQuery } from '@/utils/hasura-helpers';
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

  const nextStep = emailExist ? 'LOGIN' : 'SIGNUP';

  res.send({ success: true, nextStep });
}

// queries local user using graphql endpoint
const queryForAllowedEmailCheck = async (email: string) => {
  // prepare gql query
  const fetchQuery = `
    query query_allowed_emails {
      allowed_emails(where: {email: {_eq: "${email}"}}, limit: 1) {
        id
        email
      }
    }
  `

  try {
    const user = await doGraphQlQuery({
      operationName: 'query_allowed_emails',
      query: fetchQuery,
      variables: null
    }, '')

    return user.data.allowed_emails[0];
  } catch (e) {
    throw e
  }
}

const mutateForWaitlistEmail = async (email: string) => {
  // prepare gql query
  const fetchQuery = `
    mutation upsert_waitlist_email {
      insert_waitlist_emails (
        objects: [
          {
            email: "${email}"
          }
        ]
      ) {
        returning {
          id
          email
        }
      }
    }
  `

  try {
    const test = await doGraphQlQuery({
      operationName: 'upsert_waitlist_email',
      query: fetchQuery,
      variables: null
    }, '');
    // TODO: check on email unique contratints
    console.log(test);
  } catch (e) {
    throw e
  }
}

const queryForExistingUsers = async (email: string) => {
  // prepare gql query
  const fetchQuery = `
    query query_users {
      users(where: {email: {_eq: "${email}"}}, limit: 1) {
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
    }, '')

    return user.data.users[0];
  } catch (e) {
    throw e
  }
}

export default handler
