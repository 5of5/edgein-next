import { NextApiResponse, NextApiRequest } from 'next';
import CookieService from '../../utils/cookie';
import UserService from '../../utils/users';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const additionalEmails: string[] = req.body.additionalEmails;

  try {
    const response = await UserService.updateAllowedEmailArray(
      user?.id,
      additionalEmails,
    );

    const newUserToken = await UserService.generateToken({
      userId: user?.id,
      isFirstLogin: false,
    });

    const token = await CookieService.createUserToken(newUserToken);
    CookieService.setTokenCookie(res, token);

    res.send(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export default handler;
