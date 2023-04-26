import React, { useState } from "react";
import Link from "next/link";
import { ElemButton } from "./ElemButton";
import { formatDate, convertToIntNum } from "@/utils";
import { useIntercom } from "react-use-intercom";
import { IconExternalLink } from "@/components/Icons";

type Props = {
	heading?: string;
	resourceType: "companies" | "vc_firms";
	resourceInvestments: Array<any>;
	resourceName?: string | null;
	resourceId?: number;
};

export const ElemOrganizationActivity: React.FC<Props> = ({
	heading,
	resourceType,
	resourceInvestments,
	resourceName,
	resourceId,
}) => {
	const [activityLimit, setActivityLimit] = useState(10);
	const showMoreActivity = () => {
		setActivityLimit(activityLimit + 10);
	};
	const { show } = useIntercom();

	return (
		<div>
			<div className="flex items-center justify-between mb-2 border-b border-black/10">
				<h2 className="text-xl font-bold">
					{heading ? heading : "Activity Timeline"}
				</h2>
			</div>

			<div className="py-4">
				{resourceInvestments && resourceInvestments.length > 0 ? (
					<>
						<ul className="flex flex-col">
							{resourceInvestments
								.slice(0, activityLimit)
								.map((activity, index) => {
									return (
										<li
											key={index}
											className="relative pl-6 overflow-hidden group last:-mb-4"
										>
											<span className="absolute h-full top-0 bottom-0 left-0">
												<span className="absolute dashes top-2 left-2 -bottom-2 right-auto w-px h-auto border-y border-white bg-repeat-y"></span>
												<span className="block absolute top-2 left-1 w-2 h-2 rounded-full bg-gradient-to-r from-primary-300 to-primary-300 transition-all group-hover:from-[#1A22FF] group-hover:via-primary-500 group-hover:to-primary-400"></span>
											</span>

											{activity &&
												(activity?.type === "news"
													? renderNews(activity, resourceType, resourceId)
													: renderActivity(
															activity,
															resourceType,
															resourceName
													  ))}
										</li>
									);
								})}
						</ul>

						{activityLimit < resourceInvestments.length && (
							<div className="mt-6">
								<ElemButton
									btn="ol-primary"
									onClick={showMoreActivity}
									className="w-full"
								>
									Show More Activity
								</ElemButton>
							</div>
						)}
					</>
				) : (
					<div className="flex flex-col items-center justify-center lg:p-5">
						<div className="text-slate-600 lg:text-xl">
							There is no recent activity for this organization.
						</div>
						<ElemButton onClick={show} btn="slate" className="mt-3">
							Request data or contribute
						</ElemButton>
					</div>
				)}
			</div>
		</div>
	);
};

const renderNews = (activity: any, resourceType: "companies" | "vc_firms", resourceId?: number) => {
	const newsOrganizationType = activity.organizations.find(
    (item: any) =>
      item[resourceType === "companies" ? "company_id" : "vc_firm_id"] ===
      resourceId
  )?.type;

	const isPublisher = newsOrganizationType === "publisher";

	return (
		<div className="mb-4">
			<div className="inline leading-7 text-slate-600">
				{activity?.link ? (
					<>
						<div className="inline font-bold mr-1">News:</div>
						<Link href={activity.link}>
							<a className="" target="_blank">
								<span className="border-b border-primary-500 transition-all hover:border-b-2 hover:text-primary-500">
									{activity.text}
								</span>
								<IconExternalLink className="inline-block w-5 h-5 ml-1 text-primary-500" />
							</a>
						</Link>
					</>
				) : (
					<div className="inline">{activity.text}</div>
				)}
				<div className="flex items-center gap-x-2">
					{isPublisher && (
            <span className="bg-slate-200 self-start text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full transition-all hover:bg-slate-300">
              Publisher
            </span>
          )}
					<p className="text-sm">
						{formatDate(activity.date as string, {
							month: "short",
							day: "2-digit",
							year: "numeric",
						})}
						<span>{` • powered by CryptoPanic`}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

const renderActivity = (
	activity: any,
	resourceType: "companies" | "vc_firms",
	resourceName?: string | null
) => {
	return resourceType === "companies" ? (
		<div className="mb-4">
			<div className="inline leading-7 text-slate-600">
				{activity.round === "Acquisition" ? (
					<div className="inline font-bold">Acquired by </div>
				) : (
					<>
						<div className="inline font-bold">
							Raised{" "}
							{activity.amount ? (
								<div className="inline text-green-600">
									${convertToIntNum(activity.amount)}
								</div>
							) : (
								<div className="inline text-green-600">undisclosed capital</div>
							)}{" "}
							{activity.valuation && (
								<div className="inline">
									at{" "}
									<div className="inline text-green-600">
										${convertToIntNum(activity.valuation)}{" "}
									</div>
									valuation{" "}
								</div>
							)}
						</div>
						from{" "}
					</>
				)}
				{activity.investments.map((item: any, index: number) => {
					return (
						<div key={index} className="inline">
							{index !== 0 &&
								(index === activity.investments.length - 1 ? ", and " : ", ")}

							{item.vc_firm && (
								<Link href={`/investors/${item.vc_firm?.slug}`}>
									<a className="border-b border-primary-500 transition-all hover:border-b-2 hover:text-primary-500">
										{/* <a className="text-primary-500 hover:bg-slate-200"> */}
										{item.vc_firm["name"]}
									</a>
								</Link>
							)}
							{item.vc_firm && item.person && <>/</>}

							{item.person && (
								<Link href={`/people/${item.person["slug"]}`}>
									<a className="border-b border-primary-500 transition-all hover:border-b-2 hover:text-primary-500">
										{item.person["name"]}
									</a>
								</Link>
							)}
						</div>
					);
				})}
				.
			</div>

			<p className="text-sm text-slate-600">
				{formatDate(activity.round_date as string, {
					month: "short",
					day: "2-digit",
					year: "numeric",
				})}
			</p>
		</div>
	) : resourceType === "vc_firms" ? (
		<div className="mb-4">
			<div className="inline leading-7 text-slate-600">
				{activity.company && (
					<Link href={`/companies/${activity.company["slug"]}`}>
						<a className="border-b border-primary-500 transition-all font-bold hover:border-b-2 hover:text-primary-500">
							{activity.company["name"]}
						</a>
					</Link>
				)}{" "}
				{activity.round === "Acquisition" ? (
					<div className="inline font-bold">Acquired by </div>
				) : (
					<>
						<div className="inline font-bold">
							Raised{" "}
							{activity.amount ? (
								<div className="inline text-green-600">
									${convertToIntNum(activity.amount)}
								</div>
							) : (
								<div className="inline text-green-600">undisclosed capital</div>
							)}
							:{" "}
							{activity.valuation && (
								<div className="inline">
									at{" "}
									<div className="inline text-green-600">
										${convertToIntNum(activity.valuation)}{" "}
									</div>
									valuation{" "}
								</div>
							)}
						</div>
						{activity.round ? activity.round : "Investment round"} from{" "}
					</>
				)}
				{resourceName ? resourceName : ""}
			</div>
			<p className="text-sm text-slate-600">
				{formatDate(activity.round_date as string, {
					month: "short",
					day: "2-digit",
					year: "numeric",
				})}
			</p>
		</div>
	) : (
		<></>
	);
};
