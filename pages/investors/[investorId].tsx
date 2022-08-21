import React, { useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ElemButton } from "../../components/ElemButton";
import { ElemPhoto } from "../../components/ElemPhoto";
import { ElemKeyInfo } from "../../components/ElemKeyInfo";
import { ElemTable } from "../../components/ElemTable";
import { ElemTableCell } from "../../components/ElemTableCell";
import {
	convertToInternationalCurrencySystem,
	formatDate,
	runGraphQl,
} from "../../utils";
import {
	GetVcFirmQuery,
	Investment_Rounds,
	Vc_Firms,
} from "../../graphql/types";

type Props = {
	vcfirm: Vc_Firms;
	sortByDateAscInvestments: Array<Investment_Rounds>;
};

const VCFirm: NextPage<Props> = (props) => {
	const router = useRouter();

	const goBack = () => router.back();

	const [vcfirm, setVcfirm] = useState(props.vcfirm);

	const handleReactionClick = (sentiment: string) => async () => {
		const resp = await fetch("/api/reaction/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ 
				vcfirm: vcfirm.id,
				sentiment,
				pathname: location.pathname 
			}),
		});
		const newSentiment = await resp.json()
		setVcfirm({...vcfirm, sentiment: newSentiment})
	}

	if (!vcfirm) {
		return <h1>Not Found</h1>;
	}

	const sortedInvestmentRounds = props.sortByDateAscInvestments;

	return (
		<div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
			<div onClick={goBack}>
				<ElemButton className="pl-0 pr-0" btn="transparent" arrowLeft>
					Back
				</ElemButton>
			</div>

			<div className="flex flex-col md:grid md:grid-cols-3 gap-5 my-8">
				<div className="col-span-1">
					<ElemPhoto
						photo={vcfirm.logo}
						wrapClass="flex items-center justify-center shrink-0 p-6 h-72 lg:h-88 bg-white rounded-lg shadow-md"
						imgClass="object-contain w-full h-full rounded-md"
						imgAlt={vcfirm.name}
					/>
				</div>
				<div className="w-full col-span-2 p-2">
					<h1 className="text-4xl md:text-6xl font-bold my-5">{vcfirm.name}</h1>
					<ElemButton onClick={handleReactionClick('rocket')}>Rocket {vcfirm.sentiment?.rocket || 0}</ElemButton>
					<ElemKeyInfo
						heading=""
						website={vcfirm.website}
						linkedIn={vcfirm.linkedin}
						investmentsLength={vcfirm.investments?.length}
					/>
				</div>
			</div>

			{Object.keys(sortedInvestmentRounds).length > 0 && (
				<div className="mt-16" id="investments">
					<h2 className="text-2xl font-bold">Investments</h2>

					<ElemTable
						className="mt-3 w-full"
						columns={[
							{ label: "Company" },
							{ label: "Round" },
							{ label: "Money Raised" },
							{ label: "Date" },
						]}
					>
						{sortedInvestmentRounds.map((theRound, index: number) => {
							if (!theRound) {
								return;
							}

							return (
								<tr
									key={index}
									className={`${
										index % 2 === 0 ? "" : ""
									} flex flex-col flex-no wrap overflow-hidden md:table-row`}
								>
									<ElemTableCell header="Company">
										{theRound.company ? (
											<Link
												href={`/companies/${theRound.company.slug}`}
												key={theRound.company.id}
											>
												<a className="investor inline-flex items-center hover:opacity-70">
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
								</tr>
							);
						})}
					</ElemTable>
				</div>
			)}
		</div>
	);
};

export async function getStaticPaths() {
	const { data: vcFirms } = await runGraphQl<GetVcFirmQuery>(
		`{vc_firms(where: {slug: {_neq: ""}}) { name, slug, logo}}`
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
	const { data: vc_firms } = await runGraphQl<GetVcFirmQuery>(`
	{
		vc_firms(where: {slug: {_eq: "${context.params?.investorId}"}}) {
			id
			name
			slug
			logo
			website
			linkedin
			investments {
				investment_round {
					id
					round_date
					round
					amount
					company {
						id
						slug
						name
						logo
					}
				}
			}
		}
	}	
	`);

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
