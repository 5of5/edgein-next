import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorCode, makeAuthService } from '@/services/auth.service';
import UserService from '@/utils/users';

const authService = makeAuthService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();
  if (!req.body.email) return res.status(400).end();
  const email = req.body.email;
  const accounts = await authService.getAccountsByEmail(email);
  if (!accounts.length)
    return res
      .status(200)
      .send({ status: ErrorCode.USER_NOT_EXISTS, message: 'User not exists.' });
  if (!authService.canUserResetPassword(accounts)) {
    return res.status(200).send({
      status: ErrorCode.LINKED_IN_ACCOUNT,
      message:
        'We can\'t change your password if you have signed up through LinkedIn. To use EdgeIn, simply log in with LinkedIn.',
    });
  }
  try {
    res.send({
      success: true,
      result: await authService.resetPassword({ email: req.body.email }),
    });
  } catch (ex: any) {
    return res.status(404).send(ex.message);
  }
};

export default handler;
