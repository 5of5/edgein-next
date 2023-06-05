import React, { useMemo, useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useAuth } from '@/hooks/use-auth';
import { ElemButton } from '@/components/elem-button';
import { PlaceholderNotification } from '@/components/placeholders';
import Link from 'next/link';
import { IconCheck, IconBell } from '@/components/icons';
import { Disclosure } from '@headlessui/react';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import { useGetNotificationsForUserQuery } from '@/graphql/types';
import {
  filterExcludeNotifications,
  getNotificationChangedData,
  getNotificationOrganizationLink,
} from '@/utils/notifications';
import ElemNotificationItem from '@/components/notifications/elem-notification-item';
import ElemNotificationPopover from '@/components/notifications/elem-notification-popover';

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
    return ['status_tags', 'logo', 'trajectory', 'search_count'];
  }, []);

  const excludeResourceTypes = useMemo(() => {
    return [];
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
