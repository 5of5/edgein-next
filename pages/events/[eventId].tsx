import React, { MutableRefObject, useRef } from "react";
import { NextPage, GetServerSideProps } from "next";
import { ElemKeyInfo } from "@/components/ElemKeyInfo";
import { ElemTags } from "@/components/ElemTags";
import { runGraphQl } from "@/utils";
import { ElemTabBar } from "@/components/ElemTabBar";
import { ElemButton } from "@/components/ElemButton";
import { ElemSocialShare } from "@/components/ElemSocialShare";
import { GetEventDocument, GetEventQuery } from "@/graphql/types";
import { sortBy } from "lodash";
import { formatDate } from "@/utils";
import { ElemSpeakerGrid } from "@/components/Event/ElemSpeakerGrid";
import { ElemSponsorGrid } from "@/components/Event/ElemSponsorGrid";
import { ElemEventActivity } from "@/components/Event/ElemEventActivity";
import { ElemSimilarEvents } from "@/components/Event/EventSimilarEvents";

type Props = {
	event: GetEventQuery["events"][0];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Event: NextPage<Props> = ({ event }) => {
	const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
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
	if (event.event_organization?.length > 0) {
		tabBarItems.push({ name: "Sponsors", ref: sponsorsRef });
	}

	const speakers = event.event_person?.filter(
		(item) => item.type === "speaker"
	);

	const sortedActivities =
		[...speakers, ...event.event_organization]
			?.slice()
			.sort((a: any, b: any) => {
				return (
					new Date(a?.created_date || "").getTime() -
					new Date(b?.created_date || "").getTime()
				);
			})
			.reverse() || [];

	return (
		<>
			<div className="w-full bg-gradient-to-b from-transparent to-white shadow pt-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="mb-4">
						<div className="m-auto h-52 sm:h-72 lg:h-96 flex items-center justify-center shrink-0 rounded-[20px] overflow-hidden">
							<img
								className="object-cover h-96 w-full max-w-full max-h-full"
								src={
									event.banner?.url ||
									"https://source.unsplash.com/random/500×200/?city"
								}
								alt={event.name}
							/>
						</div>
					</div>

					{event.start_date && (
						<div className="w-full inline-flex py-1 font-medium text-xl text-slate-500">
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
					<div className="flex items-start justify-between gap-20">
						<h1 className="text-4xl font-bold md:text-5xl">{event.name}</h1>
						<div className="self-center flex items-center gap-x-2 shrink-0">
							{/* <ul className="flex -space-x-3 overflow-hidden cursor-pointer">
								{event.attendees?.map((mem, index) => (
									<li key={mem.id}>
										{mem.user.person?.picture ? (
											<ElemPhoto
												photo={mem.user.person?.picture}
												wrapClass={`flex items-center justify-center aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8 relative z-${
													(3 - index) * 10
												} relative`}
												imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
												imgAlt={mem.user.display_name}
											/>
										) : (
											<div
												className={`flex items-center justify-center aspect-square w-8 rounded-full bg-slate-300 text-dark-500 border border-gray-50 text-lg capitalize relative  z-${
													(3 - index) * 10
												}`}
											>
												{mem.user.display_name?.charAt(0)}
											</div>
										)}
									</li>
								))}
							</ul>
							<span className="font-bold">{event.attendees?.length}</span> */}
						</div>
					</div>
					<div>
						{event.types?.length > 0 && (
							<ElemTags
								className="mt-4"
								resourceType={"events"}
								tags={event.types}
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
							<ElemButton btn="white">Going</ElemButton>
							<ElemButton btn="primary">RSVP</ElemButton>
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
							locationJson={event.location_json}
							twitter={event.twitter}
							discord={event.discord}
						/>
					</div>
					<div className="col-span-8">
						<div className="w-full p-5 bg-white shadow rounded-lg">
							<h2 className="text-xl font-bold">Overview</h2>
							<p className="text-lg text-slate-600">{event.notes}</p>
						</div>
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

				{event.event_organization?.length > 0 && (
					<div
						ref={sponsorsRef}
						className="mt-7 p-5 rounded-lg bg-white shadow"
						id="sponsors"
					>
						<ElemSponsorGrid organizations={event.event_organization} />
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

	if (event?.notes) {
		metaDescription = event.notes;
	}

	return {
		props: {
			metaTitle,
			metaDescription,
			event,
		},
	};
};

export default Event;
