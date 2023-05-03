import React, { Fragment, useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ElemHeading } from "@/components/elem-heading";
import { ElemNewsCard } from "@/components/news/elem-news-card";
import { useIntercom } from "react-use-intercom";
import { PlaceholderNewsCard } from "@/components/placeholders";
import { runGraphQl } from "../utils";
import toast, { Toaster } from "react-hot-toast";

import { GetNewsDocument, GetNewsQuery, Order_By } from "@/graphql/types";

type Props = {
	initialNews: GetNewsQuery["news"];
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
	const { data: news } = await runGraphQl<GetNewsQuery>(GetNewsDocument, {
		offset: 0,
		limit: 50,
		order: Order_By.Desc,
		where: {
			_and: [{ status: { _eq: "published" } }],
		},
	});

	return {
		props: {
			metaTitle: "Web3 News - EdgeIn.io",
			// metaDescription: "",
			initialNews: news?.news || [],
		},
	};
};

export default News;
