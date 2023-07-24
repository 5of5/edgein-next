import type { NextApiRequest, NextApiResponse } from 'next';
import { upsertList } from '@/utils/lists';
import { listSchema } from '@/utils/schema';
import { zodValidate } from '@/utils/validation';
import CookieService from '../../utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const { listName } = req.body;

  // check if user has a list for sentiment
  // upsertList

  const { errors } = zodValidate({ ...req.body, name: listName }, listSchema);
  if (errors) {
    return res
      .status(400)
      .send({ error: errors['name']?.[0] || 'Invalid parameters' });
  } else {
    const list = await upsertList(req.body.listName, user, token);
    return res.send({ list });
  }
};

export default handler;
