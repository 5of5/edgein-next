import React, { FC, useEffect, useState } from "react";
import { PlaceholderInvestorCard } from "@/components/Placeholders";
import { ElemCarouselWrap } from "@/components/ElemCarouselWrap";
import { ElemCarouselCard } from "@/components/ElemCarouselCard";
import { ElemPhoto } from "@/components/ElemPhoto";
import { formatDate } from "@/utils";
import {
	Vc_Firms_Bool_Exp,
	useGetVcFirmsRecentInvestmentsQuery,
	Vc_Firms,
	Lists,
	Follows_Vc_Firms,
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
};

export const ElemRecentInvestments: FC<Props> = ({
	className = "",
	heading,
	itemsLimit,
}) => {
	const { user } = useAuth();
	const limit = itemsLimit ? itemsLimit : 33;
	const offset = null;

	const filters: DeepPartial<Vc_Firms_Bool_Exp> = {
		_and: [{ slug: { _neq: "" }, status: { _eq: "published" } }],
	};

	const {
		data: vcFirmsData,
		error,
		isLoading,
	} = useGetVcFirmsRecentInvestmentsQuery({
		offset,
		limit,
		where: filters as Vc_Firms_Bool_Exp,
		current_user: user?.id ?? 0,
	});

	const [vcFirms, setVcFirms] = useState(vcFirmsData?.vc_firms);

	useEffect(() => {
		setVcFirms(vcFirmsData?.vc_firms);
	}, [vcFirmsData?.vc_firms]);

	const handleReactionClick =
		(vcFirm: Vc_Firms) =>
		(sentiment: string, alreadyReacted: boolean) =>
		async (
			event: React.MouseEvent<
				HTMLButtonElement | HTMLInputElement | HTMLElement
			>
		) => {
			event.stopPropagation();
			event.preventDefault();

			setTemporary(vcFirm, sentiment, alreadyReacted);

			const newSentiment = await reactOnSentiment({
				vcfirm: vcFirm.id,
				sentiment,
				pathname: `/investors/${vcFirm.slug}`,
			});

			setVcFirms((prev) => {
				return [...(prev || ([] as Vc_Firms[]))].map((item) => {
					if (item.id === vcFirm.id) {
						const newFollows = getNewFollows(
							sentiment,
							"vcfirm"
						) as Follows_Vc_Firms;

						if (
							!alreadyReacted &&
							!isFollowsExists(item.follows as Follows_Vc_Firms[], sentiment)
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
		vcFirm: Vc_Firms,
		sentiment: string,
		alreadyReacted: boolean
	) => {
		setVcFirms((prev) => {
			return [...(prev || ([] as Vc_Firms[]))].map((item) => {
				if (item.id === vcFirm.id) {
					const newSentiment = getNewTempSentiment(
						{ ...item.sentiment },
						sentiment,
						alreadyReacted
					);

					const newFollows = getNewFollows(
						sentiment,
						"vcfirm"
					) as Follows_Vc_Firms;

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
				<h4>Error loading investors</h4>
			) : isLoading ? (
				<>
					<div className="flex -mx-3  overflow-hidden">
						{Array.from({ length: 3 }, (_, i) => (
							<div
								key={i}
								className="p-3 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
							>
								<PlaceholderInvestorCard />
							</div>
						))}
					</div>
				</>
			) : (
				vcFirms && (
					<ElemCarouselWrap>
						{vcFirms.map((investor: any, index: number) => {
							return (
								<ElemCarouselCard
									key={index}
									className={`p-3 basis-full sm:basis-1/2 lg:basis-1/3`}
								>
									<a
										href={`/investors/${investor.slug}`}
										className="z-0 flex flex-col w-full h-full p-5 transition-all border rounded-lg border-dark-500/10 hover:scale-102 hover:shadow"
									>
										<div className="flex">
											<ElemPhoto
												photo={investor.logo}
												wrapClass="flex items-center justify-center aspect-square w-16 h-16 p-2 bg-white rounded-lg shadow"
												imgClass="object-contain w-full h-full"
												imgAlt={investor.name}
												placeholderClass="text-slate-300"
											/>
											<div className="flex items-center justify-center pl-2 md:overflow-hidden">
												<h3 className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 sm:text-lg md:text-xl xl:text-2xl">
													{investor.name}
												</h3>
											</div>
										</div>

										{(investor.num_of_investments > 0 ||
											investor.num_of_exits > 0) && (
											<div className="flex flex-wrap space-x-6 text-slate-600 mt-4">
												{investor.num_of_investments !== null &&
													investor.num_of_investments > 0 && (
														<div>
															<span className="font-bold mr-1">
																{investor.num_of_investments}
															</span>
															Investment
															{investor.num_of_investments > 1 && "s"}
														</div>
													)}

												{/* num_of_exits field needs to be added to DB */}
												{/* {investor.num_of_exits !== null &&
												investor.num_of_exits > 0 && (
													<div>
														<span className="font-bold mr-1">
															{investor.num_of_exits}
														</span>
														Exit
														{investor.num_of_exits > 1 && "s"}
													</div>
												)} */}
											</div>
										)}

										{investor.overview && (
											<p className="mt-4 line-clamp-3 text-slate-600">
												{investor.overview}
											</p>
										)}
										{/* <div className="mt-3 text-xs font-bold text-gray-400">
										{investor. && (
											<div>
											Latest Investment
											{formatDate(investor.latest_investment, {
												month: "short",
												day: "2-digit",
												year: "numeric",
											})}
											</div>
										)}
										</div> */}
										<div className="flex items-center justify-between mt-4">
											<ElemReactions
												data={investor}
												handleReactionClick={handleReactionClick(investor)}
											/>
											<ElemSaveToList
												follows={investor?.follows}
												onCreateNew={handleReactionClick(investor)}
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
