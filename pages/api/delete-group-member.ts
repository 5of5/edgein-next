import { mutate } from '@/graphql/hasuraAdmin';
import {
  DeleteUserGroupMemberByIdDocument,
  DeleteUserGroupMemberByIdMutation,
  DeleteUserGroupInviteByIdDocument,
  DeleteUserGroupInviteByIdMutation,
} from '@/graphql/types';
import GroupService from '@/utils/groups';
import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '../../utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Delete a group member
  if (req.method !== 'DELETE') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const id = req.body.id;

  const userGroupMember = await GroupService.onFindUserGroupMemberById(id);
  const isCurrentUserMember = userGroupMember.user_id === user.id;
  const isCreator = await GroupService.isUserCreatorOfGroup(
    userGroupMember?.user_group_id,
    user.id,
  );
  if (!isCreator && !isCurrentUserMember) {
    return res
      .status(403)
      .json({ message: "You don't have permission to delete group member" });
  }

  const {
    data: { delete_user_group_members },
  } = await mutate<DeleteUserGroupMemberByIdMutation>({
    mutation: DeleteUserGroupMemberByIdDocument,
    variables: {
      id,
    },
  });

  const existedInvites = await GroupService.onCheckGroupInviteExists(
    userGroupMember.user?.email || '',
    userGroupMember.user_group_id,
  );

  if (existedInvites.id) {
    await mutate<DeleteUserGroupInviteByIdMutation>({
      mutation: DeleteUserGroupInviteByIdDocument,
      variables: {
        id: existedInvites.id,
      },
    });
  }

  return res.send(delete_user_group_members?.returning[0]);
};

export default handler;
