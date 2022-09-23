import { mutate, query } from '@/graphql/hasuraAdmin'
import { User } from '@/models/User';

async function queryForAllowedEmailCheck(email: string) {
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

async function mutateForWaitlistEmail(email: string) {
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

async function findOneUserByEmail(email: string) {
  const fetchQuery = `
  query query_users($email: String) {
    users(where: {email: {_eq: $email}}, limit: 1) {
      id
      email
      role
      external_id
      is_auth0_verified
      display_name
      auth0_linkedin_id
      auth0_user_pass_id
      reference_id
      person {
        name
        picture
      }
      additional_emails
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

async function upsertUser(userData: any) {
  // prepare gql query
  const usertQuery = `
    mutation upsert_users($external_id: String, $email: String, $role: String, $display_name: String, $auth0_linkedin_id: String, $auth0_user_pass_id: String, $reference_user_id: Int) {
      insert_users(objects: [{external_id: $external_id, email: $email, role: $role, display_name: $display_name, auth0_linkedin_id: $auth0_linkedin_id, auth0_user_pass_id: $auth0_user_pass_id, reference_user_id: $reference_user_id}], on_conflict: {constraint: users_email_key, update_columns: [external_id]}) {
        returning {
          id
          email
          role
          external_id
          is_auth0_verified
          display_name
          auth0_linkedin_id
          auth0_user_pass_id
          reference_id
          person {
            name
            picture
          }
          additional_emails
        }
      }
    }
  `
  try {
    const data = await mutate({
      mutation: usertQuery,
      variables: {
        external_id: userData._id,
        email: userData.email,
        display_name: userData.name,
        role: 'user',
        auth0_linkedin_id: userData.auth0_linkedin_id ? userData.auth0_linkedin_id : '',
        auth0_user_pass_id: userData.auth0_user_pass_id ? userData.auth0_user_pass_id : '',
        reference_user_id: userData.reference_user_id,
      }
    })

    return data.data.insert_users.returning[0] as User
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}

async function updateEmailVerifiedStatus(email: string, is_auth0_verified: boolean) {
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
        role
        external_id
        is_auth0_verified
        display_name
        auth0_linkedin_id
        auth0_user_pass_id
        reference_id
        person {
          name
          picture
        }
        additional_emails
      }
    }
  }
`
try {
  const data = await mutate({
    mutation: updateEmailVerified,
    variables: { email, is_auth0_verified }
  });
  return data.data.update_users.returning[0] as User
  } catch (e) {
    throw e
  }
}

async function updateAuth0LinkedInId(email: string, auth0_linkedin_id: string) {
  const updateAuth0LinkedIn = `
  mutation update_users($email: String, $auth0_linkedin_id: String) {
    update_users(
      where: {email: {_eq: $email}},
      _set: { auth0_linkedin_id: $auth0_linkedin_id }
    ) {
      affected_rows
      returning {
        id
        email
        role
        external_id
        is_auth0_verified
        display_name
        auth0_linkedin_id
        auth0_user_pass_id
        reference_id
        person {
          name
          picture
        }
        additional_emails
      }
    }
  }
`
try {
  const data = await mutate({
    mutation: updateAuth0LinkedIn,
    variables: { email, auth0_linkedin_id }
  });
  return data.data.update_users.returning[0] as User
  } catch (e) {
    throw e
  }
}

async function updateAuth0UserPassId(email: string, auth0_user_pass_id: string) {
  const updateAuth0UserPass = `
  mutation update_users($email: String, $auth0_user_pass_id: String) {
    update_users(
      where: {email: {_eq: $email}},
      _set: { auth0_user_pass_id: $auth0_user_pass_id }
    ) {
      affected_rows
      returning {
        id
        email
        role
        external_id
        is_auth0_verified
        display_name
        auth0_linkedin_id
        auth0_user_pass_id
        reference_id
        person {
          name
          picture
        }
        additional_emails
      }
    }
  }
`
try {
  const data = await mutate({
    mutation: updateAuth0UserPass,
    variables: { email, auth0_user_pass_id }
  });
  return data.data.update_users.returning[0] as User
  } catch (e) {
    throw e
  }
}

async function findOneUserByReferenceId(reference_id: string) {
  const fetchQuery = `
  query query_reference_id($reference_id: String) {
    users(where: {reference_id: {_eq: $reference_id}}, limit: 1) {
      id
      email
      role
      external_id
      is_auth0_verified
      display_name
      auth0_linkedin_id
      auth0_user_pass_id
      reference_id
      person {
        name
        picture
      }
      additional_emails
    }
  }
  `
  try {
    const data = await query({
      query: fetchQuery,
      variables: { reference_id }
    })
    return data.data.users[0] as User
  } catch (ex) {
    throw ex;
  }
}

async function updateAllowedEmailArray(id: number, additional_emails: string[]) {
  const updateAllowedEmail = `
  mutation update_users($id: Int, $additional_emails: jsonb) {
    update_users(
      where: {id: {_eq: $id}},
      _set: { additional_emails: $additional_emails }
    ) {
      affected_rows
      returning {
        id
        email
        role
        external_id
        is_auth0_verified
        display_name
        auth0_linkedin_id
        auth0_user_pass_id
        reference_id
        person {
          name
          picture
        }
        additional_emails
      }
    }
  }
`
try {
  const data = await mutate({
    mutation: updateAllowedEmail,
    variables: { id, additional_emails }
  });
  return data.data.update_users.returning[0] as User
  } catch (e) {
    throw e
  }
}

async function findOneUserByAdditionalEmail(email: string) {
  const fetchQuery = `
  query query_additional_email_users($email: jsonb) {
    users(where: {additional_emails: {_contains: $email}}, limit: 1) {
      id
      email
      role
      external_id
      is_auth0_verified
      display_name
      auth0_linkedin_id
      auth0_user_pass_id
      reference_id
      person {
        name
        picture
      }
      additional_emails
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

export default { queryForAllowedEmailCheck, mutateForWaitlistEmail, findOneUserByEmail, upsertUser, updateEmailVerifiedStatus, updateAuth0LinkedInId, updateAuth0UserPassId, findOneUserByReferenceId, updateAllowedEmailArray, findOneUserByAdditionalEmail }