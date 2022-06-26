import type { NextPage, GetStaticProps } from "next";
import React from "react";
import { useRouter } from "next/router";
import { ElemButton } from "../../components/ElemButton";
import { ElemPhoto } from "../../components/ElemPhoto";
import { ElemCredibility } from "../../components/Company/ElemCredibility";
import { ElemVelocity } from "../../components/Company/ElemVelocity";
import { ElemKeyInfo } from "../../components/ElemKeyInfo";
import { ElemTags } from "../../components/ElemTags";
import { ElemInvestments } from "../../components/Company/ElemInvestments";
import { ElemTeamGrid } from "../../components/Company/ElemTeamGrid";
import { runGraphQl } from "../../utils";
import { Companies, GetCompaniesPathsQuery, GetCompaniesQuery, GetCompanyDocument, GetCompanyQuery } from "../../graphql/types";

type Props = {
	company: Companies;
	sortRounds: Record<string, any>;
};

const Company: NextPage<Props> = (props) => {
	const router = useRouter();
	const { companyId } = router.query;

	const goBack = () => router.back();

	const company = props.company;

	if (!company) {
		return <h1>Not Found</h1>;
	}

	const sortedInvestmentRounds = props.sortRounds;

	// Company tags
	const companyTags = [];
	if (company.layer) {
		companyTags.unshift(company.layer);
	}

	return (
		<div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
			<div onClick={goBack}>
				<ElemButton className="pl-0 pr-0" btn="transparent" arrowLeft>
					Back
				</ElemButton>
			</div>

			<div className="flex flex-col md:grid md:grid-cols-11 gap-4 mt-6">
				<div className="col-span-3">
					<ElemPhoto
						photo={company.logo}
						wrapClass="flex items-center justify-center aspect-square shrink-0 p-6 bg-white rounded-lg border border-dark-500/10"
						imgClass="object-contain w-full h-full"
						imgAlt={company.name}
					/>
				</div>
				<div className="w-full col-span-8">
					<div className="flex flex-col md:grid grid-cols-8 gap-4">
						<div className="col-span-5 mt-16 md:mt-0">
							<div className="flex shrink-0">
								<h1 className="flex text-4xl md:text-5xl font-bold">
									{company.name}
								</h1>
								{company.coin && 
										<span
											key={company.coin.id}
											className="ml-2 inline-block self-center align-middle whitespace-nowrap px-2 py-1.5 rounded-md text-base font-bold leading-sm uppercase text-dark-400 border border-dark-100"
											title={`Token: ${company.coin.ticker}`}
										>
											{company.coin.ticker}
										</span>
								}
							</div>

							{company.overview && (
								<p className="text-lg mt-3">{company.overview}</p>
							)}
						</div>

						{/* <section className="col-span-3 flex flex-col mt-16 md:mt-0">
							<h2 className="text-2xl font-bold">Token Info</h2>
							<div className="flex-col justify-center flex space-y-3 mt-2 p-3 bg-white rounded-lg border border-dark-500/10">
								<div className="flex items-center space-x-2">
									<div className="text-xs font-semibold uppercase tracking-wide">
										Price (USD):
									</div>
									<div className=" text-red-500">$40.35</div>
								</div>
								<div className="flex items-center space-x-2">
									<div className="text-xs font-semibold uppercase tracking-wide">
										Market Cap:
									</div>
									<div className="">$168.1M</div>
								</div>
							</div>
						</section> */}
					</div>

					<div className="flex flex-col md:grid grid-cols-8 gap-4 mt-6">
						<ElemCredibility
							className="col-span-5 mt-16 md:mt-0"
							heading="Credibility"
							marketVerified={company.market_verified}
							githubVerified={company.github}
							linkedInVerified={company.company_linkedin}
						/>
						<ElemVelocity
							className="col-span-3 flex flex-col mt-16 md:mt-0"
							heading="Velocity"
							employeeListings={company.velocity_linkedin}
							tokenExchangeValue={company.velocity_token}
						/>
					</div>
				</div>
			</div>

			<ElemKeyInfo
				className="mt-12"
				heading="Key Info"
				website={company.website}
				totalFundingRaised={company.investor_amount}
				whitePaper={company.white_paper}
				totalEmployees={company.total_employees}
				careerPage={company.careers_page}
				yearFounded={company.year_founded}
				linkedIn={company.company_linkedin}
				github={company.github}
			/>

			{companyTags.length > 0 && (
				<ElemTags className="mt-12" heading="Tags" tags={companyTags} />
			)}

			{/* {company.founder.length > 0 && (
				<ElemFounderGrid
					className="mt-12"
					heading="Founders"
					people={company.founder}
				/>
			)} */}

			{company.teamMembers.length > 0 && (
				<ElemTeamGrid
					className="mt-12"
					heading="Team Members"
					people={company.teamMembers}
				/>
			)}

			{sortedInvestmentRounds.length > 0 && (
				<ElemInvestments
					className="mt-12"
					heading="Investments"
					investments={sortedInvestmentRounds}
				/>
			)}
		</div>
	);
};

export async function getStaticPaths() {
	const {
		data: companies,
	} = await runGraphQl<GetCompaniesPathsQuery>(`{ companies(where: {slug: {_neq: ""}}) { slug }}`);

	return {
		paths: companies?.companies?.
			filter((comp) => comp.slug)
			.map((comp) => ({ params: { companyId: comp.slug } })),
		fallback: true, // false or 'blocking'
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: companies } = await runGraphQl<GetCompanyQuery>(GetCompanyDocument, {slug: context.params?.companyId});

	if (!companies?.companies[0]) {
		return {
			notFound: true,
		};
	}

	const sortRounds = companies.companies[0].investment_rounds?.
		slice()
		.sort(
			(
				a,
				b
			) => {
				return new Date(a.round_date ?? "").getTime() - new Date(b.round_date ?? "").getTime();
			}
		)
		.reverse() || [];

	return {
		props: {
			company: companies.companies[0],
			sortRounds,
		},
	};
};

export default Company;
