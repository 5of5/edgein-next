import React, { FC } from "react";
import { ElemCarouselWrap } from "@/components/ElemCarouselWrap";
import { ElemCarouselCard } from "@/components/ElemCarouselCard";
import { ElemPhoto } from "@/components/ElemPhoto";
import { formatDate } from "@/utils";
import {
	Companies_Bool_Exp,
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
};

export const ElemCohort: FC<Props> = ({ className = "", heading }) => {
	const limit = 9;
	const offset = null;

	const filters: DeepPartial<Companies_Bool_Exp> = {
		_and: [{ slug: { _neq: "" }, date_added: { _neq: new Date(0) } }],
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
		<section className={`${className}`}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}
			{/* {companies && ( */}
			<ElemCarouselWrap className="bg-white rounded-lg mt-2">
				{companies?.map((company: any, index: number) => {
					return (
						<ElemCarouselCard
							key={index}
							className={`p-3 basis-full sm:basis-1/2 lg:basis-1/5 rounded-lg transition-all hover:bg-gray-50`}
						>
							<a
								href={`/companies/${company.slug}`}
								className="block h-full w-full z-0 group"
							>
								<ElemPhoto
									photo={company.logo}
									wrapClass="flex items-center justify-center aspect-square shrink-0 p-2 bg-white rounded-lg border border-dark-500/10"
									imgClass="object-contain w-full h-full"
									imgAlt={company.name}
								/>
								<div className="mt-3 text-gray-400">
									<h3 className="text-lg align-middle line-clamp-2 font-bold min-w-0 break-words text-dark-500 group-hover:opacity-60">
										{company.name}
									</h3>
									<div className="text-sm line-clamp-3 text-gray-400">
										{company.overview}
									</div>
								</div>
							</a>
						</ElemCarouselCard>
					);
				})}
			</ElemCarouselWrap>
			{/* )} */}
		</section>
	);
};
