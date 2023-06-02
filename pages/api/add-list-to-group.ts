import type { NextApiRequest, NextApiResponse } from 'next';
import { query, mutate } from '@/graphql/hasuraAdmin';
import CookieService from '../../utils/cookie';
import {
  GetListUserGroupsByListIdAndGroupIdDocument,
  GetListUserGroupsByListIdAndGroupIdQuery,
  InsertListUserGroupsDocument,
  InsertListUserGroupsMutation,
} from '@/graphql/types';
import { triggerListUpdatedAt } from '@/utils/lists';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const groupId: number = req.body.groupId;
  const listIds: Array<number> = req.body.listIds;

  const response = await Promise.all(
    listIds.map(async (listId: number) => {
      const existList = await onFindListUserGroup(listId, groupId);
      if (!existList) {
        const addToGroupResponse = await onAddListToGroup(listId, groupId);
        await triggerListUpdatedAt(listId);
        return addToGroupResponse;
      }
      return null;
    }),
  );

  res.send(response);
};

const onFindListUserGroup = async (list_id: number, user_group_id: number) => {
  const {
    data: { list_user_groups },
  } = await query<GetListUserGroupsByListIdAndGroupIdQuery>({
    query: GetListUserGroupsByListIdAndGroupIdDocument,
    variables: { list_id, user_group_id },
  });

  return list_user_groups[0];
};

const onAddListToGroup = async (list_id: number, user_group_id: number) => {
  const {
    data: { insert_list_user_groups_one },
  } = await mutate<InsertListUserGroupsMutation>({
    mutation: InsertListUserGroupsDocument,
    variables: {
      object: {
        list_id,
        user_group_id,
      },
    },
  });

  return insert_list_user_groups_one;
};

export default handler;
