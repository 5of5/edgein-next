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

  const { showNewMessages } = useIntercom();

  return (
    <Popover
      className="absolute right-1 group-hover:block transition-all sm:hidden sm:right-10"
      style={popoverStyle}>
      <Popover.Button className="inline-flex items-center text-sm rounded-full aspect-square p-1 transition ease-in-out duration-150 group bg-dark-100 ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
        <IconEllipsisHorizontal
          className="h-6 w-6 group-hover:text-primary-500"
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
        <Popover.Panel className="absolute right-0 overflow-hidden w-48 p-1 divide-y divide-slate-100 rounded-lg bg-dark-100 shadow-lg ring-1 ring-black/5">
          {({ close }) => (
            <>
              {!notification.read && (
                <button
                  onClick={() => {
                    onMarkAsRead(notification.id);
                    close();
                  }}
                  className="flex items-center space-x-1 w-full px-2 py-2 rounded-lg hover:bg-gray-50 hover:text-primary-500">
                  <IconCheck className="h-4 aspect-square group-hover:text-primary-500" />
                  <span className="text-sm">Mark as read</span>
                </button>
              )}
              <button
                onClick={() => {
                  showNewMessages(
                    `Hi EdgeIn, I'd like to report an error on ${organization?.name} notifications`,
                  );
                  close();
                }}
                className="flex items-center space-x-2 w-full px-2 py-2 hover:bg-gray-50 hover:text-primary-500">
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
