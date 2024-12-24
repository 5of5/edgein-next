import type { NextPage, GetStaticProps } from 'next';
import React, { useState, useEffect } from 'react';
import { runGraphQl } from '../utils';
import { useStateParams } from '@/hooks/use-state-params';
import { Pagination } from '@/components/pagination';
import {
  PlaceholderEventCard,
  PlaceholderTable,
} from '@/components/placeholders';
import moment from 'moment-timezone';
import { IconSortDashboard, IconGroup, IconTable } from '@/components/icons';
import {
  GetEventsDocument,
  GetEventsQuery,
  useGetEventsQuery,
  Events_Bool_Exp,
  Order_By,
  Events_Order_By,
} from '@/graphql/types';
import { onTrackView } from '@/utils/track';
import { useRouter } from 'next/router';
import { ElemFilter } from '@/components/filters/elem-filter';
import { processEventsFilters } from '@/components/filters/processor';
import { ElemEventCard } from '@/components/events/elem-event-card';
import { DashboardCategory, DeepPartial } from '@/types/common';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useUser } from '@/context/user-context';
import ElemLibrarySelector from '@/components/elem-library-selector';
import {
  ISO_DATE_FORMAT,
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
  TABLE_LAYOUT_LIMIT,
  TRENDING_CATEGORY_LIMIT,
} from '@/utils/constants';
import useLibrary from '@/hooks/use-library';
import useDashboardFilter from '@/hooks/use-dashboard-filter';
import { ElemAddFilter } from '@/components/filters/elem-add-filter';
import { ElemCategories } from '@/components/dashboard/elem-categories';
import useDashboardSortBy from '@/hooks/use-dashboard-sort-by';
import { ElemDropdown } from '@/components/elem-dropdown';
import { NextSeo } from 'next-seo';
import { ElemFiltersWrap } from '@/components/filters/elem-filters-wrap';
import { NoResults } from '@/components/companies/no-results';
import { EventsTable } from '@/components/events/elem-events-table';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';

type Props = {
  eventTabs: DashboardCategory[];
  eventsCount: number;
  initialEvents: GetEventsQuery['events'];
};

const Events: NextPage<Props> = ({ eventTabs, eventsCount, initialEvents }) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const { user } = useUser();
  const router = useRouter();
  const { selectedLibrary } = useLibrary();

  const isDisplaySelectLibrary =
    user?.email &&
    (SWITCH_LIBRARY_ALLOWED_EMAILS.includes(user.email) ||
      SWITCH_LIBRARY_ALLOWED_DOMAINS.some(domain =>
        user.email.endsWith(domain),
      ));

  const [tableLayout, setTableLayout] = useState(false);

  const [selectedTab, setSelectedTab] =
    useStateParams<DashboardCategory | null>(
      null,
      'statusTag',
      statusTag => (statusTag ? statusTag.value : ''),
      selectedStatusTag =>
        eventTabs[
          eventTabs.findIndex(
            statusTag => statusTag.value === selectedStatusTag,
          )
        ],
    );

  const [pageIndex, setPageIndex] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );

  const { selectedFilters, onChangeSelectedFilters, onSelectFilterOption } =
    useDashboardFilter({
      dateCondition: selectedTab?.value === 'past' ? 'past' : 'next',
      resetPage: () => setPageIndex(0),
    });

  const isSortDropdownVisible = ['past'].includes(selectedTab?.value || '');
  const limit = 50;
  const offset =
    !user?.entitlements.viewEmails && tableLayout ? 0 : limit * pageIndex;

  const defaultFilters: DeepPartial<Events_Bool_Exp>[] = [
    { slug: { _neq: '' } },
    { library: { _contains: selectedLibrary } },
  ];

  if (selectedTab?.value !== 'past') {
    if (selectedTab?.value === 'upcoming') {
      defaultFilters.push(
        {
          start_date: { _gte: moment().format(ISO_DATE_FORMAT) },
        },
        {
          start_date: { _lte: moment().add(7, 'days').format(ISO_DATE_FORMAT) },
        },
      );
    } else {
      defaultFilters.push({
        start_date: { _gte: moment().format(ISO_DATE_FORMAT) },
      });
    }
  }

  const filters: DeepPartial<Events_Bool_Exp> = {
    _and: defaultFilters,
  };

  useEffect(() => {
    if (!initialLoad) {
      setPageIndex(0);
    }
    if (initialLoad) {
      setInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  useEffect(() => {
    onTrackView({
      properties: filters,
      pathname: router.pathname,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  const onChangeTab = (tab: any) => {
    setSelectedTab(tab);
    onChangeSelectedFilters(null);
  };

  const layoutItems = [
    {
      id: 0,
      label: 'Grid view',
      value: 'grid',
      Icon: IconGroup,
      onClick: () => setTableLayout(false),
    },
    {
      id: 1,
      label: 'Table view',
      value: 'table',
      Icon: IconTable,
      onClick: () => setTableLayout(true),
    },
  ];

  /** Handle selected filter params */
  processEventsFilters(filters, selectedFilters, defaultFilters);

  if (selectedTab?.value === 'featured') {
    filters._and?.push({
      is_featured: { _eq: true },
    });
  }

  if (selectedTab?.value === 'Trending') {
    filters._and?.push({
      num_of_views: { _is_null: false },
    });
  }

  if (
    selectedTab?.value === 'upcoming' &&
    !selectedFilters?.eventDate?.condition
  ) {
    filters._and?.push({
      start_date: { _gte: selectedTab?.date },
    });
  }

  if (selectedTab?.value === 'past' && !selectedFilters?.eventDate?.condition) {
    filters._and?.push({
      start_date: { _lte: selectedTab?.date },
    });
  }

  const getLimit = () => {
    // limit shown companies on table layout for non-paid users
    if (tableLayout && !user?.entitlements.viewEmails) {
      return TABLE_LAYOUT_LIMIT;
    }

    if (selectedTab?.value === 'Trending') {
      return TRENDING_CATEGORY_LIMIT;
    }

    return limit;
  };

  const { orderByQuery, orderByParam, sortChoices } =
    useDashboardSortBy<Events_Order_By>({
      defaultSortBy: 'oldest',
      newestSortKey: 'start_date',
      oldestSortKey: 'start_date',
    });

  const defaultOrderBy = sortChoices.find(
    sortItem => sortItem.value === orderByParam,
  )?.id;

  const {
    data: eventsData,
    error,
    isLoading,
  } = useGetEventsQuery(
    {
      offset,
      limit: getLimit(),
      where: filters as Events_Bool_Exp,
      orderBy: orderByQuery,
    },
    { refetchOnWindowFocus: false },
  );

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const events = initialLoad ? initialEvents : eventsData?.events;
  const events_aggregate = initialLoad
    ? eventsCount
    : eventsData?.events_aggregate?.aggregate?.count || 0;

  const getTotalItems = () => {
    if (selectedTab?.value === 'Trending') {
      return TRENDING_CATEGORY_LIMIT;
    }

    return events_aggregate;
  };

  const onPreviousPage = () => {
    setPageIndex(pageIndex - 1);
  };
  const onNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const pageTitle =
    selectedTab?.value === 'upcoming'
      ? `${user ? `${selectedLibrary} events` : 'Events'} in the next 7 days`
      : `${selectedTab?.title || 'All'} ${user ? selectedLibrary : ''} events`;

  return (
    <>
      <NextSeo
        title={`${selectedLibrary} Events`}
        description={`The No. 1 Guide to ${selectedLibrary} Events in 2024, Don't miss a beat! Here's all of the industry's must attend events.`}
      />
      <DashboardLayout>
        <div className="relative">
          <ElemFiltersWrap resultsTotal={events_aggregate}>
            <ElemCategories
              categories={eventTabs}
              selectedCategory={selectedTab}
              onChangeCategory={onChangeTab}
            />
            <div className="hidden lg:block lg:ml-auto"></div>

           
              <div>
                <h3 className="mb-1 font-medium lg:hidden">Library</h3>
                <ElemLibrarySelector />
              </div>
       
            <div>
              <h3 className="mb-1 font-medium lg:hidden">View</h3>
              <ElemDropdown
                buttonClass="w-full"
                panelClass="w-full"
                ButtonIcon={tableLayout ? IconTable : IconGroup}
                items={layoutItems}
              />
            </div>

            <div>
              <h3 className="mb-1 font-medium lg:hidden">
                Location and Event Details
              </h3>
              <ElemAddFilter
                buttonClass="w-full"
                panelClass="w-full"
                resourceType="events"
                excludeFilters={
                  ['past', 'upcoming'].includes(selectedTab?.value ?? '')
                    ? ['eventDate']
                    : []
                }
                onSelectFilterOption={onSelectFilterOption}
              />
            </div>

            {selectedFilters && (
              <ElemFilter
                className="basis-full lg:order-last"
                resourceType="events"
                excludeFilters={
                  ['past', 'upcoming'].includes(selectedTab?.value ?? '')
                    ? ['eventDate']
                    : []
                }
                filterValues={selectedFilters}
                dateCondition={selectedTab?.value === 'past' ? 'past' : 'next'}
                onSelectFilterOption={onSelectFilterOption}
                onChangeFilterValues={onChangeSelectedFilters}
                onApply={(name, filterParams) => {
                  filters._and = defaultFilters;
                  onChangeSelectedFilters({
                    ...selectedFilters,
                    [name]: { ...filterParams, open: false },
                  });
                }}
                onClearOption={name => {
                  filters._and = defaultFilters;
                  onChangeSelectedFilters({
                    ...selectedFilters,
                    [name]: undefined,
                  });
                }}
                onReset={() => onChangeSelectedFilters(null)}
              />
            )}

            {isSortDropdownVisible && (
              <div>
                <h3 className="mb-1 font-medium lg:hidden">Sort</h3>
                <ElemDropdown
                  buttonClass="w-full"
                  ButtonIcon={IconSortDashboard}
                  defaultItem={defaultOrderBy}
                  items={sortChoices}
                />
              </div>
            )}
          </ElemFiltersWrap>

          <ElemInviteBanner className="mx-8 mt-2" />

          <div className="mx-8">
            <div className="flex justify-between py-8">
              <div className="text-4xl font-medium">{pageTitle}</div>
              {/* Removed in qol-ui-fixes */}
              {/* <ElemDropdown
                      ButtonIcon={IconSortDashboard}
                      defaultItem={defaultOrderBy}
                      items={sortChoices}
                    /> */}
            </div>

            {isLoading && !initialLoad ? (
              <>
                {tableLayout ? (
                  <div className="overflow-auto border-t rounded-t-lg border-x border-black/10">
                    <PlaceholderTable />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8 gap-x-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
                    {Array.from({ length: 9 }, (_, i) => (
                      <PlaceholderEventCard key={i} />
                    ))}
                  </div>
                )}
              </>
            ) : tableLayout && events?.length != 0 ? (
              <EventsTable
                events={events}
                pageNumber={pageIndex}
                itemsPerPage={getLimit()}
                shownItems={events?.length}
                totalItems={getTotalItems()}
                onClickPrev={onPreviousPage}
                onClickNext={onNextPage}
              />
            ) : events?.length != 0 ? (
              <>
                <div
                  data-testid="events"
                  className="grid grid-cols-1 gap-8 gap-x-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
                  {events?.map(event => (
                    <ElemEventCard key={event.id} event={event} />
                  ))}
                </div>

                <Pagination
                  shownItems={events?.length}
                  totalItems={getTotalItems()}
                  page={pageIndex}
                  itemsPerPage={getLimit()}
                  onClickPrev={onPreviousPage}
                  onClickNext={onNextPage}
                  onClickToPage={selectedPage => setPageIndex(selectedPage)}
                />
              </>
            ) : (
              <NoResults />
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const { data: events } = await runGraphQl<GetEventsQuery>(GetEventsDocument, {
    offset: 0,
    limit: 50,
    where: {
      _and: [{ slug: { _neq: '' } }, { library: { _contains: 'Web3' } }],
    },
    orderBy: [{ start_date: Order_By.Asc, name: Order_By.Asc }],
  });

  return {
    props: {
      eventTabs,
      eventsCount: events?.events_aggregate.aggregate?.count || 0,
      initialEvents: events?.events || [],
    },
    revalidate: 60 * 60 * 2,
  };
};

export default Events;

const eventTabs: DashboardCategory[] = [
  {
    title: 'Featured',
    value: 'featured',
    date: '',
    icon: '📣',
  },
  {
    title: 'Trending',
    value: 'Trending',
    date: '',
    icon: '🔥',
  },
  {
    title: 'Next 7 days',
    value: 'upcoming',
    date: moment().toISOString(),
    icon: '✨',
  },
  {
    title: 'Past',
    value: 'past',
    date: moment().subtract(1, 'days').toISOString(),
    icon: '🕸',
  },
];
