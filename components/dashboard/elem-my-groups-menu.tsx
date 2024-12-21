import { FC, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  IconGlobeAmericas,
  IconLockClosed,
  IconSidebarGroups,
} from '@/components/icons';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { SIDEBAR_DEFAULT_GROUPS_LIMIT } from '@/utils/constants';
import { ROUTES } from '@/routes';
import { CreateGroupDialog } from '../group/create-group-dialog';
import { ElemWithSignInModal } from '../elem-with-sign-in-modal';
import { ElemSidebarItem } from './elem-sidebar-item';
import { ElemLink } from '../elem-link';
import { useSidebar } from '@/context/sidebar-context';
import { InputText } from '../input-text';
import { ElemButton } from '../elem-button';
import { ElemTooltip } from '../elem-tooltip';
import { formatDateShown, numberWithCommas } from '@/utils';

type Props = {
  className?: string;
};

const ElemMyGroupsMenu: FC<Props> = ({ className = '' }) => {
  const { showSidebar, setShowSidebar } = useSidebar();
  const router = useRouter();
  const { myGroups: groups, user } = useUser();

  // limit groups for free users
  // const displayedGroups = groups.slice(
  //   0,
  //   user?.entitlements.groupsCount
  //     ? user?.entitlements.groupsCount
  //     : groups.length,
  // );

  const [customGroups, setCustomGroups] = useState(groups);
  const [limitGroups, setLimitGroups] = useState(true);

  useEffect(() => {
    setCustomGroups(groups);
  }, [groups]);

  const [isOpenCreateGroupDialog, setIsOpenCreateGroupDialog] = useState(false);

  const getActiveClass = (id: number) => {
    return `${ROUTES.GROUPS}/${id}/` === router.asPath
      ? 'bg-neutral-900 text-gray-300'
      : '';
  };

  const onOpenCreateGroupDialog = () => {
    setIsOpenCreateGroupDialog(true);
  };

  const onCloseCreateGroupDialog = () => {
    setIsOpenCreateGroupDialog(false);
  };

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const onClickCreate = () => {
    if (
      user?.entitlements?.groupsCount &&
      customGroups.length > user.entitlements.groupsCount
    ) {
      return onOpenUpgradeDialog();
    }

    return onOpenCreateGroupDialog();
  };

  const [searchText, setSearchText] = useState('');
  const [filteredGroups, setFilteredGroups] = useState(customGroups);

  const handleSearchTextChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText.length > 0) {
      setFilteredGroups(
        customGroups.filter(group => {
          return group?.name.toLowerCase().includes(searchText);
        }),
      );
      setLimitGroups(false);
    } else {
      setFilteredGroups(customGroups);
      setLimitGroups(true);
    }
  }, [customGroups, searchText]);

  const onShowMoreGroups = () => {
    setLimitGroups(false);
  };

  return (
    <li className={className}>
      {user ? (
        <div className="relative">
          <ElemSidebarItem
            IconComponent={IconSidebarGroups}
            text="Groups"
            url={ROUTES.GROUPS}
            onClick={() => setShowSidebar(false)}
          />
          <div className="absolute right-2 top-1.5 bottom-1.5">
            <ElemButton btn="primary" size="xs" onClick={onClickCreate}>
              Create
            </ElemButton>
          </div>
        </div>
      ) : (
        <ElemWithSignInModal
          wrapperClass="w-full"
          text="Sign in to collaborate on notes, share insights, and track leads in one group with your team or friends."
          buttonComponent={open => (
            <button
              className={`${
                open ? 'bg-neutral-900' : ''
              } flex w-full items-center space-x-3 p-2.5 font-medium text-sm text-white rounded-md flex-1 transition-all hover:bg-neutral-900`}>
              <IconSidebarGroups
                className={`w-5 h-5 ${
                  open ? 'text-primary-500' : 'text-white'
                }`}
              />
              <p className="text-sm font-medium text-white">Groups</p>
            </button>
          )}
        />
      )}

      {user && (
        <>
          {customGroups.length > SIDEBAR_DEFAULT_GROUPS_LIMIT && (
            <InputText
              type="text"
              onChange={handleSearchTextChange}
              value={searchText}
              name="name"
              autoComplete="off"
              placeholder="Find group..."
              className="mt-2 ring-1 ring-gray-200"
            />
          )}

          <ul className="mt-1 space-y-1">
            {filteredGroups
              .slice(
                0,
                limitGroups
                  ? SIDEBAR_DEFAULT_GROUPS_LIMIT
                  : customGroups.length,
              )
              ?.map(group => {
                const groupUrl = `${ROUTES.GROUPS}/${group.id}/`;

                const groupTotalLists = group.list_user_groups?.length;
                const groupTotalNotes = group.notes.length;

                const groupTooltip = (
                  <div className="flex-col p-2 group">
                    <div>
                      <ElemLink
                        href={groupUrl}
                        className="inline-block first-letter:uppercase">
                        <div className="inline mr-2 text-lg font-medium leading-snug text-white align-middle line-clamp-2 hover:underline">
                          {group.name}
                        </div>
                        <div className="leading-snug inline-flex space-x-0.5 align-middle px-2 py-0.5 text-xs border  border-neutral-700 rounded-full">
                          {group.public ? (
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
                          <div>{group.public ? 'Public' : 'Private'}</div>
                        </div>
                      </ElemLink>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center text-xs text-gray-500 gap-x-1 gap-y-0.5">
                      <ElemTooltip
                        content="Admin"
                        mode="dark"
                        direction="bottom"
                        size="lg">
                        <div className="first-letter:uppercase">
                          {group?.created_by?.person ? (
                            <ElemLink
                              href={`${ROUTES.PEOPLE}/${group?.created_by?.person?.slug}`}
                              className="capitalize hover:underline">
                              {group?.created_by?.person.name}
                            </ElemLink>
                          ) : (
                            group?.created_by?.display_name
                          )}
                        </div>
                      </ElemTooltip>
                      &middot;
                      <ElemTooltip
                        content={
                          <div className="p-1ext-sm">
                            Updated{' '}
                            {formatDateShown(group.updated_at, `LL [at] h:mmA`)}
                          </div>
                        }
                        mode="dark"
                        direction="bottom"
                        size="lg">
                        <div>{formatDateShown(group.updated_at, `ll`)}</div>
                      </ElemTooltip>
                      &middot;
                      <div>
                        {numberWithCommas(
                          groupTotalLists ? groupTotalLists : 0,
                        )}{' '}
                        List
                        {groupTotalLists === 1 ? '' : 's'}
                      </div>
                      &middot;
                      <div>
                        {numberWithCommas(
                          groupTotalNotes ? groupTotalNotes : 0,
                        )}{' '}
                        Note{groupTotalNotes === 1 ? '' : 's'}
                      </div>
                    </div>

                    {group.description && (
                      <div className="mt-3 text-sm font-normal text-white line-clamp-4">
                        {group.description}
                      </div>
                    )}
                  </div>
                );

                return (
                  <li
                    key={group.id}
                    role="button"
                    onClick={() => setShowSidebar(false)}>
                    <ElemTooltip
                      content={groupTooltip}
                      direction="top-start"
                      delay={350}
                      mode="light"
                      size="lg"
                      arrow={false}>
                      <div>
                        <ElemLink
                          href={`${ROUTES.GROUPS}/${group.id}/`}
                          className={`flex items-center space-x-2 py-2 pl-4 font-medium text-sm text-gray-500 rounded-md flex-1 transition-all hover:bg-neutral-900 hover:text-white ${getActiveClass(
                            group.id,
                          )}`}
                          title={group.name}>
                          <div className="break-all line-clamp-1 first-letter:uppercase">
                            {group.name}
                          </div>
                        </ElemLink>
                      </div>
                    </ElemTooltip>
                  </li>
                );
              })}

            {limitGroups &&
              customGroups.length > SIDEBAR_DEFAULT_GROUPS_LIMIT && (
                <li
                  role="button"
                  onClick={onShowMoreGroups}
                  className="flex items-center flex-1 py-2 pl-4 text-xs font-normal text-gray-500 transition-all hover:text-primary-500">
                  Show more
                </li>
              )}

            {/* <li
              role="button"
              onClick={onClickCreate}
              className="flex items-center flex-1 py-2 pl-4 mt-1 space-x-2 text-sm font-normal text-gray-500 transition-all rounded-md hover:bg-neutral-900 hover:text-white">
              Add a new group
            </li> */}
          </ul>
        </>
      )}

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />

      <CreateGroupDialog
        isOpen={isOpenCreateGroupDialog}
        onClose={onCloseCreateGroupDialog}
      />
    </li>
  );
};

export default ElemMyGroupsMenu;
