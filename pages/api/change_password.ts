import axios from "axios";
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  var data = JSON.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    email: req.body.email,
    connection: "Username-Password-Authentication"
  });
  
  var config = {
    method: 'post',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/dbconnections/change_password`,
    headers: {  'Content-Type': 'application/json' },
    data
  };

  let result;
    try {
      result = await axios(config);
    } catch (ex) {
      return res.status(ex.response.status).send(ex.response.data.description)
    }

  res.send({ success: true, result: result.data });
}

export default handler
