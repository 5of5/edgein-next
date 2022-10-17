import React, { FC } from "react";
import { PlaceholderCompanyCard } from "@/components/Placeholders";
import { ElemCarouselWrap } from "@/components/ElemCarouselWrap";
import { ElemCarouselCard } from "@/components/ElemCarouselCard";
import { ElemPhoto } from "@/components/ElemPhoto";
import { getLayerClass } from "@/utils/style";
import {
	Companies_Bool_Exp,
	Maybe,
	useGetCompaniesRecentQuery,
} from "@/graphql/types";

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

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
	const limit = 12;
	const offset = null;

	const filters: DeepPartial<Companies_Bool_Exp> = {
		_and: [
			{
				slug: { _neq: "" || currentSlug },
				status: { _eq: "published" },
			},
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
