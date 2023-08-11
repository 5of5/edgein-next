import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/graphql/hasuraAdmin';
import {
  FindPeopleByEmailAndLinkedinDocument,
  FindPeopleByEmailAndLinkedinQuery,
} from '@/graphql/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  const email = req.query.email as string;
  const linkedinUrl = req.query.linkedinUrl as string;

  try {
    const person = await onFindPeopleByEmailAndLinkedin(email, linkedinUrl);

    return res.status(200).send({ person });
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

export const onFindPeopleByEmailAndLinkedin = async (
  email: string,
  linkedin: string,
) => {
  const {
    data: { people },
  } = await query<FindPeopleByEmailAndLinkedinQuery>({
    query: FindPeopleByEmailAndLinkedinDocument,
    variables: {
      email: `%${email}%`,
      linkedin,
    },
  });

  return people[0];
};

export default handler;
