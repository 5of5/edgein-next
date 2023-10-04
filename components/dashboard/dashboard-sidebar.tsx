import { useAuth } from '@/hooks/use-auth';
import { FC, useEffect, useState } from 'react';
import {
  IconCash,
  IconCompanies,
  IconCalendarDays,
  IconNewspaper,
  IconHome,
  IconUserGroup,
} from '@/components/icons';
import { Resource_Edit_Access, useGetUserProfileQuery } from '@/graphql/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ExploreMenuItem } from '@/types/common';
import { ElemSidebarItem } from './elem-sidebar-item';
import { DashboardBanner } from './dashboard-banner';

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
  const router = useRouter();

  const [organizations, setOrganizations] = useState(
    [] as Resource_Edit_Access[],
  );

  const { data: users } = useGetUserProfileQuery({
    id: user?.id || 0,
  });

  useEffect(() => {
    if (users?.users_by_pk?.organization_companies) {
      setOrganizations(prev => {
        const temp = [
          ...prev,
          ...(users?.users_by_pk
            ?.organization_companies as Resource_Edit_Access[]),
        ];
        return temp;
      });
    }

    if (users?.users_by_pk?.organization_vc_firms) {
      setOrganizations(prev => {
        const temp = [
          ...prev,
          ...(users?.users_by_pk
            ?.organization_vc_firms as Resource_Edit_Access[]),
        ];
        return temp;
      });
    }
  }, [users]);

  let exploreMenu: ExploreMenuItem[] = [
    {
      href: '/companies/',
      icon: IconCompanies,
      title: 'Companies',
    },
    {
      href: '/investors/',
      icon: IconCash,
      title: 'Investors',
    },
    {
      href: '/events/',
      icon: IconCalendarDays,
      title: 'Events',
    },
    {
      href: '/news/',
      icon: IconNewspaper,
      title: 'News',
    },
    {
      href: '/people/',
      icon: IconUserGroup,
      title: 'People',
    },
  ];

  if (user) {
    exploreMenu = [
      {
        href: '/home/',
        icon: IconHome,
        title: 'Home',
      },
      ...exploreMenu,
    ];
  }

  return (
    <div className={`overflow-y-auto h-full scrollbar-hide ${className}`}>
      <nav className="px-4 pt-4 pb-52 text-gray-600">
        <ul className="border-b border-gray-200 pb-8 space-y-1">
          {exploreMenu.map(item => (
            <li role="button" key={item.href}>
              <ElemSidebarItem
                url={item.href}
                text={item.title}
                IconComponent={item.icon}
              />
            </li>
          ))}
        </ul>

        <div className={`mt-8 ${user ? 'space-y-4' : 'space-y-1'}`}>
          <ElemMyListsMenu />
          <ElemMyGroupsMenu />
          <ElemMyNotesMenu />
        </div>
      </nav>

      <DashboardBanner className="fixed bottom-0 w-64 p-3" />
    </div>
  );
};
