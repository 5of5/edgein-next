import React, { useEffect, useState, MutableRefObject, useRef } from "react";
import { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
//import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemCredibility } from "@/components/Company/ElemCredibility";
import { ElemVelocity } from "@/components/Company/ElemVelocity";
import { ElemKeyInfo } from "@/components/ElemKeyInfo";
import { ElemTags } from "@/components/ElemTags";
import { ElemInvestments } from "@/components/Company/ElemInvestments";
import { ElemTeamGrid } from "@/components/Company/ElemTeamGrid";
import { runGraphQl } from "@/utils";
// import { ElemCohort } from "@/components/Company/ElemCohort";
import { ElemTabBar } from "../../components/ElemTabBar";
import { ElemSaveToList } from "@/components/ElemSaveToList";
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
} from "../../graphql/types";
import { ElemReactions } from "@/components/ElemReactions";
import { getNewFollows, reactOnSentiment, getName } from "@/utils/reaction";
import { useAuth } from "@/hooks/useAuth";
import {
	IconEditPencil,
	IconEventDot,
	IconEventLine,
	//IconSort,
} from "@/components/Icons";
// import { ElemRecentCompanies } from "@/components/Companies/ElemRecentCompanies";
import { companyLayerChoices } from "@/utils/constants";
import { convertToInternationalCurrencySystem, formatDate } from "../../utils";
import { remove } from "lodash";

type Props = {
	company: Companies;
	sortRounds: Investment_Rounds[];
};

const Company: NextPage<Props> = (props: Props) => {
	const { user } = useAuth();
	const router = useRouter();
	const { companyId } = router.query;

	//const goBack = () => router.back();

	const [company, setCompany] = useState(props.company);

	const [tokenInfo, setTokenInfo] = useState({ currentPrice: 0, marketCap: 0 });

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

	const getTokenInfo = async (ticker: string) => {
		const data = await fetch("../../api/get_metrics_amount", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ticker }),
		}).then((res) => res.json());
		setTokenInfo(data);
	};

	useEffect(() => {
		if (company && company.coin) {
			getTokenInfo(company.coin.ticker);
			// getTokenInfo('bnb')
		}
	}, [company]);

	useEffect(() => {
		if (companyData) setCompany(companyData?.companies[0] as Companies);
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
			const newSentiment: any = await reactOnSentiment({
				company: company.id,
				sentiment,
				pathname: location.pathname,
			});

			setCompany((prev: Companies) => {
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
	const tabBarItems = ["Overview"];
	if (company.teamMembers.length > 0) {
		tabBarItems.push("Team");
	}
	if (sortedInvestmentRounds.length > 0) {
		tabBarItems.push("Investments");
	}

	const scrollToSection = (tab: number) => {
		if (tab === 0 && overviewRef) {
			window.scrollTo(0, overviewRef.current.offsetTop - 30);
		} else if (tab === 1 && teamRef) {
			window.scrollTo(0, teamRef.current.offsetTop - 30);
		} else if (tab == 2 && investmentRef) {
			window.scrollTo(0, investmentRef.current.offsetTop - 30);
		}
	};

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
		<div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:py-12 lg:px-8">
			<div className="flex flex-col gap-4 md:grid md:grid-cols-5">
				<div className="col-span-1">
					<ElemPhoto
						photo={company.logo}
						wrapClass="flex items-center justify-center aspect-square shrink-0 p-6 bg-white rounded-lg border border-dark-500/10"
						imgClass="object-contain w-full h-full"
						imgAlt={company.name}
					/>
				</div>
				<div className="w-full col-span-4">
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
					<div className="flex flex-col grid-cols-4 gap-4 md:grid">
						<div className="col-span-3 mt-16 md:mt-0">
							{companyTags.length > 0 && (
								<ElemTags className="dark-500" tags={companyTags} />
							)}
							{company.overview && (
								<p className="mt-2 line-clamp-3 text-base text-slate-600">
									{company.overview}
								</p>
							)}

							<div className="flex items-center mt-4 gap-x-5">
								<ElemReactions
									data={company}
									handleReactionClick={handleReactionClick}
									// roundedFull
								/>
								<ElemSaveToList
									follows={company?.follows}
									onCreateNew={handleReactionClick}
								/>
							</div>
						</div>
						<section className="flex bg-white shadow rounded-lg flex-col col-span-1 md:mt-0">
							<h2 className="text-lg ml-2 mt-3 font-bold">Token Info</h2>
							<div className="flex flex-col justify-center p-3 mt-1 space-y-2 ">
								<div className="flex flex-start">
									<div className="text-base tracking-wide text-slate-600">
										Price (USD)
									</div>
									<div className="bg-green-100 text-green-500 text-sm font-semibold border-none rounded-2xl py-1 px-2 ml-4">
										{`$${
											tokenInfo && tokenInfo.currentPrice
												? convertAmountRaised(tokenInfo.currentPrice)
												: 0
										}`}
									</div>
								</div>
								<div className="flex flex-start">
									<div className="text-base tracking-wide text-slate-600">
										Market Cap
									</div>
									<div className="bg-green-100 text-green-500 text-sm font-semibold border-none rounded-2xl py-1 px-2 ml-4">
										{`$${
											tokenInfo && tokenInfo.marketCap
												? convertAmountRaised(tokenInfo.marketCap)
												: 0
										}`}
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>

			<ElemTabBar
				className="mt-7"
				tabs={tabBarItems}
				onTabClick={(index) => {
					scrollToSection(index);
				}}
			/>

			<div className="flex justify-between" ref={overviewRef}>
				<ElemKeyInfo
					className="mt-5 w-2/8"
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
				<div className="w-6/8">
					<div>
						{(company.market_verified ||
							company.github ||
							company.company_linkedin ||
							company.velocity_linkedin ||
							company.velocity_token) && (
							<div className="flex flex-col grid-cols-8 gap-4 mt-6 md:grid">
								<ElemCredibility
									className="col-span-5 mt-16 md:mt-0 p-3 bg-white shadow border rounded-lg border-dark-500/10"
									heading="Credibility"
									marketVerified={company.market_verified}
									githubVerified={company.github}
									linkedInVerified={company.company_linkedin}
								/>
								<ElemVelocity
									className="flex flex-col p-3 bg-white shadow border rounded-lg border-dark-500/10  col-span-3 mt-16 md:mt-0"
									heading="Velocity"
									employeeListings={"4"}
									tokenExchangeValue={"2.3"}
								/>
							</div>
						)}
					</div>
					<div className="w-full flex p-5 flex-col grid-cols-8 gap-4 mt-6 md:grid bg-white shadow border rounded-lg border-dark-500/10">
						<div className="col-span-8">
							<div className="flex justify-between pb-4">
								<h2 className="text-xl font-bold">Actively Timeline</h2>
								<span className="border rounded-full p-1 pl-2 pt-2">
									<IconEditPencil title="Edit" className="h-6 w-6" />
								</span>
							</div>

							<div className="flex p-4 flex-col border rounded-lg py-10">
								{sortedInvestmentRounds && sortedInvestmentRounds.length > 0 ? (
									sortedInvestmentRounds.map((activity, index) => {
										return (
											<div key={index} className="flex w-full mt-2">
												<div className="mt-1">
													<IconEventDot title="dot" className="h-2 mr-2" />
													<IconEventLine
														title="line"
														className="h-7 w-2 ml-1"
													/>
												</div>

												<div className="w-5/6">
													<h2 className="text-dark-500 font-bold truncate text-base">{`Raises $${convertAmountRaised(
														activity.amount
													)} from ${getInvestorsNames(
														activity.investments
													)}`}</h2>
													<p className="text-gray-400 text-xs">
														{formatDate(activity.round_date as string, {
															month: "short",
															day: "2-digit",
															year: "numeric",
														})}
													</p>
												</div>
											</div>
										);
									})
								) : (
									<p>There is no recent activity for this organization.</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{company.teamMembers.length > 0 && (
				<div
					ref={teamRef}
					className="mt-10 rounded-xl bg-white p-4 pt-6 shadow"
					id="team"
				>
					<ElemTeamGrid
						showEdit={true}
						//className="mt-12"
						heading="Team"
						people={company.teamMembers}
					/>
				</div>
			)}
			{sortedInvestmentRounds.length > 0 && (
				<div
					ref={investmentRef}
					className="mt-10 rounded-xl bg-white p-4 pt-6 shadow"
					id="investments"
				>
					<ElemInvestments
						heading="Investments"
						investments={sortedInvestmentRounds}
					/>
				</div>
			)}

			{/* <ElemCohort className="mt-12" heading="Similar Companies" /> */}
			{/* <div className="mt-10 rounded-xl bg-white shadow-md">
				<ElemRecentCompanies
					onUpdateOfCompany={() => { }}
					//className="mt-12 px-5 bg-white shadow-lg border rounded-lg border-dark-500/10"
					heading="Similar Companies"
				/>
			</div> */}
		</div>
	);
};

export async function getStaticPaths() {
	const { data: companies } = await runGraphQl<GetCompaniesPathsQuery>(
		`{ companies(where: {slug: {_neq: ""}, status: { _eq: "published" }}) { slug }}`
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
		{ slug: context.params?.companyId, current_user: 0 }
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
const convertAmountRaised = (theAmount: number) => {
	return convertToInternationalCurrencySystem(theAmount);
};
export default Company;
