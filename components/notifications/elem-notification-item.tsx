import React, { FC } from 'react';
import moment from 'moment-timezone';
import { GetNotificationsForUserQuery } from '@/graphql/types';
import { ElemPhoto } from '../elem-photo';
import ElemNotificationMessage from './elem-notification-message';
import { IconChevronDownMini } from '../icons';

type Props = {
  notification: GetNotificationsForUserQuery['notifications'][0];
  message: string | null;
  extensions: Record<string, any>[];
  onMarkAsRead: (id: number) => void;
};

const ElemNotificationItem: FC<Props> = ({
  notification,
  message,
  extensions,
  onMarkAsRead,
}) => {
  const { company, vc_firm } = notification;

  const organization = company || vc_firm;

  const notificationFromNow = moment(notification.created_at).fromNow();

  return (
    <div
      onClick={() => onMarkAsRead(notification.id)}
      className={`flex items-center justify-between px-2 sm:px-2 py-2 shrink-0 w-full overflow-hidden sm:rounded-md group-hover:bg-gray-50 ${
        notification.read ? 'bg-transparent' : 'bg-gray-50'
      }`}>
      <div className="flex items-center space-x-2 sm:pr-20">
        <ElemPhoto
          photo={organization?.logo}
          wrapClass="flex items-center shrink-0 w-12 h-12 bg-black border border-gray-200 rounded-lg overflow-hidden"
          imgClass="object-fit max-w-full max-h-full"
          imgAlt={organization?.name}
          placeholderClass="text-gray-300 p-1"
          placeholder="company"
        />
        <div className={notification.read ? 'opacity-60' : ''}>
          <div className="inline text-sm leading-tight text-left">
            <ElemNotificationMessage
              message={message}
              notification={notification}
            />
            {extensions.length > 0 && (
              <>
                {' | '}
                <span className="leading-tight text-primary-500 underline hover:no-underline">
                  Details
                </span>
                <IconChevronDownMini className="inline h-5 aspect-square text-primary-500" />
              </>
            )}
          </div>

          <div className="text-left">
            <span
              className={`text-xs  ${
                notification.read ? '' : 'font-medium text-primary-500'
              }`}>
              {notificationFromNow}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center space-x-4">
        <div
          className={`w-3 h-3 rounded-full shrink-0 ${
            notification.read ? 'bg-transparent' : 'bg-primary-500'
          }`}></div>
      </div>
    </div>
  );
};

export default ElemNotificationItem;
