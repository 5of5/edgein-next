import UserService from '../../utils/users';
import CookieService from '../../utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const showDraftData: boolean = req.body.showDraftData;

  try {
    const userData = await UserService.findOneUserByIdForToken(user.id);

    const userToken = UserService.createToken(
      { ...userData, showDraftData },
      false,
    );

    const token = await CookieService.createUserToken(userToken);
    CookieService.setTokenCookie(res, token);

    return res.send({ success: true });
  } catch (ex: any) {
    return res.status(404).send({ message: ex.message });
  }
};

export default handler;
