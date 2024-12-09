import { useAuth } from '@/hooks/use-auth';
import { FC } from 'react';
import {
  IconCash,
  IconCompanies,
  IconCalendarDays,
  IconNewspaper,
  IconHome,
  IconUserGroup,
} from '@/components/icons';
import dynamic from 'next/dynamic';
import { ExploreMenuItem } from '@/types/common';
import { ElemSidebarItem } from './elem-sidebar-item';
import { DashboardBanner } from './dashboard-banner';
import { ROUTES } from '@/routes';
import { useSidebar } from '@/context/sidebar-context';

const ElemMyListsMenu = dynamic(() => import('./elem-my-lists-menu'), {
  ssr: false,
});
const ElemMyNotesMenu = dynamic(() => import('./elem-my-notes-menu'), {
  ssr: false,
});
const ElemMyGroupsMenu = dynamic(() => import('./elem-my-groups-menu'), {
  ssr: false,
});

type Props = {
  className?: string;
};

export const DashboardSidebar: FC<Props> = ({ className = '' }) => {
  const { user } = useAuth();
  const { showSidebar, setShowSidebar } = useSidebar();

  const exploreMenu: ExploreMenuItem[] = [
    ...(user
      ? [
          {
            href: ROUTES.HOME,
            icon: IconHome,
            title: 'Home',
          },
        ]
      : []),
    {
      href: ROUTES.COMPANIES,
      icon: IconCompanies,
      title: 'Companies',
    },
    {
      href: ROUTES.INVESTORS,
      icon: IconCash,
      title: 'Investors',
    },
    {
      href: ROUTES.EVENTS,
      icon: IconCalendarDays,
      title: 'Events',
    },
    {
      href: ROUTES.NEWS,
      icon: IconNewspaper,
      title: 'News',
    },
    {
      href: ROUTES.PEOPLE,
      icon: IconUserGroup,
      title: 'People',
    },
  ];

  return (
    <div className={`overflow-y-auto h-full scrollbar-hide ${className}`}>
      <nav className="px-4 pt-2 text-white pb-52">
        <ul className="pb-8 space-y-1 border-b border-gray-200 dark:border-gray-700">
          {exploreMenu.map(item => (
            <li role="button" key={item.href}>
              <ElemSidebarItem
                IconComponent={item.icon}
                text={item.title}
                url={item.href}
                onClick={() => setShowSidebar(false)}
              />
            </li>
          ))}
        </ul>

        <ul className={`mt-8 ${user ? 'space-y-4' : 'space-y-1'}`}>
          <ElemMyListsMenu />
          <ElemMyGroupsMenu />
          <ElemMyNotesMenu />
        </ul>
      </nav>

      <DashboardBanner className="fixed bottom-0 w-64 p-3" />
    </div>
  );
};
