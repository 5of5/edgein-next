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
  const user_id: string = req.body.userId;
  const user_group_id: string = req.body.userGroupId;

  // create action
  const {
    data: { insert_user_group_members_one },
  } = await mutate({
    mutation: `
      mutation InsertUserGroupMembers($object: user_group_members_insert_input!) {
        insert_user_group_members_one(
          object: $object
        ) {
          id
          user_id
          user {
            id
            email
            display_name
            role
          }
          user_group_id
          user_group {
            id
            name
          }
        }
      }
    `,
    variables: {
      object: {
        user_id,
        user_group_id,
      },
    },
  });

  res.send(insert_user_group_members_one);
};

export default handler;
