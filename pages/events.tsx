import type { NextPage, GetStaticProps } from 'next';
import React, { Fragment, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ElemHeading } from '../components/elem-heading';
import { ElemFeaturedEvents } from '@/components/events/elem-featured-events';
import { ElemButton } from '../components/elem-button';
import { runGraphQl } from '../utils';
import { useStateParams } from '@/hooks/use-state-params';
import { Pagination } from '@/components/pagination';
import { PlaceholderEventCard } from '@/components/placeholders';
import moment from 'moment-timezone';
import { IconSearch, IconAnnotation } from '@/components/icons';
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
import useFilterParams from '@/hooks/use-filter-params';
import { ElemEventCard } from '@/components/events/elem-event-card';
import { useIntercom } from 'react-use-intercom';
import useLibrary from '@/hooks/use-library';
import { DeepPartial } from '@/types/common';

type Props = {
  eventTabs: TextFilter[];
  eventsCount: number;
  initialEvents: GetEventsQuery['events'];
  setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Events: NextPage<Props> = ({
  eventTabs,
  eventsCount,
  initialEvents,
  setToggleFeedbackForm,
}) => {
  const [initialLoad, setInitialLoad] = useState(true);

  const router = useRouter();

  const { selectedLibrary } = useLibrary();

  const { showNewMessages } = useIntercom();

  const [selectedTab, setSelectedTab] = useStateParams(
    { ...eventTabs[0], date: moment().toISOString() },
    'tab',
    statusTag => eventTabs.indexOf(statusTag).toString(),
    index => eventTabs[Number(index)],
  );

  const { selectedFilters, setSelectedFilters } = useFilterParams();

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
    setSelectedFilters(null);
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
      setSelectedFilters({ ...selectedFilters, eventType: undefined });
    } else {
      setSelectedFilters({
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

  return (
    <div className="relative">
      <ElemHeading
        title="Events"
        //subtitle={`Don't miss a beat. Here's your lineup for all of the industry's must attend events. Holding an event? Let us know.`}
      >
        <p className="max-w-3xl mt-5 text-xl text-slate-600">
          Don&rsquo;t miss a beat. Here&rsquo;s your lineup for all of the
          industry&rsquo;s must attend events. Holding an event?{' '}
          <button
            onClick={() =>
              showNewMessages(`Hi EdgeIn, I'd like to submit an event`)
            }
            className="text-primary-500 hover:underline"
          >
            Let us know
          </button>
          .
        </p>
      </ElemHeading>

      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        <ElemFeaturedEvents className="shadow" heading="Featured" />
      </div>

      <div className="max-w-7xl px-4 mx-auto mt-7 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-xl font-bold">Events</h2>

          <div
            className="mt-2 -mr-5 pr-5 flex items-center justify-between border-y border-black/10 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x lg:mr-0 lg:pr-0"
            role="tablist"
          >
            <nav className="flex">
              {eventTabs &&
                eventTabs.map((tab: any, index: number) =>
                  tab.disabled === true ? (
                    <Fragment key={index}></Fragment>
                  ) : (
                    <button
                      key={index}
                      onClick={() => onChangeTab(tab)}
                      className={`whitespace-nowrap flex py-3 px-3 border-b-2 box-border font-bold transition-all ${
                        selectedTab.value === tab.value
                          ? 'text-primary-500 border-primary-500'
                          : 'border-transparent  hover:bg-slate-200'
                      } ${tab.disabled ? 'cursor-not-allowed' : ''}}`}
                    >
                      {tab.title}
                    </button>
                  ),
                )}
            </nav>
          </div>

          <ElemFilter
            resourceType="events"
            filterValues={selectedFilters}
            dateCondition={selectedTab?.value === 'past' ? 'past' : 'next'}
            onApply={(name, filterParams) => {
              filters._and = defaultFilters;
              setSelectedFilters({ ...selectedFilters, [name]: filterParams });
            }}
            onClearOption={name => {
              filters._and = defaultFilters;
              setSelectedFilters({ ...selectedFilters, [name]: undefined });
            }}
            onReset={() => setSelectedFilters(null)}
          />

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
                  onClick={() => setToggleFeedbackForm(true)}
                  btn="white"
                  className="mt-3"
                >
                  <IconAnnotation className="w-6 h-6 mr-1" />
                  Tell us about missing data
                </ElemButton>
              </div>
            </div>
          )}

          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                  onClickType={onClickType}
                />
              ))
            )}
          </div>

          <Pagination
            shownItems={events?.length}
            totalItems={events_aggregate}
            page={page}
            itemsPerPage={limit}
            numeric
            onClickPrev={() => setPage(page - 1)}
            onClickNext={() => setPage(page + 1)}
            onClickToPage={selectedPage => setPage(selectedPage)}
          />
        </div>
      </div>
      <Toaster />
    </div>
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
}

const eventTabs: TextFilter[] = [
  {
    title: 'Upcoming',
    value: 'upcoming',
    date: moment().toISOString(),
  },
  {
    title: 'Past',
    value: 'past',
    date: moment().subtract(1, 'days').toISOString(),
  },
];
