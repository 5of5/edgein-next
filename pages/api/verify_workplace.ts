import { mutate, query } from "@/graphql/hasuraAdmin";
import { tokenTypes } from "@/utils/constants";
import { deleteToken, findToken } from "@/utils/tokens";
import { jwtVerify } from "jose";
import { NextApiResponse, NextApiRequest } from "next";
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'POST') return res.status(405).end()

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  const verificationToken = req.query.vtoken as string

  if (!verificationToken) return res.status(400).send({ message: 'Bad request' })

  const verified = await jwtVerify(
    verificationToken,
    new TextEncoder().encode(process.env.ENCRYPTION_SECRET)
  )

  let payload: any = verified.payload

  if (!payload) return res.status(400).send({ message: 'Bad request or token expired' })

  try {
    const existsToken = await findToken(verificationToken, tokenTypes.verifyWorkHereToken, token)

    if (!existsToken) return res.status(400).send({ message: 'Verification link already used' })

    await addOrganizationEditAccess(payload, token)

    if (payload.resourceDetails.personId)
      await addTeamMember(payload, token)

    await updateUserEmails(payload.resourceDetails.userId, payload.resourceDetails.email, token)

    await deleteToken(existsToken.id, token)
  } catch (e: any) {
    return res.status(500).send({ message: 'Some error occurred, please contact edgein.io', error: e.message })
  }

  res.send({ message: 'success' })

}

const addOrganizationEditAccess = async (payload: any, accessToken: string) => {

  const resourceType = payload.resourceDetails.resourceType
  const resourceId = payload.resourceDetails.resourceId
  const userId = payload.resourceDetails.userId
  const mutation = `
    mutation InsertEditAccess($userId: Int, $resourceId: Int, $resourceType: String) {
      insert_resource_edit_access_one(object: {user_id: $userId, resource_id: $resourceId, resource_type: $resourceType}, on_conflict: {constraint: resource_edit_access_resource_id_user_id_resource_type_key, update_columns: []}) {
        id
        user_id
        resource_id
        resource_type
      }
    }
  `

  return await mutate({
    mutation,
    variables: {
      resourceType,
      resourceId,
      userId,
    }
  }, accessToken);

}

const addTeamMember = async (payload: any, accessToken: string) => {
  let mutation, variables
  const resourceType = payload.resourceDetails.resourceType
  if (resourceType === 'companies') {
    mutation = `
      mutation InsertTeamMember($personId: Int, $companyId: Int, $vcFirmId: Int) {
        insert_team_members_one(object: {person_id: $personId, company_id: $companyId}, on_conflict: {constraint: team_members_company_id_person_id_key, update_columns: []}) {
          id
        }
      }
    `
    variables = {
      personId: payload.resourceDetails.personId,
      companyId: payload.resourceDetails.resourceId,
    }
  }
  if (resourceType === 'vc_firms') {
    mutation = `
      mutation InsertInvestor($personId: Int, $vcFirmId: Int) {
        insert_investors_one(object: {person_id: $personId vc_firm_id: $vcFirmId}, on_conflict: {constraint: investors_vc_firm_id_person_id_key, update_columns: []}) {
          id
        }
      }
    `
    variables = {
      personId: payload.resourceDetails.personId,
      vcFirmId: payload.resourceDetails.resourceId,
    }
  }


  mutate({
    mutation: mutation || '',
    variables: variables || {}
  }, accessToken)
}

export const updateUserEmails = async (userId: number, email: string, accessToken: string) => {
  const queryUser = `
    query GetUserByPk($userId: Int!) {
      users_by_pk(id: $userId) {
        id
        additional_emails
        email
      }
    }
  `

  const result = await query({
    query: queryUser,
    variables: {
      userId
    }
  }, accessToken)
  if (!result.data.users_by_pk) return

  const emails = result.data.users_by_pk?.additional_emails || []

  if (result.data.users_by_pk?.email === email) return

    if (!emails.includes(email)) emails.push(email)
    else return

  const mutation = `
    mutation UpdateUserByPk($userId: Int!, $emails: jsonb) {
      update_users_by_pk(pk_columns: {id: $userId}, _set: {additional_emails: $emails}) {
        id
      }
    }
  `
  await mutate({
    mutation,
    variables: {
      userId,
      emails
    }
  }, accessToken)

}

export default handler