import React, { FC, MouseEvent } from 'react';
import { PlaceholderEventCard } from '@/components/placeholders';
import { ElemCarouselWrap } from '@/components/elem-carousel-wrap';
import { ElemCarouselCard } from '@/components/elem-carousel-card';
import { useRouter } from 'next/router';
import {
  Events_Bool_Exp,
  Events_Order_By,
  Maybe,
  Order_By,
  useGetEventsQuery,
} from '@/graphql/types';
import { ElemEventCard } from '../events/elem-event-card';
import useLibrary from '@/hooks/use-library';
import { DeepPartial } from '@/types/common';

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

  const router = useRouter();

  const { selectedLibrary } = useLibrary();

  const filters: DeepPartial<Events_Bool_Exp> = {
    _and: [
      {
        slug: { _neq: '' || currentSlug },
        library: { _contains: selectedLibrary },
        _or: [{ types: { _contains: tag1 } }, { types: { _contains: tag2 } }],
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
    orderBy: [{ start_date: Order_By.Desc } as Events_Order_By],
    where: filters as Events_Bool_Exp,
  });

  const events = eventsData?.events;

  const tagOnClick = (event: MouseEvent<HTMLButtonElement>, type: string) => {
    event.stopPropagation();
    event.preventDefault();

    router.push(
      `/events/?filters=${encodeURIComponent(
        `{"eventType":{"tags":["${type}"]}}`,
      )}`,
    );
  };

  return (
    <section className={`border border-gray-300 rounded-lg ${className}`}>
      <h2 className="text-lg font-medium px-4 pt-2">Similar Events</h2>

      {error ? (
        <h4>Error loading similar events</h4>
      ) : isLoading ? (
        <>
          <div className="flex overflow-hidden -mx-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="p-4 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
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
                  className={`p-4 basis-full sm:basis-1/2 lg:basis-1/3`}
                >
                  <div className="w-full max-w-full">
                    <ElemEventCard event={event} tagOnClick={tagOnClick} />
                  </div>
                </ElemCarouselCard>
              );
            })}
          </ElemCarouselWrap>
        )
      )}
    </section>
  );
};
