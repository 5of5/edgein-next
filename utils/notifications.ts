import { mutate } from "@/graphql/hasuraAdmin";
import { Follows } from "@/graphql/types";
import { flatten, unionBy } from "lodash";
import { getFollowsByResource } from "./lists";
import { ActionType } from "./submitData";

export const insertNotification = async (
  target_user_id: number,
  event_type: string,
  resource_id: number,
  resource_type: string,
  message: string,
) => {
  const insertNotificationQuery = `
    mutation InsertNotifications($object: notifications_insert_input!) {
      insert_notifications_one(
        object: $object
      ) {
        id
        target_user_id
        event_type
        resource_id
        resource_type
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
        resource_id,
        resource_type,
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
        insertNotification(
          targetUser?.user_id,
          actionType,
          resourceId,
          resourceType,
          /** TO DO: content of message */
          `${resourceType} ${resourceId} changed`
        )
      )
    );
  };
};
