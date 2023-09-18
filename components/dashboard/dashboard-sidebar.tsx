import { useAuth } from '@/hooks/use-auth';
import { FC, useEffect, useState } from 'react';
import {
  IconCash,
  IconCompanies,
  IconCalendarDays,
  IconNewspaper,
  IconUserGroup,
} from '@/components/icons';
import { Resource_Edit_Access, useGetUserProfileQuery } from '@/graphql/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ExploreMenuItem } from '@/types/common';

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

  const exploreMenu: ExploreMenuItem[] = [
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

  return (
    <div className={`p-4 text-gray-600 ${className}`}>
      <nav>
        <ul className="border-b border-gray-200 pb-8 space-y-1">
          {exploreMenu.map(item => (
            <li role="button" key={item.href}>
              <Link href={item.href}>
                <a
                  className={`${
                    router.asPath.includes(item.href) ? 'bg-gray-100' : ''
                  } flex items-center space-x-3 p-2.5 font-medium text-sm text-gray-900 rounded-md flex-1 transition-all hover:bg-gray-100`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      router.asPath.includes(item.href)
                        ? 'text-primary-500'
                        : 'text-gray-900'
                    }`}
                  />
                  <span className="text-sm">{item.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 space-y-4">
          <ElemMyListsMenu />
          <ElemMyGroupsMenu />
          <ElemMyNotesMenu />
        </div>
      </nav>
    </div>
  );
};
