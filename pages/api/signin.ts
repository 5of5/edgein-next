import qs from "qs";
import UserService from "../../utils/users";
import auth0Library from "../../utils/auth0-library";
import CookieService from "../../utils/cookie";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return res.status(405).end();

	// check email exist in allowedEmail table or not
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password)
		return res.status(404).send({ message: "Invalid request" });

	let isFirstLogin = false;
	// get the domain from the email
	const domain = email.split("@").pop();
	// when email does not exist in the allowed emails
	const isEmailDisabled = await UserService.queryForDisabledEmailCheck(
		email,
		domain
	);

	// when email does not exist in the allowed emails
	if (isEmailDisabled) {
		return res
			.status(404)
			.send({
				message: `Your email ${email} has been added to our waitlist.  We'll be in touch soon!`,
			});
	}

	// check user has done signup or not
	const emailExist = await UserService.findOneUserByEmail(email);
	// if email does not exist, then redirect user for registartion
	if (!emailExist) return res.status(404).send({ nextStep: "SIGNUP" });
	if (emailExist.active === false) {
		return res.status(403).send({ message: "Error: Please try again" });
	}
	if (!emailExist.auth0_user_pass_id)
		return res
			.status(404)
			.send({
				message:
					"Email is already registered with another provider, try LinkedIn or signing up with this email and a password",
			});

	// send data to auth0 to make user login
	const data = qs.stringify({
		grant_type: "password",
		username: email,
		scope: "offline_access",
		password: password,
		client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
		client_secret: process.env.AUTH0_CLIENT_SECRET,
	});

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

	try {
		const fetchRequest = await fetch(
			`${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token`,
			{
				method: "POST",
				headers: myHeaders,
				body: data,
				redirect: "follow",
			}
		);
		if (!fetchRequest.ok) {
			const errorResponse = JSON.parse(await fetchRequest.text());
			return res
				.status(fetchRequest.status)
				.send({ message: errorResponse.error_description });
		}
		const tokenResponse = JSON.parse(await fetchRequest.text());

		// get user info
		myHeaders.append("Authorization", `Bearer ${tokenResponse.access_token}`);
		const userInfoFetchRequest = await auth0Library.getUserInfoFromToken(
			tokenResponse.access_token
		);
		if (!userInfoFetchRequest.ok) {
			const userInfoErrorResponse = JSON.parse(
				await userInfoFetchRequest.text()
			);
			return res
				.status(userInfoFetchRequest.status)
				.send({ message: userInfoErrorResponse.error_description });
		}
		const userInfoInJson = JSON.parse(await userInfoFetchRequest.text());

		if (userInfoInJson && userInfoInJson.email) {
			if (!emailExist.is_auth0_verified) {
				// update userInfo
				isFirstLogin = true;
				await UserService.updateEmailVerifiedStatus(
					userInfoInJson.email,
					userInfoInJson.email_verified
				);
			}

			const userToken = UserService.createToken(emailExist, isFirstLogin);

			// Author a couple of cookies to persist a user's session
			const token = await CookieService.createUserToken(userToken);
			CookieService.setTokenCookie(res, token);
		}
	} catch (ex: any) {
		return res.status(404).send({ message: ex.message });
	}

	res.send({ success: true });
};

export default handler;
