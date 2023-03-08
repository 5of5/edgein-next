import React, { FC, useEffect, useState } from "react";
import { PlaceholderCompanyCard } from "@/components/Placeholders";
import { ElemCarouselWrap } from "@/components/ElemCarouselWrap";
import { ElemCarouselCard } from "@/components/ElemCarouselCard";
import { ElemPhoto } from "@/components/ElemPhoto";
import {
	formatDate,
	convertToInternationalCurrencySystem,
	numberWithCommas,
} from "@/utils";
import moment from "moment-timezone";
import Link from "next/link";
// import {
// 	Events_Bool_Exp,
// 	useGetEventsFeaturedQuery,
// } from "@/graphql/types";

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

export const ElemFeaturedEvents: FC<Props> = ({
	className = "",
	heading,
	itemsLimit,
}) => {
	const limit = itemsLimit ? itemsLimit : 33;
	const offset = null;

	// const filters: DeepPartial<Events_Bool_Exp> = {
	// 	_and: [
	// 		{
	// 			slug: { _neq: "" },
	// 			date_added: { _neq: new Date(0) },
	// 		},
	// 	],
	// };

	// const {
	// 	data: eventsData,
	// 	error,
	// 	isLoading,
	// } = useGetEventsFeaturedQuery({
	// 	offset,
	// 	limit,
	// 	where: filters as Events_Bool_Exp,
	// });

	const yesterday = moment().subtract(1, "days");
	const today = moment();
	const tomorrow = moment().add(1, "days");
	const in2days = moment().add(2, "days");

	const eventsData = {
		events: [
			{
				id: 1,
				slug: "somelink",
				name: "Sickest AI and Web3 event",
				link: "#Event1Link",
				location: "San Francisco, California, United States",
				venue: "Moscone Center",
				size: 4000,
				start_date: JSON.parse(JSON.stringify(yesterday)),
				end_date: JSON.parse(JSON.stringify(tomorrow)),
				tags: ["Conference", "NFT", "DAO"],
				price: 199,
			},
			{
				id: 2,
				slug: "just-an-ok-web3-event",
				name: "Just an ok Web3 event",
				link: "#Event2Link",
				location: "Miami, Florida, United States",
				venue: "Mana Wynwood Convention Center",
				size: 2000,
				start_date: JSON.parse(JSON.stringify(yesterday)),
				end_date: JSON.parse(JSON.stringify(in2days)),
				tags: ["Blockchain", "Conference", "Web3"],
				price: 499.99,
			},
			{
				id: 3,
				slug: "lame-ai-event",
				name: "Lame AI event",
				link: "#Event3Link",
				location: "Salt Lake City, Utah, United States",
				venue: "Conference Center",
				size: 50,
				start_date: JSON.parse(JSON.stringify(today)),
				end_date: JSON.parse(JSON.stringify(in2days)),
				tags: ["Crypto", "Blockchain"],
				price: 0,
			},
			{
				id: 4,
				slug: "somelink",
				name: "Fintech Retreat 23",
				link: "#Event1Link",
				location: "San Francisco, California, United States",
				venue: "Moscone Center",
				size: 3000,
				start_date: JSON.parse(JSON.stringify(yesterday)),
				end_date: JSON.parse(JSON.stringify(tomorrow)),
				tags: ["Conference", "NFT", "DAO"],
				price: 199,
			},
			{
				id: 5,
				slug: "quantum-miami",
				name: "Quantum Miami",
				link: "#Event2Link",
				location: "Miami, Florida, United States",
				venue: "Mana Wynwood Convention Center",
				size: 2000,
				start_date: JSON.parse(JSON.stringify(yesterday)),
				end_date: JSON.parse(JSON.stringify(in2days)),
				tags: ["Blockchain", "Conference", "Web3"],
				price: 499.99,
			},
			{
				id: 6,
				slug: "lame-ai-event",
				name: "Lame AI event",
				link: "#Event3Link",
				location: "Salt Lake City, Utah, United States",
				venue: "Conference Center",
				size: 50,
				start_date: JSON.parse(JSON.stringify(today)),
				end_date: JSON.parse(JSON.stringify(in2days)),
				tags: ["Crypto", "Blockchain"],
				price: 0,
			},
		],
	};

	const error = false;
	const isLoading = false;

	const events = eventsData?.events || [];

	return (
		<div className={`bg-white rounded-lg p-5 ${className}`}>
			{heading && <h2 className="text-xl font-bold">{heading}</h2>}
			{error ? (
				<h4>Error loading featured events</h4>
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
				events && (
					<ElemCarouselWrap>
						{events.map((event: any, index: number) => {
							return (
								<ElemCarouselCard
									key={event.id}
									className={`p-3 basis-full sm:basis-1/2 lg:basis-1/3`}
								>
									<Link key={event.id} href={`/events/${event.id}`}>
										<a
											key={event.id}
											className="flex flex-col mx-auto w-full p-5 cursor-pointer border border-black/10 rounded-lg transition-all hover:scale-102 hover:shadow"
										>
											<div className="">
												<div className="h-36 rounded-lg w-full bg-[url('https://source.unsplash.com/random/500×200/?city')] bg-cover bg-no-repeat bg-center"></div>
											</div>
											<h3 className="mt-4 text-2xl font-bold break-words min-w-0 sm:text-lg lg:text-xl group-hover:opacity-60">
												{event.name}
											</h3>

											<div className="grow mt-1">
												{event.start_date && (
													<div className="w-full inline-flex py-1 font-medium">
														{event.start_date &&
															formatDate(event.start_date, {
																month: "short",
																day: "2-digit",
																year: "numeric",
																timeZone: "America/Los_Angeles",
															})}

														{event.end_date && (
															<>
																&nbsp;&ndash;&nbsp;
																{formatDate(event.end_date, {
																	month: "short",
																	day: "2-digit",
																	year: "numeric",
																	timeZone: "America/Los_Angeles",
																})}
															</>
														)}
													</div>
												)}
												{event.location && (
													<div className="w-full inline-flex py-1 text-sm text-gray-400">
														{event.location}
													</div>
												)}

												<div className="w-full inline-flex py-1 text-sm text-gray-400">
													{/* {event.price != null && (
													<div>
														{event.price > 0
															? `Starts at $${event.price}`
															: "Free"}
													</div>
												)}
												{event.price != null && event.size != null && (
													<div className="mx-1">{"•"}</div>
												)} */}
													{event.size != null && (
														<>
															<div>
																{+event.size < 50
																	? "Less than 50 people"
																	: `${numberWithCommas(+event.size)} people`}
															</div>
														</>
													)}
												</div>
											</div>

											<div
												className="mt-4 flex flex-wrap gap-2"
												onClick={(e) => e.stopPropagation()}
											>
												{/* {event.tags?.map((tag: string, index: number) => {
												return (
													<div
														key={index}
														//onClick={(e) => tagOnClick(e, tag)}
														className={`shrink-0 bg-slate-200 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full cursor-pointer hover:bg-slate-300`}
													>
														{tag}
													</div>
												);
											})} */}
											</div>
										</a>
									</Link>
								</ElemCarouselCard>
							);
						})}
					</ElemCarouselWrap>
				)
			)}
		</div>
	);
};
