import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '@/utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  try {
    const library = CookieService.getLibraryCookie(req.cookies) || 'Web3';

    return res.status(200).send({ library });
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

export default handler;
