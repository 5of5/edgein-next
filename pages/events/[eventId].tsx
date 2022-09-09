import type { NextPage, GetStaticProps, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ElemButton } from "../../components/ElemButton";
import { runGraphQl, formatDate, truncateWords } from "../../utils";

type Props = {
	event: Record<string, any>;
};

const Event: NextPage<Props> = ({ event }) => {
	const router = useRouter();
	const { eventId } = router.query;

	// const goBack = () => router.back();

	//const event = props.event;

	if (!event) {
		return <h1>Not Found</h1>;
	}

	return (
		<div>
			<div className="absolute w-full z-0 bg-gray-200 overflow-hidden">
				<div className="relative text-white object-cover h-96 w-full blur-lg brightness-90">
					Event image as bg
				</div>
			</div>

			<div className="relative z-10 pt-10 mb-44 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm rounded-tl-lg rounded-tr-lg overflow-hidden">
					<div className="flex flex-col md:grid md:grid-cols-3">
						<div className="col-span-2 h-72 sm:h-96">
							<div className="object-contain w-full h-full bg-dark-700"></div>
						</div>
						<div className="col-span-1">
							<div className="p-6 flex flex-col h-full justify-between">
								<div>
									{event.startDate && (
										<div>
											<time
												className="inline-block text-center shadow-md rounded-md border border-gray-50 px-3 py-1"
												dateTime={event.startDate}
											>
												<p className="uppercase">
													{formatDate(event.startDate, {
														month: "short",
													})}
												</p>
												<p className="text-xl">
													{formatDate(event.startDate, {
														day: "2-digit",
													})}
												</p>
											</time>
										</div>
									)}
									<h1 className="text-3xl my-4 font-bold">{event.event}</h1>

									{event.description && (
										<p className="text-dark-400">
											{truncateWords(event.description)}
										</p>
									)}
								</div>
								{/* <div className="mt-auto text-lg text-dark-400">$99</div> */}
							</div>
						</div>
					</div>

					<div className="flex flex-col p-3 border-y border-gray-200 md:grid md:grid-cols-3 gap-5 items-center">
						<div className="col-span-2">
							{/* Event size */}
							{event.eventSizeAttendeesSponsorExhibition && (
								<>{event.eventSizeAttendeesSponsorExhibition}</>
							)}
						</div>
						<div className="col-span-1">
							<ElemButton btn="dark" arrow>
								Event website
							</ElemButton>
						</div>
					</div>

					<div className="flex flex-col md:grid md:grid-cols-3 gap-5 py-14 px-6">
						<div className="col-span-2 text-xl text-gray-500">
							{event.description && <>{event.description}</>}
						</div>

						<div className="col-span-1">
							<h3 className="font-bold">Dates</h3>
							{event.startDate ? (
								<p>
									{formatDate(event.startDate, {
										weekday: "long",
										month: "long",
										day: "2-digit",
									})}

									{event.endDate && (
										<>
											<span className="px-1">&ndash;</span>
											{formatDate(event.endDate, {
												weekday: "long",
												month: "long",
												day: "2-digit",
											})}
										</>
									)}
								</p>
							) : (
								<p className="empty">TBD</p>
							)}

							<h3 className="font-bold mt-6">Location</h3>
							{event.location ? (
								<p>{event.location}</p>
							) : (
								<p className="empty">TBD</p>
							)}
						</div>
					</div>

					{/* <div className="mt-14 py-6 px-6">
						<h2 className="text-3xl font-bold">Speakers</h2>
						<div className="flex flex-col md:grid md:grid-cols-4 gap-5 mt-3 w-full">
							<div className="border border-dark-100 p-6 rounded-lg transition-all hover:bg-white hover:shadow-md hover:-translate-y-1">
								Speaker image
								<h3 className="font-bold text-center text-xl mt-2">
									Speaker Name
								</h3>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};

// export async function getStaticPaths() {
// 	return {
// 		paths: [],
// 		fallback: true, // false or 'blocking'
// 	}
// /*	const {
// 		data: events,
// 	} = await runGraphQl<{events?:{slug:string}[]}>("{ events { slug }}");

// 	return {
// 		paths: events?.events?.
// 			filter((ev: { slug: string }) => ev.slug)
// 			.map((ev: { slug: string }) => ({ params: { eventId: ev.slug } })),
// 		fallback: true, // false or 'blocking'
// 	};
// */	
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
	const gql = `{
    events(slug: "${context.params?.eventId}") {
      id
      event
	  description
      slug
      date
	  startDate
	  endDate
	  eventSizeAttendeesSponsorExhibition
	  location
    }
  }
`;
	const { data: events } = await runGraphQl<{events:Record<string, any>[]}>(gql);

	if (!(events && events.events && events.events[0])) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			event: events.events[0],
		},
	};
};

export default Event;
