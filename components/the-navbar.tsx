import { useEffect, Fragment, FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useHotkeys } from 'react-hotkeys-hook';
import { ElemLogo } from '@/components/elem-logo';
import { ElemButton } from '@/components/elem-button';
import { UserMenu } from '@/components/user-menu';
import UsageModal from '@/components/usage-modal';
import {
  IconSearch,
  IconBell,
  IconEllipsisVertical,
  IconBars3,
} from '@/components/icons';
import { TheMobileNav } from '@/components/the-mobile-nav';
import SearchModal from '@/components/search-modal';
import { useUser } from '@/context/user-context';
import { ElemSearchBox } from './elem-search-box';
import { find } from 'lodash';
import { getNameFromListName } from '@/utils/reaction';
import { Popover, Transition } from '@headlessui/react';
import { redirect_url } from '@/utils/auth';
import { usePopup } from '@/context/popup-context';
import { useSidebar } from '@/context/sidebar-context';
import {
  COMPANIES,
  CONTACT,
  NOTIFICATIONS,
  PRICING,
  ROOT,
  SIGN_IN,
  SUPPORT,
} from '@/routes';
import { ElemLink } from './elem-link';

export type Popups = 'search' | 'usage' | false;

type Props = {};

export const TheNavbar: FC<Props> = ({}) => {
  const router = useRouter();
  const { user, listAndFollows, myGroups, unreadNotificationsCount } =
    useUser();

  const { showPopup, setShowPopup } = usePopup();
  const { showSidebar, setShowSidebar } = useSidebar();

  const hotListId =
    find(listAndFollows, list => 'hot' === getNameFromListName(list))?.id || 0;

  useEffect(() => {
    if (!showPopup && router.asPath.includes(SIGN_IN)) {
      setShowPopup(router.asPath.includes('?usage=true') ? 'usage' : false);
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
          router.push(SIGN_IN);
        }
      } else {
        window.location.href = ROOT;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (router.asPath.includes('?code=')) {
      const code = new URLSearchParams(router.asPath.split('?')[1]).get('code');
      if (code) {
        (async () => {
          //setFinishingLogin(true);
          const res = await getAccessTokenFromCode(code);
        })();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useEffect(() => {
    if (router.query.invite && !user) {
      localStorage.inviteCode = router.query.invite as string;
      redirectToSignIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.invite, user]);

  const onModalClose = useCallback(() => {
    setShowPopup(false);
  }, [setShowPopup]);

  const redirectToSignIn = () => {
    router.push(SIGN_IN);
  };

  const ellipsisDropdownItems = [
    {
      label: 'Support',
      href: SUPPORT,
    },
    {
      label: 'Pricing',
      href: PRICING,
    },
    {
      label: 'Press',
      href: 'mailto:press@edgein.io',
    },
    {
      label: 'Contact',
      href: CONTACT,
    },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-40">
      <div className="px-1 py-1 sm:px-3 sm:py-2 border-b border-gray-200 bg-white/80 backdrop-blur">
        <nav
          className="flex items-center justify-between lg:justify-start w-full mx-auto"
          aria-label="Global"
        >
          <div className="flex items-center gap-3">
            <ElemButton
              onClick={() => setShowSidebar(!showSidebar)}
              btn="gray"
              className="h-9 w-9 !px-0 !py-0 sm:hidden"
            >
              <IconBars3 className="h-6 w-6" />
            </ElemButton>

            <ElemLink href={user ? COMPANIES : ROOT} className="w-auto lg:w-64">
              <ElemLogo
                mode="logo"
                className="h-6 w-auto transition-all scheme-standard sm:h-6 hover:opacity-70"
              />
            </ElemLink>
          </div>

          <ElemSearchBox
            onClick={() => {
              setShowPopup('search');
            }}
          />

          <div className="flex items-center group space-x-2 lg:space-x-3">
            <ElemButton
              onClick={() => setShowPopup('search')}
              btn="gray"
              className="h-9 w-9 !px-0 !py-0 sm:hidden"
            >
              <IconSearch className="h-5 w-5" />
            </ElemButton>

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
                        <ElemLink
                          href={item.href ? item.href : ''}
                          key={index}
                          className="flex items-center gap-x-2 cursor-pointer w-full text-left text-sm px-4 py-2 m-0 transition-all hover:bg-gray-100"
                          onClick={() => {
                            close();
                          }}
                        >
                          {item.label}
                        </ElemLink>
                      ))}
                    </>
                  )}
                </Popover.Panel>
              </Transition>
            </Popover>

            {user ? (
              <>
                <ElemLink
                  href={NOTIFICATIONS}
                  className="relative flex items-center justify-center w-9 h-9"
                >
                  {unreadNotificationsCount > 0 && (
                    <div className="absolute flex items-center justify-center -top-[2px] -right-[4px] h-5 min-w-[20px] px-0.5 rounded-full bg-primary-500 border-2 border-white">
                      <div className="text-white font-bold text-[10px] text-center">
                        {unreadNotificationsCount > 99
                          ? '99+'
                          : unreadNotificationsCount}
                      </div>
                    </div>
                  )}

                  <IconBell className="h-6 w-6 text-gray-600" strokeWidth={2} />
                </ElemLink>
                <UserMenu />
              </>
            ) : (
              <>
                <ElemLink href={SIGN_IN} className="w-auto">
                  <ElemButton btn="purple" className="whitespace-nowrap">
                    Sign in
                  </ElemButton>
                </ElemLink>
              </>
            )}
          </div>

          <UsageModal
            onLogin={redirectToSignIn}
            show={showPopup === 'usage'}
            onClose={onModalClose}
          />

          <SearchModal show={showPopup === 'search'} onClose={onModalClose} />
        </nav>
      </div>

      <TheMobileNav
        className="flex lg:hidden items-center"
        setShowPopup={setShowPopup}
      />
    </header>
  );
};
