import React, { useEffect, useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import {
  PlaceholderInvestorCard,
  PlaceholderTable,
} from '@/components/placeholders';
import { ElemButton } from '@/components/elem-button';
import { Pagination } from '@/components/pagination';
import { ElemInvestorCard } from '@/components/investors/elem-investor-card';
import {
  IconSearch,
  IconAnnotation,
  IconSortDashboard,
  IconTable,
  IconGroup,
} from '@/components/icons';
import { InvestorsTable } from '@/components/investors/elem-investors-table';
import {
  GetVcFirmsDocument,
  GetVcFirmsQuery,
  useGetVcFirmsQuery,
  Vc_Firms_Bool_Exp,
  Vc_Firms,
  Vc_Firms_Order_By,
  Order_By,
} from '@/graphql/types';
import { runGraphQl } from '@/utils';
import {
  investorChoices,
  ISO_DATE_FORMAT,
  NEW_CATEGORY_LIMIT,
  TRENDING_CATEGORY_LIMIT,
} from '@/utils/constants';
import { useStateParams } from '@/hooks/use-state-params';
import toast, { Toaster } from 'react-hot-toast';
import { onTrackView } from '@/utils/track';
import { ElemFilter } from '@/components/elem-filter';
import { processInvestorsFilters } from '@/utils/filter';
import { useIntercom } from 'react-use-intercom';
import useLibrary from '@/hooks/use-library';
import { DashboardCategory, DeepPartial } from '@/types/common';
import { useUser } from '@/context/user-context';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import ElemLibrarySelector from '@/components/elem-library-selector';
import {
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
} from '@/utils/constants';
import { ElemDropdown } from '@/components/elem-dropdown';
import { ElemAddFilter } from '@/components/elem-add-filter';
import useDashboardFilter from '@/hooks/use-dashboard-filter';
import { getPersonalizedData } from '@/utils/personalizedTags';
import { InvestorsByFilter } from '@/components/investors/elem-investors-by-filter';
import { ElemCategories } from '@/components/dashboard/elem-categories';
import moment from 'moment-timezone';

const ITEMS_PER_PAGE = 8;

type Props = {
  vcFirmCount: number;
  initialVCFirms: GetVcFirmsQuery['vc_firms'];
  investorsStatusTags: DashboardCategory[];
};

const Investors: NextPage<Props> = ({
  vcFirmCount,
  initialVCFirms,
  investorsStatusTags,
}) => {
  const { user } = useUser();

  const personalizedTags = getPersonalizedData({ user });

  const [initialLoad, setInitialLoad] = useState(true);

  const router = useRouter();

  const { selectedLibrary } = useLibrary();

  const isDisplaySelectLibrary =
    user?.email &&
    (SWITCH_LIBRARY_ALLOWED_EMAILS.includes(user.email) ||
      SWITCH_LIBRARY_ALLOWED_DOMAINS.some(domain =>
        user.email.endsWith(domain),
      ));

  // Investor Status Tag
  const [selectedStatusTag, setSelectedStatusTag] =
    useStateParams<DashboardCategory | null>(
      null,
      'statusTag',
      statusTag =>
        statusTag ? investorsStatusTags.indexOf(statusTag).toString() : '',
      index => investorsStatusTags[Number(index)],
    );

  const isNewTabSelected = selectedStatusTag?.value === 'new';
  const isSortDropdownVisible = ['Dead', 'Raising'].includes(
    selectedStatusTag?.value || '',
  );

  const [tableLayout, setTableLayout] = useState(false);

  const [sortBy, setSortBy] = useState('mostRelevant');

  const [page, setPage] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );

  const { selectedFilters, onChangeSelectedFilters, onSelectFilterOption } =
    useDashboardFilter({ resetPage: () => setPage(0) });

  // limit shown investors on table layout for free users
  const limit =
    user?.entitlements.listsCount && tableLayout
      ? user?.entitlements.listsCount
      : 50;

  // disable offset on table layout for free users
  const offset =
    user?.entitlements.listsCount && tableLayout ? 0 : limit * page;

  const defaultFilters: DeepPartial<Vc_Firms_Bool_Exp>[] = [
    { library: { _contains: selectedLibrary } },
  ];

  if (selectedStatusTag?.value !== 'Dead') {
    defaultFilters.push({
      _or: [
        {
          _not: {
            status_tags: { _contains: 'Dead' },
          },
        },
        { status_tags: { _is_null: true } },
      ],
    });
  }

  const filters: DeepPartial<Vc_Firms_Bool_Exp> = {
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
  }, [selectedStatusTag]);

  useEffect(() => {
    onTrackView({
      properties: filters,
      pathname: router.pathname,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatusTag]);

  const filterByTag = async (
    event: React.MouseEvent<HTMLDivElement>,
    tag: string,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    const currentFilterOption = [...(selectedFilters?.industry?.tags || [])];
    const newFilterOption = currentFilterOption.includes(tag)
      ? currentFilterOption.filter(t => t !== tag)
      : [tag, ...currentFilterOption];

    if (newFilterOption.length === 0) {
      onChangeSelectedFilters({ ...selectedFilters, industry: undefined });
    } else {
      onChangeSelectedFilters({
        ...selectedFilters,
        industry: {
          ...selectedFilters?.industry,
          tags: newFilterOption,
        },
      });
    }

    currentFilterOption.includes(tag)
      ? toast.custom(
          t => (
            <div
              className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                t.visible ? 'animate-fade-in-up' : 'opacity-0'
              }`}>
              Removed &ldquo;{tag}&rdquo; Filter
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
              }`}>
              Added &ldquo;{tag}&rdquo; Filter
            </div>
          ),
          {
            duration: 3000,
            position: 'top-center',
          },
        );
  };

  /** Handle selected filter params */
  processInvestorsFilters(filters, selectedFilters, defaultFilters);

  if (selectedStatusTag?.value) {
    if (isNewTabSelected) {
      filters._and?.push({
        //created_at: { _neq: new Date(0) },
        created_at: {
          _gte: moment().subtract(28, 'days').format(ISO_DATE_FORMAT),
        },
      });
    } else if (selectedStatusTag.value === 'Trending') {
      filters._and?.push({
        num_of_views: { _is_null: false },
      });
    } else {
      filters._and?.push({
        status_tags: { _contains: selectedStatusTag.value },
      });
    }
  }

  const getLimit = () => {
    if (isNewTabSelected) {
      return NEW_CATEGORY_LIMIT;
    }

    if (selectedStatusTag?.value === 'Trending') {
      return TRENDING_CATEGORY_LIMIT;
    }

    return limit;
  };

  const getOrderBy = () => {
    if (isNewTabSelected) {
      return { created_at: Order_By.Desc };
    }

    if (selectedStatusTag?.value === 'Trending') {
      return { num_of_views: Order_By.Desc };
    }

    return orderByQuery;
  };

  let orderByQuery: DeepPartial<Vc_Firms_Order_By> = {
    datapoints_count: Order_By.Desc,
  };

  if (isNewTabSelected) {
    orderByQuery = { created_at: Order_By.Desc };
  } else if (sortBy === 'lastUpdate') {
    orderByQuery = { updated_at: Order_By.Desc };
  } else if (sortBy === 'totalInvestmentLowToHigh') {
    orderByQuery = { investment_amount_total: Order_By.Asc };
  } else if (sortBy === 'totalInvestmentHighToLow') {
    orderByQuery = { investment_amount_total: Order_By.DescNullsLast };
  } else if (sortBy === 'lastInvestmentDate') {
    orderByQuery = {
      latest_investment: Order_By.DescNullsLast,
    };
  }

  const {
    data: vcFirmsData,
    error,
    isLoading,
  } = useGetVcFirmsQuery(
    {
      offset: isNewTabSelected ? null : offset,
      limit: getLimit(),
      where: filters as Vc_Firms_Bool_Exp,
      orderBy: [getOrderBy() as Vc_Firms_Order_By],
    },
    { refetchOnWindowFocus: false },
  );

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const vcFirms = initialLoad ? initialVCFirms : vcFirmsData?.vc_firms;
  const vcfirms_aggregate = initialLoad
    ? vcFirmCount
    : vcFirmsData?.vc_firms_aggregate?.aggregate?.count || 0;

  const { showNewMessages } = useIntercom();

  const layoutItems = [
    {
      id: 0,
      label: 'Grid view',
      value: 'grid',
      StartIcon: IconGroup,
      onClick: () => setTableLayout(false),
    },
    {
      id: 1,
      label: 'Table view',
      value: 'table',
      StartIcon: IconTable,
      onClick: () => setTableLayout(true),
    },
  ];

  const sortItems = [
    {
      id: 0,
      label: 'Most relevant',
      value: 'mostRelevant',
      onClick: () => setSortBy('mostRelevant'),
    },
    {
      id: 1,
      label: 'Last update (new to old)',
      value: 'lastUpdate',
      onClick: () => setSortBy('lastUpdate'),
    },
    {
      id: 2,
      label: 'Total investment (low to high)',
      value: 'totalInvestmentLowToHigh',
      onClick: () => setSortBy('totalInvestmentLowToHigh'),
    },
    {
      id: 3,
      label: 'Total investment (high to low)',
      value: 'totalInvestmentHighToLow',
      onClick: () => setSortBy('totalInvestmentHighToLow'),
    },
    {
      id: 4,
      label: 'Last investment date (new to old)',
      value: 'lastInvestmentDate',
      onClick: () => setSortBy('lastInvestmentDate'),
    },
  ];

  const showPersonalized = user && !selectedFilters && !selectedStatusTag;

  const pageTitle = `All ${user ? selectedLibrary : ''} investors`;

  return (
    <DashboardLayout>
      <div className="relative">
        <div>
          <div
            className="px-8 pt-0.5 pb-3 flex flex-wrap gap-3 items-center justify-between lg:items-center"
            role="tablist">
            <ElemCategories
              categories={investorsStatusTags}
              selectedCategory={selectedStatusTag}
              onChangeCategory={setSelectedStatusTag}
            />

            <div className="flex flex-wrap gap-2">
              {isDisplaySelectLibrary && <ElemLibrarySelector />}
              <ElemDropdown
                IconComponent={tableLayout ? IconTable : IconGroup}
                items={layoutItems}
              />

              <ElemAddFilter
                resourceType="vc_firms"
                onSelectFilterOption={onSelectFilterOption}
              />

              {isSortDropdownVisible && (
                <ElemDropdown
                  IconComponent={IconSortDashboard}
                  items={sortItems}
                />
              )}
            </div>
          </div>

          {selectedFilters && (
            <div className="mx-8 my-3">
              <ElemFilter
                resourceType="vc_firms"
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

          <ElemInviteBanner className="mx-8 my-3" />

          <div className="mx-8">
            {showPersonalized && (
              <div className="flex flex-col gap-4 gap-x-8">
                {personalizedTags.locationTags.map(location => (
                  <InvestorsByFilter
                    key={location}
                    headingText={`Trending in ${location}`}
                    tagOnClick={filterByTag}
                    itemsPerPage={ITEMS_PER_PAGE}
                    isTableView={tableLayout}
                    orderBy={{
                      num_of_views: Order_By.Desc,
                    }}
                    filters={{
                      _and: [
                        // { library: { _contains: selectedLibrary } },
                        // { status_tags: { _contains: 'Trending' } },
                        ...defaultFilters,
                        { num_of_views: { _is_null: false } },
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

                {personalizedTags.locationTags.map(location => (
                  <InvestorsByFilter
                    key={location}
                    headingText={`Recently updated in ${location}`}
                    tagOnClick={filterByTag}
                    itemsPerPage={ITEMS_PER_PAGE}
                    isTableView={tableLayout}
                    orderBy={{
                      updated_at: Order_By.Desc,
                    }}
                    filters={{
                      _and: [
                        { library: { _contains: selectedLibrary } },
                        {
                          updated_at: {
                            _gte: moment()
                              .subtract(28, 'days')
                              .format(ISO_DATE_FORMAT),
                          },
                        },
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

                {personalizedTags.industryTags.map(industry => (
                  <InvestorsByFilter
                    key={industry}
                    headingText={`Trending in ${industry}`}
                    tagOnClick={filterByTag}
                    itemsPerPage={ITEMS_PER_PAGE}
                    isTableView={tableLayout}
                    filters={{
                      _and: [
                        { library: { _contains: selectedLibrary } },
                        {
                          status_tags: {
                            _contains: 'Trending',
                          },
                        },
                        {
                          tags: {
                            _contains: industry,
                          },
                        },
                      ],
                    }}
                  />
                ))}

                {personalizedTags.locationTags.map(location => (
                  <InvestorsByFilter
                    key={location}
                    headingText="Recently active investors"
                    tagOnClick={filterByTag}
                    itemsPerPage={ITEMS_PER_PAGE}
                    isTableView={tableLayout}
                    filters={{
                      _and: [
                        ...defaultFilters,
                        {
                          investments: {
                            investment_round: {
                              round_date: {
                                _gte: moment()
                                  .subtract(28, 'days')
                                  .format(ISO_DATE_FORMAT),
                              },
                            },
                          },
                        },
                        {
                          location_json: {
                            _contains: {
                              city: `${location}`,
                            },
                          },
                        },
                      ],
                    }}
                    fallbackFilters={{
                      _and: [
                        ...defaultFilters,
                        {
                          investments: {
                            investment_round: {
                              round_date: {
                                _gte: moment()
                                  .subtract(28, 'days')
                                  .format(ISO_DATE_FORMAT),
                              },
                            },
                          },
                        },
                      ],
                    }}
                  />
                ))}

                {/** TO-DO: update this filters */}
                {/* <InvestorsByFilter
                  headingText="Recent exits"
                  tagOnClick={filterByTag}
                  itemsPerPage={ITEMS_PER_PAGE}
                  isTableView={tableLayout}
                  filters={{
                    _and: [...defaultFilters],
                  }}
                /> */}
              </div>
            )}

            {error ? (
              <div className="flex items-center justify-center mx-auto min-h-[40vh] col-span-3">
                <div className="max-w-xl mx-auto">
                  <h4 className="mt-5 text-3xl font-bold">
                    Error loading investors
                  </h4>
                  <div className="mt-1 text-lg text-slate-600">
                    Please check spelling, reset filters, or{' '}
                    <button
                      onClick={() =>
                        showNewMessages(
                          `Hi EdgeIn, I'd like to report an error on investors page`,
                        )
                      }
                      className="inline underline decoration-primary-500 hover:text-primary-500">
                      <span>report error</span>
                    </button>
                    .
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between my-8">
                  <div className="text-4xl font-medium">{pageTitle}</div>
                  {!isNewTabSelected && (
                    <ElemDropdown
                      IconComponent={IconSortDashboard}
                      items={sortItems}
                    />
                  )}
                </div>
                {isLoading && !initialLoad ? (
                  <>
                    {tableLayout ? (
                      <div className="rounded-t-lg overflow-auto border-t border-x border-black/10">
                        <PlaceholderTable />
                      </div>
                    ) : (
                      <div className="grid gap-8 gap-x-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {Array.from({ length: 9 }, (_, i) => (
                          <PlaceholderInvestorCard key={i} />
                        ))}
                      </div>
                    )}
                  </>
                ) : tableLayout && vcFirms?.length != 0 ? (
                  <>
                    <div className="flex justify-between my-8">
                      <div className="text-4xl font-medium">{pageTitle}</div>
                      {!isNewTabSelected && (
                        <ElemDropdown
                          IconComponent={IconSortDashboard}
                          items={sortItems}
                        />
                      )}
                    </div>

                    <InvestorsTable
                      investors={vcFirms}
                      pageNumber={page}
                      itemsPerPage={limit}
                      shownItems={vcFirms?.length}
                      totalItems={vcfirms_aggregate}
                      onClickPrev={() => setPage(page - 1)}
                      onClickNext={() => setPage(page + 1)}
                      filterByTag={filterByTag}
                    />
                  </>
                ) : (
                  <>
                    <div
                      data-testid="investors"
                      className="grid gap-8 gap-x-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                      {vcFirms?.map(vcfirm => (
                        <ElemInvestorCard
                          key={vcfirm.id}
                          vcFirm={vcfirm as Vc_Firms}
                        />
                      ))}
                    </div>

                    <Pagination
                      shownItems={vcFirms?.length}
                      totalItems={vcfirms_aggregate}
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

          {vcFirms?.length === 0 && (
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
                  className="mt-3">
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

export const getStaticProps: GetStaticProps = async () => {
  const { data: vcFirms } = await runGraphQl<GetVcFirmsQuery>(
    GetVcFirmsDocument,
    {
      offset: 0,
      limit: 50,
      where: {
        _and: [
          {
            _or: [
              {
                _not: {
                  status_tags: { _contains: 'Dead' },
                },
              },
              { status_tags: { _is_null: true } },
            ],
          },
          { library: { _contains: 'Web3' } },
        ],
      },
      orderBy: [{ name: Order_By.Asc }],
    },
  );

  return {
    props: {
      metaTitle: 'Web3 Investors - EdgeIn.io',
      metaDescription:
        "We're tracking investments made in web3 companies and projects to provide you with an index of the most active and influential capital in the industry.",
      vcFirmCount: vcFirms?.vc_firms_aggregate?.aggregate?.count || 0,
      initialVCFirms: vcFirms?.vc_firms || [],
      investorsStatusTags,
    },
    revalidate: 60 * 60 * 2,
  };
};

export default Investors;

const investorFilterValue = investorChoices.map(option => {
  return {
    title: option.name,
    value: option.id,
    icon: option.icon,
  };
});

const investorsStatusTags: DashboardCategory[] = [
  {
    title: 'New',
    value: 'new',
    icon: '✨',
  },
  ...investorFilterValue,
];
