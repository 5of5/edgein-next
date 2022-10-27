import React, { useEffect, useState, MutableRefObject, useRef } from "react";
import { NextPage, GetStaticProps, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemCredibility } from "@/components/Company/ElemCredibility";
import { ElemVelocity } from "@/components/Company/ElemVelocity";
import { ElemKeyInfo } from "@/components/ElemKeyInfo";
import { ElemTags } from "@/components/ElemTags";
import { ElemInvestments } from "@/components/Company/ElemInvestments";
import { ElemTeamGrid } from "@/components/Company/ElemTeamGrid";
import { runGraphQl } from "@/utils";
// import { ElemCohort } from "@/components/Company/ElemCohort";
import { ElemTabBar } from "@/components/ElemTabBar";
import { ElemSaveToList } from "@/components/ElemSaveToList";
import { ElemButton } from "@/components/ElemButton";
import {
	Companies,
	Follows_Companies,
	Follows_Companies_Aggregate,
	GetCompaniesPathsQuery,
	GetCompanyDocument,
	GetCompanyQuery,
	Investment_Rounds,
	Lists,
	useGetCompanyQuery,
	Investments,
} from "@/graphql/types";
import { ElemReactions } from "@/components/ElemReactions";
import {
	getNewFollows,
	reactOnSentiment,
	getName,
	isFollowsExists,
	getNewTempSentiment,
} from "@/utils/reaction";
import { useAuth } from "@/hooks/useAuth";
import { IconEditPencil } from "@/components/Icons";
// import { ElemRecentCompanies } from "@/components/Companies/ElemRecentCompanies";
import { companyLayerChoices, tokenInfoMetrics } from "@/utils/constants";
import { convertToInternationalCurrencySystem, formatDate } from "@/utils";
import { has, remove, sortBy } from "lodash";

type Props = {
	company: Companies;
	sortRounds: Investment_Rounds[];
    metrics: Metric[];
};

const Company: NextPage<Props> = (props: Props) => {
	const { user } = useAuth();
	const router = useRouter();
	const { companyId } = router.query;

	//const goBack = () => router.back();

	const [company, setCompany] = useState<Companies>(props.company);

	const [tokenInfo, setTokenInfo] = useState<TokenInfo>({ currentPrice: 0, marketCap: 0, marketCapRank: 0, low24H: 0, high24H: 0, vol24H: 0 });

	//Limit Activity
	const [activityLimit, setActivityLimit] = useState(10);
	const showMoreActivity = () => {
		setActivityLimit(activityLimit + 10);
	};

	const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
	const teamRef = useRef() as MutableRefObject<HTMLDivElement>;
	const investmentRef = useRef() as MutableRefObject<HTMLDivElement>;

	const {
		data: companyData,
		error,
		isLoading,
	} = useGetCompanyQuery({
		slug: companyId as string,
		current_user: user?.id ?? 0,
	});

	const getTokenInfo = async (coin_id: number) => {
		const data = await fetch("/api/get_metrics_amount", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ coin_id }),
		}).then((res) => res.json());
		setTokenInfo(data);
	};

	useEffect(() => {
		if (company && company.coin) {
			getTokenInfo(company.coin.id);
			// getTokenInfo('bnb')
		}
	}, [company]);

	useEffect(() => {
		if (companyData) setCompany(companyData?.companies[0] as any);
	}, [companyData]);

	if (!company) {
		return <h1>Not Found</h1>;
	}

	const handleReactionClick =
		(sentiment: string, alreadyReacted: boolean) =>
		async (
			event: React.MouseEvent<
				HTMLButtonElement | HTMLInputElement | HTMLElement
			>
		) => {
			setTemporary(sentiment, alreadyReacted);
			const newSentiment = await reactOnSentiment({
				company: company.id,
				sentiment,
				pathname: location.pathname,
			});

			setCompany((prev: Companies) => {
				const newFollows = getNewFollows(sentiment) as Follows_Companies;
				if (!alreadyReacted && !isFollowsExists(prev.follows, sentiment))
					prev.follows.push(newFollows);
				else
					remove(prev.follows, (item) => {
						return getName(item.list!) === sentiment;
					});
				return { ...prev, sentiment: newSentiment };
			});
		};

	const setTemporary = (sentiment: string, alreadyReacted: boolean) => {
		setCompany((prev: Companies) => {
			const newSentiment = getNewTempSentiment(
				{ ...prev.sentiment },
				sentiment,
				alreadyReacted
			);

			const newFollows = getNewFollows(sentiment) as Follows_Companies;

			if (!alreadyReacted) prev.follows.push(newFollows);
			else
				remove(prev.follows, (item) => {
					return getName(item.list!) === sentiment;
				});
			return { ...prev, sentiment: newSentiment };
		});
	};

	const sortedInvestmentRounds = props.sortRounds;

	// Company tags
	const companyTags = [];
	if (company.layer) {
		const layer = companyLayerChoices.find(
			(layer) => layer.id === company.layer
		);
		companyTags.unshift(layer ? layer.name : company.layer);
	}
	if (company.tags) {
		company.tags.map((tag: string, i: number) => [companyTags.push(tag)]);
	}

	// Tabs
	const tabBarItems = [{ name: "Overview", ref: overviewRef }];
	if (company.teamMembers.length > 0) {
		tabBarItems.push({ name: "Team", ref: teamRef });
	}
	if (sortedInvestmentRounds.length > 0) {
		tabBarItems.push({
			name: "Investments",
			ref: investmentRef,
		});
	}

	const getInvestorsNames = (investments: Array<Investments>) => {
		if (investments && investments.length > 0) {
			const names = `${
				investments[0].person ? investments[0].person.name + "," : ""
			} ${
				investments[0].vc_firm ? investments[0].vc_firm.name : ""
			} and others`;
			return names;
		}
		return "";
	};

	return (
		<div className="max-w-7xl px-4 mx-auto mt-7 relative z-10 sm:px-6 lg:px-8">
			<div className="lg:grid lg:grid-cols-11 lg:gap-7 lg:items-center">
				<div className="col-span-3">
					<ElemPhoto
						photo={company.logo}
						wrapClass="flex items-center justify-center aspect-square shrink-0 p-5 bg-white rounded-lg shadow"
						imgClass="object-contain w-full h-full"
						imgAlt={company.name}
						placeholderClass="text-slate-300"
					/>
				</div>
				<div className="w-full col-span-5 mt-7 lg:mt-0">
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
					{companyTags.length > 0 && (
						<ElemTags className="mt-4" tags={companyTags} />
					)}

					{company.overview && (
						<p className="mt-4 line-clamp-3 text-base text-slate-600">
							{company.overview}
						</p>
					)}

					<div className="flex items-center mt-4 gap-x-5">
						<ElemReactions
							data={company}
							handleReactionClick={handleReactionClick}
						/>
						<ElemSaveToList
							follows={company?.follows}
							onCreateNew={handleReactionClick}
						/>
					</div>
				</div>
				<div className="col-span-3 mt-7 lg:mt-0">
					{Object.values(tokenInfo).some(i => i > 0) && (
						<section className="bg-white shadow rounded-lg p-5 md:mt-0">
							<h2 className="text-xl font-bold">Token Info</h2>
							<div className="flex flex-col space-y-2 mt-2">
                                {props.metrics.map((item) => {
									const metricsClass = tokenInfo[item.id as keyof TokenInfo] ? "bg-green-100 text-green-500" : "bg-slate-200 text-slate-600"
									return (
										<div className="flex items-center space-x-2" key={item.id}>
											<div className="text-slate-600">{item.name}</div>
											<div className={`${metricsClass} text-sm font-semibold border-none rounded-2xl py-1 px-2`}>
											{tokenInfo[item.id as keyof TokenInfo] ?
												item.id === "highLow24H"
													? `$${convertAmountRaised(tokenInfo.high24H)}/$${convertAmountRaised(
														tokenInfo.low24H
													)}`
													: `${item.id === "marketCapRank" ? "#" : "$"}${convertAmountRaised(tokenInfo[item.id as keyof TokenInfo])}`
											: `N/A`
											}
											</div>
										</div>
                                	)}
								)}
							</div>
						</section>
					)}
				</div>
			</div>

			<ElemTabBar className="mt-7" tabs={tabBarItems} />

			<div
				className="mt-7 lg:grid lg:grid-cols-11 lg:gap-7"
				ref={overviewRef}
				id="overview"
			>
				<div className="col-span-3">
					<ElemKeyInfo
						className="sticky top-4"
						heading="Key Info"
						website={company.website}
						totalFundingRaised={company.investor_amount}
						whitePaper={company.white_paper}
						totalEmployees={company.total_employees}
						careerPage={company.careers_page}
						yearFounded={company.year_founded}
						linkedIn={company.company_linkedin}
						github={company.github}
						twitter={company.twitter}
						location={company.location}
						discord={company.discord}
						glassdoor={company.glassdoor}
					/>
				</div>
				<div className="col-span-8">
					{(company.market_verified ||
						company.github ||
						company.company_linkedin ||
						company.velocity_linkedin ||
						company.velocity_token) && (
						<div className="lg:grid lg:grid-cols-8 lg:gap-7">
							<ElemCredibility
								className="col-span-5 mt-7 p-5 bg-white shadow rounded-lg lg:mt-0"
								heading="Credibility"
								marketVerified={company.market_verified}
								githubVerified={company.github}
								linkedInVerified={company.company_linkedin}
							/>
							<ElemVelocity
								className="col-span-3 mt-7 p-5 bg-white shadow rounded-lg lg:mt-0"
								heading="Velocity"
								employeeListings={"4"}
								tokenExchangeValue={"2.3"}
							/>
						</div>
					)}
					<div className="w-full mt-7 p-5 bg-white shadow rounded-lg">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-bold">Activity Timeline</h2>
							{/* <button className="border border-black/10 h-8 w-8 p-1.5 rounded-full transition-all hover:bg-slate-200">
								<IconEditPencil title="Edit" />
							</button> */}
						</div>

						<div className="mt-2 p-4 border border-black/10 rounded-lg">
							{sortedInvestmentRounds && sortedInvestmentRounds.length > 0 ? (
								<>
									<ul className="flex flex-col">
										{sortedInvestmentRounds
											.slice(0, activityLimit)
											.map((activity, index) => {
												return (
													<li
														key={index}
														className="relative pl-6 overflow-hidden group last:-mb-4"
													>
														<span className="absolute h-full top-0 bottom-0 left-0">
															<span className="absolute dashes top-2 left-2 -bottom-2 right-auto w-px h-auto border-y border-white bg-repeat-y"></span>
															<span className="block absolute top-2 left-1 w-2 h-2 rounded-full bg-gradient-to-r from-primary-300 to-primary-300 transition-all group-hover:from-[#1A22FF] group-hover:via-primary-500 group-hover:to-primary-400"></span>
														</span>

														<div className="mb-4">
															<h2 className="font-bold">
																{`Raised $${convertAmountRaised(
																	activity.amount
																)} from ${getInvestorsNames(
																	activity.investments
																)}`}
															</h2>
															<p className="text-xs text-slate-600">
																{formatDate(activity.round_date as string, {
																	month: "short",
																	day: "2-digit",
																	year: "numeric",
																})}
															</p>
														</div>
													</li>
												);
											})}
									</ul>
									{activityLimit < sortedInvestmentRounds.length && (
										<div className="mt-6">
											<ElemButton
												btn="ol-primary"
												onClick={showMoreActivity}
												className="w-full"
											>
												Show More Activity
											</ElemButton>
										</div>
									)}
								</>
							) : (
								<div className="flex items-center justify-center lg:p-5">
									<div className="text-slate-600 lg:text-xl">
										There is no recent activity for this organization.
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{company.teamMembers.length > 0 && (
				<div
					ref={teamRef}
					className="mt-7 p-5 rounded-lg bg-white shadow"
					id="team"
				>
					<ElemTeamGrid
						showEdit={false}
						heading="Team"
						people={company.teamMembers}
					/>
				</div>
			)}
			{sortedInvestmentRounds.length > 0 && (
				<div
					ref={investmentRef}
					className="mt-7 p-5 rounded-lg bg-white shadow"
					id="investments"
				>
					<ElemInvestments
						showEdit={false}
						heading="Investments"
						investments={sortedInvestmentRounds}
					/>
				</div>
			)}
			{/* <ElemCohort className="mt-7" heading="Similar Companies" /> */}
		</div>
	);
};

// export async function getStaticPaths() {
// 	const { data: companies } = await runGraphQl<GetCompaniesPathsQuery>(
// 		`{ companies(where: {slug: {_neq: ""}, status: { _eq: "published" }}) { slug }}`
// 	);

// 	return {
// 		paths: companies?.companies
// 			?.filter((comp) => comp.slug)
// 			.map((comp) => ({ params: { companyId: comp.slug } })),
// 		fallback: true, // false or 'blocking'
// 	};
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data: companies } = await runGraphQl<GetCompanyQuery>(
		GetCompanyDocument,
		{ slug: context.params?.companyId, current_user: 0 }
	);

	if (!companies?.companies[0]) {
		return {
			notFound: true,
		};
	}

	const company = sortBy(companies?.companies, "status").reverse()[0];

	const sortRounds =
		company.investment_rounds
			?.slice()
			.sort((a, b) => {
				return (
					new Date(a.round_date ?? "").getTime() -
					new Date(b.round_date ?? "").getTime()
				);
			})
			.reverse() || [];

	let metaTitle = null;
	if (company.name) {
		metaTitle =
			company.name +
			" Company Profile: Credibility, Velocity & Investors - EdgeIn.io";
	}
	let metaDescription = null;
	if (company.overview) {
		metaDescription = company.overview;
	}

	return {
		props: {
			metaTitle,
			metaDescription,
			company,
			sortRounds,
            metrics: tokenInfoMetrics,
		},
	};
};
const convertAmountRaised = (theAmount: number) => {
	return convertToInternationalCurrencySystem(theAmount);
};
interface Metric  {
	id: string;
	name: string;
}

interface TokenInfo  {
    currentPrice: number;
    marketCap: number;
    marketCapRank: number;
    low24H: number;
    high24H: number;
    vol24H: number;
};

export default Company;
