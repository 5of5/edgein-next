import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const headers = {
    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ?? "",
    'x-hasura-role': process.env.HASURA_API_VIEWER ?? "",
  }
  const opts = {
    method: "POST",
    body: typeof req.body === 'object' ? JSON.stringify(req.body) : req.body,
    headers      
  }
  const proxyRes = await fetch(process.env.GRAPHQL_ENDPOINT ?? "", opts);

  const json = await proxyRes.json();
  res.send(json)
}

export default handler