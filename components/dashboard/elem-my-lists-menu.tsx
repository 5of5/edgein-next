import { getNameFromListName } from '@/utils/reaction';
import { find, kebabCase, partition, orderBy } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, Fragment, useState } from 'react';
import {
  IconCustomList,
  IconChevronDownMini,
  IconPlusSmall,
} from '@/components/icons';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { CreateListDialog } from '../my-list/create-list-dialog';
import { Disclosure } from '@headlessui/react';
import useDisclosureState from '@/hooks/use-disclosure-state';
import {
  MY_LISTS_MENU_OPEN_KEY,
  SIDEBAR_DEFAULT_LISTS_LIMIT,
} from '@/utils/constants';

type Props = {
  className?: string;
};

const ElemMyListsMenu: FC<Props> = ({ className = '' }) => {
  const router = useRouter();
  const { listAndFollows: lists, user } = useUser();

  const { btnRef, isDefaultOpen, onDisclosureButtonClick } = useDisclosureState(
    MY_LISTS_MENU_OPEN_KEY,
  );

  const [selectedSortOption, setSelectedSortOption] = useState(
    typeof window !== 'undefined' && localStorage.getItem('myListsSortOption')
      ? localStorage.getItem('myListsSortOption')
      : 'default',
  );

  const getCountForList = (listName: string) => {
    if (lists) {
      const list = find(lists, item => getNameFromListName(item) === listName);
      return list?.total_no_of_resources ?? 0;
    }
    return 0;
  };

  const getActiveClass = (id: number, name: string) => {
    return `/lists/${id}/${name}/` === router.asPath
      ? 'bg-gray-100 text-gray-900'
      : 'text-gray-600';
  };

  const hotId =
    find(lists, list => 'hot' === getNameFromListName(list))?.id || 0;
  const likeId =
    find(lists, list => 'like' === getNameFromListName(list))?.id || 0;
  const crapId =
    find(lists, list => 'crap' === getNameFromListName(list))?.id || 0;

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

  let createdLists = [...partLists[0]];
  let followedLists = [...partLists[1]];
  if (selectedSortOption === 'default') {
    const partLists = partition(
      displayedCustomLists,
      o => o.created_by_id === user?.id,
    );
    createdLists = orderBy(
      partLists[0],
      [o => getNameFromListName(o)],
      ['asc'],
    );
    followedLists = orderBy(
      partLists[1],
      [o => getNameFromListName(o)],
      ['asc'],
    );
  } else if (selectedSortOption === 'newest') {
    createdLists = orderBy(
      partLists[0],
      [o => new Date(o.created_at)],
      ['desc'],
    );
    followedLists = orderBy(
      partLists[1],
      [o => new Date(o.created_at)],
      ['desc'],
    );
  } else if (selectedSortOption === 'recently') {
    createdLists = orderBy(
      partLists[0],
      [o => new Date(o.updated_at)],
      ['desc'],
    );
    followedLists = orderBy(
      partLists[1],
      [o => new Date(o.updated_at)],
      ['desc'],
    );
  }
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

  const onClickHeader = () => {
    if (!user) {
      return onRedirectToSignIn();
    }

    return onDisclosureButtonClick;
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
      <Disclosure defaultOpen={isDefaultOpen}>
        {({ open }) => (
          <>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center grow space-x-2 p-2">
                <Disclosure.Button
                  className="focus:outline-none"
                  data-expanded={open}
                  ref={btnRef}
                  onClick={onClickHeader}
                >
                  {user && (
                    <IconChevronDownMini
                      className={`rounded-md hover:bg-gray-100 ${
                        open ? 'rotate-0' : '-rotate-90 '
                      } w-5 h-5 transform transition-all`}
                    />
                  )}
                </Disclosure.Button>
                {user ? (
                  <Link href="/lists">
                    <a className="font-medium text-sm">Lists</a>
                  </Link>
                ) : (
                  <p className="font-medium text-sm">Lists</p>
                )}
              </div>

              <button
                onClick={onClickCreate}
                className="flex items-center justify-center rounded-md hover:bg-gray-100"
              >
                <IconPlusSmall className="h-5 w-5" title="Create List" />
              </button>
            </div>

            {user && (
              <Disclosure.Panel as="ul" className="ml-2">
                <li role="button">
                  <Link href={`/lists/${hotId}/hot`}>
                    <a
                      className={`flex items-center space-x-2 py-2 pl-7 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900 ${getActiveClass(
                        hotId,
                        'hot',
                      )} `}
                    >
                      <span className="flex-1">Hot</span>
                      <div className="bg-gray-100 inline-block rounded-full py-0.5 px-2 text-sm">
                        {getCountForList('hot')}
                      </div>
                    </a>
                  </Link>
                </li>
                <li role="button">
                  <Link href={`/lists/${likeId}/like`}>
                    <a
                      className={`flex items-center space-x-2 py-2 pl-7 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900 ${getActiveClass(
                        likeId,
                        'like',
                      )}`}
                    >
                      <span className="flex-1">Like</span>
                      <div className="bg-gray-100 inline-block rounded-full py-0.5 px-2 text-sm">
                        {getCountForList('like')}
                      </div>
                    </a>
                  </Link>
                </li>
                <li role="button">
                  <Link href={`/lists/${crapId}/sh**`}>
                    <a
                      className={`flex items-center space-x-2 py-2 pl-7 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900 ${getActiveClass(
                        crapId,
                        'sh**',
                      )} `}
                    >
                      <span className="flex-1">Sh**</span>
                      <div className="bg-gray-100 inline-block rounded-full py-0.5 px-2 text-sm">
                        {getCountForList('crap')}
                      </div>
                    </a>
                  </Link>
                </li>
                {createdLists
                  .slice(0, SIDEBAR_DEFAULT_LISTS_LIMIT)
                  ?.map(list => {
                    return (
                      <li key={list.id} role="button">
                        <Link
                          href={`/lists/${list.id}/${kebabCase(
                            getNameFromListName(list),
                          )}`}
                        >
                          <a
                            className={`flex items-center space-x-2 py-2 pl-7 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900 ${getActiveClass(
                              list.id,
                              kebabCase(getNameFromListName(list)),
                            )}`}
                          >
                            <span className="line-clamp-1 break-all flex-1">
                              {getNameFromListName(list)}
                            </span>
                            <div className="bg-gray-100 inline-block rounded-full py-0.5 px-2 text-sm">
                              {list.total_no_of_resources}
                            </div>
                          </a>
                        </Link>
                      </li>
                    );
                  })}

                {createdLists.length === 0 && (
                  <li
                    role="button"
                    onClick={onClickCreate}
                    className="flex items-center space-x-2 py-2 pl-7 font-medium text-sm text-gray-500 rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900"
                  >
                    Add a new list
                  </li>
                )}

                {createdLists.length > SIDEBAR_DEFAULT_LISTS_LIMIT && (
                  <li role="button">
                    <Link href="/lists/">
                      <a className="flex items-center space-x-2 py-2 pl-7 font-medium text-sm text-gray-500 rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900">
                        See all
                      </a>
                    </Link>
                  </li>
                )}
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>

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
