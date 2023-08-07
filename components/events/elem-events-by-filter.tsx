import {
  Events,
  Events_Bool_Exp,
  Order_By,
  useGetEventsQuery,
} from '@/graphql/types';
import usePagination from '@/hooks/use-pagination';
import { DeepPartial } from '@/types/common';
import { times } from 'lodash';
import { FC } from 'react';
import { ElemEventCard } from '../events/elem-event-card';
import { Pagination } from '../pagination';
import { PlaceholderEventCard } from '../placeholders';

type Props = {
  headingText: string;
  filters: DeepPartial<Events_Bool_Exp>;
  itemsPerPage: number;
  tagOnClick: any;
};

export const EventsByFilter: FC<Props> = ({
  headingText,
  filters,
  itemsPerPage,
  tagOnClick,
}) => {
  const { page, setPage, nextPage, previousPage } = usePagination();

  const { data, isLoading, error } = useGetEventsQuery({
    offset: page * itemsPerPage,
    limit: itemsPerPage,
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

  if (
    error ||
    !data?.events ||
    !data?.events_aggregate ||
    data.events.length === 0
  ) {
    return <></>;
  }

  const { events, events_aggregate } = data;

  return (
    <div className="mb-16">
      <div className="text-2xl font-semibold ml-4">{headingText}</div>
      <div
        data-testid="personalizedCompanies"
        className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-16"
      >
        {events.map(event => (
          <ElemEventCard
            key={event.id}
            event={event as Events}
            tagOnClick={tagOnClick}
          />
        ))}
      </div>
      
      <div className="mx-4 mt-4">
        <Pagination
          shownItems={events.length}
          totalItems={events_aggregate.aggregate?.count ?? 0}
          page={page}
          itemsPerPage={itemsPerPage}
          onClickPrev={previousPage}
          onClickNext={nextPage}
          onClickToPage={selectedPage => setPage(selectedPage)}
        />
      </div>
    </div>
  );
};
