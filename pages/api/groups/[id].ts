import { mutate } from "@/graphql/hasuraAdmin";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const id = req.query.id;

  switch (req.method) {
    case "PUT":
      // Update a group
      const name: string = req.body.name;
      const updateGroupQuery = `
      mutation UpdateUserGroup($id: Int!, $name: String!) {
        update_user_groups(
          where: {id: {_eq: $id}},
          _set: { name: $name }
        ) {
          affected_rows 
          returning {
            id
            name
          }
        }
      }
      `;
      const {
        data: { update_user_groups },
      } = await mutate({
        mutation: updateGroupQuery,
        variables: {
          id,
          name,
        },
      });
      return res.send(update_user_groups.returning[0]);

    case "DELETE":
      // Delete a group
      const deleteGroupQuery = `
      mutation DeleteUserGroups($id: Int!) {
        delete_user_groups(where: {id: {_eq: $id}}) {
          affected_rows
          returning {
            id
          }
        }
      }
      `;

      const {
        data: { delete_user_groups },
      } = await mutate({
        mutation: deleteGroupQuery,
        variables: {
          id,
        },
      });

      return res.send(delete_user_groups.returning[0]);

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
