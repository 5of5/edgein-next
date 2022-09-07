import qs from "qs";
import UserService from '../../utils/users'
import CookieService from '../../utils/cookie'
import auth0Library from '../../utils/auth0Library'
import type { NextApiRequest, NextApiResponse } from 'next'

const hasuraClaims = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": ["user"],
    "x-hasura-default-role": "user",
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // check email exist in allowedEmail table or not
  const code = req.body.code;
  const redirect_uri = req.body.redirect_uri;
  if (!code || !redirect_uri) return res.status(404).send('Invalid request');

  let isFirstLogin = false;
  const userTokenHeader = new Headers();
  userTokenHeader.append('Content-Type', 'application/x-www-form-urlencoded');
  try {
    const userTokenResponse = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: userTokenHeader,
      body: qs.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code,
        redirect_uri
      }),
    });
    if (!userTokenResponse.ok) {
      const errorResponse = JSON.parse(await userTokenResponse.text());
      return res.status(userTokenResponse.status).send(errorResponse.error_description)
    }
    const userTokenResult = JSON.parse(await userTokenResponse.text());
    // get the user info from auth0
    const userInfo = await auth0Library.getUserInfoFromToken(userTokenResult.access_token);
    if (!userInfo.ok) {
      const userInfoErrorResponse = JSON.parse(await userInfo.text());
      return res.status(userInfo.status).send(userInfoErrorResponse.error_description)
    }
    const userInfoInJson = JSON.parse(await userInfo.text());

    if (userInfoInJson && userInfoInJson.email) {
      // check email is in allowed_emails or not
      const isEmailAllowed = await UserService.queryForAllowedEmailCheck(userInfoInJson.email)

      // when email does not exist in the allowed emails
      if (!isEmailAllowed) {
        // insert user in waitlist table
        await UserService.mutateForWaitlistEmail(userInfoInJson.email)
        return res.status(404).send(`Invalid Email`)
      }

      // get the user info from the user table
      let userData: any = await UserService.findOneUserByEmail(userInfoInJson.email);
      // create the user and return the response
      if (!userData) {
        const ObjectData = {
          email: userInfoInJson.email,
          name: userInfoInJson.name,
          _id: userInfoInJson.sub.split('|').pop() // get Id from sub
        }
        userData = await UserService.upsertUser(ObjectData);
      }
      // update the auth0_verified
      if (userData && !userData.is_auth0_verified) {
        isFirstLogin = true;
        await UserService.updateEmailVerifiedStatus(userInfoInJson.email, true);
      }

      // Author a couple of cookies to persist a user's session
      const token = await CookieService.createToken({id: userData.id, email: userData.email, role: userData.role, publicAddress: userData.external_id});
      CookieService.setTokenCookie(res, token)
    }
  } catch (ex: any) {
    return res.status(400).send(ex.message)
  }

  res.send({ success: true, isFirstLogin });
}

export default handler