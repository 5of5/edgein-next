import React, { FC } from "react";
import { PlaceholderEventCard } from "@/components/Placeholders";
import { ElemCarouselWrap } from "@/components/ElemCarouselWrap";
import { ElemCarouselCard } from "@/components/ElemCarouselCard";
import {
	Events_Bool_Exp,
	Maybe,
  useGetEventsQuery,
} from "@/graphql/types";
import { ElemEventCard } from "../Events/ElemEventCard";

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

type Props = {
  className?: string;
	currentSlug: Maybe<string>;
	tag1?: string;
	tag2?: string;
};

export const ElemSimilarEvents: FC<Props> = ({
  className,
	currentSlug,
	tag1,
	tag2,
}) => {
	const limit = 12;
	const offset = null;

	const filters: DeepPartial<Events_Bool_Exp> = {
		_and: [
			{
				slug: { _neq: "" || currentSlug },
        _or: [
          { types: { _contains: tag1 } },
          { types: { _contains: tag2 } },
        ]
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
		where: filters as Events_Bool_Exp,
	});

  const events = eventsData?.events;

	return (
		<section className={`bg-white rounded-lg p-5 shadow ${className}`}>
			<h2 className="text-xl font-bold">Similar Events</h2>

			{error ? (
				<h4>Error loading similar events</h4>
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
						{events.map((event: any) => {
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
		</section>
	);
};
