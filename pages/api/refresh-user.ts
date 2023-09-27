import UserService from '../../utils/users';
import CookieService from '../../utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  const redirect_uri = req.query.redirect as string;
  if (!user) return res.status(403).end();

  try {
    // check user has done signup or not
    const userToken = await UserService.generateToken({
      userId: user.id,
      isFirstLogin: false,
    });
    const token = await CookieService.createUserToken(userToken);
    CookieService.setTokenCookie(res, token);
  } catch (ex: any) {
    return res.status(404).send({ message: ex.message });
  }

  if (req.method === 'GET') {
    return res.redirect(redirect_uri || '/');
  } else {
    return res.send({ success: true });
  }
};

export default handler;
