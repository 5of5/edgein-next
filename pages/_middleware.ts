import CookieService from "../utils/cookie";
import { NextResponse, NextRequest } from "next/server";
import { mutate } from "../graphql/hasuraAdmin";

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();

	// Prevent security issues – users should not be able to canonically access
	// the pages/sites folder and its respective contents. This can also be done
	// via rewrites to a custom 404 page
	if (
		[
			`/`,
			`/login/`,
			`/waitlist/`,
			`/contact/`,
			`/privacy/`,
			`/terms/`,
			`/team/`,
			`/404/`,
			`/api/login_attempt/`,
			`/api/check_email/`,
			`/api/get_access_token/`,
			`/api/refresh_token/`,
			`/api/login/`,
			`/api/user/`,
			`/api/register/`,
			`/api/signin/`,
			`/api/access_token_form_code/`,

			`/admin/app/`,
		].includes(url.pathname) ||
		url.pathname.endsWith(".png") ||
		url.pathname.endsWith(".jpg") ||
		url.pathname.endsWith(".ico") ||
		process.env.DEV_MODE
	) {
		return NextResponse.next();
	}

	if (
		url.searchParams.get("revalidation_auth") ===
		process.env.REVALIDATION_AUTH_TOKEN
	) {
		return NextResponse.next();
	}
	let user;
	try {
		user = await CookieService.getUser(CookieService.getAuthToken(req.cookies));
		if (!user) {
			return NextResponse.redirect(
				new URL(`/login/?redirect=${encodeURIComponent(url.pathname)}`, req.url)
			);
		}
		if (!user.email.endsWith("5of5.vc") && url.pathname.includes("/admin/")) {
			return NextResponse.redirect(
				new URL(`/404?redirect=${encodeURIComponent(url.pathname)}`, req.url)
			);
		}
	} catch (error) {
		console.log(error);
		return NextResponse.redirect(
			new URL(`/login/?redirect=${encodeURIComponent(url.pathname)}`, req.url)
		);
	}

	if (![`/api/`].includes(url.pathname) && user?.id) {
		mutate({
			mutation: `
				mutation InsertAction($object: actions_insert_input!) {
					insert_actions_one(
						object: $object
					) {
						id
					}
				}
			`,
			variables: {
				object: {
					action: "View",
					page: url.pathname,
					// TODO add from url split
					// resourceType:,
					// resourceId: ,
					properties: {},
					user: user.id,
				},
			},
		});
	}

	return NextResponse.next();
}
