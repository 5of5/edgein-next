import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '@/utils/cookie';
import { Library } from '@/types/common';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params
  const library: Library = req.body.library;

  if (!library) {
    return res.status(400).send({ error: 'Invalid library' });
  }

  try {
    CookieService.setLibraryCookie(res, library);

    return res.status(200).send({ success: true });
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

export default handler;
