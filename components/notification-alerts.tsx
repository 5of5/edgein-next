import { IconBell } from '@/components/icons';
import Link from 'next/link';
import { filterExcludeNotifications } from '@/utils/notifications';
import { NOTIFICATION_EXCLUDE_PROPERTIES } from '@/utils/constants';
import { useUser } from '@/context/user-context';
import { Notifications } from '@/graphql/types';

export const NotificationAlerts = () => {
  const { unreadNotifications } = useUser();

  const notifications = filterExcludeNotifications(
    unreadNotifications as Notifications[],
    NOTIFICATION_EXCLUDE_PROPERTIES,
  );

  const notificationsCount = notifications ? notifications.length : 0;

  return (
    <Link href="/notifications" passHref>
      <a className="relative flex items-center justify-center w-9 h-9 rounded-full bg-slate-200 group-hover:opacity-50 hover:!opacity-100">
        {notificationsCount > 0 && (
          <div className="absolute flex items-center justify-center -top-[4px] -right-[4px] w-5 h-5 rounded-full from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r border border-white">
            <div className="text-white font-bold text-[10px] text-center">
              {notificationsCount > 99 ? '99+' : notificationsCount}
            </div>
          </div>
        )}

        <IconBell className="h-5 w-5" strokeWidth={2} />
      </a>
    </Link>
  );
};
