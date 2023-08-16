import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from '@/utils/users';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  const email = req.query.email as string;

  if (!email) {
    return res.status(400).send({ error: 'Email is required.' });
  }

  try {
    const userData = await UserService.findOneUserByEmail(email);

    return res.status(200).send({
      existed: Boolean(userData),
    });
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

export default handler;
