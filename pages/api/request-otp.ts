import type { NextApiRequest, NextApiResponse } from 'next';
import { requestEmailOtp, RequestOtpParams } from '@/utils/otp';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const body: RequestOtpParams = req.body;

    const data = await requestEmailOtp({
      email: body.email,
      successRedirectUrl: body.successRedirectUrl,
      failRedirectUrl: body.failRedirectUrl,
      callbackUrl: body.callbackUrl,
    });

    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
