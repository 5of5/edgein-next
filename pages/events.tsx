import type { NextPage, GetStaticProps } from 'next';
import React, { Fragment, useState, useEffect } from 'react';
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
} from '@/graphql/types';
import { onTrackView } from '@/utils/track';
import { useRouter } from 'next/router';
import { ElemFilter } from '@/components/elem-filter';
import { processEventsFilters } from '@/utils/filter';
import { ElemEventCard } from '@/components/events/elem-event-card';
import { useIntercom } from 'react-use-intercom';
import { DeepPartial } from '@/types/common';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useUser } from '@/context/user-context';
import ElemLibrarySelector from '@/components/elem-library-selector';
import {
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
} from '@/utils/constants';
import useLibrary from '@/hooks/use-library';
import { ElemDropdown } from '@/components/elem-dropdown';
import useDashboardFilter from '@/hooks/use-dashboard-filter';
import { ElemAddFilter } from '@/components/elem-add-filter';

type Props = {
  eventTabs: TextFilter[];
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

  const { showNewMessages } = useIntercom();

  const [selectedTab, setSelectedTab] = useStateParams(
    { ...eventTabs[0], date: moment().toISOString() },
    'tab',
    statusTag => eventTabs.indexOf(statusTag).toString(),
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

  if (
    selectedTab.value === 'upcoming' &&
    !selectedFilters?.eventDate?.condition
  ) {
    filters._and?.push({
      start_date: { _gte: selectedTab.date },
    });
  }

  if (selectedTab.value === 'past' && !selectedFilters?.eventDate?.condition) {
    filters._and?.push({
      start_date: { _lte: selectedTab.date },
    });
  }
  const {
    data: eventsData,
    error,
    isLoading,
  } = useGetEventsQuery({
    offset,
    limit,
    order: selectedTab.value === 'past' ? Order_By.Desc : Order_By.Asc,
    where: filters as Events_Bool_Exp,
  });

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const events = initialLoad ? initialEvents : eventsData?.events;
  const events_aggregate = initialLoad
    ? eventsCount
    : eventsData?.events_aggregate?.aggregate?.count || 0;

  const sortItems = [
    {
      id: 0,
      label: 'Sort: Ascending',
      value: 'ascending',
      onClick: () => {},
    },
    {
      id: 1,
      label: 'Sort: Descending',
      value: 'descending',
      onClick: () => {},
    },
    {
      id: 2,
      label: 'Sort: Newest First',
      value: 'newest',
      onClick: () => {},
    },
    {
      id: 3,
      label: 'Sort: Oldest First',
      value: 'oldest',
      onClick: () => {},
    },
  ];

  return (
    <DashboardLayout>
      <div className="relative">
        <div
          className="relative mb-4 px-4 py-3 flex items-center justify-between border-b border-gray-200"
          role="tablist"
        >
          <nav className="flex space-x-2 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x pr-32 sm:pr-0 lg:border-none">
            {eventTabs &&
              eventTabs.map((tab: any, index: number) =>
                tab.disabled === true ? (
                  <Fragment key={index}></Fragment>
                ) : (
                  <ElemButton
                    key={index}
                    onClick={() => onChangeTab(tab)}
                    btn="gray"
                    roundedFull={false}
                    className="rounded-lg"
                  >
                    {tab.icon && <div className="w-5 h-5">{tab.icon}</div>}
                    {tab.title}
                  </ElemButton>
                ),
              )}
          </nav>

          <div className="flex space-x-2">
            {/* {isDisplaySelectLibrary &&  */}
            <ElemLibrarySelector />
            {/* } */}

            <ElemAddFilter
              resourceType="events"
              onSelectFilterOption={onSelectFilterOption}
            />

            <ElemDropdown items={sortItems} />
          </div>
        </div>

        <div className="px-4">
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

        <ElemInviteBanner className="mt-3 mx-4" />

        <div className="mt-6 px-4">
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

          <div
            data-testid="events"
            className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
          >
            {error ? (
              <h4>Error loading events</h4>
            ) : isLoading && !initialLoad ? (
              <>
                {Array.from({ length: 9 }, (_, i) => (
                  <PlaceholderEventCard key={i} />
                ))}
              </>
            ) : (
              events?.map(event => (
                <ElemEventCard
                  key={event.id}
                  event={event}
                  tagOnClick={onClickType}
                />
              ))
            )}
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
    order: Order_By.Asc,
    where: {
      _and: [{ slug: { _neq: '' } }, { library: { _contains: 'Web3' } }],
    },
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

interface TextFilter {
  title: string;
  value: string;
  date: string;
  icon: string;
}

const eventTabs: TextFilter[] = [
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
