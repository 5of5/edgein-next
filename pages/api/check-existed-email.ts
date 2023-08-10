import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from '@/utils/users';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  const email = req.query.email as string;

  try {
    const userData = await UserService.findOneUserByEmail(email);

    if (!userData) {
      return res.status(400).send({
        existed: false,
      });
    }

    return res.status(200).send({
      existed: true,
    });
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

export default handler;
