import React, { FC } from "react";
import { PlaceholderEventCard } from "@/components/placeholders";
import { ElemCarouselWrap } from "@/components/elem-carousel-wrap";
import { ElemCarouselCard } from "@/components/elem-carousel-card";
import {
	Events_Bool_Exp,
	GetEventsQuery,
	Order_By,
	useGetEventsQuery,
} from "@/graphql/types";
import { ElemEventCard } from "./elem-event-card";
import moment from "moment-timezone";
import useLibrary from "@/hooks/use-library";
import { DeepPartial } from "@/types/common";

type Props = {
	className?: string;
	heading?: string;
	itemsLimit?: number;
};

export const ElemFeaturedEvents: FC<Props> = ({
	className = "",
	heading,
	itemsLimit,
}) => {
	const { selectedLibrary } = useLibrary();

	const limit = itemsLimit ? itemsLimit : 33;
	const offset = null;

	const filters: DeepPartial<Events_Bool_Exp> = {
		_and: [
			{
				slug: { _neq: "" },
				is_featured: { _eq: true },
				library: { _contains: selectedLibrary },
				end_date: { _gte: moment().format("YYYY-MM-DD") },
			},
		],
	};

	const {
		data: eventsData,
		error,
		isLoading,
	} = useGetEventsQuery({
		offset,
		limit,
		order: Order_By.Asc,
		where: filters as Events_Bool_Exp,
	});

	const events: GetEventsQuery["events"] = eventsData?.events || [];

	return (
		<div className={`bg-white rounded-lg p-5 ${className}`}>
			{heading && <h2 className="text-xl font-bold">{heading}</h2>}
			{error ? (
				<h4>Error loading featured events</h4>
			) : isLoading ? (
				<>
					<div className="flex overflow-hidden -mx-3">
						{Array.from({ length: 3 }, (_, i) => (
							<div
								key={i}
								className="p-3 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
							>
								<PlaceholderEventCard />
							</div>
						))}
					</div>
				</>
			) : (
				events && (
					<ElemCarouselWrap>
						{events.map((event) => {
							return (
								<ElemCarouselCard
									key={event.id}
									className={`p-3 basis-full sm:basis-1/2 lg:basis-1/3`}
								>
									<ElemEventCard event={event} />
								</ElemCarouselCard>
							);
						})}
					</ElemCarouselWrap>
				)
			)}
		</div>
	);
};
