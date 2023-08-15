import { useEffect, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useHotkeys } from 'react-hotkeys-hook';
import { ElemLogo } from '@/components/elem-logo';
import { ElemButton } from '@/components/elem-button';
import { UserMenu } from '@/components/user-menu';
import UsageModal from '@/components/usage-modal';
import ForgotPasswordModal from '@/components/forgot-password-modal';
import { IconSearch, IconBell, IconEllipsisVertical } from '@/components/icons';
import { TheMobileNav } from '@/components/the-mobile-nav';
import SearchModal from '@/components/search-modal';
import { useUser } from '@/context/user-context';
import { ElemSearchBox } from './elem-search-box';
import { find, first } from 'lodash';
import { getNameFromListName } from '@/utils/reaction';
import { Popover, Transition } from '@headlessui/react';

import { redirect_url } from '@/utils/auth';
import { usePopup } from '@/context/popup-context';

export type Popups =
  | 'login'
  | 'forgotPassword'
  | 'search'
  | 'signup'
  | 'usage'
  | false;

export const TheNavbar = () => {
  const router = useRouter();
  const { user, listAndFollows, myGroups, unreadNotifications } = useUser();

  const { showPopup, setShowPopup } = usePopup();

  const notificationsCount = unreadNotifications
    ? unreadNotifications.length
    : 0;

  const hotListId =
    find(listAndFollows, list => 'hot' === getNameFromListName(list))?.id || 0;
  const myListsUrl = `/lists/${hotListId}/hot`;

  const getFirstGroup = first(myGroups ? myGroups : null);

  const myGroupsUrl = getFirstGroup ? `/groups/${getFirstGroup.id}/` : '';

  useEffect(() => {
    if (!showPopup && router.asPath.includes('/login/')) {
      setShowPopup(
        router.asPath.includes('/login/')
          ? router.asPath.includes('?usage=true')
            ? 'usage'
            : 'login'
          : false,
      );
    }
    if (!showPopup && router.asPath.includes('/signup/')) {
      setShowPopup(
        router.asPath.includes('/signup/')
          ? router.asPath.includes('?usage=true')
            ? 'usage'
            : 'signup'
          : false,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useHotkeys('ctrl+k, command+k', function (event) {
    event.preventDefault();
    setShowPopup('search');
  });

  // if (user) {
  // 	siteNav.push({ path: myListsUrl, name: "My Lists" });
  // }

  const getAccessTokenFromCode = async (code: string) => {
    try {
      const response = await fetch('/api/access-token-from-code/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          redirect_uri: redirect_url(),
        }),
      }); //.then((res) => res.json());
      if (response.status !== 200) {
        const responseText = await response.clone().json();
        if (responseText.message) {
          router.push('/sign-in');
        }
      } else {
        window.location.href = '/';
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (router.query.code) {
      (async () => {
        //setFinishingLogin(true);
        const res = await getAccessTokenFromCode(router.query.code as string);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.code]);

  useEffect(() => {
    if (router.query.invite && !user) {
      localStorage.inviteCode = router.query.invite as string;
      redirectToSignIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.invite, user]);

  const onBackFromForgotPassword = () => {
    router.push('/sign-in');
  };

  const onModalClose = () => {
    setShowPopup(router.asPath.includes('/login/') ? 'login' : false);
  };

  const redirectToSignIn = () => {
    router.push('/sign-in');
  };

  const ellipsisDropdownItems = [
    {
      label: 'Support',
      href: '/support',
    },
    {
      label: 'Press',
      href: 'mailto:press@edgein.io',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ];

  return (
    <header className="overflow-y-visible z-40 block fixed top-0 left-0 right-0">
      <div className="px-1 py-1 sm:px-3 sm:py-2 border-b border-gray-200 bg-white/80 backdrop-blur">
        <nav
          className="flex items-center justify-between lg:justify-start w-full mx-auto"
          aria-label="Global"
        >
          <Link href={user ? '/companies' : '/'} passHref>
            <a className="w-auto lg:w-64">
              <ElemLogo
                mode="logo"
                className="h-6 w-auto transition-all scheme-standard sm:h-6 hover:opacity-70"
              />
            </a>
          </Link>

          <ElemSearchBox
            onClick={() => {
              setShowPopup('search');
            }}
          />

          <div className="flex items-center group space-x-2 lg:space-x-3">
            {user && (
              <ElemButton
                onClick={() => setShowPopup('search')}
                btn="slate"
                className="h-9 w-9 !px-0 !py-0 sm:hidden"
              >
                <IconSearch className="h-5 w-5" />
              </ElemButton>
            )}

            <Popover className="relative">
              <Popover.Button className="flex items-center focus:outline-none">
                <IconEllipsisVertical className="h-6 w-6 text-gray-600" />
              </Popover.Button>

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
                    <>
                      {ellipsisDropdownItems.map((item, index) => (
                        <Link href={item.href ? item.href : ''} key={index}>
                          <a
                            className="flex items-center gap-x-2 cursor-pointer w-full text-left text-sm px-4 py-2 m-0 transition-all hover:bg-gray-100"
                            onClick={() => {
                              close();
                            }}
                          >
                            {item.label}
                          </a>
                        </Link>
                      ))}
                    </>
                  )}
                </Popover.Panel>
              </Transition>
            </Popover>

            {user ? (
              <>
                <Link href="/notifications" passHref>
                  <a className="relative flex items-center justify-center w-9 h-9">
                    {notificationsCount > 0 && (
                      <div className="absolute flex items-center justify-center -top-[2px] -right-[2px] w-5 h-5 rounded-full bg-primary-500 border border-white">
                        <div className="text-white font-bold text-[10px] text-center">
                          {notificationsCount > 99 ? '99+' : notificationsCount}
                        </div>
                      </div>
                    )}

                    <IconBell
                      className="h-6 w-6 text-gray-600"
                      strokeWidth={2}
                    />
                  </a>
                </Link>
                <UserMenu />
              </>
            ) : (
              <>
                <Link href="/sign-in" passHref>
                  <a className="w-auto">
                    <ElemButton btn="purple" className="whitespace-nowrap">
                      Sign in
                    </ElemButton>
                  </a>
                </Link>
              </>
            )}
          </div>

          <UsageModal
            onLogin={redirectToSignIn}
            show={showPopup === 'usage'}
            onClose={onModalClose}
          />

          <ForgotPasswordModal
            show={showPopup === 'forgotPassword'}
            onClose={onModalClose}
            onBack={onBackFromForgotPassword}
          />
          <SearchModal
            show={showPopup === 'search'}
            onClose={() => setShowPopup(false)}
          />
        </nav>
      </div>

      <TheMobileNav
        className="flex lg:hidden items-center"
        setShowPopup={setShowPopup}
      />
    </header>
  );
};
