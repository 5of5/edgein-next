import {
  FC,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
} from 'react';
import Link from 'next/link';
import { ElemButton } from './elem-button';
import {
  IconCash,
  IconCompanies,
  IconSettings,
  IconCustomList,
  IconGroup,
  IconCalendar,
  IconNewspaper,
  IconBell,
  IconDocumentDownload,
  IconUserCircle,
  IconSearch,
  IconX,
} from '@/components/icons';
import { Transition } from '@headlessui/react';
import { ElemPhoto } from '@/components/elem-photo';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/router';
import { Popups } from '@/components/the-navbar';
import UserService from '@/utils/users';
import { ExploreMenuItem } from '@/types/common';

type Props = {
  className?: string;
  setShowPopup: Dispatch<SetStateAction<Popups>>;
};

export const TheMobileNav: FC<PropsWithChildren<Props>> = ({
  className = '',
  setShowPopup,
}) => {
  const { user, unreadNotifications } = useUser();

  const router = useRouter();

  const [navOpen, setNavOpen] = useState(false);

  const onClose = () => {
    setNavOpen(false);
  };

  const onToggleMenu = () => {
    setNavOpen(prevNavOpen => !prevNavOpen);
  };

  const onOpenSearch = () => {
    setShowPopup('search');
    setNavOpen(false);
  };

  const baseNav: ExploreMenuItem[] = useMemo(
    () => [
      {
        icon: IconCompanies,
        title: 'Companies',
        href: '/companies',
      },
      {
        icon: IconCash,
        title: 'Investors',
        href: '/investors',
      },
      {
        icon: IconCalendar,
        title: 'Events',
        href: '/events',
      },
      {
        icon: IconNewspaper,
        title: 'News',
        href: '/news',
      },
    ],
    [],
  );

  const bottomNav: ExploreMenuItem[] = useMemo(
    () => [
      ...baseNav,
      {
        icon: IconBell,
        title: 'Notifications',
        href: '/notifications',
      },
    ],
    [baseNav],
  );

  const menuPanel: ExploreMenuItem[] = useMemo(
    () => [
      ...(user
        ? [
            {
              icon: IconDocumentDownload,
              title: 'Notes',
              href: '/notes',
            },
            {
              icon: IconGroup,
              title: 'Groups',
              href: '/groups',
            },
            {
              icon: IconCustomList,
              title: 'Lists',
              href: '/lists',
            },
          ]
        : []),
      ...baseNav,
      ...(user
        ? [
            {
              icon: IconSettings,
              title: 'Account Settings',
              href: '/account',
            },
          ]
        : []),
    ],
    [baseNav, user],
  );

  return (
    <>
      <div
        className={`fixed z-50 w-full b items-center shadow-up transition-all lg:hidden bottom-0 ${className}`}
      >
        <ul className="grid grid-cols-6 w-full bg-white px-0.5 pb-0.5">
          {bottomNav.map((item, index) => (
            <li
              key={index}
              className={`pt-0.5 ${
                router.pathname == item?.href && navOpen === false
                  ? 'border-t-2 border-primary-500'
                  : 'border-t-2 border-transparent'
              }`}
            >
              <Link href={item?.href ? item.href : ''}>
                <a
                  onClick={onClose}
                  className="flex flex-col items-center h-full text-[11px]"
                >
                  {item?.icon && (
                    <div className="relative flex items-center justify-center h-7 aspect-square">
                      {unreadNotifications.length > 0 &&
                        item.title === 'Notifications' && (
                          <div className="absolute -top-0.5 right-0 w-4 h-4 rounded-full from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r border-2 border-white"></div>
                        )}
                      <item.icon
                        title={item.title}
                        className="h-6 w-6 shrink-0 text-slate-600"
                      />
                    </div>
                  )}
                  {item?.title}
                </a>
              </Link>
            </li>
          ))}

          <li
            className={`pt-0.5 ${
              navOpen
                ? 'border-t-2 border-primary-500'
                : 'border-t-2 border-transparent'
            }`}
          >
            <a
              onClick={onToggleMenu}
              className="flex flex-col items-center h-full text-[11px] cursor-pointer"
            >
              {user?.person?.picture ? (
                <ElemPhoto
                  photo={user?.person?.picture}
                  wrapClass="flex items-center justify-center shrink-0 w-7 h-7 bg-white rounded-full shadow border border-black/10"
                  imgClass="object-cover max-w-full max-h-full rounded-full"
                  imgAlt={'profile'}
                  placeholder="user"
                  placeholderClass="text-slate-400 hover:text-slate-400"
                />
              ) : (
                <div className="flex items-center justify-center h-7 aspect-square">
                  <IconUserCircle
                    className="h-6 w-6 shrink-0"
                    title={user?.display_name ? user.display_name : ''}
                  />
                </div>
              )}
              Menu
            </a>
          </li>
        </ul>
      </div>
      <Transition
        show={navOpen}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="fixed -top-12 left-0 right-0 bottom-0 z-40">
          <div className="bg-gray-50 h-screen">
            <div className="flex justify-between items-center px-4 py-3">
              <p className="font-bold">Menu</p>
              <div className="flex space-x-2">
                <ElemButton
                  onClick={onOpenSearch}
                  btn="gray"
                  className="h-9 w-9 !px-0 !py-0"
                >
                  <IconSearch className="h-5 w-5" strokeWidth={1.5} />
                </ElemButton>
                <ElemButton
                  onClick={onClose}
                  btn="gray"
                  className="h-9 w-9 !px-0 !py-0 outline-none"
                >
                  <IconX className="h-5 w-5" />
                </ElemButton>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-4 px-4">
              {menuPanel.map((item, index) => (
                <li key={index}>
                  <Link href={item?.href ? item.href : ''}>
                    <a
                      onClick={onClose}
                      className="block p-3 outline-none bg-white shadow rounded-lg"
                    >
                      {item?.icon && (
                        <item.icon
                          title={item.title}
                          className="h-6 w-6 shrink-0"
                        />
                      )}
                      <span className="leading-tight">{item?.title}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="p-4">
              {user ? (
                <ElemButton
                  btn="gray"
                  roundedFull={false}
                  onClick={() => {
                    UserService.logout();
                    setNavOpen(false);
                  }}
                  className="w-full"
                >
                  Sign out
                </ElemButton>
              ) : (
                <ElemButton
                  onClick={() => router.push('/companies')}
                  btn="primary"
                  className="w-full"
                >
                  Start for free
                </ElemButton>
              )}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};
