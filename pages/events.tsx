import type { NextPage, GetStaticProps } from 'next';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ElemButton } from '../components/elem-button';
import { runGraphQl } from '../utils';
import { useStateParams } from '@/hooks/use-state-params';
import { Pagination } from '@/components/pagination';
import { PlaceholderEventCard } from '@/components/placeholders';
import moment from 'moment-timezone';
import { IconSearch, IconAnnotation } from '@/components/icons';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
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
import { ElemFilter } from '@/components/elem-filter';
import { processEventsFilters } from '@/utils/filter';
import { ElemEventCard } from '@/components/events/elem-event-card';
import { useIntercom } from 'react-use-intercom';
import { DashboardCategory, DeepPartial } from '@/types/common';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useUser } from '@/context/user-context';
import ElemLibrarySelector from '@/components/elem-library-selector';
import {
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
} from '@/utils/constants';
import useLibrary from '@/hooks/use-library';
import { ElemDropdown } from '@/components/elem-dropdown';
import useDashboardSortBy from '@/hooks/use-dashboard-sort-by';
import useDashboardFilter from '@/hooks/use-dashboard-filter';
import { ElemAddFilter } from '@/components/elem-add-filter';
import { getPersonalizedData } from '@/utils/personalizedTags';
import { EventsByFilter } from '@/components/events/elem-events-by-filter';
import { ElemCategories } from '@/components/dashboard/elem-categories';

const ITEMS_PER_PAGE = 8;

type Props = {
  eventTabs: DashboardCategory[];
  eventsCount: number;
  initialEvents: GetEventsQuery['events'];
};

const Events: NextPage<Props> = ({ eventTabs, eventsCount, initialEvents }) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const { user } = useUser();

  const personalizedTags = getPersonalizedData({ user });

  const router = useRouter();
  const { selectedLibrary } = useLibrary();

  const isDisplaySelectLibrary =
    user?.email &&
    (SWITCH_LIBRARY_ALLOWED_EMAILS.includes(user.email) ||
      SWITCH_LIBRARY_ALLOWED_DOMAINS.some(domain =>
        user.email.endsWith(domain),
      ));

  const { showNewMessages } = useIntercom();

  const [selectedTab, setSelectedTab] =
    useStateParams<DashboardCategory | null>(
      null,
      'tab',
      statusTag => (statusTag ? eventTabs.indexOf(statusTag).toString() : ''),
      index => eventTabs[Number(index)],
    );

  const { selectedFilters, onChangeSelectedFilters, onSelectFilterOption } =
    useDashboardFilter();

  const [page, setPage] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );
  const limit = 50;
  const offset = limit * page;

  const defaultFilters = [
    { slug: { _neq: '' } },
    { library: { _contains: selectedLibrary } },
  ];

  const filters: DeepPartial<Events_Bool_Exp> = {
    _and: defaultFilters,
  };

  const { orderByQuery, orderByParam, sortChoices } =
    useDashboardSortBy<Events_Order_By>({
      newestSortKey: 'start_date',
      oldestSortKey: 'start_date',
    });

  const defaultOrderBy = sortChoices.find(
    sortItem => sortItem.value === orderByParam,
  )?.id;

  useEffect(() => {
    if (!initialLoad) {
      setPage(0);
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

  const onClickType = (
    event: React.MouseEvent<HTMLDivElement>,
    type: string,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    const currentFilterOption = [...(selectedFilters?.eventType?.tags || [])];
    const newFilterOption = currentFilterOption.includes(type)
      ? currentFilterOption.filter(t => t !== type)
      : [type, ...currentFilterOption];

    if (newFilterOption.length === 0) {
      onChangeSelectedFilters({ ...selectedFilters, eventType: undefined });
    } else {
      onChangeSelectedFilters({
        ...selectedFilters,
        eventType: {
          ...selectedFilters?.eventType,
          tags: newFilterOption,
        },
      });
    }

    currentFilterOption.includes(type)
      ? toast.custom(
          t => (
            <div
              className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                t.visible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
            >
              Removed &ldquo;{type}&rdquo; Filter
            </div>
          ),
          {
            duration: 3000,
            position: 'top-center',
          },
        )
      : toast.custom(
          t => (
            <div
              className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                t.visible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
            >
              Added &ldquo;{type}&rdquo; Filter
            </div>
          ),
          {
            duration: 3000,
            position: 'top-center',
          },
        );
  };

  /** Handle selected filter params */
  processEventsFilters(filters, selectedFilters, defaultFilters);

  if (selectedTab?.value === 'featured') {
    filters._and?.push({
      is_featured: { _eq: true },
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
  const {
    data: eventsData,
    error,
    isLoading,
  } = useGetEventsQuery({
    offset,
    limit,
    where: filters as Events_Bool_Exp,
    orderBy: [orderByQuery],
  });

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const events = initialLoad ? initialEvents : eventsData?.events;
  const events_aggregate = initialLoad
    ? eventsCount
    : eventsData?.events_aggregate?.aggregate?.count || 0;

  const showPersonalized = user && !selectedFilters && !selectedTab;

  return (
    <DashboardLayout>
      <div className="relative">
        <div
          className="px-6 py-3 flex flex-wrap gap-3 items-center justify-between border-b border-gray-200 lg:items-center"
          role="tablist"
        >
          <ElemCategories
            categories={eventTabs}
            selectedCategory={selectedTab}
            onChangeCategory={onChangeTab}
          />

          <div className="flex flex-wrap gap-2">
            {isDisplaySelectLibrary && <ElemLibrarySelector />}

            <ElemAddFilter
              resourceType="events"
              onSelectFilterOption={onSelectFilterOption}
            />

            <ElemDropdown defaultItem={defaultOrderBy} items={sortChoices} />
          </div>
        </div>

        {selectedFilters && (
          <div className="mx-6 my-3">
            <ElemFilter
              resourceType="events"
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
          </div>
        )}

        <ElemInviteBanner className="mx-6 my-3" />

        <div className="mx-6">
          {showPersonalized &&
            personalizedTags.locationTags.map(location => (
              <EventsByFilter
                key={location}
                headingText={`New in ${location}`}
                tagOnClick={onClickType}
                itemsPerPage={ITEMS_PER_PAGE}
                filters={{
                  _and: [
                    { slug: { _neq: '' } },
                    { library: { _contains: selectedLibrary } },
                    {
                      location_json: {
                        _cast: {
                          String: {
                            _ilike: `%"city": "${location}"%`,
                          },
                        },
                      },
                    },
                  ],
                }}
              />
            ))}

          {error ? (
            <div className="flex items-center justify-center mx-auto min-h-[40vh] col-span-3">
              <div className="max-w-xl mx-auto">
                <h4 className="mt-5 text-3xl font-bold">
                  Error loading events
                </h4>
                <div className="mt-1 text-lg text-slate-600">
                  Please check spelling, reset filters, or{' '}
                  <button
                    onClick={() =>
                      showNewMessages(
                        `Hi EdgeIn, I'd like to report an error on events page`,
                      )
                    }
                    className="inline underline decoration-primary-500 hover:text-primary-500"
                  >
                    <span>report error</span>
                  </button>
                  .
                </div>
              </div>
            </div>
          ) : isLoading && !initialLoad ? (
            <div className="grid gap-8 gap-x-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {Array.from({ length: 9 }, (_, i) => (
                <PlaceholderEventCard key={i} />
              ))}
            </div>
          ) : (
            events?.length !== 0 && (
              <>
                {user && (
                  <div className="text-2xl font-medium my-4">All Events</div>
                )}
                <div
                  data-testid="events"
                  className="grid gap-8 gap-x-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                >
                  {events?.map(event => (
                    <ElemEventCard
                      key={event.id}
                      event={event}
                      tagOnClick={onClickType}
                    />
                  ))}
                </div>

                <Pagination
                  shownItems={events?.length}
                  totalItems={events_aggregate}
                  page={page}
                  itemsPerPage={limit}
                  onClickPrev={() => setPage(page - 1)}
                  onClickNext={() => setPage(page + 1)}
                  onClickToPage={selectedPage => setPage(selectedPage)}
                />
              </>
            )
          )}

          {events?.length === 0 && (
            <div className="flex items-center justify-center mx-auto min-h-[40vh]">
              <div className="w-full max-w-2xl my-8 p-8 text-center bg-white border rounded-2xl border-dark-500/10">
                <IconSearch className="w-12 h-12 mx-auto text-slate-300" />
                <h2 className="mt-5 text-3xl font-bold">No results found</h2>
                <div className="mt-1 text-lg text-slate-600">
                  Please check spelling, try different filters, or tell us about
                  missing data.
                </div>
                <ElemButton
                  onClick={() =>
                    showNewMessages(
                      `Hi EdgeIn, I'd like to report missing data on ${router.pathname} page`,
                    )
                  }
                  btn="white"
                  className="mt-3"
                >
                  <IconAnnotation className="w-6 h-6 mr-1" />
                  Tell us about missing data
                </ElemButton>
              </div>
            </div>
          )}
        </div>

        <Toaster />
      </div>
    </DashboardLayout>
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
      metaTitle: 'Web3 Events - EdgeIn.io',
      metaDescription:
        "Don't miss a beat. Here's your lineup for all of the industry's must attend events.",
      eventTabs,
      eventsCount: events?.events_aggregate.aggregate?.count || 0,
      initialEvents: events?.events || [],
    },
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
    title: 'Upcoming',
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
