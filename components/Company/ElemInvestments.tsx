import React from "react";
import { ElemTable } from "../ElemTable";
import { ElemTableCell } from "../ElemTableCell";
import { ElemPhoto } from "../ElemPhoto";
import Link from "next/link";
import { convertToInternationalCurrencySystem, formatDate } from "../../utils";

type Props = {
	className?: string;
	heading?: string;
	investments: Record<string, any>;
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
				{investments?.map((item: any, index: number) => {
					const vcsWithPartner = item.investments.filter(
						(investment: any) =>
							investment.people?.length && investment.vcFirms?.length
					);
					const vcs = item.investments.filter(
						(investment: any) =>
							!investment.people?.length && investment.vcFirms?.length
					);
					const angels = item.investments.filter(
						(investment: any) =>
							investment.people?.length && !investment.vcFirms?.length
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
								{item.date ? (
									formatDate(item.date, {
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
								{vcsWithPartner.map((investment: any) => {
									return (
										<div
											key={investment.id}
											className="h-fit border border-dark-100 space-y-4 rounded-lg p-4"
										>
											{Object.keys(investment.vcFirms).length > 0 &&
												investment.vcFirms.map((firm: any) => {
													return (
														<Link
															href={`/investors/${firm.slug}`}
															key={firm.id}
														>
															<a className="vcfirm flex items-center hover:opacity-70">
																<ElemPhoto
																	photos={firm.logo}
																	wrapClass="flex items-center shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-2 shadow-md"
																	imgClass="object-fit max-w-full max-h-full"
																	imgAlt={firm.vcFirm}
																/>
																<span className="line-clamp-2">
																	{firm.vcFirm}
																</span>
															</a>
														</Link>
													);
												})}

											{Object.keys(investment.people).length > 0 &&
												investment.people.map((investor: any) => {
													return (
														<Link
															href={`/people/${investor.slug}`}
															key={investor.id}
														>
															<a className="investor flex items-center hover:opacity-70">
																<ElemPhoto
																	photos={investor.picture}
																	wrapClass="flex items-center shrink-0 w-12 h-12 rounded-full overflow-hidden mr-2 shadow-md"
																	imgClass="object-cover w-12 h-12"
																	imgAlt={investor.name}
																/>
																<span className="line-clamp-2">
																	{investor.name}
																</span>
															</a>
														</Link>
													);
												})}
										</div>
									);
								})}
								{vcs.map((investment: any) => {
									return (
										<div
											key={investment.id}
											className="h-fit border border-dark-100 space-y-4 rounded-lg p-4"
										>
											{Object.keys(investment.vcFirms).length > 0 &&
												investment.vcFirms.map((firm: any) => {
													return (
														<Link
															href={`/investors/${firm.slug}`}
															key={firm.id}
														>
															<a className="vcfirm flex items-center hover:opacity-70">
																<ElemPhoto
																	photos={firm.logo}
																	wrapClass="flex items-center shrink-0 w-12 h-12 rounded-lg overflow-hidden mr-2 shadow-md"
																	imgClass="object-fit max-w-full max-h-full"
																	imgAlt={firm.vcFirm}
																/>
																<span className="line-clamp-2">
																	{firm.vcFirm}
																</span>
															</a>
														</Link>
													);
												})}
										</div>
									);
								})}

								{angels.map((investment: any) => {
									return (
										<div
											key={investment.id}
											className="h-fit border border-dark-100 space-y-4 rounded-lg p-4"
										>
											{Object.keys(investment.people).length > 0 &&
												investment.people.map((investor: any) => {
													return (
														<Link
															href={`/people/${investor.slug}`}
															key={investor.id}
														>
															<a className="investor flex items-center hover:opacity-70">
																<ElemPhoto
																	photos={investor.picture}
																	wrapClass="flex items-center shrink-0 w-12 h-12 rounded-full overflow-hidden mr-2 shadow-md"
																	imgClass="object-cover w-12 h-12"
																	imgAlt={investor.name}
																/>
																<span className="line-clamp-2">
																	{investor.name}
																</span>
															</a>
														</Link>
													);
												})}
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
