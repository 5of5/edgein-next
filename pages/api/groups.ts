import type { NextApiRequest, NextApiResponse } from 'next';
import GroupService from '@/utils/groups';
import CookieService from '../../utils/cookie';
import {
  extractErrors,
  groupSchema,
  GroupSchemaType,
} from '@/utils/validation';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const id = req.body.id;
  const payload = req.body.payload;

  const result = groupSchema.safeParse(payload);
  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    const errors = extractErrors<GroupSchemaType>(fieldErrors);
    return res.status(400).send({ errors });
  }

  switch (req.method) {
    case 'POST': {
      const data = await GroupService.onInsertGroup({
        ...payload,
        created_by_user_id: user.id,
      });
      if (data?.id) {
        await GroupService.onAddGroupMember(user.id, data?.id);
      }
      return res.send(data);
    }

    case 'PUT': {
      const isCreator = await GroupService.isUserCreatorOfGroup(id, user.id);
      if (!isCreator) {
        return res
          .status(403)
          .json({ message: "You don't have permission to edit this group" });
      }

      // Update a group
      const updatedGroup = await GroupService.onUpdateGroup(id, payload);
      return res.send(updatedGroup);
    }

    case 'DELETE': {
      const isCreator = await GroupService.isUserCreatorOfGroup(id, user.id);
      if (!isCreator) {
        return res
          .status(403)
          .json({ message: "You don't have permission to delete this group" });
      }
      // Delete invites of group
      await GroupService.onDeleteGroupInvites(id);

      // Delete members of group
      await GroupService.onDeleteGroupMembers(id);

      // Delete notes of group
      await GroupService.onDeleteNotesByGroupId(id);

      // Delete a group
      const deletedGroup = await GroupService.onDeleteGroup(id);

      return res.send(deletedGroup);
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
