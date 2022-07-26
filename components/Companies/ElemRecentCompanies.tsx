import React, { FC } from "react";
import { ElemCarouselWrap } from "@/components/ElemCarouselWrap";
import { ElemCarouselCard } from "@/components/ElemCarouselCard";
import { ElemPhoto } from "@/components/ElemPhoto";
import { formatDate } from "@/utils";
import {
	Companies_Bool_Exp,
	useGetCompaniesRecentQuery,
} from "@/graphql/types";

const FakeElemRecentCompany: FC = () => {
	return (
		<div className="flex flex-col animate-pulse-fast p-5 bg-white border border-dark-500/10 rounded-lg md:h-full">
			<div className="flex items-center shrink-0 mb-4 w-full">
				<div className="aspect-square rounded-lg bg-slate-200 w-16 h-16"></div>
				<div className="flex-1 ml-2 h-6 max-w-full bg-slate-200 rounded"></div>
			</div>
			<div className="flex-1 space-y-4 py-1">
				<div className="h-2 bg-slate-200 rounded"></div>
				<div className="h-2 bg-slate-200 rounded"></div>
				<div className="h-2 bg-slate-200 rounded w-2/3"></div>
			</div>
			<div className="mt-8 grid grid-cols-2 gap-4">
				<div className="flex items-center space-x-2">
					<div className="aspect-square rounded-lg h-2 w-2/3 bg-slate-200"></div>
				</div>
			</div>
		</div>
	);
};

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
	const limit = itemsLimit ? itemsLimit : 21;
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
		<div className={`${className}`}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}
			{error ? (
				<h4>Error loading companies</h4>
			) : isLoading ? (
				<>
					<div className="mt-2 p-3 flex overflow-hidden bg-white rounded-lg">
						{Array.from({ length: 3 }, (_, i) => (
							<div
								key={i}
								className="shrink-0 p-3 basis-full sm:basis-1/2 lg:basis-1/3"
							>
								<FakeElemRecentCompany />
							</div>
						))}
					</div>
				</>
			) : (
				companies && (
					<ElemCarouselWrap className="mt-2 bg-white rounded-lg">
						{companies.map((company: any, index: number) => {
							return (
								<ElemCarouselCard
									key={index}
									className={`p-3 basis-full sm:basis-1/2 lg:basis-1/3`}
								>
									<a
										href={`/companies/${company.slug}`}
										className="flex flex-col h-full w-full z-0 group border border-dark-500/10 bg-white rounded-lg p-5 transition-all hover:scale-102 hover:shadow-lg"
									>
										<div className="flex">
											<ElemPhoto
												photo={company.logo}
												wrapClass="flex items-center justify-center aspect-square w-16 h-16 p-2 bg-white rounded-lg shadow-md"
												imgClass="object-contain w-full h-full"
												imgAlt={company.name}
											/>

											<div className="flex items-center justify-center pl-2 md:overflow-hidden">
												<h3 className="inline text-2xl align-middle line-clamp-2 font-bold min-w-0 break-words text-dark-500 sm:text-lg md:text-xl xl:text-2xl group-hover:opacity-60">
													{company.name}
												</h3>
											</div>
										</div>
										<div className="mt-4 grow line-clamp-3 text-gray-400">
											{company.overview}
										</div>
										<div className="mt-3 text-xs font-bold text-gray-400">
											Added{" "}
											{formatDate(company.date_added, {
												month: "short",
												day: "2-digit",
												year: "numeric",
											})}
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
