import React from "react";
import { ElemTable } from "../ElemTable";
import { ElemTableCell } from "../ElemTableCell";
import { ElemPhoto } from "../ElemPhoto";
import { IconEditPencil } from "@/components/Icons";
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
			{heading && (
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-bold">{heading}</h2>

					<button className="border border-black/10 h-8 w-8 p-1.5 rounded-full transition-all hover:bg-slate-200">
						<IconEditPencil title="Edit" />
					</button>
				</div>
			)}

			<ElemTable
				className="mt-2 w-full border border-black/10 rounded-lg"
				columns={[
					{ label: "Round" },
					{ label: "Money Raised" },
					{ label: "Date" },
					{ label: "Investors" },
				]}
			>
				{investments?.map((item, index: number) => {
					const vcsWithPartner = item.investments.filter(
						(investment) => investment.person && investment.vc_firm
					);
					const vcs = item.investments.filter(
						(investment) => !investment.person && investment.vc_firm
					);
					const angels = item.investments.filter(
						(investment) => investment.person && !investment.vc_firm
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
											className="h-fit bg-white border border-black/10 space-y-2 rounded-lg p-2 transition-all hover:shadow hover:-translate-y-0.5"
										>
											{investment.vc_firm && (
												<Link
													href={`/investors/${investment.vc_firm.slug}`}
													key={investment.vc_firm.id}
												>
													<a className="vcfirm flex items-center space-x-3 hover:opacity-70">
														<ElemPhoto
															photo={investment.vc_firm.logo}
															wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 rounded-lg overflow-hidden border border-slate-200"
															imgClass="object-fit max-w-full max-h-full"
															imgAlt={investment.vc_firm.name}
														/>
														<span className="line-clamp-2 font-bold">
															{investment.vc_firm.name}
														</span>
													</a>
												</Link>
											)}

											{investment.person && (
												<Link
													href={`/people/${investment.person.slug}`}
													key={investment.person.id}
												>
													<a className="investor flex items-center space-x-3 hover:opacity-70">
														<ElemPhoto
															photo={investment.person.picture}
															wrapClass="flex items-center justify-center shrink-0 w-12 h-12 rounded-full overflow-hidden"
															imgClass="object-cover w-12 h-12"
															imgAlt={investment.person.name}
														/>
														<span className="line-clamp-2 font-bold">
															{investment.person.name}
														</span>
													</a>
												</Link>
											)}
										</div>
									);
								})}
								{vcs.map((investment) => {
									return (
										<div
											key={investment.id}
											className="h-fit bg-white border border-black/10 space-y-2 rounded-lg p-2 transition-all hover:shadow hover:-translate-y-0.5"
										>
											{investment.vc_firm && (
												<Link
													href={`/investors/${investment.vc_firm.slug}`}
													key={investment.vc_firm.id}
												>
													<a className="vcfirm flex items-center space-x-3 hover:opacity-70">
														<ElemPhoto
															photo={investment.vc_firm.logo}
															wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 border border-black/10 rounded-lg overflow-hidden"
															imgClass="object-fit max-w-full max-h-full"
															imgAlt={investment.vc_firm.name}
															placeholder="company"
														/>
														<span className="line-clamp-2 font-bold">
															{investment.vc_firm.name}
														</span>
													</a>
												</Link>
											)}
										</div>
									);
								})}

								{angels.map((investment) => {
									return (
										<div
											key={investment.id}
											className="h-fit bg-white border border-black/10 space-y-2 rounded-lg p-2 transition-all hover:shadow hover:-translate-y-0.5"
										>
											{investment.person && (
												<Link
													href={`/people/${investment.person.slug}`}
													key={investment.person.id}
												>
													<a className="investor flex items-center space-x-3 hover:opacity-70">
														<ElemPhoto
															photo={investment.person.picture}
															wrapClass="flex items-center justify-center shrink-0 w-12 h-12 rounded-full overflow-hidden"
															imgClass="object-cover w-12 h-12"
															imgAlt={investment.person.name}
															placeholder="person"
														/>
														<span className="line-clamp-2 font-bold">
															{investment.person.name}
														</span>
													</a>
												</Link>
											)}
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
