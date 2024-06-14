import { FC, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  IconGlobe,
  IconLockClosed,
  IconSidebarGroups,
} from '@/components/icons';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { SIDEBAR_DEFAULT_GROUPS_LIMIT } from '@/utils/constants';
import { ROUTES } from '@/routes';
import ElemCreateGroupDialog from '../group/elem-create-group-dialog';
import { ElemWithSignInModal } from '../elem-with-sign-in-modal';
import { ElemSidebarItem } from './elem-sidebar-item';
import { ElemLink } from '../elem-link';
import { useSidebar } from '@/context/sidebar-context';
import { InputText } from '../input-text';
import { ElemButton } from '../elem-button';
import { ElemTooltip } from '../elem-tooltip';
import { formatDateShown, numberWithCommas } from '@/utils';
import { startCase } from 'lodash';

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
      ? 'bg-gray-100 text-gray-900'
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
                open ? 'bg-gray-100' : ''
              } flex w-full items-center space-x-3 p-2.5 font-medium text-sm text-gray-900 rounded-md flex-1 transition-all hover:bg-gray-100`}>
              <IconSidebarGroups
                className={`w-5 h-5 ${
                  open ? 'text-primary-500' : 'text-gray-900'
                }`}
              />
              <p className="text-sm font-medium text-gray-900">Groups</p>
            </button>
          )}
        />
      )}

      {user && (
        <>
          <InputText
            type="text"
            onChange={handleSearchTextChange}
            value={searchText}
            name="name"
            autoComplete="off"
            placeholder="Find group..."
            className="mt-2 ring-1 ring-gray-200"
          />

          <ul className="mt-1 space-y-1">
            {filteredGroups
              .slice(
                0,
                limitGroups
                  ? SIDEBAR_DEFAULT_GROUPS_LIMIT
                  : customGroups.length,
              )
              ?.map(group => {
                const groupTooltip = (
                  <div className="flex-col p-2 group">
                    <div className="flex items-center gap-x-2">
                      {group.public ? (
                        <IconGlobe className="block w-4 h-4 shrink-0" />
                      ) : (
                        <IconLockClosed className="block w-4 h-4 shrink-0" />
                      )}

                      <ElemLink
                        href={`${ROUTES.GROUPS}/${group.id}/`}
                        className="block font-medium leading-snug text-gray-900 line-clamp-2 hover:underline">
                        {group.name}
                      </ElemLink>
                      <div className="px-2 py-0.5 text-xs border border-gray-200 rounded-full">
                        {group.public ? 'Public' : 'Private'}
                      </div>
                    </div>

                    {group.description && (
                      <div className="mt-3 text-sm font-normal text-gray-500 line-clamp-4">
                        {group.description}
                      </div>
                    )}

                    <div className="grid grid-cols-2 mt-3 text-xs gap-x-6 gap-y-2">
                      <div className="capitalize">
                        {group?.created_by?.person ? (
                          <>
                            By{' '}
                            <ElemLink
                              href={`${ROUTES.PEOPLE}/${group?.created_by?.person?.slug}`}
                              className="hover:underline">
                              {group?.created_by?.person.name}
                            </ElemLink>
                          </>
                        ) : (
                          <>
                            By{' '}
                            {startCase(
                              group?.created_by?.display_name
                                ? group?.created_by.display_name
                                : '',
                            )}
                          </>
                        )}
                      </div>
                      <div>Updated {formatDateShown(group.updated_at)}</div>
                      <div>
                        {numberWithCommas(
                          group.list_user_groups.length
                            ? group.list_user_groups.length
                            : 0,
                        )}{' '}
                        List
                        {group.list_user_groups.length &&
                        group.list_user_groups.length === 1
                          ? ''
                          : 's'}
                      </div>

                      <div>
                        {numberWithCommas(
                          group.notes.length ? group.notes.length : 0,
                        )}{' '}
                        Note
                        {group.notes.length && group.notes.length === 1
                          ? ''
                          : 's'}
                      </div>
                    </div>
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
                          className={`flex items-center space-x-2 py-2 pl-4 font-medium text-sm text-gray-500 rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900 ${getActiveClass(
                            group.id,
                          )}`}
                          title={group.name}>
                          <span className="break-all line-clamp-1">
                            {group.name}
                          </span>
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
              className="flex items-center flex-1 py-2 pl-4 mt-1 space-x-2 text-sm font-normal text-gray-500 transition-all rounded-md hover:bg-gray-100 hover:text-gray-900">
              Add a new group
            </li> */}
          </ul>
        </>
      )}

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />

      <ElemCreateGroupDialog
        isOpen={isOpenCreateGroupDialog}
        onClose={onCloseCreateGroupDialog}
      />
    </li>
  );
};

export default ElemMyGroupsMenu;
