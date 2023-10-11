import React from 'react';
import {
  IconProps,
  IconGlobe,
  IconTwitter,
  IconTelegram,
  IconDiscord,
  IconLockClosed,
} from '@/components/icons';
import { User_Groups } from '@/graphql/types';
import Link from 'next/link';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemMemberAvatarList } from '@/components/group/elem-member-avatar-list';
import { SettingTabProps } from './elem-setting-dialog';
import { ROUTES } from '@/utils/routes';

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
      icon: IconTwitter,
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
        <div className="shrink-0 border border-gray-300 rounded-lg">
          <div className="px-4 py-3 border-b border-gray-300">
            <h2 className="text-lg font-medium">About Group</h2>
            {group?.description && (
              <p className="text-gray-500 text-sm mb-3">{group?.description}</p>
            )}

            {isPublicGroup ? (
              <div className="flex text-sm">
                <IconGlobe
                  title="Public"
                  className="w-5 h-5 shrink-0 mr-2 text-gray-500"
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
                  className="w-5 h-5 shrink-0 mr-2 text-gray-500"
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
              <ul className="mt-2 flex flex-col space-y-2">
                {groupLinks?.map((item, index) => {
                  return (
                    <li key={index}>
                      <a
                        href={item.link}
                        className="flex items-center"
                        target={item.target ? item.target : '_blank'}
                        rel="noreferrer"
                      >
                        {item.icon && (
                          <item.icon
                            title={item.text}
                            className="w-5 h-5 shrink-0 mr-2 text-gray-500"
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
              <div className="flex justify-between items-center">
                <h3 className="font-medium">People</h3>
                {isUserBelongToGroup && (
                  <button
                    onClick={() => onOpenSettingDialog('members')}
                    className="text-sm hover:underline"
                  >
                    See all
                  </button>
                )}
              </div>
              <div className="pt-1 flex items-center">
                <ElemMemberAvatarList members={group.user_group_members} />
                <div className="text-sm text-gray-500 ml-1">
                  {group.user_group_members.length} Member
                  {group.user_group_members.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}

          {(groupAdmins.length > 0 || isUserBelongToGroup) && (
            <div className="px-4 pb-3">
              <div className="flex items-center">
                <ul>
                  {groupAdmins.map(mem => {
                    const admin = (
                      <div>
                        {mem.user?.person?.picture ? (
                          <ElemPhoto
                            photo={mem.user?.person?.picture}
                            wrapClass="flex items-center justify-center aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8"
                            imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
                            imgAlt={mem.user?.display_name}
                          />
                        ) : (
                          <div
                            className="flex items-center justify-center aspect-square w-8 rounded-full bg-gray-300 border border-gray-50 text-lg capitalize"
                            title={
                              mem.user?.display_name
                                ? mem.user?.display_name
                                : ''
                            }
                          >
                            {mem.user?.display_name?.charAt(0)}
                          </div>
                        )}
                      </div>
                    );

                    return (
                      <li key={mem.id}>
                        {mem.user?.person?.slug ? (
                          <Link
                            href={ROUTES.PERSON({
                              slug: mem.user?.person?.slug,
                            })}
                          >
                            <a>{admin}</a>
                          </Link>
                        ) : (
                          admin
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div className="text-sm text-gray-500 ml-1">
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
