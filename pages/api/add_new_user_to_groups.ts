import type { NextApiRequest, NextApiResponse } from "next";
import { User_Group_Invites } from "@/graphql/types";
import GroupService from "@/utils/groups";
import CookieService from "../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const userGroupInvites: Array<User_Group_Invites> = req.body.groupInvites;

  const response = await Promise.all(
    userGroupInvites.map((invites: User_Group_Invites) =>
      addMember(user?.id, invites.user_group_id)
    )
  );

  res.send(response);
};

const addMember = async (userId: number, groupId: number) => {
  const response = await GroupService.onAddGroupMember(userId, groupId);
  return response;
};

export default handler;
