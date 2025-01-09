// pages/api/auth/callback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { code, state } = req.query;

  // Validate `state` parameter
  const cookieState = req.headers.cookie
    ?.split('; ')
    .find(row => row.startsWith('linkedin_state='))
    ?.split('=')[1];

  if (!cookieState || state !== cookieState) {
    return res.status(401).json({ error: 'Invalid state parameter' });
  }

  try {
    // Exchange authorization code for an access token
    const tokenResponse = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        client_id: process.env.LINKEDIN_CLIENT_ID || '',
        client_secret: process.env.LINKEDIN_CLIENT_SECRET || '',
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI || '',
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    const { access_token, expires_in } = tokenResponse.data;

    console.log('Access Token:', access_token);

    // Store the access token securely (e.g., in a database or session)
    // Here, we're just sending it as a response for demonstration
    res.status(200).json({ access_token, expires_in });
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res
      .status(500)
      .json({
        error: 'Failed to exchange authorization code for access token',
      });
  }
}
