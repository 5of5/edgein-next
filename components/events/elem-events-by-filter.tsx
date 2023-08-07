import {
  Events,
  Events_Bool_Exp,
  Order_By,
  useGetEventsQuery,
} from '@/graphql/types';
import { DeepPartial } from '@/types/common';
import { times } from 'lodash';
import { FC } from 'react';
import { ElemEventCard } from '../events/elem-event-card';
import { PlaceholderEventCard } from '../placeholders';

type Props = {
  headingText: string;
  tagOnClick: any;
  filters: DeepPartial<Events_Bool_Exp>;
};

export const EventsByFilter: FC<Props> = ({
  headingText,
  filters,
  tagOnClick,
}) => {
  const { data, isLoading, error } = useGetEventsQuery({
    offset: 0,
    limit: 8,
    // @ts-expect-error this should work
    orderBy: [{ updated_at: Order_By.Desc }],
    where: filters as Events_Bool_Exp,
  });

  if (isLoading) {
    return (
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-16">
        {times(4, index => (
          <PlaceholderEventCard key={index} />
        ))}
      </div>
    );
  }

  if (isLoading || data?.events.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className="text-2xl font-semibold ml-4">{headingText}</div>
      <div
        data-testid="personalizedCompanies"
        className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-16"
      >
        {!isLoading &&
          !error &&
          data?.events.map(event => (
            <ElemEventCard
              key={event.id}
              event={event as Events}
              tagOnClick={tagOnClick}
            />
          ))}
      </div>
    </>
  );
};
