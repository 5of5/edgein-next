import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Listbox, Transition } from "@headlessui/react";

import { ElemHeading } from "../components/ElemHeading";
import { ElemPhoto } from "../components/ElemPhoto";
import { InputSearch } from "../components/InputSearch";
import { runGraphQl, truncateWords } from "../utils";

type Props = {
	companies: Record<string, any>[];
};

const Companies: NextPage<Props> = ({ companies }) => {
	// Search Box
	const [search, setSearch] = React.useState("");

	// Company Layers
	const getAllLayers = companies.map((com) => com.layer);

	const getUniqueLayers = [...Array.from(new Set(getAllLayers))]
		.sort()
		.reverse();

	const companyLayers = getUniqueLayers.map((str, index) => ({
		id: index,
		name: str,
		label: str === null ? "All Layers" : str,
	}));

	const [selectedLayer, setSelectedLayer] = React.useState(companyLayers[0]);

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
								onChange={(e: {
									target: { value: React.SetStateAction<string> };
								}) => setSearch(e.target.value)}
							/>

							<Listbox value={selectedLayer} onChange={setSelectedLayer}>
								{({ open }) => (
									<>
										<div className="relative">
											<Listbox.Button className="relative w-full text-dark-500 bg-white border border-transparent text-lg rounded-md pl-3 pr-10 py-1.5 text-left cursor-default focus:outline-none focus:border-primary-500 hover:ring hover:ring-primary-100 focus:ring focus:ring-primary-100">
												<span className="block truncate">
													{selectedLayer.label}
												</span>
												<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
													<IconSelector />
												</span>
											</Listbox.Button>

											<Transition
												show={open}
												as={React.Fragment}
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
																	<span
																		className={`${
																			selected ? "font-semibold" : "font-normal"
																		} block truncate`}
																	>
																		{option.label}
																	</span>

																	{selected ? (
																		<span className="absolute z-50 inset-y-0 right-0 flex items-center pr-4 text-primary-500">
																			<IconCheck />
																		</span>
																	) : null}
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
						</div>

						<div className="w-full flex flex-col gap-5 sm:grid sm:grid-cols-2  md:grid-cols-3">
							{companies
								.filter(
									(company) =>
										!search ||
										company.title?.toLowerCase().includes(search.toLowerCase())
								)
								.filter(
									(company) =>
										!selectedLayer.name ||
										company.layer?.includes(selectedLayer.name)
								)
								.map((company) => (
									<Link key={company.id} href={`/companies/${company.slug}`}>
										<a className="bg-white rounded-lg overflow-hidden cursor-pointer p-7 md:p-7 flex flex-col md:h-full mx-auto w-full max-w-md transition duration-300 ease-in-out transform group hover:scale-102 hover:shadow-lg focus:ring focus:ring-primary-300">
											<div className="flex flex-row w-full mb-4">
												<ElemPhoto
													photos={company.logo}
													wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow-md"
													imgClass="object-fit max-w-full max-h-full"
													imgAlt={company.title}
												/>

												<div className="flex items-center justify-center pl-2">
													<h3 className="text-2xl font-bold text-dark-500 sm:text-lg lg:text-2xl group-hover:opacity-60">
														{company.title}
													</h3>
												</div>
											</div>

											{company.overview && (
												<div className="text-gray-400">
													{truncateWords(company.overview)}
												</div>
											)}

											{company.layer && (
												<div
													className={`${getLayerClass(
														company.layer
													)} self-start text-xs font-bold leading-sm uppercase mt-4 px-3 py-1 rounded-full`}
												>
													{company.layer}
												</div>
											)}
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
		'{ companies(_order_by: {title: "asc"}, _filter: {slug: {_ne: ""}}) { id, title, layer, slug, logo, overview }}'
	);

	return {
		props: {
			companies: companies.companies,
		},
	};
};

const IconSelector = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5 text-gray-400"
		aria-hidden="true"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M8 9l4-4 4 4m0 6l-4 4-4-4"
		/>
	</svg>
);

const IconCheck = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5"
		aria-hidden="true"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
	</svg>
);

function getLayerClass(layer: string) {
	if (!layer) return layer;

	let layerClass = "";
	if (layer === "Layer 0") {
		layerClass = "bg-primary-100 text-primary-500";
	} else if (layer === "Layer 1") {
		layerClass = "bg-cyan-100 text-cyan-500";
	} else if (layer === "Layer 2") {
		layerClass = "bg-pink-100 text-pink-500";
	} else if (layer === "Layer 3") {
		layerClass = "bg-blue-100 text-blue-500";
	} else if (layer === "Layer 4") {
		layerClass = "bg-emerald-100 text-emerald-500";
	} else if (layer === "Layer 5") {
		layerClass = "bg-yellow-100 text-yellow-700";
	} else {
		layerClass = "bg-gray-100 text-gray-500";
	}
	return layerClass;
}

export default Companies;
