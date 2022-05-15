import Iron from '@hapi/iron'
import CookieService from '../utils/cookie'
import { NextResponse, NextRequest } from 'next/server';

import Crypto from "crypto";

Crypto.timingSafeEqual = function timingSafeEqual(a, b) {
  if (!Buffer.isBuffer(a)) {
    throw new TypeError("First argument must be a buffer");
  }
  if (!Buffer.isBuffer(b)) {
    throw new TypeError("Second argument must be a buffer");
  }
  if (a.length !== b.length) {
    throw new TypeError("Input buffers must have the same length");
  }
  var len = a.length;
  var out = 0;
  var i = -1;
  while (++i < len) {
    out |= a[i] ^ b[i];
  }
  return out === 0;
};

// rest of the file goes here

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = req.headers.get('host')

  console.log({pathname: url.pathname})

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page
  if ([`/`, `/login/`, `/privacy/` , `/terms/`, `/api/login/`, `/api/user/`].includes(url.pathname)) {
    return NextResponse.next()
  }

  let user;
  try {
    const token = CookieService.getAuthToken(req.cookies)
    user = await Iron.unseal(token, process.env.ENCRYPTION_SECRET || '', Iron.defaults)
    if (!user) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
}