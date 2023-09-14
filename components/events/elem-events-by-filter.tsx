import {
  Events,
  Events_Bool_Exp,
  Events_Order_By,
  Order_By,
  useGetEventsQuery,
} from '@/graphql/types';
import usePagination from '@/hooks/use-pagination';
import { DeepPartial } from '@/types/common';
import { times } from 'lodash';
import { FC } from 'react';
import { ElemFilter } from '../elem-filter';
import { ElemEventCard } from '../events/elem-event-card';
import { Pagination } from '../pagination';
import { PlaceholderEventCard } from '../placeholders';
import { CardType } from '../companies/elem-company-card';

type Props = {
  headingText: string;
  filters: DeepPartial<Events_Bool_Exp>;
  orderBy?: DeepPartial<Events_Order_By>;
  itemsPerPage: number;
  tagOnClick: any;
  cardType?: CardType;
};

export const EventsByFilter: FC<Props> = ({
  headingText,
  filters,
  itemsPerPage,
  tagOnClick,
  orderBy,
  cardType = 'full',
}) => {
  const { page, setPage, nextPage, previousPage } = usePagination();

  const { data, isLoading, error } = useGetEventsQuery(
    {
      offset: page * itemsPerPage,
      limit: itemsPerPage,
      // @ts-expect-error this should work
      orderBy: [orderBy ?? { updated_at: Order_By.Desc }],
      where: filters as Events_Bool_Exp,
    },
    { refetchOnWindowFocus: false },
  );

  if (isLoading) {
    return (
      <div className="grid gap-8 gap-x-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
    <div>
      <div className="text-4xl font-medium my-8">{headingText}</div>
      <div
        data-testid="personalizedCompanies"
        className="grid gap-8 gap-x-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {events.map(event => (
          <ElemEventCard
            key={event.id}
            event={event as Events}
            type={cardType}
          />
        ))}
      </div>

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
  );
};
