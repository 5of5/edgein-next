import { mutate } from '@/graphql/hasuraAdmin';
import { InsertActionDocument, InsertActionMutation } from '@/graphql/types';
import applyRateLimit from '@/utils/rate-limit';
import { partnerLookUp } from '@/utils/submit-data';
import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await applyRateLimit(req, res)
  } catch {
    return res.status(429).send('Too many requests')
  }
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const token = String(req.headers["x-edgein-token"]);
  if (!token) {
    return res.status(401).send({ message: "Unauthorized Partner" });
  }
  const partner = await partnerLookUp(token);
  if (!partner) {
    return res.status(401).send({ message: "Unauthorized Partner" });
  }
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

  await mutate<InsertActionMutation>({
    mutation: InsertActionDocument,
    variables: {
      object: {
        action: "API Query",
        page: "external",
        properties: typeof req.body === 'object' ? req.body : JSON.stringify(req.body),
        partner: partner.id,
      },
    },
  });

  res.send(json)
}

export default handler