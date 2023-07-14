import CookieService from '@/utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mutate } from '@/graphql/hasuraAdmin';
import {
  InsertResetPasswordDocument,
  InsertResetPasswordMutation,
} from '@/graphql/types';
import { makeAuthService } from '@/services/auth.service';

const authService = makeAuthService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  // payload
  const userId = req.body.userId;
  const password = req.body.password;

  // TODO fix code
  if (!userId || !password) return res.status(404).send('Invalid request');

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // only admin can reset the user's password
  if (!(user?.role === 'admin')) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  let result;
  try {
    result = await authService.setPassword({
      userId,
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
