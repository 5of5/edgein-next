import React, { FC } from "react";
import { PlaceholderRecentCompanyCard } from "@/components/Placeholders";
import { ElemCarouselWrap } from "@/components/ElemCarouselWrap";
import { ElemCarouselCard } from "@/components/ElemCarouselCard";
import { ElemPhoto } from "@/components/ElemPhoto";
import { formatDate } from "@/utils";
import {
	Companies_Bool_Exp,
	useGetCompaniesRecentQuery,
} from "@/graphql/types";
import { ElemButton } from "../ElemButton";
import { IconCrap, IconHot, IconLike } from "../Icons";

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

	const handleReactionClick = (event: any, company: any, sentiment: string) => async () => {
    event.preventDefault();
    event.stopPropagation();
    const resp = await fetch("/api/reaction/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company: company.id,
        sentiment,
        pathname: location.pathname
      }),
    });
    const newSentiment = await resp.json()
  }

	return (
		<div className={`${className}`}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}
			{error ? (
				<h4>Error loading companies</h4>
			) : isLoading ? (
				<>
					<div className="flex p-3 mt-2 overflow-hidden bg-white rounded-lg">
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
					<ElemCarouselWrap className="mt-2 bg-white rounded-lg">
						{companies.map((company: any, index: number) => {
							return (
								<ElemCarouselCard
									key={index}
									className={`p-3 basis-full sm:basis-1/2 lg:basis-1/3`}
								>
									<a
										href={`/companies/${company.slug}`}
										className="z-0 flex flex-col w-full h-full p-5 transition-all bg-white border rounded-lg group border-dark-500/10 hover:scale-102 hover:shadow-lg"
									>
										<div className="flex">
											<ElemPhoto
												photo={company.logo}
												wrapClass="flex items-center justify-center aspect-square w-16 h-16 p-2 bg-white rounded-lg shadow-md"
												imgClass="object-contain w-full h-full"
												imgAlt={company.name}
											/>

											<div className="flex items-center justify-center pl-2 md:overflow-hidden">
												<h3 className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 text-dark-500 sm:text-lg md:text-xl xl:text-2xl group-hover:opacity-60">
													{company.name}
												</h3>
											</div>
										</div>
										<div className="mt-4 text-gray-400 grow line-clamp-3">
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

										<div
											className={`flex flex-row justify-end mt-4 shrink-0 lg:flex-row mt-2
												? "md:flex-col md:justify-center md:ml-auto md:flex md:items-end md:mt-2 lg:flex-row lg:items-center"
												: ""
												}`}
										>
											<ElemButton
												onClick={(event) => handleReactionClick(event, company, 'hot')}
												className="px-1 mr-2 text-black"
												roundedFull={false}
												btn="transparent"
											> <IconHot className="mr-1" /> {company.sentiment?.hot || 0}
											</ElemButton>
											<ElemButton
												onClick={(event) => handleReactionClick(event, company, 'like')}
												className="px-1 mr-2 text-black"
												roundedFull={false}
												btn="transparent"
											><IconLike className="mr-1" /> {company.sentiment?.like || 0}
											</ElemButton>
											<ElemButton
												onClick={(event) => handleReactionClick(event, company, 'crap')}
												className="px-1 text-black"
												roundedFull={false}
												btn="transparent"
											><IconCrap className="mr-1" /> {company.sentiment?.crap || 0}
											</ElemButton>
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
