import React from 'react';
import {
  IconGroup,
  IconChevronDownMini,
  IconPlus,
  IconSettings,
} from '@/components/icons';
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
      <div className="flex items-center justify-between flex-wrap space-y-2 px-4 py-3 border-b border-gray-300 lg:space-y-0">
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
                        onClick={() => onOpenSettingDialog('settings')}
                      >
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
                className="inline-flex items-start lg:items-center justify-start hover:underline"
                onClick={() => onOpenSettingDialog('settings')}
              >
                <span className="font-medium text-left text-lg capitalize">
                  {group.name}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-x-2 shrink-0 mt-3 sm:mt-0">
              <ElemButton
                btn="purple"
                className="gap-x-1 lg:!pl-3"
                onClick={onInvite}
              >
                <IconPlus className="w-5 h-5 shrink-0" />
                <span>Invite</span>
              </ElemButton>
              <ElemButton
                btn="default"
                className="gap-x-1 lg:!pl-3"
                onClick={() => onOpenSettingDialog('settings')}
              >
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
                <span className="font-medium text-lg capitalize">
                  {group.name}
                </span>
              </div>
            </div>

            {group.public && (
              <div className="flex items-center gap-x-2 shrink-0">
                <ElemButton
                  btn="purple"
                  loading={isAddingGroupMember}
                  onClick={onAddGroupMember}
                >
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
