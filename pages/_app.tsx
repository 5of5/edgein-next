import "@/styles/LoaderPlasma.scss";
import "@/styles/globals.scss";
import React, { useState } from "react";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import type { AppProps } from "next/app";
import Script from "next/script";
import Head from "next/head";
import { useRouter } from "next/router";
import { LoaderPlasma } from "@/components/LoaderPlasma";
import { Popups, TheNavbar } from "@/components/TheNavbar";
import { ElemFeedback } from "@/components/ElemFeedback";
import { TheFooter } from "@/components/TheFooter";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "@/context/userContext";
import { IntercomProvider } from "react-use-intercom";
// import { DATADOME_JS, DATADOME_TAGS } from "@/utils/constants";
const INTERCOM_APP_ID = "jm3hf6lp";

declare global {
	interface Window {
		disableRouterEvents: boolean;
	}
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	// App Page Preloader
	const router = useRouter();
	const [pageLoading, setPageLoading] = React.useState<boolean>(false);

	const [toggleFeedbackForm, setToggleFeedbackForm] = useState(false);
	const [showPopup, setShowPopup] = useState<Popups>(
		router.asPath.includes("/login/")
			? router.asPath.includes("?usage=true")
				? "usage"
				: "login"
			: false
	);

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

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);
	}, [router]);

	// Meta
	let metaTitle = pageProps.metaTitle
		? pageProps.metaTitle
		: "Web3-focused data intelligence for success - EdgeIn.io";
	let metaDescription = pageProps.metaDescription
		? pageProps.metaDescription
		: "Web3 focused data intelligence platform for reliable analysis, powerful insights, and tailored strategies for success.";
	let metaImage = pageProps.metaImage
		? pageProps.metaImage
		: `https://edgein.io/social.jpg`;

	return (
		<>
			<Head>
				<title>{metaTitle}</title>
				<meta name="description" content={metaDescription} key="description" />
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="robots"
					content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
				/>
				<meta name="twitter:card" content="summary_large_image" key="tw-card" />
				<meta name="twitter:site" content="@edgeinio" key="tw-site" />
				<meta name="twitter:title" content={metaTitle} key="tw-title" />
				<meta
					name="twitter:description"
					content={metaDescription}
					key="tw-description"
				/>
				<meta name="twitter:image" content={`${metaImage}`} key="tw-social" />
				<meta property="og:title" content={metaTitle} key="og-title" />
				<meta
					property="og:description"
					content={metaDescription}
					key="og-description"
				/>
				<meta property="og:url" content="https://edgein.io/" key="og-url" />
				<meta property="og:type" content="website" key="og-type" />
				<meta property="og:image" content={`${metaImage}`} key="og-image" />
			</Head>
			<Script
				src="https://aggle.net/js?pid=J9GEZNSN8"
				strategy="afterInteractive"
			></Script>
			<div className="flex flex-col min-h-screen">
				<QueryClientProvider client={queryClient}>
					{pageProps.noLayout ? (
						<Component {...pageProps} />
					) : (
						<IntercomProvider appId={INTERCOM_APP_ID} autoBoot>
							<UserProvider>
								<>
									<TheNavbar
										showPopup={showPopup}
										setShowPopup={setShowPopup}
									/>
									<main className="grow selection:bg-primary-200">
										{pageLoading ? (
											<LoaderPlasma />
										) : (
											<Component
												{...pageProps}
												setToggleFeedbackForm={setToggleFeedbackForm}
												showPopup={showPopup}
												setShowPopup={setShowPopup}
											/>
										)}
									</main>

									{(router.asPath.includes("/companies/") ||
										router.asPath.includes("/investors/") ||
										router.asPath.includes("/events/")) && (
										<ElemFeedback
											toggleFeedbackForm={toggleFeedbackForm}
											setToggleFeedbackForm={setToggleFeedbackForm}
										/>
									)}
									<TheFooter />
								</>
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
