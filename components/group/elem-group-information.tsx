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

type Props = {
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
  return (
    <div className="flex flex-wrap space-y-2 items-end justify-between lg:space-y-0 lg:border-b lg:pb-2 lg:border-black/10">
      {isUserBelongToGroup ? (
        <>
          <div>
            <ElemDashboardBreadcrumb
              breadcrumbs={[
                {
                  name: 'my-groups',
                  to: '/groups',
                  component: 'My Groups',
                },
                {
                  name: 'current',
                  component: (
                    <button
                      type="button"
                      className="flex items-center rounded-lg px-1 py-0.5 hover:text-primary-500 hover:bg-slate-200"
                      onClick={() => onOpenSettingDialog('settings')}
                    >
                      <IconGroup className="w-6 h-6 mr-1" />
                      <span className="font-bold text-lg capitalize">
                        {group.name}
                      </span>
                      <IconChevronDownMini className="h-5 w-5" />
                    </button>
                  ),
                },
              ]}
            />
          </div>

          <div className="flex items-center gap-x-2 shrink-0">
            <ElemButton
              btn="primary"
              className="gap-x-1 lg:!pl-3"
              onClick={onInvite}
            >
              <IconPlus className="hidden sm:block w-5 h-5" />
              <span>Invite</span>
            </ElemButton>
            <ElemButton
              btn="slate"
              className="gap-x-1 lg:!pl-3"
              onClick={() => onOpenSettingDialog('settings')}
            >
              <IconSettings className="hidden sm:block w-5 h-5" />
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
                  to: '/groups',
                  component: 'My groups',
                },
                {
                  name: 'current',
                  component: (
                    <div className="flex items-center">
                      <IconGroup className="w-6 h-6 mr-1" />
                      <span className="font-bold text-lg capitalize">
                        {group.name}
                      </span>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          {group.public && (
            <div className="flex items-center gap-x-2 shrink-0">
              <ElemButton
                btn="primary"
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
  );
};
