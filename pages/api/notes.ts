import { mutate } from "@/graphql/hasuraAdmin";
import GroupService from "@/utils/groups";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const notes: string = req.body.notes;
  let user_group_id: number = req.body.groupId;
  const resource_type = req.body.resourceType;
  const resource_id = req.body.resourceId;
  const created_by = user.id;

  const id = req.body.id;

  if (id && req.method === "PUT") {
    const note = await GroupService.onFindNoteById(id);
    user_group_id = note.user_group_id;
  }

  const isMember = await GroupService.isUserMemberOfGroup(user_group_id, user.id);

  if (!isMember) {
    return res
      .status(403)
      .json({ message: `You are not allowed to add/edit notes` });
  }

  switch (req.method) {
    case "POST": {
      const insertNoteQuery = `
        mutation InsertNote($object: notes_insert_input!) {
          insert_notes_one(
            object: $object
          ) {
            id
            notes
            created_by
            created_at
            resource_type
            resource_id
            user_group_id
            user_group {
              id
              name
            }
          }
        }
      `;

      const {
        data: { insert_notes_one },
      } = await mutate({
        mutation: insertNoteQuery,
        variables: {
          object: {
            notes,
            user_group_id,
            resource_type,
            resource_id,
            created_by,
          },
        },
      });

      return res.send(insert_notes_one);
    }

    case "PUT": {
      const updateNotesQuery = `
      mutation UpdateNote($id: Int!, $notes: String!) {
        update_notes(
          where: {id: {_eq: $id}},
          _set: {notes: $notes }
        ) {
          affected_rows 
          returning {
            id
            notes
            created_by
            created_at
            resource_type
            resource_id
            user_group_id
            user_group {
              id
              name
            }
          }
        }
      }
      `;
console.log('@params', id, notes)
      const {
        data: { update_notes },
      } = await mutate({
        mutation: updateNotesQuery,
        variables: {
          id,
          notes,
        },
      });
      return res.send(update_notes.returning[0]);
    }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
