import React, { CSSProperties, FC } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { useIntercom } from 'react-use-intercom';
import { GetNotificationsForUserQuery } from '@/graphql/types';
import {
  IconCheck,
  IconEllipsisHorizontal,
  IconExclamationTriangle,
} from '../icons';

type Props = {
  popoverStyle: CSSProperties;
  notification: GetNotificationsForUserQuery['notifications'][0];
  onMarkAsRead: (id: number) => void;
};

const ElemNotificationPopover: FC<Props> = ({
  popoverStyle,
  notification,
  onMarkAsRead,
}) => {
  const { company, vc_firm } = notification;

  const organization = company || vc_firm;

  const { showNewMessage } = useIntercom();

  return (
    <Popover
      className="absolute transition-all right-1 group-hover:block sm:hidden sm:right-10"
      style={popoverStyle}>
      <Popover.Button className="inline-flex items-center p-1 text-sm transition duration-150 ease-in-out bg-white rounded-full aspect-square group ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
        <IconEllipsisHorizontal
          className="w-6 h-6 group-hover:text-primary-500"
          title="Options"
        />
      </Popover.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0">
        <Popover.Panel className="absolute right-0 w-48 p-1 overflow-hidden bg-white divide-y rounded-lg shadow-lg divide-slate-100 ring-1 ring-black/5">
          {({ close }) => (
            <>
              {!notification.read && (
                <button
                  onClick={() => {
                    onMarkAsRead(notification.id);
                    close();
                  }}
                  className="flex items-center w-full px-2 py-2 space-x-1 rounded-lg hover:bg-gray-50 hover:text-primary-500">
                  <IconCheck className="h-4 aspect-square group-hover:text-primary-500" />
                  <span className="text-sm">Mark as read</span>
                </button>
              )}
              <button
                onClick={() => {
                  showNewMessage(
                    `Hi EdgeIn, I'd like to report an error on ${organization?.name} notifications`,
                  );
                  close();
                }}
                className="flex items-center w-full px-2 py-2 space-x-2 hover:bg-gray-50 hover:text-primary-500">
                <IconExclamationTriangle className="h-4 aspect-square group-hover:text-primary-500" />
                <span className="text-sm">Report an error</span>
              </button>
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ElemNotificationPopover;
