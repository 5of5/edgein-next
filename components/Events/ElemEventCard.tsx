import { FC } from "react";
import Link from "next/link";
import { GetEventsQuery } from "@/graphql/types";
import { getEventBanner, getFullAddress } from "@/utils/helpers";
import { values, isEmpty } from "lodash";
import { formatDate } from "@/utils";

type Props = {
	event: GetEventsQuery["events"][0];
	onClickType?: any;
};

export const ElemEventCard: FC<Props> = ({ event, onClickType }) => {
	const isEmptyLocation = values(event.location_json).every(isEmpty);

	return (
		<Link key={event.id} href={`/events/${event.slug}`}>
			<a
				key={event.id}
				className="flex flex-col box-border mx-auto h-full w-full cursor-pointer border border-black/10 rounded-lg transition-all hover:scale-102 hover:shadow"
			>
				<div className="relative z-0 flex items-center justify-center shrink-0 w-full h-32 mb-4 rounded-tl-lg rounded-tr-lg overflow-hidden shadow">
					<div
						className="absolute -z-10 top-0 right-0 bottom-0 left-0 object-cover max-w-full max-h-full bg-center bg-no-repeat bg-cover blur-2xl" // blur-[50px]
						style={{
							backgroundImage: `url(${
								event.banner?.url ||
								getEventBanner(event.location_json?.city)
							})`,
						}}
					></div>
					<img
						className="relative object-fit w-full max-w-full"
						src={
							event.banner?.url || getEventBanner(event.location_json?.city)
						}
						alt={event.name}
					/>
				</div>

				{event.start_date && (
					<p className="font-medium uppercase text-sm px-5 ">
						{event.start_date &&
							formatDate(event.start_date, {
								month: "short",
								day: "2-digit",
								year: "numeric",
								timeZone: event.timezone || undefined,
							})}

						{event.end_date && (
							<>
								&nbsp;&ndash;&nbsp;
								{formatDate(event.end_date, {
									month: "short",
									day: "2-digit",
									year: "numeric",
									timeZone: event.timezone || undefined,
								})}
							</>
						)}
					</p>
				)}

				<h3 className="text-2xl font-bold break-words min-w-0 px-5 sm:text-lg lg:text-xl group-hover:opacity-60">
					{event.name}
				</h3>

				<div className="grow px-5 pb-5">
					{event?.types?.length > 0 && (
						<div
							className="my-2 flex flex-wrap gap-2"
							onClick={(e) => e.stopPropagation()}
						>
							{event.types.map((type: string) => (
								<div
									key={type}
									onClick={(e) => {
										if (onClickType) {
											onClickType(e, type);
										}
									}}
									className={`shrink-0 bg-slate-200 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full cursor-pointer hover:bg-slate-300`}
								>
									{type}
								</div>
							))}
						</div>
					)}

					{(!isEmptyLocation || event.venue_name) && (
						<div className="mt-1 text-sm text-gray-400 break-words">
							{`${event.venue_name || ""}${
								event.venue_name && event.location_json ? " • " : ""
							}${getFullAddress(event.location_json)}`}
						</div>
					)}

					{(event.price || event.size) && (
						<div className="mt-1 text-sm text-gray-400 break-words">
							{event.price > 0
								? `Starts at $${event.price}`
								: event.price === 0
								? "Free"
								: ""}
							{event.price && event.size ? " • " : ""}
							{event.size && (
								<div className="inline capitalize">{event.size}</div>
							)}
						</div>
					)}
				</div>
			</a>
		</Link>
	);
};
