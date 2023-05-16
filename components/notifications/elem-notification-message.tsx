import React, { FC } from "react";
import Link from "next/link";
import { GetNotificationsForUserQuery } from "@/graphql/types";

type Props = {
  notification: GetNotificationsForUserQuery["notifications"][0];
  message: string | null;
};

const ElemNotificationMessage: FC<Props> = ({ notification, message }) => {
  const {
    company,
    event_type,
    notification_resource_type,
    notification_actions,
    resource_team_member,
    resource_investment_round,
    resource_investor,
    resource_event_organization,
  } = notification;

  if (event_type === "Insert Data") {
    if (notification_resource_type === "team_members") {
      return (
        <>
          <span>{`added `}</span>
          <Link href={`/people/${resource_team_member?.person?.slug}`} passHref>
            <a className="border-b border-primary-500 transition-all font-bold mr-1 hover:border-b-2 hover:text-primary-500">
              {resource_team_member?.person?.name}
            </a>
          </Link>
          <span>{`to the team.`}</span>
        </>
      );
    }

    if (notification_resource_type === "investments") {
      return company ? (
        <span>raised new capital.</span>
      ) : (
        <span>invested in a new portfolio company.</span>
      );
    }

    if (notification_resource_type === "investment_rounds") {
      return company ? (
        <>
          <span>{`added `}</span>
          <span className="font-semibold">
            {resource_investment_round?.round}
          </span>
          <span>{` funding round.`}</span>
        </>
      ) : (
        <>
          <span>{`added `}</span>
          <span className="font-semibold">
            {resource_investment_round?.round}
          </span>
          <span>{` investment round in `}</span>
          <Link
            href={`/companies/${resource_investment_round?.company?.slug}`}
            passHref
          >
            <a className="border-b border-primary-500 transition-all font-bold mr-1 hover:border-b-2 hover:text-primary-500">
              {resource_investment_round?.company?.name}
            </a>
          </Link>
        </>
      );
    }

    if (notification_resource_type === "investors") {
      return (
        <>
          <span>{`added `}</span>
          <Link href={`/people/${resource_investor?.person?.slug}`} passHref>
            <a className="border-b border-primary-500 transition-all font-bold mr-1 hover:border-b-2 hover:text-primary-500">
              {resource_investor?.person?.name}
            </a>
          </Link>
          <span>{`to the team.`}</span>
        </>
      );
    }

    if (notification_resource_type === "event_organization") {
      const organizationTypeAction = notification_actions.find(
        (item) => item.action?.properties.type
      );
      const organizationType =
        organizationTypeAction?.action?.properties.type || "";
      return (
        <>
          <span>{`was added as ${
            organizationType === "organizer" ? "an" : "a"
          } `}</span>
          <span className="font-semibold italic">{organizationType}</span>
          <span>{` of `}</span>
          <Link
            href={`/events/${resource_event_organization?.event?.slug}`}
            passHref
          >
            <a className="border-b border-primary-500 transition-all font-bold mr-1 hover:border-b-2 hover:text-primary-500">
              {resource_event_organization?.event?.name}
            </a>
          </Link>
        </>
      );
    }
  }

  if (event_type === "Change Data") {
    if (notification_resource_type === "team_members") {
      return (
        <>
          <span>{`updated `}</span>
          <Link href={`/people/${resource_team_member?.person?.slug}`} passHref>
            <a className="border-b border-primary-500 transition-all font-bold hover:border-b-2 hover:text-primary-500">
              {resource_team_member?.person?.name}
            </a>
          </Link>
          <span>{`'s role on the team.`}</span>
        </>
      );
    }

    if (notification_resource_type === "investments") {
      return company ? (
        <span>updated investment information to its profile.</span>
      ) : (
        <span>updated investment information on their portfolio.</span>
      );
    }

    if (notification_resource_type === "investment_rounds") {
      return company ? (
        <>
          <span>{`updated its `}</span>
          <span className="font-semibold">
            {resource_investment_round?.round}
          </span>
          <span>{` funding round.`}</span>
        </>
      ) : (
        <>
          <span>{`updated `}</span>
          <span className="font-semibold">
            {resource_investment_round?.round}
          </span>
          <span>{` investment round in `}</span>
          <Link
            href={`/companies/${resource_investment_round?.company?.slug}`}
            passHref
          >
            <a className="border-b border-primary-500 transition-all font-bold mr-1 hover:border-b-2 hover:text-primary-500">
              {resource_investment_round?.company?.name}
            </a>
          </Link>
        </>
      );
    }

    if (notification_resource_type === "investors") {
      return (
        <>
          <span>{`updated `}</span>
          <Link href={`/people/${resource_investor?.person?.slug}`} passHref>
            <a className="border-b border-primary-500 transition-all font-bold hover:border-b-2 hover:text-primary-500">
              {resource_investor?.person?.name}
            </a>
          </Link>
          <span>{`'s role on the team.`}</span>
        </>
      );
    }

    if (notification_resource_type === "event_organization") {
      const organizationTypeAction = notification_actions.find(
        (item) => item.action?.properties.type
      );
      const organizationType =
        organizationTypeAction?.action?.properties.type || "";
      return (
        <>
          <span>{`was updated to `}</span>
          <span className="font-semibold italic">{organizationType}</span>
          <span>{` of `}</span>
          <Link
            href={`/events/${resource_event_organization?.event?.slug}`}
            passHref
          >
            <a className="border-b border-primary-500 transition-all font-bold mr-1 hover:border-b-2 hover:text-primary-500">
              {resource_event_organization?.event?.name}
            </a>
          </Link>
        </>
      );
    }
  }

  return <span>{message || notification.message}</span>;
};

export default ElemNotificationMessage;
