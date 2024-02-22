import { getNameFromListName } from '@/utils/reaction';
import kebabCase from 'lodash/kebabCase';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { IconSidebarList } from '@/components/icons';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { CreateListDialog } from '../my-list/create-list-dialog';
import { SIDEBAR_DEFAULT_LISTS_LIMIT } from '@/utils/constants';
import { getListDisplayName } from '@/utils/lists';
import { ElemWithSignInModal } from '../elem-with-sign-in-modal';
import { ElemSidebarItem } from './elem-sidebar-item';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';
import { useSidebar } from '@/context/sidebar-context';

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

  const getCustomLists = lists?.filter(
    list => !['hot', 'crap', 'like'].includes(getNameFromListName(list)),
  );

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

  const onClickCreate = () => {
    if (
      user?.entitlements?.listsCount &&
      getCustomLists.length > user.entitlements.listsCount
    ) {
      return onOpenUpgradeDialog();
    }

    return onOpenCreateListDialog();
  };

  return (
    <li className={className}>
      {user ? (
        <ElemSidebarItem
          IconComponent={IconSidebarList}
          text="Lists"
          url={ROUTES.LISTS}
          onClick={() => setShowSidebar(false)}
        />
      ) : (
        <ElemWithSignInModal
          wrapperClass="w-full"
          text="Sign in to use lists for tracking and updates on interesting companies, investors, and people."
          buttonComponent={open => (
            <button
              className={`${
                open ? 'bg-gray-100' : ''
              } flex w-full items-center space-x-3 p-2.5 font-medium text-sm text-gray-900 rounded-md flex-1 transition-all hover:bg-gray-100`}
            >
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
        <ul className="mt-1 space-y-1">
          {lists.slice(0, SIDEBAR_DEFAULT_LISTS_LIMIT).map(listItem => {
            const listItemId = listItem.id;
            const listItemName = getNameFromListName(listItem);

            return (
              <li
                key={listItem.id}
                role="button"
                onClick={() => setShowSidebar(false)}
              >
                <ElemLink
                  href={`${ROUTES.LISTS}/${listItemId}/${
                    listItemName === 'crap' ? 'sh**' : kebabCase(listItemName)
                  }`}
                  className={`flex items-center space-x-2 py-2 pl-4 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900 ${getActiveClass(
                    listItemId,
                    listItemName === 'crap' ? 'sh**' : kebabCase(listItemName),
                  )} `}
                >
                  <span className="flex-1 break-all line-clamp-1">
                    {getListDisplayName(listItem)}
                  </span>
                </ElemLink>
              </li>
            );
          })}

          <li
            role="button"
            onClick={onClickCreate}
            className="flex items-center flex-1 py-2 pl-4 mt-1 space-x-2 text-sm font-normal text-gray-500 transition-all rounded-md hover:bg-gray-100 hover:text-gray-900"
          >
            Add a new list
          </li>
        </ul>
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
