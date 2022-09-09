import UserService from '../../utils/users'
import CookieService from '../../utils/cookie'
import { NextApiResponse, NextApiRequest } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const wallet_address = req.body.wallet_address;
  if (!wallet_address) return res.status(404).send('Invalid request');

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  try {
    await UserService.updateUserWalletById(user.id, wallet_address);
    res.status(200).json({ success: true });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default handler;
