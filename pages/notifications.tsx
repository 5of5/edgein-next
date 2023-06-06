import React, { useMemo, useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useAuth } from '@/hooks/use-auth';
import { ElemButton } from '@/components/elem-button';
import { PlaceholderNotification } from '@/components/placeholders';
import Link from 'next/link';
import {
  IconCheck,
  IconEllipsisHorizontal,
  IconExclamationTriangle,
  IconChevronDownMini,
  IconBell,
} from '@/components/icons';
import { ElemPhoto } from '@/components/elem-photo';
import { Disclosure, Popover, Transition } from '@headlessui/react';
import moment from 'moment-timezone';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import {
  GetNotificationsForUserQuery,
  useGetNotificationsForUserQuery,
} from '@/graphql/types';
import { useIntercom } from 'react-use-intercom';
import {
  filterExcludeNotifications,
  getNotificationChangedData,
} from '@/utils/notifications';

const getLink = (
  notification: GetNotificationsForUserQuery['notifications'][0],
) =>
  notification.company
    ? `/${notification.follow_resource_type}/${notification.company?.slug}`
    : `/investors/${notification.vc_firm?.slug}`;

const Notifications: NextPage = () => {
  const { user } = useAuth();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const excludeProperties = useMemo(() => {
    return ['status_tags', 'logo'];
  }, []);

  const excludeResourceTypes = useMemo(() => {
    return ['event_organization', 'companies'];
  }, []);

  const { data, error, isLoading, refetch } = useGetNotificationsForUserQuery({
    user: user?.id || 0,
  });

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const notifications = filterExcludeNotifications(
    data?.notifications || [],
    excludeResourceTypes,
    excludeProperties,
  );

  const displayedNotifications = notifications?.slice(
    0,
    user?.entitlements.listsCount
      ? user?.entitlements.listsCount
      : notifications?.length,
  );

  const [notificationsLimit, setNotificationsLimit] = useState(5);
  const showMoreNotifications = () => {
    setNotificationsLimit(notificationsLimit + 10);
  };

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const markAsRead = async (id?: number, all?: boolean) => {
    await fetch('/api/mark-notification-read/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        all,
      }),
    });
    refetch();
  };

  const { showNewMessages } = useIntercom();

  return (
    <div className="max-w-3xl mx-auto sm:mt-7 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg ring-2 ring-white">
        <div className="flex items-center justify-between mb-2 pt-4 px-4">
          <h2 className="text-xl font-bold">Notifications</h2>
          <button
            className="flex items-center text-sm hover:text-primary-500"
            onClick={() => markAsRead(undefined, true)}
          >
            <IconCheck className="h-4 mr-1" />
            Mark all as read
          </button>
        </div>

        <div className="relative z-10 mx-2">
          {error ? (
            <h4>Error loading notifications</h4>
          ) : isLoading && !initialLoad ? (
            <>
              {Array.from({ length: 5 }, (_, i) => (
                <PlaceholderNotification key={i} />
              ))}
            </>
          ) : displayedNotifications.length === 0 ? (
            <div className="w-full p-12 text-center">
              <IconBell
                className="mx-auto h-12 w-12 text-slate-300"
                strokeWidth={2}
              />
              <h3 className="mt-2 text-lg font-bold">No notifications yet</h3>
              <p className="mt-1 text-slate-600">
                Get started by reacting to organizations or adding them to
                lists.
              </p>
            </div>
          ) : (
            displayedNotifications
              ?.slice(0, notificationsLimit)
              .map((notification, index) => {
                const organization = notification.company
                  ? notification.company
                  : notification.vc_firm;

                const notificationFromNow = moment(
                  notification.created_at,
                ).fromNow();

                const { message, extensions } =
                  getNotificationChangedData(notification);

                const enableExpand =
                  notification.event_type === 'Change Data' &&
                  notification.notification_actions.length > 1;

                const notificationPopover = (
                  <Popover
                    className="absolute right-1 group-hover:block transition-all sm:hidden sm:right-10"
                    style={{ zIndex: displayedNotifications.length - index }}
                  >
                    <Popover.Button className="inline-flex items-center text-sm rounded-full aspect-square p-1 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
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
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Popover.Panel className="absolute right-0 overflow-hidden w-48 p-1 divide-y divide-slate-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
                        {({ close }) => (
                          <>
                            <button
                              onClick={() => {
                                markAsRead(notification.id);
                                close();
                              }}
                              className="flex items-center space-x-1 w-full px-2 py-2 rounded-lg hover:bg-gray-50 hover:text-primary-500"
                            >
                              <IconCheck className="h-4 aspect-square group-hover:text-primary-500" />
                              <span className="text-sm">Mark as read</span>
                            </button>
                            <button
                              onClick={() => {
                                showNewMessages(
                                  `Hi EdgeIn, I'd like to report an error on ${organization?.name} notifications`,
                                );
                                close();
                              }}
                              className="flex items-center space-x-2 w-full px-2 py-2 hover:bg-gray-50 hover:text-primary-500"
                            >
                              <IconExclamationTriangle className="h-4 aspect-square group-hover:text-primary-500" />
                              <span className="text-sm">Report an error</span>
                            </button>
                          </>
                        )}
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                );

                const component = (
                  <div
                    onClick={() => markAsRead(notification.id)}
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
                          {enableExpand ? (
                            <Link href={getLink(notification)} passHref>
                              <a className="border-b border-primary-500 transition-all font-bold mr-1 hover:border-b-2 hover:text-primary-500">
                                {organization?.name}
                              </a>
                            </Link>
                          ) : (
                            <span className="border-b border-primary-500 transition-all font-bold mr-1 hover:border-b-2 hover:text-primary-500">
                              {organization?.name}
                            </span>
                          )}

                          {message}
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
                              notification.read
                                ? ''
                                : 'font-medium text-primary-500'
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

                if (enableExpand) {
                  return (
                    <Disclosure key={notification.id} as="div">
                      <div className="relative flex items-center group">
                        <Disclosure.Button
                          as="div"
                          className="w-full cursor-pointer"
                        >
                          {component}
                        </Disclosure.Button>
                        {notificationPopover}
                      </div>
                      {enableExpand && (
                        <Disclosure.Panel className="pl-16 lg:pl-18 pr-6 pt-2 pb-6">
                          <ul className="pl-1 list-disc list-inside space-y-2">
                            {extensions.map((item: any) => (
                              <li key={item.field} className="text-sm">
                                {`Updated `}
                                <Link href={getLink(notification)} passHref>
                                  <a className="font-bold hover:text-primary-500">
                                    {item.field === 'velocity_linkedin' ? (
                                      <>velocity</>
                                    ) : item.field === 'location_json' ? (
                                      <>location</>
                                    ) : (
                                      <>{item.field.replace('_', ' ')}</>
                                    )}
                                  </a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      )}
                    </Disclosure>
                  );
                } else {
                  return (
                    <div
                      className={`relative flex items-center group`}
                      key={notification.id}
                    >
                      <Link href={getLink(notification)} passHref>
                        <a className="block w-full">{component}</a>
                      </Link>
                      {notificationPopover}
                    </div>
                  );
                }
              })
          )}
        </div>

        {(notifications ? notifications.length : 0) >
        (displayedNotifications ? displayedNotifications.length : 0) ? (
          <div className="p-5">
            <ElemButton
              btn="ol-primary"
              onClick={onOpenUpgradeDialog}
              className="w-full"
            >
              Show more notifications
            </ElemButton>
          </div>
        ) : (
          notificationsLimit < (notifications ? notifications.length : 0) && (
            <div className="p-5">
              <ElemButton
                btn="ol-primary"
                onClick={showMoreNotifications}
                className="w-full"
              >
                Show more notifications
              </ElemButton>
            </div>
          )
        )}
      </div>

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      metaTitle: 'Notifications - EdgeIn.io',
    },
  };
};

export default Notifications;
