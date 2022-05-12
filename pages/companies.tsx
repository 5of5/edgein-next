import type { NextPage, GetStaticProps } from "next";

import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ElemButton } from "../components/ElemButton";
import { ElemHeading } from "../components/ElemHeading";
import { ElemPhoto } from "../components/ElemPhoto";
import { InputSearch } from "../components/InputSearch";
import { runGraphQl } from "../utils";

type Props = {
	companies: Record<string, any>[];
};

const Companies: NextPage<Props> = ({ companies }) => {
	const [search, setSearch] = React.useState("");

	return (
		<div>
			<Head>
				<title>Web3 Companies - EdgeIn.io</title>
				<meta
					name="description"
					content="Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset."
				/>
				<link rel="icon" href="/favicon.ico" />
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
						</div>

						<div className="w-full flex flex-col sm:grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
							{companies
								.filter(
									(company) =>
										!search ||
										company.title?.toLowerCase().includes(search.toLowerCase())
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

											<div className="flex items-start h-full">
												<p className="mb-4 text-gray-400">{company.overview}</p>
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
		'{ companies(_order_by: {title: "asc"}, _filter: {slug: {_ne: ""}}) { id, title, slug, logo, overview }}'
	);

	return {
		props: {
			companies: companies.companies,
		},
	};
};

export default Companies;
