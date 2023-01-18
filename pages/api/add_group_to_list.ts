import type { NextApiRequest, NextApiResponse } from "next";
import difference from "lodash/difference";
import { query, mutate } from "@/graphql/hasuraAdmin";
import { List_User_Groups } from "@/graphql/types";
import CookieService from "../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const listId: number = req.body.listId;
  const newGroupIds: Array<number> = req.body.groupIds;

  const {
    data: { list_user_groups },
  } = await query({
    query: `
      query findListUserGroups($listId: Int!) {
        list_user_groups(where: {list_id: {_eq: $listId}}) {
          id
          list_id
          user_group_id
        }
      }
    `,
    variables: { listId },
  });

  const currentGroupIds = list_user_groups.map(
    (item: List_User_Groups) => item.user_group_id
  );

  const addGroupIds = difference(newGroupIds, currentGroupIds);
  const deleteGroupIds = difference(currentGroupIds, newGroupIds);

  const addedGroups = await Promise.all(
    addGroupIds.map((id: number) => onAddListToGroup(listId, id))
  );

  const deletedGroups = await Promise.all(
    deleteGroupIds.map((id: number) => onDeleteListGroup(listId, id))
  );

  res.send({ addedGroups, deletedGroups });
};

const onAddListToGroup = async (list_id: number, user_group_id: number) => {
  const {
    data: { insert_list_user_groups_one },
  } = await mutate({
    mutation: `
    mutation InsertListUserGroups($object: list_user_groups_insert_input!) {
      insert_list_user_groups_one(
        object: $object
      ) {
        id
        list_id
        user_group_id
      }
    }
  `,
    variables: {
      object: {
        list_id,
        user_group_id,
      },
    },
  });

  return insert_list_user_groups_one;
};

const onDeleteListGroup = async (list_id: number, user_group_id: number) => {
  const {
    data: { delete_list_user_groups },
  } = await mutate({
    mutation: `
      mutation DeleteListUserGroups($list_id: Int!, $user_group_id: Int!) {
        delete_list_user_groups(
          where: {
            _and: [
              {list_id: {_eq: $list_id}},
              {user_group_id: {_eq: $user_group_id}}
            ]
          }
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `,
    variables: {
      list_id,
      user_group_id,
    },
  });
  return delete_list_user_groups.returning[0];
};

export default handler;
