import React, { FC } from "react";
import { useRouter } from "next/router";
import { ElemCarouselWrap } from "@/components/elem-carousel-wrap";
import { ElemCarouselCard } from "@/components/elem-carousel-card";
import { GetSubEventsQuery } from "@/graphql/types";
import { ElemEventCard } from "../events/elem-event-card";

type Props = {
  className?: string;
  subEvents: GetSubEventsQuery["events"];
};

export const ElemSubEvents: FC<Props> = ({ className, subEvents }) => {
  const router = useRouter();

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
      <h2 className="text-xl font-bold">Sub-events</h2>
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
    </section>
  );
};
