import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await CookieService.getUser(CookieService.getAuthToken(req.cookies));
  if (!user) {
    return res.status(401).end()
  }
  const headers: {Authorization: string} | {'x-hasura-admin-secret': string} = user.email.endsWith('@5of5.vc') || user.email === 'ed@acutulus.co' ?
  {'x-hasura-admin-secret': process.env.HASURA_SECRET ?? "" }
    : 
  { Authorization: `Bearer ${CookieService.getAuthToken(req.cookies)}` }
  const opts = {
    method: "POST",
    body: typeof req.body === 'object' ? JSON.stringify(req.body) : req.body,
    headers      
  }
  console.log(opts)
  const proxyRes = await fetch(process.env.GRAPHQL_ENDPOINT ?? "", opts);

  const json = await proxyRes.json();

  res.send(json)
}

export default handler