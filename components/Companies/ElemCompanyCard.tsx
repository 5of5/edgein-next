import { Companies } from "@/graphql/types";
import { getLayerClass } from "@/utils/style";
import { FC, useEffect, useState } from "react";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemReactions } from "@/components/ElemReactions";
import { ElemSaveToList } from "@/components/ElemSaveToList";
import { ElemTooltip } from "@/components/ElemTooltip";
import Link from "next/link";
// import { ElemCredibility } from "@/components/Company/ElemCredibility";
// import { ElemVelocity } from "@/components/Company/ElemVelocity";

type Props = {
	company: Companies;
	toggleViewMode: boolean;
};

export const ElemCompanyCard: FC<Props> = ({ company, toggleViewMode }) => {
	const [companyData, setCompanyData] = useState(company);

	useEffect(() => {
		setCompanyData(company);
	}, [company]);

	return (
		<Link href={`/companies/${companyData.slug}`}>
			<a
				className={`flex flex-col ${
					toggleViewMode ? "md:flex-row md:items-center" : ""
				} mx-auto w-full p-5 cursor-pointer border border-black/10 rounded-lg transition-all hover:scale-102 hover:shadow`}
			>
				<div
					className={`flex shrink-0 ${
						toggleViewMode
							? "md:items-center md:mb-0 md:mr-4 md:w-64 lg:w-72"
							: "w-full"
					}`}
				>
					<ElemPhoto
						photo={companyData.logo}
						wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow-md"
						imgClass="object-fit max-w-full max-h-full"
						imgAlt={companyData.name}
					/>

					<div className="flex items-center justify-center pl-2 md:overflow-visible">
						<div>
							<h3
								className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 text-dark-500 sm:text-lg md:text-xl xl:text-2xl"
								title={companyData.name ?? ""}
							>
								{companyData.name}
							</h3>
							{companyData.coin && (
								<ElemTooltip
									content={`Token / Value`}
									className="inline-flex items-center overflow-visible"
								>
									<span className="uppercase">{companyData.coin.ticker}</span>
								</ElemTooltip>
							)}
						</div>
					</div>
				</div>

				<div className="grow">
					{(companyData.layer || companyData.tags) && (
						<div
							className={`mt-4 flex flex-wrap gap-2 ${
								toggleViewMode && "lg:mt-0"
							}`}
						>
							{companyData.layer && (
								<div
									className={`${getLayerClass(
										companyData.layer
									)} shrink-0 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full`}
								>
									{companyData.layer}
								</div>
							)}

							{companyData.tags?.map((tag: string, index: number) => {
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

					{companyData.overview && (
						<div className={`grow mt-4 ${toggleViewMode && "max-w-sm mr-4"}`}>
							<div className="text-gray-400 line-clamp-3">
								{companyData.overview}
							</div>
						</div>
					)}
				</div>

				<div
					className="flex items-center justify-between mt-4 gap-x-5"
					onClick={(e) => e.stopPropagation()}
				>
					<ElemReactions resource={company} resourceType={"companies"} />
					<ElemSaveToList
						resourceId={company.id}
						resourceType={"companies"}
						slug={company.slug!}
					/>
				</div>
			</a>
		</Link>
	);
};
