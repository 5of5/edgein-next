import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await CookieService.getUser(CookieService.getAuthToken(req.cookies));
  let headers: {'x-hasura-role'?: string, 'x-hasura-user-id'?: string} & { Authorization: string } |
  //let headers: {'x-hasura-role'?: string} & { Authorization: string } |
    {'x-hasura-admin-secret': string }
    if (!user) {
      return res.status(401).end()
    }
    if (user.role === "user" || req.headers['is-viewer'] === 'true') {
      headers  = {
        Authorization: `Bearer ${CookieService.getAuthToken(req.cookies)}`,
        'x-hasura-role': process.env.HASURA_VIEWER ?? "",
      }  
    } else {
      headers  = {
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ?? "",
      }  
    }
    // temporay until everyone gets a new cookie
    headers  = {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ?? "",
      'x-hasura-user-id': user?.id?.toString() ?? ''
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