import qs from 'qs';
import UserService from '@/utils/users';
import CookieService from '@/utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { makeAuthService } from '@/services/auth.service';

const authService = makeAuthService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  // check email exist in allowedEmail table or not
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password)
    return res.status(404).send({ message: 'Invalid request' });

  let isFirstLogin = false;
  // get the domain from the email
  const domain = email.split('@').pop();
  // when email does not exist in the allowed emails
  const isEmailDisabled = await UserService.queryForDisabledEmailCheck(
    email,
    domain,
  );

  // when email does not exist in the allowed emails
  if (isEmailDisabled) {
    return res.status(404).send({
      message: `Your email ${email} has been added to our waitlist.  We'll be in touch soon!`,
    });
  }

  // check user has done signup or not
  const emailExist = await UserService.findOneUserByEmail(email);
  // if email does not exist, then redirect user for registartion
  if (!emailExist) return res.status(404).send({ nextStep: 'SIGNUP' });
  if (!emailExist.active) {
    return res.status(403).send({ message: 'Error: Please try again' });
  }
  if (!emailExist.auth0_user_pass_id)
    return res.status(404).send({
      message:
        'Email is already registered with another provider, try LinkedIn or signing up with this email and a password',
    });

  try {
    const { access_token } = await authService.signIn({ email, password });
    const userInfo = await authService.getProfile(access_token);

    if (userInfo && userInfo.email) {
      if (!emailExist.is_auth0_verified) {
        // update userInfo
        isFirstLogin = true;
        await UserService.updateEmailVerifiedStatus(
          userInfo.email,
          userInfo.email_verified === true,
        );
      }

      const userToken = await UserService.generateToken({
        userId: emailExist.id,
        isFirstLogin: false,
      });

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
