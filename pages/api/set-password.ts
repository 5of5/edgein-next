import CookieService from '@/utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthService, makeAuthService } from '@/services/auth.service';

const authService = makeAuthService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const password = req.body.password;
  if (!password) return res.status(404).send('Invalid request');
  const token = CookieService.getAuthToken(req.cookies);
  console.log(token);
  const user = await CookieService.getUser(token);
  console.log(JSON.stringify(user));
  if (!user) return res.status(403).end();

  // only user password user can set the password
  if (!user.auth0_user_pass_id)
    return res.status(404).send('Invalid request for password');

  let result;
  try {
    result = await authService.setPassword({
      password,
      userId: AuthService.auth0UserId(user.auth0_user_pass_id),
    });
  } catch (ex: any) {
    return res.status(404).send(ex.message);
  }

  res.send({ success: true, result });
};

export default handler;
