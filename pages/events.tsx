import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ElemHeading } from "../components/ElemHeading";
import { ElemFeaturedEvents } from "@/components/Events/ElemFeaturedEvents";
import { ElemButton } from "../components/ElemButton";
import { runGraphQl, formatDate, numberWithCommas } from "../utils";
import { useStateParams } from "@/hooks/useStateParams";
import { Pagination } from "@/components/Pagination";
import moment from "moment-timezone";
import { IconSearch, IconAnnotation } from "@/components/Icons";
import {
	GetEventsDocument,
	GetEventsQuery,
	useGetEventsQuery,
	Events_Bool_Exp,
} from "@/graphql/types";
import { DeepPartial } from "./companies";
import { onTrackView } from "@/utils/track";
import { useRouter } from "next/router";
import { getFullAddress } from "@/utils/helpers";

type Props = {
	eventsCount: number;
	initialEvents: GetEventsQuery["events"];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Events: NextPage<Props> = ({
	eventsCount,
	initialEvents,
	setToggleFeedbackForm,
}) => {
	const [initialLoad, setInitialLoad] = useState(true);

	const router = useRouter();

	const [page, setPage] = useStateParams<number>(
		0,
		"page",
		(pageIndex) => pageIndex + 1 + "",
		(pageIndex) => Number(pageIndex) - 1
	);
	const limit = 50;
	const offset = limit * page;

	const filters: DeepPartial<Events_Bool_Exp> = {};

	useEffect(() => {
		if (!initialLoad) {
			setPage(0);
		}
		if (initialLoad) {
			setInitialLoad(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		onTrackView({
			properties: filters,
			pathname: router.pathname,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {
		data: eventsData,
		error,
		isLoading,
	} = useGetEventsQuery({
		offset,
		limit,
		where: filters as Events_Bool_Exp,
	});

	if (!isLoading && initialLoad) {
		setInitialLoad(false);
	}

	const events = initialLoad ? initialEvents : eventsData?.events;
	const events_aggregate = initialLoad
		? eventsCount
		: eventsData?.events_aggregate?.aggregate?.count || 0;

	return (
		<div className="relative overflow-hidden">
			<ElemHeading
				title="Events"
				subtitle="Don't miss a beat. Here's your lineup for all of the industry's must attend events. Holding an event? Let us know"
			>
				{/* <ElemButton href="/" btn="dark" arrow className="mt-6">
						Submit event
					</ElemButton> */}
			</ElemHeading>

			<div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
				<ElemFeaturedEvents className="shadow" heading="Featured" />
			</div>

			<div className="max-w-7xl px-4 mx-auto mt-7 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow p-5">
					<h2 className="text-xl font-bold mb-2">All Events</h2>

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
							events?.map((event) => (
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
													{getFullAddress(event.location)}
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

					<Pagination
						shownItems={events?.length}
						totalItems={events_aggregate}
						page={page}
						itemsPerPage={limit}
						numeric
						onClickPrev={() => setPage(page - 1)}
						onClickNext={() => setPage(page + 1)}
						onClickToPage={(selectedPage) => setPage(selectedPage)}
					/>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: events } = await runGraphQl<GetEventsQuery>(GetEventsDocument, {
		offset: 0,
		limit: 50,
	});

	return {
		props: {
			metaTitle: "Web3 Events - EdgeIn.io",
			metaDescription:
				"Don't miss a beat. Here's your lineup for all of the industry's must attend events.",
			eventsCount: events?.events_aggregate.aggregate?.count || 0,
			initialEvents: events?.events || [],
		},
	};
};

export default Events;
