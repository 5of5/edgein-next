import type { NextPage, GetStaticProps } from 'next';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ElemButton } from '../../components/elem-button';
import { runGraphQl } from '../../utils';
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
  ISO_DATE_FORMAT,
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
} from '@/utils/constants';
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
  const { user, selectedLibrary } = useUser();

  const personalizedTags = getPersonalizedData({ user });

  const router = useRouter();

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

  const [page, setPage] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );

  const { selectedFilters, onChangeSelectedFilters, onSelectFilterOption } =
    useDashboardFilter({
      dateCondition: selectedTab?.value === 'past' ? 'past' : 'next',
      resetPage: () => setPage(0),
    });

  const limit = 50;
  const offset = limit * page;

  const defaultFilters: DeepPartial<Events_Bool_Exp>[] = [
    { slug: { _neq: '' } },
    { library: { _contains: selectedLibrary } },
  ];

  if (selectedTab?.value !== 'past') {
    defaultFilters.push({
      start_date: { _gte: moment().format(ISO_DATE_FORMAT) },
    });
  }

  const filters: DeepPartial<Events_Bool_Exp> = {
    _and: defaultFilters,
  };

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
  } = useGetEventsQuery(
    {
      offset,
      limit,
      where: filters as Events_Bool_Exp,
      orderBy: [
        {
          start_date:
            selectedTab?.value === 'past' ? Order_By.Desc : Order_By.Asc,
        } as Events_Order_By,
      ],
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

  const showPersonalized = user && !selectedFilters && !selectedTab;

  return (
    <DashboardLayout>
      <div className="relative">
        <div
          className="px-8 pt-0.5 pb-3 flex flex-wrap gap-3 items-center justify-between lg:items-center"
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
              excludeFilters={
                ['past', 'upcoming'].includes(selectedTab?.value ?? '')
                  ? ['eventDate']
                  : []
              }
              onSelectFilterOption={onSelectFilterOption}
            />
          </div>
        </div>

        {selectedFilters && (
          <div className="mx-8 my-3">
            <ElemFilter
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
          </div>
        )}

        <ElemInviteBanner className="mx-8 my-3" />

        <div className="mx-8">
          {showPersonalized &&
            personalizedTags.locationTags.map(location => (
              <EventsByFilter
                key={location}
                headingText={`Recently updated in ${location}`}
                tagOnClick={onClickType}
                itemsPerPage={ITEMS_PER_PAGE}
                filters={{
                  _and: [
                    ...defaultFilters,
                    {
                      location_json: {
                        _contains: {
                          city: `${location}`,
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
                {showPersonalized && (
                  <div className="text-2xl font-medium my-4">All Events</div>
                )}
                <div
                  data-testid="events"
                  className="grid gap-8 gap-x-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                >
                  {events?.map(event => (
                    <ElemEventCard key={event.id} event={event} />
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
    revalidate: 60 * 60 * 2,
  };
};

export async function getStaticPaths() {
  return {
    paths: ['/web3/events', '/ai/events'],
    fallback: false,
  };
}

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
