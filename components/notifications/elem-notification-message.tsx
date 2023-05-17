import React, { FC } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { GetNotificationsForUserQuery } from "@/graphql/types";
import { getNotificationOrganizationLink } from "@/utils/notifications";

type Props = {
  notification: GetNotificationsForUserQuery["notifications"][0];
  message: string | null;
};

const ElemNotificationMessage: FC<Props> = ({ notification, message }) => {
  const { company, vc_firm } = notification;

  const organization = company || vc_firm;

  if (
    notification.notification_resource_type === "companies" ||
    notification.notification_resource_type === "vc_firms"
  ) {
    return (
      <div>
        <Link href={getNotificationOrganizationLink(notification)} passHref>
          <a className="border-b border-primary-500 transition-all font-bold hover:border-b-2 hover:text-primary-500">
            {organization?.name}
          </a>
        </Link>
        <span>{` ${message}`}</span>
      </div>
    );
  }

  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          return (
            <Link href={href as string} passHref>
              <a className="border-b border-primary-500 transition-all font-bold hover:border-b-2 hover:text-primary-500">
                {children[0]}
              </a>
            </Link>
          );
        },
      }}
    >
      {`[${organization?.name}](${getNotificationOrganizationLink(
        notification
      )}) ${notification.message || ""}`}
    </ReactMarkdown>
  );
};

export default ElemNotificationMessage;
