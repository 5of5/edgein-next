import type { NextApiRequest, NextApiResponse } from "next";
import GroupService from "../../../utils/groups";
import CookieService from "../../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const id = req.query.id as string;

  switch (req.method) {
    case "PUT":
      // Update a group
      const name: string = req.body.name;
      const updatedGroup = await GroupService.onUpdateGroup(id, name);
      return res.send(updatedGroup);

    case "DELETE":
      // Delete invites of group
      await GroupService.onDeleteGroupInvites(id);

      // Delete members of group
      await GroupService.onDeleteGroupMembers(id);

      // Delete notes of group
      await GroupService.onDeleteNotesByGroupId(id);

      // Delete a group
      const deletedGroup = await GroupService.onDeleteGroup(id);

      return res.send(deletedGroup);

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
