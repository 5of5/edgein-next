import type { NextPage, GetStaticProps } from "next";

import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ElemHeading } from "../components/ElemHeading";
import { ElemPhoto } from "../components/ElemPhoto";
import { InputSearch } from "../components/InputSearch";
import { Select } from "../components/Select";
import { runGraphQl, truncateWords, slugify } from "../utils";

type Props = {
	companies: Record<string, any>[];
};

const Companies: NextPage<Props> = ({ companies }) => {
	const [search, setSearch] = React.useState("");

	const [selectedOption, setSelectedOption] = React.useState("");

	const getAllLayers = companies.map((com) => com.layer);
	const getUniqueLayers = [...Array.from(new Set(getAllLayers))].sort();

	// const companyLayers = getUniqueLayers.map((str, index) => ({
	// 	value: str,
	// 	id: index + 1,
	// }));

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

				<div className="bg-gray-50 rounded-t-8xl relative z-10">
					<div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
						<div className="w-full flex flex-col py-5 sm:grid sm:gap-5 sm:grid-cols-2 md:grid-cols-3">
							<InputSearch
								label="Search"
								name="search"
								value={search}
								placeholder="Quick Search..."
								onChange={(e: {
									target: { value: React.SetStateAction<string> };
								}) => setSearch(e.target.value)}
							/>

							{/* 
							<Select
								label="Layer"
								name="Layer"
								value={selectedOption}
								placeholder="Just a Placeholder..."
								onChange={(e: {
									target: { value: React.SetStateAction<string> };
								}) => setSelectedOption(e.target.value)}
								options={getUniqueLayers}
							/>

							<label className="relative block" htmlFor="Layer">
								<span className="sr-only">Layers</span>
								<select
									value={selectedOption}
									onChange={(e: {
										target: { value: React.SetStateAction<string> };
									}) => setSelectedOption(e.target.value)}
									className="h-10 w-full py-1.5 pr-3 px-3 text-dark-500 text-lg relative bg-white rounded-md border border-transparent outline-none placeholder:text-dark-400 focus:bg-white focus:outline-none focus:border-primary-500 hover:ring hover:ring-primary-100 focus:ring focus:ring-primary-100"
								>
									{companyLayers.map((opt, index) => (
										<option key={slugify(opt)}>{opt}</option>
									))}
								</select>
							</label> */}
						</div>

						<div className="w-full flex flex-col sm:grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
							{companies
								.filter(
									(company) =>
										!search ||
										company.title?.toLowerCase().includes(search.toLowerCase())
								)
								.filter(
									(company) =>
										!selectedOption ||
										company.layer
											?.toLowerCase()
											.includes(selectedOption.toLowerCase())
								)
								.map((company) => (
									<Link key={company.id} href={`/companies/${company.slug}`}>
										<a className="bg-white rounded-lg overflow-hidden cursor-pointer p-7 md:p-7 flex flex-col justify-between md:h-full mx-auto w-full max-w-md transition duration-300 ease-in-out transform group hover:scale-102 hover:shadow-lg focus:ring focus:ring-primary-300">
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

											<div>
												<div className="text-xs inline-flex items-center font-bold leading-sm uppercase mb-2 px-3 py-1 bg-primary-100 text-primary-500 rounded-full">
													{company.layer}
												</div>
											</div>

											{company.overview && (
												<div className="h-full text-gray-400">
													{truncateWords(company.overview)}
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

export default Companies;
