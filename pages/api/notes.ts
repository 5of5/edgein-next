import { mutate } from "@/graphql/hasuraAdmin";
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
  const created_by = user.id;

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
        created_by,
      },
    },
  });

  res.send(insert_notes_one);
};

export default handler;
