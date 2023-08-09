import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/graphql/hasuraAdmin';
import CookieService from '@/utils/cookie';
import {
  FindPeopleByNameAndEmailDocument,
  FindPeopleByNameAndEmailQuery,
} from '@/graphql/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  try {
    const people = await onFindPeopleByNameAndEmail(
      user.display_name || '',
      user.email,
    );

    return res.status(200).send(people);
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

export const onFindPeopleByNameAndEmail = async (
  name: string,
  email: string,
) => {
  const {
    data: { people },
  } = await query<FindPeopleByNameAndEmailQuery>({
    query: FindPeopleByNameAndEmailDocument,
    variables: {
      name: `%${name}%`,
      email: `%${email}%`,
    },
  });

  return people;
};

export default handler;
