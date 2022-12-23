import { mutate } from "@/graphql/hasuraAdmin";
import GroupService from "@/utils/groups";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Delete a group member
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const id = req.body.id;

  const userGroupMember = await GroupService.onFindUserGroupMemberById(id);
  const group = await GroupService.onFindGroupById(userGroupMember?.user_group_id);
  if (group.created_by !== user.id) {
    return res
      .status(403)
      .json({ message: "You don't have permission to delete group member" });
  }

  const deleteGroupMemberQuery = `
  mutation DeleteUserGroupMembers($id: Int!) {
    delete_user_group_members(where: {id: {_eq: $id}}) {
      affected_rows
      returning {
        id
      }
    }
  }
  `;

  const {
    data: { delete_user_group_members },
  } = await mutate({
    mutation: deleteGroupMemberQuery,
    variables: {
      id,
    },
  });

  return res.send(delete_user_group_members.returning[0]);
};

export default handler;
