import type { NextPage, GetStaticProps } from "next";

import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { ElemHeading } from "../components/ElemHeading";
import { ElemButton } from "../components/ElemButton";
import { InputSearch } from "../components/InputSearch";
import { runGraphQl, formatDate } from "../utils";
import moment from "moment-timezone";
import {
	IconSearch,
	IconAnnotation,
	IconX,
	IconFilter,
} from "@/components/Icons";

type Props = {
	events: Record<string, any>[];
	sortEvents: Record<string, any>[];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Events: NextPage<Props> = ({
	events,
	sortEvents,
	setToggleFeedbackForm,
}) => {
	const [initialLoad, setInitialLoad] = useState(true);

	const error = false;
	const isLoading = false;

	if (!isLoading && initialLoad) {
		setInitialLoad(false);
	}

	return (
		<div className="relative overflow-hidden">
			<ElemHeading
				title="Events"
				subtitle="Don't miss a beat. Here's your lineup for all of the industry's must attend events."
			>
				{/* <ElemButton href="/" btn="dark" arrow className="mt-6">
						Submit event
					</ElemButton> */}
			</ElemHeading>

			{/* <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
				<ElemFeaturedEvents className="shadow" heading="Featured" />
			</div> */}

			<div className="max-w-7xl px-4 mx-auto mt-7 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow p-5">
					{events?.length === 0 && (
						<div className="flex items-center justify-center mx-auto min-h-[40vh]">
							<div className="w-full max-w-2xl my-8 p-8 text-center bg-white border rounded-2xl border-dark-500/10">
								<IconSearch className="w-12 h-12 mx-auto text-slate-300" />
								<h2 className="mt-5 text-3xl font-bold">No results found</h2>
								<div className="mt-1 text-lg text-slate-600">
									Please check spelling, try different filters, or tell us about
									missing data.
								</div>
								<ElemButton
									onClick={() => setToggleFeedbackForm(true)}
									btn="white"
									className="mt-3"
								>
									<IconAnnotation className="w-6 h-6 mr-1" />
									Tell us about missing data
								</ElemButton>
							</div>
						</div>
					)}

					<div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{error ? (
							<h4>Error loading events</h4>
						) : isLoading && !initialLoad ? (
							<>
								{/* {Array.from({ length: 9 }, (_, i) => (
									<PlaceholderEventCard key={i} />
								))} */}
							</>
						) : (
							events.map((event) => (
								<Link key={event.id} href={`/events/${event.slug}`}>
									<a
										key={event.id}
										className="flex flex-col mx-auto w-full p-5 cursor-pointer border border-black/10 rounded-lg transition-all hover:scale-102 hover:shadow"
									>
										<div className="">
											<div className="h-36 rounded-lg w-full bg-[url('https://source.unsplash.com/random/500×200/?shapes')] bg-cover bg-no-repeat bg-center"></div>
										</div>
										<h3 className="mt-4 text-2xl font-bold break-words min-w-0 sm:text-lg lg:text-xl group-hover:opacity-60">
											{event.name}
										</h3>

										<div className="grow mt-1 font-medium">
											{event.start_date && (
												<div className="w-full inline-flex py-1">
													{/* <svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6 mr-1 text-gray-300 shrink-0"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth="2"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
														/>
													</svg> */}

													<div className="inline font-medium">
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
												</div>
											)}
											{event.location && (
												<div className="w-full inline-flex py-1">
													{/* <svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6 mr-1 text-gray-300 shrink-0"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
														strokeWidth="2"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
														/>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
														/>
													</svg> */}

													<div className="inline font-medium text-sm text-gray-400">
														{event.location}
													</div>
												</div>
											)}

											{event.price != null && (
												<div className="w-full inline-flex py-1 text-sm text-gray-400">
													{/* {event.price === "0" ? "YES" : "NO"} */}
													{event.price > 0
														? `Starts at $${event.price}`
														: "Free"}
												</div>
											)}
										</div>
										<div
											className="mt-4 flex flex-wrap gap-2"
											onClick={(e) => e.stopPropagation()}
										>
											{event.tags?.map((tag: string, index: number) => {
												return (
													<div
														key={index}
														//onClick={(e) => tagOnClick(e, tag)}
														className={`shrink-0 bg-slate-200 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full cursor-pointer hover:bg-slate-300`}
													>
														{tag}
													</div>
												);
											})}
										</div>
										{/* <div className="text-sm text-gray-400">
											<div>{event.venue}</div>
											<div>{event.location}</div>
										</div> */}

										{/* <div>
											<ElemButton className="pl-0 pr-0" btn="transparent" arrow>
												View
											</ElemButton>
										</div> */}
									</a>
								</Link>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	// const { data: events } = await runGraphQl<{ events: Record<string, any>[] }>(
	// 	'{ events(_order_by: {event: "asc"}, _filter: {slug: {_ne: ""}}) { id, event, slug, startDate, endDate, location }}'
	// );
	// const events: { events: Record<string, any>[] } = { events: [] };

	const yesterday = moment().subtract(1, "days");
	const today = moment(); //moment(new Date());
	const tomorrow = moment().add(1, "days");
	const in2days = moment().add(2, "days");

	const events = {
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
		],
	};

	// const sortEvents = events?.events.slice().sort((a, b) => {
	// 	return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
	// });

	return {
		props: {
			metaTitle: "Web3 Events - EdgeIn.io",
			metaDescription:
				"Don't miss a beat. Here's your lineup for all of the industry's must attend events.",
			events: events?.events,
			//sortEvents,
		},
	};
};

export default Events;
