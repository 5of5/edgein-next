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
  const email: string = req.body.email;

  const userGroupInvites: Array<User_Group_Invites> =
    await GroupService.onFindUserGroupInvitesByEmail(email);

  if (userGroupInvites && userGroupInvites.length > 0) {
    await GroupService.onAddGroupMember(
      user?.id,
      userGroupInvites[0].user_group_id
    );
  }

  res.send({ success: true });
};

export default handler;
