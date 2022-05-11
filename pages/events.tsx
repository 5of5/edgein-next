import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ElemButton } from "../components/ElemButton";
import { ElemHeading } from "../components/ElemHeading";
import { InputSearch } from "../components/InputSearch";
import { runGraphQl } from "../utils";

type Props = {
	events: Record<string, any>[];
	sortedEvents: Record<string, any>[];
};

const Events: NextPage<Props> = ({ events, sortedEvents }) => {
	const [search, setSearch] = React.useState("");

	return (
		<div>
			<Head>
				<title>Events - EdgeIn.io</title>
			</Head>
			<div>
				<ElemHeading
					title="Events"
					subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				>
					<ElemButton href="/" btn="dark" arrow>
						Submit event
					</ElemButton>
				</ElemHeading>

				<div className="bg-gray-50 rounded-t-8xl relative z-10">
					<div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
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

						<div className="w-full flex flex-col sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-5">
							{events
								.filter(
									(event) =>
										!search ||
										event.event?.toLowerCase().includes(search.toLowerCase())
								)
								.map((event) => (
									<div
										key={event.id}
										className="bg-white rounded-lg overflow-hidden cursor-pointer p-7 flex flex-col group transition duration-300 ease-in-out transform hover:scale-102 hover:shadow-lg focus:ring focus:ring-primary-300"
									>
										<h3 className="text-2xl font-bold text-dark-700 break-words min-w-0 sm:text-lg lg:text-xl group-hover:opacity-60">
											{event.event}
											{/* {event.slug} */}
										</h3>

										<div className="grow mb-4 text-gray-400 font-medium">
											{event.date && (
												<div className="w-full inline-flex py-1 sm:w-auto">
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
														{event.date}
														{/* Start Date: {event.startDate}
														End Date: {event.endDate} */}
													</div>
												</div>
											)}
											{event.location && (
												<div className="w-full inline-flex py-1 sm:w-auto">
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
												href="/"
												btn="transparent"
												arrow
											>
												View
											</ElemButton>
										</div>
									</div>
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
		'{ events(_filter: {slug: {_ne: ""}}) { id, event, date, location }}'
	);

	const sortedEvents = events.events
		.slice()
		.sort(
			(a: { startDate: number }, b: { startDate: number }) =>
				b.startDate - a.startDate
		);

	return {
		props: {
			events: events.events,
			sortedEvents,
		},
	};
};

export default Events;
