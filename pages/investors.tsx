import React, { useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { PlaceholderInvestorCard } from "@/components/Placeholders";
import { ElemRecentInvestments } from "@/components/Investors/ElemRecentInvestments";
import { ElemHeading } from "../components/ElemHeading";
import { ElemFiltersWrap } from "../components/ElemFiltersWrap";
import { ElemPhoto } from "../components/ElemPhoto";
import { InputSearch } from "../components/InputSearch";
import { InputSelect } from "../components/InputSelect";
import { ElemButton } from "@/components/ElemButton";
import { IconCash, IconSearch, IconAnnotation } from "@/components/Icons";
import {
	GetVcFirmsDocument,
	GetVcFirmsQuery,
	useGetVcFirmsQuery,
	Vc_Firms_Bool_Exp,
	Vc_Firms,
	Lists,
	Follows_Vc_Firms,
} from "../graphql/types";
import { DeepPartial, NumericFilter } from "./companies";
import { useDebounce } from "../hooks/useDebounce";
import { Pagination } from "../components/Pagination";
import { runGraphQl } from "../utils";
import { ElemReactions } from "@/components/ElemReactions";
import { ElemSaveToList } from "@/components/ElemSaveToList";
import { getName, getNewFollows, getNewTempSentiment, isFollowsExists, reactOnSentiment } from "@/utils/reaction";
import { useAuth } from "@/hooks/useAuth";
import { has, remove } from "lodash";

type Props = {
	vcFirmCount: number;
	initialVCFirms: GetVcFirmsQuery["vc_firms"];
	numberOfInvestments: NumericFilter[];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Investors: NextPage<Props> = ({
	vcFirmCount,
	initialVCFirms,
	numberOfInvestments,
	setToggleFeedbackForm,
}) => {
	const { user } = useAuth();
	const [initialLoad, setInitialLoad] = useState(true);

	// Search Box
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);

	// Investments Count
	const [selectedInvestmentCount, setSelectedInvestmentCount] = useState(
		numberOfInvestments[0]
	);

	const [page, setPage] = useState<number>(0);
	const limit = 50;
	const offset = limit * page;

	useEffect(() => {
		setPage(0);
		if (
			initialLoad &&
			debouncedSearchTerm !== "" &&
			selectedInvestmentCount.rangeEnd !== 0
		) {
			setInitialLoad(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchTerm, selectedInvestmentCount]);

	const filters: DeepPartial<Vc_Firms_Bool_Exp> = {
		_and: [{ slug: { _neq: "" }, status: { _eq: "published" } }],
	};
	if (debouncedSearchTerm !== "") {
		filters._and?.push({ name: { _ilike: `%${debouncedSearchTerm}%` } });
	}
	if (selectedInvestmentCount.rangeEnd !== 0) {
		filters._and?.push({
			_and: [
				{ num_of_investments: { _gt: selectedInvestmentCount.rangeStart } },
				{ num_of_investments: { _lte: selectedInvestmentCount.rangeEnd } },
			],
		});
	}

	const {
		data: vcFirmsData,
		error,
		isLoading,
	} = useGetVcFirmsQuery({
		offset,
		limit,
		where: filters as Vc_Firms_Bool_Exp,
		current_user: user?.id ?? 0,
	});

	if (!isLoading && initialLoad) {
		setInitialLoad(false);
	}

	// const vcFirms = initialLoad ? initialVCFirms : vcFirmsData?.vc_firms;

	const [vcFirms, setVcFirms] = useState(
		initialLoad ? initialVCFirms : vcFirmsData?.vc_firms
	);

	useEffect(() => {
		setVcFirms(vcFirmsData?.vc_firms);
	}, [vcFirmsData]);

	const handleReactionClick =
		(vcFirm: GetVcFirmsQuery["vc_firms"][0]) =>
			(sentiment: string, alreadyReacted: boolean) =>
				async (
					event: React.MouseEvent<
						HTMLButtonElement | HTMLInputElement | HTMLElement
					>
				) => {
					event.stopPropagation();
					event.preventDefault();

					setTemporary(vcFirm, sentiment, alreadyReacted)

					const newSentiment = await reactOnSentiment({
						vcfirm: vcFirm?.id!,
						sentiment,
						pathname: `/investors/${vcFirm?.slug!}`,
					});

					setVcFirms((prev) => {
						return [...(prev || ([] as Vc_Firms[]))].map((item) => {
							if (item.id === vcFirm.id) {
								const newFollows = getNewFollows(
									sentiment,
									"vcfirm"
								) as Follows_Vc_Firms;

								if (!alreadyReacted && !isFollowsExists(item.follows as Follows_Vc_Firms[], sentiment)) item.follows.push(newFollows)
								else
									remove(item.follows, (list) => {
										return getName(list.list! as Lists) === sentiment
									});

								return { ...item, sentiment: newSentiment }
							}
							return item;
						})
					})
				}

	const setTemporary = (vcFirm: GetVcFirmsQuery['vc_firms'][0], sentiment: string, alreadyReacted: boolean) => {
		setVcFirms((prev) => {
			return [...(prev || ([] as Vc_Firms[]))].map((item) => {
				if (item.id === vcFirm.id) {

					const newSentiment = getNewTempSentiment({ ...item.sentiment }, sentiment, alreadyReacted)

					const newFollows = getNewFollows(
						sentiment,
						"vcfirm"
					) as Follows_Vc_Firms;

					if (!alreadyReacted) item.follows.push(newFollows)
					else
						remove(item.follows, (list) => {
							return getName(list.list! as Lists) === sentiment
						});

					return { ...item, sentiment: newSentiment }
				}
				return item;
			}) as Vc_Firms[]
		})
	}

	return (
		<div>
			<ElemHeading
				title="Investors"
				subtitle="We're tracking investments made in web3 companies and projects to provide you with an index of the most active and influential capital in the industry."
			>
				{/* <ElemButton href="/" btn="dark" arrow className="mt-6">
						Submit VC Firm
					</ElemButton> */}
			</ElemHeading>

			<div className="max-w-7xl px-4 mx-auto relative z-10 sm:px-6 lg:px-8">
				{vcFirms && <ElemRecentInvestments heading="Recent Investor Updates" />}
			</div>
			<div className="max-w-7xl px-4 mx-auto mt-7 relative z-10 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg p-5">
					<h2 className="text-xl font-bold">All Investors</h2>
					<ElemFiltersWrap className="pt-2 filters-wrap">
						<InputSearch
							className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
							label="Search"
							name="search"
							value={search}
							placeholder="Quick Search..."
							onChange={(e: {
								target: { value: React.SetStateAction<string> };
							}) => setSearch(e.target.value)}
						/>
						<InputSelect
							className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
							value={selectedInvestmentCount}
							onChange={setSelectedInvestmentCount}
							options={numberOfInvestments}
						/>
					</ElemFiltersWrap>

					{vcFirms?.length === 0 && (
						<>
							<div className="flex items-center justify-center  mx-auto min-h-[40vh]">
								<div className="w-full max-w-2xl py-8 text-center bg-white border rounded-2xl border-dark-500/10">
									<IconSearch className="w-12 h-12 mx-auto text-slate-300" />
									<h2 className="mt-5 text-3xl font-bold">No results found</h2>
									<div className="mt-1 text-lg text-dark-400">
										Please check spelling, try different filters, or tell us
										about missing data.
									</div>
									<ElemButton
										onClick={() => setToggleFeedbackForm(true)}
										btn="white"
										className="mt-3"
									>
										<IconAnnotation className="w-6 h-6 mr-1" />
										Tell us about missing data
									</ElemButton>
								</div>
							</div>
						</>
					)}

					<div className="flex flex-col w-full gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3">
						{error ? (
							<h4>Error loading investors</h4>
						) : isLoading && !initialLoad ? (
							<>
								{Array.from({ length: 15 }, (_, i) => (
									<PlaceholderInvestorCard key={i} />
								))}
							</>
						) : (
							vcFirms?.map((vcfirm) => (
								<a
									href={`/investors/${vcfirm.slug}`}
									key={vcfirm.id}
									className="flex flex-col mx-auto w-full p-5 cursor-pointer rounded-lg border border-dark-500/10 transition-all hover:scale-102 hover:shadow md:h-full"
								>
									<div className="flex shrink-0 w-full">
										<ElemPhoto
											photo={vcfirm.logo}
											wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow"
											imgClass="object-fit max-w-full max-h-full"
											imgAlt={vcfirm.name}
										/>
										<div className="flex items-center justify-center pl-2 md:overflow-hidden">
											<h3
												className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 sm:text-lg md:text-xl xl:text-2xl"
												title={vcfirm.name ?? ""}
											>
												{vcfirm.name}
											</h3>
										</div>
									</div>

									<div className="flex flex-wrap space-x-6 text-slate-600 mt-4">
										{vcfirm.num_of_investments !== null &&
											vcfirm.num_of_investments > 0 && (
												<div>
													<span className="font-bold mr-1">
														{vcfirm.num_of_investments}
													</span>
													Investment
													{vcfirm.num_of_investments > 1 && "s"}
												</div>
											)}

										{/* num_of_exits field needs to be added to DB */}
										{/* {vcfirm.num_of_exits !== null && vcfirm.num_of_exits > 0 && (
											<div>
												<span className="font-bold mr-1">
													{vcfirm.num_of_exits}
												</span>
												Exit
												{vcfirm.num_of_exits > 1 && "s"}
											</div>
										)} */}
									</div>

									<div className="flex items-center justify-between mt-4">
										<ElemReactions
											data={vcfirm}
											handleReactionClick={handleReactionClick(vcfirm)}
										/>
										<ElemSaveToList
											follows={vcfirm?.follows}
											onCreateNew={handleReactionClick(vcfirm)}
										/>
									</div>
								</a>
							))
						)}
					</div>
					<Pagination
						shownItems={vcFirms?.length}
						totalItems={vcFirmCount}
						page={page}
						itemsPerPage={limit}
						onClickPrev={() => setPage((prev) => prev - 1)}
						onClickNext={() => setPage((prev) => prev + 1)}
					/>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: vcFirms } = await runGraphQl<GetVcFirmsQuery>(
		GetVcFirmsDocument,
		{
			offset: 0,
			limit: 50,
			where: { slug: { _neq: "" }, status: { _eq: "published" } },
			current_user: 0,
		}
	);

	return {
		props: {
			metaTitle: "Web3 Investors - EdgeIn.io",
			metaDescription:
				"We're tracking investments made in web3 companies and projects to provide you with an index of the most active and influential capital in the industry.",
			vcFirmCount: vcFirms?.vc_firms?.length || null,
			initialVCFirms: vcFirms?.vc_firms || null,
			numberOfInvestments: InvestmentsFilters,
		},
	};
};

export default Investors;

// Total Investments Filter
const InvestmentsFilters: NumericFilter[] = [
	{
		title: "Number of Investments",
		rangeStart: 0,
		rangeEnd: 0,
	},
	{
		title: "5 or less Investments",
		rangeStart: 1,
		rangeEnd: 5,
	},
	{
		title: "6-15 Investments",
		rangeStart: 6,
		rangeEnd: 15,
	},
	{
		title: "16-25 Investments",
		rangeStart: 16,
		rangeEnd: 25,
	},
	{
		title: "25+ Investments",
		rangeStart: 25,
		rangeEnd: 1000000000,
	},
];
