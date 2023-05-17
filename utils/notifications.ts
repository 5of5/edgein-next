import { mutate, query } from "@/graphql/hasuraAdmin";
import {
	GetEventOrganizationByIdDocument,
	GetEventOrganizationByIdQuery,
	GetInvestmentByIdDocument,
	GetInvestmentByIdQuery,
	GetInvestmentRoundByIdDocument,
	GetInvestmentRoundByIdQuery,
	GetInvestorByIdDocument,
	GetInvestorByIdQuery,
	GetNotificationsForUserQuery,
	GetTeamMemberByIdDocument,
	GetTeamMemberByIdQuery,
	InsertNotificationActionsDocument,
	InsertNotificationActionsMutation,
	InsertNotificationsDocument,
	InsertNotificationsMutation,
} from "@/graphql/types";
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
	notification_resource_id?: number | null;
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
	notification_resource_id,
}: NotificationParamType) => {
	const {
		data: { insert_notifications_one },
	} = await mutate<InsertNotificationsMutation>({
		mutation: InsertNotificationsDocument,
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
				notification_resource_id,
			},
		},
	});
	return insert_notifications_one;
};

export const processNotification = async (
	followResourceId: number,
	followedResourceType: "companies" | "vc_firms",
	notificationResourceType: ResourceTypes,
	actionType: ActionType,
	actionIds: number[],
	message: string,
	notificationResourceId?: number,
) => {
	if (followResourceId && followedResourceType && actionType) {
		const follows = await getFollowsByResource(
			followResourceId,
			followedResourceType
		);
		let targetUsers: any = follows.map((item) => item.list?.list_members);
		targetUsers = unionBy(flatten(targetUsers), "user_id");
		await Promise.all(
			targetUsers.map(async (targetUser: any) => {
				if (targetUser?.user_id) {
					const notificationResponse = await insertNotification({
						target_user_id: targetUser?.user_id,
						event_type: actionType,
						follow_resource_type: followedResourceType,
						notification_resource_type: notificationResourceType,
						message,
						company_id:
							followedResourceType === "companies" ? followResourceId : null,
						vc_firm_id:
							followedResourceType === "vc_firms" ? followResourceId : null,
						action_ids: actionIds,
						notification_resource_id: notificationResourceId,
          });
					await Promise.all(
						actionIds.map(async (actionId) => {
							if (notificationResponse?.id) {
								await insertNotificationAction(
									notificationResponse?.id,
									actionId
								);
							}
						})
					);
				}
			})
		);
	}
};

export const getNotificationChangedData = (
	notification: GetNotificationsForUserQuery["notifications"][0]
) => {
	if (
    notification.event_type === "Change Data" &&
    ["companies", "vc_firms"].includes(notification.notification_resource_type)
  ) {
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
			let field = Object.keys(changedData)[0];
			const value = Object.values(changedData)[0];

			if (field === "location_json") {
				field = "location";
			} else if (field === "investor_amount") {
				field = "total funding raised";
			} else if (
				field === "glassdoor" ||
				field === "twitter" ||
				field === "facebook" ||
				field === "discord" ||
				field === "instagram"
			) {
				field = startCase(field);
			} else if (field === "company_linkedin") {
				field = "LinkedIn";
			} else if (field === "youtube") {
				field = "YouTube";
			} else if (field === "investment_rounds") {
				field = "something";
			} else if (field === "velocity_linkedin" || field === "velocity_token") {
				field = "velocity";
			}
			return {
				message: `updated ${field.replace(/_/g, " ")}`, // ${startCase(field)} to ${value}`,
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
	const {
		data: { insert_notification_actions_one },
	} = await mutate<InsertNotificationActionsMutation>({
		mutation: InsertNotificationActionsDocument,
		variables: {
			object: {
				notification_id: notificationId,
				action_id: actionId,
			},
		},
	});
	return insert_notification_actions_one;
};

export const filterExcludeNotifications = (
	notifications: GetNotificationsForUserQuery["notifications"],
	excludeResourceTypes: string[],
	excludeProperties: string[]
) => {
	let results = notifications?.filter(
		(item) =>
			!excludeResourceTypes.includes(item.notification_resource_type) &&
			(item.notification_actions.length > 1 ||
				(item.notification_actions.length === 1 &&
					!excludeProperties.includes(
						Object.keys(
							item.notification_actions[0]?.action?.properties || {}
						)[0]
					)))
	);

	results.forEach((item) => {
		if (item.notification_actions.length > 1) {
			item.notification_actions = item.notification_actions.filter(
				(element) =>
					!excludeProperties.includes(
						Object.keys(element.action?.properties || {})[0]
					)
			);
		}
	});

	return results;
};

export const getNotificationOrganizationLink = (
  notification: GetNotificationsForUserQuery["notifications"][0]
) =>
  notification.company
    ? `/${notification.follow_resource_type}/${notification.company?.slug}`
    : `/investors/${notification.vc_firm?.slug}`;

export const processNotificationOnSubmitData = async (
  resourceType: ResourceTypes,
  resourceObj: Record<string, any>,
  actionType: ActionType,
  actionIds: number[],
  notificationResourceId: number
) => {
  if (
    actionType === "Change Data" &&
    (resourceType === "companies" || resourceType === "vc_firms")
  ) {
    const message = "has been updated";
    await processNotification(
      notificationResourceId,
      resourceType,
      resourceType,
      actionType,
      actionIds,
      message,
    );
  }

  if (resourceType === "investment_rounds") {
    let companyId = resourceObj?.company_id;
    const investmentRound = await getInvestmentRoundById(
      notificationResourceId
    );
    let message = `added **${investmentRound?.round}** funding round`;
    if (actionType === "Change Data") {
      companyId = investmentRound.company_id;
      message = `updated its **${investmentRound?.round}** funding round`;
    }
    await processNotification(
      companyId,
      "companies",
      resourceType,
      actionType,
      actionIds,
      message,
      notificationResourceId
    );
  }

  if (resourceType === "team_members") {
    let companyId = resourceObj?.company_id;
    const teamMember = await getTeamMemberById(notificationResourceId);
    let message = `added [${teamMember?.person?.name}](/people/${teamMember?.person?.slug}/) to the team`;
    if (actionType === "Change Data") {
      companyId = teamMember.company_id;
      message = `updated [${teamMember?.person?.name}](/people/${teamMember?.person?.slug}/)'s role on the team`;
    }
    await processNotification(
      companyId,
      "companies",
      resourceType,
      actionType,
      actionIds,
      message,
      notificationResourceId
    );
  }

  if (resourceType === "investors") {
    let vcFirmId = resourceObj?.vc_firm_id;
    const investor = await getInvestorById(notificationResourceId);
    let message = `added [${investor?.person?.name}](/people/${investor?.person?.slug}/) to the team`;
    if (actionType === "Change Data") {
      vcFirmId = investor.vc_firm_id;
      message = `updated [${investor?.person?.name}](/people/${investor?.person?.slug}/)'s role on the team`;
    }
    await processNotification(
      vcFirmId,
      "vc_firms",
      resourceType,
      actionType,
      actionIds,
      message,
      notificationResourceId
    );
  }

  if (resourceType === "investments") {
    let vcFirmId = resourceObj?.vc_firm_id;
    let roundId = resourceObj?.round_id;
    if (actionType === "Change Data") {
      const investment = await getInvestmentById(notificationResourceId);
      vcFirmId = investment.vc_firm_id;
      roundId = investment.round_id;
    }

    if (roundId) {
      const investmentRound = await getInvestmentRoundById(roundId);
      const message =
        actionType === "Insert Data"
          ? "raised new capital"
          : "updated investment information to its profile";
      await processNotification(
        investmentRound?.company_id || 0,
        "companies",
        resourceType,
        actionType,
        actionIds,
        message,
        notificationResourceId
      );
    }

    const message =
      actionType === "Insert Data"
        ? "invested in a new portfolio company"
        : "updated investment information on their portfolio";
    await processNotification(
      vcFirmId,
      "vc_firms",
      resourceType,
      actionType,
      actionIds,
      message,
      notificationResourceId
    );
  }

  if (resourceType === "event_organization") {
    let companyId = resourceObj?.company_id;
    let vcFirmId = resourceObj?.vc_firm_id;
    const eventOrganization = await getEventOrganizationById(
      notificationResourceId
    );
    const organizationType = eventOrganization?.type;
    let message = `was added as ${
      organizationType === "organizer" ? "an" : "a"
    } **${organizationType}** of [${eventOrganization?.event?.name}](/events/${
      eventOrganization?.event?.slug
    }/)`;
    if (actionType === "Change Data") {
      companyId = eventOrganization.company_id;
      vcFirmId = eventOrganization.vc_firm_id;
      message = `was updated to **${organizationType}** of [${eventOrganization?.event?.name}](/events/${eventOrganization?.event?.slug}/)`;
    }

    if (companyId) {
      await processNotification(
        companyId,
        "companies",
        resourceType,
        actionType,
        actionIds,
        message,
        notificationResourceId
      );
    }
    if (vcFirmId) {
      await processNotification(
        vcFirmId,
        "vc_firms",
        resourceType,
        actionType,
        actionIds,
        message,
        notificationResourceId
      );
    }
  }
};

const getInvestorById = async (id: number) => {
  const {
    data: { investors },
  } = await query<GetInvestorByIdQuery>({
    query: GetInvestorByIdDocument,
    variables: { id },
  });
  return investors[0];
};

const getInvestmentRoundById = async (id: number) => {
  const {
    data: { investment_rounds },
  } = await query<GetInvestmentRoundByIdQuery>({
    query: GetInvestmentRoundByIdDocument,
    variables: { id },
  });
  return investment_rounds[0];
};

const getTeamMemberById = async (id: number) => {
  const {
    data: { team_members },
  } = await query<GetTeamMemberByIdQuery>({
    query: GetTeamMemberByIdDocument,
    variables: { id },
  });
  return team_members[0];
};

const getInvestmentById = async (id: number) => {
  const {
    data: { investments },
  } = await query<GetInvestmentByIdQuery>({
    query: GetInvestmentByIdDocument,
    variables: { id },
  });
  return investments[0];
};

const getEventOrganizationById = async (id: number) => {
  const {
    data: { event_organization },
  } = await query<GetEventOrganizationByIdQuery>({
    query: GetEventOrganizationByIdDocument,
    variables: { id },
  });
  return event_organization[0];
};