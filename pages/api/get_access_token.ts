import qs from "qs";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // check email exist in allowedEmail table or not
  const code = req.body.code;
  const redirect_uri = req.body.redirect_uri;
  var data = qs.stringify({
    'grant_type': 'authorization_code',
    'client_id': process.env.AUTH0_CLIENT_ID,
    'client_secret': process.env.AUTH0_CLIENT_SECRET,
    'code': code,
    'redirect_uri': redirect_uri
  });
  var config = {
    method: 'post',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data : data
  };
  
  const result = await axios(config)

  res.send({ success: true, result: result.data });
}

export default handler
