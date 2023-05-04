import { NextApiResponse, NextApiRequest } from "next";
import { query, mutate } from '@/graphql/hasuraAdmin'
import CookieService from '../../utils/cookie'
import { User } from '@/models/user';
import {
  DeleteFollowsDocument,
  DeleteFollowsMutation,
  DeleteListMembersDocument,
  DeleteListMembersMutation,
  DeleteListsDocument,
  DeleteListsMutation,
  DeleteListUserGroupsDocument,
  DeleteListUserGroupsMutation,
  GetListByIdDocument,
  GetListByIdQuery,
} from "@/graphql/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const listId: number = +req.query.listId;
  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  // query list
  const list = await queryForLists(listId);
  if (!list) return res.status(400).json({ message: 'Invalid List' });

  try {
    await deleteFollowsForList(user, token, list.id) // delete follows
    await deleteListMemberIfExist(user, token, list.id); // delete list member
    await deleteListIfExist(user, token, list.id); // delete lists
    await deleteListUserGroupIfExist(list.id); //delete list_user_groups
    res.status(200).json({ success: true });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const queryForLists = async (id: number) => {
  try {
    const data = await query<GetListByIdQuery>({
      query: GetListByIdDocument,
      variables: { id }
    })
    return data.data.lists[0]
  } catch (ex) {
    throw ex;
  }
}

const deleteFollowsForList = async (user: User, token: string, listId: number) => {
const { data: { delete_follows } } = await mutate<DeleteFollowsMutation>({
  mutation: DeleteFollowsDocument,
  variables: {
    where: {
      created_by_user_id: { _eq: user.id },
      list_id: { _eq: listId }
    }
  }
}, token)

return delete_follows?.returning.length
}

const deleteListMemberIfExist = async (user: User, token: string, listId: number) => {
  const { data: { delete_list_members } } = await mutate<DeleteListMembersMutation>({
    mutation: DeleteListMembersDocument,
    variables: {
      where: {
        list_id: { _eq: listId },
        user_id: { _eq: user.id },
      }
    }
  }, token)

  return delete_list_members?.returning.length
}

const deleteListIfExist = async (user: User, token: string, listId: number) => {
  const { data: { delete_lists } } = await mutate<DeleteListsMutation>({
    mutation: DeleteListsDocument,
    variables: {
      where: {
        created_by_id: { _eq: user.id },
        id: { _eq: listId }
      }
    }
  }, token)

  return delete_lists?.returning.length
}

const deleteListUserGroupIfExist = async (listId: number) => {
  const { data: { delete_list_user_groups } } = await mutate<DeleteListUserGroupsMutation>({
    mutation: DeleteListUserGroupsDocument,
    variables: {
      where: {
        list_id: { _eq: listId }
      }
    }
  })

  return delete_list_user_groups?.returning.length
}

export default handler;
