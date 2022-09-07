import { NextApiResponse, NextApiRequest } from "next";
import { query, mutate } from '@/graphql/hasuraAdmin'
import CookieService from '../../utils/cookie'
import { deleteIfExists, updateResourceSentimentCount } from '@/utils/lists'
import { User } from '@/models/User';
import { Lists } from '@/graphql/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const listId = req.query.listId as string;
  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  // query list
  const list = await queryForLists(listId);
  if (!list) return res.status(400).json({ message: 'Invalid List' });

  const sentimentType = list.name.split('-').pop(); 

  try {
    const followResult = await queryForFollows(listId);
    if (!followResult) return res.status(400).json({ message: 'Invalid Follow' });
    await deleteIfExists(list, followResult.resource_id, followResult.resource_type, user, token) // delete follows
    await deleteListMemberIfExist(user, token, list); // delete list member
    await deleteListIfExist(user, token, list); // delete lists
    const { sentiment, revalidatePath } = await updateResourceSentimentCount(followResult.resource_type, followResult.resource_id, token, sentimentType, false, true)
    res.status(200).json({ sentiment, revalidatePath });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const queryForLists = async (id: string) => {
  // prepare gql query
  const fetchQuery = `
  query query_lists($id: Int!) {
    lists(where: {id: {_eq: $id}}, limit: 1) {
      id
      name
    }
  }
  `
  try {
    const data = await query({
      query: fetchQuery,
      variables: { id }
    })
    return data.data.lists[0]
  } catch (ex) {
    throw ex;
  }
}

const queryForFollows = async (list_id: string) => {
  // prepare gql query
  const fetchQuery = `
  query query_follows($list_id: Int!) {
    follows(where: {list_id: {_eq: $list_id}}, limit: 1) {
      id
      created_by_user_id
      resource_type
      resource_id
      list_id
    }
  }
  `
  try {
    const data = await query({
      query: fetchQuery,
      variables: { list_id }
    })
    return data.data.follows[0]
  } catch (ex) {
    throw ex;
  }
}

export const deleteListMemberIfExist = async (user: User, token: string, list: Lists) => {
  const { data: { delete_list_members: { returning } } } = await mutate({
    mutation: `
    mutation delete_list_members($where: list_members_bool_exp!) {
      delete_list_members(where: $where) {
        returning {
          id
        }
      }
    }
    `,
    variables: {
      where: {
        list_id: { _eq: list.id },
        user_id: { _eq: user.id },
      }
    }
  }, token)

  return returning.length
}

export const deleteListIfExist = async (user: User, token: string, list: Lists) => {
  const { data: { delete_lists: { returning } } } = await mutate({
    mutation: `
    mutation delete_lists($where: lists_bool_exp!) {
      delete_lists(where: $where) {
        returning {
          id
        }
      }
    }
    `,
    variables: {
      where: {
        created_by_id: { _eq: user.id },
        id: { _eq: list.id }
      }
    }
  }, token)

  return returning.length
}

export default handler;
