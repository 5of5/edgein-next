import { mutate } from "@/graphql/hasuraAdmin";
import { InsertUserGroupInvitesDocument, InsertUserGroupInvitesMutation } from "@/graphql/types";
import GroupService from "@/utils/groups";
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
  const user_group_id: number = req.body.groupId;
  const inviteUserId: number = req.body.inviteUserId;

  const existedInvites = await GroupService.onCheckGroupInviteExists(email, user_group_id);

  if (existedInvites) {
    return res.status(400).json({ message: `An invitation with email ${email} already exists` });
  }

  const {
    data: { insert_user_group_invites_one },
  } = await mutate<InsertUserGroupInvitesMutation>({
    mutation: InsertUserGroupInvitesDocument,
    variables: {
      object: {
        email,
        user_group_id,
        created_by_user_id: user?.id,
      },
    },
  });

  if (inviteUserId) {
    const member = await GroupService.onAddGroupMember(inviteUserId, user_group_id);
    return res.send({ member, invite: insert_user_group_invites_one });
  }

  return res.send({ member: null, invite: insert_user_group_invites_one });
};

export default handler;
