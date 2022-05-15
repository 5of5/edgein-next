import { serialize } from "cookie"
import type { NextApiResponse } from 'next'
import { jwtVerify } from 'jose'

const TOKEN_NAME = "api_token"
const MAX_AGE = 60 * 60 * 8

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

function getAuthToken(cookies: Record<string, string>) {
  return cookies[TOKEN_NAME]
}

async function getUser(token: string) {
  if (!token) {
    return false
  }
  const verified = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.ENCRYPTION_SECRET)
  )
  let payload = verified.payload
  
  if (!payload) {
    return false
  }
  let user = payload.user as string
  if (user.startsWith('{')) {
    user = JSON.parse(user)
  }
  return user
}

export default { setTokenCookie, getAuthToken, getUser }