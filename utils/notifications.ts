import { mutate } from "@/graphql/hasuraAdmin";

export const insertNotification = async (
  target_user_id: number,
  event_type: string,
  resource_id: number,
  resource_type: string
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
      },
    },
  });
  return insert_notifications_one;
};
