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
	vcFirms: Record<string, any>[];
};

const VCFirms: NextPage<Props> = ({ vcFirms }) => {
	const [search, setSearch] = React.useState("");

	return (
		<div>
			<Head>
				<title>VC Firms - EdgeIn.io</title>
				<meta
					name="description"
					content="We're tracking investments made in web3 companies and projects to provide you with an index of the most active and influential capital in the industry."
				/>
			</Head>
			<div>
				<ElemHeading
					title="VC Firms"
					subtitle="We're tracking investments made in web3 companies and projects to provide you with an index of the most active and influential capital in the industry."
				>
					{/* <ElemButton href="/" btn="dark" arrow className="mt-6">
						Submit VC Firm
					</ElemButton> */}
				</ElemHeading>

				<div className="bg-gray-50 rounded-t-8xl relative z-10">
					<div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 ">
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
							{vcFirms
								.filter(
									(vcfirm) =>
										!search ||
										vcfirm.vcFirm?.toLowerCase().includes(search.toLowerCase())
								)
								.map((vcfirm) => (
									<Link key={vcfirm.id} href={`/vcfirms/${vcfirm.slug}`}>
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
		'{ vcFirms(_order_by: {vcFirm: "asc"}, _filter: {slug: {_ne: ""}})  { id, vcFirm, slug, logo}}'
	);

	return {
		props: {
			vcFirms: vcFirms.vcFirms,
		},
	};
};

export default VCFirms;
