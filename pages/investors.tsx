import React, { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
// import { ElemButton } from "../components/ElemButton";
import { ElemHeading } from "../components/ElemHeading";
import { ElemPhoto } from "../components/ElemPhoto";
import { InputSearch } from "../components/InputSearch";
import { InputSelect } from "../components/InputSelect";
import { runGraphQl, inRange } from "../utils";

type Props = {
	vcFirms: Record<string, any>[];
	numberOfInvestments: Record<string, any>[];
};

const Investors: NextPage<Props> = ({ vcFirms, numberOfInvestments }) => {
	// Search Box
	const [search, setSearch] = useState("");

	// Investments Count
	const [selectedInvestmentCount, setSelectedInvestmentCount] = useState(
		numberOfInvestments[0]
	);

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
							<InputSelect
								value={selectedInvestmentCount}
								onChange={setSelectedInvestmentCount}
								options={numberOfInvestments}
							/>
						</div>

						<div className="w-full flex flex-col gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3">
							{vcFirms
								.filter(
									(vcfirm) =>
										!search ||
										vcfirm.vcFirm?.toLowerCase().includes(search.toLowerCase())
								)
								.filter(
									(vcfirm) =>
										!selectedInvestmentCount.number ||
										(vcfirm.investments?.length >=
											selectedInvestmentCount.rangeStart &&
											vcfirm.investments?.length <=
												selectedInvestmentCount.rangeEnd)
								)
								// sort list by number of investments
								// .sort(
								// 	(a: any, b: any) =>
								// 		a.investments?.length - b.investments?.length
								// )
								// .reverse()
								.map((vcfirm) => (
									<Link key={vcfirm.id} href={`/investors/${vcfirm.slug}`}>
										<a className="bg-white rounded-lg overflow-hidden cursor-pointer p-7 flex flex-col justify-between mx-auto w-full max-w-md group transition duration-300 ease-in-out transform  hover:scale-102 hover:shadow-lg focus:ring focus:ring-primary-300 md:p-7 md:h-full">
											<div className="w-full flex items-center">
												<ElemPhoto
													photos={vcfirm.logo}
													wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow-md"
													imgClass="object-fit max-w-full max-h-full"
													imgAlt={vcfirm.vcFirm}
												/>
												<div className="w-full">
													<h3 className="ml-3 text-2xl font-bold text-dark-700 break-words w-16 min-w-full sm:text-lg lg:text-xl group-hover:opacity-60">
														{vcfirm.vcFirm}
													</h3>
												</div>
											</div>
											{vcfirm.investments?.length > 0 && (
												<div className="inline-flex mt-4 hover:opacity-70">
													<IconCash
														title="Investments"
														className="h-6 w-6 mr-1 text-primary-500"
													/>
													<span className="font-bold mr-1">
														{vcfirm.investments.length}
													</span>
													Investment{vcfirm.investments?.length > 1 && "s"}
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
	const { data: vcFirms } = await runGraphQl(
		'{ vcFirms(_order_by: {vcFirm: "asc"}, _filter: {slug: {_ne: ""}})  { id, vcFirm, slug, logo, investments {id, name} }}'
	);

	// Number of Investments Filter
	const getNumberOfInvestments = [
		...Array.from(
			new Set(
				vcFirms.vcFirms.map((investor: { investments: any }, index: any) => {
					const investmentsCount = investor.investments?.length || 0;

					let text = null;
					let rangeStart = null;
					let rangeEnd = null;

					if (investmentsCount === 0) {
						text = "Number of Investments";
						rangeStart = 0;
						rangeEnd = 0;
					} else if (inRange(investmentsCount, 1, 5)) {
						text = "5 or less Investments";
						rangeStart = 1;
						rangeEnd = 5;
					} else if (inRange(investmentsCount, 6, 15)) {
						text = "6-15 Investments";
						rangeStart = 6;
						rangeEnd = 15;
					} else if (inRange(investmentsCount, 16, 25)) {
						text = "16-25 Investments";
						rangeStart = 16;
						rangeEnd = 25;
					} else if (investmentsCount > 25) {
						text = "25+ Investments";
						rangeStart = 25;
						rangeEnd = 9999999999999;
					}

					return {
						id: index,
						title: text,
						number: investmentsCount,
						rangeStart: rangeStart,
						rangeEnd: rangeEnd,
					};
				})
			)
		),
	];

	const investmentGroups: any[] = [];

	const uniqueInvestmentGroups = getNumberOfInvestments
		.filter((group: any) => {
			const isDuplicate = investmentGroups.includes(group.title);

			if (!isDuplicate) {
				investmentGroups.push(group.title);
				return true;
			}
			return false;
		})
		.sort((a: any, b: any) => a.number - b.number);

	return {
		props: {
			vcFirms: vcFirms.vcFirms,
			numberOfInvestments: uniqueInvestmentGroups,
		},
	};
};

export default Investors;

type IconProps = {
	className?: string;
	title?: string;
};

const IconCash: React.FC<IconProps> = ({ className, title }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
			/>
		</svg>
	);
};
