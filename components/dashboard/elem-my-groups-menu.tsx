import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconSidebarGroups } from '@/components/icons';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { SIDEBAR_DEFAULT_GROUPS_LIMIT } from '@/utils/constants';
import { GROUPS, SIGN_IN } from '@/routes';
import ElemCreateGroupDialog from '../group/elem-create-group-dialog';
import { ElemWithSignInModal } from '../elem-with-sign-in-modal';
import { ElemSidebarItem } from './elem-sidebar-item';

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

  const getActiveClass = (id: number) => {
    return `${GROUPS}/${id}/` === router.asPath
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
    router.push(SIGN_IN);
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
      <div className="w-full flex items-center justify-between group">
        {user ? (
          <ElemSidebarItem
            url={GROUPS}
            text="Groups"
            IconComponent={IconSidebarGroups}
          />
        ) : (
          <ElemWithSignInModal
            wrapperClass="w-full"
            text="Sign in to collaborate on notes, share insights, and track leads in one group with your team or friends."
            buttonComponent={open => (
              <button
                className={`${
                  open ? 'bg-gray-100' : ''
                } flex w-full items-center space-x-3 p-2.5 font-medium text-sm text-gray-900 rounded-md flex-1 transition-all hover:bg-gray-100`}
              >
                <IconSidebarGroups
                  className={`w-5 h-5 ${
                    open ? 'text-primary-500' : 'text-gray-900'
                  }`}
                />
                <p className="font-medium text-sm text-gray-900">Groups</p>
              </button>
            )}
          />
        )}
      </div>

      {user && (
        <ul className="mt-1 space-y-1">
          {displayedGroups
            .slice(0, SIDEBAR_DEFAULT_GROUPS_LIMIT)
            ?.map(group => {
              return (
                <li key={group.id} role="button">
                  <Link href={`${GROUPS}/${group.id}/`}>
                    <a
                      className={`flex items-center space-x-2 py-2 pl-4 font-medium text-sm text-gray-500 rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900 ${getActiveClass(
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

          <li
            role="button"
            onClick={onClickCreate}
            className="flex items-center space-x-2 py-2 pl-4 mt-1 font-normal text-sm text-gray-500 rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900"
          >
            Add a new group
          </li>
        </ul>
      )}

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
