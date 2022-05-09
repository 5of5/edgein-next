import Iron from '@hapi/iron'
import CookieService from '../utils/cookie'
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  // Get hostname (e.g. vercel.com, test.vercel.app, etc.)
  const hostname = req.headers.get('host')

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page
  if ([`/`, `/login/`].includes(url.pathname)) {
    return NextResponse.next()
  }

  // let user;
  // try {
  //   const token = CookieService.getAuthToken(req.cookies)
  //   console.log({ token, secret: process.env.ENCRYPTION_SECRET })
  //   if (!token) {
  //     return NextResponse.redirect(new URL('/', req.url))
  //   }
  //   // user = await Iron.unseal(token, process.env.ENCRYPTION_SECRET || '', Iron.defaults)
  // } catch (error) {
  //   console.log(error)
  //   return NextResponse.redirect(new URL('/', req.url))
  // }
  return NextResponse.next()
}