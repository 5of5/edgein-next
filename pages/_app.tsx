import '@/styles/globals.scss';
import '@/styles/admin-test.css';
import React, { useState } from 'react';
import TagManager from 'react-gtm-module';
//import { hotjar } from 'react-hotjar';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { LoaderSpinner } from '@/components/loader-spinner';
import { TheNavbar } from '@/components/the-navbar';
import { TheFooter } from '@/components/the-footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider, useUser } from '@/context/user-context';
import { PopupProvider } from '@/context/popup-context';
import { SideBarProvider } from '@/context/sidebar-context';
import { IntercomProvider } from 'react-use-intercom';
import { ROUTES } from '@/routes';
import { DefaultSeo } from 'next-seo';
import Script from 'next/script';
import FirstVisitPopup from '@/components/FirstVisitPopup';
import { ApolloProvider } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';

const INTERCOM_APP_ID = 'jm3hf6lp';
const ORIGIN = '/';

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
    // if (
    //   process.env.NEXT_PUBLIC_HOTJAR_ID &&
    //   !isNaN(parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID))
    // ) {
    //   hotjar.initialize(parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID), 7);
    // }
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
    `https://mentibus.xyz` +
    (router.asPath === ROUTES.ROOT ? '' : router.asPath)
  ).split('?')[0];
  // const { user, unreadNotificationsCount } = useUser();
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
      ROUTES.REFERRALS_AND_POINTS,
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
      <DefaultSeo
        title="Discover AI and Web3-focused data intelligence for success"
        titleTemplate="%s – Mentibus.xyz"
        defaultTitle="Mentibus.xyz"
        description="Mentibus is the AI & Web3 focused data intelligence platform for reliable analysis, powerful insights, and tailored strategies for success. Get company funding data, find new prospects, and explore competitor insights."
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: canonicalUrl,
          siteName: 'Mentibus',
          images: [
            {
              url: 'https://mentibus.xyz/social.png',
              width: 800,
              height: 600,
              alt: 'mentibus.xyz',
            },
          ],
        }}
        twitter={{
          handle: '@mentibus_xyz',
          site: '@mentibus_xyz',
          cardType: 'summary_large_image',
        }}
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: 'none',
          maxVideoPreview: -1,
        }}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
        ]}
        additionalLinkTags={[
          { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
          { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
          {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico',
          },
          {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
            sizes: '76x76',
          },
        ]}
        canonical={canonicalUrl}
      />

      <div className="flex flex-col min-h-[calc(100vh_-_1rem)] bg-black text-white dark">
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={getClient()}>
            {pageProps.noLayout ? (
              <Component {...pageProps} />
            ) : (
              <IntercomProvider appId={INTERCOM_APP_ID} autoBoot>
                <UserProvider>
                  <PopupProvider>
                    <SideBarProvider>
                      <>
                        {/* <div className="mt-5" /> */}
                        {/* If Navbar only needed in home page */}
                        {/* {router.pathname === ORIGIN  &&<TheNavbar />} */}
                        <TheNavbar />
                        <main className="grow selection:bg-primary-200">
                          {pageLoading ? (
                            <LoaderSpinner />
                          ) : (
                            <Component {...pageProps} />
                          )}
                        </main>
                        {showFooter === true && <TheFooter />}
                        <FirstVisitPopup />
                      </>
                    </SideBarProvider>
                  </PopupProvider>
                </UserProvider>
              </IntercomProvider>
            )}
          </ApolloProvider>
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
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-CNLPCXH1W8"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CNLPCXH1W8');
          `,
        }}
      />
    </>
  );
}

export default MyApp;
