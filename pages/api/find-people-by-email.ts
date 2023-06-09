import { NextApiResponse, NextApiRequest } from 'next';
import { query } from '@/graphql/hasuraAdmin';
import CookieService from '../../utils/cookie';
import {
  FindPeopleByEmailDocument,
  FindPeopleByEmailQuery,
} from '@/graphql/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const searchText = req.query.searchText;

  try {
    const {
      data: { people },
    } = await query<FindPeopleByEmailQuery>({
      query: FindPeopleByEmailDocument,
      variables: { query: `%${searchText}%` },
    });
    return res.send(people);
  } catch (ex) {
    res.status(500).send(ex);
  }
};

export default handler;
