import type { NextApiRequest, NextApiResponse } from "next";
import GroupService from "@/utils/groups";
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
  const data = await GroupService.onInsertGroup(name);
  res.send(data);
};

export default handler;
