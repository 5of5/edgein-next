import { mutate } from '@/graphql/hasuraAdmin';
import {
  DeleteNoteByIdDocument,
  DeleteNoteByIdMutation,
  InsertNoteDocument,
  InsertNoteMutation,
  UpdateNoteDocument,
  UpdateNoteMutation,
} from '@/graphql/types';
import GroupService from '@/utils/groups';
import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '../../utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const notes: string = req.body.notes;
  const groupId: string | number = req.body.groupId;
  const resource_type = req.body.resourceType;
  const resource_id = req.body.resourceId;
  const created_by = user.id;

  const id = req.body.id;

  if (id && req.method !== 'POST') {
    const note = await GroupService.onFindNoteById(id);

    if (note?.created_by !== created_by) {
      return res
        .status(403)
        .json({ message: `You are not allowed to add/edit notes` });
    }
  }

  switch (req.method) {
    case 'POST': {
      const isCustomAudience = typeof groupId === 'string';

      const user_group_id = isCustomAudience ? null : groupId;
      const audience = isCustomAudience ? groupId : null;

      const {
        data: { insert_notes_one },
      } = await mutate<InsertNoteMutation>({
        mutation: InsertNoteDocument,
        variables: {
          object: {
            notes,
            user_group_id: user_group_id,
            resource_type,
            resource_id,
            created_by,
            audience,
          },
        },
      });

      return res.send(insert_notes_one);
    }

    case 'PUT': {
      const {
        data: { update_notes },
      } = await mutate<UpdateNoteMutation>({
        mutation: UpdateNoteDocument,
        variables: {
          id,
          notes,
        },
      });
      return res.send(update_notes?.returning[0]);
    }

    case 'DELETE': {
      const note = await GroupService.onFindNoteById(id);
      const isNoteCreator = user.id === note?.created_by;
      if (!isNoteCreator) {
        return res
          .status(403)
          .json({ message: "You don't have permission to delete this note" });
      }

      const {
        data: { delete_notes },
      } = await mutate<DeleteNoteByIdMutation>({
        mutation: DeleteNoteByIdDocument,
        variables: {
          id,
        },
      });

      // Delete likes of note
      await GroupService.onDeleteLikesByNoteId(id);

      // Delete comments of note
      await GroupService.onDeleteCommentsByNoteId(id);

      return res.send(delete_notes?.returning[0]);
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
