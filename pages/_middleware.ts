import CookieService from '../utils/cookie';
import { NextResponse, NextRequest } from 'next/server';
import { verify } from 'googlebot-verify';

const USAGE_LIMIT = 10;

const getIp = (req: NextRequest) => {
  let ip = req.ip ?? req.headers.get('x-real-ip');
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(',').at(0) ?? 'Unknown';
  }
  return ip ?? 'Unknown';
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const userExists = await CookieService.getUser(
    CookieService.getAuthToken(req.cookies),
  );

  if (userExists && url.pathname === '/') {
    if (!userExists.onboarding_information) {
      return NextResponse.rewrite(new URL('/onboarding', req.url));
    }
    return NextResponse.rewrite(new URL('/companies', req.url));
  }

  // Prevent security issues – users should not be able to canonically access
  // the pages/sites folder and its respective contents. This can also be done
  // via rewrites to a custom 404 page
  if (
    [
      `/`,
      `/login/`,
      `/signup/`,
      `/contact/`,
      `/privacy/`,
      `/terms/`,
      `/support/`,
      `/pricing/`,
      `/brand-assets/`,
      `/team/`,
      `/404/`,
      `/api/login-attempt/`,
      `/api/graphql-query/`,
      `/api/get-access-token/`,
      `/api/refresh-token/`,
      `/api/login/`,
      `/api/user/`,
      `/api/register/`,
      `/api/signin/`,
      `/api/change-password/`,
      `/api/access-token-from-code/`,
      `/api/stripe-webhook/`,
      `/admin/app/`,
      `/admin/admin/`,
      `/api/submit-data/`,
      `/api/batch-job/`,
      `/api/data-runs/`,
      `/api/query/completions/`,
    ].includes(url.pathname) ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico') || //||
    // process.env.DEV_MODE
    req.method === 'HEAD'
  ) {
    return NextResponse.next();
  }

  if (
    url.searchParams.get('revalidation_auth') ===
    process.env.REVALIDATION_AUTH_TOKEN
  ) {
    return NextResponse.next();
  }
  if (!userExists) {
    const isGoogle = await verify(getIp(req));
    if (isGoogle) {
      return NextResponse.next();
    }
  }

  let user;
  const redirectPath = url.pathname.startsWith('/api')
    ? ''
    : `redirect=${encodeURIComponent(url.pathname)}`;
  try {
    user = await CookieService.getUser(CookieService.getAuthToken(req.cookies));

    if (!user) {
      if (url.pathname === '/onboarding/') {
        return NextResponse.redirect(new URL('/companies', req.url));
      }

      const usage = await CookieService.getUsage(
        CookieService.getUsageToken(req.cookies),
      );
      if (
        !usage ||
        usage.pages < USAGE_LIMIT ||
        (url.pathname.startsWith('/api/') && usage.pages === USAGE_LIMIT)
      ) {
        const newUsageToken = await CookieService.createUsageToken({
          pages:
            (usage?.pages || 0) + (url.pathname.startsWith('/api/') ? 0 : 1),
        });
        return CookieService.setUsageCookie(NextResponse.next(), newUsageToken);
      } else {
        return NextResponse.redirect(
          new URL(`/login/?usage=true&${redirectPath}`, req.url),
        );
      }
    } else {
      if (
        url.pathname === '/sign-in/' ||
        (url.pathname === '/onboarding/' && user.onboarding_information)
      ) {
        return NextResponse.redirect(new URL('/companies', req.url));
      }

      if (
        !url.pathname.startsWith('/api/') &&
        url.pathname !== '/onboarding/' &&
        !user.onboarding_information
      ) {
        return NextResponse.redirect(new URL('/onboarding', req.url));
      }
    }
    // if (!user.email.endsWith("5of5.vc") && url.pathname.includes("/admin/")) {
    // 	return NextResponse.redirect(
    // 		new URL(`/404?redirect=${encodeURIComponent(url.pathname)}`, req.url)
    // 	);
    // }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL(`/login/?${redirectPath}`, req.url));
  }

  return NextResponse.next();
}
