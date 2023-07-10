import { useAuth } from '@/hooks/use-auth';
import { FC, useEffect, useState } from 'react';
import { Resource_Edit_Access, useGetUserProfileQuery } from '@/graphql/types';
import dynamic from 'next/dynamic';

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
const ElemExploreMenu = dynamic(() => import('./elem-explore-menu'), {
  ssr: false,
});

type Props = {
  className?: string;
};

export const DashboardSidebar: FC<Props> = ({ className = '' }) => {
  const { user } = useAuth();

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

  return (
    <nav className={`p-4 ${className}`}>
      <div>
        <ElemMyEdgeInMenu />
        <ElemMyNotesMenu className="mt-6" />
        <ElemMyGroupsMenu className="mt-6" />
        <ElemMyListsMenu className="mt-6" />
        <ElemExploreMenu className="mt-6" />
      </div>
    </nav>
  );
};
