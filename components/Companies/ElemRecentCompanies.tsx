import React, { FC, useEffect, useState } from "react";
import { PlaceholderRecentCompanyCard } from "@/components/Placeholders";
import { ElemCarouselWrap } from "@/components/ElemCarouselWrap";
import { ElemCarouselCard } from "@/components/ElemCarouselCard";
import { ElemPhoto } from "@/components/ElemPhoto";
import { formatDate, convertToInternationalCurrencySystem } from "@/utils";
import { getLayerClass } from "@/utils/style";
import { IconArrowUp } from "@/components/Icons";
import {
	Companies,
	Companies_Bool_Exp,
	Follows_Companies,
	Lists,
	useGetCompaniesRecentQuery,
} from "@/graphql/types";
import { ElemReactions } from "@/components/ElemReactions";
import { ElemSaveToList } from "@/components/ElemSaveToList";

import {
	getName,
	getNewFollows,
	getNewTempSentiment,
	isFollowsExists,
	reactOnSentiment,
} from "@/utils/reaction";
import { useAuth } from "@/hooks/useAuth";

import { has, remove } from "lodash";

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

type Props = {
	className?: string;
	heading?: string;
	itemsLimit?: number;
	onUpdateOfCompany: (company: Companies) => void;
};

export const ElemRecentCompanies: FC<Props> = ({
	className = "",
	heading,
	itemsLimit,
}) => {
	const { user } = useAuth();
	const limit = itemsLimit ? itemsLimit : 33;
	const offset = null;

	const filters: DeepPartial<Companies_Bool_Exp> = {
		_and: [
			{
				slug: { _neq: "" },
				date_added: { _neq: new Date(0) },
				status: { _eq: "published" },
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
		current_user: user?.id ?? 0,
	});

	const [companies, setCompanies] = useState(companiesData?.companies);

	useEffect(() => {
		setCompanies(companiesData?.companies);
	}, [companiesData?.companies]);

	const handleReactionClick =
		(company: Companies) =>
		(sentiment: string, alreadyReacted: boolean) =>
		async (
			event: React.MouseEvent<
				HTMLButtonElement | HTMLInputElement | HTMLElement
			>
		) => {
			event.stopPropagation();
			event.preventDefault();
			setTemporary(company, sentiment, alreadyReacted);
			const newSentiment = await reactOnSentiment({
				company: company.id,
				sentiment,
				pathname: `/companies/${company.slug}`,
			});

			setCompanies((prev) => {
				return [...(prev || ([] as Companies[]))].map((item) => {
					if (item.id === company.id) {
						const newFollows = getNewFollows(sentiment) as Follows_Companies;

						if (
							!alreadyReacted &&
							!isFollowsExists(item.follows as Follows_Companies[], sentiment)
						)
							item.follows.push(newFollows);
						else
							remove(item.follows, (list) => {
								return getName(list.list! as Lists) === sentiment;
							});

						return { ...item, sentiment: newSentiment };
					}
					return item;
				});
			});
		};

	const setTemporary = (
		company: Companies,
		sentiment: string,
		alreadyReacted: boolean
	) => {
		setCompanies((prev) => {
			return [...(prev || ([] as Companies[]))].map((item) => {
				if (item.id === company.id) {
					const newSentiment = getNewTempSentiment(
						{ ...item.sentiment },
						sentiment,
						alreadyReacted
					);

					const newFollows = getNewFollows(sentiment) as Follows_Companies;

					if (!alreadyReacted) item.follows.push(newFollows);
					else
						remove(item.follows, (list) => {
							return getName(list.list! as Lists) === sentiment;
						});

					return { ...item, sentiment: newSentiment };
				}
				return item;
			});
		});
	};

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
								<PlaceholderRecentCompanyCard />
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
											/>

											<div className="pl-2 md:overflow-hidden">
												<h3 className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 sm:text-lg md:text-xl xl:text-2xl">
													{company.name}
												</h3>
												{fundingTotal > 0 && (
													<div className="flex items-center space-x-1">
														<div className="">Raised</div>
														<div className="flex items-center text-green-700">
															$
															{convertToInternationalCurrencySystem(
																Number(fundingTotal)
															)}
														</div>
													</div>
												)}
											</div>
										</div>

										{company.layer && (
											<div
												className={`${getLayerClass(
													company.layer
												)} self-start text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full mt-4`}
											>
												{company.layer}
											</div>
										)}
										<div className="mt-4 flex gap-6 text-xs font-bold text-slate-600">
											<span>
												Added{" "}
												{formatDate(company.date_added, {
													month: "short",
													day: "2-digit",
													year: "numeric",
												})}
											</span>
											{/* <span>
												{fundingTotal > 0 && (
													<div className="flex items-center space-x-1">
														<div className="">Raised</div>
														<div className="flex items-center text-green-700">
															${convertToInternationalCurrencySystem(fundingTotal)}
														</div>
													</div>
												)}
											</span> */}
										</div>
										<div className="mt-4 text-gray-400 grow line-clamp-3">
											{company.overview}
										</div>

										<div className="flex items-center justify-between mt-4">
											<ElemReactions
												data={company}
												handleReactionClick={handleReactionClick(company)}
											/>
											<ElemSaveToList
												follows={company?.follows}
												onCreateNew={handleReactionClick(company)}
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
