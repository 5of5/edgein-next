import React, { FC } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { GetNotificationsForUserQuery } from '@/graphql/types';
import { getNotificationOrganizationLink } from '@/utils/notifications';
import { raise } from '@/utils';

type Props = {
  notification: GetNotificationsForUserQuery['notifications'][0];
  message: string | null;
};

const ElemNotificationMessage: FC<Props> = ({ notification, message }) => {
  const { company, vc_firm } = notification;

  const name =
    company?.name ??
    vc_firm?.name ??
    raise('Organization name must be defined.');

  if (
    notification.notification_resource_type === 'companies' ||
    notification.notification_resource_type === 'vc_firms'
  ) {
    return (
      <div className="inline">
        <Link href={getNotificationOrganizationLink(notification)} passHref>
          <a className="underline hover:no-underline font-medium">{name}</a>
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
              <a className="underline hover:no-underline font-medium">
                {children[0]}
              </a>
            </Link>
          );
        },
      }}
    >
      {`[${name}](${getNotificationOrganizationLink(notification)}) ${
        notification.message || ''
      }`}
    </ReactMarkdown>
  );
};

export default ElemNotificationMessage;
