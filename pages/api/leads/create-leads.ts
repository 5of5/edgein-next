import { NextApiResponse, NextApiRequest } from 'next';
import UserService, { USER_ROLES } from '@/utils/users';
import { CreateLeadsReqSchema } from './schema';
import { createLeads } from './mutation';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const { role } = (await UserService.getUserByCookies(req.cookies)) ?? {};
  if (role !== USER_ROLES.ADMIN) {
    return res.status(401).json({
      message: 'You are unauthorized for this operation!',
    });
  }

  // TODO: Is this JSON.Parse required?
  const parseResponse = CreateLeadsReqSchema.safeParse(JSON.parse(req.body));
  if (!parseResponse.success) {
    return res.status(400).json({
      error: parseResponse.error.errors,
      message: 'Invalid request body',
    });
  }

  try {
    const result = await createLeads(parseResponse.data);
    res.send({ result });
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : err;
    return res
      .status(500)
      .send({ message: 'Failed to create leads', error: errMessage });
  }
};

export default handler;
