import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'
import UserService from "../../utils/users";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let user;
  try {
    const token = CookieService.getAuthToken(req.cookies)
    user = await CookieService.getUser(token)

    if (user?._iat && user?.email) {
      if ((new Date()).getTime() > (user._iat * 1000 + (1000 * 60 * 15))) {
        // is token older than an hour

        const dbUser = await UserService.findOneUserByEmail(user?.email);
        if (!dbUser || dbUser.active === false) {
          return res.status(403).end()
        }
        const userToken = UserService.createToken(dbUser, false);
        // Author a couple of cookies to persist a user's session
        const token = await CookieService.createUserToken(userToken);
        CookieService.setTokenCookie(res, token);  
      }
    }

    // now we have access to the data inside of user
    // and we could make database calls or just send back what we have
    // in the token.
    if (user) {
      if (user.active === false) {
        return res.status(403).end()
      }  
      return res.json(user)
    } else {
      return res.status(401).end()
    }

  } catch (error) {
    res.status(401).end()
  }
}

export default handler
