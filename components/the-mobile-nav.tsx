import { FC, PropsWithChildren, useState } from 'react';
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
import { ElemPhoto } from '@/components/elem-photo';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/router';
import UserService from '@/utils/users';
import { ExploreMenuItem } from '@/types/common';
import { ROUTES } from '@/routes';
import { ElemLink } from './elem-link';
import { navigation } from './the-footer';
import { ElemModal } from './elem-modal';
import { usePopup } from '@/context/popup-context';

type Props = {};

export const TheMobileNav: FC<PropsWithChildren<Props>> = () => {
  const { setShowPopup } = usePopup();
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
          {
            icon: IconUserCircle,
            title: 'Profile Settings',
            href: ROUTES.PROFILE,
          },
        ]
      : []),
  ];

  const tabs: ExploreMenuItem[] = [
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

  return (
    <>
      <nav
        className={`fixed z-50 bottom-0 bg-dark-100 w-full h-14 px-0.5 shadow-up grid lg:hidden ${
          user ? 'grid-cols-6' : 'grid-cols-5'
        }`}>
        {tabs.map((item, index) => (
          <ElemLink
            key={index}
            href={item?.href ? item.href : ''}
            onClick={onClose}
            className={`flex flex-col items-center h-full text-[11px] pt-1 ${
              router.pathname == item?.href && navOpen === false
                ? 'border-t-2 border-primary-500'
                : 'border-t-2 border-transparent'
            }`}>
            {item?.icon && (
              <div className="relative flex items-center justify-center h-7 aspect-square">
                {unreadNotificationsCount > 0 &&
                  item.title === 'Notifications' && (
                    <div className="absolute -top-0.5 right-0 w-4 h-4 rounded-full bg-primary-500 border-2 border-white"></div>
                  )}
                <item.icon
                  title={item.title}
                  className="w-6 h-6 shrink-0 text-slate-600"
                />
              </div>
            )}
            {item?.title}
          </ElemLink>
        ))}

        <a
          onClick={onToggleMenu}
          className={`flex flex-col items-center h-full text-[11px] cursor-pointer pt-1 ${
            navOpen
              ? 'border-t-2 border-primary-500'
              : 'border-t-2 border-transparent'
          }`}>
          {user?.person?.picture ? (
            <ElemPhoto
              photo={user?.person?.picture}
              wrapClass="flex items-center justify-center shrink-0 w-7 h-7 bg-dark-100 rounded-full shadow border border-black/10"
              imgClass="object-cover max-w-full max-h-full rounded-full"
              imgAlt={'profile'}
              placeholder="user"
              placeholderClass="text-slate-400 hover:text-slate-400"
            />
          ) : (
            <div className="flex items-center justify-center h-7 aspect-square">
              <IconUserCircle
                className="w-6 h-6 shrink-0"
                title={user?.display_name ? user.display_name : ''}
              />
            </div>
          )}
          Menu
        </a>
      </nav>

      <ElemModal
        isOpen={navOpen}
        onClose={onClose}
        showCloseIcon={false}
        overlay={false}
        placement="topRight"
        transition="slideFromRight"
        panelClass="w-full h-full bg-dark-100 mb-14 pb-4">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="font-medium">Menu</h3>
          <div className="flex space-x-2">
            <ElemButton
              onClick={onOpenSearch}
              btn="default"
              className="h-9 w-9 !px-0 !py-0">
              <IconSearch className="w-5 h-5" strokeWidth={1.5} />
            </ElemButton>
            <ElemButton
              onClick={onClose}
              btn="default"
              className="h-9 w-9 !px-0 !py-0 outline-none">
              <IconX className="w-5 h-5" />
            </ElemButton>
          </div>
        </div>
        <nav className="grid grid-cols-2 gap-4 px-4">
          {menuPanel.map((item, index) => (
            <ElemLink
              key={index}
              href={item?.href ? item.href : ''}
              onClick={onClose}
              className="block p-3 transition duration-150 ease-in-out bg-dark-100 border border-gray-300 rounded-lg outline-none hover:bg-neutral-900">
              {item?.icon && (
                <item.icon title={item.title} className="w-6 h-6 shrink-0" />
              )}
              <span className="text-sm">{item?.title}</span>
            </ElemLink>
          ))}
          {!user && (
            <ElemButton
              onClick={() => router.push(ROUTES.COMPANIES)}
              btn="primary"
              className="col-span-2 w-full !p-3 !rounded-lg">
              Start for free
            </ElemButton>
          )}
          {navigation.resources.map(item => (
            <ElemLink
              key={item.name}
              href={item?.href ? item.href : ''}
              onClick={onClose}
              className="col-span-2 p-3 text-sm transition duration-150 ease-in-out bg-dark-100 border border-gray-300 rounded-lg outline-none hover:bg-neutral-900">
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
              className="col-span-2 w-full !p-3 !rounded-lg">
              Sign out
            </ElemButton>
          )}
        </nav>
      </ElemModal>
    </>
  );
};
