import { NextApiResponse, NextApiRequest } from 'next';
import { z } from 'zod';
import { query } from '@/graphql/hasuraAdmin';
import CookieService from '../../utils/cookie';
import {
  FindPeopleByEmailDocument,
  FindPeopleByEmailQuery,
} from '@/graphql/types';
import { EMAIL_MAX_LENGTH } from '@/utils/constants';
import { findPeopleByEmailSchema } from '@/utils/schema';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const searchText = req.query.searchText;

  const keyword = findPeopleByEmailSchema.parse(searchText);

  try {
    const {
      data: { people },
    } = await query<FindPeopleByEmailQuery>({
      query: FindPeopleByEmailDocument,
      variables: { query: `%${keyword}%` },
    });
    return res.send(people);
  } catch (ex) {
    res.status(500).send(ex);
  }
};

export default handler;
