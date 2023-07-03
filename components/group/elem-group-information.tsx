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
  className,
  isUserBelongToGroup,
  group,
  onInvite,
  onOpenSettingDialog,
  isAddingGroupMember,
  onAddGroupMember,
}) => {
  return (
    <>
      <div
        className={`sm:flex sm:items-center sm:justify-between sm:space-x-4 ${
          className ? className : ''
        }`}
      >
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
                        className="inline-flex items-center justify-start hover:text-primary-500 hover:underline"
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
                className="inline-flex items-start lg:items-center justify-start hover:text-primary-500 hover:underline"
                onClick={() => onOpenSettingDialog('settings')}
              >
                <IconGroup className="w-5 h-5 mr-1 mt-1 shrink-0 lg:mt-0" />
                <span className="font-bold text-left text-lg capitalize">
                  {group.name}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-x-2 shrink-0 mt-3 sm:mt-0">
              <ElemButton
                btn="primary"
                className="gap-x-1 lg:!pl-3"
                onClick={onInvite}
              >
                <IconPlus className="w-5 h-5 shrink-0" />
                <span>Invite</span>
              </ElemButton>
              <ElemButton
                btn="slate"
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
                    to: '/groups?tab=discover',
                    component: 'Discover Groups',
                    // component: (
                    //   <div className="flex items-center rounded-full aspect-square p-1.5 bg-slate-200 ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-300">
                    //     <IconArrowLeft
                    //       className="w-5 h-5 shrink-0"
                    //       title="Back to Groups"
                    //     />
                    //   </div>
                    // ),
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
                <IconGroup className="w-5 h-5 mr-1 mt-1 shrink-0 lg:mt-0" />
                <span className="font-bold text-lg capitalize">
                  {group.name}
                </span>
              </div>
            </div>

            {group.public && (
              <div className="flex items-center gap-x-2 shrink-0 pt-3">
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
    </>
  );
};
