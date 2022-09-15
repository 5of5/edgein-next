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
  const reference_id = req.body.reference_id;
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

      // check loggedin user and linkedin user email should be same
      const userToken = CookieService.getAuthToken(req.cookies)
      const loggedInUser = await CookieService.getUser(userToken);
      if (loggedInUser && (loggedInUser.email !== userInfoInJson.email)) return res.status(404).send('Invalid Email');

      // get the user info from the user table
      let userData: any = await UserService.findOneUserByEmail(userInfoInJson.email);
      // create the user and return the response
      const auth0SubInfo = userInfoInJson.sub.split('|');
      const connectionType = auth0SubInfo[0];
      const auth0Id = auth0SubInfo[1];
      if (!userData) {
        let referenceUserId = null;
        // check user exist or not for the current reference
        if (reference_id) {
          const referenceUser = await UserService.findOneUserByReferenceId(reference_id)
          if (referenceUser) referenceUserId = referenceUser.id
        }

        const objectData = {
          email: userInfoInJson.email,
          name: userInfoInJson.name,
          _id: auth0SubInfo.pop(), // get Id from sub
          auth0_linkedin_id: connectionType === 'linkedin' ? auth0Id : '',
          reference_user_id: referenceUserId
        }
        userData = await UserService.upsertUser(objectData);
      }
      // update the linkedIn id in user
      if (userData && !userData.auth0_linkedin_id && connectionType === 'linkedin') {
        await UserService.updateAuth0LinkedInId(userInfoInJson.email, auth0SubInfo.pop());
      }
      // update the auth0_verified
      if (userData && !userData.is_auth0_verified) {
        isFirstLogin = true;
        await UserService.updateEmailVerifiedStatus(userInfoInJson.email, true);
      }

      // Author a couple of cookies to persist a user's session
      const token = await CookieService.createToken({
        id: userData.id,
        email: userData.email,
        role: userData.role,
        publicAddress: userData.external_id,
        isFirstLogin,
        display_name: userData.display_name,
        auth0_linkedin_id: userData.auth0_linkedin_id,
        auth0_user_pass_id: userData.auth0_user_pass_id,
        profileName: userData.person?.name,
        profilePicture: userData.person?.picture,
        reference_id: userData.reference_id,
        auth0_token: userTokenResult.access_token
      });
      CookieService.setTokenCookie(res, token)
    }
  } catch (ex: any) {
    return res.status(400).send(ex.message)
  }

  res.send({ success: true });
}

export default handler