import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '@/utils/cookie';
import GroupService from '@/utils/groups';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const noteId: number = req.body.noteId;

  // check like exists
  const noteLikesOne = await GroupService.onCheckLikeExists(noteId, user.id);

  if (noteLikesOne) {
    const response = await GroupService.onDeleteLike(noteLikesOne.id);
    res.send(response);
  } else {
    const response = await GroupService.onInsertLike(noteId, user.id);
    res.send(response);
  }
};

export default handler;
