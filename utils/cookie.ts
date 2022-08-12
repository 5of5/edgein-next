import { serialize } from "cookie"
import type { NextApiResponse } from 'next'
import { jwtVerify } from 'jose'

const TOKEN_NAME = "api_token"
const MAX_AGE = 60 * 60 * 24 * 90

interface User {
  id: number
  email: string
}

function createCookie(name: string, data: any, options = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    ...options,
  })
}

function setTokenCookie(res: NextApiResponse, token: string) {
  res.setHeader("Set-Cookie", [
    createCookie(TOKEN_NAME, token),
    createCookie("authed", true, { httpOnly: false }),
  ])
}

function clearTokenCookie(res: NextApiResponse) {
  res.setHeader('Set-Cookie', [
    `${TOKEN_NAME}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    `authed=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  ]);
}

function getAuthToken(cookies: Record<string, string>) {
  return cookies[TOKEN_NAME]
}

async function getUser(token: string) {
  if (!token) {
    return null
  }
  const verified = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.ENCRYPTION_SECRET)
  )
  let payload = verified.payload
  
  if (!payload) {
    return null
  }
  let userStr = payload.user as string
  let user: User | null = null
  if (userStr.startsWith('{')) {
    try {
      user = JSON.parse(userStr)
    } catch (e) {
      return null
    }
  }
  return user
}

export default { setTokenCookie, getAuthToken, getUser, clearTokenCookie }