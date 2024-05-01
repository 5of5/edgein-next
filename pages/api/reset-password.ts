import CookieService from '@/utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mutate } from '@/graphql/hasuraAdmin';
import {
  InsertResetPasswordDocument,
  InsertResetPasswordMutation,
} from '@/graphql/types';
import { makeAuthService } from '@/services/auth.service';
import { USER_ROLES } from '@/utils/users';

const authService = makeAuthService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  // payload
  const userId = req.body.userId;
  const password = req.body.password;
  const auth0UserId = req.body.auth0UserId;

  // TODO fix code
  if (!userId || !password || !auth0UserId)
    return res.status(404).send('Invalid request');

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // only admin can reset the user's password
  if (!(user?.role === USER_ROLES.ADMIN)) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  let result;
  try {
    result = await authService.setPassword({
      userId: `auth0|${auth0UserId}`,
      password,
    });
    await mutate<InsertResetPasswordMutation>({
      mutation: InsertResetPasswordDocument,
      variables: {
        object: {
          user_id: userId,
          generated_password: password,
          created_by_user_id: user.id,
        },
      },
    });
  } catch (ex: any) {
    return res.status(404).send(ex.message);
  }

  res.send({ success: true, result });
};

export default handler;
