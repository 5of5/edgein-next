import { mutate, query } from '@/graphql/hasuraAdmin'
import { Lists } from '@/graphql/types';
import { User } from '@/models/User';

export const updateResourceSentimentCount = async (resourceType: 'companies' | 'vc_firms', resourceId: string, token: string, sentimentType: string, shouldInc: boolean, shouldDec: boolean) => {
  if (resourceType === 'companies') {
    return await updateCompaniesSentimentCount(resourceId, token, sentimentType, shouldInc, shouldDec);
  } else {
    return await updateVCFirmsSentimentCount(resourceId, token, sentimentType, shouldInc, shouldDec);
  }
}

export const updateCompaniesSentimentCount = async (companyId: string, token: string, sentimentType: string, shouldInc: boolean, shouldDec: boolean) => {
  const { data } = await query({
    query: `
    query query_sentiment($companyId: Int!) {
      companies_by_pk(id: $companyId) {
        sentiment
        slug
      }
    }`,
    variables: { "companyId": companyId }
  }, token)

  const company = data.companies_by_pk || {}
  const sentiment = company?.sentiment || {}

  // Was added to list for first time, so increament company count
  if (shouldInc) {
    // update sentiment on company
    // Feel this is bad and a race condition
    // TODO refactor to use direct sql so increamenting can be atomic
    if (!(sentimentType in sentiment)) {
      sentiment[sentimentType] = 0
    }
    sentiment[sentimentType] = sentiment[sentimentType] + 1

  }

  if (shouldDec) {
    // update sentiment on company
    // Feel this is bad and a race condition
    if (!(sentimentType in sentiment)) {
      sentiment[sentimentType] = 0
    } else if ((sentimentType in sentiment) && sentiment[sentimentType] > 0) {
      sentiment[sentimentType] = sentiment[sentimentType] - 1
    }
  }

  await mutate({
    mutation: `
    mutation update_sentiment($companyId: Int!, $sentiment: jsonb!) {
      update_companies_by_pk(pk_columns: {id: $companyId}, _set: {sentiment: $sentiment}) {
        sentiment
      }
    }    
    `,
    variables: { "companyId": companyId, sentiment }
  }, token)

  return { sentiment, revalidatePath: shouldInc ? `/companies/${company.slug}/?revalidation_auth=${process.env.REVALIDATION_AUTH_TOKEN}` : '' }
}

export const updateVCFirmsSentimentCount = async (vcFirmId: string, token: string, sentimentType: string, shouldInc: boolean, shouldDec: boolean) => {
  const { data } = await query({
    query: `
    query query_sentiment($vcFirmId: Int!) {
      vc_firms_by_pk(id: $vcFirmId) {
        sentiment
        slug
      }
    }`,
    variables: { "vcFirmId": vcFirmId }
  }, token)

  const vcfirm = data.vc_firms_by_pk || {}
  const sentiment = vcfirm?.sentiment || {}

  // Was added to list for first time, so increament company count
  if (shouldInc) {
    // update sentiment on company
    // Feel this is bad and a race condition
    // TODO refactor to use direct sql so increamenting can be atomic
    if (!(sentimentType in sentiment)) {
      sentiment[sentimentType] = 0
    }
    sentiment[sentimentType] = sentiment[sentimentType] + 1
  }

  if (shouldDec) {
    // update sentiment on company
    // Feel this is bad and a race condition
    if (!(sentimentType in sentiment)) {
      sentiment[sentimentType] = 0
    } else if ((sentimentType in sentiment) && sentiment[sentimentType] > 0) {
      sentiment[sentimentType] = sentiment[sentimentType] - 1
    }
  }

  await mutate({
    mutation: `
    mutation update_sentiment($vcFirmId: Int!, $sentiment: jsonb!) {
      update_vc_firms_by_pk(pk_columns: {id: $vcFirmId}, _set: {sentiment: $sentiment}) {
        sentiment
      }
    }    
    `,
    variables: { "vcFirmId": vcFirmId, sentiment }
  }, token)

  return { sentiment, revalidatePath: shouldInc ? `/investors/${vcfirm.slug}/?revalidation_auth=${process.env.REVALIDATION_AUTH_TOKEN}` : '' }
}

export const upsertList = async (listname: string, user: User, token: string) => {
  // check list exists
  const { data: { insert_lists_one: list } } = await mutate({
    mutation: `
    mutation upsert_list($userId: Int, $name: String) {
      insert_lists_one(object: {created_by_id: $userId, name: $name}, on_conflict: {constraint: lists_created_by_id_name_key, update_columns: created_by_id}) {
          id
      }
    }
    `,
    variables: {
      name: listname,
      userId: user.id
    }
  }, token)
  // check list membership exists
  await mutate({
    mutation: `
    mutation upsert_membership($userId: Int!, $listId: Int!) {
      insert_list_members_one(object: {user_id: $userId, list_id: $listId, member_type: "owner"}, on_conflict: {update_columns: user_id, constraint: list_members_list_id_user_id_key }) {
        id
      }
    }
    `,
    variables: {
      listId: list.id,
      userId: user.id
    }
  }, token)
  return list
}

export const upsertFollow = async (list: Lists, resourceId: string, resourceType: string, user: User, token: string) => {
  const { data: { insert_follows_one } } = await mutate({
    mutation: `
    mutation upsert_follows($listId: Int, $resourceId: Int, $resourceType: String, $userId: Int) {
      insert_follows_one(object: {list_id: $listId, resource_id: $resourceId, resource_type: $resourceType, created_by_user_id: $userId}, on_conflict: {constraint: follows_resource_type_resource_id_list_id_key}) {
        id
      }
    }
    `,
    variables: {
      listId: list.id,
      resourceId,
      resourceType,
      userId: user.id
    }
  }, token)
  return insert_follows_one
}

export const deleteFollowIfExists = async (list: Lists, resourceId: string, resourceType: string, user: User, token: string) => {
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
        resource_id: { _eq: resourceId },
        resource_type: { _eq: resourceType },
        created_by_user_id: { _eq: user.id },
        list_id: { _eq: list.id }
      }
    }
  }, token)

  return returning.length
}

export const getFollowsByResource = async (resourceId: number, resourceType: string) => {
  const {
    data: { follows }
  } = await query({
    query: `
      query findLists($resourceId: Int!, $resourceType: String!) {
        follows(where: {
          _and: [
            {resource_id: {_eq: $resourceId}},
            {resource_type: {_eq: $resourceType}}
          ]
        }) {
          id
          list_id
          list {
            list_members {
              id
              user_id
            }
          }
        }
      }
    `,
    variables: { resourceId, resourceType },
  });
  return follows;
}

export const findListMemberOne = async (list_id: number, user_id: number) => {
  const {
    data: { list_members },
  } = await query({
    query: `
      query FindListMemberOne($list_id: Int!, $user_id: Int!) {
        list_members(where: {
          _and: [
            {list_id: {_eq: $list_id}},
            {user_id: {_eq: $user_id}}
          ]
        }, limit: 1) {
          id
          list_id
          user_id
          member_type
        }
      }
      `,
    variables: { list_id, user_id },
  });

  return list_members[0];
};

export const deleteListMember = async (id: number) => {
  const {
    data: { delete_list_members },
  } = await mutate({
    mutation: `
        mutation DeleteListMember($id: Int!) {
          delete_list_members(where: {id: {_eq: $id}}) {
            affected_rows
            returning {
              id
            }
          }
        }
        `,
    variables: {
      id,
    },
  });
  return delete_list_members.returning[0];
};

export const insertListMembers = async (
  list_id: number,
  user_id: number,
  member_type: string
) => {
  const {
    data: { insert_list_members_one },
  } = await mutate({
    mutation: `
        mutation InsertListMembers($object: list_members_insert_input!) {
          insert_list_members_one(
            object: $object
          ) {
            id
            member_type
            list_id
            list {
              id
              name
              created_at
              created_by {
                id
                display_name
                email
              }
            }
            user_id
            user {
              id
              display_name
              email
            }
          }
        }
        `,
    variables: {
      object: {
        list_id,
        user_id,
        member_type,
      },
    },
  });
  return insert_list_members_one;
};
