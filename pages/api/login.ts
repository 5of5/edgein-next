import {Magic} from '@magic-sdk/admin'
import CookieService from '../../utils/cookie'
import type { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'
import { SignJWT } from 'jose'

const hasuraClaims = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["user"],
    "x-hasura-default-role": "user",
    // "x-hasura-user-id": "1234567890",
    // "x-hasura-org-id": "123",
    // "x-hasura-custom": "custom-value"
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // exchange the did from Magic for some user data
  const bearer = req.headers.authorization?.split('Bearer')
  const did = bearer?.pop()?.trim()
  const user = await new Magic(process.env.MAGIC_SECRET_KEY).users.getMetadataByToken(did || '')

  // Author a couple of cookies to persist a user's session
  const token = await new SignJWT({user: JSON.stringify(user), ...hasuraClaims})
  .setProtectedHeader({ alg: 'HS256' })
  .setJti(nanoid())
  .setIssuedAt()
  .setExpirationTime('90d')
  .sign(new TextEncoder().encode(process.env.ENCRYPTION_SECRET))
  CookieService.setTokenCookie(res, token)

  res.end()
}

export default handler