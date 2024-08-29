import React from 'react';
import { IconPlus, IconSettings } from '@/components/icons';
import { ElemButton } from '@/components/elem-button';
import { User_Groups } from '@/graphql/types';
import { SettingTabProps } from './elem-setting-dialog';
import ElemDashboardBreadcrumb from '../dashboard/elem-dashboard-breadcrumb';
import { useUser } from '@/context/user-context';
import { ROUTES } from '@/routes';

type Props = {
  group: User_Groups;
  isGroupAuthor: boolean;
  className?: string;
  isUserBelongToGroup: boolean;
  onInvite: () => void;
  onOpenSettingDialog: (tab?: SettingTabProps) => void;
  isAddingGroupMember?: boolean;
  onAddGroupMember?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

export const ElemGroupInformation: React.FC<Props> = ({
  group,
  isUserBelongToGroup,
  isGroupAuthor,
  onInvite,
  onOpenSettingDialog,
  isAddingGroupMember,
  onAddGroupMember,
}) => {
  const { user } = useUser();
  const getUserId = user?.id;

  const groupAdmins = group.user_group_members.filter(
    member => member?.user?.id === group?.created_by_user_id,
  );

  const isGroupAdmin = groupAdmins.some(user => user.user?.id === getUserId);

  return (
    <>
      <div className="px-4 py-3">
        {isUserBelongToGroup ? (
          <ElemDashboardBreadcrumb
            breadcrumbs={[
              ...(isGroupAdmin
                ? [
                    {
                      name: 'my-groups',
                      to: ROUTES.GROUPS,
                      component: 'Groups',
                    },
                  ]
                : [
                    {
                      name: 'joined-groups',
                      to: `${ROUTES.GROUPS}/?tab=joined`,
                      component: 'Joined Groups',
                    },
                  ]),
              {
                name: 'current',
                component: (
                  <button
                    type="button"
                    className="inline-flex items-center justify-start hover:underline"
                    onClick={() => onOpenSettingDialog('settings')}>
                    <span className="max-w-xs text-left capitalize truncate">
                      {group.name}
                    </span>
                  </button>
                ),
              },
            ]}
          />
        ) : (
          <ElemDashboardBreadcrumb
            breadcrumbs={[
              {
                name: 'my-groups',
                to: `${ROUTES.GROUPS}/?tab=discover`,
                component: 'Discover Groups',
              },
              {
                name: 'current',
                component: (
                  <div className="flex items-center">
                    <span className="capitalize">{group.name}</span>
                  </div>
                ),
              },
            ]}
          />
        )}
      </div>
      <div className="px-4 pb-3 mb-4 border-b border-gray-200">
        <div className="flex flex-wrap items-start justify-between space-y-2 lg:space-y-0">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-2">
              {isGroupAuthor ? (
                <>
                  <button
                    type="button"
                    className="inline-flex items-start justify-start mr-2 lg:items-center hover:underline"
                    onClick={() => onOpenSettingDialog('settings')}>
                    <span className="text-xl font-medium text-left capitalize lg:text-3xl">
                      {group.name}
                    </span>
                  </button>
                </>
              ) : (
                <h1 className="mr-2 text-xl font-medium capitalize lg:text-3xl">
                  {group.name}
                </h1>
              )}
            </div>
          </div>
          <div className="flex items-center gap-x-2 shrink-0">
            {isUserBelongToGroup && (
              <>
                <ElemButton
                  btn="primary"
                  className="gap-x-1 lg:!pl-3"
                  onClick={onInvite}>
                  <IconPlus className="w-5 h-5 shrink-0" />
                  <span>Invite</span>
                </ElemButton>
                <ElemButton
                  btn="default"
                  className="gap-x-1 lg:!pl-3"
                  onClick={() => onOpenSettingDialog('settings')}>
                  <IconSettings className="w-5 h-5 shrink-0" />
                  <span>Settings</span>
                </ElemButton>
              </>
            )}
            {!isUserBelongToGroup && group.public && (
              <ElemButton
                btn="primary"
                loading={isAddingGroupMember}
                onClick={onAddGroupMember}>
                Join group
              </ElemButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
