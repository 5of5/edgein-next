import React from "react";
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

type Props = {
	vcfirm: Record<string, any>;
	sortByDateAscInvestments: Record<string, any>;
};

const VCFirm: NextPage<Props> = (props) => {
	const router = useRouter();
	const { investorId } = router.query;

	const goBack = () => router.back();

	const vcfirm = props.vcfirm;

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
						photos={vcfirm.logo}
						wrapClass="flex items-center justify-center shrink-0 p-6 h-72 lg:h-88 bg-white rounded-lg shadow-md"
						imgClass="object-contain w-full h-full rounded-md"
						imgAlt={vcfirm.vcFirm}
					/>
				</div>
				<div className="w-full col-span-2 p-2">
					<h1 className="text-4xl md:text-6xl font-bold my-5">
						{vcfirm.vcFirm}
					</h1>

					<ElemKeyInfo
						heading=""
						website={vcfirm.website}
						linkedIn={vcfirm.linkedIn}
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
						{sortedInvestmentRounds.map((theRound: any, index: number) => {
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
										{Object.keys(theRound.company).length > 0 ? (
											theRound.company.map((company: any) => {
												return (
													<Link
														href={`/companies/${company.slug}`}
														key={company.id}
													>
														<a className="investor inline-flex items-center hover:opacity-70">
															<ElemPhoto
																photos={company.logo}
																wrapClass="flex items-center shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-2 bg-white shadow-md"
																imgClass="object-fit max-w-full max-h-full"
																imgAlt={company.title}
															/>
															{company.title}
														</a>
													</Link>
												);
											})
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
										{theRound.date ? (
											formatDate(theRound.date, {
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
	const {
		data: { vcFirms },
	} = await runGraphQl("{ vcFirms { vcFirm, slug, logo}}");

	return {
		paths: vcFirms
			.filter((vcfirm: { slug: string }) => vcfirm.slug)
			.map((vcfirm: { slug: string }) => ({
				params: { investorId: vcfirm.slug },
			})),
		fallback: true, // false or 'blocking'
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: vcFirms } = await runGraphQl(`
  {
      vcFirms(slug: "${context.params?.investorId}") {
          id
          vcFirm
          slug
          logo
          website
          linkedIn
          investments {
              name
              investmentRound {
                  id
                  date
                  round
                  amount
                  company {
                      id
                      slug
                      title
                      logo
                  }
              }
          }
      }
  }
  `);

	if (!vcFirms.vcFirms[0]) {
		return {
			notFound: true,
		};
	}

	const getInvestments = vcFirms.vcFirms[0].investments.map((round: any) => {
		if (
			typeof round.investmentRound[0] === "object" &&
			round.investmentRound[0] != "undefined"
		) {
			return round.investmentRound[0];
		} else {
			return null;
		}
	});

	const sortByDateAscInvestments = getInvestments
		.slice()
		.sort(
			(
				a: { date: string | number | Date },
				b: { date: string | number | Date }
			) => {
				const distantFuture = new Date(8640000000000000);

				let dateA = a ? new Date(a.date) : distantFuture;
				let dateB = b ? new Date(b.date) : distantFuture;
				return dateA.getTime() - dateB.getTime();
			}
		)
		.reverse();

	return {
		props: {
			vcfirm: vcFirms.vcFirms[0],
			sortByDateAscInvestments,
		},
	};
};

export default VCFirm;
function convertAmountRaised(theAmount: any) {
	return convertToInternationalCurrencySystem(theAmount);
}
