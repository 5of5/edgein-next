import React, { FC } from "react";
import { PlaceholderCompanyCard } from "@/components/placeholders";
import { ElemCarouselWrap } from "@/components/elem-carousel-wrap";
import { ElemCarouselCard } from "@/components/elem-carousel-card";
import { ElemPhoto } from "@/components/elem-photo";
import { ElemReactions } from "@/components/elem-reactions";
import { ElemSaveToList } from "@/components/elem-save-to-list";
import { getLayerClass } from "@/utils/style";
import { useRouter } from "next/router";
import {
	Companies_Bool_Exp,
	Maybe,
	useGetCompaniesRecentQuery,
} from "@/graphql/types";
import useLibrary from "@/hooks/use-library";
import { DeepPartial } from "@/types/common";

type Props = {
	className?: string;
	heading?: string;
	currentSlug: Maybe<string>;
	tag1?: string;
	tag2?: string;
};

export const ElemCohort: FC<Props> = ({
	className = "",
	heading,
	currentSlug,
	tag1,
	tag2,
}) => {
	const { selectedLibrary } = useLibrary();

	const limit = 12;
	const offset = null;

	const router = useRouter();

	const filters: DeepPartial<Companies_Bool_Exp> = {
		_and: [
			{
				slug: { _neq: "" || currentSlug },
			},
			{ library: { _contains: selectedLibrary } },
			{ tags: { _contains: tag1 } },
			{ tags: { _contains: tag2 } },
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

	const companies = companiesData?.companies;

	const onClickType = (
		event: React.MouseEvent<HTMLDivElement>,
		type: string
	) => {
		event.stopPropagation();
		event.preventDefault();

		router.push(
			`/companies/?filters=${encodeURIComponent(
				`{"industry":{"tags":["${type}"]}}`
			)}`
		);
	};

	return (
		<section className={`bg-white rounded-lg p-5 shadow ${className}`}>
			{heading && <h2 className="text-xl font-bold">{heading}</h2>}

			{error ? (
				<h4>Error loading similar companies</h4>
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
															className="shrink-0 bg-slate-200 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full cursor-pointer hover:bg-slate-300"
															onClick={(e) => {
																if (onClickType) {
																	onClickType(e, tag);
																}
															}}
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
										<div
											className="flex items-center justify-between mt-4 gap-x-5"
											onClick={(e) => e.stopPropagation()}
										>
											<ElemReactions
												resource={company}
												resourceType={"companies"}
											/>
											<ElemSaveToList
												resourceName={company.name}
												resourceId={company.id}
												resourceType={"companies"}
												slug={company.slug!}
												buttonStyle="white"
											/>
										</div>
									</a>
								</ElemCarouselCard>
							);
						})}
					</ElemCarouselWrap>
				)
			)}
		</section>
	);
};
