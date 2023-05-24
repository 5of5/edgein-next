import React, { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { useStateParams } from "@/hooks/use-state-params";
import { Pagination } from "@/components/pagination";
import { useRouter } from "next/router";
import { ElemHeading } from "@/components/elem-heading";
import { ElemNewsCard } from "@/components/news/elem-news-card";
import { useIntercom } from "react-use-intercom";
import { PlaceholderNewsCard } from "@/components/placeholders";
import { runGraphQl } from "../utils";
import toast, { Toaster } from "react-hot-toast";
import { IconAnnotation, IconSearch } from "@/components/icons";

import {
	News,
	GetNewsDocument,
	GetNewsQuery,
	useGetNewsQuery,
	News_Bool_Exp,
	Order_By,
} from "@/graphql/types";
import { DeepPartial } from "@/types/common";

type Props = {
	newsCount: number;
	initialNews: GetNewsQuery["news"];
};

const NewsPage: NextPage<Props> = ({ newsCount, initialNews }) => {
	const [initialLoad, setInitialLoad] = useState(true);
	const router = useRouter();
	const { show } = useIntercom();

	const [page, setPage] = useStateParams<number>(
		0,
		"page",
		(pageIndex) => pageIndex + 1 + "",
		(pageIndex) => Number(pageIndex) - 1
	);
	const limit = 50;
	const offset = limit * page;

	const filters: DeepPartial<News_Bool_Exp> = {
		_and: [{ status: { _eq: "published" } }],
	};

	const {
		data: newsData,
		error,
		isLoading,
	} = useGetNewsQuery({
		offset,
		limit,
		order: Order_By.Desc,
		where: filters as News_Bool_Exp,
	});

	if (!isLoading && initialLoad) {
		setInitialLoad(false);
	}

	const news = initialLoad ? initialNews : newsData?.news;
	const news_aggregate = initialLoad
		? newsCount
		: newsData?.news_aggregate?.aggregate?.count || 0;

	return (
		<div className="relative overflow-hidden">
			<ElemHeading
				title="News"
				subtitle="Get the latest news, guides, price and analysis on Web3."
				className=""
			></ElemHeading>

			<div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow p-5">
					<h2 className="text-xl font-bold">Recent News</h2>

					{/* {news?.length === 0 && (
						<div className="flex items-center justify-center mx-auto min-h-[40vh]">
							<div className="w-full max-w-2xl my-8 p-8 text-center bg-white border rounded-2xl border-dark-500/10">
								<IconSearch className="w-12 h-12 mx-auto text-slate-300" />
								<h2 className="mt-5 text-3xl font-bold">No results found</h2>
								<div className="mt-1 text-lg text-slate-600">
									Please check spelling, try different filters, or tell us about
									missing data.
								</div>
								<ElemButton onClick={show} btn="white" className="mt-3">
									<IconAnnotation className="w-6 h-6 mr-1" />
									Tell us about missing data
								</ElemButton>
							</div>
						</div>
					)} */}

					<div className="mt-3 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{error ? (
							<h4>Error loading news</h4>
						) : isLoading && !initialLoad ? (
							<>
								{Array.from({ length: 6 }, (_, i) => (
									<PlaceholderNewsCard key={i} />
								))}
							</>
						) : (
							news?.map((item) => (
								<ElemNewsCard
									key={item.id}
									newsPost={item}
									//tagOnClick={filterByTag}
								/>
							))
						)}
					</div>

					<Pagination
						shownItems={news?.length}
						totalItems={news_aggregate}
						page={page}
						itemsPerPage={limit}
						numeric
						onClickPrev={() => setPage(page - 1)}
						onClickNext={() => setPage(page + 1)}
						onClickToPage={(selectedPage) => setPage(selectedPage)}
					/>
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
			metaDescription:
				"Get the latest news, guides, price and analysis on Web3",
			newsCount: news?.news_aggregate?.aggregate?.count || 0,
			initialNews: news?.news || [],
		},
	};
};

export default NewsPage;
