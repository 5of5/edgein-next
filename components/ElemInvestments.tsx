import React from "react";
import { ElemTable } from "./ElemTable";
import { ElemPhoto } from "./ElemPhoto";
import Link from "next/link";
import {
	convertToInternationalCurrencySystem,
	formatDate,
	slugify,
	kebabCase,
} from "../utils";

type Props = {
	heading: string;
	investments: Record<string, any>[];
};

export const ElemInvestments: React.FC<Props> = ({ heading, investments }) => {
	return (
		<div className="mt-20">
			{heading && <h2 className="text-4xl font-bold">{heading}</h2>}

			<ElemTable
				className="w-full flex flex-row flex-no-wrap py-1 my-1 sm:table sm:table-auto"
				columns={[
					{ label: "Round" },
					{ label: "Money Raised" },
					{ label: "Date" },
					{ label: "Investors" },
				]}
			>
				{investments.map((round: any, index: number) => (
					<tr
						key={round.id}
						className={`${
							index % 2 === 0 ? "" : ""
						} flex flex-col flex-no wrap overflow-hidden sm:table-row`}
					>
						<th className="text-left px-4 pt-4 sm:hidden">Round</th>
						<td className="align-top px-4 pb-4 whitespace-nowrap sm:p-4">
							{round.round}
						</td>
						<th className="text-left px-4 pt-4 sm:hidden">Money Raised</th>
						<td className="align-top px-4 pb-4 whitespace-nowrap sm:p-4">
							<span>$</span>
							{convertAmountRaised(round.amount)}
						</td>
						<th className="text-left px-4 pt-4 sm:hidden">Date</th>
						<td className="align-top px-4 pb-4 whitespace-nowrap sm:p-4">
							{formatDate(round.date, {
								month: "short",
								day: "2-digit",
								year: "numeric",
							})}
						</td>
						<th className="text-left px-4 pt-4 sm:hidden">Investors</th>
						<td className="align-top px-4 pb-4 grid grid-cols-2 lg:grid-cols-3 gap-5 sm:p-4">
							{round.investments.map((investment: any) => {
								const theInvestors = investment.people;
								const theVCFirms = investment.vcFirms;

								// const investorsAndFirms = { ...theInvestors, ...theVCFirms };
								// console.log(investorsAndFirms);

								return (
									// Note: Need to use full Fragment syntax to add a key to a fragment
									<React.Fragment key={investment.id}>
										{theInvestors.length > 0 &&
											theInvestors.map((investor: any) => {
												return (
													<Link
														href={`/people/${investor.slug}`}
														key={investor.id}
													>
														<a className="investor flex items-center hover:opacity-70">
															<ElemPhoto
																photos={investor.picture}
																wrapClass="flex items-center w-12 h-12 rounded-full overflow-hidden mr-2 shadow-md"
																imgClass="object-fit h-full w-full"
																imgAlt={investor.name}
															/>
															{investor.name}
														</a>
													</Link>
												);
											})}

										{theVCFirms.length > 0 &&
											theVCFirms.map((firm: any) => {
												return (
													<Link href={`/vcfirms/${firm.slug}`} key={firm.id}>
														<a className="vcfirm flex items-center hover:opacity-70">
															<ElemPhoto
																photos={firm.logo}
																wrapClass="flex items-center shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-2 shadow-md"
																imgClass="object-fit max-w-full max-h-full"
																imgAlt={firm.vcFirm}
															/>
															{firm.vcFirm}
														</a>
													</Link>
												);
											})}
									</React.Fragment>
								);
							})}
						</td>
					</tr>
				))}
			</ElemTable>
		</div>
	);
};
const convertAmountRaised = (theAmount: number) => {
	return convertToInternationalCurrencySystem(theAmount);
};
