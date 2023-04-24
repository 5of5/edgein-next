import { mutate, query } from '@/graphql/hasuraAdmin'
import {
  DeleteFollowsDocument,
  DeleteFollowsMutation,
  DeleteListMembersDocument,
  DeleteListMembersMutation,
  GetFollowsByResourceDocument,
  GetFollowsByResourceQuery,
  GetListMembersDocument,
  GetListMembersQuery,
  GetSentimentByCompanyIdDocument,
  GetSentimentByCompanyIdQuery,
  GetSentimentByVcFirmIdDocument,
  GetSentimentByVcFirmIdQuery,
  InsertListMembersDocument,
  InsertListMembersMutation,
  UpdateSentimentByCompanyIdDocument,
  UpdateSentimentByCompanyIdMutation,
  UpdateSentimentByVcFirmIdDocument,
  UpdateSentimentByVcFirmIdMutation,
  UpsertFollowsDocument,
  UpsertFollowsMutation,
  UpsertListDocument,
  UpsertListMutation,
  UpsertMembershipDocument,
  UpsertMembershipMutation,
  Lists,
  TriggerListUpdatedAtMutation,
  TriggerListUpdatedAtDocument,
  CheckFollowExistsQuery,
  CheckFollowExistsDocument,
} from "@/graphql/types";
import { User } from '@/models/User';

export const updateResourceSentimentCount = async (resourceType: 'companies' | 'vc_firms', resourceId: number, token: string, sentimentType: string, shouldInc: boolean, shouldDec: boolean) => {
  if (resourceType === 'companies') {
    return await updateCompaniesSentimentCount(resourceId, token, sentimentType, shouldInc, shouldDec);
  } else {
    return await updateVCFirmsSentimentCount(resourceId, token, sentimentType, shouldInc, shouldDec);
  }
}

export const updateCompaniesSentimentCount = async (companyId: number, token: string, sentimentType: string, shouldInc: boolean, shouldDec: boolean) => {
  const { data } = await query<GetSentimentByCompanyIdQuery>({
    query: GetSentimentByCompanyIdDocument,
    variables: { "companyId": companyId }
  }, token)

  const sentiment = data.companies_by_pk?.sentiment || {};
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

  await mutate<UpdateSentimentByCompanyIdMutation>({
    mutation: UpdateSentimentByCompanyIdDocument,
    variables: { "companyId": companyId, sentiment }
  }, token)

  return { sentiment, revalidatePath: shouldInc ? `/companies/${data.companies_by_pk?.slug}/?revalidation_auth=${process.env.REVALIDATION_AUTH_TOKEN}` : '' }
}

export const updateVCFirmsSentimentCount = async (vcFirmId: number, token: string, sentimentType: string, shouldInc: boolean, shouldDec: boolean) => {
  const { data } = await query<GetSentimentByVcFirmIdQuery>({
    query: GetSentimentByVcFirmIdDocument,
    variables: { "vcFirmId": vcFirmId }
  }, token)

  const sentiment = data.vc_firms_by_pk?.sentiment || {};

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

  await mutate<UpdateSentimentByVcFirmIdMutation>({
    mutation: UpdateSentimentByVcFirmIdDocument,
    variables: { "vcFirmId": vcFirmId, sentiment }
  }, token)

  return { sentiment, revalidatePath: shouldInc ? `/investors/${data.vc_firms_by_pk?.slug}/?revalidation_auth=${process.env.REVALIDATION_AUTH_TOKEN}` : '' }
}

export const upsertList = async (listname: string, user: User, token: string) => {
  // check list exists
  const { data: { insert_lists_one: list } } = await mutate<UpsertListMutation>({
    mutation: UpsertListDocument,
    variables: {
      name: listname,
      userId: user.id
    }
  }, token)
  // check list membership exists
  await mutate<UpsertMembershipMutation>({
    mutation: UpsertMembershipDocument,
    variables: {
      listId: list?.id,
      userId: user.id
    }
  }, token)
  return list
}

export const upsertFollow = async (listId: number, resourceId: number, resourceType: string, user: User, token: string) => {
  const { data: { insert_follows_one } } = await mutate<UpsertFollowsMutation>({
    mutation: UpsertFollowsDocument,
    variables: {
      listId,
      resourceId,
      resourceType,
      userId: user.id
    }
  }, token)
  return insert_follows_one
}

export const deleteFollowIfExists = async (listId: number, resourceId: number, resourceType: string, user: User, token: string) => {
  const { data: { delete_follows } } = await mutate<DeleteFollowsMutation>({
    mutation: DeleteFollowsDocument,
    variables: {
      where: {
        resource_id: { _eq: resourceId },
        resource_type: { _eq: resourceType },
        created_by_user_id: { _eq: user.id },
        list_id: { _eq: listId }
      }
    }
  }, token)

  return delete_follows?.returning.length
}

export const getFollowsByResource = async (resourceId: number, resourceType: string) => {
  const {
    data: { follows }
  } = await query<GetFollowsByResourceQuery>({
    query: GetFollowsByResourceDocument,
    variables: { resourceId, resourceType },
  });
  return follows;
}

export const findListMemberOne = async (list_id: number, user_id: number) => {
  const {
    data: { list_members },
  } = await query<GetListMembersQuery>({
    query: GetListMembersDocument,
    variables: {
      where: {
        list_id: { _eq: list_id },
        user_id: { _eq: user_id },
      }
    }
  });

  return list_members[0];
};

export const deleteListMember = async (id: number) => {
  const {
    data: { delete_list_members },
  } = await mutate<DeleteListMembersMutation>({
    mutation: DeleteListMembersDocument,
    variables: {
      where: {
        id: { _eq: id },
      }
    },
  });
  return delete_list_members?.returning[0];
};

export const insertListMembers = async (
  list_id: number,
  user_id: number,
  member_type: string
) => {
  const {
    data: { insert_list_members_one },
  } = await mutate<InsertListMembersMutation>({
    mutation: InsertListMembersDocument,
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


export const checkFollowExists = async (
  listId: number,
  resourceId: number,
  resourceType: string,
  userId: number
) => {
  const {
    data: { follows },
  } = await query<CheckFollowExistsQuery>({
    query: CheckFollowExistsDocument,
    variables: {
      where: {
        resource_id: { _eq: resourceId },
        resource_type: { _eq: resourceType },
        created_by_user_id: { _eq: userId },
        list_id: { _eq: listId },
      },
    },
  });

  return follows;
};

export const triggerListUpdatedAt = async (id: number) => {
  try {
    const {
      data: { update_lists },
    } = await mutate<TriggerListUpdatedAtMutation>({
      mutation: TriggerListUpdatedAtDocument,
      variables: {
        id,
        updated_at: new Date().toISOString(),
      },
    });
    return update_lists?.returning[0];
  } catch (ex) {
    throw ex;
  }
};