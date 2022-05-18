import "../styles/globals.scss";
import React from "react";
import TagManager from "react-gtm-module";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ElemSpinner } from "../components/ElemSpinner";
import { TheNavbar } from "../components/TheNavbar";
import { TheFooter } from "../components/TheFooter";

function MyApp({ Component, pageProps }: AppProps) {
	// App Page Preloader
	const router = useRouter();
	const [pageLoading, setPageLoading] = React.useState<boolean>(false);

	//google
	React.useEffect(() => {
		TagManager.initialize({ gtmId: "GTM-THZHN4X" });
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

	// Global Meta

	const metaTitle = "Web3-focused data intelligence for success - EdgeIn.io";
	const metaDescription =
		"Web3 focused data intelligence platform for reliable analysis, powerful insights, and tailored strategies for success.";
	const socialImage = "/social.jpg";

	return (
		<>
			<Head>
				<title>{metaTitle}</title>
				<meta name="description" content={metaDescription} />
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="robots"
					content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
				/>
				<meta property="og:title" content={metaTitle} />
				<meta property="og:description" content={metaDescription} />
				<meta property="og:url" content="https://www.edgein.io/" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={socialImage} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@edgeinio" />
				<meta name="twitter:title" content={metaTitle} />
				<meta name="twitter:description" content={metaDescription} />
				<meta name="twitter:image" content={socialImage} />
			</Head>
			<div className="flex flex-col min-h-screen">
				<TheNavbar />
				<main className="overflow-hidden grow">
					{pageLoading ? <ElemSpinner /> : <Component {...pageProps} />}
				</main>
				<TheFooter />
			</div>
		</>
	);
}

export default MyApp;
