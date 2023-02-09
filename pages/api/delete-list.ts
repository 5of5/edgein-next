import { NextApiResponse, NextApiRequest } from "next";
import { query, mutate } from '@/graphql/hasuraAdmin'
import CookieService from '../../utils/cookie'
import { deleteFollowIfExists, updateResourceSentimentCount } from '@/utils/lists'
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

  try {
    await deleteFollowsForList(user, token, list) // delete follows
    await deleteListMemberIfExist(user, token, list); // delete list member
    await deleteListIfExist(user, token, list); // delete lists
    res.status(200).json({ success: true });
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

const deleteFollowsForList = async (user: User, token: string, list: Lists) => {
const { data: { delete_follows: { returning } } } = await mutate({
  mutation: `
  mutation delete_follows($where: follows_bool_exp!) {
    delete_follows(where: $where) {
      returning {
        id
      }
    }
  }
  `,
  variables: {
    where: {
      created_by_user_id: { _eq: user.id },
      list_id: { _eq: list.id }
    }
  }
}, token)

return returning.length
}

const deleteListMemberIfExist = async (user: User, token: string, list: Lists) => {
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

const deleteListIfExist = async (user: User, token: string, list: Lists) => {
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
