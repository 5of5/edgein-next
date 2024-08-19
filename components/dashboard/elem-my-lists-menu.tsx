import { startCase, kebabCase } from 'lodash';
import { useRouter } from 'next/router';
import { FC, SetStateAction, useEffect, useState } from 'react';
import {
  IconGlobeAmericas,
  IconLockClosed,
  IconSidebarList,
} from '@/components/icons';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { CreateListDialog } from '../my-list/create-list-dialog';
import { ElemWithSignInModal } from '../elem-with-sign-in-modal';
import { ElemSidebarItem } from './elem-sidebar-item';
import { InputText } from '@/components/input-text';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';
import { ElemButton } from '../elem-button';
import { SIDEBAR_DEFAULT_LISTS_LIMIT } from '@/utils/constants';
import { getNameFromListName, getListDisplayName } from '@/utils/lists';
import { formatDateShown, numberWithCommas } from '@/utils/numbers';
import { useSidebar } from '@/context/sidebar-context';
import { ElemTooltip } from '../elem-tooltip';

type Props = {
  className?: string;
};

const ElemMyListsMenu: FC<Props> = ({ className = '' }) => {
  const { showSidebar, setShowSidebar } = useSidebar();
  const { listAndFollows: lists, user } = useUser();
  const router = useRouter();

  const getActiveClass = (id: number, name: string) => {
    return `${ROUTES.LISTS}/${id}/${name}/` === router.asPath
      ? 'bg-gray-100 text-gray-900'
      : 'text-gray-500';
  };

  const [customLists, setCustomLists] = useState(
    lists?.filter(
      list => !['hot', 'crap', 'like'].includes(getNameFromListName(list)),
    ),
  );
  const [limitLists, setLimitLists] = useState(true);

  useEffect(() => {
    setCustomLists(
      lists.filter(
        list => !['hot', 'crap', 'like'].includes(getNameFromListName(list)),
      ),
    );
  }, [lists]);

  const [openCreateList, setOpenCreateList] = useState(false);
  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const onOpenCreateListDialog = () => {
    setOpenCreateList(true);
  };
  const onCloseCreateListDialog = () => {
    setOpenCreateList(false);
  };

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };

  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const onShowMoreLists = () => {
    setLimitLists(false);
  };

  const onClickCreate = () => {
    if (
      user?.entitlements?.listsCount &&
      customLists.length > user.entitlements.listsCount
    ) {
      return onOpenUpgradeDialog();
    }

    return onOpenCreateListDialog();
  };

  const [searchText, setSearchText] = useState('');
  const [filteredLists, setFilteredLists] = useState(customLists);

  const handleSearchTextChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText) {
      setFilteredLists(
        customLists.filter(list => {
          return getNameFromListName(list).toLowerCase().includes(searchText);
        }),
      );
      setLimitLists(false);
    } else {
      setFilteredLists(customLists);
      setLimitLists(true);
    }
  }, [searchText, customLists]);

  return (
    <li className={className}>
      {user ? (
        <div className="relative">
          <ElemSidebarItem
            IconComponent={IconSidebarList}
            text="Lists"
            url={ROUTES.LISTS}
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
          text="Sign in to use lists for tracking and updates on interesting companies, investors, and people."
          buttonComponent={open => (
            <button
              className={`${
                open ? 'bg-gray-100' : ''
              } flex w-full items-center space-x-3 p-2.5 font-medium text-sm text-gray-900 rounded-md flex-1 transition-all hover:bg-gray-100`}>
              <IconSidebarList
                className={`w-5 h-5 ${
                  open ? 'text-primary-500' : 'text-gray-900'
                }`}
              />
              <p className="text-sm font-medium text-gray-900">Lists</p>
            </button>
          )}
        />
      )}

      {user && (
        <>
          {customLists.length > SIDEBAR_DEFAULT_LISTS_LIMIT && (
            <InputText
              type="text"
              onChange={handleSearchTextChange}
              value={searchText}
              name="name"
              autoComplete="off"
              placeholder="Find list..."
              className="mt-2 ring-1 ring-gray-200"
            />
          )}

          <ul className="mt-1 space-y-1">
            {filteredLists
              ?.slice(
                0,
                limitLists ? SIDEBAR_DEFAULT_LISTS_LIMIT : customLists.length,
              )
              .map(list => {
                const listName = getNameFromListName(list);

                const totalItems = list.total_no_of_resources;

                const listUrl = `${ROUTES.LISTS}/${list.id}/${
                  listName === 'crap' ? 'sh**' : kebabCase(listName)
                }`;

                const listTooltip = (
                  <div className="flex-col p-2 group">
                    <div>
                      <ElemLink
                        href={listUrl}
                        className="text-lg font-medium leading-snug text-gray-900 line-clamp-2 hover:underline">
                        {listName}
                      </ElemLink>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center text-xs text-gray-500 font-normal gap-x-1 gap-y-0.5">
                      <ElemTooltip
                        content="Author"
                        mode="dark"
                        direction="bottom"
                        size="lg">
                        <div>
                          {list?.created_by?.person ? (
                            <ElemLink
                              href={`${ROUTES.PEOPLE}/${list?.created_by?.person?.slug}`}
                              className="capitalize hover:underline">
                              {list?.created_by?.person.name}
                            </ElemLink>
                          ) : (
                            <>
                              {startCase(
                                list?.created_by?.display_name
                                  ? list?.created_by.display_name
                                  : '',
                              )}
                            </>
                          )}
                        </div>
                      </ElemTooltip>
                      &middot;
                      <ElemTooltip
                        content={
                          <div className="p-1ext-sm">
                            Updated{' '}
                            {formatDateShown(list.updated_at, `LL [at] h:mmA`)}
                          </div>
                        }
                        mode="dark"
                        direction="bottom"
                        size="lg">
                        <div>{formatDateShown(list.updated_at, `ll`)}</div>
                      </ElemTooltip>
                      &middot;
                      <div>
                        {numberWithCommas(totalItems ? totalItems : 0)} item
                        {totalItems && totalItems > 1 && 's'}
                      </div>
                      &middot;
                      <ElemTooltip
                        content={
                          list.public
                            ? 'Shared with public'
                            : 'Visible only to you'
                        }
                        mode="dark"
                        direction="bottom"
                        size="lg">
                        <a
                          className="flex items-center gap-x-1 hover:underline"
                          href={listUrl}>
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
                        </a>
                      </ElemTooltip>
                    </div>

                    {list.description && (
                      <a
                        className="mt-3 text-sm font-normal text-gray-900 line-clamp-4"
                        href={listUrl}>
                        {list.description}
                      </a>
                    )}
                  </div>
                );

                return (
                  <li
                    key={list.id}
                    role="button"
                    onClick={() => setShowSidebar(false)}>
                    <ElemTooltip
                      content={listTooltip}
                      direction="top-start"
                      delay={350}
                      mode="light"
                      size="lg"
                      arrow={false}>
                      <div>
                        <ElemLink
                          href={`${ROUTES.LISTS}/${list.id}/${
                            listName === 'crap' ? 'sh**' : kebabCase(listName)
                          }`}
                          className={`flex items-center space-x-2 py-2 pl-4 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900 ${getActiveClass(
                            list.id,
                            listName === 'crap' ? 'sh**' : kebabCase(listName),
                          )} `}>
                          <span className="flex-1 break-all line-clamp-1">
                            {getListDisplayName(list)}
                          </span>
                        </ElemLink>
                      </div>
                    </ElemTooltip>
                  </li>
                );
              })}

            {limitLists && customLists.length > SIDEBAR_DEFAULT_LISTS_LIMIT && (
              <li
                role="button"
                onClick={onShowMoreLists}
                className="flex items-center flex-1 py-2 pl-4 text-xs font-normal text-gray-500 transition-all hover:text-primary-500">
                Show more
              </li>
            )}
          </ul>
        </>
      )}

      <CreateListDialog
        isOpen={openCreateList}
        onClose={onCloseCreateListDialog}
      />
      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </li>
  );
};

export default ElemMyListsMenu;
