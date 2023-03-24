import React, { MutableRefObject, useRef } from "react";
import { NextPage, GetServerSideProps } from "next";
import { ElemKeyInfo } from "@/components/ElemKeyInfo";
import { ElemTags } from "@/components/ElemTags";
import { runGraphQl } from "@/utils";
import { ElemTabBar } from "@/components/ElemTabBar";
import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemSocialShare } from "@/components/ElemSocialShare";
import { GetEventDocument, GetEventQuery } from "@/graphql/types";
import { orderBy, sortBy } from "lodash";
import { formatDate, formatTime } from "@/utils";
import { ElemSpeakerGrid } from "@/components/Event/ElemSpeakerGrid";
import { ElemSponsorGrid } from "@/components/Event/ElemSponsorGrid";
import { ElemOrganizers } from "@/components/Event/ElemOrganizers";
import { ElemEventActivity } from "@/components/Event/ElemEventActivity";
import { ElemSimilarEvents } from "@/components/Event/EventSimilarEvents";
import { getEventBanner } from "@/utils/helpers";
import Link from "next/link";
import parse from "html-react-parser";
import { newLineToP } from "@/utils/text";

type Props = {
	event: GetEventQuery["events"][0];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Event: NextPage<Props> = ({ event }) => {
	const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
	const organizersRef = useRef() as MutableRefObject<HTMLDivElement>;
	const speakersRef = useRef() as MutableRefObject<HTMLDivElement>;
	const sponsorsRef = useRef() as MutableRefObject<HTMLDivElement>;

	if (!event) {
		return <h1>Not Found</h1>;
	}

	const firstTag = event.types ? event.types[0] : "";
	const secondTag = event.types ? event.types[1] : "";

	// Tabs
	const tabBarItems = [{ name: "Overview", ref: overviewRef }];
	if (event.event_person?.some((item) => item.type === "speaker")) {
		tabBarItems.push({ name: "Speakers", ref: speakersRef });
	}
	if (event.event_organization?.some((item) => item.type === "sponsor")) {
		tabBarItems.push({ name: "Sponsors", ref: sponsorsRef });
	}

	const speakers = event.event_person?.filter(
		(item) => item.type === "speaker"
	);

	const attendees = event.event_person?.filter(
		(item) => item.type === "attendee"
	);

	const sponsors = event.event_organization?.filter(
		(item) => item.type === "sponsor"
	);

	const organizers = event.event_organization?.filter(
		(item) => item.type === "organizer"
	);

	const sortedActivities = orderBy(
		[...event.event_person, ...event.event_organization]?.slice() || [],
		["created_at"],
		["desc"]
	);

	const customDateFormat = (
		date: string,
		time?: string,
		timezone?: string | null
	) => {
		const theDate = formatDate(date, {
			month: "short",
			day: "2-digit",
			year: "numeric",
			timeZone: timezone || undefined,
			//timeZoneName: "short",
		});

		if (!time) {
			return theDate;
		}

		const newEventDateWithTime = new Date(`${date} ${time}`);

		const theTime = formatTime(newEventDateWithTime, {
			hour: "2-digit",
			minute: "2-digit",
			timeZone: timezone || undefined,
		});

		return `${theDate} at ${theTime}`;
	};
	return (
		<>
			<div className="w-full bg-gradient-to-b from-transparent to-white shadow pt-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="mb-4">
						<div className="relative m-auto h-auto max-h-[410px] flex items-center justify-center shrink-0 ring-1 ring-slate-200 rounded-[20px] overflow-hidden ">
							<div
								className="absolute top-0 right-0 bottom-0 left-0 object-cover max-w-full max-h-full -z-10 bg-center bg-no-repeat bg-cover blur-2xl" // blur-[50px]
								style={{
									backgroundImage: `url(${
										event.banner?.url ||
										getEventBanner(event.location_json?.city)
									})`,
								}}
							></div>
							<img
								className="object-fit h-full w-full"
								src={
									event.banner?.url ||
									getEventBanner(event.location_json?.city, "1220x400")
								}
								alt={event.name}
							/>
						</div>
					</div>

					{event.start_date && (
						<div className="w-full inline-flex py-1 font-medium uppercase text-lg text-slate-600">
							{customDateFormat(
								event.start_date,
								event.start_time,
								event.timezone
							)}

							{event.end_date &&
								` – ${customDateFormat(
									event.end_date,
									event.end_time,
									event.timezone
								)}`}
						</div>
					)}

					<div className="items-start justify-between lg:flex lg:gap-20">
						<h1 className="text-3xl font-bold md:text-5xl">{event.name}</h1>
						{attendees?.length > 0 && (
							<div className="self-center flex items-center gap-x-2 shrink-0">
								<ul className="flex -space-x-3">
									{attendees?.map((attendee, index) => (
										<li
											key={attendee.id}
											className="relative"
											style={{
												zIndex: 1000 - index,
											}}
										>
											<Link href={`/people/${attendee.person?.slug}`}>
												<a>
													{attendee.person?.picture ? (
														<ElemPhoto
															photo={attendee.person.picture}
															wrapClass={`flex items-center justify-center aspect-square shrink-0 bg-white rounded-full w-8 shadow`}
															imgClass="object-contain w-full h-full rounded-full  border border-gray-50"
															imgAlt={attendee.person?.name}
														/>
													) : (
														<div className="flex items-center justify-center aspect-square w-8 rounded-full bg-slate-300 text-dark-500 border border-gray-50 text-lg capitalize">
															{attendee.person?.name?.charAt(0)}
														</div>
													)}
												</a>
											</Link>
										</li>
									))}
								</ul>
								<span className="font-bold">{attendees?.length}</span>
							</div>
						)}
					</div>
					<div>
						{event.types?.length > 0 && (
							<ElemTags
								className="mt-4"
								resourceType={"events"}
								tags={event.types}
								filter="eventType"
							/>
						)}
					</div>

					<ElemTabBar
						className="mt-4 border-b-0"
						tabs={tabBarItems}
						resourceName={event.name}
						showDropdown={false}
					>
						<div className="flex items-center space-x-2">
							<ElemSocialShare
								resourceName={event.name}
								resourceTags={event.types}
								resourceTwitterUrl={event.twitter}
								resourceType={"events"}
							/>
							{/* <ElemButton btn="white">Going</ElemButton>
							<ElemButton btn="primary">RSVP</ElemButton> */}
						</div>
					</ElemTabBar>
				</div>
			</div>

			<div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
				<div
					className="mt-7 lg:grid lg:grid-cols-11 lg:gap-7"
					ref={overviewRef}
					id="overview"
				>
					<div className="col-span-3">
						<ElemKeyInfo
							className="sticky top-4"
							heading="Key Info"
							website={event.link}
							venue={event.venue_name}
							locationJson={event.location_json}
							price={event.price}
							attendees={event.size}
							twitter={event.twitter}
							discord={event.discord}
							instagram={event.instagram}
							facebook={event.facebook}
							telegram={event.telegram}
						/>
					</div>
					<div className="col-span-8">
						{event.overview && (
							<div className="mt-7 w-full p-5 bg-white shadow rounded-lg">
								<h2 className="text-xl font-bold w-full mb-2 border-b border-black/10">
									Overview
								</h2>
								<div className="text-lg text-slate-600 prose">
									{parse(newLineToP(event.overview))}
								</div>
							</div>
						)}

						{organizers?.length > 0 && (
							<div
								ref={organizersRef}
								className="mt-7 p-5 bg-white shadow rounded-lg"
								id="organizers"
							>
								<ElemOrganizers organizations={organizers} />
							</div>
						)}

						<div className="mt-7 w-full p-5 bg-white shadow rounded-lg">
							<ElemEventActivity activities={sortedActivities} />
						</div>
					</div>
				</div>

				{speakers?.length > 0 && (
					<div
						ref={speakersRef}
						className="mt-7 p-5 rounded-lg bg-white shadow"
						id="speakers"
					>
						<ElemSpeakerGrid people={speakers} />
					</div>
				)}

				{sponsors.length > 0 && (
					<div
						ref={sponsorsRef}
						className="mt-7 p-5 rounded-lg bg-white shadow"
						id="sponsors"
					>
						<ElemSponsorGrid organizations={sponsors} />
					</div>
				)}
				{event.types && (
					<ElemSimilarEvents
						className="mt-7"
						currentSlug={event.slug}
						tag1={firstTag}
						tag2={secondTag}
					/>
				)}
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data: events } = await runGraphQl<GetEventQuery>(
		GetEventDocument,
		{ slug: context.params?.eventId },
		context.req.cookies
	);

	if (!events?.events[0]) {
		return {
			notFound: true,
		};
	}

	const event = sortBy(events?.events, "status").reverse()[0];

	let metaTitle = null;
	if (event.name) {
		metaTitle = event.name + ": Speakers, Sponsors, & Activity - EdgeIn.io";
	}
	let metaDescription = null;

	if (event?.overview) {
		metaDescription = event.overview;
	}

	let metaImage = null;
	if (event.banner?.url) {
		metaImage = event.banner?.url ? event.banner?.url : `/social.jpg`;
	}

	return {
		props: {
			metaImage,
			metaTitle,
			metaDescription,
			event,
		},
	};
};

export default Event;
