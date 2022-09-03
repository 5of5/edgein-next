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

  const data = JSON.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    email,
    password: req.body.password,
    name: req.body.name,
    user_metadata: { role: "user" },
    connection: "Username-Password-Authentication"
  });

  let result;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  try {
    const fetchRequest = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/dbconnections/signup`, {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    });
    if (!fetchRequest.ok) {
      return res.status(fetchRequest.status).send(fetchRequest.statusText)
    }
    result = JSON.parse(await fetchRequest.text());
    // upsert user info
    await upsertUser(result);
  } catch (ex: any) {
    return res.status(404).send(ex.message)
  }

  res.send({ success: true, result });
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

// upsert user to local db using graphql
const upsertUser = async (auth0Data: any) => {
  // prepare gql query
  const usertQuery = `
    mutation upsert_users($external_id: String, $email: String, $role: String, $display_name: String) {
      insert_users(objects: [{external_id: $external_id, email: $email, role: $role, display_name: $display_name}], on_conflict: {constraint: users_email_key, update_columns: [external_id]}) {
        returning {
          id
          email
          display_name
          role
        }
      }
    }
  `
  try {
    const data = await mutate({
      mutation: usertQuery,
      variables: {
        external_id: auth0Data._id,
        email: auth0Data.email,
        display_name: auth0Data.name,
        role: 'user',
      }
    })

    return data.data.insert_users.returning[0] as User
  } catch (ex) {
    console.log(ex);
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

export default handler
