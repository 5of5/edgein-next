import React, { FC, useState } from 'react';
import { ElemCarouselWrap } from '@/components/elem-carousel-wrap';
import { ElemCarouselCard } from '@/components/elem-carousel-card';
import { GetSubEventsQuery } from '@/graphql/types';
import { ElemEventCard } from '../events/elem-event-card';
// import { useIntercom } from 'react-use-intercom';
import { ElemButton } from '@/components/elem-button';
import { LiveChatWidget, EventHandlerPayload } from "@livechat/widget-react";

type Props = {
  className?: string;
  eventName?: string;
  subEvents: GetSubEventsQuery['events'];
};

export const ElemSubEvents: FC<Props> = ({
  className,
  eventName,
  subEvents,
}) => {
  // const { showNewMessages } = useIntercom();
  function handleLiveChatEvent(event: EventHandlerPayload<"onNewEvent">) {
      console.log("LiveChatWidget.onNewEvent", event);
    }
  
    const [show, setShow] = useState<boolean>(false);
    const showNewMessages = (message: String) => {
      console.log(message)
      setShow(true);
    }

  return (
    <section className={`rounded-lg border border-gray-300 ${className}`}>
      {show && <LiveChatWidget
        license={process.env.NEXT_PUBLIC_LIVECHAT_LISCENCE || ''}
        visibility="maximized"
        onNewEvent={handleLiveChatEvent}
      />}
      <div className="flex flex-wrap items-center justify-between px-4 pt-2">
        <h2 className="text-lg font-medium">
          {eventName ? `Sub-events at ${eventName}` : 'Sub-events'}
        </h2>

        {subEvents && subEvents.length > 0 && (
          <ElemButton
            onClick={() =>
              showNewMessages(
                `Hi Mentibus, I'd like to add my sub-event to ${eventName}. Details:`,
              )
            }
            btn="default">
            Add sub-event
          </ElemButton>
        )}
      </div>

      {subEvents && subEvents.length > 0 ? (
        <ElemCarouselWrap>
          {subEvents.map((event: any) => {
            return (
              <ElemCarouselCard
                key={event.id}
                className={`p-4 basis-full sm:basis-1/2 lg:basis-1/3`}>
                <ElemEventCard event={event} />
              </ElemCarouselCard>
            );
          })}
        </ElemCarouselWrap>
      ) : (
        <div className="w-full p-4 text-center">
          <div className="text-gray-500">There are no sub-events.</div>
          <ElemButton
            btn="default"
            onClick={() =>
              showNewMessages(
                `Hi Mentibus, I'd like to add my event to ${eventName}. Details:`,
              )
            }
            className="mt-2">
            Add sub-event
          </ElemButton>
        </div>
      )}
    </section>
  );
};
