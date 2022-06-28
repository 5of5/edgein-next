import React, { useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
// import { ElemButton } from "../components/ElemButton";
import { ElemHeading } from "../components/ElemHeading";
import { ElemFiltersWrap } from "../components/ElemFiltersWrap";
import { ElemPhoto } from "../components/ElemPhoto";
import { InputSearch } from "../components/InputSearch";
import { InputSelect } from "../components/InputSelect";
import { IconCash } from "../components/Icons";
import {
	GetVcFirmsDocument,
	GetVcFirmsQuery,
	useGetVcFirmsQuery,
	Vc_Firms_Bool_Exp,
} from "../graphql/types";
import { DeepPartial, NumericFilter } from "./companies";
import { useDebounce } from "../hooks/useDebounce";
import { Pagination } from "../components/Pagination";
import { runGraphQl } from "../utils";

type Props = {
	vcFirmCount: number;
	initialVCFirms: GetVcFirmsQuery["vc_firms"];
	numberOfInvestments: NumericFilter[];
};

const Investors: NextPage<Props> = ({
	vcFirmCount,
	initialVCFirms,
	numberOfInvestments,
}) => {
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
		_and: [{ slug: { _neq: "" } }],
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
	});

	if (!isLoading && initialLoad) {
		setInitialLoad(false);
	}
	const vcFirms = initialLoad ? initialVCFirms : vcFirmsData?.vc_firms;

	return (
		<div>
			<Head>
				<title>Web3 Investors - EdgeIn.io</title>
				<meta
					name="description"
					content="We're tracking investments made in web3 companies and projects to provide you with an index of the most active and influential capital in the industry."
				/>
			</Head>
			<div>
				<ElemHeading
					title="Investors"
					subtitle="We're tracking investments made in web3 companies and projects to provide you with an index of the most active and influential capital in the industry."
				>
					{/* <ElemButton href="/" btn="dark" arrow className="mt-6">
						Submit VC Firm
					</ElemButton> */}
				</ElemHeading>

				<div className="bg-gray-50 relative z-10 rounded-t-3xl lg:rounded-t-8xl">
					<div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10 lg:min-h-[40vh]">
						<ElemFiltersWrap className="filters-wrap">
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

						<div className="w-full flex flex-col gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3">
							{error ? (
								<h4>Error loading investors</h4>
							) : isLoading && !initialLoad ? (
								<h4>Loading...</h4>
							) : (
								vcFirms?.map((vcfirm) => (
									<Link key={vcfirm.id} href={`/investors/${vcfirm.slug}`}>
										<a className="bg-white rounded-lg overflow-hidden cursor-pointer p-5 flex flex-col mx-auto w-full max-w-md group transition duration-300 ease-in-out transform hover:scale-102 hover:shadow-lg focus:ring focus:ring-primary-300 md:h-full">
											<div className="w-full flex items-center">
												<ElemPhoto
													photo={vcfirm.logo}
													wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow-md"
													imgClass="object-fit max-w-full max-h-full"
													imgAlt={vcfirm.name}
												/>
												<div className="w-full ml-3 space-y-1 overflow-hidden">
													<h3
														className="inline text-2xl align-middle line-clamp-1 font-bold min-w-0 break-words text-dark-500 sm:text-lg md:text-xl group-hover:opacity-60"
														title={vcfirm.name ?? ""}
													>
														{vcfirm.name}
													</h3>
													{vcfirm.num_of_investments !== null &&
														vcfirm.num_of_investments > 0 && (
															<div className="inline-flex hover:opacity-70">
																<IconCash
																	title="Investments"
																	className="h-6 w-6 mr-1 text-primary-500"
																/>
																<span className="font-bold mr-1">
																	{vcfirm.num_of_investments}
																</span>
																Investment
																{vcfirm.num_of_investments > 1 && "s"}
															</div>
														)}
												</div>
											</div>
										</a>
									</Link>
								))
							)}
						</div>
						<Pagination
							count={vcFirmCount}
							page={page}
							rowsPerPage={limit}
							onPageChange={setPage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: vcFirms } = await runGraphQl<GetVcFirmsQuery>(
		GetVcFirmsDocument,
		{ where: { slug: { _neq: "" } } }
	);

	return {
		props: {
			vcFirmCount: vcFirms?.vc_firms.length,
			initialVCFirms: vcFirms?.vc_firms,
			numberOfInvestments: InvestmentsFilters,
		},
	};
};

export default Investors;

type IconProps = {
	className?: string;
	title?: string;
};

// const IconCash: React.FC<IconProps> = ({ className, title }) => {
// 	return (
// 		<svg
// 			className={className}
// 			xmlns="http://www.w3.org/2000/svg"
// 			fill="none"
// 			viewBox="0 0 24 24"
// 			stroke="currentColor"
// 			strokeWidth="2"
// 		>
// 			<title>{title}</title>
// 			<path
// 				strokeLinecap="round"
// 				strokeLinejoin="round"
// 				d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
// 			/>
// 		</svg>
// 	);
// };

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
		rangeEnd: 9999999999999,
	},
];
