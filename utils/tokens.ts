import { mutate, query } from "@/graphql/hasuraAdmin"
import { SignJWT, jwtVerify } from "jose"
import { nanoid } from 'nanoid'

export const saveToken = async (token: string, type: string, userId: number, accessToken: string) => {
  const mutation = `
    mutation SaveToken($token: String, $type: String, $userId: Int){
      insert_tokens_one(object: {token: $token, type: $type, user_id: $userId}) {
        id,
        token
      }
    }
  `
  const result = await mutate({
    mutation,
    variables: {
      token,
      type,
      userId,
    }
  }, accessToken)
  return result
}

export const generateVerifyWorkplaceToken = async (resourceId: string, resourceType: string, userId: number, email: string, personId?: number) => {
  return await new SignJWT({ resourceDetails: { resourceId, resourceType, userId, personId, email } })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(process.env.ENCRYPTION_SECRET))
}

export const findToken = async (token: string, type: string, accessToken: string) => {
  const getQuery = `
    query GetToken($token: String, $type: String) {
      tokens(where: {token: {_eq: $token}, type: {_eq: $type}}, limit: 1) {
        id
      }
    }
  `
  const result = await query({
    query: getQuery,
    variables: {
      token,
      type
    }
  }, accessToken)

  return result.data.tokens.length ? result.data.tokens[0] : null
}

export const deleteToken = async (id: number, accessToken: string) => {
  const mutation = `
    mutation DeleteToken($id: Int!) {
      delete_tokens_by_pk(id: $id) {
        id
      }
    }
  `

  return await mutate({
    mutation,
    variables: {
      id
    }
  }, accessToken)
}