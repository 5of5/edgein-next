import React, { MutableRefObject, useRef, useState, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "react-query";
import { ElemKeyInfo } from "@/components/elem-key-info";
import { ElemTags } from "@/components/elem-tags";
import { runGraphQl } from "@/utils";
import { ElemTabBar } from "@/components/elem-tab-bar";
import { ElemButton } from "@/components/elem-button";
import { ElemPhoto } from "@/components/elem-photo";
import { ElemSocialShare } from "@/components/elem-social-share";
import {
	GetEventDocument,
	GetEventQuery,
	useGetEventQuery,
	useGetSubEventsQuery,
} from "@/graphql/types";
import { orderBy, sortBy } from "lodash";
import { ElemSpeakerGrid } from "@/components/event/elem-speaker-grid";
import { ElemSponsorGrid } from "@/components/event/elem-sponsor-grid";
import { ElemOrganizers } from "@/components/event/elem-organizers";
import { ElemEventActivity } from "@/components/event/elem-event-activity";
import { ElemSimilarEvents } from "@/components/event/elem-similar-events";
import { getEventBanner, randomImageOfCity } from "@/utils/helpers";
import Link from "next/link";
import parse from "html-react-parser";
import { newLineToP } from "@/utils/text";
import { useUser } from "@/context/user-context";
import { Popups } from "@/components/the-navbar";
import { ElemRequiredProfileDialog } from "@/components/elem-required-profile-dialog";
import { ElemSubEvents } from "@/components/event/elem-sub-events";
import moment from "moment-timezone";

type Props = {
	event: GetEventQuery["events"][0];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
	setShowPopup: React.Dispatch<React.SetStateAction<Popups>>;
};

const Event: NextPage<Props> = (props) => {
	const router = useRouter();
	const { eventId } = router.query;

	const { user } = useUser();

	const [event, setEvent] = useState<GetEventQuery["events"][0]>(props.event);

	const [isOpenLinkPersonDialog, setIsOpenLinkPersonDialog] =
		useState<boolean>(false);

	const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
	const organizersRef = useRef() as MutableRefObject<HTMLDivElement>;
	const speakersRef = useRef() as MutableRefObject<HTMLDivElement>;
	const sponsorsRef = useRef() as MutableRefObject<HTMLDivElement>;

	const { data: eventData, refetch } = useGetEventQuery({
		slug: eventId as string,
	});

	const { data: subEvents } = useGetSubEventsQuery(
		{
			parent_event_id: event?.id,
		},
		{ enabled: !!event.id }
	);

	useEffect(() => {
		if (eventData) setEvent(eventData.events[0]);
	}, [eventData]);

	const onOpenLinkPersonDialog = () => {
		setIsOpenLinkPersonDialog(true);
	};

	const onCloseLinkPersonDialog = () => {
		setIsOpenLinkPersonDialog(false);
	};

	const onClickSearchName = () => {
		onCloseLinkPersonDialog();
		props.setShowPopup("search");
	};

	const { mutate: onAddEventAttendee, isLoading: isLoadingGoingEvent } =
		useMutation(
			() =>
				fetch("/api/add-event-attendee/", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						eventId: event?.id,
					}),
				}),
			{
				onSuccess: async (response) => {
					if (response.status !== 200) {
						const err = await response.json();
						toast.custom(
							(t) => (
								<div
									className={`bg-red-600 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
										t.visible ? "animate-fade-in-up" : "opacity-0"
									}`}
								>
									{err?.message}
								</div>
							),
							{
								duration: 3000,
								position: "top-center",
							}
						);
					} else {
						refetch();
					}
				},
			}
		);

	const handleClickGoingEvent = () => {
		if (user?.person) {
			onAddEventAttendee();
		} else {
			onOpenLinkPersonDialog();
		}
	};

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

	const formatDateShown = (date: Date) => {
		let utcTime = date;
		const local_date = moment
			.utc(utcTime)
			.local()
			.format("YYYY-MM-DD HH:mm:ss");

		return moment(local_date).format("LL");
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
									}), url(${randomImageOfCity(event.location_json?.city)})`,
								}}
							></div>
							<img
								className="object-fit h-full w-full"
								src={
									event.banner?.url ||
									getEventBanner(event.location_json?.city, "1220x400")
								}
								alt={event.name}
								onError={(e) => {
									(e.target as HTMLImageElement).src = randomImageOfCity(
										event.location_json?.city
									);
									(e.target as HTMLImageElement).onerror = null; // prevents looping
								}}
							/>
						</div>
					</div>

					{event.start_date && (
						<div className="w-full inline py-1 font-medium uppercase text-lg text-slate-600">
							{formatDateShown(event?.start_date)}
							{event?.start_time && (
								<span className="pl-1">
									at {moment(event?.start_time, "HH:mm").format("hh:mmA")}
								</span>
							)}
							{event.end_date && ` – ${formatDateShown(event?.end_date)}`}
							{event?.end_time && (
								<span className="pl-1">
									at {moment(event?.end_time, "HH:mm").format("hh:mmA")}
								</span>
							)}
							{/* event.timezone */}
						</div>
					)}

					<div className="items-start justify-between lg:flex lg:gap-20">
						<h1 className="text-3xl font-bold md:text-5xl">{event.name}</h1>
						{attendees?.length > 0 && (
							<div className="self-center flex items-center gap-x-2 shrink-0">
								<ul className="flex -space-x-3">
									{attendees?.map((attendee) => (
										<li key={attendee.id}>
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
						className="flex-wrap gap-y-2 pb-2 mt-4 border-b-0 sm:flex-nowrap sm:gap-y-0 sm:pb-0"
						tabs={tabBarItems}
						resourceName={event.name}
						showDropdown={false}
					>
						<div className="flex items-center space-x-2">
							<ElemSocialShare
								resourceName={event.name}
								resourceTwitterUrl={event.twitter}
							/>
							{attendees.some(
								(item) => item.person?.id === user?.person?.id
							) ? (
								<ElemButton btn="primary">Joined</ElemButton>
							) : (
								<ElemButton
									btn="primary"
									onClick={handleClickGoingEvent}
									loading={isLoadingGoingEvent}
								>
									Going
								</ElemButton>
							)}
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
							className="sticky top-11"
							heading="Key Info"
							eventLink={event.link}
							// website={event.link}
							venue={event.venue_name}
							locationJson={event.location_json}
							price={event.price}
							attendees={event.size}
							twitter={event.twitter}
							discord={event.discord}
							instagram={event.instagram}
							facebook={event.facebook}
							telegram={event.telegram}
							attachments={event.attachments}
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
							<ElemEventActivity
								activities={sortedActivities}
								eventName={event.name}
							/>
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

				{subEvents?.events && subEvents.events.length > 0 && (
					<ElemSubEvents
						className="mt-7"
						eventName={event.name}
						subEvents={subEvents.events}
					/>
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

			<ElemRequiredProfileDialog
				isOpen={isOpenLinkPersonDialog}
				title="You have not linked your account to a profile on EdgeIn"
				content="Search your name and claim profile to be able to mark yourself as going to this event."
				onClose={onCloseLinkPersonDialog}
				onClickSearch={onClickSearchName}
			/>

			<Toaster />
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
