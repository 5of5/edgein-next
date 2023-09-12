import React, { useEffect, useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import {
  PlaceholderCompanyCard,
  PlaceholderTable,
} from '@/components/placeholders';
import { ElemButton } from '@/components/elem-button';
import { runGraphQl } from '@/utils';
import {
  IconSearch,
  IconAnnotation,
  IconSortDashboard,
  IconGroup,
  IconTable,
} from '@/components/icons';
import { CompaniesTable } from '@/components/companies/elem-companies-table';
import {
  Order_By,
  useGetCompaniesQuery,
  Companies_Bool_Exp,
  Companies_Order_By,
  GetCompaniesDocument,
  GetCompaniesQuery,
} from '@/graphql/types';
import type { Companies } from '@/graphql/types';
import { Pagination } from '@/components/pagination';
import { ElemCompanyCard } from '@/components/companies/elem-company-card';
import {
  companyChoices,
  ISO_DATE_FORMAT,
  NEW_CATEGORY_LIMIT,
  TRENDING_CATEGORY_LIMIT,
} from '@/utils/constants';
import toast, { Toaster } from 'react-hot-toast';
import { useStateParams } from '@/hooks/use-state-params';
import { onTrackView } from '@/utils/track';
import { processCompaniesFilters } from '@/utils/filter';
import { ElemFilter } from '@/components/elem-filter';
import { useIntercom } from 'react-use-intercom';
import { DashboardCategory, DeepPartial } from '@/types/common';
import { useUser } from '@/context/user-context';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ElemAddFilter } from '@/components/elem-add-filter';
import ElemLibrarySelector from '@/components/elem-library-selector';
import {
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
} from '@/utils/constants';
import useLibrary from '@/hooks/use-library';
import { ElemDropdown } from '@/components/elem-dropdown';
import useDashboardFilter from '@/hooks/use-dashboard-filter';
import { CompaniesByFilter } from '@/components/companies/elem-companies-by-filter';
import { getPersonalizedData } from '@/utils/personalizedTags';
import { ElemCategories } from '@/components/dashboard/elem-categories';
import moment from 'moment-timezone';

const ITEMS_PER_PAGE = 8;

type Props = {
  companiesCount: number;
  initialCompanies: GetCompaniesQuery['companies'];
  companyStatusTags: DashboardCategory[];
};

const Companies: NextPage<Props> = ({
  companiesCount,
  initialCompanies,
  companyStatusTags,
}) => {
  const { user } = useUser();

  const personalizedTags = getPersonalizedData({ user });

  const [initialLoad, setInitialLoad] = useState(true);

  const router = useRouter();

  const isDisplaySelectLibrary =
    user?.email &&
    (SWITCH_LIBRARY_ALLOWED_EMAILS.includes(user.email) ||
      SWITCH_LIBRARY_ALLOWED_DOMAINS.some(domain =>
        user.email.endsWith(domain),
      ));

  const { selectedLibrary } = useLibrary();

  // Company status-tag filter
  const [selectedStatusTag, setSelectedStatusTag] =
    useStateParams<DashboardCategory | null>(
      null,
      'statusTag',
      companyLayer =>
        companyLayer ? companyStatusTags.indexOf(companyLayer).toString() : '',
      index => companyStatusTags[Number(index)],
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

  // limit shown companies on table layout for free users
  const limit =
    user?.entitlements.listsCount && tableLayout
      ? user?.entitlements.listsCount
      : 50;

  // disable offset on table layout for free users
  const offset =
    user?.entitlements.listsCount && tableLayout ? 0 : limit * page;

  const defaultFilters: DeepPartial<Companies_Bool_Exp>[] = [
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

  const filters: DeepPartial<Companies_Bool_Exp> = {
    _and: defaultFilters,
  };

  useEffect(() => {
    if (!initialLoad) {
      setPage(0);
    }
    if (initialLoad && selectedStatusTag?.value !== '') {
      setInitialLoad(false);
    }

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
              }`}
            >
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
              }`}
            >
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
  processCompaniesFilters(filters, selectedFilters, defaultFilters);

  if (selectedStatusTag?.value) {
    if (isNewTabSelected) {
      filters._and?.push({
        date_added: {
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

  let orderByQuery: DeepPartial<Companies_Order_By> = {
    datapoints_count: Order_By.Desc,
  };

  if (isNewTabSelected) {
    orderByQuery = { date_added: Order_By.Desc };
  } else if (sortBy === 'lastUpdate') {
    orderByQuery = { updated_at: Order_By.Desc };
  } else if (sortBy === 'totalFundingLowToHigh') {
    orderByQuery = { investor_amount: Order_By.Asc };
  } else if (sortBy === 'totalFundingHighToLow') {
    orderByQuery = { investor_amount: Order_By.DescNullsLast };
  } else if (sortBy === 'lastFundingDate') {
    orderByQuery = {
      investment_rounds_aggregate: { max: { round_date: Order_By.Desc } },
    };
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
      return { date_added: Order_By.Desc };
    }

    if (selectedStatusTag?.value === 'Trending') {
      return { num_of_views: Order_By.Desc };
    }

    return orderByQuery;
  };

  const {
    data: companiesData,
    error,
    isLoading,
  } = useGetCompaniesQuery(
    {
      offset: isNewTabSelected ? null : offset,
      limit: getLimit(),
      where: filters as Companies_Bool_Exp,
      orderBy: [getOrderBy() as Companies_Order_By],
    },
    { refetchOnWindowFocus: false },
  );

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const companies = initialLoad ? initialCompanies : companiesData?.companies;
  const companies_aggregate = initialLoad
    ? companiesCount
    : companiesData?.companies_aggregate?.aggregate?.count || 0;

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
      label: 'Total funding (low to high)',
      value: 'totalFundingLowToHigh',
      onClick: () => setSortBy('totalFundingLowToHigh'),
    },
    {
      id: 3,
      label: 'Total funding (high to low)',
      value: 'totalFundingHighToLow',
      onClick: () => setSortBy('totalFundingHighToLow'),
    },
    {
      id: 4,
      label: 'Last funding date (new to old)',
      value: 'lastFundingDate',
      onClick: () => setSortBy('lastFundingDate'),
    },
  ];

  const showPersonalized = user && !selectedFilters && !selectedStatusTag;
  return (
    <DashboardLayout>
      <div className="relative">
        <div
          className="px-8 pt-0.5 pb-3 flex flex-wrap gap-3 items-center justify-between lg:items-center"
          role="tablist"
        >
          <ElemCategories
            categories={companyStatusTags}
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
              resourceType="companies"
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
              resourceType="companies"
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
              {personalizedTags.locationTags.map((location, index) => (
                <CompaniesByFilter
                  key={`${location}-${index}`}
                  headingText={`Trending in ${location}`}
                  tagOnClick={filterByTag}
                  itemsPerPage={ITEMS_PER_PAGE}
                  isTableView={tableLayout}
                  orderBy={{
                    num_of_views: Order_By.Desc,
                  }}
                  filters={{
                    _and: [
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

              {personalizedTags.locationTags.map((location, index) => (
                <CompaniesByFilter
                  key={`${location}-${index}`}
                  headingText={`Recently updated in ${location}`}
                  tagOnClick={filterByTag}
                  itemsPerPage={ITEMS_PER_PAGE}
                  isTableView={tableLayout}
                  orderBy={{
                    updated_at: Order_By.Desc,
                  }}
                  filters={{
                    _and: [
                      ...defaultFilters,
                      {
                        created_at: {
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

              {personalizedTags.locationTags.map((location, index) => (
                <CompaniesByFilter
                  key={`${location}-${index}`}
                  headingText={`New in ${location}`}
                  tagOnClick={filterByTag}
                  itemsPerPage={ITEMS_PER_PAGE}
                  isTableView={tableLayout}
                  orderBy={{
                    created_at: Order_By.Desc,
                  }}
                  filters={{
                    _and: [
                      ...defaultFilters,
                      {
                        updated_at: {
                          _gte: moment()
                            .subtract(28, 'days')
                            .format(ISO_DATE_FORMAT),
                        },
                      },
                      {
                        year_founded: {
                          _gte: moment()
                            .subtract(1, 'years')
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
                <CompaniesByFilter
                  key={industry}
                  headingText={`Trending in ${industry}`}
                  tagOnClick={filterByTag}
                  itemsPerPage={ITEMS_PER_PAGE}
                  isTableView={tableLayout}
                  filters={{
                    _and: [
                      ...defaultFilters,
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

              <CompaniesByFilter
                headingText="Recently funded"
                tagOnClick={filterByTag}
                itemsPerPage={ITEMS_PER_PAGE}
                isTableView={tableLayout}
                orderBy={{
                  investment_rounds_aggregate: {
                    sum: {
                      amount: Order_By.Desc,
                    },
                  },
                }}
                filters={{
                  _and: [
                    ...defaultFilters,
                    {
                      investment_rounds: {
                        round_date: {
                          _gte: moment()
                            .subtract(28, 'days')
                            .format(ISO_DATE_FORMAT),
                        },
                      },
                    },
                  ],
                }}
              />

              <CompaniesByFilter
                headingText="Recently founded"
                tagOnClick={filterByTag}
                itemsPerPage={ITEMS_PER_PAGE}
                isTableView={tableLayout}
                orderBy={{
                  year_founded: Order_By.Desc,
                }}
                filters={{
                  _and: [
                    ...defaultFilters,
                    {
                      year_founded: {
                        _gte: moment().subtract(1, 'year').year().toString(),
                      },
                    },
                  ],
                }}
              />
            </div>
          )}

          {error ? (
            <div className="flex items-center justify-center mx-auto min-h-[40vh] col-span-3">
              <div className="max-w-xl mx-auto">
                <h4 className="mt-5 text-3xl font-bold">
                  Error loading companies
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
              {showPersonalized && (
                <div className="flex justify-between py-8">
                  <div className="text-4xl font-medium">All companies</div>
                  {!tableLayout && !isNewTabSelected && (
                    <ElemDropdown
                      IconComponent={IconSortDashboard}
                      items={sortItems}
                    />
                  )}
                </div>
              )}
              {isLoading && !initialLoad ? (
                <>
                  {tableLayout ? (
                    <div className="rounded-t-lg overflow-auto border-t border-x border-black/10">
                      <PlaceholderTable />
                    </div>
                  ) : (
                    <div className="grid gap-8 gap-x-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                      {Array.from({ length: 9 }, (_, i) => (
                        <PlaceholderCompanyCard key={i} />
                      ))}
                    </div>
                  )}
                </>
              ) : tableLayout && companies?.length != 0 ? (
                <>
                  {showPersonalized && (
                    <div className="flex justify-between py-8">
                      <div className="text-4xl font-medium">All companies</div>
                    </div>
                  )}

                  <CompaniesTable
                    companies={companies}
                    pageNumber={page}
                    itemsPerPage={limit}
                    shownItems={companies?.length}
                    totalItems={companies_aggregate}
                    onClickPrev={() => setPage(page - 1)}
                    onClickNext={() => setPage(page + 1)}
                    filterByTag={filterByTag}
                  />
                </>
              ) : (
                <>
                  <div
                    data-testid="companies"
                    className="grid gap-8 gap-x-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                  >
                    {companies?.map(company => {
                      return (
                        <ElemCompanyCard
                          key={company.id}
                          company={company as Companies}
                        />
                      );
                    })}
                  </div>

                  <Pagination
                    shownItems={companies?.length}
                    totalItems={companies_aggregate}
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

        {companies?.length === 0 && (
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

        <Toaster />
      </div>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: companies } = await runGraphQl<GetCompaniesQuery>(
    GetCompaniesDocument,
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
      metaTitle: 'Web3 Companies - EdgeIn.io',
      metaDescription:
        'Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset.',
      companiesCount: companies?.companies_aggregate?.aggregate?.count || 0,
      initialCompanies: companies?.companies || [],
      companyStatusTags,
    },
    revalidate: 60 * 60 * 2,
  };
};

export default Companies;

export interface NumericFilter {
  title: string;
  description?: string;
  rangeStart: number;
  rangeEnd: number;
}

const companyStatusTagValues = companyChoices.map(option => {
  return {
    title: option.name,
    value: option.id,
    icon: option.icon,
  };
});

const companyStatusTags: DashboardCategory[] = [
  {
    title: 'New',
    value: 'new',
    icon: '✨',
  },
  ...companyStatusTagValues,
];
