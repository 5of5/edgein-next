import { CookieSerializeOptions, serialize } from 'cookie';
import { nanoid } from 'nanoid';
import { UserToken, User } from '@/models/user';
import { jwtVerify, SignJWT } from 'jose';
import type { NextApiResponse } from 'next';

export const TOKEN_NAME = 'api_token';
export const USAGE_NAME = 'e_token';
export const MAX_AGE = 60 * 60 * 24 * 90; // 90 days
export const USAGE_AGE = 60 * 60 * 24; // 1 days
const hasuraClaims = (userId: string) => ({
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': ['user', 'viewer'],
    'x-hasura-default-role': 'viewer',
    'x-hasura-user-id': userId,
    'x-hasura-role': 'viewer',
  },
});
const hasuraAnnonClaims = {
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': ['annoy_user', 'viewer'],
    'x-hasura-default-role': 'annoy_user',
  },
};

function getCookieOpts(age: number, options = {}) {
  return {
    maxAge: age * 1000,
    expires: new Date(Date.now() + age * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    sameSite: 'lax' as const,
    ...options,
  };
}

function createCookie(name: string, data: any, age: number, options = {}) {
  return serialize(name, data, getCookieOpts(age, options));
}

function setTokenCookie(res: NextApiResponse, token: string) {
  res.setHeader('Set-Cookie', [
    createCookie(TOKEN_NAME, token, MAX_AGE),
    createCookie('authed', true, MAX_AGE, { httpOnly: false }),
  ]);
}

function setUsageCookie(
  res: {
    cookie: (
      name: string,
      value:
        | {
            [key: string]: any;
          }
        | string,
      opts?: CookieSerializeOptions,
    ) => void;
  },
  token: string,
) {
  return res.cookie(USAGE_NAME, token, getCookieOpts(USAGE_AGE, {}));
}

function clearTokenCookie(res: NextApiResponse) {
  res.setHeader('Set-Cookie', [
    `${TOKEN_NAME}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    `authed=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
  ]);
}

function getAuthToken(cookies: Record<string, string>) {
  return cookies[TOKEN_NAME];
}

function getUsageToken(cookies: Record<string, string>) {
  return cookies[USAGE_NAME];
}

async function getUser(
  token: string,
): Promise<(User & { _iat?: number }) | null> {
  if (!token) {
    return null;
  }
  const verified = await jwtVerify(
    token,
    new TextEncoder().encode(`zfuIzxrblbNHX31YFfPNFco4xUWTqpGEWHxvbNFbfUo=`),
  );
  const payload = verified.payload;

  if (!payload) {
    return null;
  }
  const userStr = payload.user as string;
  let user: UserToken | null = null;
  if (userStr.startsWith('{')) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }
  return { ...(user as User), _iat: payload.iat };
}

async function getUsage(token: string) {
  if (!token) {
    return null;
  }
  const verified = await jwtVerify(
    token,
    new TextEncoder().encode(`zfuIzxrblbNHX31YFfPNFco4xUWTqpGEWHxvbNFbfUo=`),
  );
  const payload = verified.payload;

  if (!payload) {
    return null;
  }
  const usageStr = payload.usage as string;
  let usage = null;
  if (usageStr.startsWith('{')) {
    try {
      usage = JSON.parse(usageStr);
    } catch (e) {
      return null;
    }
  }
  return usage;
}

async function createUserToken(userData: UserToken) {
  return new SignJWT({
    user: JSON.stringify(userData),
    ...hasuraClaims(userData.id.toString()),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('90d')
    .sign(
      new TextEncoder().encode(`zfuIzxrblbNHX31YFfPNFco4xUWTqpGEWHxvbNFbfUo=`),
    );
}

async function createUsageToken(userData: {}) {
  return new SignJWT({ usage: JSON.stringify(userData), ...hasuraAnnonClaims })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('90d')
    .sign(
      new TextEncoder().encode(`zfuIzxrblbNHX31YFfPNFco4xUWTqpGEWHxvbNFbfUo=`),
    );
}

const exp = {
  setTokenCookie,
  setUsageCookie,
  getAuthToken,
  getUsageToken,
  getUsage,
  getUser,
  clearTokenCookie,
  createUserToken,
  createUsageToken,
};

export default exp;
