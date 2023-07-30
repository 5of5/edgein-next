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
import { EmojiHot, EmojiLike, EmojiCrap } from '@/components/emojis';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { CreateListDialog } from '../my-list/create-list-dialog';
import { Disclosure, Popover, Transition } from '@headlessui/react';
import useDisclosureState from '@/hooks/use-disclosure-state';
import { listsSortOptions, MY_LISTS_MENU_OPEN_KEY } from '@/utils/constants';

type Props = {
  className?: string;
};

const ElemMyListsMenu: FC<Props> = ({ className = '' }) => {
  const router = useRouter();
  const { listAndFollows: lists, user } = useUser();

  const userCanSortLists = user?.entitlements.viewEmails
    ? user?.entitlements.viewEmails
    : false;

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

  // let sortedLists = [...displayedCustomLists];
  // if (selectedSortOption === "default") {
  // 	const partLists = partition(
  // 		displayedCustomLists,
  // 		(o) => o.created_by_id === user?.id
  // 	);
  // 	const createdLists = orderBy(
  // 		partLists[0],
  // 		[(o) => getNameFromListName(o)],
  // 		["asc"]
  // 	);
  // 	const followedLists = orderBy(
  // 		partLists[1],
  // 		[(o) => getNameFromListName(o)],
  // 		["asc"]
  // 	);
  // 	sortedLists = [...createdLists, ...followedLists];
  // } else if (selectedSortOption === "newest") {
  // 	sortedLists = orderBy(
  // 		displayedCustomLists,
  // 		[(o) => new Date(o.created_at)],
  // 		["desc"]
  // 	);
  // } else if (selectedSortOption === "recently") {
  // 	sortedLists = orderBy(
  // 		displayedCustomLists,
  // 		[(o) => new Date(o.updated_at)],
  // 		["desc"]
  // 	);
  // }

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

  return (
    <div className={className}>
      <Disclosure defaultOpen={isDefaultOpen}>
        {({ open }) => (
          <>
            <div className="w-full flex items-center justify-between">
              <Disclosure.Button
                className="flex items-center grow space-x-2 py-1.5 px-2 focus:outline-none"
                data-expanded={open}
                ref={btnRef}
                onClick={onDisclosureButtonClick}
              >
                <IconChevronDownMini
                  className={`${
                    open ? 'rotate-0' : '-rotate-90 '
                  } w-6 h-6 transform transition-all`}
                />
                <span className="font-medium text-sm">Lists</span>
              </Disclosure.Button>

              {getCustomLists.length > totalListCount ? (
                <button
                  onClick={onOpenUpgradeDialog}
                  className="flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <IconPlusSmall className="h-6 w-6" title="Create List" />
                </button>
              ) : (
                <button
                  onClick={onOpenCreateListDialog}
                  className="flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <IconPlusSmall className="h-6 w-6" title="Create List" />
                </button>
              )}
            </div>

            <Disclosure.Panel as="ul" className="ml-8">
              <li role="button">
                <Link href={`/lists/${hotId}/hot`}>
                  <a
                    className={`flex items-center space-x-2 py-1.5 px-2 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 ${getActiveClass(
                      hotId,
                      'hot',
                    )} `}
                  >
                    {/* <EmojiHot className="h-6 w-6" /> */}
                    <span className="flex-1">Hot</span>
                    <div className="bg-gray-100 inline-block rounded-full py-0.5 px-2 text-xs">
                      {getCountForList('hot')}
                    </div>
                  </a>
                </Link>
              </li>
              <li role="button">
                <Link href={`/lists/${likeId}/like`}>
                  <a
                    className={`flex items-center space-x-2 py-1.5 px-2 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 ${getActiveClass(
                      likeId,
                      'like',
                    )}`}
                  >
                    {/* <EmojiLike className="h-6 w-6" /> */}
                    <span className="flex-1">Like</span>
                    <div className="bg-gray-100 inline-block rounded-full py-0.5 px-2 text-xs">
                      {getCountForList('like')}
                    </div>
                  </a>
                </Link>
              </li>
              <li role="button">
                <Link href={`/lists/${crapId}/sh**`}>
                  <a
                    className={`flex items-center space-x-2 py-1.5 px-2 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 ${getActiveClass(
                      crapId,
                      'sh**',
                    )} `}
                  >
                    {/* <EmojiCrap className="h-6 w-6" /> */}
                    <span className="flex-1">Sh**</span>
                    <div className="bg-gray-100 inline-block rounded-full py-0.5 px-2 text-xs">
                      {getCountForList('crap')}
                    </div>
                  </a>
                </Link>
              </li>

              {createdLists?.map(list => (
                <li key={list.id} role="button">
                  <Link
                    href={`/lists/${list.id}/${kebabCase(
                      getNameFromListName(list),
                    )}`}
                  >
                    <a
                      className={`flex items-center space-x-2 py-1.5 px-2 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 ${getActiveClass(
                        list.id,
                        kebabCase(getNameFromListName(list)),
                      )}`}
                      title={getNameFromListName(list)}
                    >
                      <IconCustomList className="h-6 w-6 shrink-0" />
                      <span className="line-clamp-1 break-all flex-1">
                        {getNameFromListName(list)}
                      </span>
                      <div className="bg-gray-100 inline-block rounded-full py-0.5 px-2 text-xs">
                        {list.total_no_of_resources}
                      </div>
                    </a>
                  </Link>
                </li>
              ))}

              {/* {sortedLists?.map((list) => (
								<li key={list.id} role="button">
									<Link
										href={`/lists/${list.id}/${kebabCase(
											getNameFromListName(list)
										)}`}
									>
										<a
											className={`flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
												list.id,
												kebabCase(getNameFromListName(list))
											)}`}
											title={getNameFromListName(list)}
										>
											<IconCustomList className="h-6 w-6 shrink-0" />
											<span className="line-clamp-1 break-all flex-1">
												{getNameFromListName(list)}
											</span>
											<div className="bg-slate-200 inline-block rounded-full font-medium py-0.5 px-2 text-xs">
												{list.total_no_of_resources}
											</div>
										</a>
									</Link>
								</li>
							))} */}
            </Disclosure.Panel>
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
