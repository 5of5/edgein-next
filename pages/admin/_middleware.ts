import CookieService from "../../utils/cookie";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();

	// Prevent security issues – users should not be able to canonically access
	// the pages/sites folder and its respective contents. This can also be done
	// via rewrites to a custom 404 page
	if (
		process.env.DEV_MODE
	) {
		return NextResponse.next();
	}

	let user;
	try {
		user = await CookieService.getUser(CookieService.getAuthToken(req.cookies));
		if (!user || !user.email.endsWith('5of5.vc')) {
			return NextResponse.redirect(
				new URL(`/404?redirect=${encodeURIComponent(url.pathname)}`, req.url)
			);
		}
	} catch (error) {
		return NextResponse.redirect(
      new URL(`/404?redirect=${encodeURIComponent(url.pathname)}`, req.url)
		);
	}

	return NextResponse.next();
}
