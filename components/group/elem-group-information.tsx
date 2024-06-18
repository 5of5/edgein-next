import React from 'react';
import { IconPlus, IconSettings } from '@/components/icons';
import { ElemButton } from '@/components/elem-button';
import { User_Groups } from '@/graphql/types';
import { SettingTabProps } from './elem-setting-dialog';
import ElemDashboardBreadcrumb from '../dashboard/elem-dashboard-breadcrumb';
import { useUser } from '@/context/user-context';
import { ROUTES } from '@/routes';

type Props = {
  className?: string;
  isUserBelongToGroup: boolean;
  group: User_Groups;
  onInvite: () => void;
  onOpenSettingDialog: (tab?: SettingTabProps) => void;
  isAddingGroupMember?: boolean;
  onAddGroupMember?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

export const ElemGroupInformation: React.FC<Props> = ({
  isUserBelongToGroup,
  group,
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
      <div className="flex flex-wrap items-center justify-between px-4 py-3 space-y-2 border-b border-gray-200 lg:space-y-0">
        {isUserBelongToGroup ? (
          <>
            <div>
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
                        <span className="text-left capitalize">
                          {group.name}
                        </span>
                      </button>
                    ),
                  },
                ]}
              />
              <button
                type="button"
                className="inline-flex items-start justify-start lg:items-center hover:underline"
                onClick={() => onOpenSettingDialog('settings')}>
                <span className="text-lg font-medium text-left capitalize">
                  {group.name}
                </span>
              </button>
            </div>

            <div className="flex items-center mt-3 gap-x-2 shrink-0 sm:mt-0">
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
            </div>
          </>
        ) : (
          <>
            <div>
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
              <div className="flex items-center">
                <span className="text-lg font-medium capitalize">
                  {group.name}
                </span>
              </div>
            </div>

            {group.public && (
              <div className="flex items-center gap-x-2 shrink-0">
                <ElemButton
                  btn="primary"
                  loading={isAddingGroupMember}
                  onClick={onAddGroupMember}>
                  Join group
                </ElemButton>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
