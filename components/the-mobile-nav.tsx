import {
  FC,
  PropsWithChildren,
  Fragment,
  useState,
  useEffect,
  useMemo,
} from 'react';
import Link from 'next/link';
import { ElemButton } from './elem-button';
import {
  IconX,
  IconLinkedIn,
  IconTwitter,
  IconCash,
  IconCompanies,
  IconUsers,
  IconEmail,
  IconSettings,
  IconCustomList,
  IconGroup,
  IconSignOut,
  IconCalendar,
  IconNewspaper,
  IconBell,
  IconDocumentDownload,
  IconUserCircle,
  IconSearch,
} from '@/components/icons';
import { Transition, Dialog } from '@headlessui/react';
import { ElemPhoto } from '@/components/elem-photo';
import { useUser } from '@/context/user-context';
import { clearLocalStorage } from '@/utils/helpers';
import { useRouter } from 'next/router';
import { Popups } from '@/components/the-navbar';
import { useGetNotificationsForUserQuery } from '@/graphql/types';
import { filterExcludeNotifications } from '@/utils/notifications';

type Props = {
  className?: string;
  myListsUrl?: string;
  myGroupsUrl?: string;
  setShowPopup: React.Dispatch<React.SetStateAction<Popups>>;
};

export const TheMobileNav: FC<PropsWithChildren<Props>> = ({
  className = '',
  myListsUrl,
  myGroupsUrl,
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

  const onOpenSearch = () => {
    setShowPopup('search');
    setNavOpen(false);
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

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
            // href: '/account',
            href: '/account',
            onClick: () => {
              router.push('/account');
              setNavOpen(false);
            },
          },
        ]
      : []),
    // { icon: IconUsers, name: "Team", href: "/team", onClick: null },
    // { icon: IconEmail, name: "Contact", href: "/contact", onClick: null },
    // {
    // 	icon: IconLinkedIn,
    // 	name: "LinkedIn",
    // 	href: "https://www.linkedin.com/company/edgein/",
    // 	onClick: null,
    // },
    // {
    // 	icon: IconTwitter,
    // 	name: "Twitter",
    // 	href: "https://twitter.com/EdgeInio",
    // 	onClick: null,
    // },
  ];

  return (
    <>
      <div
        className={`fixed z-50 w-full b items-center shadow-up transition-all lg:hidden bottom-0 ${className}`}>
        <ul className="grid grid-cols-6 w-full bg-white px-0.5 pb-0.5">
          {nav.map((item, index) => (
            <li
              key={index}
              className={`pt-0.5 ${
                router.pathname == item?.href && navOpen === false
                  ? 'border-t-2 border-primary-500'
                  : 'border-t-2 border-transparent'
              }`}>
              <Link href={item?.href ? item.href : ''}>
                <a
                  onClick={item?.onClick ? item?.onClick : onClose}
                  className="flex flex-col items-center h-full text-[11px]">
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
            }`}>
            <a
              onClick={onOpen}
              className="flex flex-col items-center h-full text-[11px] cursor-pointer">
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
      <Transition.Root show={navOpen} as={Fragment}>
        <Dialog
          as="div"
          className={`relative lg:hidden ${navOpen && 'z-30'}`}
          onClose={onClose}>
          <div className="fixed inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full">
              <Dialog.Panel className="w-full bg-gray-50">
                <div className="flex justify-between items-center px-4 py-3">
                  <Dialog.Title className="text-xl font-bold">
                    Menu
                    {/* <button type="button" onClick={onClose}>
										<IconX className="h-8 w-8" title="close" />
									</button> */}
                  </Dialog.Title>
                  <div className="flex space-x-2">
                    <ElemButton
                      onClick={onClose}
                      btn="slate"
                      className="h-9 w-9 !px-0 !py-0 outline-none">
                      <IconSettings className="h-5 w-5" />
                    </ElemButton>
                    <ElemButton
                      onClick={onOpenSearch}
                      btn="slate"
                      className="h-9 w-9 !px-0 !py-0">
                      <IconSearch className="h-5 w-5" strokeWidth={1.5} />
                    </ElemButton>
                  </div>
                </div>

                <ul className="grid grid-cols-2 gap-4 px-4">
                  {menuPanel.map((item, index) => (
                    <li key={index}>
                      <Link href={item?.href ? item.href : ''}>
                        <a
                          onClick={item.onClick ? item.onClick : onClose}
                          className="block p-3 outline-none bg-white shadow rounded-lg">
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
                      className="w-full">
                      Sign out
                    </ElemButton>
                  ) : (
                    <ElemButton
                      onClick={() => setShowPopup('signup')}
                      btn="primary"
                      className="w-full">
                      Start for free
                    </ElemButton>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
