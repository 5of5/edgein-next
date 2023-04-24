import { mutate, query } from '@/graphql/hasuraAdmin'
import {
  GetAllowedEmailByEmailOrDomainDocument,
  GetAllowedEmailByEmailOrDomainQuery,
  GetDisabledEmailByEmailOrDomainDocument,
  GetDisabledEmailByEmailOrDomainQuery,
  GetPersonDocument,
  GetUserByAdditionalEmailDocument,
  GetUserByAdditionalEmailQuery,
  GetUserByEmailDocument,
  GetUserByEmailQuery,
  GetUserByIdDocument,
  GetUserByIdQuery,
  GetUserByReferenceIdDocument,
  GetUserByReferenceIdQuery,
  UpdateUserAdditionalEmailsDocument,
  UpdateUserAdditionalEmailsMutation,
  UpdateUserAuth0LinkedInIdDocument,
  UpdateUserAuth0LinkedInIdMutation,
  UpdateUserAuth0UserPassIdDocument,
  UpdateUserAuth0UserPassIdMutation,
  UpdateUserBillingOrgDocument,
  UpdateUserBillingOrgMutation,
  UpdateUserEmailVerifiedStatusDocument,
  UpdateUserEmailVerifiedStatusMutation,
  UpsertUsersDocument,
  UpsertUsersMutation,
  UpsertWaitlistEmailDocument,
  UpsertWaitlistEmailMutation,
  GetPersonQuery,
  GetUserByPersonIdQuery,
  GetUserByPersonIdDocument,
} from "@/graphql/types";
import { Entitlements, UserToken } from '@/models/User';
import { createHmac } from "crypto";

async function queryForAllowedEmailCheck(email: string, domain: string) {
  try {
    const data = await query<GetAllowedEmailByEmailOrDomainQuery>({
      query: GetAllowedEmailByEmailOrDomainDocument,
      variables: { email, domain }
    })
    return data.data.allowed_emails[0]
  } catch (ex) {
    throw ex;
  }
}

async function queryForDisabledEmailCheck(email: string, domain: string) {
  try {
    const data = await query<GetDisabledEmailByEmailOrDomainQuery>({
      query: GetDisabledEmailByEmailOrDomainDocument,
      variables: { email, domain }
    })
    return data.data.disabled_emails[0] as { id: number, email: string }
  } catch (ex) {
    throw ex;
  }
}

async function mutateForWaitlistEmail(email: string) {
  try {
    await mutate<UpsertWaitlistEmailMutation>({
      mutation: UpsertWaitlistEmailDocument,
      variables: { email }
    });
  } catch (e) {
    throw e
  }
}

async function findOneUserByEmail(email: string) {
  try {
    const data = await query<GetUserByEmailQuery>({
      query: GetUserByEmailDocument,
      variables: { email }
    })
    return data.data.users[0]
  } catch (ex) {
    throw ex;
  }
}

async function findOneUserById(id: number) {
  try {
    const data = await query<GetUserByIdQuery>({
      query: GetUserByIdDocument,
      variables: { id }
    })
    return data.data.users[0]
  } catch (ex) {
    throw ex;
  }
}

async function updateBillingOrg(userId: number, billingOrgId: number) {
  try {
    const data = await mutate<UpdateUserBillingOrgMutation>({
      mutation: UpdateUserBillingOrgDocument,
      variables: {
        userId,
        billingOrgId
      }
    })

    return data.data.update_users_by_pk
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}


async function upsertUser(userData: any) {
  try {
    const data = await mutate<UpsertUsersMutation>({
      mutation: UpsertUsersDocument,
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

    return data.data.insert_users?.returning[0]
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}

async function updateEmailVerifiedStatus(email: string, is_auth0_verified: boolean) {
try {
  const data = await mutate<UpdateUserEmailVerifiedStatusMutation>({
    mutation: UpdateUserEmailVerifiedStatusDocument,
    variables: { email, is_auth0_verified }
  });
  return data.data.update_users?.returning[0]
  } catch (e) {
    throw e
  }
}

async function updateAuth0LinkedInId(email: string, auth0_linkedin_id: string) {
try {
  const data = await mutate<UpdateUserAuth0LinkedInIdMutation>({
    mutation: UpdateUserAuth0LinkedInIdDocument,
    variables: { email, auth0_linkedin_id }
  });
  return data.data.update_users?.returning[0]
  } catch (e) {
    throw e
  }
}

async function updateAuth0UserPassId(email: string, auth0_user_pass_id: string) {
try {
  const data = await mutate<UpdateUserAuth0UserPassIdMutation>({
    mutation: UpdateUserAuth0UserPassIdDocument,
    variables: { email, auth0_user_pass_id }
  });
  return data.data.update_users?.returning[0]
  } catch (e) {
    throw e
  }
}

async function findOneUserByReferenceId(reference_id: string) {
  try {
    const data = await query<GetUserByReferenceIdQuery>({
      query: GetUserByReferenceIdDocument,
      variables: { reference_id }
    })
    return data.data.users[0]
  } catch (ex) {
    throw ex;
  }
}

async function updateAllowedEmailArray(id: number, additional_emails: string[]) {
try {
  const data = await mutate<UpdateUserAdditionalEmailsMutation>({
    mutation: UpdateUserAdditionalEmailsDocument,
    variables: { id, additional_emails }
  });
  return data.data.update_users?.returning[0]
  } catch (e) {
    throw e
  }
}

async function findOneUserByAdditionalEmail(email: string) {
  try {
    const data = await query<GetUserByAdditionalEmailQuery>({
      query: GetUserByAdditionalEmailDocument,
      variables: { email }
    })
    return data.data.users[0]
  } catch (ex) {
    throw ex;
  }
}

async function findOnePeopleBySlug(slug: string) {
  try {
    const data = await query<GetPersonQuery>({
      query: GetPersonDocument,
      variables: { slug },
    });
    return data.data.people[0];
  } catch (ex) {
    throw ex;
  }
}

async function findOneUserByPersonId(personId: number) {
  try {
    const data = await query<GetUserByPersonIdQuery>({
      query: GetUserByPersonIdDocument,
      variables: { personId },
    });
    return data.data.users[0];
  } catch (ex) {
    throw ex;
  }
}

const createToken = (userData: any, isFirstLogin: boolean): UserToken => {
  const hmac = createHmac(
    "sha256",
    "vxushJThllW-WS_1Gdi08u4Ged9J4FKMXGn9vqiF"
  );
  hmac.update(String(userData.id));

  const entitlements: Entitlements = Boolean(userData.billing_org_id) ? {
    viewEmails: true,
    groupsCount: 5000,
  } : {
    viewEmails: false,
    listsCount: 5,
    groupsCount: 3,
  }

  return {
    id: userData.id,
    intercomUserHash: hmac.digest("hex"),
    email: userData.email,
    role: userData.role,
    isFirstLogin,
    billing_org_id: userData.billing_org_id,
    billing_org: userData.billing_org,
    display_name: userData.display_name,
    auth0_linkedin_id: userData.auth0_linkedin_id,
    auth0_user_pass_id: userData.auth0_user_pass_id,
    is_auth0_verified: userData.is_auth0_verified,
    person: userData.person,
    profileName: userData.person?.name,
    profilePicture: userData.person?.picture,
    reference_id: userData.reference_id,
    reference_user_id: userData.reference_user_id,
    additional_emails: userData.additional_emails,
    active: userData.active,
    entitlements
  };
};

const findUserByPk = async (user_id: number) => {
  const data = await query({
    query: `
    query FindUserByPk($user_id: Int!) {
      users_by_pk(id: $user_id) {
        id
        person {
          id
        }
      }
    }
      `,
    variables: { user_id },
  });
  return data.data.users_by_pk;
};

const UserService = {
  queryForDisabledEmailCheck,
  queryForAllowedEmailCheck,
  mutateForWaitlistEmail,
  findOneUserByEmail,
  findOneUserById,
  updateBillingOrg,
  upsertUser,
  updateEmailVerifiedStatus,
  updateAuth0LinkedInId,
  updateAuth0UserPassId,
  findOneUserByReferenceId,
  updateAllowedEmailArray,
  findOneUserByAdditionalEmail,
  findOnePeopleBySlug,
  findOneUserByPersonId,
  createToken,
  findUserByPk,
};
export default UserService;