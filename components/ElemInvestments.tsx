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
				className="table-auto w-full  py-1 my-1"
				columns={[
					{ label: "Funding Type" },
					{ label: "Money Raised" },
					{ label: "Date" },
					{ label: "Investors" },
				]}
			>
				{investments.map((round: any, index: number) => (
					<tr
						key={round.id}
						className={index % 2 === 0 ? "bg-white" : "TableRow bg-white"}
					>
						<td className="px-2 py-4 whitespace-nowrap text-center">
							{round.round}
						</td>
						<td className="px-2 py-4 whitespace-nowrap text-center">
							<span>$</span>
							{convertAmountRaised(round.amount)}
						</td>
						<td className="px-2 py-4 whitespace-nowrap text-center">
							{formatDate(round.date, {
								month: "short",
								day: "2-digit",
								year: "numeric",
							})}
						</td>
						<td className="md:grid sm:grid-cols-2 gap-5 px-2 py-4">
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
																wrapClass="flex items-center shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-2 bg-white shadow-md"
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
