import React, { FC, useEffect, useState } from "react";
import { PlaceholderCompanyCard } from "@/components/Placeholders";
import { ElemCarouselWrap } from "@/components/ElemCarouselWrap";
import { ElemCarouselCard } from "@/components/ElemCarouselCard";
import { ElemPhoto } from "@/components/ElemPhoto";
import { formatDate, convertToInternationalCurrencySystem } from "@/utils";
import { getLayerClass } from "@/utils/style";
import {
	Companies_Bool_Exp,
	useGetCompaniesRecentQuery,
} from "@/graphql/types";
import { ElemReactions } from "@/components/ElemReactions";
import { ElemSaveToList } from "@/components/ElemSaveToList";

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

type Props = {
	className?: string;
	heading?: string;
	itemsLimit?: number;
};

export const ElemRecentCompanies: FC<Props> = ({
	className = "",
	heading,
	itemsLimit,
}) => {
	const limit = itemsLimit ? itemsLimit : 33;
	const offset = null;

	const filters: DeepPartial<Companies_Bool_Exp> = {
		_and: [
			{
				slug: { _neq: "" },
				date_added: { _neq: new Date(0) },
				library: { _contains: "Web3" },
			},
		],
	};

	const {
		data: companiesData,
		error,
		isLoading,
	} = useGetCompaniesRecentQuery({
		offset,
		limit,
		where: filters as Companies_Bool_Exp,
	});

	const companies = companiesData?.companies || [];

	return (
		<div className={`bg-white rounded-lg p-5 ${className}`}>
			{heading && <h2 className="text-xl font-bold">{heading}</h2>}
			{error ? (
				<h4>Error loading companies</h4>
			) : isLoading ? (
				<>
					<div className="flex overflow-hidden -mx-3">
						{Array.from({ length: 3 }, (_, i) => (
							<div
								key={i}
								className="p-3 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
							>
								<PlaceholderCompanyCard />
							</div>
						))}
					</div>
				</>
			) : (
				companies && (
					<ElemCarouselWrap>
						{companies.map((company: any, index: number) => {
							// Add 'amount' from investment_rounds array
							const fundingTotal = company.investment_rounds?.reduce(
								(total: number, currentValue: any) =>
									(total = total + currentValue.amount),
								0
							);

							return (
								<ElemCarouselCard
									key={index}
									className={`p-3 basis-full sm:basis-1/2 lg:basis-1/3`}
								>
									<a
										href={`/companies/${company.slug}`}
										className="z-0 flex flex-col box-border w-full h-full p-5 transition-all bg-white border border-black/10 rounded-lg  hover:scale-102 hover:shadow"
									>
										<div className="flex items-center">
											<ElemPhoto
												photo={company.logo}
												wrapClass="flex items-center justify-center aspect-square w-16 h-16 p-2 bg-white rounded-lg shadow"
												imgClass="object-contain w-full h-full"
												imgAlt={company.name}
												placeholderClass="text-slate-300"
											/>

											<div className="pl-2 md:overflow-hidden">
												<h3 className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 sm:text-lg md:text-xl xl:text-2xl">
													{company.name}
												</h3>
											</div>
										</div>

										<div className="mt-4 flex gap-6 text-xs font-bold text-slate-600">
											<span>
												Added{" "}
												{formatDate(company.date_added, {
													month: "short",
													day: "2-digit",
													year: "numeric",
												})}
											</span>
											<span>
												{fundingTotal > 0 && (
													<div className="flex items-center space-x-1">
														<div className="">Raised</div>
														<div className="flex items-center text-green-600">
															$
															{convertToInternationalCurrencySystem(
																fundingTotal
															)}
														</div>
													</div>
												)}
											</span>
										</div>

										{(company.layer || company.tags) && (
											<div className="mt-4 flex flex-wrap gap-2">
												{company.layer && (
													<div
														className={`${getLayerClass(
															company.layer
														)} shrink-0 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full`}
													>
														{company.layer}
													</div>
												)}

												{company.tags?.map((tag: string, index: number) => {
													return (
														<div
															key={index}
															className={`shrink-0 bg-slate-200 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full`}
														>
															{tag}
														</div>
													);
												})}
											</div>
										)}
										<div className="mt-4 grow">
											<div className="text-gray-400 line-clamp-3">
												{company.overview}
											</div>
										</div>

										<div className="flex items-center justify-between mt-4">
											<ElemReactions
												resource={company}
												resourceType={"companies"}
											/>
											<ElemSaveToList
												resourceName={company.name}
												resourceId={company.id}
												resourceType={"companies"}
												slug={company.slug}
											/>
										</div>
									</a>
								</ElemCarouselCard>
							);
						})}
					</ElemCarouselWrap>
				)
			)}
		</div>
	);
};
