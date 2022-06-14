import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const opts = {
    method: "POST",
    body: req.body,
    headers: { Authorization: `Bearer ${CookieService.getAuthToken(req.cookies)}` },
  }
  const proxyRes = await fetch("http://localhost:8080/v1/graphql", opts);

  const json = await proxyRes.json();

  if (json.errors) {
    const { message } = json.errors[0];

    throw new Error(message);
  }

  res.send(json)
}

export default handler