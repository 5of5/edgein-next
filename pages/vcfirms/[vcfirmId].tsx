import React from "react";
import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ElemButton } from "../../components/ElemButton";
import { ElemPhoto } from "../../components/ElemPhoto";
import { ElemTable } from "../../components/ElemTable";
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
	const { vcfirmId } = router.query;

	const goBack = () => router.back();

	const vcfirm = props.vcfirm;

	if (!vcfirm) {
		return <h1>Not Found</h1>;
	}

	const sortedInvestmentRounds = props.sortByDateAscInvestments;

	//console.log(props.sortByDateAscInvestments);

	return (
		<div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
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

					<div className="inline-flex flex-wrap items-center gap-x-6">
						{vcfirm.investments.length > 0 && (
							<a
								href="#investmentRounds"
								className="inline-flex py-3 hover:opacity-70"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 mr-1 text-primary-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
								<span className="font-bold mr-1">
									{vcfirm.investments.length}
								</span>
								Investment{vcfirm.investments.length > 1 && "s"}
							</a>
						)}
					</div>

					<div className="my-5 flex flex-row items-center">
						{vcfirm.website && (
							<a
								href={vcfirm.website}
								target="_blank"
								className="mr-4"
								rel="noreferrer"
							>
								<ElemButton btn="primary" arrow>
									Visit website
								</ElemButton>
							</a>
						)}

						{vcfirm.linkedIn && (
							<a
								href={vcfirm.linkedIn}
								target="_blank"
								className="flex items-center justify-center w-9 h-9 mr-4 rounded-full text-primary-500 hover:text-white hover:bg-primary-500 border border-primary-500 "
								rel="noreferrer"
							>
								<svg
									className="h-6 w-6"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>{vcfirm.vcFirm} LinkedIn</title>
									<path
										d="M4.20805 9.10047H7.7241V19.6814H4.20805V9.10047ZM5.98961 4C4.78621 4 4 4.79004 4 5.82699C4 6.84262 4.7632 7.65562 5.94359 7.65562H5.96602C7.19242 7.65562 7.95617 6.84258 7.95617 5.82699C7.93316 4.79004 7.19246 4 5.98961 4V4ZM16.357 8.85191C14.4906 8.85191 13.6545 9.87848 13.188 10.5984V9.10047H9.67094C9.7175 10.0931 9.67094 19.6814 9.67094 19.6814H13.188V13.7723C13.188 13.4558 13.2111 13.1405 13.3036 12.9137C13.5582 12.282 14.1369 11.6277 15.1076 11.6277C16.3811 11.6277 16.8897 12.5984 16.8897 14.0202V19.6814H20.4062V13.6141C20.4062 10.3641 18.6718 8.85191 16.357 8.85191V8.85191Z"
										fill="currentColor"
									></path>
								</svg>
							</a>
						)}
					</div>
				</div>
			</div>

			{Object.keys(vcfirm.investments).length > 0 && (
				<div className="mt-16" id="investmentRounds">
					<h2 className="text-3xl font-bold">Investments</h2>

					<ElemTable
						className="mt-3 w-full flex flex-row flex-no-wrap sm:table sm:table-auto"
						columns={[
							{ label: "Company" },
							{ label: "Round" },
							{ label: "Money Raised" },
							{ label: "Date" },
						]}
					>
						{/* vcfirm.investments */}
						{sortedInvestmentRounds.map((theRound: any, index: number) => {
							// const theRound = round.investmentRound[0];

							// if (!theRound) {
							// 	return;
							// }

							return (
								<tr
									key={index}
									className={`${
										index % 2 === 0 ? "" : ""
									} flex flex-col flex-no wrap overflow-hidden sm:table-row`}
								>
									<th className="text-left px-4 pt-4 sm:hidden">Company</th>
									<td className="px-4 pb-4 whitespace-nowrap sm:p-4">
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
									</td>
									<th className="text-left px-4 pt-4 sm:hidden">Round</th>
									<td className="px-4 pb-4 whitespace-nowrap sm:p-4">
										{theRound.round ? <>{theRound.round}</> : <>&mdash;</>}
									</td>
									<th className="text-left px-4 pt-4 sm:hidden">
										Money Raised
									</th>
									<td className="px-4 pb-4 whitespace-nowrap sm:p-4">
										{theRound.amount ? (
											<>
												<span>$</span>
												{convertAmountRaised(theRound.amount)}
											</>
										) : (
											<>&mdash;</>
										)}
									</td>
									<th className="text-left px-4 pt-4 sm:hidden">Date</th>
									<td
										className="px-4 pb-4 whitespace-nowrap sm:p-4"
										// colSpan={4}
									>
										{theRound.date ? (
											formatDate(theRound.date, {
												month: "short",
												day: "2-digit",
												year: "numeric",
											})
										) : (
											<>&mdash;</>
										)}
									</td>
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
				params: { vcfirmId: vcfirm.slug },
			})),
		fallback: true, // false or 'blocking'
	};
}

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: vcFirms } = await runGraphQl(`
  {
      vcFirms(slug: "${context.params?.vcfirmId}") {
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
		const theRound = round.investmentRound[0];
		return theRound;
	});

	const sortByDateAscInvestments = getInvestments
		.slice()
		.sort(
			(
				a: { date: string | number | Date },
				b: { date: string | number | Date }
			) => {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
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
