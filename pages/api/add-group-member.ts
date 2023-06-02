import GroupService from '@/utils/groups';
import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '../../utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Add a member to group
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const user_id: number = req.body.userId;
  const user_group_id: number = req.body.groupId;

  const memberExists = await GroupService.onCheckGroupMemberExists(
    user_id,
    user_group_id,
  );

  if (memberExists) {
    return res.status(400).json({ message: `This member already exists` });
  }

  const data = await GroupService.onAddGroupMember(user_id, user_group_id);

  res.send(data);
};

export default handler;
