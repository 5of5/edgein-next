import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/graphql/hasuraAdmin';
import {
  GetSignUpProfileDocument,
  GetSignUpProfileQuery,
} from '@/graphql/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  const email = req.query.email as string;
  const name = decodeURIComponent(req.query.name as string);

  try {
    const person = await onGetSignUpProfile(email, name);

    return res.status(200).send({ person });
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

export const onGetSignUpProfile = async (email: string, name: string) => {
  const {
    data: { people },
  } = await query<GetSignUpProfileQuery>({
    query: GetSignUpProfileDocument,
    variables: {
      email: `%${email}%`,
      name: `%${name}%`,
    },
  });

  return people[0];
};

export default handler;
