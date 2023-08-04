import {
  Events,
  Events_Bool_Exp,
  Order_By,
  useGetEventsQuery,
} from '@/graphql/types';
import { DeepPartial } from '@/types/common';
import { FC } from 'react';
import { ElemEventCard } from '../events/elem-event-card';

type Props = {
  headingText: string;
  filters: DeepPartial<Events_Bool_Exp>;
  isTableView?: boolean;
};

export const EventsByFilter: FC<Props> = ({
  headingText,
  filters,
  isTableView,
}) => {
  const { data, isLoading, error } = useGetEventsQuery({
    offset: 0,
    limit: 8,
    order: Order_By.Desc,
    where: filters as Events_Bool_Exp,
  });

  if (isLoading || data?.events.length === 0) {
    return <></>;
  }

  return isTableView ? (
    <>WIP</>
  ) : (
    <>
      <div className="text-2xl font-bold ml-4">{headingText}</div>
      <div
        data-testid="personalizedCompanies"
        className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
      >
        {!isLoading &&
          !error &&
          data?.events.map(event => (
            <ElemEventCard
              key={event.id}
              event={event as Events}
            />
          ))}
      </div>
    </>
  );
};
