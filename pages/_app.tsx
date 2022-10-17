import "../styles/LoaderPlasma.scss";
import "../styles/globals.scss";
import React, { useState } from "react";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";
import type { AppProps } from "next/app";
import Script from "next/script";
import Head from "next/head";
import { useRouter } from "next/router";
import { LoaderPlasma } from "../components/LoaderPlasma";
import { TheNavbar } from "../components/TheNavbar";
import { ElemFeedback } from "../components/ElemFeedback";
import { TheFooter } from "../components/TheFooter";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "../context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
	// App Page Preloader
	const router = useRouter();
	const [pageLoading, setPageLoading] = React.useState<boolean>(false);
	const queryClient = new QueryClient();

	const [toggleFeedbackForm, setToggleFeedbackForm] = useState(false);

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
			setPageLoading(true);
		};
		const handleComplete = () => {
			setPageLoading(false);
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
	let metaImage = pageProps.metaImage ? pageProps.metaImage : `/social.jpg`;

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
				<meta property="og:title" content={metaTitle} key="og-title" />
				<meta
					property="og:description"
					content={metaDescription}
					key="og-description"
				/>
				<meta property="og:url" content="https://edgein.io/" key="og-url" />
				<meta property="og:type" content="website" key="og-type" />
				<meta property="og:image" content={metaImage} key="og-image" />
				<meta name="twitter:card" content="summary_large_image" key="tw-card" />
				<meta name="twitter:site" content="@edgeinio" key="tw-site" />
				<meta name="twitter:title" content={metaTitle} key="tw-title" />
				<meta
					name="twitter:description"
					content={metaDescription}
					key="tw-description"
				/>
				<meta name="twitter:image" content={metaImage} key="tw-social" />
			</Head>
			<Script
				src="https://aggle.net/js?pid=J9GEZNSN8"
				strategy="afterInteractive"
			></Script>
			<div className="flex flex-col min-h-screen">
				<QueryClientProvider client={queryClient}>
					<UserProvider>
						{pageProps.noLayout ? (
							<Component {...pageProps} />
						) : (
							<>
								<TheNavbar />
								<main className="grow selection:bg-primary-200">
									{pageLoading ? (
										<LoaderPlasma />
									) : (
										<Component
											{...pageProps}
											setToggleFeedbackForm={setToggleFeedbackForm}
										/>
									)}
								</main>

								{(router.asPath.includes("/companies/") ||
									router.asPath.includes("/investors/")) && (
									<ElemFeedback
										toggleFeedbackForm={toggleFeedbackForm}
										setToggleFeedbackForm={setToggleFeedbackForm}
									/>
								)}
								<TheFooter />
							</>
						)}
					</UserProvider>
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
				<Script
					id="intercom-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
						window.intercomSettings = {
							api_base: "https://api-iam.intercom.io",
							app_id: "jm3hf6lp"
						};
						// We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/jm3hf6lp'
						(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/jm3hf6lp';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
						`
					}}
				/>
			</div>
		</>
	);
}

export default MyApp;
