import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconChevronDownMini, IconPlusSmall } from '@/components/icons';
import { Disclosure } from '@headlessui/react';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import useDisclosureState from '@/hooks/use-disclosure-state';
import { MY_GROUPS_MENU_OPEN_KEY } from '@/utils/constants';
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
      ? '  text-primary-500 bg-slate-200'
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

  return (
    <div className={className}>
      <Disclosure defaultOpen={isDefaultOpen}>
        {({ open }) => (
          <>
            <div className="w-full flex items-center justify-between group">
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
                <span className="font-medium text-sm">Groups</span>
              </Disclosure.Button>

              {myGroups.length > displayedGroups.length ? (
                <button
                  onClick={onOpenUpgradeDialog}
                  className="flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <IconPlusSmall className="h-6 w-6" title="Create List" />
                </button>
              ) : (
                <button
                  onClick={onOpenCreateGroupDialog}
                  className="flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <IconPlusSmall className="h-6 w-6" title="Create List" />
                </button>
              )}
            </div>

            <Disclosure.Panel as="ul" className="ml-8">
              {displayedGroups?.map(group => (
                <li key={group.id} role="button">
                  <Link href={`/groups/${group.id}/`}>
                    <a
                      className={`flex items-center space-x-2 py-1.5 px-2 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 ${getActiveClass(
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
              ))}
            </Disclosure.Panel>
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
