import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'
import UserService from "../../utils/users";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let user;
  try {
    const token = CookieService.getAuthToken(req.cookies)
    user = await CookieService.getUser(token)

    if (user?._iat && user?.email) {
      if ((new Date()).getTime() > (user._iat * 1000 + (1000 * 60 * 60))) {
        // is token older than an hour

        const emailExist = await UserService.findOneUserByEmail(user?.email);
        const userToken = UserService.createToken(emailExist, false);
        // Author a couple of cookies to persist a user's session
        const token = await CookieService.createUserToken(userToken);
        CookieService.setTokenCookie(res, token);  
      }
    }

    // TODO if cookie is more than 1 housr old refresh token

    // now we have access to the data inside of user
    // and we could make database calls or just send back what we have
    // in the token.
    if (user) {
      res.json(user)
    } else {
      res.status(401).end()
    }

  } catch (error) {
    res.status(401).end()
  }
}

export default handler
