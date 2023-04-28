import CookieService from "../utils/cookie";
import { NextResponse, NextRequest } from "next/server";

const USAGE_LIMIT = 5

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();

	// Prevent security issues – users should not be able to canonically access
	// the pages/sites folder and its respective contents. This can also be done
	// via rewrites to a custom 404 page
	if (
		[
			`/`,
			`/login/`,
			`/contact/`,
			`/privacy/`,
			`/terms/`,
			`/brand-assets/`,
			`/team/`,
			`/404/`,
			`/api/login_attempt/`,
			`/api/graphql-query/`,
			`/api/get_access_token/`,
			`/api/refresh_token/`,
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
			`/api/data-runs/`
		].includes(url.pathname) ||
		url.pathname.endsWith(".png") ||
		url.pathname.endsWith(".jpg") ||
		url.pathname.endsWith(".ico") //||
		// process.env.DEV_MODE
		|| req.method === 'HEAD'
	) {
		return NextResponse.next();
	}

	if (
		url.searchParams.get("revalidation_auth") ===
		process.env.REVALIDATION_AUTH_TOKEN
	) {
		return NextResponse.next() ;
	}
	let user;
	const redirectPath = url.pathname.startsWith("/api")
    ? ""
    : `redirect=${encodeURIComponent(url.pathname)}`;
	try {
		user = await CookieService.getUser(CookieService.getAuthToken(req.cookies));
		if (!user) {
			// const usage = await CookieService.getUsage(CookieService.getUsageToken(req.cookies))
			// if (!usage || usage.pages < USAGE_LIMIT || (url.pathname.startsWith('/api/') && usage.pages === USAGE_LIMIT)) {
			// 	return CookieService.setUsageCookie(NextResponse.next(), await CookieService.createUsageToken({pages: (usage?.pages || 0) + (url.pathname.startsWith('/api/') ? 0 : 1)}))
			// } else {
				return NextResponse.redirect(
					new URL(`/login/?usage=true&${redirectPath}`, req.url)
				);	
			// }
		}
		// if (!user.email.endsWith("5of5.vc") && url.pathname.includes("/admin/")) {
		// 	return NextResponse.redirect(
		// 		new URL(`/404?redirect=${encodeURIComponent(url.pathname)}`, req.url)
		// 	);
		// }
	} catch (error) {
		console.log(error);
		return NextResponse.redirect(
			new URL(`/login/?${redirectPath}`, req.url)
		);
	}

	return  NextResponse.next() ;
}
