import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ElemPhoto } from "@/components/elem-photo";
import { ElemKeyInfo } from "@/components/elem-key-info";
import { ElemTabBar } from "@/components/elem-tab-bar";
import { ElemTags } from "@/components/elem-tags";
import { ElemSaveToList } from "@/components/elem-save-to-list";
import { ElemReactions } from "@/components/elem-reactions";
import { ElemInvestorGrid } from "@/components/investor/elem-investor-grid";
import { ElemInvestments } from "@/components/investor/elem-investments";
import { ElemSocialShare } from "@/components/elem-social-share";
import { ElemOrganizationActivity } from "@/components/elem-organization-activity";
import parse from "html-react-parser";
import { newLineToP } from "@/utils/text";

import { runGraphQl } from "@/utils";
import {
	GetVcFirmDocument,
	GetVcFirmQuery,
	Investment_Rounds,
	useGetVcFirmQuery,
	Vc_Firms,
} from "@/graphql/types";

import { useAuth } from "@/hooks/use-auth";
import { uniq } from "lodash";
import { ElemButton } from "@/components/elem-button";
import { onTrackView } from "@/utils/track";
import { ElemSubOrganizations } from "@/components/elem-sub-organizations";
import { IconEditPencil, IconAnnotation } from "@/components/icons";
import ElemOrganizationNotes from "@/components/elem-organization-notes";

type Props = {
	vcfirm: Vc_Firms;
	sortByDateAscInvestments: Array<Investment_Rounds>;
	getInvestments: Array<Investment_Rounds>;
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const VCFirm: NextPage<Props> = (props) => {
	const { user } = useAuth();
	const router = useRouter();
	const { investorId } = router.query;

	const [vcfirm, setVcfirm] = useState(props.vcfirm);

	const [overviewMore, setOverviewMore] = useState(false);
	const overviewDiv = useRef() as MutableRefObject<HTMLDivElement>;
	const [overviewDivHeight, setOverviewDivHeight] = useState(0);

	const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
	const teamRef = useRef() as MutableRefObject<HTMLDivElement>;
	const investmentRef = useRef() as MutableRefObject<HTMLDivElement>;

	const {
		data: vcFirmData,
		error,
		isLoading,
	} = useGetVcFirmQuery({
		slug: investorId as string,
	});

	useEffect(() => {
		if (vcfirm.overview) {
			setOverviewDivHeight(overviewDiv.current.scrollHeight);
		}
	}, [vcfirm]);

	useEffect(() => {
		if (vcFirmData) {
			onTrackView({
				resourceId: vcFirmData?.vc_firms[0]?.id,
				resourceType: "vc_firms",
				pathname: router.asPath,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vcFirmData]);

	useEffect(() => {
		if (vcFirmData) setVcfirm(vcFirmData?.vc_firms[0] as Vc_Firms);
	}, [vcFirmData]);

	if (!vcfirm) {
		return <h1>Not Found</h1>;
	}

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

	const parentLinks = vcfirm?.to_links?.find(
		(item) => item.link_type === "child"
	);
	const parentOrganization =
		parentLinks?.from_company || parentLinks?.from_vc_firm;
	const subOrganizations = vcfirm?.from_links?.filter(
		(item) => item.link_type === "child"
	);

	return (
		<>
			<div className="w-full bg-gradient-to-b from-transparent to-white shadow pt-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:grid lg:grid-cols-11 lg:gap-7">
						<div className="col-span-3">
							<ElemPhoto
								photo={vcfirm.logo}
								wrapClass="flex items-center justify-center aspect-square shrink-0 p-5 bg-white rounded-lg border border-black/10"
								imgClass="object-contain w-full h-full"
								imgAlt={vcfirm.name}
								placeholderClass="text-slate-300"
							/>
						</div>

						<div className="w-full col-span-5 mt-7 lg:mt-4">
							<h1 className="text-4xl font-bold md:text-5xl">{vcfirm.name}</h1>
							{vcfirm.tags?.length > 0 && (
								<ElemTags
									className="mt-4"
									resourceType={"investors"}
									tags={vcfirm.tags}
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

							{vcfirm.overview && (
								<>
									<div
										ref={overviewDiv}
										className={`mt-4 text-base text-slate-600 prose ${
											overviewMore ? "" : "line-clamp-3"
										}`}
									>
										{parse(newLineToP(vcfirm.overview))}
									</div>
									{overviewDivHeight > 72 && (
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
									resource={vcfirm}
									resourceType={"vc_firms"}
									className="w-full sm:w-auto"
								/>
								<ElemSaveToList
									resourceName={vcfirm.name}
									resourceId={vcfirm.id}
									resourceType={"vc_firms"}
									slug={vcfirm.slug!}
								/>
								<ElemSocialShare
									resourceName={vcfirm.name}
									resourceTags={vcfirm.tags}
									resourceTwitterUrl={vcfirm.twitter}
									sentimentHot={vcfirm.sentiment?.hot}
									sentimentLike={vcfirm.sentiment?.like}
									sentimentCrap={vcfirm.sentiment?.crap}
									resourceType={"vc_firms"}
								/>
							</div>
						</div>
						{/* <div className="col-span-3 mt-7 lg:mt-0">Placeholder</div> */}
					</div>

					<ElemTabBar
						className="mt-7 border-b-0"
						tabs={tabBarItems}
						resourceName={vcfirm.name}
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
							website={vcfirm.website}
							investmentsLength={sortedInvestmentRounds.length}
							yearFounded={vcfirm.year_founded}
							linkedIn={vcfirm.linkedin}
							location={vcfirm.location}
							twitter={vcfirm.twitter}
						/>
					</div>
					<div className="col-span-8">
						<div className="w-full mt-7 p-5 bg-white shadow rounded-lg lg:mt-0 mb-6">
							<ElemOrganizationNotes
								resourceId={vcfirm.id}
								resourceType="vc_firms"
							/>
						</div>
						<div className="w-full mt-7 p-5 bg-white shadow rounded-lg lg:mt-0">
							<ElemOrganizationActivity
								resourceType="vc_firms"
								resourceInvestments={sortedInvestmentRounds}
								resourceName={vcfirm.name}
							/>
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
							showEdit={false}
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
							showEdit={false}
							heading="Investments"
							investments={sortedInvestmentRounds.filter((n) => n)}
						/>
					</section>
				)}

				{subOrganizations?.length > 0 && (
					<ElemSubOrganizations
						className="mt-7"
						heading={`${vcfirm?.name} Sub-Organizations (${subOrganizations.length})`}
						subOrganizations={subOrganizations}
					/>
				)}

				{/* <div className="mt-7 rounded-lg bg-white shadow">
				{vcfirm && (
					<ElemRecentInvestments heading="Similar Investors" />
				)}
			</div> */}
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data: vc_firms } = await runGraphQl<GetVcFirmQuery>(
		GetVcFirmDocument,
		{ slug: context.params?.investorId }
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
			getInvestments,
			sortByDateAscInvestments,
		},
	};
};

export default VCFirm;
