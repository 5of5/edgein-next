import React, { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useUser } from '@/context/user-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ElemButton } from '@/components/elem-button';
import { PlaceholderNotification } from '@/components/placeholders';
import { IconCheck, IconBell } from '@/components/icons';
import { Disclosure } from '@headlessui/react';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import {
  GetNotificationsForUserQuery,
  useGetNotificationsForUserQuery,
  Notifications,
} from '@/graphql/types';
import {
  filterExcludeNotifications,
  getNotificationChangedData,
  getNotificationOrganizationLink,
} from '@/utils/notifications';
import ElemNotificationItem from '@/components/notifications/elem-notification-item';
import ElemNotificationPopover from '@/components/notifications/elem-notification-popover';
import { NOTIFICATION_EXCLUDE_PROPERTIES } from '@/utils/constants';
import { ElemLink } from '@/components/elem-link';
import { NextSeo } from 'next-seo';

const DEFAULT_LIMIT = 10;

const NotificationsPage: NextPage = () => {
  const { user, unreadNotificationsCount, refetchUnreadNotifications } =
    useUser();

  const [notificationList, setNotificationList] = useState<
    GetNotificationsForUserQuery['notifications']
  >([]);

  const [page, setPage] = useState<number>(0);

  const offset = DEFAULT_LIMIT * page;

  const { data, error, isFetching } = useGetNotificationsForUserQuery(
    {
      user: user?.id || 0,
      limit: DEFAULT_LIMIT,
      offset,
    },
    {
      enabled: !!user?.id,
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setNotificationList([...notificationList, ...data.notifications]);
      },
    },
  );

  let displayedNotifications = filterExcludeNotifications(
    notificationList as Notifications[],
    NOTIFICATION_EXCLUDE_PROPERTIES,
  );

  if (user?.entitlements?.listsCount) {
    displayedNotifications = displayedNotifications.slice(
      0,
      user.entitlements.listsCount,
    );
  }

  const totalNotifications =
    data?.notifications_aggregate?.aggregate?.count || 0;

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
    setNotificationList(prev =>
      prev.map((item: any) =>
        item.id === id || !id
          ? {
              ...item,
              read: true,
            }
          : item,
      ),
    );
    refetchUnreadNotifications();
  };

  const showMoreNotifications = () => {
    setPage(page + 1);
  };

  const handleClickShowMore = () => {
    if (
      user?.entitlements?.listsCount &&
      displayedNotifications.length >= user.entitlements.listsCount
    ) {
      onOpenUpgradeDialog();
    } else {
      showMoreNotifications();
    }
  };

  return (
    <>
      <NextSeo title={`Notifications`} />
      <DashboardLayout>
        <div className="max-w-3xl mx-auto sm:mt-7 sm:px-6 lg:px-8">
          <div className="border  border-neutral-700 rounded-lg ring-2 ring-white">
            <div className="flex items-center justify-between px-4 pt-4 mb-2">
              <h2 className="text-xl font-medium">Notifications</h2>
              {unreadNotificationsCount > 0 && (
                <button
                  className="flex items-center text-sm hover:text-primary-500"
                  onClick={() => markAsRead(undefined, true)}>
                  <IconCheck className="h-4 mr-1" />
                  Mark all as read
                </button>
              )}
            </div>

            <div className="relative z-10 flex flex-col  border-neutral-700 divide-y divide-gray-200 border-y">
              {error && !isFetching && <h4>Error loading notifications</h4>}

              {!isFetching && !error && displayedNotifications.length === 0 && (
                <div className="w-full p-12 text-center">
                  <IconBell
                    className="w-12 h-12 mx-auto text-gray-300"
                    strokeWidth={2}
                  />
                  <h3 className="mt-2 text-lg font-medium">
                    No notifications yet
                  </h3>
                  <p className="mt-1 text-gray-500">
                    Get started by reacting to organizations or adding them to
                    lists.
                  </p>
                </div>
              )}

              {displayedNotifications.length > 0 &&
                displayedNotifications.map((notification, index) => {
                  const { message, extensions } =
                    getNotificationChangedData(notification);

                  const enableExpand =
                    notification.event_type === 'Change Data' &&
                    notification.notification_actions.length > 1;

                  if (enableExpand) {
                    return (
                      <Disclosure key={notification.id} as="div">
                        <div className="relative flex items-center group">
                          <Disclosure.Button
                            as="div"
                            className="w-full cursor-pointer">
                            <ElemNotificationItem
                              notification={notification}
                              message={message}
                              extensions={extensions}
                              onMarkAsRead={id => markAsRead(id)}
                            />
                          </Disclosure.Button>
                          <ElemNotificationPopover
                            popoverStyle={{
                              zIndex: displayedNotifications.length - index,
                            }}
                            notification={notification}
                            onMarkAsRead={id => markAsRead(id)}
                          />
                        </div>
                        {enableExpand && (
                          <Disclosure.Panel className="pt-2 pb-6 pl-16 pr-6 lg:pl-18">
                            <ul className="pl-1 space-y-2 list-disc list-inside">
                              {extensions
                                .filter(extensionItem => extensionItem.field)
                                .map(item => (
                                  <li key={item.field} className="text-sm">
                                    {`Updated `}
                                    <ElemLink
                                      href={getNotificationOrganizationLink(
                                        notification,
                                      )}
                                      className="font-medium hover:text-primary-500">
                                      {item.field === 'velocity_linkedin' ? (
                                        <>velocity</>
                                      ) : item.field === 'location_json' ? (
                                        <>location</>
                                      ) : (
                                        <>{item.field.replace('_', ' ')}</>
                                      )}
                                    </ElemLink>
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
                        className={`relative flex items-center group ${
                          notification.read ? 'cursor-auto' : 'cursor-pointer'
                        }`}
                        key={notification.id}>
                        <ElemNotificationItem
                          notification={notification}
                          extensions={extensions}
                          message={message}
                          onMarkAsRead={id => markAsRead(id)}
                        />
                        <ElemNotificationPopover
                          popoverStyle={{
                            zIndex: displayedNotifications.length - index,
                          }}
                          notification={notification}
                          onMarkAsRead={id => markAsRead(id)}
                        />
                      </div>
                    );
                  }
                })}
              {isFetching && (
                <>
                  {Array.from({ length: 5 }, (_, i) => (
                    <PlaceholderNotification key={i} />
                  ))}
                </>
              )}
            </div>

            {!isFetching &&
              displayedNotifications.length > 0 &&
              displayedNotifications.length < totalNotifications && (
                <div className="p-5">
                  <ElemButton
                    btn="default"
                    onClick={handleClickShowMore}
                    className="w-full">
                    Show more notifications
                  </ElemButton>
                </div>
              )}
          </div>

          <ElemUpgradeDialog
            isOpen={isOpenUpgradeDialog}
            onClose={onCloseUpgradeDialog}
          />
        </div>
      </DashboardLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default NotificationsPage;
