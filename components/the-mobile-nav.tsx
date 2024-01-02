import {
  FC,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
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
  IconHome,
  IconUserGroup,
} from '@/components/icons';
import { Transition } from '@headlessui/react';
import { ElemPhoto } from '@/components/elem-photo';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/router';
import { Popups } from '@/components/the-navbar';
import UserService from '@/utils/users';
import { ExploreMenuItem } from '@/types/common';
import { ROUTES } from '@/routes';
import { ElemLink } from './elem-link';
import { navigation } from './the-footer';

type Props = {
  className?: string;
  setShowPopup: Dispatch<SetStateAction<Popups>>;
};

export const TheMobileNav: FC<PropsWithChildren<Props>> = ({
  className = '',
  setShowPopup,
}) => {
  const { user, unreadNotificationsCount } = useUser();

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

  const baseNav: ExploreMenuItem[] = [
    {
      icon: IconCompanies,
      title: 'Companies',
      href: ROUTES.COMPANIES,
    },
    {
      icon: IconCash,
      title: 'Investors',
      href: ROUTES.INVESTORS,
    },
    {
      icon: IconUserGroup,
      title: 'People',
      href: ROUTES.PEOPLE,
    },
  ];

  const bottomNav: ExploreMenuItem[] = [
    ...(user
      ? [
          {
            href: ROUTES.HOME,
            icon: IconHome,
            title: 'Home',
          },
        ]
      : []),
    ...baseNav,
    {
      icon: IconBell,
      title: 'Notifications',
      href: ROUTES.NOTIFICATIONS,
    },
  ];

  const menuPanel: ExploreMenuItem[] = [
    ...(user
      ? [
          {
            icon: IconCustomList,
            title: 'Lists',
            href: ROUTES.LISTS,
          },
          {
            icon: IconGroup,
            title: 'Groups',
            href: ROUTES.GROUPS,
          },
          {
            icon: IconDocumentDownload,
            title: 'Notes',
            href: ROUTES.NOTES,
          },
        ]
      : []),
    ...baseNav,
    {
      icon: IconCalendar,
      title: 'Events',
      href: ROUTES.EVENTS,
    },
    {
      icon: IconNewspaper,
      title: 'News',
      href: ROUTES.NEWS,
    },
    ...(user
      ? [
          {
            icon: IconSettings,
            title: 'Account Settings',
            href: ROUTES.ACCOUNT,
          },
        ]
      : []),
  ];
  return (
    <>
      <div
        className={`fixed z-50 w-full items-center shadow-up transition-all lg:hidden bottom-0 ${className}`}
      >
        <ul
          className={`grid ${
            user ? 'grid-cols-6' : 'grid-cols-5'
          } w-full bg-white px-0.5 pb-0.5`}
        >
          {bottomNav.map((item, index) => (
            <li
              key={index}
              className={`pt-0.5 ${
                router.pathname == item?.href && navOpen === false
                  ? 'border-t-2 border-primary-500'
                  : 'border-t-2 border-transparent'
              }`}
            >
              <ElemLink
                href={item?.href ? item.href : ''}
                onClick={onClose}
                className="flex flex-col items-center h-full text-[11px]"
              >
                {item?.icon && (
                  <div className="relative flex items-center justify-center h-7 aspect-square">
                    {unreadNotificationsCount > 0 &&
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
              </ElemLink>
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
          <div className="bg-gray-50 h-screen pb-20 overflow-auto">
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
            <div className="grid grid-cols-2 gap-4 px-4">
              {menuPanel.map((item, index) => (
                <ElemLink
                  key={index}
                  href={item?.href ? item.href : ''}
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
                </ElemLink>
              ))}
              {!user && (
                <ElemButton
                  onClick={() => router.push(ROUTES.COMPANIES)}
                  btn="primary"
                  className="col-span-2 w-full !p-3 !rounded-lg"
                >
                  Start for free
                </ElemButton>
              )}
              {navigation.resources.map(item => (
                <ElemLink
                  key={item.name}
                  href={item?.href ? item.href : ''}
                  onClick={onClose}
                  className="col-span-2 p-3 outline-none text-sm bg-white shadow rounded-lg"
                >
                  {item.name}
                </ElemLink>
              ))}
              {navigation.company.map(item => (
                <ElemLink
                  key={item.name}
                  href={item?.href ? item.href : ''}
                  onClick={onClose}
                  className="col-span-2 p-3 outline-none text-sm bg-white shadow rounded-lg"
                >
                  {item.name}
                </ElemLink>
              ))}

              {user && (
                <ElemButton
                  btn="gray"
                  roundedFull={false}
                  onClick={() => {
                    UserService.logout();
                    setNavOpen(false);
                  }}
                  className="col-span-2 w-full !p-3 !rounded-lg"
                >
                  Sign out
                </ElemButton>
              )}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};
