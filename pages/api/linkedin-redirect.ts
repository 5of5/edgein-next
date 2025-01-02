import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const generateState = (): string => crypto.randomBytes(16).toString('hex');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const state = generateState();

  // Set state in a secure cookie
  res.setHeader(
    'Set-Cookie',
    `linkedin_state=${state}; HttpOnly; Secure; Path=/; SameSite=Strict`,
  );

  const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${'7819bp8k6na7fo'}&redirect_uri=${'https://af5d-116-72-249-25.ngrok-free.app/api/linkedin-callback'}&state=${state}&scope=r_liteprofile%20r_emailaddress`;

  res.redirect(authorizationUrl);
}
