import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ElemButton } from "../../components/ElemButton";
import { ElemPhoto } from "../../components/ElemPhoto";
import { ElemKeyInfo } from "../../components/ElemKeyInfo";
import { ElemTable } from "../../components/ElemTable";
import { ElemTableCell } from "../../components/ElemTableCell";
import { ElemTabBar } from "../../components/ElemTabBar";
import { ElemTags } from "@/components/ElemTags";
import { ElemSaveToList } from "@/components/ElemSaveToList";
import {
	IconEditPencil,
	IconEventDot,
	IconEventLine,
	IconSort,
} from "@/components/Icons";
import {
	convertToInternationalCurrencySystem,
	formatDate,
	runGraphQl,
} from "../../utils";
import {
	Follows_Vc_Firms,
	GetVcFirmDocument,
	GetVcFirmQuery,
	Investment_Rounds,
	useGetVcFirmQuery,
	Vc_Firms,
	Team_Members,
} from "../../graphql/types";
import { ElemReactions } from "@/components/ElemReactions";
import { getNewFollows, reactOnSentiment, getName } from "@/utils/reaction";
import { useAuth } from "@/hooks/useAuth";
import { ElemRecentInvestments } from "@/components/Investors/ElemRecentInvestments";
import { ElemInvestorGrid } from "@/components/Investors/ElemInvestorGrid";
import { remove } from "lodash";
type Props = {
	vcfirm: Vc_Firms;
	sortByDateAscInvestments: Array<Investment_Rounds>;
};

const VCFirm: NextPage<Props> = (props) => {
	const { user } = useAuth();
	const router = useRouter();
	const { investorId } = router.query;
	const goBack = () => router.back();

	const [vcfirm, setVcfirm] = useState(props.vcfirm);
	const [selectedTab, setSelectedTab] = useState(0);

	const teamRef = useRef() as MutableRefObject<HTMLDivElement>;
	const investmentRef = useRef() as MutableRefObject<HTMLDivElement>;

	const {
		data: vcFirmData,
		error,
		isLoading,
	} = useGetVcFirmQuery({
		slug: investorId as string,
		current_user: user?.id ?? 0,
	});

	useEffect(() => {
		if (vcFirmData) setVcfirm(vcFirmData?.vc_firms[0] as Vc_Firms);
	}, [vcFirmData]);

	if (!vcfirm) {
		return <h1>Not Found</h1>;
	}

	const handleReactionClick =
		(sentiment: string, alreadyReacted: boolean) =>
		async (
			event: React.MouseEvent<
				HTMLButtonElement | HTMLInputElement | HTMLElement
			>
		) => {
			event.stopPropagation();
			event.preventDefault();

			const newSentiment = await reactOnSentiment({
				vcfirm: vcfirm.id,
				sentiment,
				pathname: location.pathname,
			});

			setVcfirm((prev: Vc_Firms) => {
				const newFollows = getNewFollows(
					sentiment,
					"vcfirm"
				) as Follows_Vc_Firms;
				if (!alreadyReacted) prev.follows.push(newFollows);
				else
					remove(prev.follows, (item) => {
						return getName(item.list!) === sentiment;
					});
				return { ...prev, sentiment: newSentiment };
			});
		};

	if (!vcfirm) {
		return <h1>Not Found</h1>;
	}

	const scrollToSection = (tab: number) => {
		if (tab === 1 && teamRef) {
			window.scrollTo(0, teamRef.current.offsetTop - 30);
		} else if (tab == 2 && investmentRef) {
			window.scrollTo(0, investmentRef.current.offsetTop - 30);
		}
	};

	const sortedInvestmentRounds = props.sortByDateAscInvestments;

	return (
		<div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:py-12 lg:px-8">
			{/* <div onClick={goBack}>
				<ElemButton className="pl-0 pr-0" btn="transparent" arrowLeft>
					Back
				</ElemButton>
			</div> */}

			<div className="flex flex-col gap-5 md:grid md:grid-cols-3">
				<div className="col-span-1">
					<ElemPhoto
						photo={vcfirm.logo}
						wrapClass="flex items-center justify-center shrink-0 p-6 h-72 lg:h-88 bg-white rounded-lg shadow-md"
						imgClass="object-contain w-full h-full rounded-md"
						imgAlt={vcfirm.name}
					/>
				</div>

				<div className="w-full col-span-2 p-2">
					<h1 className="my-5 text-4xl font-bold md:text-6xl dark-500">
						{vcfirm.name}
					</h1>
					{vcfirm.tags && <ElemTags className="dark-500" tags={vcfirm.tags} />}
					{vcfirm.overview && (
						<p className="mt-2 line-clamp-3 text-base text-slate-600">
							{vcfirm.overview}
						</p>
					)}
					{/* <ElemKeyInfo
						heading=""
						website={vcfirm.website}
						linkedIn={vcfirm.linkedin}
						investmentsLength={vcfirm.investments ?.length}
					/> */}
					<div className="flex items-center mt-4 gap-x-5">
						<ElemReactions
							data={vcfirm}
							handleReactionClick={handleReactionClick}
						/>
						<ElemSaveToList
							follows={vcfirm?.follows}
							onCreateNew={handleReactionClick}
						/>
					</div>
				</div>
			</div>

			<ElemTabBar
				className=""
				tabs={["Overview", "Team", "Investments"]}
				onTabClick={(index) => {
					scrollToSection(index);
					setSelectedTab(index);
				}}
				selectedTab={selectedTab}
			/>

			<div className="flex justify-between w-full">
				<ElemKeyInfo
					className="mt-5 w-2/6"
					heading="Key Info"
					website={vcfirm.website}
					investmentsLength={sortedInvestmentRounds.length}
					yearFounded={vcfirm.year_founded}
					linkedIn={vcfirm.linkedin}
					location={vcfirm.location}
					twitter={vcfirm.twitter}
				/>

				<div className="w-4/6 flex p-5 flex-col grid-cols-8 gap-4 mt-6 md:grid bg-white shadow-md border rounded-lg border-dark-500/10">
					<div className="col-span-8">
						<div className="flex justify-between pb-4">
							<h2 className="text-xl font-bold">Actively Timeline</h2>
							<span className="border rounded-full p-1 pl-2 pt-2">
								<IconEditPencil title="Edit" className="h-6 w-6" />
							</span>
						</div>

						<div className="flex p-4 flex-col border rounded-lg py-10">
							{sortedInvestmentRounds && sortedInvestmentRounds.length > 0 ? (
								sortedInvestmentRounds.map(
									(activity: Investment_Rounds, index: number) => {
										return (
											<div key={index} className="flex inline-flex w-full mt-2">
												<div className="mt-1">
													<IconEventDot title="dot" className="h-2 mr-2" />
													<IconEventLine
														title="line"
														className="h-7 w-2 ml-1"
													/>
												</div>

												<div className="w-5/6">
													<h2 className="text-dark-500 font-bold truncate text-base">{`${
														activity.company ? activity.company.name : ""
													} raised $${activity.amount} / ${
														activity.round
													} from ${vcfirm.name}`}</h2>
													<p className="text-gray-400 text-xs">
														{activity.round_date}
													</p>
												</div>
											</div>
										);
									}
								)
							) : (
								<p>There is no recent activity for this organization.</p>
							)}
							{/* <p>There is no recent activity for this organization.</p>
							<h1 className="text-primary-800 bg-primary-200 px-2 py-1 border-none rounded-2xl font-bold ">Suggest Activity</h1> */}
						</div>
					</div>
				</div>
			</div>
			{vcfirm.investors.length > 0 && (
				<div
					ref={teamRef}
					className="mt-10 rounded-xl bg-white p-4 pt-6 shadow-md"
					id="team"
				>
					<ElemInvestorGrid
						// tags={vcfirm.investors.map((investor : Team_Members) => investor.function)}
						showEdit={true}
						//className="mt-12"
						heading="Team"
						people={vcfirm.investors}
					/>
				</div>
			)}

			{Object.keys(sortedInvestmentRounds).length > 0 && (
				<div
					ref={investmentRef}
					className="mt-10 rounded-xl bg-white p-4 pt-6 shadow-md"
					id="investments"
				>
					<div className="flex justify-between pb-4">
						<h2 className="text-2xl font-bold">Investments</h2>
						<span className="border rounded-full p-1 pl-2 pt-2">
							<IconEditPencil title="Edit" className="h-6 w-6" />
						</span>
					</div>
					<ElemTable
						className="w-full mt-3 border border-separate rounded-xl"
						columns={[
							{ label: "Date" },
							{ label: "Company" },
							{ label: "Round" },
							{ label: "Money Raised" },
						]}
					>
						{sortedInvestmentRounds.map(
							(theRound: Investment_Rounds, index: number) => {
								if (!theRound) {
									return;
								}

								return (
									<tr
										key={index}
										className={`${
											index % 2 === 0 ? "" : "bg-slate-50"
										} flex flex-col flex-no wrap overflow-hidden md:table-row`}
									>
										<ElemTableCell header="Date">
											{theRound.round_date ? (
												formatDate(theRound.round_date, {
													month: "short",
													day: "2-digit",
													year: "numeric",
												})
											) : (
												<>&mdash;</>
											)}
										</ElemTableCell>
										<ElemTableCell header="Company">
											{theRound.company ? (
												<Link
													href={`/companies/${theRound.company.slug}`}
													key={theRound.company.id}
												>
													<a className="inline-flex items-center investor hover:opacity-70">
														<ElemPhoto
															photo={theRound.company.logo}
															wrapClass="flex items-center shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-2 bg-white shadow-md"
															imgClass="object-fit max-w-full max-h-full"
															imgAlt={theRound.company.name}
														/>
														{theRound.company.name}
													</a>
												</Link>
											) : (
												<>&mdash;</>
											)}
										</ElemTableCell>
										<ElemTableCell header="Round">
											{theRound.round ? <>{theRound.round}</> : <>&mdash;</>}
										</ElemTableCell>
										<ElemTableCell header="Money Raised">
											{theRound.amount ? (
												<>
													<span>$</span>
													{convertAmountRaised(theRound.amount)}
												</>
											) : (
												<>&mdash;</>
											)}
										</ElemTableCell>
									</tr>
								);
							}
						)}
					</ElemTable>
				</div>
			)}
			{/* <div className="mt-10 rounded-xl bg-white shadow-md">
				{vcfirm && (
					<ElemRecentInvestments heading="Similar Investors" />
				)}
			</div> */}
		</div>
	);
};

export async function getStaticPaths() {
	const { data: vcFirms } = await runGraphQl<GetVcFirmQuery>(
		`{vc_firms(where: {slug: {_neq: ""}, status: { _eq: "published" }}) { name, slug, logo}}`
	);

	return {
		paths: vcFirms?.vc_firms
			?.filter((vcfirm) => vcfirm.slug)
			.map((vcfirm) => ({
				params: { investorId: vcfirm.slug },
			})),
		fallback: true, // false or 'blocking'
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: vc_firms } = await runGraphQl<GetVcFirmQuery>(
		GetVcFirmDocument,
		{ slug: context.params?.investorId, current_user: 0 }
	);

	if (!vc_firms?.vc_firms[0]) {
		return {
			notFound: true,
		};
	}

	const getInvestments = vc_firms.vc_firms[0].investments.map((round) => {
		if (typeof round.investment_round === "object" && round.investment_round) {
			return round.investment_round;
		} else {
			return null;
		}
	});

	const sortByDateAscInvestments = getInvestments
		.slice()
		.sort((a, b) => {
			const distantFuture = new Date(8640000000000000);

			let dateA = a?.round_date ? new Date(a.round_date) : distantFuture;
			let dateB = b?.round_date ? new Date(b.round_date) : distantFuture;
			return dateA.getTime() - dateB.getTime();
		})
		.reverse();

	let metaTitle = null;
	if (vc_firms.vc_firms[0].name) {
		metaTitle =
			vc_firms.vc_firms[0].name + " Investor Profile & Funding - EdgeIn.io";
	}

	return {
		props: {
			metaTitle,
			vcfirm: vc_firms.vc_firms[0],
			sortByDateAscInvestments,
		},
	};
};

export default VCFirm;
function convertAmountRaised(theAmount: number) {
	return convertToInternationalCurrencySystem(theAmount);
}
