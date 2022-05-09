import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ElemButton } from "../components/ElemButton";
import { ElemHeading } from "../components/ElemHeading";
import { runGraphQl } from "../utils";

type Props = {
	events: Record<string, any>[];
};

const Events: NextPage<Props> = (props) => {
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
						<div className="w-full flex flex-col sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-5">
							{props.events.map((event) => (
								<div
									key={event.id}
									className="
                          bg-white
                          rounded-lg
                          overflow-hidden
                          cursor-pointer
                          p-7
                          flex flex-col
                          group
                          transition
                          duration-300
                          ease-in-out
                          transform
                          hover:scale-102 hover:shadow-lg
                          focus:ring focus:ring-primary-300
                        "
								>
									<h3
										className="
                            text-2xl
                            font-bold
                            text-dark-700
                            break-words
                            min-w-0
                            sm:text-lg
                            lg:text-xl
                            group-hover:opacity-60
                          "
									>
										{event.event}
									</h3>
									{event.date && (
										<p className="grow mb-4 text-dark-400 font-medium">
											{event.date}
											{event.location && (
												<span className="px-1 font-bold">&middot;</span>
											)}
											{event.location}
										</p>
									)}
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
		'{ events( _filter: {slug: {_ne: ""}}) { id, event, date, location }}'
	);

	return {
		props: {
			events: events.events,
		},
	};
};

export default Events;
