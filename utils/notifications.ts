import { mutate } from "@/graphql/hasuraAdmin";
import { Follows } from "@/graphql/types";
import { flatten, unionBy } from "lodash";
import { getFollowsByResource } from "./lists";
import { ActionType } from "./submitData";

type NotificationParamType = {
  target_user_id: number,
  event_type: ActionType,
  resource_type: string,
  message: string,
  company_id?: number | null,
  vc_firm_id?: number | null,
}

export const insertNotification = async ({
  target_user_id,
  event_type,
  resource_type,
  message,
  company_id,
  vc_firm_id,
}: NotificationParamType) => {
  const insertNotificationQuery = `
    mutation InsertNotifications($object: notifications_insert_input!) {
      insert_notifications_one(
        object: $object
      ) {
        id
        target_user_id
        event_type
        resource_type
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
        resource_type,
        company_id,
        vc_firm_id,
        message,
      },
    },
  });
  return insert_notifications_one;
};

export const processNotification = async (
  resourceId: number,
  resourceType: string,
  actionType: ActionType
) => {
  if (resourceId && resourceType && actionType) {
    const follows: Array<Follows>  = await getFollowsByResource(resourceId, resourceType);
    let targetUsers: any = follows.map((item: Follows) => item.list?.list_members);
    targetUsers = unionBy(flatten(targetUsers), "user_id");
    await Promise.all(
      targetUsers.map(async (targetUser: any) =>
        insertNotification({
          target_user_id: targetUser?.user_id,
          event_type: actionType,
          resource_type: resourceType,
           /** TO DO: content of message */
          message: `${resourceType} ${resourceId} changed`,
          company_id: resourceType === "companies" ? resourceId : null,
          vc_firm_id: resourceType === "vc_firms" ? resourceId : null,
        })
      )
    );
  };
};
