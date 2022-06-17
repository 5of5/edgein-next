import React, { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
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
import {
	runGraphQl,
	truncateWords,
	inRange,
} from "../utils";
import { GetCompaniesDocument, GetCompaniesQuery } from "../graphql/types";

type Props = {
	companies: GetCompaniesQuery['companies'];
	companyLayers: any[];
	amountRaised: Record<string, any>[];
	totalEmployees: Record<string, any>[];
};

const Companies: NextPage<Props> = ({
	companyLayers,
	companies,
	amountRaised,
	totalEmployees,
}) => {
	const router = useRouter();

	// Search Box
	const [search, setSearch] = useState("");

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
				>
					{/* <ElemButton href="/" btn="dark" arrow className="mt-6">
						Submit company
					</ElemButton> */}
				</ElemHeading>

				<div className="bg-gray-50 relative z-10 rounded-t-3xl lg:rounded-t-8xl">
					<div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10">
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

							<div className="hidden md:block md:shrink md:basis-0 ">
								<div
									className="px-4 py-1.5 cursor-pointer rounded-md bg-white hover:text-primary-500 hover:ring hover:ring-primary-100"
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

						<div
							className={`grid gap-5 grid-cols-1 md:grid-cols-${
								toggleViewMode ? "1" : "2"
							} lg:grid-cols-${toggleViewMode ? "1" : "3"}`}
						>
							{companies
								.filter(
									(company) =>
										!search ||
										company.name
											?.toLowerCase()
											.includes(search.toLowerCase()) ||
										getCoinTicker(company.coin)
											?.toLowerCase()
											.includes(search.toLowerCase())
								)
								.filter(
									(company) =>
										!selectedLayer.title ||
										selectedLayer.title === "All Layers" ||
										company.layer?.includes(selectedLayer.title)
								)
								.filter(
									(company) =>
										!selectedAmountRaised.number ||
										((company.investor_amount || 0) >=
											selectedAmountRaised.rangeStart &&
											(company.investor_amount || 0) <= selectedAmountRaised.rangeEnd)
								)
								.filter(
									(company) =>
										!selectedTotalEmployees.number ||
										(company.total_employees >=
											selectedTotalEmployees.rangeStart &&
											company.total_employees <= selectedTotalEmployees.rangeEnd)
								)
								.map((company) => {
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
													{company.coin &&
															<ElemTooltip
																content={`Token: ${company.coin.ticker}`}
																className="ml-1 inline-block self-center align-middle whitespace-nowrap px-2 py-1 rounded-md text-dark-400 bg-gray-50"
															>
																<span className=" text-sm font-bold leading-sm uppercase">
																	{company.coin.ticker}
																</span>
															</ElemTooltip>
													}
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
												{/* <span>
													Amount Raised: $
													{convertToInternationalCurrencySystem(company.investorAmount)}
												</span> */}

												{/* <span>Total Employees: #{company.totalEmployees}</span> */}

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
								})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: companies } = await runGraphQl<GetCompaniesQuery>(GetCompaniesDocument);

	// Layers Filter
	const getUniqueLayers = [
		...Array.from(
			new Set(companies?.companies.map((comp: { layer: any }) => comp.layer))
		),
	].sort();

	const setCompanyLayersDetails = getUniqueLayers.map(
		(str: any, index: any) => {
			let layerDetails = null;

			if (str === "Layer 0") {
				layerDetails = "Native Code";
			} else if (str === "Layer 1") {
				layerDetails = "Programmable Blockchains / Networks";
			} else if (str === "Layer 2") {
				layerDetails = "Nodes / Node Providers / Data Platforms";
			} else if (str === "Layer 3") {
				layerDetails = "API's / API Providers / Systems";
			} else if (str === "Layer 4") {
				layerDetails = "Decentralized Platforms / Contract/Modeling";
			} else if (str === "Layer 5") {
				layerDetails = "Applications";
			} else if (str === "Layer 6") {
				layerDetails = "Interoperable Digital Assets / NFT's";
			}

			return {
				id: index,
				title: str,
				description: layerDetails,
			};
		}
	);

	setCompanyLayersDetails.unshift({
		id: 9999,
		title: "All Layers",
		description: null,
	});

	const companyLayers = setCompanyLayersDetails.filter((o) => o.title);

	// Amount Raised Filter
	const getAmountRaised = [
		...Array.from(
			new Set(
				companies?.companies.map(
					(comp, index: any) => {
						const amount = Number(comp?.investor_amount) || 0;

						let text = null;
						let rangeStart = null;
						let rangeEnd = null;

						if (amount === 0) {
							text = "All Funding Amounts";
							rangeStart = 0;
							rangeEnd = 0;
						} else if (amount < 10e5) {
							text = "Less than $1M";
							rangeStart = 0;
							rangeEnd = 10e5 - 1; //999999
						} else if (amount === 10e5) {
							text = "$1M";
							rangeStart = 10e5;
							rangeEnd = 10e5;
						} else if (inRange(amount, 10e5 + 1, 10e6)) {
							text = "$1M-$10M";
							rangeStart = 10e5 + 1;
							rangeEnd = 10e6;
						} else if (inRange(amount, 10e6 + 1, 20e6)) {
							text = "$11M-$20M";
							rangeStart = 10e6 + 1;
							rangeEnd = 20e6;
						} else if (inRange(amount, 20e6 + 1, 50e6)) {
							text = "$21M-$50M";
							rangeStart = 20e6 + 1;
							rangeEnd = 50e6;
						} else if (inRange(amount, 50e6 + 1, 10e7)) {
							text = "$51M-$100M";
							rangeStart = 50e6 + 1;
							rangeEnd = 10e7;
						} else if (inRange(amount, 10e7 + 1, 20e7)) {
							text = "$101M-$200M";
							rangeStart = 10e7 + 1;
							rangeEnd = 20e7;
						} else if (amount > 20e7) {
							text = "$200M+";
							rangeStart = 20e7;
							rangeEnd = 90e14;
						}

						return {
							id: index,
							title: text,
							//description: "",
							number: amount,
							rangeStart: rangeStart,
							rangeEnd: rangeEnd,
						};
					}
				)
			)
		),
	];

	const amountRaisedGroups: any[] = [];

	const uniqueAmountRaisedGroups = getAmountRaised
		.filter((group: any) => {
			const isDuplicate = amountRaisedGroups.includes(group.title);

			if (!isDuplicate) {
				amountRaisedGroups.push(group.title);
				return true;
			}
			return false;
		})
		.sort((a: any, b: any) => a.number - b.number);

	// Total Employees Filter
	const getEmployeesCount = [
		...Array.from(
			new Set(
				companies?.companies.map(
					(comp, index: any) => {
						const count = Number(comp.total_employees) || 0;

						let text = null;
						let rangeStart = null;
						let rangeEnd = null;

						if (count === 0) {
							text = "Number of Employees";
							rangeStart = 0;
							rangeEnd = 0;
						} else if (count < 10) {
							text = "Less than 10 Employees";
							rangeStart = 0;
							rangeEnd = 9;
						} else if (inRange(count, 10, 15)) {
							text = "10-15 Employees";
							rangeStart = 10;
							rangeEnd = 15;
						} else if (inRange(count, 16, 30)) {
							text = "16-20 Employees";
							rangeStart = 16;
							rangeEnd = 30;
						} else if (inRange(count, 31, 100)) {
							text = "31-100 Employees";
							rangeStart = 31;
							rangeEnd = 100;
						} else if (inRange(count, 101, 200)) {
							text = "101-200 Employees";
							rangeStart = 101;
							rangeEnd = 200;
						} else if (inRange(count, 201, 500)) {
							text = "201-500 Employees";
							rangeStart = 201;
							rangeEnd = 500;
						} else if (inRange(count, 501, 1000)) {
							text = "501-1000 Employees";
							rangeStart = 501;
							rangeEnd = 1000;
						} else if (count > 1000) {
							text = "1000+ Employees";
							rangeStart = 1001;
							rangeEnd = 90e14;
						}

						return {
							id: index,
							title: text,
							//description: "",
							number: count,
							rangeStart: rangeStart,
							rangeEnd: rangeEnd,
						};
					}
				)
			)
		),
	];

	const employeeGroups: any[] = [];

	const uniqueEmployeeGroups = getEmployeesCount
		.filter((group: any) => {
			const isDuplicate = employeeGroups.includes(group.title);

			if (!isDuplicate) {
				employeeGroups.push(group.title);
				return true;
			}
			return false;
		})
		.sort((a: any, b: any) => a.number - b.number);

	return {
		props: {
			companies: companies?.companies,
			companyLayers,
			amountRaised: uniqueAmountRaisedGroups,
			totalEmployees: uniqueEmployeeGroups,
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

const getCoinTicker = (coins: any) => {
	if (!coins) {
		return "";
	}

	let ticker = "";

	coins?.map((coin: { ticker: any }) => {
		ticker = coin.ticker;
	});

	return ticker;
};
