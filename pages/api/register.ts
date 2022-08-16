import axios from "axios";
import { User } from '@/models/User'
import { mutate } from '@/graphql/hasuraAdmin'
import type { NextApiRequest, NextApiResponse } from 'next'
import { EEXIST } from "constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // check email exist in allowedEmail table or not
  const email = req.body.email;
  const password = req.body.password;
  var data = JSON.stringify({
    "client_id": process.env.AUTH0_CLIENT_ID,
    "email": email,
    "password": password,
    "connection": "Username-Password-Authentication"
  });
  
  var config = {
    method: 'post',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/dbconnections/signup`,
    headers: {  'Content-Type': 'application/json' },
    data
  };

  let result;
    try {
      result = await axios(config);
      // upsert user info
      await upsertUser(result.data);
    } catch (e) {
      return res.status(404).send(`Invalid Detail`)
    }

  res.send({ success: true, result: result.data });
}

// upsert user to local db using graphql
const upsertUser = async (auth0Data: any) => {

  // prepare gql query
  // TODO: in conflict constraint
  const usertQuery = `
    mutation upsert_users($external_id: String, $email: String, $role: String) {
      insert_users(objects: [{external_id: $external_id, email: $email, role: $role}], on_conflict: {constraint: users_email_key, update_columns: [external_id]}) {
        returning {
          id
          email
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
        role: 'user', // todo
      }
    })

    return data.data.insert_users.returning[0] as User
  } catch (ex) {
    console.log(ex);
    throw ex;
  }

}

export default handler
