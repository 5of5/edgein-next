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
        notification.read
          ? 'bg-transparent opacity-60'
          : 'bg-gray-50 lg:bg-transparent'
      }`}
    >
      <div className="flex items-center space-x-2 sm:pr-20">
        <ElemPhoto
          photo={organization?.logo}
          wrapClass="flex items-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200"
          imgClass="object-fit max-w-full max-h-full"
          imgAlt="Company Name"
          placeholderClass="text-slate-300"
        />
        <div>
          <div className="inline text-sm leading-tight text-left lg:text-base">
            <div className="">
              <ElemNotificationMessage
                message={message}
                notification={notification}
              />
            </div>
            {extensions.length > 0 && (
              <>
                {' | '}
                <span className="leading-tight text-primary-500 hover:border-b hover:border-primary-500">
                  Details
                </span>
                <IconChevronDownMini className="inline h-5 aspect-square text-primary-500" />
              </>
            )}
          </div>

          <div className="text-left">
            <span
              className={`text-sm  ${
                notification.read ? '' : 'font-medium text-primary-500'
              }`}
            >
              {notificationFromNow}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center space-x-4">
        <div
          className={`w-3 h-3 rounded-full bg-gradient-to-r shrink-0 ${
            notification.read
              ? 'bg-transparent'
              : 'from-blue-800 via-primary-500 to-primary-400 '
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ElemNotificationItem;
