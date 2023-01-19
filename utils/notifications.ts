import { mutate } from "@/graphql/hasuraAdmin";
import { flatten, unionBy } from "lodash";
import { getListsByFollowResource, getUserByListId } from "./lists";
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
    const lists = await getListsByFollowResource(resourceId, resourceType);
    let targetUsers = await Promise.all(
      lists.map(async (listItem: any) => getUserByListId(listItem?.list_id))
    );
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
