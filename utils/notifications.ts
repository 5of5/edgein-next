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
	resource_team_member_id?: number | null;
	resource_investment_round_id?: number | null;
	resource_investor_id?: number | null;
	resource_event_organization_id?: number | null;
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
	resource_team_member_id,
	resource_investment_round_id,
	resource_investor_id,
	resource_event_organization_id,
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
				resource_team_member_id,
				resource_investment_round_id,
				resource_investor_id,
				resource_event_organization_id,
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
			return "added new investment";
		} else if (notificationResourceType === "investment_rounds") {
			return "added new investment round";
		} else if (notificationResourceType === "investors") {
			return "added new team members";
		} else if (notificationResourceType === "event_organization") {
			return "was added to event";
		}
		return "added new key info";
	} else {
		if (notificationResourceType === "team_members") {
			return "deleted team info";
		} else if (notificationResourceType === "investments") {
			return "deleted investments data";
		} else if (notificationResourceType === "investment_rounds") {
			return "deleted investment round";
		} else if (notificationResourceType === "investors") {
			return "deleted team info";
		} else if (notificationResourceType === "companies") {
			return "deleted a company";
		} else if (notificationResourceType === "vc_firms") {
			return "deleted an investor";
		} else if (notificationResourceType === "event_organization") {
			return "deleted event";
		}
		return "deleted a key info";
	}
};

export const processNotification = async (
	followResourceId: number,
	followedResourceType: "companies" | "vc_firms",
	notificationResourceType: ResourceTypes,
	actionType: ActionType,
	actionIds: number[],
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
						message: getMessageContents(actionType, notificationResourceType),
						company_id:
							followedResourceType === "companies" ? followResourceId : null,
						vc_firm_id:
							followedResourceType === "vc_firms" ? followResourceId : null,
						action_ids: actionIds,
						resource_team_member_id:
              notificationResourceType === "team_members"
                ? notificationResourceId
                : null,
            resource_investment_round_id:
              notificationResourceType === "investment_rounds"
                ? notificationResourceId
                : null,
            resource_investor_id:
              notificationResourceType === "investors"
                ? notificationResourceId
                : null,
						resource_event_organization_id:
							notificationResourceType === "event_organization"
                ? notificationResourceId
                : null,
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
  notificationResourceId?: number
) => {
  if (
    actionType === "Change Data" &&
    (resourceType === "companies" || resourceType === "vc_firms")
  ) {
    await processNotification(
      notificationResourceId || 0,
      resourceType,
      resourceType,
      actionType,
      actionIds
    );
  }

  if (resourceType === "investment_rounds") {
    let companyId = resourceObj?.company_id;
    if (actionType === "Change Data") {
      const investmentRound = await getCompanyIdByInvestmentRoundId(
        notificationResourceId || 0
      );
      companyId = investmentRound.company_id;
    }
    await processNotification(
      companyId,
      "companies",
      resourceType,
      actionType,
      actionIds,
      notificationResourceId
    );
  }

  if (resourceType === "team_members") {
    let companyId = resourceObj?.company_id;
    if (actionType === "Change Data") {
      const teamMember = await getCompanyIdByTeamMemberId(
        notificationResourceId || 0
      );
      companyId = teamMember.company_id;
    }
    await processNotification(
      companyId,
      "companies",
      resourceType,
      actionType,
      actionIds,
      notificationResourceId
    );
  }

  if (resourceType === "investors") {
    let vcFirmId = resourceObj?.vc_firm_id;
    if (actionType === "Change Data") {
      const investor = await getVcFirmByInvestorId(notificationResourceId || 0);
      vcFirmId = investor.vc_firm_id;
    }
    await processNotification(
      vcFirmId,
      "vc_firms",
      resourceType,
      actionType,
      actionIds,
      notificationResourceId
    );
  }

  if (resourceType === "investments") {
    let vcFirmId = resourceObj?.vc_firm_id;
    let roundId = resourceObj?.round_id;
    if (actionType === "Change Data") {
      const investment = await getVcFirmIdByInvestmentId(
        notificationResourceId || 0
      );
      vcFirmId = investment.vc_firm_id;
      roundId = investment.round_id;
    }

    if (roundId) {
      const investmentRound = await getCompanyByRoundId(roundId);
      await processNotification(
        investmentRound?.company_id || 0,
        "companies",
        resourceType,
        actionType,
        actionIds,
        notificationResourceId
      );
    }

    await processNotification(
      vcFirmId,
      "vc_firms",
      resourceType,
      actionType,
      actionIds,
      notificationResourceId
    );
  }

  if (resourceType === "event_organization") {
    let companyId = resourceObj?.company_id;
    let vcFirmId = resourceObj?.vc_firm_id;
    if (actionType === "Change Data") {
      const eventOrganization = await getEventOrganizationById(
        notificationResourceId || 0
      );
      companyId = eventOrganization.company_id;
      vcFirmId = eventOrganization.vc_firm_id;
    }

    if (companyId) {
      await processNotification(
        companyId,
        "companies",
        resourceType,
        actionType,
        actionIds,
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
        notificationResourceId
      );
    }
  }
};

const getVcFirmByInvestorId = async (investor_id: number) => {
  const {
    data: { investors },
  } = await query<GetInvestorByIdQuery>({
    query: GetInvestorByIdDocument,
    variables: { id: investor_id },
  });
  return investors[0];
};

const getCompanyIdByInvestmentRoundId = async (investment_round_id: number) => {
  const {
    data: { investment_rounds },
  } = await query<GetInvestmentRoundByIdQuery>({
    query: GetInvestmentRoundByIdDocument,
    variables: { id: investment_round_id },
  });
  return investment_rounds[0];
};

const getCompanyIdByTeamMemberId = async (team_member_id: number) => {
  const {
    data: { team_members },
  } = await query<GetTeamMemberByIdQuery>({
    query: GetTeamMemberByIdDocument,
    variables: { id: team_member_id },
  });
  return team_members[0];
};

const getVcFirmIdByInvestmentId = async (investment_id: number) => {
  const {
    data: { investments },
  } = await query<GetInvestmentByIdQuery>({
    query: GetInvestmentByIdDocument,
    variables: { id: investment_id },
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