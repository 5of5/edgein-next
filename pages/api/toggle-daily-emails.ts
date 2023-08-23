import UserService from '../../utils/users';
import CookieService from '../../utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mutate } from '@/graphql/hasuraAdmin';
import {
  UpdateUserPreferencesDocument,
  UpdateUserPreferencesMutation,
} from '@/graphql/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const dailyEmails: boolean = req.body.dailyEmails;
  if (dailyEmails === undefined) {
    res.status(400).json({ message: 'Missing dailyEmails attribute in body' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  try {
    const userData = await UserService.findOneUserById(user.id);
    const preferences = userData.preferences;
    await mutate<UpdateUserPreferencesMutation>(
      {
        mutation: UpdateUserPreferencesDocument,
        variables: {
          id: user.id,
          preferences: {
            ...preferences,
            daily_emails: dailyEmails,
          },
        },
      },
      token,
    );
    return res.send({ success: true });
  } catch (ex: any) {
    return res.status(400).send({ message: ex.message });
  }
};

export default handler;
