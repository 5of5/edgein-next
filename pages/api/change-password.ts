import type { NextApiRequest, NextApiResponse } from 'next';
import { makeAuthService } from '@/services/auth.service';

const authService = makeAuthService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();
  if (!req.body.email) return res.status(400).end();
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
