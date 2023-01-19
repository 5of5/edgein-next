import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await CookieService.getUser(CookieService.getAuthToken(req.cookies));
  let headers: {Authorization: string} | {'x-hasura-admin-secret': string}
  if (process.env.DEV_MODE) {
    headers  = {'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ?? "" }
  } else {
    if (!user) {
      return res.status(401).end()
    }
    headers  = user.email.endsWith('@5of5.vc') || user.role === "admin" || process.env.DEV_MODE ?
    {'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ?? "" }
      : 
    { Authorization: `Bearer ${CookieService.getAuthToken(req.cookies)}` }
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