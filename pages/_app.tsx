import '@/styles/LoaderPlasma.scss';
import '@/styles/globals.scss';
import React, { useState } from 'react';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LoaderPlasma } from '@/components/loader-plasma';
import { TheNavbar } from '@/components/the-navbar';
import { TheFooter } from '@/components/the-footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from '@/context/user-context';
import { PopupProvider } from '@/context/popup-context';
import { SideBarProvider } from '@/context/sidebar-context';
import { IntercomProvider } from 'react-use-intercom';
import { ROUTES } from '@/routes';

const INTERCOM_APP_ID = 'jm3hf6lp';

import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

declare global {
  interface Window {
    disableRouterEvents: boolean;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  // App Page Preloader
  const router = useRouter();
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);

  //google
  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_GTM_ID) {
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }
    if (
      process.env.NEXT_PUBLIC_HOTJAR_ID &&
      !isNaN(parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID))
    ) {
      hotjar.initialize(parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID), 7);
    }
  }, []);

  React.useEffect(() => {
    const handleStart = () => {
      if (!window.disableRouterEvents) {
        setPageLoading(true);
      }
    };
    const handleComplete = () => {
      if (!window.disableRouterEvents) {
        setPageLoading(false);
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  // Meta
  const canonicalUrl = (
    `https://edgein.io` + (router.asPath === ROUTES.ROOT ? '' : router.asPath)
  ).split('?')[0];

  const [showFooter, setShowFooter] = useState(true);

  React.useEffect(() => {
    const pagesWithoutFooter = [
      ROUTES.HOME,
      ROUTES.COMPANIES,
      ROUTES.INVESTORS,
      ROUTES.EVENTS,
      ROUTES.NOTIFICATIONS,
      ROUTES.NEWS,
      ROUTES.PEOPLE,
      ROUTES.GROUPS,
      ROUTES.ACCOUNT,
      ROUTES.INVITE_A_FRIEND,
      ROUTES.PROFILE,
      ROUTES.LISTS,
      ROUTES.NOTES,
    ];

    if (pagesWithoutFooter.some(pageUrl => router.pathname.includes(pageUrl))) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [router.pathname]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      {/* <Script
        src="https://aggle.net/js?pid=J9GEZNSN8"
        strategy="afterInteractive"
        type="js"></Script> */}
      <div className="flex flex-col min-h-[calc(100vh_-_1rem)]">
        <QueryClientProvider client={queryClient}>
          {pageProps.noLayout ? (
            <Component {...pageProps} />
          ) : (
            <IntercomProvider appId={INTERCOM_APP_ID} autoBoot>
              <UserProvider>
                <PopupProvider>
                  <SideBarProvider>
                    <>
                      <TheNavbar />

                      <main className="grow selection:bg-primary-200">
                        {pageLoading ? (
                          <LoaderPlasma />
                        ) : (
                          <Component {...pageProps} />
                        )}
                      </main>

                      {showFooter === true && <TheFooter />}
                    </>
                  </SideBarProvider>
                </PopupProvider>
              </UserProvider>
            </IntercomProvider>
          )}
        </QueryClientProvider>
        {/* <Script
					id="webpushr-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
						(function(w,d, s, id) {if(typeof(w.webpushr)!=='undefined') return;w.webpushr=w.webpushr||function(){(w.webpushr.q=w.webpushr.q||[]).push(arguments)};var js, fjs = d.getElementsByTagName(s)[0];js = d.createElement(s); js.id = id;js.async=1;js.src = "https://cdn.webpushr.com/app.min.js";
						fjs.parentNode.appendChild(js);}(window,document, 'script', 'webpushr-jssdk'));
						webpushr('setup',{'key':'BJoDaJ3sIhqPBEIu_Pr_hITFOBxYliRg2FdHdQ5szADOfytgRPNlfpqVpGfdv2tQU9zAm7i8DmCjWcmCAXbXrQs' });`,
					}}
				/> */}
      </div>
    </>
  );
}

export default MyApp;
