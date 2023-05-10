import React, { FC } from "react";
import { useRouter } from "next/router";
import { ElemCarouselWrap } from "@/components/elem-carousel-wrap";
import { ElemCarouselCard } from "@/components/elem-carousel-card";
import { GetSubEventsQuery } from "@/graphql/types";
import { ElemEventCard } from "../events/elem-event-card";
import { useIntercom } from "react-use-intercom";
import { IconPlus } from "@/components/icons";
import { ElemButton } from "@/components/elem-button";

type Props = {
	className?: string;
	eventName?: string;
	subEvents: GetSubEventsQuery["events"];
};

export const ElemSubEvents: FC<Props> = ({
	className,
	eventName,
	subEvents,
}) => {
	const router = useRouter();

	const { showNewMessages } = useIntercom();

	const onClickType = (
		event: React.MouseEvent<HTMLDivElement>,
		type: string
	) => {
		event.stopPropagation();
		event.preventDefault();

		router.push(
			`/events/?filters=${encodeURIComponent(
				`{"eventType":{"tags":["${type}"]}}`
			)}`
		);
	};

	return (
		<section className={`bg-white rounded-lg p-5 shadow ${className}`}>
			<div className="flex flex-wrap items-center justify-between">
				<h2 className="text-xl font-bold">
					{eventName ? `Sub-events at ${eventName}` : "Sub-events"}
				</h2>

				<ElemButton
					onClick={() =>
						showNewMessages(
							`Hi EdgeIn, I'd like to add my event to ${eventName}. Details:`
						)
					}
					btn="purple"
					className="!pl-3"
				>
					<IconPlus className="w-5 h-5 mr-1" />
					Add your event
				</ElemButton>
			</div>
      {subEvents && subEvents.length > 0 ? (
        <ElemCarouselWrap>
				{subEvents.map((event: any) => {
					return (
						<ElemCarouselCard
							key={event.id}
							className={`p-3 basis-full sm:basis-1/2 lg:basis-1/3`}
						>
							<ElemEventCard event={event} onClickType={onClickType} />
						</ElemCarouselCard>
					);
				})}
			</ElemCarouselWrap>
      ) : (
        <div className="flex flex-col items-center justify-center lg:p-5">
          <div className="text-slate-600 lg:text-xl">
            There is no sub-events.
          </div>
        </div>
      )}
			
		</section>
	);
};
