import { FC, PropsWithChildren, useState, useEffect, useMemo } from 'react';
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
import { clearLocalStorage } from '@/utils/helpers';
import { useRouter } from 'next/router';
import { Popups } from '@/components/the-navbar';
import { useGetNotificationsForUserQuery } from '@/graphql/types';
import { filterExcludeNotifications } from '@/utils/notifications';

type Props = {
  className?: string;
  setShowPopup: React.Dispatch<React.SetStateAction<Popups>>;
};

export const TheMobileNav: FC<PropsWithChildren<Props>> = ({
  className = '',
  setShowPopup,
}) => {
  const { user } = useUser();
  const router = useRouter();

  const { data } = useGetNotificationsForUserQuery(
    {
      user: user?.id || 0,
      limit: 10,
      offset: 0,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const excludeProperties = useMemo(() => {
    return ['status_tags', 'logo'];
  }, []);

  const excludeResourceTypes = useMemo(() => {
    return ['event_organization', 'companies'];
  }, []);

  const notifications = filterExcludeNotifications(
    data?.notifications || [],
    excludeResourceTypes,
    excludeProperties,
  ).filter(item => !item?.read);

  const notificationsCount = notifications ? notifications.length : 0;

  const [navOpen, setNavOpen] = useState(false);

  const onOpen = () => {
    setNavOpen(true);
  };

  const onClose = () => {
    setNavOpen(false);
  };

  const onToggleMenu = () => {
    setNavOpen(!navOpen);
  };

  const onOpenSearch = () => {
    setShowPopup('search');
    setNavOpen(false);
  };

  const logout = async () => {
    clearLocalStorage();
    const authRequest = await fetch('/api/logout/', {
      method: 'POST',
    }).then(res => res.json());
    if (authRequest.success) {
      // We successfully logged in, our API
      // set authorization cookies and now we
      // can redirect to the dashboard!
      location.href = authRequest.logoutLink;
    } else {
      /* handle errors */
    }
  };

  const nav = [
    {
      icon: IconCompanies,
      name: 'Companies',
      href: '/companies',
      onClick: null,
    },
    {
      icon: IconCash,
      name: 'Investors',
      href: '/investors',
      onClick: null,
    },
    {
      icon: IconCalendar,
      name: 'Events',
      href: '/events',
      onClick: null,
    },
    {
      icon: IconNewspaper,
      name: 'News',
      href: '/news',
      onClick: null,
    },
    {
      icon: IconBell,
      name: 'Notifications',
      href: '/notifications',
      onClick: null,
    },
  ];

  const menuPanel = [
    ...(user
      ? [
          {
            icon: IconDocumentDownload,
            name: 'Notes',
            href: '/notes',
            onClick: null,
          },
          {
            icon: IconGroup,
            name: 'Groups',
            href: '/groups',
            onClick: null,
          },
          {
            icon: IconCustomList,
            name: 'Lists',
            href: '/lists',
            onClick: null,
          },
        ]
      : []),
    {
      icon: IconCompanies,
      name: 'Companies',
      href: '/companies',
      onClick: null,
    },
    {
      icon: IconCash,
      name: 'Investors',
      href: '/investors',
      onClick: null,
    },
    {
      icon: IconCalendar,
      name: 'Events',
      href: '/events',
      onClick: null,
    },
    {
      icon: IconNewspaper,
      name: 'News',
      href: '/news',
      onClick: null,
    },
    ...(user
      ? [
          {
            icon: IconSettings,
            name: 'Account Settings',
            href: '/account',
            onClick: () => {
              router.push('/account');
              setNavOpen(false);
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <div
        className={`fixed z-50 w-full b items-center shadow-up transition-all lg:hidden bottom-0 ${className}`}
      >
        <ul className="grid grid-cols-6 w-full bg-white px-0.5 pb-0.5">
          {nav.map((item, index) => (
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
                  onClick={item?.onClick ? item?.onClick : onClose}
                  className="flex flex-col items-center h-full text-[11px]"
                >
                  {item?.icon && (
                    <div className="relative flex items-center justify-center h-7 aspect-square">
                      {notificationsCount > 0 &&
                        item.name === 'Notifications' && (
                          <div className="absolute -top-0.5 right-0 w-4 h-4 rounded-full from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r border-2 border-white"></div>
                        )}
                      <item.icon
                        title={item.name}
                        className="h-6 w-6 shrink-0 text-slate-600"
                      />
                    </div>
                  )}
                  {item?.name}
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
                  btn="slate"
                  className="h-9 w-9 !px-0 !py-0"
                >
                  <IconSearch className="h-5 w-5" strokeWidth={1.5} />
                </ElemButton>
                <ElemButton
                  onClick={onClose}
                  btn="slate"
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
                      onClick={item.onClick ? item.onClick : onClose}
                      className="block p-3 outline-none bg-white shadow rounded-lg"
                    >
                      {item?.icon && (
                        <item.icon
                          title={item.name}
                          className="h-6 w-6 shrink-0"
                        />
                      )}
                      <span className="leading-tight">{item?.name}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="p-4">
              {user ? (
                <ElemButton
                  btn="slate"
                  roundedFull={false}
                  onClick={() => {
                    logout(), setNavOpen(false);
                  }}
                  className="w-full"
                >
                  Sign out
                </ElemButton>
              ) : (
                <ElemButton
                  onClick={() => setShowPopup('signup')}
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
