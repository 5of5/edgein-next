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
import { CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork";
import { Web3AuthProvider } from "../services/web3auth";

function MyApp({ Component, pageProps }: AppProps) {
	// App Page Preloader
	const router = useRouter();
	const [pageLoading, setPageLoading] = React.useState<boolean>(false);
	const queryClient = new QueryClient();

	const [toggleFeedbackForm, setToggleFeedbackForm] = useState(false);

	const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>("testnet");
	const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("mainnet");

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
					{pageProps.noLayout ? (
						<Component {...pageProps} />
					) : (
						<>
						 <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}>
						
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
								 
							</Web3AuthProvider>
							<TheFooter />
						</>
					)}
				</QueryClientProvider>
				<Script
					id="webpushr-script"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
						(function(w,d, s, id) {if(typeof(w.webpushr)!=='undefined') return;w.webpushr=w.webpushr||function(){(w.webpushr.q=w.webpushr.q||[]).push(arguments)};var js, fjs = d.getElementsByTagName(s)[0];js = d.createElement(s); js.id = id;js.async=1;js.src = "https://cdn.webpushr.com/app.min.js";
						fjs.parentNode.appendChild(js);}(window,document, 'script', 'webpushr-jssdk'));
						webpushr('setup',{'key':'BJoDaJ3sIhqPBEIu_Pr_hITFOBxYliRg2FdHdQ5szADOfytgRPNlfpqVpGfdv2tQU9zAm7i8DmCjWcmCAXbXrQs' });`,
					}}
				/>
			</div>
		</>
	);
}

export default MyApp;
