// pages/api/auth/profile.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { access_token } = req.query;

  if (!access_token) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.status(200).json(profileResponse.data);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
}
