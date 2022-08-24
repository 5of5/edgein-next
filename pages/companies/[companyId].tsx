import type { NextPage, GetStaticProps } from "next";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemCredibility } from "@/components/Company/ElemCredibility";
import { ElemVelocity } from "@/components/Company/ElemVelocity";
import { ElemCohort } from "@/components/Company/ElemCohort";
import { ElemKeyInfo } from "@/components/ElemKeyInfo";
import { ElemTags } from "@/components/ElemTags";
import { ElemInvestments } from "@/components/Company/ElemInvestments";
import { ElemTeamGrid } from "@/components/Company/ElemTeamGrid";
import { runGraphQl } from "@/utils";
import {
	Companies,
	GetCompaniesPathsQuery,
	GetCompanyDocument,
	GetCompanyQuery,
	Investment_Rounds,
} from "../../graphql/types";
import { ElemReactions } from "@/components/ElemReactions";

type Props = {
	company: Companies;
	sortRounds: Investment_Rounds[];
};

const Company: NextPage<Props> = (props) => {
	const router = useRouter();
	const { companyId } = router.query;

	const goBack = () => router.back();

	const [company, setCompany] = useState(props.company);

	if (!company) {
		return <h1>Not Found</h1>;
	}

	const handleReactionClick = (event: any, sentiment: string) => async () => {
		const resp = await fetch("/api/reaction/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				company: company.id,
				sentiment,
				pathname: location.pathname
			}),
		});
		const newSentiment = await resp.json()
		setCompany({ ...company, sentiment: newSentiment })
	}

	const sortedInvestmentRounds = props.sortRounds;

	// Company tags
	const companyTags = [];
	if (company.layer) {
		companyTags.unshift(company.layer);
	}
	if (company.tags) {
		company.tags.map((tag: string, i: number) => [companyTags.push(tag)]);
	}

	return (
		<div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:py-12 lg:px-8">
			<div onClick={goBack}>
				<ElemButton className="pl-0 pr-0" btn="transparent" arrowLeft>
					Back
				</ElemButton>
			</div>
			<div className="flex flex-col gap-4 mt-6 md:grid md:grid-cols-11">
				<div className="col-span-3">
					<ElemPhoto
						photo={company.logo}
						wrapClass="flex items-center justify-center aspect-square shrink-0 p-6 bg-white rounded-lg border border-dark-500/10"
						imgClass="object-contain w-full h-full"
						imgAlt={company.name}
					/>
				</div>
				<div className="w-full col-span-8">
					<div className="flex flex-col grid-cols-8 gap-4 md:grid">
						<div className="col-span-5 mt-16 md:mt-0">
							<div className="flex shrink-0">
								<h1 className="self-end inline-block text-4xl font-bold md:text-5xl">
									{company.name}
								</h1>
								{company.coin && (
									<div
										key={company.coin.id}
										className="ml-2 pb-0.5 inline-block self-end whitespace-nowrap text-lg leading-sm uppercase"
										title={`Token: ${company.coin.ticker}`}
									>
										{company.coin.ticker}
									</div>
								)}
							</div>

							{company.overview && (
								<p className="mt-1 line-clamp-3">{company.overview}</p>
							)}
						</div>

						{/* <section className="flex flex-col col-span-3 mt-16 md:mt-0">
							<h2 className="text-2xl font-bold">Token Info</h2>
							<div className="flex flex-col justify-center p-3 mt-2 space-y-3 bg-white border rounded-lg border-dark-500/10">
								<div className="flex items-center space-x-2">
									<div className="text-xs font-semibold tracking-wide uppercase">
										Price (USD):
									</div>
									<div className="text-red-500 ">$40.35</div>
								</div>
								<div className="flex items-center space-x-2">
									<div className="text-xs font-semibold tracking-wide uppercase">
										Market Cap:
									</div>
									<div className="">$168.1M</div>
								</div>
							</div>
						</section> */}
					</div>

					{
						(company.market_verified || company.github || company.company_linkedin || company.velocity_linkedin || company.velocity_token) &&
						<div className="flex flex-col grid-cols-8 gap-4 mt-6 md:grid">
							<ElemCredibility
								className="col-span-5 mt-16 md:mt-0"
								heading="Credibility"
								marketVerified={company.market_verified}
								githubVerified={company.github}
								linkedInVerified={company.company_linkedin}
							/>
							<ElemVelocity
								className="flex flex-col col-span-3 mt-16 md:mt-0"
								heading="Velocity"
								employeeListings={company.velocity_linkedin}
								tokenExchangeValue={company.velocity_token}
							/>
						</div>
					}

					<div className="flex flex-col grid-cols-8 gap-4 mt-6 md:grid">
						<ElemReactions
							data={company}
							handleReactionClick={(event: any, reaction: string) => handleReactionClick(event, reaction)()}
							blackText
							roundedFull
						/>
					</div>
				</div>
			</div>

			{/* <ElemCohort className="mt-12" heading="Cohort" /> */}

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
	const { data: companies } = await runGraphQl<GetCompaniesPathsQuery>(
		`{ companies(where: {slug: {_neq: ""}}) { slug }}`
	);

	return {
		paths: companies?.companies
			?.filter((comp) => comp.slug)
			.map((comp) => ({ params: { companyId: comp.slug } })),
		fallback: true, // false or 'blocking'
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: companies } = await runGraphQl<GetCompanyQuery>(
		GetCompanyDocument,
		{ slug: context.params?.companyId }
	);

	if (!companies?.companies[0]) {
		return {
			notFound: true,
		};
	}

	const sortRounds =
		companies.companies[0].investment_rounds
			?.slice()
			.sort((a, b) => {
				return (
					new Date(a.round_date ?? "").getTime() -
					new Date(b.round_date ?? "").getTime()
				);
			})
			.reverse() || [];

	let metaTitle = null;
	if (companies.companies[0].name) {
		metaTitle =
			companies.companies[0].name +
			" Company Profile: Credibility, Velocity & Investors - EdgeIn.io";
	}
	let metaDescription = null;
	if (companies.companies[0].overview) {
		metaDescription = companies.companies[0].overview;
	}

	return {
		props: {
			metaTitle,
			metaDescription,
			company: companies.companies[0],
			sortRounds,
		},
	};
};

export default Company;
