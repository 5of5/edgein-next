import { mutate } from "@/graphql/hasuraAdmin";
import { Follows } from "@/graphql/types";
import { flatten, unionBy } from "lodash";
import { getFollowsByResource } from "./lists";
import { ActionType, ResourceTypes } from "./submitData";

type NotificationParamType = {
  target_user_id: number,
  event_type: ActionType,
  follow_resource_type: string,
  notification_resource_type: string,
  message: string,
  company_id?: number | null,
  vc_firm_id?: number | null,
  action_ids: number[],
}

export const insertNotification = async ({
  target_user_id,
  event_type,
  follow_resource_type,
  notification_resource_type,
  message,
  company_id,
  vc_firm_id,
  action_ids,
}: NotificationParamType) => {
  const insertNotificationQuery = `
    mutation InsertNotifications($object: notifications_insert_input!) {
      insert_notifications_one(
        object: $object
      ) {
        id
        target_user_id
        event_type
        follow_resource_type
        notification_resource_type
        company_id
        vc_firm_id
        message
        read_at
        created_at
        updated_at
        read
      }
    }
  `;

  const {
    data: { insert_notifications_one },
  } = await mutate({
    mutation: insertNotificationQuery,
    variables: {
      object: {
        target_user_id,
        event_type,
        follow_resource_type,
        notification_resource_type,
        company_id,
        vc_firm_id,
        message,
        action_ids,
      },
    },
  });
  return insert_notifications_one;
};

const getMessageContents = (actionType: ActionType, notificationResourceType: ResourceTypes) => {
  if (actionType === 'Change Data') {
    if (notificationResourceType === 'team_members') {
      return "changed new team information";
    } else if (notificationResourceType === "investments") {
      return "changed new investments data"
    } else if (notificationResourceType === "investment_rounds") {
      return "changed a new investment round"
    } else if (notificationResourceType === "investors") {
      return "changed new team information";
    }
    return "changed new key info"
  } else {
    if (notificationResourceType === 'team_members') {
      return "added new team information";
    } else if (notificationResourceType === "investments") {
      return "added new investments data"
    } else if (notificationResourceType === "investment_rounds") {
      return "added a new investment round"
    } else if (notificationResourceType === "investors") {
      return "added new team information";
    }
    return "added new key info"
  }
}

export const processNotification = async (
  followResourceId: number,
  followedResourceType: 'companies' | 'vc_firms',
  notificationResourceType: ResourceTypes,
  actionType: ActionType,
  actionIds: number[]
) => {
  if (followResourceId && followedResourceType && actionType) {
    const follows: Array<Follows>  = await getFollowsByResource(followResourceId, followedResourceType);
    let targetUsers: any = follows.map((item: Follows) => item.list?.list_members);
    targetUsers = unionBy(flatten(targetUsers), "user_id");
    await Promise.all(
      targetUsers.map(async (targetUser: any) =>
        insertNotification({
          target_user_id: targetUser?.user_id,
          event_type: actionType,
          follow_resource_type: followedResourceType,
          notification_resource_type: notificationResourceType,
          message: getMessageContents(actionType, notificationResourceType),
          company_id: followedResourceType === "companies" ? followResourceId : null,
          vc_firm_id: followedResourceType === "vc_firms" ? followResourceId : null,
          action_ids: actionIds,
        })
      )
    );
  };
};
