import React from "react";
import { ElemTable } from "../ElemTable";
import { ElemTableCell } from "../ElemTableCell";
import { ElemPhoto } from "../ElemPhoto";
import Link from "next/link";
import { convertToInternationalCurrencySystem, formatDate } from "../../utils";
import { Investment_Rounds } from "../../graphql/types";

type Props = {
	className?: string;
	heading?: string;
	investments: Investment_Rounds[];
};

export const ElemInvestments: React.FC<Props> = ({
	className,
	heading,
	investments,
}) => {
	return (
		<section className={className}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}

			<ElemTable
				className="mt-3 w-full"
				columns={[
					{ label: "Round" },
					{ label: "Money Raised" },
					{ label: "Date" },
					{ label: "Investors" },
				]}
			>
				{investments?.map((item, index: number) => {
					const vcsWithPartner = item.investments.filter(
						(investment) =>
							investment.person && investment.vc_firm
					);
					const vcs = item.investments.filter(
						(investment) =>
							!investment.person && investment.vc_firm
					);
					const angels = item.investments.filter(
						(investment) =>
							investment.person && !investment.vc_firm
					);
					return (
						<tr
							key={item.id}
							className={`${
								index % 2 === 0 ? "" : ""
							} flex flex-col flex-nowrap overflow-hidden md:table-row`}
						>
							<ElemTableCell header="Round">
								{item.round ? <>{item.round}</> : <>&mdash;</>}
							</ElemTableCell>

							<ElemTableCell header="Money Raised">
								{item.amount ? (
									<>
										<span>$</span>
										{convertAmountRaised(item.amount)}
									</>
								) : (
									<>&mdash;</>
								)}
							</ElemTableCell>

							<ElemTableCell header="Date">
								{item.round_date ? (
									formatDate(item.round_date, {
										month: "short",
										day: "2-digit",
										year: "numeric",
									})
								) : (
									<>&mdash;</>
								)}
							</ElemTableCell>

							<ElemTableCell
								className="grid grid-cols-2 lg:grid-cols-3 gap-5 !whitespace-normal"
								header="Investors"
							>
								{vcsWithPartner.map((investment) => {
									return (
										<div
											key={investment.id}
											className="h-fit border border-dark-100 space-y-4 rounded-lg p-4"
										>
											{investment.vc_firm &&
														<Link
															href={`/investors/${investment.vc_firm.slug}`}
															key={investment.vc_firm.id}
														>
															<a className="vcfirm flex items-center hover:opacity-70">
																<ElemPhoto
																	photo={investment.vc_firm.logo}
																	wrapClass="flex items-center shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-2 shadow-md"
																	imgClass="object-fit max-w-full max-h-full"
																	imgAlt={investment.vc_firm.name}
																/>
																<span className="line-clamp-2">
																	{investment.vc_firm.name}
																</span>
															</a>
														</Link>
												}

											{investment.person &&
														<Link
															href={`/people/${investment.person.slug}`}
															key={investment.person.id}
														>
															<a className="investor flex items-center hover:opacity-70">
																<ElemPhoto
																	photo={investment.person.picture}
																	wrapClass="flex items-center shrink-0 w-12 h-12 rounded-full overflow-hidden mr-2 shadow-md"
																	imgClass="object-cover w-12 h-12"
																	imgAlt={investment.person.name}
																/>
																<span className="line-clamp-2">
																	{investment.person.name}
																</span>
															</a>
														</Link>
												}
										</div>
									);
								})}
								{vcs.map((investment) => {
									return (
										<div
											key={investment.id}
											className="h-fit border border-dark-100 space-y-4 rounded-lg p-4"
										>
											{investment.vc_firm &&
														<Link
															href={`/investors/${investment.vc_firm.slug}`}
															key={investment.vc_firm.id}
														>
															<a className="vcfirm flex items-center hover:opacity-70">
																<ElemPhoto
																	photo={investment.vc_firm.logo}
																	wrapClass="flex items-center shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-2 shadow-md"
																	imgClass="object-fit max-w-full max-h-full"
																	imgAlt={investment.vc_firm.name}
																/>
																<span className="line-clamp-2">
																	{investment.vc_firm.name}
																</span>
															</a>
														</Link>
												}
										</div>
									);
								})}

								{angels.map((investment) => {
									return (
										<div
											key={investment.id}
											className="h-fit border border-dark-100 space-y-4 rounded-lg p-4"
										>
											{investment.person &&
														<Link
															href={`/people/${investment.person.slug}`}
															key={investment.person.id}
														>
															<a className="investor flex items-center hover:opacity-70">
																<ElemPhoto
																	photo={investment.person.picture}
																	wrapClass="flex items-center shrink-0 w-12 h-12 rounded-full overflow-hidden mr-2 shadow-md"
																	imgClass="object-cover w-12 h-12"
																	imgAlt={investment.person.name}
																/>
																<span className="line-clamp-2">
																	{investment.person.name}
																</span>
															</a>
														</Link>
												}
										</div>
									);
								})}
							</ElemTableCell>
						</tr>
					);
				})}
			</ElemTable>
		</section>
	);
};
const convertAmountRaised = (theAmount: number) => {
	return convertToInternationalCurrencySystem(theAmount);
};
