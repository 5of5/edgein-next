import CookieService from "../utils/cookie";
import { NextResponse, NextRequest } from "next/server";
import gql from 'graphql-tag';
import { mutate } from "../graphql/hasuraAdmin";

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();
	console.log({url})

	// Prevent security issues – users should not be able to canonically access
	// the pages/sites folder and its respective contents. This can also be done
	// via rewrites to a custom 404 page
	if (
		[
			`/`,
			`/login/`,
			`/privacy/`,
			`/terms/`,
			`/team/`,
			`/api/login/`,
			`/api/user/`,
			`/api/login_attempt/`,
			'/favicon.ico'
		].includes(url.pathname) ||
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
	Object.defineProperty(global, '__DEV__', {
		// In a buildless browser environment, maybe(() => process.env.NODE_ENV)
		// evaluates as undefined, so __DEV__ becomes true by default, but can be
		// initialized to false instead by a script/module that runs earlier.
		value: process.env.NODE_ENV !== "production",
		enumerable: false,
		configurable: true,
		writable: true,
	});
	let user;
	try {
		user = await CookieService.getUser(CookieService.getAuthToken(req.cookies));
		if (!user) {
			return NextResponse.redirect(
				new URL(`/login/?redirect=${encodeURIComponent(url.pathname)}`, req.url)
			);
		}
	} catch (error) {
		console.log(error);
		return NextResponse.redirect(
			new URL(`/login/?redirect=${encodeURIComponent(url.pathname)}`, req.url)
		);
	}

	if (
		![
			`/api/graphql/`,
		].includes(url.pathname)
	) {
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
					action: 'View',
					page: url.pathname,
					properties: {},
					user: user.email
				}
			}
		})
	}

	return NextResponse.next();
}
