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
  const name: string = req.body.name;

  // create action
  const {
    data: { insert_user_groups_one },
  } = await mutate({
    mutation: `
      mutation InsertUserGroup($object: user_groups_insert_input!) {
        insert_user_groups_one(
          object: $object
        ) {
          id,
          name
        }
      }
    `,
    variables: {
      object: {
        name,
      },
    },
  });

  res.send(insert_user_groups_one);
};

export default handler;
