import React, { useEffect, useState, MutableRefObject, useRef } from "react";
import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemCredibility } from "@/components/Company/ElemCredibility";
import { ElemKeyInfo } from "@/components/ElemKeyInfo";
import { ElemTags } from "@/components/ElemTags";
import { ElemInvestments } from "@/components/Company/ElemInvestments";
import { ElemTeamGrid } from "@/components/Company/ElemTeamGrid";
import { runGraphQl } from "@/utils";
import { ElemCohort } from "@/components/Company/ElemCohort";
import { ElemTabBar } from "@/components/ElemTabBar";
import { PlaceholderActivity } from "@/components/Placeholders";
import { ElemSaveToList } from "@/components/ElemSaveToList";
import { ElemButton } from "@/components/ElemButton";
import { ElemSocialShare } from "@/components/ElemSocialShare";
import {
	Companies,
	GetCompanyDocument,
	GetCompanyQuery,
	Investment_Rounds,
	useGetCompanyQuery,
	//Investments,
} from "@/graphql/types";
import { ElemReactions } from "@/components/ElemReactions";
import { useAuth } from "@/hooks/useAuth";
import { companyLayerChoices, tokenInfoMetrics } from "@/utils/constants";
import {
	convertToInternationalCurrencySystem,
	formatDate,
	convertToIntNum,
} from "@/utils";
import { sortBy } from "lodash";
import parse from "html-react-parser";
import { newLineToP } from "@/utils/text";
import { onTrackView } from "@/utils/track";

import { IconEditPencil, IconAnnotation } from "@/components/Icons";

type Props = {
	company: Companies;
	sortRounds: Investment_Rounds[];
	metrics: Metric[];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Company: NextPage<Props> = (props: Props) => {
	const { user } = useAuth();
	const router = useRouter();
	const { companyId } = router.query;

	const [company, setCompany] = useState<Companies>(props.company);

	const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
		currentPrice: 0,
		marketCap: 0,
		marketCapRank: 0,
		low24H: 0,
		high24H: 0,
		vol24H: 0,
	});

	//Limit Activity
	const [activityLimit, setActivityLimit] = useState(10);
	const showMoreActivity = () => {
		setActivityLimit(activityLimit + 10);
	};

	const [overviewMore, setOverviewMore] = useState(false);
	const overviewDiv = useRef() as MutableRefObject<HTMLDivElement>;
	const [overviewDivHeight, setOverviewDivHeight] = useState(0);

	const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
	const teamRef = useRef() as MutableRefObject<HTMLDivElement>;
	const investmentRef = useRef() as MutableRefObject<HTMLDivElement>;

	const {
		data: companyData,
		error,
		isLoading,
	} = useGetCompanyQuery({
		slug: companyId as string,
	});

	useEffect(() => {
		if (companyData) {
			onTrackView({
				resourceId: companyData?.companies[0]?.id,
				resourceType: "companies",
				pathname: router.asPath,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [companyData]);

	const getTokenInfo = async (coinId: number) => {
		const data = await fetch("/api/get_metrics_amount/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ coinId }),
		}).then((res) => res.json());
		setTokenInfo(data);
	};

	useEffect(() => {
		if (company.overview) {
			setOverviewDivHeight(overviewDiv.current.scrollHeight);
		}
	}, [company]);

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

	const sortedInvestmentRounds = props.sortRounds;

	// Company tags
	let companyTags: string[] = [];
	if (company.layer) {
		const layer = companyLayerChoices.find(
			(layer) => layer.id === company.layer
		);
		companyTags.unshift(layer ? layer.name : company.layer);
	}
	if (company.tags) {
		company.tags.map((tag: string, i: number) => [companyTags.push(tag)]);
	}

	const firstTag = company.tags ? company.tags[0] : "";
	const secondTag = company.tags ? company.tags[1] : "";

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

	return (
		<div className="max-w-7xl px-4 mx-auto mt-7 relative z-10 sm:px-6 lg:px-8">
			<div className="lg:grid lg:grid-cols-11 lg:gap-7">
				<div className="col-span-3">
					<ElemPhoto
						photo={company.logo}
						wrapClass="flex items-center justify-center aspect-square shrink-0 p-5 bg-white rounded-lg shadow"
						imgClass="object-contain w-full h-full"
						imgAlt={company.name}
						placeholderClass="text-slate-300"
					/>
				</div>
				<div className="w-full col-span-5 mt-7 lg:mt-4">
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
						<ElemTags
							className="mt-4"
							resourceType={"companies"}
							tags={companyTags}
						/>
					)}
					{company.overview && (
						<>
							<div
								ref={overviewDiv}
								className={`mt-4 text-base text-slate-600 prose ${
									overviewMore ? "" : "line-clamp-3"
								}`}
							>
								{parse(newLineToP(company.overview))}
							</div>
							{overviewDivHeight > 84 && (
								<ElemButton
									onClick={() => setOverviewMore(!overviewMore)}
									btn="transparent"
									className="px-0 py-0 inline font-normal"
								>
									show {overviewMore ? "less" : "more"}
								</ElemButton>
							)}
						</>
					)}
					<div className="flex flex-wrap items-center mt-4 gap-x-5 gap-y-3 sm:gap-y-0">
						<ElemReactions
							resource={company}
							resourceType={"companies"}
							className="w-full sm:w-auto"
						/>
						<ElemSaveToList
							resourceName={company.name}
							resourceId={company.id}
							resourceType={"companies"}
							slug={company.slug!}
						/>
						<ElemSocialShare
							resourceName={company.name}
							resourceTags={company.tags}
							resourceTwitterUrl={company.twitter}
							sentimentHot={company.sentiment?.hot}
							sentimentLike={company.sentiment?.like}
							sentimentCrap={company.sentiment?.crap}
							resourceType={"companies"}
						/>
					</div>
				</div>
				<div className="col-span-3 mt-7 lg:mt-0">
					{Object.values(tokenInfo).some((i) => i > 0) && (
						<section className="bg-white shadow rounded-lg p-5 md:mt-0">
							<h2 className="text-xl font-bold">Token Info</h2>
							<div className="flex flex-col space-y-2 mt-2">
								{props.metrics.map((item) => {
									let metricsClass = "";

									if (item.id === "currentPrice") {
										metricsClass = "text-green-700";
									} else if (item.id === "marketCap") {
										metricsClass = "text-green-700";
									} else if (item.id === "marketCapRank") {
										metricsClass = "";
									} else if (item.id === "highLow24H") {
										metricsClass = "";
									} else if (item.id === "vol24H") {
										metricsClass = "text-green-700";
									} else {
										metricsClass = "";
									}

									return (
										<div
											className="flex items-center justify-between space-x-2"
											key={item.id}
										>
											<div>{item.name}</div>
											<div
												className={`${metricsClass} text-sm font-semibold border-none rounded-2xl py-1 px-2`}
											>
												{tokenInfo[item.id as keyof TokenInfo]
													? item.id === "highLow24H"
														? `$${convertAmountRaised(
																tokenInfo.high24H
														  )}/$${convertAmountRaised(tokenInfo.low24H)}`
														: `${
																item.id === "marketCapRank" ? "#" : "$"
														  }${convertAmountRaised(
																tokenInfo[item.id as keyof TokenInfo]
														  )}`
													: `N/A`}
											</div>
										</div>
									);
								})}
							</div>
							<div className="mt-3 text-xs text-center text-slate-400">
								Token data source:{" "}
								<a
									href="https://www.amberdata.io/?ref=edgeinio"
									target="_blank"
									rel="noreferrer"
									className="hover:text-slate-600"
								>
									AmberData
								</a>{" "}
								and Coingecko
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
							{/* <ElemVelocity
								className="col-span-3 mt-7 p-5 bg-white shadow rounded-lg lg:mt-0"
								heading="Velocity"
								employeeListings={"4"}
								tokenExchangeValue={"2.3"}
							/> */}
						</div>
					)}
					<div className="w-full mt-7 p-5 bg-white shadow rounded-lg">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-bold">Activity Timeline</h2>
							{/* <button className="border border-black/10 h-8 w-8 p-1.5 rounded-full transition-all hover:bg-slate-200">
								<IconEditPencil title="Edit" />
							</button> */}
						</div>

						<div className="mt-2 py-4 border-t border-black/10">
							{error ? (
								<h4>Error loading activity</h4>
							) : isLoading ? (
								<>
									{Array.from({ length: 3 }, (_, i) => (
										<PlaceholderActivity key={i} />
									))}
								</>
							) : sortedInvestmentRounds?.length === 0 ? (
								<div className="flex items-center justify-center mx-auto">
									<div className="w-full max-w-2xl p-8 text-center bg-white lg:my-8">
										<h2 className="mt-5 text-3xl font-bold">
											No activity found
										</h2>
										<div className="mt-1 text-lg text-slate-600">
											There is no activity for this organization.
										</div>
										<ElemButton
											onClick={() => props.setToggleFeedbackForm(true)}
											btn="white"
											className="mt-3"
										>
											<IconAnnotation className="w-6 h-6 mr-1" />
											Tell us about missing data
										</ElemButton>
									</div>
								</div>
							) : (
								sortedInvestmentRounds && (
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
																<div className="inline font-bold">
																	{activity.round === "Acquisition" ? (
																		<>Acquired by </>
																	) : (
																		<>
																			Raised{" "}
																			{activity.amount ? (
																				<div className="inline text-green-600">
																					${convertToIntNum(activity.amount)}
																				</div>
																			) : (
																				<div className="inline text-green-600">
																					undisclosed capital
																				</div>
																			)}{" "}
																			{activity.valuation && (
																				<div className="inline">
																					at{" "}
																					<div className="inline text-green-600">
																						$
																						{convertToIntNum(
																							activity.valuation
																						)}{" "}
																					</div>
																					valuation{" "}
																				</div>
																			)}
																			from:{" "}
																		</>
																	)}
																	{activity.investments.map(
																		(item: any, index) => {
																			return (
																				<div key={index} className="inline">
																					{index !== 0 &&
																						(index ===
																						activity.investments.length - 1
																							? ", and "
																							: ", ")}

																					{item.vc_firm && (
																						<Link
																							href={`/investors/${item.vc_firm["slug"]}`}
																						>
																							<a className="text-primary-500 hover:bg-slate-200">
																								{item.vc_firm["name"]}
																							</a>
																						</Link>
																					)}
																					{item.vc_firm && item.person && (
																						<>/</>
																					)}

																					{item.person && (
																						<Link
																							href={`/people/${item.person["slug"]}`}
																						>
																							<a className="text-primary-500 hover:bg-slate-200">
																								{item.person["name"]}
																							</a>
																						</Link>
																					)}
																				</div>
																			);
																		}
																	)}
																	.
																</div>

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
								)
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

			{company.tags && (
				<ElemCohort
					className="mt-7"
					heading="Similar Companies"
					currentSlug={company.slug}
					tag1={firstTag}
					tag2={secondTag}
				/>
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data: companies } = await runGraphQl<GetCompanyQuery>(
		GetCompanyDocument,
		{ slug: context.params?.companyId }
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
interface Metric {
	id: string;
	name: string;
}

interface TokenInfo {
	currentPrice: number;
	marketCap: number;
	marketCapRank: number;
	low24H: number;
	high24H: number;
	vol24H: number;
}

export default Company;
