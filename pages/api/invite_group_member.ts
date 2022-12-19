import { mutate } from "@/graphql/hasuraAdmin";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Add a member to group
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const email: string = req.body.email;
  const user_group_id: string = req.body.groupId;

  // create action
  const {
    data: { insert_user_group_invites_one },
  } = await mutate({
    mutation: `
      mutation InsertUserGroupInvites($object: user_group_invites_insert_input!) {
        insert_user_group_invites_one(
          object: $object
        ) {
          id
          email
          user_group_id
        }
      }
    `,
    variables: {
      object: {
        email,
        user_group_id,
      },
    },
  });

  res.send(insert_user_group_invites_one);
};

export default handler;
