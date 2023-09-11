import { getNameFromListName } from '@/utils/reaction';
import { kebabCase, partition, startCase } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { IconSidebarList } from '@/components/icons';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { CreateListDialog } from '../my-list/create-list-dialog';
import { SIDEBAR_DEFAULT_LISTS_LIMIT } from '@/utils/constants';

type Props = {
  className?: string;
};

const ElemMyListsMenu: FC<Props> = ({ className = '' }) => {
  const router = useRouter();
  const { listAndFollows: lists, user } = useUser();

  const getActiveClass = (id: number, name: string) => {
    return `/lists/${id}/${name}/` === router.asPath
      ? 'bg-gray-100 text-gray-900'
      : 'text-gray-500';
  };

  const getCustomLists = lists?.filter(
    list => !['hot', 'crap', 'like'].includes(getNameFromListName(list)),
  );
  //.sort((a, b) => (a.name < b.name ? -1 : 1));

  const displayedCustomLists = getCustomLists.slice(
    0,
    user?.entitlements.listsCount
      ? user?.entitlements.listsCount
      : getCustomLists.length,
  );

  const partLists = partition(
    displayedCustomLists,
    o => o.created_by_id === user?.id,
  );

  const createdLists = [...partLists[0]];
  const followedLists = [...partLists[1]];

  const totalListCount = createdLists?.length + followedLists?.length;

  const [isOpenCreateListDialog, setIsOpenCreateGroupDialog] = useState(false);
  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const onOpenCreateListDialog = () => {
    setIsOpenCreateGroupDialog(true);
  };
  const onCloseCreateListDialog = () => {
    setIsOpenCreateGroupDialog(false);
  };

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const onRedirectToSignIn = () => {
    router.push('/sign-in');
  };

  const onClickCreate = () => {
    if (!user) {
      return onRedirectToSignIn();
    }

    if (getCustomLists.length > totalListCount) {
      return onOpenUpgradeDialog();
    }

    return onOpenCreateListDialog();
  };

  return (
    <div className={className}>
      <div className="w-full flex items-center justify-between">
        {user ? (
          <Link href="/lists">
            <a
              className={`${
                router.asPath.includes('/lists') ? 'bg-gray-100' : ''
              } flex items-center space-x-3 p-2.5 font-medium text-sm text-gray-900 rounded-md flex-1 transition-all hover:bg-gray-100`}
            >
              <IconSidebarList
                className={`w-5 h-5 ${
                  router.asPath.includes('/lists')
                    ? 'text-primary-500'
                    : 'text-gray-900'
                }`}
              />
              <span className="text-sm">Lists</span>
            </a>
          </Link>
        ) : (
          <div className="flex items-center space-x-3 px-2.5 py-1">
            <IconSidebarList
              className={`w-5 h-5 ${
                router.asPath.includes('/lists')
                  ? 'text-primary-500'
                  : 'text-gray-900'
              }`}
            />
            <p className="font-medium text-sm text-gray-900">Lists</p>
          </div>
        )}
      </div>

      {user && (
        <ul className="mt-1 space-y-1">
          {lists.slice(0, SIDEBAR_DEFAULT_LISTS_LIMIT).map(listItem => {
            const listItemId = listItem.id;

            const listItemName = getNameFromListName(listItem);

            return (
              <li key={listItemId} role="button">
                <Link
                  href={`/lists/${listItemId}/${
                    listItemName === 'crap' ? 'sh**' : kebabCase(listItemName)
                  }`}
                >
                  <a
                    className={`flex items-center space-x-2 py-2 pl-4 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900 ${getActiveClass(
                      listItemId,
                      listItemName === 'crap'
                        ? 'sh**'
                        : kebabCase(listItemName),
                    )} `}
                  >
                    <span className="line-clamp-1 break-all flex-1">
                      {listItemName === 'crap'
                        ? 'Sh**'
                        : startCase(listItemName)}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}

          <li
            role="button"
            onClick={onClickCreate}
            className="flex items-center space-x-2 py-2 pl-4 mt-1 font-normal text-sm text-gray-500 rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900"
          >
            Add a new list
          </li>
        </ul>
      )}

      <CreateListDialog
        isOpen={isOpenCreateListDialog}
        onClose={onCloseCreateListDialog}
      />

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};

export default ElemMyListsMenu;
