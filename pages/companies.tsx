import React, { useState, Fragment } from "react";
import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Listbox, Transition } from "@headlessui/react";
import { ElemHeading } from "../components/ElemHeading";
import { ElemPhoto } from "../components/ElemPhoto";
import { InputSearch } from "../components/InputSearch";
import { ElemCredibility } from "../components/Company/ElemCredibility";
import { ElemVelocity } from "../components/Company/ElemVelocity";
import { runGraphQl, truncateWords } from "../utils";

type Props = {
	companies: Record<string, any>[];
	companyLayers: any[];
};

const Companies: NextPage<Props> = ({ companyLayers, companies }) => {
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

	// Company Layers
	const [selectedLayer, setSelectedLayer] = useState(companyLayers[0]);

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
						<div className="w-full flex flex-col py-5 gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3">
							<InputSearch
								label="Search"
								name="search"
								value={search}
								placeholder="Quick Search..."
								onChange={searchCompanies}
							/>

							<Listbox value={selectedLayer} onChange={setSelectedLayer}>
								{({ open }) => (
									<>
										<div className="relative">
											<Listbox.Button className="relative w-full text-dark-500 bg-white border border-transparent text-lg rounded-md pl-3 pr-10 py-1.5 text-left cursor-default focus:outline-none focus:border-primary-500 hover:ring hover:ring-primary-100 focus:ring focus:ring-primary-100">
												<div className="truncate">
													{selectedLayer?.name
														? selectedLayer.name
														: "All Layers"}
													{selectedLayer?.details && selectedLayer.details}
												</div>
												<div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
													<IconSelector className="h-5 w-5 text-gray-400" />
												</div>
											</Listbox.Button>

											<Transition
												show={open}
												as={Fragment}
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-xl max-h-60 rounded-md py-1 text-lg overflow-auto focus:outline-none">
													{companyLayers.map((option: any) => (
														<Listbox.Option
															key={option.id}
															value={option}
															className={({ active }) =>
																`${
																	active
																		? "text-primary-500 bg-primary-100"
																		: "text-dark-500"
																} cursor-default select-none relative py-2 pl-3 pr-9`
															}
														>
															{({ selected }) => (
																<>
																	<div
																		className={`${
																			selected ? "font-bold" : "font-normal"
																		} truncate align-bottom`}
																		title={`${
																			option.name ? option.name : "All Layers"
																		}${option.details ? option.details : ""}`}
																	>
																		{option.name ? option.name : "All Layers"}
																		<span className="text-gray-400 text-sm">
																			{option.details ? option.details : ""}
																		</span>
																	</div>

																	{selected && (
																		<div className="absolute z-50 inset-y-0 right-0 flex items-center pr-4 text-primary-500">
																			<IconCheck className="h-5 w-5" />
																		</div>
																	)}
																</>
															)}
														</Listbox.Option>
													))}
												</Listbox.Options>
											</Transition>
										</div>
									</>
								)}
							</Listbox>

							<div className="hidden ml-auto md:block">
								<div
									className="px-4 py-2 cursor-pointer rounded-md bg-white hover:text-primary-500 hover:ring hover:ring-primary-100"
									onClick={() => setToggleViewMode(!toggleViewMode)}
								>
									{toggleViewMode ? (
										<div className="flex items-center text-lg">
											<IconGrid className="h-5 w-5 mr-1" />
											Grid
										</div>
									) : (
										<div className="flex items-center text-lg">
											<IconList className="h-5 w-5 mr-1" />
											List
										</div>
									)}
								</div>
							</div>
						</div>

						<div
							className={`grid gap-5 grid-cols-1 md:grid-cols-${
								toggleViewMode ? "1" : "2"
							} lg:grid-cols-${toggleViewMode ? "1" : "3"}`}
						>
							{companies
								.filter(
									(company) =>
										!search ||
										company.title?.toLowerCase().includes(search.toLowerCase())
									// || company.coins
									// 	?.toLowerCase()
									// 	.includes(search.toLowerCase())
								)
								.filter(
									(company) =>
										!selectedLayer.name ||
										company.layer?.includes(selectedLayer.name)
								)
								.map((company) => (
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
													photos={company.logo}
													wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow-md"
													imgClass="object-fit max-w-full max-h-full"
													imgAlt={company.title}
												/>

												<div className="flex items-center justify-center pl-2 md:overflow-hidden">
													<h3
														className="inline text-2xl align-middle line-clamp-2 font-bold min-w-0 break-words text-dark-500 sm:text-lg md:text-xl xl:text-2xl group-hover:opacity-60"
														title={company.title}
													>
														{company.title}
													</h3>
												</div>
												{company.coins?.map((coin: any, i: number) => {
													return (
														<span
															key={i}
															className="ml-1 inline-block self-center align-middle whitespace-nowrap px-2 py-1.5 rounded-md text-sm font-medium leading-sm uppercase text-dark-400 bg-gray-50"
														>
															{coin.ticker}
														</span>
													);
												})}
											</div>

											{company.overview && (
												<div
													className={`text-gray-400 grow ${
														toggleViewMode && "flex items-center max-w-sm mr-4"
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
													marketVerified={company.marketVerified}
													githubVerified={company.github}
													linkedInVerified={company.companyLinkedIn}
												/>
												<ElemVelocity
													mini={true}
													className={`${
														toggleViewMode ? "md:pt-2 lg:pt-0" : ""
													}`}
													employeeListings={company.velocityLinkedIn}
													tokenExchangeValue={company.velocityToken}
												/>
											</div>
										</a>
									</Link>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: companies } = await runGraphQl(
		'{ companies(_order_by: {slug: "asc"}, _filter: {slug: {_ne: ""}}) { id, title, layer, coins { ticker }, slug, logo, overview, github, companyLinkedIn, marketVerified, velocityLinkedIn, velocityToken }}'
	);

	const getAllLayers = companies.companies.map(
		(comp: { layer: any }) => comp.layer
	);

	const getUniqueLayers = [...Array.from(new Set(getAllLayers))]
		.sort()
		.reverse();

	const companyLayers = getUniqueLayers.map((str: any, index: any) => {
		let layerDetails = null;

		if (str === "Layer 0") {
			layerDetails = " – Programming Language";
		} else if (str === "Layer 1") {
			layerDetails = " – Blockchain";
		} else if (str === "Layer 2") {
			layerDetails = " – Side Chains / Oracle";
		} else if (str === "Layer 3") {
			layerDetails = " – API";
		} else if (str === "Layer 4") {
			layerDetails = " – Helpers / Wallets / Extensions";
		} else if (str === "Layer 5") {
			layerDetails = "";
		} else if (str === "Layer 6") {
			layerDetails = " – Application";
		}

		return {
			id: index,
			name: str,
			details: layerDetails,
		};
	});

	return {
		props: {
			companies: companies.companies,
			companyLayers,
		},
	};
};

type IconProps = {
	className?: string;
	title?: string;
};

const IconSelector: React.FC<IconProps> = ({
	className,
	title = "Selector",
}) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8 9l4-4 4 4m0 6l-4 4-4-4"
			/>
		</svg>
	);
};

const IconCheck: React.FC<IconProps> = ({ className, title = "Check" }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title}</title>
			<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
		</svg>
	);
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
