import { ElemButton } from './elem-button';
import { ElemPhoto } from '@/components/elem-photo';
import { Popover, Transition } from '@headlessui/react';
import React, { Fragment, FC } from 'react';
import { IconUserCircle } from './icons';
import { useUser } from '@/context/user-context';
import Link from 'next/link';
import UserService from '@/utils/users';

type Props = {
  className?: string;
};

export const UserMenu: FC<Props> = ({ className = '' }) => {
  const { user } = useUser();

  const userMenuItems = [
    {
      label: 'Account Settings',
      href: '/account',
    },
    {
      label: 'Profile Settings',
      href: '/profile',
    },
    {
      label: 'Sign out',
      onClick: UserService.logout,
    },
  ];

  return (
    <Popover className="relative">
      {user?.person?.picture ? (
        <Popover.Button className="focus:outline-none">
          <ElemPhoto
            photo={user?.person?.picture}
            wrapClass="flex items-center justify-center shrink-0 w-9 h-9 bg-white rounded-full shadow border border-black/10"
            imgClass="object-cover max-w-full max-h-full rounded-full"
            imgAlt={'profile'}
            placeholder="user"
            placeholderClass="text-slate-400 hover:text-slate-400"
          />
        </Popover.Button>
      ) : (
        <Popover.Button as="div">
          <ElemButton
            btn="default"
            className="h-9 aspect-square !px-1 !py-1.5 group"
          >
            <IconUserCircle
              className="h-6 w-6 shrink-0"
              title={user?.display_name ? user.display_name : ''}
            />
          </ElemButton>
        </Popover.Button>
      )}

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 mt-2 right-0 w-56 block bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
          {({ close }) => (
            <div>
              <div className="w-full text-left text-sm px-4 py-2 border-b border-gray-200">
                Signed in as
                <div className="font-medium">{user?.email}</div>
              </div>
              {userMenuItems.map((item, index) => (
                <Link href={item.href ? item.href : ''} key={index}>
                  <a
                    className="flex items-center gap-x-2 cursor-pointer w-full text-left text-sm px-4 py-2 m-0 transition-all hover:bg-gray-100"
                    onClick={() => {
                      item.onClick && item.onClick();
                      close();
                    }}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
