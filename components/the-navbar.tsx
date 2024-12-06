import { useEffect, FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useHotkeys } from 'react-hotkeys-hook';
import { ElemLogo } from '@/components/elem-logo';
import { ElemButton } from '@/components/elem-button';
import { UserMenu } from '@/components/user-menu';
import { UsageModal } from '@/components/usage-modal';
import { IconSearch, IconBell, IconBars3 } from '@/components/icons';
import { TheMobileNav } from '@/components/the-mobile-nav';
import SearchModal from '@/components/search-modal';
import { useUser } from '@/context/user-context';
import { ElemSearchBox } from './elem-search-box';
import { redirect_url } from '@/utils/auth';
import { usePopup } from '@/context/popup-context';
import { useSidebar } from '@/context/sidebar-context';
import { ROUTES } from '@/routes';
import { ElemLink } from './elem-link';
import { DashboardSidebar } from './dashboard/dashboard-sidebar';
import { ElemModal } from './elem-modal';

export type Popups = 'search' | 'usage' | false;

type Props = {};

export const TheNavbar: FC<Props> = ({}) => {
  const router = useRouter();
  const { user, unreadNotificationsCount } = useUser();

  const { showPopup, setShowPopup } = usePopup();
  const { showSidebar, setShowSidebar } = useSidebar();

  useEffect(() => {
    if (!showPopup && router.asPath.includes(ROUTES.SIGN_IN)) {
      setShowPopup(router.asPath.includes('?usage=true') ? 'usage' : false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useHotkeys('ctrl+k, command+k', function (event) {
    event.preventDefault();
    setShowPopup('search');
  });

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
          router.push(ROUTES.SIGN_IN);
        }
      } else {
        window.location.href = ROUTES.ROOT;
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
    router.push(ROUTES.SIGN_IN);
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-40">
        <nav
          className="flex items-center justify-between w-full px-4 mx-auto border-b border-dark-200 bg-black backdrop-blur h-14"
          aria-label="Global">
          <div className="flex items-center gap-3">
            {/* <ElemButton
              onClick={() => setShowSidebar(!showSidebar)}
              btn="default"
              className="h-9 w-9 !px-0 !py-0 lg:hidden">
              <IconBars3 className="w-6 h-6" />
            </ElemButton> */}

            <ElemLink
              href={user ? ROUTES.COMPANIES : ROUTES.ROOT}
              className="w-auto mr-4 lg:w-64">
              <ElemLogo
                mode="logo-inverted"
                className="w-auto h-6 transition-all scheme-standard sm:h-6 hover:opacity-70"
              />
            </ElemLink>
          </div>

          <ElemSearchBox
            onClick={() => {
              setShowPopup('search');
            }}
          />

          <div className="flex items-center space-x-2 lg:space-x-3">
            <ElemButton
              onClick={() => setShowPopup('search')}
              className="h-9 w-9 !p-0 sm:hidden">
              <IconSearch className="w-5 h-5" />
            </ElemButton>

            {user ? (
              <>
                {/* <ElemButton
                  href={ROUTES.NOTIFICATIONS}
                  className="relative w-9 h-9 !p-0">
                  {unreadNotificationsCount > 0 && (
                    <div className="absolute flex items-center justify-center -top-[2px] right-0 h-5 min-w-[20px] px-0.5 rounded-full bg-primary-500 border-2 border-white">
                      <div className="text-white font-bold text-[10px] text-center">
                        {unreadNotificationsCount > 99
                          ? '99+'
                          : unreadNotificationsCount}
                      </div>
                    </div>
                  )}
                  <IconBell
                    className={`w-6 h-6 shrink-0 ${
                      unreadNotificationsCount > 0 && 'mr-1'
                    }`}
                    strokeWidth={1.5}
                  />
                </ElemButton> */}
              </>
            ) : (
              <ElemButton
                href={ROUTES.SIGN_IN}
                btn="primary"
                className="whitespace-nowrap">
                Sign in
              </ElemButton>
            )}

            <UserMenu />
          </div>
        </nav>
      </header>

      <TheMobileNav />

      <SearchModal show={showPopup === 'search'} onClose={onModalClose} />

      <UsageModal show={showPopup === 'usage'} onClose={onModalClose} />

      <ElemModal
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        showCloseIcon={false}
        placement="topLeft"
        transition="slideFromLeft"
        panelClass="h-full w-full max-w-xs mb-14 bg-black">
        <DashboardSidebar />
      </ElemModal>
    </>
  );
};
