import { ElemButton } from './elem-button';
import { ElemPhoto } from '@/components/elem-photo';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, FC } from 'react';
import {
  IconUserCircle,
  IconSignOut,
  IconGroup,
  IconSettings,
  IconContributor,
  IconCustomList,
} from './icons';
import { useUser } from '@/context/user-context';
import Link from 'next/link';
import UserService from '@/utils/users';

type Props = {
  className?: string;
  onShowUpgrade: () => void;
};

export const UserMenu: FC<Props> = ({ className = '', onShowUpgrade }) => {
  const { user } = useUser();

  const showUpgradeLink = user?.entitlements.viewEmails === false;

  const navigation = [];

  if (user) {
    navigation.push({
      name: 'My Lists',
      href: '/lists',
      icon: IconCustomList,
    });
  }

  navigation.push({
    name: 'My Groups',
    href: '/groups',
    icon: IconGroup,
  });

  navigation.push({
    name: 'Account Settings',
    href: '/account',
    icon: IconSettings,
  });

  //eslint-disable-next-line react/display-name
  const NextLink = React.forwardRef((props: any, ref: any) => {
    const { href, children, ...rest } = props;
    return (
      <Link href={href}>
        <a {...rest} ref={ref}>
          {children}
        </a>
      </Link>
    );
  });

  return (
    <Menu
      as="div"
      className={`relative hidden lg:relative lg:flex lg:items-center ${className}`}
    >
      <Menu.Button className="relative ml-1 cursor-pointer" as="div">
        {user?.person?.picture ? (
          <ElemPhoto
            photo={user?.person?.picture}
            wrapClass="flex items-center justify-center shrink-0 w-9 h-9 bg-white rounded-full shadow border border-black/10"
            imgClass="object-cover max-w-full max-h-full rounded-full"
            imgAlt={'profile'}
            placeholder="user"
            placeholderClass="text-slate-400 hover:text-slate-400"
          />
        ) : (
          <ElemButton
            btn="slate"
            className="h-9 aspect-square !px-1 !py-1.5 group"
          >
            <IconUserCircle
              className="h-6 w-6 shrink-0"
              title={user?.display_name ? user.display_name : ''}
            />
          </ElemButton>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="nav"
          className="absolute overflow-hidden top-full right-0 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {navigation.map(link => (
            <Menu.Item key={link.name}>
              {({ active }) => (
                <NextLink
                  href={link.href}
                  className={`${
                    active ? 'bg-gray-50 text-primary-500' : ''
                  } flex w-full items-center px-2 py-2 hover:bg-gray-50 hover:text-primary-500`}
                >
                  <link.icon className="mr-2 h-6 w-6" aria-hidden="true" />
                  {link.name}
                </NextLink>
              )}
            </Menu.Item>
          ))}
          {showUpgradeLink && (
            <Menu.Item>
              <button
                onClick={onShowUpgrade}
                className="flex w-full items-center px-2 py-2 text-primary-500 hover:bg-gray-50"
              >
                <IconContributor className="mr-2 h-6 w-6" title="Upgrade" />
                Upgrade
              </button>
            </Menu.Item>
          )}

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={UserService.logout}
                className={`${
                  active ? 'bg-gray-50' : ''
                } hover:text-primary-500 flex w-full items-center px-2 py-2`}
              >
                <IconSignOut className="mr-2 h-6 w-6" />
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
