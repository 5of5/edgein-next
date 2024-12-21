import React from 'react';
import {
  IconProps,
  IconTwitterX,
  IconTelegram,
  IconDiscord,
  IconLockClosed,
  IconGlobeAmericas,
} from '@/components/icons';
import { User_Groups } from '@/graphql/types';
import { ElemAvatarList } from '../elem-avatar-list';
import { SettingTabProps } from './elem-setting-dialog';

type Props = {
  className?: string;
  isUserBelongToGroup: boolean;
  onOpenSettingDialog: (tab?: SettingTabProps) => void;
  group: User_Groups;
};

export const ElemGroupAbout: React.FC<Props> = ({
  className = '',
  isUserBelongToGroup,
  onOpenSettingDialog,
  group,
}) => {
  const isPublicGroup = group.public;

  const groupMembers = group.user_group_members.filter(
    member => member.user?.id != group?.created_by?.id,
  );

  const groupAdmins = group.user_group_members.filter(
    member => member?.user?.id === group?.created_by_user_id,
  );

  const groupLinks: {
    icon?: React.FC<IconProps>;
    link?: string;
    text: string;
    target?: string;
  }[] = [];

  if (group.twitter) {
    groupLinks.push({
      icon: IconTwitterX,
      text: 'Twitter',
      link: group.twitter,
    });
  }

  if (group.telegram) {
    groupLinks.push({
      icon: IconTelegram,
      text: 'Telegram',
      link: group.telegram,
    });
  }

  if (group.discord) {
    groupLinks.push({
      icon: IconDiscord,
      text: 'Discord',
      link: group.discord,
    });
  }

  return (
    <>
      <div className={className}>
        <div className="border  border-neutral-700 rounded-lg shrink-0">
          <div className="px-4 py-3 border-b  border-neutral-700">
            <h2 className="text-lg font-medium">About Group</h2>
            {group?.description && (
              <p className="mb-3 text-sm text-gray-500">{group?.description}</p>
            )}

            {isPublicGroup ? (
              <div className="flex text-sm">
                <IconGlobeAmericas
                  title="Public"
                  className="w-5 h-5 mr-2 text-gray-500 shrink-0"
                />
                <div>
                  <h4>Public</h4>
                  <p className="text-gray-500">Anyone can find this group.</p>
                </div>
              </div>
            ) : (
              <div className="flex text-sm">
                <IconLockClosed
                  title="Private"
                  className="w-5 h-5 mr-2 text-gray-500 shrink-0"
                />
                <div>
                  <h4 className="font-mediun">Private</h4>
                  <p className="text-gray-500">
                    Only members can see who&rsquo;s in the group and what they
                    post.
                  </p>
                </div>
              </div>
            )}

            {isUserBelongToGroup && groupLinks.length > 0 && (
              <ul className="flex flex-col mt-2 space-y-2">
                {groupLinks?.map((item, index) => {
                  return (
                    <li key={index}>
                      <a
                        href={item.link}
                        className="flex items-center"
                        target={item.target ? item.target : '_blank'}
                        rel="noreferrer">
                        {item.icon && (
                          <item.icon
                            title={item.text}
                            className="w-5 h-5 mr-2 text-gray-500 shrink-0"
                          />
                        )}
                        <span className="text-sm hover:underline">
                          {item.text}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {(isPublicGroup || isUserBelongToGroup) && (
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Members</h3>
                {isUserBelongToGroup && (
                  <button
                    onClick={() => onOpenSettingDialog('members')}
                    className="text-sm hover:underline">
                    See all
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center pt-1">
                <ElemAvatarList people={groupMembers} limit={12} />
                <div className="ml-1 text-sm text-gray-500">
                  {groupMembers.length} Member
                  {groupMembers.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}

          {(groupAdmins.length > 0 || isUserBelongToGroup) && (
            <div className="px-4 pb-3">
              <div className="flex items-center">
                <ElemAvatarList people={groupAdmins} limit={10} />

                <div className="ml-1 text-sm text-gray-500">
                  Admin
                  {groupAdmins.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
