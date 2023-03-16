import { FC } from "react";
import Link from "next/link";
import { GetEventsQuery } from "@/graphql/types";
import { getFullAddress } from "@/utils/helpers";
import { values, isEmpty } from "lodash";
import { formatDate } from "@/utils";
import { ElemPhoto } from "@/components/ElemPhoto";

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
				className="flex flex-col mx-auto w-full p-5 cursor-pointer border border-black/10 rounded-lg transition-all hover:scale-102 hover:shadow"
			>
				<ElemPhoto
					photo={
						event.banner || {
							url: "https://source.unsplash.com/random/500×200/?city",
						}
					}
					wrapClass="-mt-5 -mx-5 h-40 flex items-center justify-center shrink-0 rounded-tl-lg rounded-tr-lg overflow-hidden"
					imgClass="object-cover h-40 w-full max-w-full max-h-full"
					imgAlt={event.name}
					placeholderClass="text-slate-300"
				/>

				<h3 className="mt-4 text-2xl font-bold break-words min-w-0 sm:text-lg lg:text-xl group-hover:opacity-60">
					{event.name}
				</h3>

				<div className="grow">
					{event.start_date && (
						<p className="font-medium">
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

				{/* <div>
					<ElemButton className="pl-0 pr-0" btn="transparent" arrow>
						View
					</ElemButton>
				</div> */}
			</a>
		</Link>
	);
};
