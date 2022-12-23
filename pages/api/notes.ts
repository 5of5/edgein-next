import { mutate } from "@/graphql/hasuraAdmin";
import GroupService from "@/utils/groups";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create a user group
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const notes: string = req.body.notes;
  const user_group_id: string = req.body.groupId;
  const resource = req.body.resource;
  const resource_id = req.body.resourceId;
  const created_by = user.id;

  const members = await GroupService.onFindUserGroupMembers(user_group_id);
  if (!members.some((mem: any) => mem.user_id === user.id)) {
    return res
      .status(403)
      .json({ message: "You don't have permission to add notes" });
  }

  // create action
  const insertNoteQuery = `
    mutation InsertNote($object: notes_insert_input!) {
      insert_notes_one(
        object: $object
      ) {
        id
        notes
        created_by
        created_at
        resource
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
        resource,
        resource_id,
        created_by,
      },
    },
  });

  res.send(insert_notes_one);
};

export default handler;
