import React, { useEffect, useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { PlaceholderPersonCard } from '@/components/placeholders';
import { ElemButton } from '@/components/elem-button';
import { runGraphQl } from '@/utils';
import { IconSearch, IconAnnotation } from '@/components/icons';
import {
  Order_By,
  useGetPeopleQuery,
  People_Bool_Exp,
  People_Order_By,
  GetPeopleDocument,
  GetPeopleQuery,
} from '@/graphql/types';
import type { People } from '@/graphql/types';
import { Pagination } from '@/components/pagination';
import { ElemPersonCard } from '@/components/people/elem-person-card';
import { useStateParams } from '@/hooks/use-state-params';
import { onTrackView } from '@/utils/track';
import { useIntercom } from 'react-use-intercom';
import { DashboardCategory, DeepPartial } from '@/types/common';
import { useUser } from '@/context/user-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import ElemLibrarySelector from '@/components/elem-library-selector';
import {
  ISO_DATE_FORMAT,
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
} from '@/utils/constants';
import useLibrary from '@/hooks/use-library';
// import { ElemCategories } from '@/components/dashboard/elem-categories';
import moment from 'moment-timezone';
import { ElemAddFilter } from '@/components/filters/elem-add-filter';
import useDashboardFilter from '@/hooks/use-dashboard-filter';
import { ElemFilter } from '@/components/filters/elem-filter';
import { processPeopleFilter } from '@/components/filters/processor';
//import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
import { ElemDemocratizeBanner } from '@/components/invites/elem-democratize-banner';
import { NextSeo } from 'next-seo';

type Props = {
  peopleTabs: DashboardCategory[];
  peopleCount: number;
  initialPeople: GetPeopleQuery['people'];
};

const People: NextPage<Props> = ({
  peopleTabs,
  peopleCount,
  initialPeople,
}) => {
  const [initialLoad, setInitialLoad] = useState(true);

  const { user } = useUser();
  const router = useRouter();
  const { selectedLibrary } = useLibrary();

  const { selectedFilters, onChangeSelectedFilters, onSelectFilterOption } =
    useDashboardFilter({ resetPage: () => setPage(0) });

  const isDisplaySelectLibrary =
    user?.email &&
    (SWITCH_LIBRARY_ALLOWED_EMAILS.includes(user.email) ||
      SWITCH_LIBRARY_ALLOWED_DOMAINS.some(domain =>
        user.email.endsWith(domain),
      ));

  const [selectedTab, setSelectedTab] =
    useStateParams<DashboardCategory | null>(
      null,
      'tab',
      statusTag => (statusTag ? peopleTabs.indexOf(statusTag).toString() : ''),
      index => peopleTabs[Number(index)],
    );

  const [page, setPage] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );

  const limit = 50;
  const offset = limit * page;

  const defaultFilters: DeepPartial<People_Bool_Exp>[] = [
    { library: { _contains: selectedLibrary } },
  ];

  const filters: DeepPartial<People_Bool_Exp> = {
    _and: defaultFilters,
  };

  /** Handle selected filter params */
  processPeopleFilter(filters, selectedFilters, defaultFilters);

  useEffect(() => {
    if (!initialLoad) {
      setPage(0);
    }
    if (initialLoad) {
      setInitialLoad(false);
    }

    onTrackView({
      properties: filters,
      pathname: router.pathname,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (selectedTab?.value === 'new') {
    filters._and?.push({
      created_at: {
        _gte: moment().subtract(28, 'days').format(ISO_DATE_FORMAT),
      },
    });
  }

  const {
    data: peopleData,
    error,
    isLoading,
  } = useGetPeopleQuery(
    {
      offset: offset,
      limit: limit,
      where: filters as People_Bool_Exp,
      orderBy: [
        selectedTab?.value === 'new'
          ? ({ created_at: Order_By.Desc } as People_Order_By)
          : ({ updated_at: Order_By.DescNullsLast } as People_Order_By),
      ],
    },
    { refetchOnWindowFocus: false },
  );

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const people = initialLoad ? initialPeople : peopleData?.people;
  const people_aggregate = initialLoad
    ? peopleCount
    : peopleData?.people_aggregate?.aggregate?.count || 0;

  const { showNewMessages } = useIntercom();

  const pageTitle = `${selectedTab?.title || 'All'} ${
    user ? selectedLibrary : ''
  } people`;

  return (
    <>
      <NextSeo
        title={`People in the ${selectedLibrary} market`}
        description={`Information on founders, investors, and executives for ${selectedLibrary} organizations. Use the EdgeIn Platform to explore the full profile.`}
      />
      <DashboardLayout>
        <div className="relative">
          <div
            className="px-8 pt-0.5 pb-3 flex flex-wrap gap-3 items-center justify-end lg:items-center"
            role="tablist"
          >
            {/** TO-DO: Temporary hide new category for now */}
            {/* <ElemCategories
            categories={peopleTabs}
            selectedCategory={selectedTab}
            onChangeCategory={tab => setSelectedTab(tab)}
          /> */}

            <div className="flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                {isDisplaySelectLibrary && <ElemLibrarySelector />}
              </div>

              <ElemAddFilter
                resourceType="people"
                onSelectFilterOption={onSelectFilterOption}
              />
            </div>
          </div>

          {selectedFilters && (
            <div className="mx-8 my-3">
              <ElemFilter
                resourceType="people"
                filterValues={selectedFilters}
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

          <ElemDemocratizeBanner className="mx-8 my-3" />
          {/* <ElemInviteBanner className="mx-8 my-3" /> */}

          <div className="mx-8">
            {error ? (
              <div className="flex items-center justify-center mx-auto min-h-[40vh] col-span-3">
                <div className="max-w-xl mx-auto">
                  <h4 className="mt-5 text-3xl font-bold">
                    Error loading people
                  </h4>
                  <div className="mt-1 text-lg text-slate-600">
                    Please check spelling, reset filters, or{' '}
                    <button
                      onClick={() =>
                        showNewMessages(
                          `Hi EdgeIn, I'd like to report missing data on ${router.pathname} page`,
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
            ) : (
              <>
                <div className="flex justify-between py-8">
                  <div className="text-4xl font-medium">{pageTitle}</div>
                  {/* Removed in qol-ui-fixes */}
                  {/* <ElemDropdown
                      IconComponent={IconSortDashboard}
                      defaultItem={defaultOrderBy}
                      items={sortChoices}
                    /> */}
                </div>
                {isLoading && !initialLoad ? (
                  <div className="grid gap-8 gap-x-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {Array.from({ length: 9 }, (_, i) => (
                      <PlaceholderPersonCard key={i} />
                    ))}
                  </div>
                ) : (
                  <>
                    <div
                      data-testid="people"
                      className="grid gap-8 gap-x-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                    >
                      {people?.map(person => {
                        return (
                          <ElemPersonCard
                            key={person.id}
                            person={person as People}
                          />
                        );
                      })}
                    </div>

                    <Pagination
                      shownItems={people?.length}
                      totalItems={people_aggregate}
                      page={page}
                      itemsPerPage={limit}
                      onClickPrev={() => setPage(page - 1)}
                      onClickNext={() => setPage(page + 1)}
                      onClickToPage={selectedPage => setPage(selectedPage)}
                    />
                  </>
                )}
              </>
            )}
          </div>

          {people?.length === 0 && (
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
      </DashboardLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: people } = await runGraphQl<GetPeopleQuery>(GetPeopleDocument, {
    offset: 0,
    limit: 50,
    where: {
      _and: [{ library: { _contains: 'Web3' } }],
    },
    orderBy: [{ updated_at: Order_By.Desc }],
  });

  return {
    props: {
      peopleTabs,
      peopleCount: people?.people_aggregate?.aggregate?.count || 0,
      initialPeople: people?.people || [],
    },
    revalidate: 60 * 60 * 2,
  };
};

const peopleTabs: DashboardCategory[] = [
  {
    title: 'New',
    value: 'new',
    date: '',
    icon: '✨',
  },
];

export default People;
