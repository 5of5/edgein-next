import type { NextApiRequest, NextApiResponse } from 'next';
import { mutate, query } from '@/graphql/hasuraAdmin';
import {
  InsertListMembersDocument,
  UpsertMembershipDocument,
} from '@/graphql/types';
import CookieService from '@/utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const { listId, inviteUsers } = req.body;
  if (!listId || !inviteUsers)
    return res.status(400).json({ error: 'Missing listId or inviteUsers' });

  const results = [];
  for (const inviteUser of inviteUsers) {
    // Try to add as a follower (member_type: 'follow')
    try {
      const { data } = await mutate(
        {
          mutation: InsertListMembersDocument,
          variables: {
            object: {
              list_id: listId,
              user_id: inviteUser.id,
              member_type: 'follow',
            },
          },
        },
        token,
      );
      results.push({ member: data?.insert_list_members_one });
    } catch (err) {
      let errorMsg = 'Failed to invite';
      if (err instanceof Error) errorMsg = err.message;
      results.push({ error: errorMsg });
    }
  }
  res.json(results);
};

export default handler;
