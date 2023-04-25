import React, { useState } from "react";
import Link from "next/link";
import { News } from "@/graphql/types";
import { formatDate } from "@/utils";
import { ElemButton } from "../ElemButton";
import { IconExternalLink } from "@/components/Icons";

type Props = {
	className?: string;
	resourceNews: News[];
};

export const ElemNewsList: React.FC<Props> = ({ className, resourceNews }) => {
	const [limit, setLimit] = useState(10);
	const onShowMore = () => {
		setLimit(limit + 10);
	};

	return (
		<div className={`w-full p-5 bg-white shadow rounded-lg ${className}`}>
			<div className="flex items-center justify-between mb-2 border-b border-black/10">
				<h2 className="text-xl font-bold">News</h2>
			</div>

			<div className="py-4">
				{resourceNews && resourceNews.length > 0 ? (
					<>
						<ul className="flex flex-col">
							{resourceNews.slice(0, limit).map((item, index) => {
								return (
									<li
										key={index}
										className="relative pl-6 overflow-hidden group last:-mb-4"
									>
										<span className="absolute h-full top-0 bottom-0 left-0">
											<span className="absolute dashes top-2 left-2 -bottom-2 right-auto w-px h-auto border-y border-white bg-repeat-y"></span>
											<span className="block absolute top-2 left-1 w-2 h-2 rounded-full bg-gradient-to-r from-primary-300 to-primary-300 transition-all group-hover:from-[#1A22FF] group-hover:via-primary-500 group-hover:to-primary-400"></span>
										</span>

										{item && (
											<div className="mb-4">
												<div className="inline leading-7 text-slate-600">
													{item?.link ? (
														<Link href={item.link}>
															<a target="_blank">
																<span className="border-b border-primary-500 transition-all hover:border-b-2 hover:text-primary-500">
																	{item.text}
																</span>
																<IconExternalLink className="inline-block w-5 h-5 ml-1 text-primary-500" />
															</a>
														</Link>
													) : (
														<div className="inline">{item.text}</div>
													)}
													<p className="text-sm">
														{formatDate(item.date as string, {
															month: "short",
															day: "2-digit",
															year: "numeric",
														})}
													</p>
												</div>
											</div>
										)}
									</li>
								);
							})}
						</ul>

						{limit < resourceNews.length && (
							<div className="mt-6">
								<ElemButton
									btn="ol-primary"
									onClick={onShowMore}
									className="w-full"
								>
									Show More News
								</ElemButton>
							</div>
						)}
					</>
				) : (
					<div className="flex flex-col items-center justify-center lg:p-5">
						<div className="text-slate-600 lg:text-xl">
							There is no recent news for this person.
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
