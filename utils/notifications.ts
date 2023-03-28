import { mutate } from "@/graphql/hasuraAdmin";
import { Follows, GetNotificationsForUserQuery } from "@/graphql/types";
import { flatten, startCase, unionBy } from "lodash";
import { getFollowsByResource } from "./lists";
import { getCompanyByRoundId } from "./submit-data";
import { ActionType, ResourceTypes } from "@/utils/constants";

type NotificationParamType = {
	target_user_id: number;
	event_type: ActionType;
	follow_resource_type: string;
	notification_resource_type: string;
	message: string;
	company_id?: number | null;
	vc_firm_id?: number | null;
	action_ids: number[];
};

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

const getMessageContents = (
	actionType: ActionType,
	notificationResourceType: ResourceTypes
) => {
	if (actionType === "Change Data") {
		if (notificationResourceType === "team_members") {
			return "updated team info";
		} else if (notificationResourceType === "investments") {
			return "updated investments data";
		} else if (notificationResourceType === "investment_rounds") {
			return "updated investment round";
		} else if (notificationResourceType === "investors") {
			return "updated team info";
		} else if (notificationResourceType === "event_organization") {
			return "updated event info";
		}
		return "updated key info";
	} else if (actionType === "Insert Data") {
		if (notificationResourceType === "team_members") {
			return "added new team members";
		} else if (notificationResourceType === "investments") {
			return "added new investments";
		} else if (notificationResourceType === "investment_rounds") {
			return "added new investment round";
		} else if (notificationResourceType === "investors") {
			return "added new team members";
		} else if (notificationResourceType === "event_organization") {
			return "added a new event";
		}
		return "added new key info";
	} else {
		if (notificationResourceType === "team_members") {
			return "deleted a team info";
		} else if (notificationResourceType === "investments") {
			return "deleted an investments data";
		} else if (notificationResourceType === "investment_rounds") {
			return "deleted an investment round";
		} else if (notificationResourceType === "investors") {
			return "deleted a team info";
		} else if (notificationResourceType === "companies") {
			return "deleted a company";
		} else if (notificationResourceType === "vc_firms") {
			return "deleted an investor";
		} else if (notificationResourceType === "event_organization") {
			return "deleted an event";
		}
		return "deleted a key info";
	}
};

export const processNotification = async (
	followResourceId: number,
	followedResourceType: "companies" | "vc_firms",
	notificationResourceType: ResourceTypes,
	actionType: ActionType,
	actionIds: number[]
) => {
	if (followResourceId && followedResourceType && actionType) {
		const follows: Array<Follows> = await getFollowsByResource(
			followResourceId,
			followedResourceType
		);
		let targetUsers: any = follows.map(
			(item: Follows) => item.list?.list_members
		);
		targetUsers = unionBy(flatten(targetUsers), "user_id");
		await Promise.all(
			targetUsers.map(async (targetUser: any) => {
				if (targetUser?.user_id) {
					const notificationResponse = await insertNotification({
						target_user_id: targetUser?.user_id,
						event_type: actionType,
						follow_resource_type: followedResourceType,
						notification_resource_type: notificationResourceType,
						message: getMessageContents(actionType, notificationResourceType),
						company_id:
							followedResourceType === "companies" ? followResourceId : null,
						vc_firm_id:
							followedResourceType === "vc_firms" ? followResourceId : null,
						action_ids: actionIds,
					});

					await Promise.all(
						actionIds.map(async (actionId) => {
							await insertNotificationAction(notificationResponse.id, actionId);
						})
					);
				}
			})
		);
	}
};

export const processNotificationOnDelete = async (
	resourceType: string,
	resourceId: number,
	actionId: number,
	resourceObj: any
) => {
	if (resourceType === "investment_rounds" || resourceType === "team_members") {
		await processNotification(
			resourceObj?.company_id,
			"companies",
			resourceType,
			"Delete Data",
			[actionId]
		);
	}

	if (resourceType === "investors") {
		await processNotification(
			resourceObj?.vc_firm_id,
			"vc_firms",
			resourceType,
			"Delete Data",
			[actionId]
		);
	}

	if (resourceType === "investments") {
		if (resourceObj?.round_id) {
			const investmentRound = await getCompanyByRoundId(resourceObj.round_id);
			await processNotification(
				investmentRound?.company_id,
				"companies",
				resourceType,
				"Delete Data",
				[actionId]
			);
		}

		await processNotification(
			resourceObj?.vc_firm_id,
			"vc_firms",
			resourceType,
			"Delete Data",
			[actionId]
		);
	}
	if (resourceType === "companies" || resourceType === "vc_firms") {
		/** Insert notification */
		await processNotification(
			resourceId,
			resourceType,
			resourceType,
			"Delete Data",
			[actionId]
		);
	}
};

export const getNotificationChangedData = (
	notification: GetNotificationsForUserQuery["notifications"][0]
) => {
	if (notification.event_type === "Change Data") {
		if (notification.notification_actions.length > 1) {
			return {
				message: `has been updated`,
				extensions: notification.notification_actions.map((item) => ({
					field: Object.keys(item?.action?.properties)[0],
					value: Object.values(item?.action?.properties)[0],
				})),
			};
		}

		const changedData =
			notification.notification_actions[0]?.action?.properties;

		if (changedData) {
			const field = Object.keys(changedData)[0];
			const value = Object.values(changedData)[0];
	
			return {
				message: `Updated ${startCase(field)}`, // to ${value}`,
				extensions: [],
			};
		}
	}

	return {
		message: notification.message,
		extensions: [],
	};
};

export const insertNotificationAction = async (
	notificationId: number,
	actionId: number
) => {
	const insertNotificationActionQuery = `
    mutation InsertNotificationAction($object: notification_actions_insert_input!) {
      insert_notification_actions_one(
        object: $object
      ) {
        id
      }
    }
  `;

	const {
		data: { insert_notification_actions_one },
	} = await mutate({
		mutation: insertNotificationActionQuery,
		variables: {
			object: {
				notification_id: notificationId,
				action_id: actionId,
			},
		},
	});
	return insert_notification_actions_one;
};
