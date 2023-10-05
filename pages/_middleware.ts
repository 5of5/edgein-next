import CookieService, { TOKEN_NAME } from '@/utils/cookie';
import { NextResponse, NextRequest } from 'next/server';
import { verify } from '@/utils/googlebot-verify';
import {
  BRAND_ASSETS,
  CONTACT,
  ONBOARDING,
  PRICING,
  PRIVACY,
  SIGN_IN,
  SUPPORT,
  TEAM,
  TERMS,
  NOT_FOUND,
  COMPANIES,
  ROOT,
} from '@/routes';

const USAGE_LIMIT = 10;

// This is used to generate a sitemap for the site
export const PUBLIC_PAGES = [
  `/`,
  `${SIGN_IN}/`,
  `${CONTACT}/`,
  `${PRIVACY}/`,
  `${TERMS}/`,
  `${SUPPORT}/`,
  `${PRICING}/`,
  `${BRAND_ASSETS}/`,
  `${TEAM}/`,
  `${NOT_FOUND}/`,
];

const PUBLIC_API = [
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
];

const getIp = (req: NextRequest) => {
  let ip = req.ip ?? req.headers.get('x-real-ip') ?? undefined;
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(',').at(0);
  }
  return ip;
};

export async function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl.clone();
    const userExists = await CookieService.getUser(
      CookieService.getAuthToken(req.cookies),
    );

    // we want users to fill onboarding again
    if (userExists && url.pathname === ROOT) {
      if (!userExists.onboarding_information?.locationDetails) {
        return NextResponse.redirect(new URL(ONBOARDING, req.url));
      }
      return NextResponse.rewrite(new URL('/home', req.url));
    }

    // Prevent security issues – users should not be able to canonically access
    // the pages/sites folder and its respective contents. This can also be done
    // via rewrites to a custom 404 page
    if (
      PUBLIC_PAGES.includes(url.pathname) ||
      PUBLIC_API.includes(url.pathname) ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.ico') || //||
      // process.env.DEV_MODE
      req.method === 'HEAD'
    ) {
      return NextResponse.next();
    }

    if (url.pathname.startsWith('/sitemap')) {
      return NextResponse.next();
    }

    if (
      url.searchParams.get('revalidation_auth') ===
      process.env.REVALIDATION_AUTH_TOKEN
    ) {
      return NextResponse.next();
    }
    if (!userExists) {
      const isGoogle = verify(getIp(req));
      if (isGoogle) {
        return NextResponse.next();
      }
    }

    const redirectPath = url.pathname.startsWith('/api')
      ? ''
      : `redirect=${encodeURIComponent(url.pathname)}`;
    const user = await CookieService.getUser(
      CookieService.getAuthToken(req.cookies),
    );

    if (!user) {
      if (url.pathname === `${ONBOARDING}/`) {
        return NextResponse.redirect(new URL(COMPANIES, req.url));
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
          new URL(`${SIGN_IN}/?usage=true&${redirectPath}`, req.url),
        );
      }
    } else {
      if (
        url.pathname === '${SIGN_IN}/' ||
        (url.pathname === `${ONBOARDING}/` &&
          user.onboarding_information?.locationDetails)
      ) {
        return NextResponse.redirect(new URL('/home', req.url));
      }

      if (
        !url.pathname.startsWith('/api/') &&
        url.pathname !== `${ONBOARDING}/` &&
        !user.onboarding_information?.locationDetails
      ) {
        return NextResponse.redirect(new URL(ONBOARDING, req.url));
      }
    }
    // if (!user.email.endsWith("5of5.vc") && url.pathname.includes("/admin/")) {
    // 	return NextResponse.redirect(
    // 		new URL(`/404?redirect=${encodeURIComponent(url.pathname)}`, req.url)
    // 	);
    // }
  } catch (error) {
    try {
      console.log(error);
      const url = req.nextUrl.clone();
      const redirectPath = url.pathname.startsWith('/api')
        ? ''
        : `redirect=${encodeURIComponent(url.pathname)}`;
      const resp = NextResponse.redirect(
        new URL(`${SIGN_IN}/?${redirectPath}`, req.url),
      );
      resp.cookies[TOKEN_NAME] =
        'deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      resp.cookies['authed'] =
        'deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      return resp;
    } catch (err) {
      console.log(error);
      return NextResponse.redirect(new URL(SIGN_IN, req.url));
    }
  }

  return NextResponse.next();
}
