import { useAuth } from '@/hooks/use-auth';
import { FC, useEffect, useState } from 'react';
import {
  IconPolygonDown,
  IconCash,
  IconCompanies,
  IconCalendarDays,
  IconNewspaper,
} from '@/components/icons';
import { Resource_Edit_Access, useGetUserProfileQuery } from '@/graphql/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ElemMyEdgeInMenu = dynamic(() => import('./elem-my-edge-in-menu'), {
  ssr: false,
});
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

  const exploreMenu: any = [
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
  ];

  return (
    <nav className={`p-4 border-r border-gray-200 bg-gray-50 ${className}`}>
      <ul className="mt-1 space-y-2 text-slate-600">
        {exploreMenu.map((item: any) => (
          <li role="button" key={item.href}>
            <Link href={item.href}>
              <a
                className={`${
                  router.asPath.includes(item.href) ? 'bg-gray-100' : ''
                } flex items-center space-x-2 py-1.5 px-2 rounded-md flex-1 transition-all hover:bg-slate-200`}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.title}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <ElemMyNotesMenu className="mt-6" />
      <ElemMyListsMenu className="mt-6" />
      <ElemMyGroupsMenu className="mt-6" />
      {/* <ElemMyEdgeInMenu /> */}
    </nav>
  );
};
