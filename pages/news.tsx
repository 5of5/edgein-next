import React, { Fragment, useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ElemHeading } from "@/components/elem-heading";
import { ElemNewsCard } from "@/components/news/elem-news-card";
import { useIntercom } from "react-use-intercom";
import { PlaceholderNewsCard } from "@/components/placeholders";
import toast, { Toaster } from "react-hot-toast";

type Props = {
	initialNews: any; //GetNewsQuery["news"];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const News: NextPage<Props> = ({ initialNews, setToggleFeedbackForm }) => {
	const [initialLoad, setInitialLoad] = useState(true);
	const router = useRouter();
	const { showNewMessages } = useIntercom();

	const error = false;
	const isLoading = false;

	if (!isLoading && initialLoad) {
		setInitialLoad(false);
	}
	//const news = initialLoad ? initialNews : newsData?.news;
	const news = initialNews;

	return (
		<div className="relative overflow-hidden">
			<ElemHeading
				title="News"
				subtitle="Something about News."
				className=""
			></ElemHeading>

			<div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow p-5">
					<h2 className="text-xl font-bold">Recent News</h2>

					{news?.length === 0 && (
						<div className="flex items-center justify-center mx-auto min-h-[40vh]">
							Empty news
							{/* <div className="w-full max-w-2xl my-8 p-8 text-center bg-white border rounded-2xl border-dark-500/10">
								<IconSearch className="w-12 h-12 mx-auto text-slate-300" />
								<h2 className="mt-5 text-3xl font-bold">No results found</h2>
								<div className="mt-1 text-lg text-slate-600">
									Please check spelling, try different filters, or tell us about
									missing data.
								</div>
								<ElemButton
									onClick={() => setToggleFeedbackForm(true)}
									btn="white"
									className="mt-3"
								>
									<IconAnnotation className="w-6 h-6 mr-1" />
									Tell us about missing data
								</ElemButton>
							</div> */}
						</div>
					)}

					<div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{error ? (
							<div className="flex items-center justify-center mx-auto min-h-[40vh] col-span-3">
								<div className="max-w-xl mx-auto">
									<h4 className="mt-5 text-3xl font-bold">
										Error loading news
									</h4>
									<div className="mt-1 text-lg text-slate-600">
										Please check spelling, reset filters, or{" "}
										<button
											onClick={() =>
												showNewMessages(
													`Hi EdgeIn, I'd like to report an error on news page`
												)
											}
											className="inline underline decoration-primary-500 hover:text-primary-500"
										>
											<span>report error</span>
										</button>
										.
									</div>
								</div>
							</div>
						) : isLoading && !initialLoad ? (
							<>
								{Array.from({ length: 6 }, (_, i) => (
									<PlaceholderNewsCard key={i} />
								))}
							</>
						) : (
							news?.map((item: any) => (
								<ElemNewsCard
									key={item.id}
									newsPost={item as any} //item as News
									//tagOnClick={filterByTag}
								/>
							))
						)}
					</div>
				</div>
			</div>

			<Toaster />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const news = {
		news: [
			{
				id: 9999,
				published_at: "2023-04-18T22:31:09.000+0700",
				title: "Bitcoin Future Path Talk w/ FilbFilb of @Decentrader",
				link: "https://cryptopanic.com/news/18138691/Bitcoin-Future-Path-Talk-w-FilbFilb-of-Decentrader",
				source: {
					kind: "media",
					path: null,
					title: "Tone Vays",
					domain: "youtube.com",
					region: "en",
				},
				text: null,
			},
			{
				id: 9998,
				published_at: "2023-04-18T22:45:00.000+0700",
				title:
					"Valentin Pletnev, CEO of Quasar Finance, on Cosmos Ecosystem and Inter-Blockchain Communication (IBC) Protocol | Ep. 222",
				link: "https://cryptopanic.com/news/18139278/Valentin-Pletnev-CEO-of-Quasar-Finance-on-Cosmos-Ecosystem-and-Inter-Blockchain-Communication-IBC-Protocol-Ep-222%7C",
				source: {
					kind: "news",
					path: null,
					title: "Cryptonews",
					domain: "cryptonews.com",
					region: "en",
				},
				text: null,
			},
			{
				id: 1,
				published_at: "2023-04-19T20:05:23.137097",
				title:
					"Bitcoin falls below US$29,000, Ether slumps, U.S. equities stall on inflation concerns",
				link: "https://forkast.news/headlines/bitcoin-below-29000-ether-slides-inflation/",
				source: {
					kind: "news",
					path: null,
					title: "Forkast News",
					domain: "forkast.news",
					region: "en",
				},
				text: "Bitcoin slid below the US$29,000 mark on Thursday morning in Asia. Ether lost hold of US$2,000 in a sell-off across all top 10 non-stablecoin tokens.",
			},
			{
				id: 2,
				published_at: "2023-04-19T19:58:45.137097",
				title:
					"A16z’s hyped-up orange balls revealed to be an L2 rollup client",
				link: "https://cointelegraph.com/news/a16z-s-hyped-up-orange-balls-revealed-to-be-an-l2-rollup-client",
				source: {
					kind: "news",
					path: null,
					title: "Cointelegraph",
					domain: "cointelegraph.com",
					region: "en",
				},
				text: "An earlier series of tweets sharing images of orange balls were the precursor to the announcement of a client for layer-2 solution Optimism.",
			},
			{
				id: 3,
				published_at: "2023-01-16T22:42:43.137097",
				title:
					"Crypto industry has ushered in a buoyant new year, what’s in store for Q2?",
				link: "https://ambcrypto.com/crypto-industry-has-ushered-in-a-buoyant-new-year-whats-in-store-for-q2/",
				source: {
					kind: "news",
					path: null,
					title: "Ambcrypto",
					domain: "ambcrypto.com",
					region: "en",
				},
				text: "The crypto market showed massive growth in the first quarter of 2023, diverting from the bearish sentiments of 2022. However, it needs to be seen what's next for the market in Q2.",
			},
			{
				id: 4,
				published_at: "2023-01-16T22:42:43.137097",
				title:
					"Crypto industry has ushered in a buoyant new year, what’s in store for Q2?",
				link: "https://ambcrypto.com/crypto-industry-has-ushered-in-a-buoyant-new-year-whats-in-store-for-q2/",
				source: {
					kind: "news",
					path: null,
					title: "Ambcrypto",
					domain: "ambcrypto.com",
					region: "en",
				},
				text: "The crypto market showed massive growth in the first quarter of 2023, diverting from the bearish sentiments of 2022. However, it needs to be seen what's next for the market in Q2.",
			},
			{
				id: 5,
				published_at: "2023-01-16T22:42:43.137097",
				title:
					"Crypto industry has ushered in a buoyant new year, what’s in store for Q2?",
				link: "https://ambcrypto.com/crypto-industry-has-ushered-in-a-buoyant-new-year-whats-in-store-for-q2/",
				source: {
					kind: "news",
					path: null,
					title: "Ambcrypto",
					domain: "ambcrypto.com",
					region: "en",
				},
				text: "The crypto market showed massive growth in the first quarter of 2023, diverting from the bearish sentiments of 2022. However, it needs to be seen what's next for the market in Q2.",
			},
			{
				id: 6,
				published_at: "2023-01-16T22:42:43.137097",
				title:
					"Crypto industry has ushered in a buoyant new year, what’s in store for Q2?",
				link: "https://ambcrypto.com/crypto-industry-has-ushered-in-a-buoyant-new-year-whats-in-store-for-q2/",
				source: {
					kind: "news",
					path: null,
					title: "Ambcrypto",
					domain: "ambcrypto.com",
					region: "en",
				},
				text: "The crypto market showed massive growth in the first quarter of 2023, diverting from the bearish sentiments of 2022. However, it needs to be seen what's next for the market in Q2.",
			},
		],
	};

	return {
		props: {
			metaTitle: "Web3 News - EdgeIn.io",
			// metaDescription: "",
			initialNews: news?.news || [],
		},
	};
};

export default News;
