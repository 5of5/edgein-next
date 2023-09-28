import UserService from '../../utils/users';
import CookieService from '../../utils/cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mutate } from '@/graphql/hasuraAdmin';
import {
  UpdateUserUseCreditsSystemDocument,
  UpdateUserUseCreditsSystemMutation,
} from '@/graphql/types';
import UserTransactionsService, {
  CREDITS_PER_MONTH,
} from '@/utils/userTransactions';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const enableCreditsSystem: boolean = req.body.enableCreditsSystem;
  if (enableCreditsSystem === undefined) {
    res
      .status(400)
      .json({ message: 'Missing enableCreditsSystem attribute in body' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  try {
    const userData = await UserService.findOneUserById(user.id);
    if (userData.use_credits_system === enableCreditsSystem) {
      return res
        .status(400)
        .send({ message: 'Credits system is already enabled/disabled !' });
    }

    if (enableCreditsSystem && userData.credits >= CREDITS_PER_MONTH) {
      await mutate<UpdateUserUseCreditsSystemMutation>(
        {
          mutation: UpdateUserUseCreditsSystemDocument,
          variables: {
            user_id: user.id,
            use_credits_system: true,
          },
        },
        token,
      );

      await UserTransactionsService.onInsertTransaction(
        user.id,
        -CREDITS_PER_MONTH,
        `${CREDITS_PER_MONTH} - enable credits system, first transaction`,
      );
    }

    if (!enableCreditsSystem) {
      await mutate<UpdateUserUseCreditsSystemMutation>(
        {
          mutation: UpdateUserUseCreditsSystemDocument,
          variables: {
            user_id: user.id,
            use_credits_system: false,
          },
        },
        token,
      );
    }

    return res.send({ success: true });
  } catch (ex: any) {
    return res.status(400).send({ message: ex.message });
  }
};

export default handler;
