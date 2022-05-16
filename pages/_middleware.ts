import CookieService from "../utils/cookie";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();
	// Get hostname (e.g. vercel.com, test.vercel.app, etc.)
	const hostname = req.headers.get("host");

	console.log({ pathname: url.pathname });

	// Prevent security issues – users should not be able to canonically access
	// the pages/sites folder and its respective contents. This can also be done
	// via rewrites to a custom 404 page
	if (
		[
			`/`,
			`/login/`,
			`/privacy/`,
			`/terms/`,
			`/api/login/`,
			`/api/user/`,
		].includes(url.pathname)
	) {
		return NextResponse.next();
	}

	// let user;
	// try {
	//   user = await CookieService.getUser(CookieService.getAuthToken(req.cookies))
	//   console.log({user})
	//   if (!user) {
	//     return NextResponse.redirect(new URL('/login/?redirect', req.url))
	//   }
	// } catch (error) {
	//   console.log(error)
	//   return NextResponse.redirect(new URL('/login/?redirect', req.url))
	// }
	return NextResponse.next();
}
