import type { NextPage, GetStaticProps } from "next";

import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ElemHeading } from "../components/ElemHeading";
import { ElemButton } from "../components/ElemButton";
import { InputSearch } from "../components/InputSearch";
import { runGraphQl, formatDate } from "../utils";

type Props = {
	events: Record<string, any>[];
	sortEvents: Record<string, any>[];
};

const Events: NextPage<Props> = ({ events, sortEvents }) => {
	const [search, setSearch] = React.useState("");

	return (
		<div>
			<Head>
				<title>Events - EdgeIn.io</title>
				<meta
					name="description"
					content="Don't miss a beat. Here's your lineup for all of the industry's must attend events."
				/>
			</Head>
			<div>
				<ElemHeading
					title="Events"
					subtitle="Don't miss a beat. Here's your lineup for all of the industry's must attend events."
				>
					{/* <ElemButton href="/" btn="dark" arrow className="mt-6">
						Submit event
					</ElemButton> */}
				</ElemHeading>

				<div className="bg-gray-50 relative z-10 rounded-t-3xl lg:rounded-t-8xl">
					<div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10">
						<div className="w-full flex flex-col py-5 sm:grid sm:gap-5 sm:grid-cols-3 lg:grid-cols-4">
							<InputSearch
								label="Search"
								name="search"
								value={search}
								placeholder="Quick Search..."
								onChange={(e: {
									target: { value: React.SetStateAction<string> };
								}) => setSearch(e.target.value)}
							/>
						</div>

						<div className="w-full flex flex-col gap-5 sm:grid sm:grid-cols-3 lg:grid-cols-4">
							{sortEvents
								.filter(
									(event) =>
										!search ||
										event.event?.toLowerCase().includes(search.toLowerCase())
								)
								.map((event) => (
									<Link key={event.id} href={`/events/${event.slug}`}>
										<a
											key={event.id}
											className="bg-white rounded-lg overflow-hidden cursor-pointer p-7 md:p-7 flex flex-col justify-between md:h-full mx-auto w-full max-w-md transition duration-300 ease-in-out transform group hover:scale-102 hover:shadow-lg focus:ring focus:ring-primary-300"
										>
											<h3 className="text-2xl font-bold text-dark-700 break-words min-w-0 sm:text-lg lg:text-xl group-hover:opacity-60">
												{event.event}
											</h3>

											<div className="grow mt-1 mb-4 text-gray-400 font-medium">
												{event.startDate && (
													<div className="w-full inline-flex py-1">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-6 w-6 mr-1 text-gray-300"
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
														</svg>

														<div className="inline font-medium">
															{event.startDate &&
																formatDate(event.startDate, {
																	month: "short",
																	day: "2-digit",
																	timeZone: "America/Los_Angeles",
																})}
															{event.endDate && (
																<>
																	&ndash;
																	{formatDate(event.endDate, {
																		day: "2-digit",
																		timeZone: "America/Los_Angeles",
																	})}
																</>
															)}
															{event.startDate && (
																<>
																	,&nbsp;
																	{formatDate(event.startDate, {
																		year: "numeric",
																	})}
																</>
															)}

															{/* <div className="block my-4">{event.date}</div> */}
														</div>
													</div>
												)}
												{event.location && (
													<div className="w-full inline-flex py-1">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-6 w-6 mr-1 text-gray-300"
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
														</svg>

														<div className="inline font-medium">
															{event.location}
														</div>
													</div>
												)}
											</div>

											<div>
												<ElemButton
													className="pl-0 pr-0"
													btn="transparent"
													arrow
												>
													View
												</ElemButton>
											</div>
										</a>
									</Link>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: events } = await runGraphQl(
		'{ events(_order_by: {event: "asc"}, _filter: {slug: {_ne: ""}}) { id, event, slug, startDate, endDate, location }}'
	);

	const sortEvents = events.events
		.slice()
		.sort(
			(
				a: { startDate: string | number | Date },
				b: { startDate: string | number | Date }
			) => {
				return (
					new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
				);
			}
		);

	return {
		props: {
			events: events.events,
			sortEvents,
		},
	};
};

export default Events;
