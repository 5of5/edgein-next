import { FC, useState } from 'react';
import {
  IconSettings,
  IconLockClosed,
  IconGlobeAmericas,
  IconPlus,
  IconUserGroup,
  IconUser,
} from '@/components/icons';
import { ElemButton } from '@/components/elem-button';
import { formatDateShown, numberWithCommas, toLabel } from '@/utils';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/router';
import { ElemSocialShare } from '../elem-social-share';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';
import { ElemTooltip } from '../elem-tooltip';
import { getListDisplayName } from '@/utils/lists';
import { Lists } from '@/graphql/types';
import { ElemAvatarList } from '../elem-avatar-list';
import { ListMembersManager } from '@/components/lists/list-members-manager';
import ElemInviteListDialog from '@/components/lists/elem-invite-list-dialog';

type Props = {
  list: Lists;
  isListAuthor: boolean;
  isPublicList: boolean;
  isFollowing: boolean;
  isFollowButtonLoading: boolean;
  onFollowList: () => void;
  onOpenSettingsDialog: () => void;
};

export const ElemListInformation: FC<Props> = ({
  list,
  isListAuthor,
  isPublicList,
  isFollowing,
  isFollowButtonLoading,
  onFollowList,
  onOpenSettingsDialog,
}) => {
  const { user } = useUser();
  const router = useRouter();
  const [openMembersModal, setOpenMembersModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { fl } = router?.query;

  const itemsCount = Array.isArray(fl) ? fl[0] : fl || '0';
  const totalItems = parseInt(itemsCount, 10);

  const isCustomList = list
    ? !['hot', 'like', 'crap'].includes(getListDisplayName(list))
    : router.query.slug
    ? !['hot', 'like', 'crap'].includes(router.query.slug as string)
    : false;

  const listName =
    getListDisplayName(list) === 'crap' ? 'sh**' : getListDisplayName(list);

  const listMembers = list.list_members.filter(
    member => member.user?.id != list?.created_by?.id,
  );
  const isAdmin = list.list_members.some(
    m => m.user_id === user?.id && m.member_type === 'admin',
  );
  const isFollower = list.list_members.some(
    m => m.user_id === user?.id && m.member_type === 'follow',
  );
  const canManageMembers = isListAuthor || isAdmin;
  const canInvite = isListAuthor || isAdmin || isFollower;

  const listTitle = (
    <>
      <h1 className="inline mr-2 text-xl font-medium leading-snug text-gray-300 capitalize align-middle group-hover:underline lg:text-2xl">
        {listName}
      </h1>

      <div className="leading-snug inline-flex space-x-0.5 align-middle px-2 py-0.5 text-xs border  border-neutral-700 rounded-full">
        {list.public ? (
          <IconGlobeAmericas
            title="Public"
            className="block w-4 h-4 shrink-0"
          />
        ) : (
          <IconLockClosed title="Private" className="block w-4 h-4 shrink-0" />
        )}
        <div>{list.public ? 'Public' : 'Private'}</div>
      </div>
    </>
  );

  return (
    <div className="px-4 pb-3 mb-4 border-b  border-neutral-700">
      <div className="flex flex-wrap items-start justify-between space-y-2 lg:space-y-0">
        <div className="max-w-4xl">
          {isListAuthor && isCustomList ? (
            <button onClick={onOpenSettingsDialog} className="text-left group">
              {listTitle}
            </button>
          ) : (
            <div>{listTitle}</div>
          )}

          <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500 gap-x-1 gap-y-0.5">
            {list?.created_by && (
              <ElemTooltip
                content="Author"
                mode="dark"
                direction="bottom"
                size="lg">
                <div className="first-letter:uppercase">
                  {list?.created_by?.person ? (
                    <ElemLink
                      href={`${ROUTES.PEOPLE}/${list?.created_by?.person?.slug}`}
                      className="capitalize hover:underline">
                      {list?.created_by?.person.name}
                    </ElemLink>
                  ) : (
                    list?.created_by?.display_name
                  )}
                </div>
              </ElemTooltip>
            )}
            &middot;
            <ElemTooltip
              content={
                <div className="p-1 text-sm">
                  Updated {formatDateShown(list.updated_at, `LL [at] h:mmA`)}
                </div>
              }
              mode="dark"
              direction="bottom"
              size="lg">
              <div>{formatDateShown(list.updated_at, `ll`)}</div>
            </ElemTooltip>
            &middot;
            <div>
              {totalItems} {`Item${totalItems && totalItems === 1 ? '' : 's'}`}
            </div>
            {/* &middot;
            <ElemTooltip
              content={
                list.public ? 'Shared with public' : 'Visible only to you'
              }
              mode="dark"
              direction="bottom"
              size="lg">
              <div className="flex items-center gap-x-1 hover:underline">
                {list.public ? (
                  <IconGlobeAmericas
                    title="Public"
                    className="block w-4 h-4 shrink-0"
                  />
                ) : (
                  <IconLockClosed
                    title="Private"
                    className="block w-4 h-4 shrink-0"
                  />
                )}
                {list.public ? 'Public' : 'Private'}
              </div>
            </ElemTooltip> */}
          </div>

          {list?.description && (
            <div className="max-w-xl mt-2 text-sm">{list?.description}</div>
          )}

          <div className="mt-4 grow">
            {listMembers && listMembers.length > 0 && (
              <div className="flex items-center pl-1 gap-x-2">
                <ElemAvatarList people={listMembers as any} />
                <div className="ml-1 text-sm shrink-0">
                  {listMembers.length > 1
                    ? `${numberWithCommas(listMembers.length)} Followers`
                    : `${numberWithCommas(listMembers.length)} Follower`}
                </div>
                {canManageMembers && (
                  <ElemButton
                    btn="default"
                    size="sm"
                    className="gap-x-1 lg:!pl-3"
                    onClick={() => setOpenMembersModal(true)}>
                    <IconUser className="w-5 h-5 shrink-0" />
                    Manage Members
                  </ElemButton>
                )}
                {canInvite && (
                  <ElemButton
                    btn="primary"
                    size="sm"
                    className="gap-x-1 lg:!pl-3"
                    onClick={() => setOpenInviteModal(true)}>
                    <IconPlus className="w-5 h-5 shrink-0" />
                    Invite
                  </ElemButton>
                )}
              </div>
            )}
          </div>
        </div>

        {isCustomList && (
          <div className="flex items-center gap-x-2 shrink-0">
            {isPublicList && (
              <ElemSocialShare
                resourceName={`"${listName}" list`}
                resourceTwitterUrl={null}
              />
            )}
            {isListAuthor && (
              <ElemButton
                btn="default"
                className="gap-x-1 lg:!pl-3"
                onClick={onOpenSettingsDialog}>
                <IconSettings className="hidden w-5 h-5 sm:block" />
                <span>Settings</span>
              </ElemButton>
            )}

            {user && !isFollowing && (
              <ElemButton
                btn="primary"
                loading={isFollowButtonLoading}
                onClick={onFollowList}>
                Follow
              </ElemButton>
            )}
            {isFollowing && !isListAuthor && (
              <ElemButton
                btn="default"
                loading={isFollowButtonLoading}
                onClick={onFollowList}>
                Following
              </ElemButton>
            )}
          </div>
        )}
      </div>
      {canManageMembers && (
        <ListMembersManager
          listId={list.id}
          open={openMembersModal}
          onClose={() => setOpenMembersModal(false)}
        />
      )}
      {canInvite && (
        <ElemInviteListDialog
          isOpen={openInviteModal}
          listId={list.id}
          listName={list.name}
          onClose={() => setOpenInviteModal(false)}
        />
      )}
    </div>
  );
};
