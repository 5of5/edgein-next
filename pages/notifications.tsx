import React, { useMemo, useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useAuth } from '@/hooks/use-auth';
import { ElemButton } from '@/components/elem-button';
import { PlaceholderNotification } from '@/components/placeholders';
import Link from 'next/link';
import { IconCheck, IconBell } from '@/components/icons';
import { Disclosure } from '@headlessui/react';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import {
  GetNotificationsForUserQuery,
  useGetNotificationsForUserQuery,
} from '@/graphql/types';
import {
  filterExcludeNotifications,
  getNotificationChangedData,
  getNotificationOrganizationLink,
} from '@/utils/notifications';
import ElemNotificationItem from '@/components/notifications/elem-notification-item';
import ElemNotificationPopover from '@/components/notifications/elem-notification-popover';

const DEFAULT_LIMIT = 10;

const Notifications: NextPage = () => {
  const { user } = useAuth();

  const [notificationList, setNotificationList] = useState<
    GetNotificationsForUserQuery['notifications']
  >([]);

  const [page, setPage] = useState<number>(0);

  const offset = DEFAULT_LIMIT * page;

  const excludeProperties = useMemo(() => {
    return ['status_tags', 'logo', 'trajectory', 'search_count'];
  }, []);

  const excludeResourceTypes = useMemo(() => {
    return [];
  }, []);

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

  let displayedNotifications = user?.entitlements?.listsCount
    ? notificationList.slice(0, user.entitlements.listsCount)
    : notificationList;

  displayedNotifications = filterExcludeNotifications(
    displayedNotifications,
    excludeResourceTypes,
    excludeProperties,
  );

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
          {error && !isFetching && <h4>Error loading notifications</h4>}

          {!isFetching && !error && displayedNotifications.length === 0 && (
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
                        className="w-full cursor-pointer"
                      >
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
                      <Disclosure.Panel className="pl-16 lg:pl-18 pr-6 pt-2 pb-6">
                        <ul className="pl-1 list-disc list-inside space-y-2">
                          {extensions.map((item: any) => (
                            <li key={item.field} className="text-sm">
                              {`Updated `}
                              <Link
                                href={getNotificationOrganizationLink(
                                  notification,
                                )}
                                passHref
                              >
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
                    className={`relative flex items-center group ${
                      notification.read ? 'cursor-auto' : 'cursor-pointer'
                    }`}
                    key={notification.id}
                  >
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

        {displayedNotifications.length < totalNotifications && (
          <div className="p-5">
            <ElemButton
              btn="ol-primary"
              onClick={handleClickShowMore}
              className="w-full"
            >
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
