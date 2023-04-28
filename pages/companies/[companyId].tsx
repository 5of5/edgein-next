import React, { useEffect, useState, MutableRefObject, useRef, useCallback } from "react";
import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ElemPhoto } from "@/components/elem-photo";
import { ElemCredibility } from "@/components/company/elem-credibility";
import { ElemKeyInfo } from "@/components/elem-key-info";
import { ElemTags } from "@/components/elem-tags";
import { ElemInvestments } from "@/components/company/elem-investments";
import { ElemTeamGrid } from "@/components/company/elem-team-grid";
import { runGraphQl } from "@/utils";
import { ElemSubOrganizations } from "@/components/elem-sub-organizations";
import { ElemCohort } from "@/components/company/elem-cohort";
import { ElemTabBar } from "@/components/elem-tab-bar";
import { ElemSaveToList } from "@/components/elem-save-to-list";
import { ElemButton } from "@/components/elem-button";
import { ElemSocialShare } from "@/components/elem-social-share";
import { ElemVelocity } from "@/components/company/elem-velocity";
import { ElemOrganizationActivity } from "@/components/elem-organization-activity";
import {
	Companies,
	GetCompanyDocument,
	GetCompanyQuery,
	Investment_Rounds,
	News,
	useGetCompanyQuery,
	//Investments,
} from "@/graphql/types";
import { ElemReactions } from "@/components/elem-reactions";
import { useAuth } from "@/hooks/use-auth";
import { companyLayerChoices, tokenInfoMetrics } from "@/utils/constants";
import { sortBy } from "lodash";
import parse from "html-react-parser";
import { newLineToP } from "@/utils/text";
import { onTrackView } from "@/utils/track";
import ElemTokenInfo, { Metrics, TokenInfo } from "@/components/company/elem-token-info";
import ElemOrganizationNotes from "@/components/elem-organization-notes";
import { Popups } from "@/components/the-navbar";

type Props = {
	company: Companies;
	sortRounds: Investment_Rounds[];
	sortNews: News[];
	metrics: Metrics[];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
	setShowPopup: React.Dispatch<React.SetStateAction<Popups>>;
};

const Company: NextPage<Props> = (props: Props) => {
	const { user } = useAuth();
	const router = useRouter();
	const { companyId } = router.query;
	const [company, setCompany] = useState<Companies>(props.company);

	const [tokenInfo, setTokenInfo] = useState<Array<TokenInfo>>([]);

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

	const getTokenInfo = async (coinId: number, coinTicker: string) => {
		const data = await fetch("/api/get-metrics-amount/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ coinId }),
		}).then((res) => res.json());
		return {...data, ticker: coinTicker};
	};

	const getAllTokenInfo = useCallback(async (coins: any) => {
    const coinsInfo = await Promise.all(
      coins.map((coin: any) => getTokenInfo(coin.id, coin.ticker))
    );
    setTokenInfo(coinsInfo);
  }, []);
	const velocityToken = tokenInfo.map(token => (
		(token?.vol24H && token?.marketCap)
    ? {
				coin: token.ticker,
				velocity: Math.round((token?.vol24H / token?.marketCap) * 100) / 100
			}
    : null
	));

	useEffect(() => {
		if (company.overview) {
			setOverviewDivHeight(overviewDiv.current.scrollHeight);
		}
	}, [company]);

	useEffect(() => {
    if (company?.coins && company.coins.length > 0) {
      getAllTokenInfo(company.coins);
    }
  }, [company, getAllTokenInfo]);

	useEffect(() => {
		if (companyData) setCompany(companyData?.companies[0] as any);
	}, [companyData]);

	if (!company) {
		return <h1>Not Found</h1>;
	}

	const sortedInvestmentRounds = props.sortRounds;

	const sortActivities =
		[...sortedInvestmentRounds, ...props.sortNews]
			?.slice()
			.sort((a: any, b: any) => {
				return (
					new Date(a?.date || a?.round_date || "").getTime() -
					new Date(b?.date || b?.round_date || "").getTime()
				);
			})
			.reverse() || [];

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

	const parentLinks = company?.to_links?.find(
		(item) => item.link_type === "child"
	);
	const parentOrganization =
		parentLinks?.from_company || parentLinks?.from_vc_firm;
	const subOrganizations = company?.from_links?.filter(
		(item) => item.link_type === "child"
	);

	return (
		<>
			<div className="w-full bg-gradient-to-b from-transparent to-white shadow pt-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:grid lg:grid-cols-11 lg:gap-7">
						<div className="col-span-3">
							<ElemPhoto
								photo={company.logo}
								wrapClass="flex items-center justify-center aspect-square shrink-0 p-5 bg-white rounded-lg border border-black/10"
								imgClass="object-contain w-full h-full"
								imgAlt={company.name}
								placeholderClass="text-slate-300"
							/>
						</div>
						<div className="w-full col-span-5 mt-7 lg:mt-4">
							<div className="shrink-0">
								<h1 className="self-end inline-block text-4xl font-bold md:text-5xl">
									{company.name}
								</h1>
								{tokenInfo.length > 0 && (
									<div
										key={tokenInfo.map(item => item.ticker).join(" - ")}
										className="ml-2 pb-0.5 inline-block self-end whitespace-nowrap text-lg leading-sm uppercase"
										title={`Token: ${tokenInfo.map(item => item.ticker).join(" - ")}`}
									>
										{tokenInfo.map(item => item.ticker).join(" - ")}
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
							{parentOrganization && (
								<div className="mt-4">
									<div className="font-bold text-sm">Sub-organization of:</div>
									<Link href="#">
										<a className="flex items-center gap-2 mt-1 group transition-all hover:-translate-y-0.5">
											<ElemPhoto
												photo={parentOrganization?.logo}
												wrapClass="flex items-center justify-center w-10 aspect-square shrink-0 p-1 bg-white rounded-lg shadow"
												imgClass="object-contain w-full h-full"
												imgAlt={parentOrganization?.name}
												placeholderClass="text-slate-300"
											/>
											<Link
												href={`/${
													parentLinks?.from_company ? "companies" : "investors"
												}/${parentOrganization?.slug}`}
												passHref
											>
												<h2 className="group-hover:text-primary-500">
													{parentOrganization?.name}
												</h2>
											</Link>
										</a>
									</Link>
								</div>
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
							{tokenInfo.length > 0 && (
								<ElemTokenInfo metrics={props.metrics} tokens={tokenInfo} />
							)}
						</div>
					</div>
					<ElemTabBar
						className="mt-7 border-b-0"
						tabs={tabBarItems}
						resourceName={company.name}
					/>
				</div>
			</div>

			<div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
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
							locationJson={company.location_json}
							discord={company.discord}
							glassdoor={company.glassdoor}
						/>
					</div>
					<div className="col-span-8">
						<div className="w-full mt-7 p-5 bg-slate-200  rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.07)]">
							<ElemOrganizationNotes
								resourceId={company.id}
								resourceType="companies"
								setShowPopup={props.setShowPopup}
							/>
						</div>

						{(company.market_verified ||
							company.github ||
							company.company_linkedin ||
							company.velocity_linkedin ||
							company.velocity_token) && (
							<div className="mt-7 lg:grid lg:grid-cols-8 lg:gap-7">
								<ElemCredibility
									className="col-span-5 mt-7 p-5 bg-white shadow rounded-lg lg:mt-0"
									heading="Credibility"
									marketVerified={company.market_verified}
									githubVerified={company.github}
									linkedInVerified={company.company_linkedin}
								/>
								{(company.velocity_linkedin || velocityToken) && (
									<ElemVelocity
										className="col-span-3 mt-7 p-5 bg-white shadow rounded-lg lg:mt-0"
										heading="Velocity"
										employeeListings={company.velocity_linkedin}
										tokenExchangeValue={velocityToken}
									/>
								)}
							</div>
						)}

						<div className="w-full mt-7 p-5 bg-white shadow rounded-lg">
							<ElemOrganizationActivity
								resourceType="companies"
								resourceInvestments={sortActivities}
							/>
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

				{subOrganizations?.length > 0 && (
					<ElemSubOrganizations
						className="mt-7"
						heading={`${company.name} Sub-Organizations (${subOrganizations.length})`}
						subOrganizations={subOrganizations}
					/>
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
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data: companies } = await runGraphQl<GetCompanyQuery>(
		GetCompanyDocument,
		{ slug: context.params?.companyId },
		context.req.cookies
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

	const sortNews =
		company.news_links
			?.slice()
			?.map((item) => ({ ...item.news, type: "news" }))
			?.filter((item) => item.status === "published")
			.sort((a, b) => {
				return (
					new Date(a?.date ?? "").getTime() - new Date(b?.date ?? "").getTime()
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
			sortNews,
			metrics: tokenInfoMetrics,
		},
	};
};

export default Company;
