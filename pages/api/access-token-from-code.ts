import UserService from '@/utils/users';
import CookieService from '@/utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { makeAuthService } from '@/services/auth.service';

const authService = makeAuthService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  // check email exist in allowedEmail table or not
  const code = req.body.code;
  const redirect_uri = req.body.redirect_uri;
  const reference_id = req.body.reference_id;
  //TODO: fix code to 400
  if (!code || !redirect_uri) return res.status(404).send('Invalid request');

  let isFirstLogin = false;
  try {
    const userTokenResult = await authService.authorizationCodeGrant({
      code,
      redirect_uri: req.body.redirect_uri,
    });
    if (!userTokenResult) {
      return res.status(404).send('Invalid request');
    }
    // get the user info from auth0
    const userInfo = await authService.getProfile(userTokenResult.access_token);

    if (userInfo && userInfo.email) {
      // get the domain from the email
      const domain = userInfo.email.split('@').pop();
      // check email is in allowed_emails or not
      const isEmailAllowed = await UserService.queryForAllowedEmailCheck(
        userInfo.email,
        domain!,
      );

      // when email does not exist in the allowed emails
      // if (!isEmailAllowed) {
      //   // insert user in waitlist table
      //   await UserService.mutateForWaitlistEmail(userInfoInJson.email)
      //   return res.status(404).send({ message: `Your email ${userInfoInJson.email} has been added to our waitlist.  We'll be in touch soon!` });
      // }

      // check loggedin user and linkedin user email should be same
      const userToken = CookieService.getAuthToken(req.cookies);
      const loggedInUser = await CookieService.getUser(userToken);
      if (loggedInUser && !loggedInUser.active) {
        return res.status(403).send({ message: 'Error: Please try again' });
      }
      const auth0SubInfo = userInfo.sub.split('|');
      const connectionType = auth0SubInfo[0];
      let userData: any = {};
      let isUserPassPrimaryAccount = false;
      let isLinkedInPrimaryAccount = false;
      if (!loggedInUser || !loggedInUser.email) {
        // get the user info from the user table
        userData = await UserService.findOneUserByEmail(userInfo.email);
        // create the user and return the response
        const auth0Id = auth0SubInfo[1];
        if (!userData) {
          // check user exist in additional_emails or not
          userData = await UserService.findOneUserByAdditionalEmail(
            userInfo.email,
          );
          if (!userData) {
            let referenceUserId = null;
            isLinkedInPrimaryAccount = true;
            // check user exist or not for the current reference
            if (reference_id) {
              const referenceUser = await UserService.findOneUserByReferenceId(
                reference_id,
              );
              if (referenceUser) referenceUserId = referenceUser.id;
            }

            const objectData = {
              email: userInfo.email,
              name: userInfo.name,
              _id: auth0SubInfo.pop(), // get Id from sub
              auth0_linkedin_id: connectionType === 'linkedin' ? auth0Id : '',
              reference_user_id: referenceUserId,
            };
            userData = await UserService.upsertUser(objectData);
          }
        }
      } else {
        userData = await UserService.findOneUserByEmail(loggedInUser.email);
        // check if loggedin email and linkedin email is same or not
        if (loggedInUser.email !== userInfo.email) {
          // update in email array as additional email
          userData = await UserService.findOneUserByEmail(loggedInUser.email);
          if (!userData.additional_emails.includes(userInfo.email)) {
            userData.additional_emails.push(userInfo.email);
            userData = await UserService.updateAllowedEmailArray(
              userData.id,
              userData.additional_emails,
            );
          }
        }
      }

      // update the linkedIn id in user
      if (
        userData &&
        !userData.auth0_linkedin_id &&
        connectionType === 'linkedin'
      ) {
        isUserPassPrimaryAccount = true;
        const auth_linkedin_id = auth0SubInfo.pop();
        userData = await UserService.updateAuth0LinkedInId(
          userData.email,
          auth_linkedin_id!,
        );
      }
      // update the auth0_verified
      if (userData && !userData.is_auth0_verified) {
        isFirstLogin = true;
        await UserService.updateEmailVerifiedStatus(userData.email, true);
      }

      await authService.linkAccounts(
        isUserPassPrimaryAccount,
        isLinkedInPrimaryAccount,
        userData,
      );

      const newUserToken = UserService.createToken(userData, isFirstLogin);

      // Author a couple of cookies to persist a user's session
      const token = await CookieService.createUserToken(newUserToken);
      CookieService.setTokenCookie(res, token);
    }
  } catch (ex: any) {
    return res.status(400).send(ex.message);
  }

  res.send({ success: true });
};

export default handler;
