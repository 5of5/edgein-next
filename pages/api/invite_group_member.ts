import { mutate } from "@/graphql/hasuraAdmin";
import { InsertUserGroupInvitesDocument, InsertUserGroupInvitesMutation } from "@/graphql/types";
import GroupService from "@/utils/groups";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../utils/cookie";

type InviteUsers = {
  id: number;
  email: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Add a member to group
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const user_group_id: number = req.body.groupId;
  const inviteUsers: InviteUsers[] = req.body.inviteUsers;

  const response = await Promise.all(
    inviteUsers.map(async (invite) => {
      const existedInvites = await GroupService.onCheckGroupInviteExists(
        invite.email,
        user_group_id
      );

      let existedMember;
      if (invite.id) {
        existedMember = await GroupService.onCheckGroupMemberExists(
          invite.id,
          user_group_id
        );
      }
    
      if (!existedInvites && !existedMember) {
        const {
          data: { insert_user_group_invites_one },
        } = await mutate<InsertUserGroupInvitesMutation>({
          mutation: InsertUserGroupInvitesDocument,
          variables: {
            object: {
              email: invite.email,
              user_group_id,
              created_by_user_id: user?.id,
            },
          },
        });

        if (invite.id) {
          const member = await GroupService.onAddGroupMember(
            invite.id,
            user_group_id
          );
          return { member, invite: insert_user_group_invites_one };
        }

        return { member: null, invite: insert_user_group_invites_one };
      }
      return {
        message: `An invitation with email ${invite.email} already exists`,
      };
    })
  );

  return res.send(response);
};

export default handler;
