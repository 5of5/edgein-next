import { Companies, Follows_Companies } from "@/graphql/types";
import { getName, getNewFollows, reactOnSentiment } from "@/utils/reaction";
import { getLayerClass } from "@/utils/style";
import { remove } from "lodash";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
// import { ElemCredibility } from "@/components/Company/ElemCredibility";
// import { ElemVelocity } from "@/components/Company/ElemVelocity";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemReactions } from "@/components/ElemReactions";
import { ElemSaveToList } from "@/components/ElemSaveToList";
import { ElemTooltip } from "@/components/ElemTooltip";

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

			const newSentiment = await reactOnSentiment({
				company: company.id,
				sentiment,
				pathname: `/companies/${company.slug}`,
			});
			setCompanyData((prev: Companies) => {
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
		<Link href={`/companies/${companyData.slug}`}>
			<a
				className={`flex flex-col ${
					toggleViewMode ? "md:flex-row md:items-center" : ""
				} mx-auto w-full p-5 cursor-pointer bg-white rounded-lg transition-all hover:scale-102 hover:shadow md:h-full border border-black/10`}
			>
				<div
					className={`flex shrink-0 mb-4 ${
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

					<div className=" items-center justify-center pl-2 md:overflow-hidden">
						<h3
							className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 text-dark-500 sm:text-lg md:text-xl xl:text-2xl"
							title={companyData.name ?? ""}
						>
							{companyData.name}
						</h3>
						{companyData.coin && (
							<ElemTooltip
								content={`Token: ${companyData.coin.ticker}`}
								className="inline-block py-1 ml-1  whitespace-nowrap text-dark-400"
							>
								<span className="text-sm uppercase leading-sm">
									{companyData.coin.ticker}
								</span>
							</ElemTooltip>
						)}
					</div>
				</div>

				{companyData.layer && (
					<div
						className={`${getLayerClass(
							companyData.layer
						)} self-start text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full mb-4 ${toggleViewMode && "mt-4"}`}
					>
						{companyData.layer}
					</div>
				)}

				{companyData.overview && (
					<div className={`grow ${toggleViewMode && "max-w-sm mr-4 ml-5"}`}>
						<div className="text-gray-400 line-clamp-3">
							{companyData.overview}
						</div>
					</div>
				)}

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
