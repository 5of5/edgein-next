import GroupService from '@/utils/groups';
import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '../../utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Delete a group note comment
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const id = req.body.id;

  const commentOne = await GroupService.onFindCommentById(id);

  if (commentOne && commentOne.created_by_user_id === user.id) {
    const deleteResponse = await GroupService.onDeleteComment(id);
    return res.send(deleteResponse);
  }

  return res
    .status(403)
    .json({ message: "You don't have permission to delete this comment" });
};

export default handler;
