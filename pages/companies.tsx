import React, { FC, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { ElemHeading } from "../components/ElemHeading";
import { ElemFiltersWrap } from "../components/ElemFiltersWrap";
import { InputSearch } from "../components/InputSearch";
import { InputSelect } from "../components/InputSelect";
import { ElemPhoto } from "../components/ElemPhoto";
import { ElemTooltip } from "../components/ElemTooltip";
import { ElemCredibility } from "../components/Company/ElemCredibility";
import { ElemVelocity } from "../components/Company/ElemVelocity";
import { runGraphQl, truncateWords } from "../utils";
import {
	Companies_Bool_Exp,
	GetCompaniesDocument,
	GetCompaniesQuery,
	String_Comparison_Exp,
	useGetCompaniesQuery,
} from "../graphql/types";
import { useDebounce } from "../hooks/useDebounce";
import { Pagination } from "../components/Pagination";

const FakeElemCompany: FC = () => {
	return (
		<div className="flex flex-col animate-pulse-fast p-5 bg-white rounded-lg md:h-full">
			<div className="flex items-center shrink-0 mb-4 w-full">
				<div className="aspect-square rounded-lg bg-slate-200 w-16 h-16"></div>
				<div className="flex-1 ml-2 h-6 max-w-full bg-slate-200 rounded"></div>
			</div>
			<div className="flex-1 space-y-4 py-1">
				<div className="h-2 bg-slate-200 rounded"></div>
				<div className="h-2 bg-slate-200 rounded"></div>
				<div className="h-2 bg-slate-200 rounded w-2/3"></div>
			</div>
			<div className="mt-8 grid grid-cols-2 gap-4">
				<div className="flex items-center space-x-2">
					<div className="aspect-square rounded-lg h-7 bg-slate-200"></div>
					<div className="aspect-square rounded-lg h-7 bg-slate-200"></div>
					<div className="aspect-square rounded-lg h-7 bg-slate-200"></div>
				</div>
				<div className="flex items-center justify-end space-x-2">
					<div className="rounded-full h-6 w-12 bg-slate-200"></div>
					<div className="rounded-full h-6 w-12 bg-slate-200"></div>
				</div>
			</div>
		</div>
	);
};

type Props = {
	companiesCount: number
	initialCompanies: GetCompaniesQuery['companies']
	companyLayers: TextFilter[];
	amountRaised: NumericFilter[];
	totalEmployees: NumericFilter[];
};

type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

const Companies: NextPage<Props> = ({
	companiesCount,
	initialCompanies,
	companyLayers,
	amountRaised,
	totalEmployees,
}) => {
	const [initialLoad, setInitialLoad] = useState(true);
	
	// Search Box
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);

	const searchCompanies = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setSearch(e.target.value);

		// Change url on search
		// router.push(`/companies/?search=${e.target.value}`, undefined, {
		// 	shallow: true,
		// });
	};

	// Company Layers Filter
	const [selectedLayer, setSelectedLayer] = useState(companyLayers[0]);

	// Amount Raised Filter
	const [selectedAmountRaised, setSelectedAmountRaised] = useState(
		amountRaised[0]
	);

	// Total Employees Filter
	const [selectedTotalEmployees, setSelectedTotalEmployees] = useState(
		totalEmployees[0]
	);

	// Layout Grid/List
	const [toggleViewMode, setToggleViewMode] = useState(false);

	const [page, setPage] = useState<number>(0);
	const limit = 50;
	const offset = limit * page;

	const filters: DeepPartial<Companies_Bool_Exp> = {
		_and: [{ slug: { _neq: "" } }],
	};
	if (debouncedSearchTerm !== "") {
		filters._and?.push({
			_or: [
				{ name: { _ilike: `%${debouncedSearchTerm}%` } },
				{ coin: { ticker: { _ilike: `%${debouncedSearchTerm}%` } } },
			],
		});
	}
	if (selectedLayer.value) {
		filters._and?.push({ layer: { _eq: selectedLayer.value } });
	}
	if (selectedAmountRaised.rangeEnd !== 0) {
		filters._and?.push({
			_and: [
				{ investor_amount: { _gt: selectedAmountRaised.rangeStart } },
				{ investor_amount: { _lte: selectedAmountRaised.rangeEnd } },
			],
		});
	}
	if (selectedTotalEmployees.rangeEnd !== 0) {
		filters._and?.push({
			_and: [
				{ total_employees: { _gt: selectedTotalEmployees.rangeStart } },
				{ total_employees: { _lte: selectedTotalEmployees.rangeEnd } },
			],
		});
	}

	const {
		data: companiesData,
		error,
		isLoading,
	} = useGetCompaniesQuery({
		offset,
		limit,
		where: filters as Companies_Bool_Exp,
	});

	if (!isLoading && initialLoad) {
		setInitialLoad(false)
	}
	const companies = initialLoad ? initialCompanies : companiesData?.companies

	return (
		<div>
			<Head>
				<title>Web3 Companies - EdgeIn.io</title>
				<meta
					name="description"
					content="Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset."
				/>
			</Head>
			<div>
				<ElemHeading
					title="Web3 Companies"
					subtitle="Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset."
				></ElemHeading>

				<div className="bg-gray-50 relative z-10 rounded-t-3xl lg:rounded-t-8xl">
					<div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10 lg:min-h-[40vh]">
						<ElemFiltersWrap className="filters-wrap">
							<InputSearch
								className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
								label="Search"
								name="search"
								value={search}
								placeholder="Quick Search..."
								onChange={searchCompanies}
							/>

							<InputSelect
								className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
								value={selectedLayer}
								onChange={setSelectedLayer}
								options={companyLayers}
							/>

							<InputSelect
								className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
								value={selectedAmountRaised}
								onChange={setSelectedAmountRaised}
								options={amountRaised}
							/>

							<InputSelect
								className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
								value={selectedTotalEmployees}
								onChange={setSelectedTotalEmployees}
								options={totalEmployees}
							/>

							<div className="hidden md:block md:shrink md:basis-0">
								<div
									className="px-4 py-1.5 cursor-pointer rounded-md bg-white border border-dark-500/10 hover:text-primary-500 hover:ring hover:ring-primary-100"
									onClick={() => setToggleViewMode(!toggleViewMode)}
								>
									{toggleViewMode ? (
										<div className="flex items-center">
											<IconGrid className="h-5 w-5 mr-1" />
											Grid
										</div>
									) : (
										<div className="flex items-center">
											<IconList className="h-5 w-5 mr-1" />
											List
										</div>
									)}
								</div>
							</div>
						</ElemFiltersWrap>

						{companies?.length === 0 && (
							<>
								<div className="flex items-center justify-center max-w-xl mx-auto min-h-[40vh] py-12 px-4">
									<div className="bg-white rounded-2xl border border-dark-500/10 p-6 text-center">
										<h2 className="text-3xl lg:text-4xl font-bold">
											No results found
										</h2>
										<p className="mt-2 text-xl text-dark-400">
											Please check spelling or try different filters.
										</p>
									</div>
								</div>
							</>
						)}

						<div
							className={`grid gap-5 grid-cols-1 md:grid-cols-${
								toggleViewMode ? "1" : "2"
							} lg:grid-cols-${toggleViewMode ? "1" : "3"}`}
						>
							{isLoading && !initialLoad ? (
								<>
									{Array.from({ length: 9 }, (_, i) => (
										<FakeElemCompany key={i} />
									))}
								</>
							) : (
								companies?.map((company) => {
									return (
										<Link key={company.id} href={`/companies/${company.slug}`}>
											<a
												className={`flex flex-col ${
													toggleViewMode ? "md:flex-row" : ""
												} mx-auto w-full p-5 cursor-pointer bg-white rounded-lg group transform transition duration-300 ease-in-out hover:scale-102 hover:shadow-lg focus:ring focus:ring-primary-300 md:h-full`}
											>
												<div
													className={`flex shrink-0 mb-4 ${
														toggleViewMode
															? "md:items-center md:mb-0 md:mr-4 md:w-64 lg:w-72"
															: "w-full"
													}`}
												>
													<ElemPhoto
														photo={company.logo}
														wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow-md"
														imgClass="object-fit max-w-full max-h-full"
														imgAlt={company.name}
													/>

													<div className="flex items-center justify-center pl-2 md:overflow-hidden">
														<h3
															className="inline text-2xl align-middle line-clamp-2 font-bold min-w-0 break-words text-dark-500 sm:text-lg md:text-xl xl:text-2xl group-hover:opacity-60"
															title={company.name ?? ""}
														>
															{company.name}
														</h3>
													</div>
													{company.coin && (
														<ElemTooltip
															content={`Token: ${company.coin.ticker}`}
															className="ml-1 inline-block self-center align-middle whitespace-nowrap px-2 py-1 rounded-md text-dark-400 bg-gray-50"
														>
															<span className=" text-sm font-bold leading-sm uppercase">
																{company.coin.ticker}
															</span>
														</ElemTooltip>
													)}
												</div>

												{company.overview && (
													<div
														className={`text-gray-400 grow ${
															toggleViewMode &&
															"flex items-center max-w-sm mr-4"
														}`}
													>
														{truncateWords(company.overview, 18)}
													</div>
												)}

												{/* {company.layer && (
												<div
													className={`${getLayerClass(
														company.layer
													)} self-start text-xs font-bold leading-sm uppercase mt-4 px-3 py-1 rounded-full`}
												>
													{company.layer}
												</div>
											)} */}
												<div
													className={`flex flex-row justify-between mt-4 shrink-0 lg:flex-row ${
														toggleViewMode
															? "md:flex-col md:justify-center md:ml-auto md:flex md:items-end md:mt-0 lg:flex-row lg:items-center"
															: ""
													}`}
												>
													<ElemCredibility
														mini={true}
														className={`pr-4 ${
															toggleViewMode ? "md:pr-0 lg:pr-4" : ""
														}`}
														marketVerified={company.market_verified}
														githubVerified={company.github}
														linkedInVerified={company.company_linkedin}
													/>
													<ElemVelocity
														mini={true}
														className={`${
															toggleViewMode ? "md:pt-2 lg:pt-0" : ""
														}`}
														employeeListings={company.velocity_linkedin}
														tokenExchangeValue={company.velocity_token}
													/>
												</div>
											</a>
										</Link>
									);
								})
							)}
						</div>
						<Pagination count={companiesCount} page={page} rowsPerPage={limit} onPageChange={setPage} />
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: companies } = await runGraphQl<GetCompaniesQuery>(GetCompaniesDocument, {where: {slug: {_neq: ""}}});
		
	return {
		props: {
			companiesCount: companies?.companies.length,
			initialCompanies: companies?.companies.slice(0, 50),
			companyLayers: LayersFilters,
			amountRaised: AmountRaisedFilters,
			totalEmployees: EmployeesFilters,
		},
	};
};

type IconProps = {
	className?: string;
	title?: string;
};

const IconGrid: React.FC<IconProps> = ({ className, title = "Arrow" }) => {
	return (
		<svg
			viewBox="0 0 20 20"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
		>
			<title>{title}</title>
			<path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
		</svg>
	);
};

const IconList: React.FC<IconProps> = ({ className, title = "Arrow" }) => {
	return (
		<svg
			viewBox="0 0 20 20"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
		>
			<title>{title}</title>
			<path
				fillRule="evenodd"
				d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

export default Companies;

interface TextFilter {
	title: string;
	description?: string;
	value: string;
}

export interface NumericFilter {
	title: string;
	description?: string;
	rangeStart: number;
	rangeEnd: number;
}

const LayersFilters: TextFilter[] = [
	{
		title: "All Layers",
		value: "",
	},
	{
		title: "Layer 0",
		value: "Layer 0",
		description: "Native Code",
	},
	{
		title: "Layer 1",
		value: "Layer 1",
		description: "Programmable Blockchains / Networks",
	},
	{
		title: "Layer 2",
		value: "Layer 2",
		description: "Nodes / Node Providers / Data Platforms",
	},
	{
		title: "Layer 2",
		value: "Layer 2",
		description: "API's / API Providers / Systems",
	},
	{
		title: "Layer 4",
		value: "Layer 4",
		description: "Decentralized Platforms / Contract/Modeling",
	},
	{
		title: "Layer 5",
		value: "Layer 5",
		description: "Applications",
	},
	{
		title: "Layer 6",
		value: "Layer 6",
		description: "Interoperable Digital Assets / NFT's",
	},
];
// Amount Raised Filter
const AmountRaisedFilters: NumericFilter[] = [
	{
		title: "All Funding Amounts",
		rangeStart: 0,
		rangeEnd: 0,
	},
	{
		title: "Less than $1M",
		rangeStart: 0,
		rangeEnd: 10e5 - 1, //999999
	},
	{
		title: "$1M",
		rangeStart: 10e5,
		rangeEnd: 10e5,
	},
	{
		title: "$1M-$10M",
		rangeStart: 10e5 + 1,
		rangeEnd: 10e6,
	},
	{
		title: "$11M-$20M",
		rangeStart: 10e6 + 1,
		rangeEnd: 20e6,
	},
	{
		title: "$21M-$50M",
		rangeStart: 20e6 + 1,
		rangeEnd: 50e6,
	},
	{
		title: "$51M-$100M",
		rangeStart: 50e6 + 1,
		rangeEnd: 10e7,
	},
	{
		title: "$101M-$200M",
		rangeStart: 10e7 + 1,
		rangeEnd: 20e7,
	},
	{
		title: "$200M+",
		rangeStart: 20e7,
		rangeEnd: 90e14,
	},
];
// Total Employees Filter
const EmployeesFilters: NumericFilter[] = [
	{
		title: "Number of Employees",
		rangeStart: 0,
		rangeEnd: 0,
	},
	{
		title: "Less than 10 Employees",
		rangeStart: 0,
		rangeEnd: 9,
	},
	{
		title: "10-15 Employees",
		rangeStart: 10,
		rangeEnd: 15,
	},
	{
		title: "16-30 Employees",
		rangeStart: 16,
		rangeEnd: 30,
	},
	{
		title: "31-100 Employees",
		rangeStart: 31,
		rangeEnd: 100,
	},
	{
		title: "101-200 Employees",
		rangeStart: 101,
		rangeEnd: 200,
	},
	{
		title: "201-500 Employees",
		rangeStart: 201,
		rangeEnd: 500,
	},
	{
		title: "501-1000 Employees",
		rangeStart: 501,
		rangeEnd: 1000,
	},
	{
		title: "1000+ Employees",
		rangeStart: 1001,
		rangeEnd: 90e14,
	},
];
