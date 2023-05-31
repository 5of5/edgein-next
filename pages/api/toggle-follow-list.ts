import type { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteListMember,
  findListMemberOne,
  insertListMembers,
} from '@/utils/lists';
import CookieService from '../../utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const user_id: number = req.body.userId;
  const list_id: number = req.body.listId;

  const listMemberOne = await findListMemberOne(list_id, user_id);

  if (listMemberOne) {
    const response = await deleteListMember(listMemberOne.id);
    res.send(response);
  } else {
    const response = await insertListMembers(list_id, user_id, 'follow');
    res.send(response);
  }
};

export default handler;
