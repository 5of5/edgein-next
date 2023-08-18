import CookieService from '@/utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthService, makeAuthService } from '@/services/auth.service';

const authService = makeAuthService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);

  if (!user) return res.status(403).end();

  if (!user.auth0_user_pass_id)
    return res.status(400).send({ error: 'Invalid request' });

  let result;
  try {
    result = await authService.resendVerificationEmail(
      AuthService.auth0UserId(user.auth0_user_pass_id),
    );
  } catch (ex: any) {
    return res.status(404).send({ error: ex.message });
  }

  res.send({ success: true, result });
};

export default handler;
