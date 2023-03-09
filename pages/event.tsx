import React, { useEffect, useState, MutableRefObject, useRef } from "react";
import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemKeyInfo } from "@/components/ElemKeyInfo";
import { ElemTags } from "@/components/ElemTags";
import { runGraphQl } from "@/utils";
import { ElemTabBar } from "@/components/ElemTabBar";
import { ElemButton } from "@/components/ElemButton";
import { ElemSocialShare } from "@/components/ElemSocialShare";
import { ElemOrganizationActivity } from "@/components/ElemOrganizationActivity";
import {
	Events,
	Companies,
	GetEventsDocument,
	GetEventsQuery,
	useGetCompanyQuery,
	//Investments,
} from "@/graphql/types";
import { useAuth } from "@/hooks/useAuth";
import { sortBy } from "lodash";
import {
	formatDate,
	convertToInternationalCurrencySystem,
	numberWithCommas,
} from "@/utils";

type Props = {
	event: any; //Event
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Event: NextPage<Props> = (props: Props) => {
	const { user } = useAuth();
	const router = useRouter();
	const { companyId } = router.query;

	const [event, setEvent] = useState<any>(props.event); //<Event>

	const [overviewMore, setOverviewMore] = useState(false);
	const overviewDiv = useRef() as MutableRefObject<HTMLDivElement>;
	const [overviewDivHeight, setOverviewDivHeight] = useState(0);

	const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
	const speakersRef = useRef() as MutableRefObject<HTMLDivElement>;
	const sponsorsRef = useRef() as MutableRefObject<HTMLDivElement>;

	// useEffect(() => {
	// 	if (event.overview) {
	// 		setOverviewDivHeight(overviewDiv.current.scrollHeight);
	// 	}
	// }, [event]);

	if (!event) {
		return <h1>Not Found</h1>;
	}

	// Event tags
	//let eventTags: string[] = [];

	// if (event.tags) {
	// 	event.tags.map((tag: string, i: number) => [eventTags.push(tag)]);
	// }

	// const firstTag = event.tags ? event.tags[0] : "";
	// const secondTag = event.tags ? event.tags[1] : "";

	// Tabs
	const tabBarItems = [{ name: "Overview", ref: overviewRef }];
	if (event.speakers?.length > 0) {
		tabBarItems.push({ name: "Speakers", ref: speakersRef });
	}
	if (event.sponsors?.length > 0) {
		tabBarItems.push({ name: "Sponsors", ref: sponsorsRef });
	}

	return (
		<>
			<div className="w-full bg-gradient-to-b from-transparent to-white shadow pt-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="mb-4">
						{event.photo && (
							<div className="m-auto h-96 flex items-center justify-center rounded-[20px] overflow-hidden">
								<img
									className="h-auto w-full "
									src={event.photo}
									alt={event.name}
								/>
							</div>
						)}
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
						{event.tags?.length > 0 && (
							<ElemTags
								className="mt-4"
								resourceType={"events"}
								tags={event.tags}
							/>
						)}
					</div>

					<ElemTabBar
						className="mt-4 border-b-0"
						tabs={tabBarItems}
						resourceName={event.name}
						showDropdown={false}
					>
						<div className="space-x-2">
							<ElemSocialShare
								resourceName={event.name}
								resourceTags={event.tags}
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
							website={event.website}
							linkedIn={event.event_linkedin}
							twitter={event.twitter}
							location={event.location}
							locationJson={event.location_json}
							discord={event.discord}
						/>
					</div>
					<div className="col-span-8">
						<div className="w-full p-5 bg-white shadow rounded-lg">
							<h2 className="text-xl font-bold">Overview</h2>
							<p className="text-lg">
								Bring your ideas to life Space Warp is a jam-packed program
								leading up to the launch of Filecoin’s Virtual Machine on
								mainnet in March 2023. The program includes grants, a hackathon,
								a builders’ leaderboard, and more totalling over $400k in FIL
								tokens. Be among the first to build FVM and join the community
								showcase at the launch party early next year.{" "}
							</p>
						</div>
						<div className="mt-7 w-full p-5 bg-white shadow rounded-lg">
							<h2 className="text-xl font-bold">Activity</h2>
						</div>
					</div>
				</div>
			</div>

			{event.speakers?.length > 0 && (
				<div
					ref={speakersRef}
					className="mt-7 p-5 rounded-lg bg-white shadow"
					id="team"
				>
					Event Speakers
				</div>
			)}

			{event.sponsors?.length > 0 && (
				<div
					ref={sponsorsRef}
					className="mt-7 p-5 rounded-lg bg-white shadow"
					id="team"
				>
					Event Sponsors
				</div>
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	// const { data: events } = await runGraphQl<GetCompanyQuery>(
	// 	GetCompanyDocument,
	// 	{ slug: context.params?.companyId },
	// 	context.req.cookies
	// );

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
				photo: "https://source.unsplash.com/random/500×200/?city",
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
		],
	};

	// const { data: events } = await runGraphQl<GetEventsQuery>(GetEventsDocument, {
	// 	offset: 0,
	// 	limit: 50,
	// });

	if (!eventsData?.events[0]) {
		return {
			notFound: true,
		};
	}

	const event = eventsData?.events[0];

	let metaTitle = null;
	if (event.name) {
		metaTitle = event.name + ": Speakers, Sponsors, & Activity - EdgeIn.io";
	}
	let metaDescription = null;

	// if (event?.overview) {
	// 	metaDescription = event.overview;
	// }

	return {
		props: {
			metaTitle,
			metaDescription,
			event,
		},
	};
};

export default Event;
