import { NextApiResponse, NextApiRequest } from 'next';
import GroupService from '@/utils/groups';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    res.status(405).json({ message: 'Method not allowed' });

  const resource_id = req.body.resourceId;
  const resource_type = req.body.resourceType;

  const resource = await GroupService.onLookupResource(
    resource_type,
    resource_id,
  );

  res.send(resource);
};

export default handler;
