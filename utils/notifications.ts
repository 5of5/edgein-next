import { mutate, query } from '@/graphql/hasuraAdmin';
import {
  GetCompanyByIdDocument,
  GetCompanyByIdQuery,
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
  GetVcFirmByIdDocument,
  GetVcFirmByIdQuery,
  InsertNotificationActionsDocument,
  InsertNotificationActionsMutation,
  InsertNotificationsDocument,
  InsertNotificationsMutation,
} from '@/graphql/types';
import { flatten, startCase, unionBy } from 'lodash';
import { getFollowsByResource } from './lists';
import { ActionType, ResourceTypes } from '@/utils/constants';

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

type GetMessageParamType = {
  actionType: ActionType;
  resourceType: ResourceTypes;
  companyId?: number;
  vcFirmId?: number;
  investmentRound?: GetInvestmentRoundByIdQuery['investment_rounds'][0];
  teamMember?: GetTeamMemberByIdQuery['team_members'][0];
  investor?: GetInvestorByIdQuery['investors'][0];
  eventOrganization?: GetEventOrganizationByIdQuery['event_organization'][0];
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
  followedResourceType: 'companies' | 'vc_firms',
  notificationResourceType: ResourceTypes,
  actionType: ActionType,
  actionIds: number[],
  message: string,
  notificationResourceId?: number,
) => {
  if (followResourceId && followedResourceType && actionType) {
    // Check if company or vc_firm status is draft
    const isDraftResource = await isDraftOrganization(
      followResourceId,
      followedResourceType,
    );

    if (isDraftResource) {
      return;
    }

    const follows = await getFollowsByResource(
      followResourceId,
      followedResourceType,
    );
    let targetUsers: any = follows.map(item => item.list?.list_members);
    targetUsers = unionBy(flatten(targetUsers), 'user_id');
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
              followedResourceType === 'companies' ? followResourceId : null,
            vc_firm_id:
              followedResourceType === 'vc_firms' ? followResourceId : null,
            action_ids: actionIds,
            notification_resource_id: notificationResourceId,
          });
          await Promise.all(
            actionIds.map(async actionId => {
              if (notificationResponse?.id) {
                await insertNotificationAction(
                  notificationResponse?.id,
                  actionId,
                );
              }
            }),
          );
        }
      }),
    );
  }
};

export const getNotificationChangedData = (
  notification: GetNotificationsForUserQuery['notifications'][0],
) => {
  if (
    notification.event_type === 'Change Data' &&
    ['companies', 'vc_firms'].includes(notification.notification_resource_type)
  ) {
    if (notification.notification_actions.length > 1) {
      return {
        message: `has been updated`,
        extensions: notification.notification_actions.map(item => ({
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

      if (field === 'location_json') {
        field = 'location';
      } else if (field === 'investor_amount') {
        field = 'total funding raised';
      } else if (
        field === 'glassdoor' ||
        field === 'twitter' ||
        field === 'facebook' ||
        field === 'discord' ||
        field === 'instagram'
      ) {
        field = startCase(field);
      } else if (field === 'company_linkedin') {
        field = 'LinkedIn';
      } else if (field === 'youtube') {
        field = 'YouTube';
      } else if (field === 'investment_rounds') {
        field = 'something';
      } else if (field === 'velocity_linkedin' || field === 'velocity_token') {
        field = 'velocity';
      }
      return {
        message: `updated ${field.replace(/_/g, ' ')}`, // ${startCase(field)} to ${value}`,
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
  actionId: number,
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
  notifications: GetNotificationsForUserQuery['notifications'],
  excludeProperties: string[],
) => {
  const results = notifications?.filter(
    item =>
      item.notification_actions.length > 1 ||
      (item.notification_actions.length === 1 &&
        !excludeProperties.includes(
          Object.keys(
            item.notification_actions[0]?.action?.properties || {},
          )[0],
        )),
  );

  results.forEach(item => {
    if (item.notification_actions.length > 1) {
      item.notification_actions = item.notification_actions.filter(
        element =>
          !excludeProperties.includes(
            Object.keys(element.action?.properties || {})[0],
          ),
      );
    }
  });

  return results;
};

export const getNotificationOrganizationLink = (
  notification: GetNotificationsForUserQuery['notifications'][0],
) =>
  notification.company?.slug
    ? `/${notification.follow_resource_type}/${notification.company?.slug}`
    : `/investors/${notification.vc_firm?.slug}`;

/** Remember to run test when update getMessage function */
export const getMessage = ({
  actionType,
  resourceType,
  companyId,
  investmentRound,
  teamMember,
  investor,
  eventOrganization,
}: GetMessageParamType) => {
  const organizationType = eventOrganization?.type;

  if (actionType === 'Insert Data') {
    if (resourceType === 'investment_rounds') {
      return `added ${
        investmentRound?.round != null ? `**${investmentRound?.round}**` : ''
      } funding round`;
    }
    if (resourceType === 'team_members') {
      return `added [${teamMember?.person?.name}](/people/${teamMember?.person?.slug}/) to the team`;
    }
    if (resourceType === 'investors') {
      return `added [${investor?.person?.name}](/people/${investor?.person?.slug}/) to the team`;
    }
    if (resourceType === 'investments') {
      return companyId
        ? 'raised new capital'
        : 'invested in a new portfolio company';
    }
    if (resourceType === 'event_organization') {
      return `was added as ${
        organizationType === 'organizer' ? 'an' : 'a'
      } **${organizationType}** of [${
        eventOrganization?.event?.name
      }](/events/${eventOrganization?.event?.slug}/)`;
    }
  }

  if (actionType === 'Change Data') {
    if (resourceType === 'investment_rounds') {
      return `updated ${
        investmentRound?.round != null
          ? `its **${investmentRound?.round}**`
          : ''
      } funding round`;
    }
    if (resourceType === 'team_members') {
      return `updated [${teamMember?.person?.name}](/people/${teamMember?.person?.slug}/)'s role on the team`;
    }
    if (resourceType === 'investors') {
      return `updated [${investor?.person?.name}](/people/${investor?.person?.slug}/)'s role on the team`;
    }
    if (resourceType === 'investments') {
      return companyId
        ? 'updated investment information to its profile'
        : 'updated investment information on their portfolio';
    }
    if (resourceType === 'event_organization') {
      return `was updated to **${organizationType}** of [${eventOrganization?.event?.name}](/events/${eventOrganization?.event?.slug}/)`;
    }
  }

  return 'has been updated';
};

export const processNotificationOnSubmitData = async (
  resourceType: ResourceTypes,
  resourceObj: Record<string, any>,
  actionType: ActionType,
  actionIds: number[],
  notificationResourceId: number,
) => {
  if (
    actionType === 'Change Data' &&
    (resourceType === 'companies' || resourceType === 'vc_firms')
  ) {
    const message = getMessage({ actionType, resourceType });
    await processNotification(
      notificationResourceId,
      resourceType,
      resourceType,
      actionType,
      actionIds,
      message,
    );
  }

  if (resourceType === 'investment_rounds') {
    const investmentRound = await getInvestmentRoundById(
      notificationResourceId,
    );
    if (investmentRound.status === 'published') {
      let companyId = resourceObj?.company_id;
      if (actionType === 'Change Data') {
        companyId = investmentRound.company_id;
      }
      const message = getMessage({ actionType, resourceType, investmentRound });
      await processNotification(
        companyId,
        'companies',
        resourceType,
        actionType,
        actionIds,
        message,
        notificationResourceId,
      );
    }
  }

  if (resourceType === 'team_members') {
    const teamMember = await getTeamMemberById(notificationResourceId);
    if (teamMember.person?.status === 'published') {
      let companyId = resourceObj?.company_id;
      if (actionType === 'Change Data') {
        companyId = teamMember.company_id;
      }
      const message = getMessage({ actionType, resourceType, teamMember });
      await processNotification(
        companyId,
        'companies',
        resourceType,
        actionType,
        actionIds,
        message,
        notificationResourceId,
      );
    }
  }

  if (resourceType === 'investors') {
    const investor = await getInvestorById(notificationResourceId);
    if (investor.person?.status === 'published') {
      let vcFirmId = resourceObj?.vc_firm_id;
      if (actionType === 'Change Data') {
        vcFirmId = investor.vc_firm_id;
      }
      const message = getMessage({ actionType, resourceType, investor });
      await processNotification(
        vcFirmId,
        'vc_firms',
        resourceType,
        actionType,
        actionIds,
        message,
        notificationResourceId,
      );
    }
  }

  if (resourceType === 'investments') {
    let vcFirmId = resourceObj?.vc_firm_id;
    let roundId = resourceObj?.round_id;
    let isInvestmentPublished = false;
    if (actionType === 'Change Data') {
      const investment = await getInvestmentById(notificationResourceId);
      isInvestmentPublished = investment.status === 'published';
      vcFirmId = investment.vc_firm_id;
      roundId = investment.round_id;
    }

    if (roundId) {
      const investmentRound = await getInvestmentRoundById(roundId);
      if (isInvestmentPublished && investmentRound.status === 'published') {
        const message = getMessage({
          actionType,
          resourceType,
          companyId: investmentRound?.company_id || 0,
        });
        await processNotification(
          investmentRound?.company_id || 0,
          'companies',
          resourceType,
          actionType,
          actionIds,
          message,
          notificationResourceId,
        );
      }
    }

    if (isInvestmentPublished) {
      const message = getMessage({ actionType, resourceType });
      await processNotification(
        vcFirmId,
        'vc_firms',
        resourceType,
        actionType,
        actionIds,
        message,
        notificationResourceId,
      );
    }
  }

  if (resourceType === 'event_organization') {
    const eventOrganization = await getEventOrganizationById(
      notificationResourceId,
    );

    if (eventOrganization.event?.status === 'published') {
      let companyId = resourceObj?.company_id;
      let vcFirmId = resourceObj?.vc_firm_id;

      if (actionType === 'Change Data') {
        companyId = eventOrganization.company_id;
        vcFirmId = eventOrganization.vc_firm_id;
      }

      const message = getMessage({
        actionType,
        resourceType,
        eventOrganization,
      });
      if (companyId) {
        await processNotification(
          companyId,
          'companies',
          resourceType,
          actionType,
          actionIds,
          message,
          notificationResourceId,
        );
      }
      if (vcFirmId) {
        await processNotification(
          vcFirmId,
          'vc_firms',
          resourceType,
          actionType,
          actionIds,
          message,
          notificationResourceId,
        );
      }
    }
  }
};

const isDraftOrganization = async (
  followResourceId: number,
  followedResourceType: 'companies' | 'vc_firms',
) => {
  let isDraftOrganization = false;
  if (followedResourceType === 'companies') {
    const company = await getCompanyById(followResourceId);
    isDraftOrganization = company?.status === 'draft';
  } else {
    const vcFirm = await getVcFirmById(followResourceId);
    isDraftOrganization = vcFirm?.status === 'draft';
  }

  return isDraftOrganization;
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

const getCompanyById = async (id: number) => {
  const {
    data: { companies },
  } = await query<GetCompanyByIdQuery>({
    query: GetCompanyByIdDocument,
    variables: { id },
  });
  return companies[0];
};

const getVcFirmById = async (id: number) => {
  const {
    data: { vc_firms },
  } = await query<GetVcFirmByIdQuery>({
    query: GetVcFirmByIdDocument,
    variables: { id },
  });
  return vc_firms[0];
};
