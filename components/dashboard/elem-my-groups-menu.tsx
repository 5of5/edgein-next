import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconChevronDownMini, IconPlusSmall } from '@/components/icons';
import { Disclosure } from '@headlessui/react';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import useDisclosureState from '@/hooks/use-disclosure-state';
import {
  MY_GROUPS_MENU_OPEN_KEY,
  SIDEBAR_DEFAULT_GROUPS_LIMIT,
  SIDEBAR_LIMIT_ITEMS,
} from '@/utils/constants';
import ElemCreateGroupDialog from '../group/elem-create-group-dialog';

type Props = {
  className?: string;
};

const ElemMyGroupsMenu: FC<Props> = ({ className = '' }) => {
  const router = useRouter();
  const { myGroups, user } = useUser();
  const displayedGroups = myGroups.slice(
    0,
    user?.entitlements.groupsCount
      ? user?.entitlements.groupsCount
      : myGroups.length,
  );

  const [isOpenCreateGroupDialog, setIsOpenCreateGroupDialog] = useState(false);

  const { btnRef, isDefaultOpen, onDisclosureButtonClick } = useDisclosureState(
    MY_GROUPS_MENU_OPEN_KEY,
  );

  const getActiveClass = (id: number) => {
    return `/groups/${id}/` === router.asPath
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

  const onRedirectToSignIn = () => {
    router.push('/sign-in');
  };

  const onClickHeader = () => {
    if (!user) {
      return onRedirectToSignIn();
    }

    return onDisclosureButtonClick();
  };

  const onClickCreate = () => {
    if (!user) {
      return onRedirectToSignIn();
    }

    if (myGroups.length > displayedGroups.length) {
      return onOpenUpgradeDialog();
    }

    return onOpenCreateGroupDialog();
  };

  return (
    <div className={className}>
      <Disclosure defaultOpen={isDefaultOpen}>
        {({ open }) => (
          <>
            <div className="w-full flex items-center justify-between group">
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
                  <Link href="/groups">
                    <a className="font-medium text-sm">Groups</a>
                  </Link>
                ) : (
                  <p className="font-medium text-sm">Groups</p>
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
                {displayedGroups
                  .slice(0, SIDEBAR_DEFAULT_GROUPS_LIMIT)
                  ?.map(group => {
                    return (
                      <li key={group.id} role="button">
                        <Link href={`/groups/${group.id}/`}>
                          <a
                            className={`flex items-center space-x-2 py-2 pl-7 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900 ${getActiveClass(
                              group.id,
                            )}`}
                            title={group.name}
                          >
                            <span className="line-clamp-1 break-all">
                              {group.name}
                            </span>
                          </a>
                        </Link>
                      </li>
                    );
                  })}

                {myGroups.length === 0 && (
                  <li
                    role="button"
                    onClick={onClickCreate}
                    className="flex items-center space-x-2 py-2 pl-7 font-medium text-sm text-gray-500 rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900"
                  >
                    Add a new group
                  </li>
                )}

                {myGroups.length > SIDEBAR_LIMIT_ITEMS && (
                  <li role="button">
                    <Link href="/groups/">
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

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />

      <ElemCreateGroupDialog
        isOpen={isOpenCreateGroupDialog}
        onClose={onCloseCreateGroupDialog}
      />
    </div>
  );
};

export default ElemMyGroupsMenu;
