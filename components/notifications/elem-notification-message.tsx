import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { GetNotificationsForUserQuery } from '@/graphql/types';
import { getNotificationOrganizationLink } from '@/utils/notifications';
import { raise } from '@/utils';
import { ElemLink } from '../elem-link';

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
        <ElemLink
          href={getNotificationOrganizationLink(notification)}
          className="underline hover:no-underline font-medium"
        >
          {name}
        </ElemLink>
        <span>{` ${message}`}</span>
      </div>
    );
  }

  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          return (
            <ElemLink
              href={href as string}
              className="underline hover:no-underline font-medium"
            >
              {children[0]}
            </ElemLink>
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
