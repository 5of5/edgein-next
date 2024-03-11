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
import { ElemEventCard } from './elem-event-card';
import { Pagination } from '../pagination';
import { PlaceholderEventCard } from '../placeholders';
import { CardType } from '../companies/elem-company-card';
import { FilterInSectionType } from '../companies/elem-companies-by-filter-insection';
import { ElemButton } from '../elem-button';
import { useRouter } from 'next/router';
import { getHomepageEncodedURI } from '@/components/filters/processor';
import { ROUTES } from '@/routes';

type Props = {
  headingText: string;
  filters: DeepPartial<Events_Bool_Exp>;
  orderBy?: DeepPartial<Events_Order_By>;
  itemsPerPage: number;
  cardType?: CardType;
  filterInSectionType?: FilterInSectionType;
  onOpenUpgradeDialog: () => void;
  userCanUsePremiumFilter: boolean;
  isEnabledSeeAll?: boolean;
};

export const EventsByFilterInSection: FC<Props> = ({
  headingText,
  filters,
  itemsPerPage,
  orderBy,
  cardType = 'full',
  filterInSectionType = 'see-all',
  onOpenUpgradeDialog,
  userCanUsePremiumFilter,
  isEnabledSeeAll = true,
}) => {
  const router = useRouter();
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

  const { encodedFilters, encodedStatusTag, isPremiumFilter } =
    getHomepageEncodedURI(filters, orderBy);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
    return (
      <div className="mx-8 my-6 text-lg text-center">
        Sorry, we couldn&apos;t find any events today. Check back in tomorrow!
      </div>
    );
  }

  const { events, events_aggregate } = data;

  return (
    <div>
      <div className="mt-5 mb-3 text-lg font-medium">{headingText}</div>
      <div
        data-testid="personalizedCompanies"
        className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {events.map(event => (
          <ElemEventCard
            key={event.id}
            event={event as Events}
            type={cardType}
          />
        ))}
      </div>

      <div className="py-3">
        {filterInSectionType === 'pagination' && (
          <div className="px-4">
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
        )}

        {filterInSectionType === 'see-all' &&
          isEnabledSeeAll &&
          (events_aggregate.aggregate?.count ?? 0) > itemsPerPage && (
            <div className="flex justify-end py-3">
              <ElemButton
                onClick={() => {
                  if (isPremiumFilter && !userCanUsePremiumFilter) {
                    onOpenUpgradeDialog();
                    return;
                  }
                  router.push(
                    `${ROUTES.EVENTS}/?filters=${encodedFilters}&statusTag=${encodedStatusTag}`,
                  );
                }}
                btn="primary"
                size="sm"
              >
                See all
              </ElemButton>
            </div>
          )}
      </div>
    </div>
  );
};
