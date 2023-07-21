import { mutate } from '@/graphql/hasuraAdmin';
import { Lists } from '@/graphql/types';
import {
  checkFollowExists,
  deleteFollowIfExists,
  upsertFollow,
  upsertList,
} from '@/utils/lists';
import { listSchema } from '@/utils/schema';
import { isFullList, zodValidate } from '@/utils/validation';
import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '../../utils/cookie';

interface Action {
  action: string;
  page: string;
  properties: {
    listId: number;
    sentiment?: string;
  };
  resource_id: number;
  resource: string;
  user: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  // params:
  const personIds: number[] = req.body.personIds;
  const listName: string = req.body.listName;
  const action: 'add' | 'remove' = req.body.action;
  const pathname: string = req.body.pathname;

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const { errors } = zodValidate(
    { ...req.body, name: req.body.listName },
    listSchema,
  );
  if (errors) {
    return res
      .status(400)
      .send({ error: errors['name']?.[0] || 'Invalid parameters' });
  }

  // check if user has a list for sentiment
  // upsertList
  const list = await upsertList(listName, user, token);

  if (isFullList(list as Lists)) {
    return res.status(400).send({ error: 'List is full' });
  }

  const isAddToList = action === 'add';

  await Promise.all(
    personIds.map(async personId => {
      if (isAddToList) {
        // check if person already follows
        const existsFollows = await checkFollowExists(
          list?.id || 0,
          personId,
          'people',
          user?.id,
        );
        // insert follow only if the follows don't exists
        if (existsFollows.length === 0) {
          await upsertFollow(list?.id || 0, personId, 'people', user, token);
        }
      } else {
        await deleteFollowIfExists(
          list?.id || 0,
          personId,
          'people',
          user,
          token,
        );
      }

      const actionPayload: Action = {
        action: `${isAddToList ? 'Add' : 'Remove'} ${
          isAddToList ? 'To' : 'From'
        } List`,
        page: pathname,
        properties: {
          listId: list?.id || 0,
        },
        resource_id: personId,
        resource: 'people',
        user: user.id,
      };

      // create action
      await mutate({
        mutation: `
        mutation InsertAction($object: actions_insert_input!) {
          insert_actions_one(
            object: $object
          ) {
            id
          }
        }
      `,
        variables: {
          object: actionPayload,
        },
      });
    }),
  );

  res.send({ success: true });
};

export default handler;
