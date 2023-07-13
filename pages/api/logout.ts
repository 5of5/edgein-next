import CookieService from '../../utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthService } from '@/services/auth.service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  CookieService.clearTokenCookie(res);

  res.send({ success: true, logoutLink: AuthService.logoutUrl() });
};

export default handler;
