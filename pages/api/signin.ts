import qs from "qs";
import UserService from '../../utils/users'
import auth0Library from '../../utils/auth0Library'
import CookieService from '../../utils/cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // check email exist in allowedEmail table or not
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) return res.status(404).send('Invalid request');

  let isFirstLogin = false;
  const isEmailAllowed = await UserService.queryForAllowedEmailCheck(email)

  // when email does not exist in the allowed emails
  if (!isEmailAllowed) {
    // insert user in waitlist table
    await UserService.mutateForWaitlistEmail(email)
    return res.status(404).send(`Invalid Email`)
  }

  // check user has done signup or not
  const emailExist = await UserService.findOneUserByEmail(email);
  // if email does not exist, then redirect user for registartion
  if (!emailExist) { return res.status(404).send({ nextStep: 'SIGNUP' }) }

  // send data to auth0 to make user login
  const data = qs.stringify({
    grant_type: 'password',
    username: email,
    scope: 'offline_access',
    password: password,
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET
  });

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  
  try {
    const fetchRequest = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    });
    if (!fetchRequest.ok) {
      const errorResponse = JSON.parse(await fetchRequest.text());
      return res.status(fetchRequest.status).send(errorResponse.error_description)
    }
    const tokenResponse = JSON.parse(await fetchRequest.text());

    // get user info
    myHeaders.append('Authorization', `Bearer ${tokenResponse.access_token}`);
    const userInfoFetchRequest = await auth0Library.getUserInfoFromToken(tokenResponse.access_token);
    if (!userInfoFetchRequest.ok) {
      const userInfoErrorResponse = JSON.parse(await userInfoFetchRequest.text());
      return res.status(userInfoFetchRequest.status).send(userInfoErrorResponse.error_description)
    }
    const userInfoInJson = JSON.parse(await userInfoFetchRequest.text());
  
    if (userInfoInJson && userInfoInJson.email) {
      if (!emailExist.is_auth0_verified) {
        // update userInfo
        isFirstLogin = true;
        await UserService.updateEmailVerifiedStatus(userInfoInJson.email, userInfoInJson.email_verified);
      }

      // Author a couple of cookies to persist a user's session
      const token = await CookieService.createToken({id: emailExist.id, email: emailExist.email, role: emailExist.role, publicAddress: emailExist.external_id, isFirstLogin, display_name: emailExist.display_name, auth0_token: tokenResponse.id_token});
      CookieService.setTokenCookie(res, token)
    }
  } catch (ex: any) {
    return res.status(404).send(ex.message)
  }

  res.send({ success: true });
}

export default handler
