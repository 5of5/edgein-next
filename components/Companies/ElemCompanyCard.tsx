import { Companies, Follows_Companies } from "@/graphql/types";
import {
	getName,
	getNewFollows,
	getNewTempSentiment,
	isFollowsExists,
	reactOnSentiment,
} from "@/utils/reaction";
import { getLayerClass } from "@/utils/style";
import { has, remove } from "lodash";
import { FC, useEffect, useState } from "react";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemReactions } from "@/components/ElemReactions";
import { ElemSaveToList } from "@/components/ElemSaveToList";
import { ElemTooltip } from "@/components/ElemTooltip";
import Link from "next/link";
// import { ElemCredibility } from "@/components/Company/ElemCredibility";
// import { ElemVelocity } from "@/components/Company/ElemVelocity";
//import { IconArrowUp, IconArrowDown } from "@/components/Icons";

type Props = {
	company: Companies;
	toggleViewMode: boolean;
};

export const ElemCompanyCard: FC<Props> = ({ company, toggleViewMode }) => {
	const [companyData, setCompanyData] = useState(company);

	useEffect(() => {
		setCompanyData(company);
	}, [company]);

	const handleReactionClick =
		(sentiment: string, alreadyReacted: boolean) =>
		async (
			event: React.MouseEvent<
				HTMLButtonElement | HTMLInputElement | HTMLElement
			>
		) => {
			event.stopPropagation();
			event.preventDefault();
			setTemporary(sentiment, alreadyReacted);
			const newSentiment = await reactOnSentiment({
				company: company.id,
				sentiment,
				pathname: `/companies/${company.slug}`,
			});
			setCompanyData((prev: Companies) => {
				const newFollows = getNewFollows(sentiment) as Follows_Companies;

				if (!alreadyReacted && !isFollowsExists(prev.follows, sentiment))
					prev.follows.push(newFollows);
				else
					remove(prev.follows, (item) => {
						return getName(item.list!) === sentiment;
					});
				return { ...prev, sentiment: newSentiment };
			});
		};

	const setTemporary = (sentiment: string, alreadyReacted: boolean) => {
		setCompanyData((prev: Companies) => {
			const newSentiment = getNewTempSentiment(
				{ ...prev.sentiment },
				sentiment,
				alreadyReacted
			);

			const newFollows = getNewFollows(sentiment) as Follows_Companies;

			if (!alreadyReacted) prev.follows.push(newFollows);
			else
				remove(prev.follows, (item) => {
					return getName(item.list!) === sentiment;
				});
			return { ...prev, sentiment: newSentiment };
		});
	};

	return (
		<Link href={`/companies/${companyData.slug}`} passHref>
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
									{/* <span className="text-green-500">
									$7.75 <IconArrowUp className="h-4 w-4 inline" />
								</span>
								<div className="inline-flex items-center text-red-500">
									$0.0258 <IconArrowDown className="h-4 w-4 inline" />
								</div> */}
								</ElemTooltip>
							)}
						</div>
					</div>
				</div>

				<div className="grow">
					{(companyData.layer || companyData.tags) && (
						<div
							className={`mt-4 flex flex-wrap gap-2 ${
								toggleViewMode && "mt-0"
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

				{/* <div
				className={`flex flex-row justify-between mt-4 shrink-0 lg:flex-row ${toggleViewMode
					? "md:flex-col md:justify-center md:ml-auto md:flex md:items-end md:mt-0 lg:flex-row lg:items-center"
					: ""
					}`}
				>
				<ElemCredibility
					mini={true}
					className={`pr-4 ${toggleViewMode ? "md:pr-0 lg:pr-4" : ""
					}`}
					marketVerified={companyData.market_verified}
					githubVerified={companyData.github}
					linkedInVerified={companyData.company_linkedin}
				/>
				<ElemVelocity
					mini={true}
					className={`${toggleViewMode ? "md:pt-2 lg:pt-0" : ""
					}`}
					employeeListings={companyData.velocity_linkedin}
					tokenExchangeValue={companyData.velocity_token}
				/>
				</div> */}

				<div className="flex items-center justify-between mt-4 gap-x-5">
					<ElemReactions
						data={companyData}
						handleReactionClick={handleReactionClick}
					/>
					<ElemSaveToList
						follows={company?.follows}
						onCreateNew={handleReactionClick}
					/>
				</div>
			</a>
		</Link>
	);
};
