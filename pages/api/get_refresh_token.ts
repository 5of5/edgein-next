import axios from "axios";
import qs from "qs";
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // check email exist in allowedEmail table or not
  const refresh_token = req.body.refresh_token;

  var data = qs.stringify({
    grant_type: 'refresh_token',
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    refresh_token: refresh_token
  });
  var config = {
    method: 'post',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  };

  const result = await axios(config);

  res.send({ success: true, result: result.data });
}

export default handler
