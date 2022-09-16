import { mutate } from "@/graphql/hasuraAdmin"
import { SignJWT } from "jose"
import { nanoid } from 'nanoid'

export const saveToken = async (token: string, type: string, userId: number) => {
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
  })
  return result
}

export const generateVerifyWorkplaceToken = async (resourceId: string, resourceType: string) => {
  return await new SignJWT({ resourceDetails: { resourceId, resourceType } })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(process.env.ENCRYPTION_SECRET))
}