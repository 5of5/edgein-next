import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await CookieService.getUser(CookieService.getAuthToken(req.cookies));
  let headers: {Authorization: string, Role: string, Id: string} |
    {'x-hasura-admin-secret': string, 'x-hasura-role': string, 'X-Hasura-User-Id': string}
  if (process.env.DEV_MODE) {
    headers  = {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ?? "",
      'x-hasura-role': process.env.HASURA_VIEWER ?? "",
      'X-Hasura-User-Id': user?.id.toString() ?? ''
    }
  } else {
    if (!user) {
      return res.status(401).end()
    }
    headers  = user.email.endsWith('@5of5.vc') || process.env.DEV_MODE ?
    {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ?? "",
      'x-hasura-role': process.env.HASURA_VIEWER ?? "",
      'X-Hasura-User-Id': user.id.toString() ?? ''
    }
      : 
    {
      Authorization: `Bearer ${CookieService.getAuthToken(req.cookies)}`,
      Role: '',
      Id: user.id.toString() ?? ''
    }
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