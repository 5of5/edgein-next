import { upsertList } from '@/utils/lists';
import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '../../utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // check if user has a list for sentiment
  // upsertList
  const list = await upsertList(req.body.listName, user, token);

  res.send({ list });
};

export default handler;
