import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import { NextPage, GetStaticProps, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemKeyInfo } from "@/components/ElemKeyInfo";
import { ElemTabBar } from "@/components/ElemTabBar";
import { ElemTags } from "@/components/ElemTags";
import { ElemSaveToList } from "@/components/ElemSaveToList";
import { IconEditPencil } from "@/components/Icons";
import { ElemReactions } from "@/components/ElemReactions";
import { ElemInvestorGrid } from "@/components/Investor/ElemInvestorGrid";
import { ElemInvestments } from "@/components/Investor/ElemInvestments";

import {
	convertToInternationalCurrencySystem,
	formatDate,
	runGraphQl,
} from "@/utils";
import {
	Follows_Vc_Firms,
	GetVcFirmDocument,
	GetVcFirmQuery,
	Investment_Rounds,
	useGetVcFirmQuery,
	Vc_Firms,
} from "@/graphql/types";

import {
	getNewFollows,
	reactOnSentiment,
	getName,
	isFollowsExists,
	getNewTempSentiment,
} from "@/utils/reaction";
import { useAuth } from "@/hooks/useAuth";
import { remove } from "lodash";
import ElemConfirmationMessageModal from "@/components/ElemConfirmationMessageModal";
type Props = {
	vcfirm: Vc_Firms;
	sortByDateAscInvestments: Array<Investment_Rounds>;
};

const VCFirm: NextPage<Props> = (props) => {
	const { user } = useAuth();
	const router = useRouter();
	const { investorId } = router.query;
	//const goBack = () => router.back();

	const [vcfirm, setVcfirm] = useState(props.vcfirm);

	const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
	const teamRef = useRef() as MutableRefObject<HTMLDivElement>;
	const investmentRef = useRef() as MutableRefObject<HTMLDivElement>;
	const [reactionError, setReactionError] = useState(null)

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
				// maintain previous state to revert state in case of error
				const previousState = vcfirm
				setTemporary(sentiment, alreadyReacted);

				const { newSentiment, error } = await reactOnSentiment({
					vcfirm: vcfirm.id,
					sentiment,
					pathname: location.pathname,
				});
				if (error && error.message) {
					setReactionError(error.message)
					setVcfirm(previousState)
				} else
					setVcfirm((prev: Vc_Firms) => {
						const newFollows = getNewFollows(
							sentiment,
							"vcfirm"
						) as Follows_Vc_Firms;
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
		setVcfirm((prev: Vc_Firms) => {
			const newSentiment = getNewTempSentiment(
				{ ...prev.sentiment },
				sentiment,
				alreadyReacted
			);

			const newFollows = getNewFollows(sentiment, "vcfirm") as Follows_Vc_Firms;
			if (!alreadyReacted) prev.follows.push(newFollows);
			else
				remove(prev.follows, (item) => {
					return getName(item.list!) === sentiment;
				});
			return { ...prev, sentiment: newSentiment };
		});
	};

	const sortedInvestmentRounds = props.sortByDateAscInvestments;

	//TabBar
	const tabBarItems = [{ name: "Overview", ref: overviewRef }];
	if (vcfirm.investors.length > 0) {
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
			{/* <div onClick={goBack}>
				<ElemButton className="pl-0 pr-0" btn="transparent" arrowLeft>
					Back
				</ElemButton>
			</div> */}
			<div className="lg:grid lg:grid-cols-11 lg:gap-7 lg:items-center">
				<div className="col-span-3">
					<ElemPhoto
						photo={vcfirm.logo}
						wrapClass="flex items-center justify-center aspect-square shrink-0 p-5 bg-white rounded-lg shadow"
						imgClass="object-contain w-full h-full"
						imgAlt={vcfirm.name}
					/>
				</div>

				<div className="w-full col-span-5 mt-7 lg:mt-0">
					<h1 className="text-4xl font-bold md:text-5xl">{vcfirm.name}</h1>

					{vcfirm.tags && <ElemTags className="mt-4" tags={vcfirm.tags} />}

					{vcfirm.overview && (
						<p className="mt-4 line-clamp-3 text-base text-slate-600">
							{vcfirm.overview}
						</p>
					)}

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
				{/* <div className="col-span-3 mt-7 lg:mt-0">Placeholder</div> */}
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
						website={vcfirm.website}
						investmentsLength={sortedInvestmentRounds.length}
						yearFounded={vcfirm.year_founded}
						linkedIn={vcfirm.linkedin}
						location={vcfirm.location}
						twitter={vcfirm.twitter}
					/>
				</div>
				<div className="col-span-8">
					<div className="w-full mt-7 p-5 bg-white shadow rounded-lg lg:mt-0">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-bold">Activity Timeline</h2>
							<button className="border border-black/10 h-8 w-8 p-1.5 rounded-full transition-all hover:bg-slate-200">
								<IconEditPencil title="Edit" />
							</button>
						</div>

						<div className="mt-2 p-4 border border-black/10 rounded-lg">
							{sortedInvestmentRounds && sortedInvestmentRounds.length > 0 ? (
								<ul className="flex flex-col">
									{sortedInvestmentRounds.map(
										(activity: Investment_Rounds, index: number) => {
											if (!activity) {
												return;
											}
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
															{`${activity.company ? activity.company.name : ""
																}`}

															{`
															raised 
															${activity.amount
																	? "$" +
																	convertToInternationalCurrencySystem(
																		activity.amount
																	)
																	: "capital"
																} / ${activity.round
																	? activity.round
																	: "Investment round"
																} from ${vcfirm.name}`}
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
										}
									)}
								</ul>
							) : (
								<div className="flex items-center justify-center p-5">
									<div className="text-xl text-slate-600">
										There is no recent activity for this organization.
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{vcfirm.investors.length > 0 && (
				<div
					ref={teamRef}
					className="mt-7 p-5 rounded-lg bg-white shadow"
					id="team"
				>
					<ElemInvestorGrid
						// tags={vcfirm.investors.map((investor : Team_Members) => investor.function)}
						showEdit={true}
						heading="Team"
						people={vcfirm.investors}
					/>
				</div>
			)}

			{sortedInvestmentRounds && sortedInvestmentRounds.length > 0 && (
				<section
					ref={investmentRef}
					className="mt-7 p-5 rounded-lg bg-white shadow"
					id="investments"
				>
					<ElemInvestments
						heading="Investments"
						investments={sortedInvestmentRounds.filter((n) => n)}
					/>
				</section>
			)}

			{/* <div className="mt-7 rounded-lg bg-white shadow">
				{vcfirm && (
					<ElemRecentInvestments heading="Similar Investors" />
				)}
			</div> */}
			<ElemConfirmationMessageModal
				show={(reactionError) ? true : false}
				onCancel={() => { setReactionError(null) }}
				type="response"
				message={(reactionError) ? reactionError : ''}
			/>
		</div>
	);
};

// export async function getStaticPaths() {
// 	const { data: vcFirms } = await runGraphQl<GetVcFirmQuery>(
// 		`{vc_firms(where: {slug: {_neq: ""}, status: { _eq: "published" }}) { name, slug, logo}}`
// 	);

// 	return {
// 		paths: vcFirms?.vc_firms
// 			?.filter((vcfirm) => vcfirm.slug)
// 			.map((vcfirm) => ({
// 				params: { investorId: vcfirm.slug },
// 			})),
// 		fallback: true, // false or 'blocking'
// 	};
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
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
			const distantPast = new Date("April 2, 1900 00:00:00");
			let dateA = a?.round_date ? new Date(a.round_date) : distantPast;
			let dateB = b?.round_date ? new Date(b.round_date) : distantPast;
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
