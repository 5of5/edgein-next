import React, { useEffect, useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
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
import useDashboardSortBy from '@/hooks/use-dashboard-sort-by';
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

  const [tableLayout, setTableLayout] = useState(false);

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
    { slug: { _neq: '' } },
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

  const { orderByQuery, orderByParam, sortChoices } =
    useDashboardSortBy<Companies_Order_By>();

  const defaultOrderBy = sortChoices.find(
    sortItem => sortItem.value === orderByParam,
  )?.id;

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
        date_added: { _neq: new Date(0) },
      });
    } else {
      filters._and?.push({
        status_tags: { _contains: selectedStatusTag.value },
      });
    }
  }

  const {
    data: companiesData,
    error,
    isLoading,
  } = useGetCompaniesQuery(
    {
      offset: isNewTabSelected ? null : offset,
      limit: isNewTabSelected ? NEW_CATEGORY_LIMIT : limit,
      where: filters as Companies_Bool_Exp,
      orderBy: [
        isNewTabSelected
          ? ({ date_added: Order_By.Desc } as Companies_Order_By)
          : orderByQuery,
      ],
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
      label: 'Grid View',
      value: 'grid',
      onClick: () => setTableLayout(false),
    },
    {
      id: 1,
      label: 'Table View',
      value: 'table',
      onClick: () => setTableLayout(true),
    },
  ];

  const showPersonalized = user && !selectedFilters && !selectedStatusTag;

  return (
    <DashboardLayout>
      <div className="relative">
        <div
          className="px-6 py-3 flex flex-wrap gap-3 items-center justify-between border-b border-gray-200 lg:items-center"
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

            {!isNewTabSelected && (
              <ElemDropdown
                IconComponent={IconSortDashboard}
                defaultItem={defaultOrderBy}
                items={sortChoices}
              />
            )}
          </div>
        </div>

        {selectedFilters && (
          <div className="mx-6 my-3">
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

        <ElemInviteBanner className="mx-6 my-3" />

        <div className="mx-6">
          {showPersonalized && (
            <div className="flex flex-col gap-4 gap-x-16">
              {personalizedTags.locationTags.map((location, index) => (
                <CompaniesByFilter
                  key={`${location}-${index}`}
                  headingText={`Trending in ${location}`}
                  tagOnClick={filterByTag}
                  itemsPerPage={ITEMS_PER_PAGE}
                  isTableView={tableLayout}
                  filters={{
                    _and: [
                      ...defaultFilters,
                      { status_tags: { _contains: 'Trending' } },
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

              {personalizedTags.locationTags.map((location, index) => (
                <CompaniesByFilter
                  key={`${location}-${index}`}
                  headingText={`Recently updated in ${location}`}
                  tagOnClick={filterByTag}
                  itemsPerPage={ITEMS_PER_PAGE}
                  isTableView={tableLayout}
                  filters={{
                    _and: [
                      ...defaultFilters,
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

              {personalizedTags.locationTags.map((location, index) => (
                <CompaniesByFilter
                  key={`${location}-${index}`}
                  headingText={`New in ${location}`}
                  tagOnClick={filterByTag}
                  itemsPerPage={ITEMS_PER_PAGE}
                  isTableView={tableLayout}
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

              <CompaniesByFilter
                headingText={`Recently acquired`}
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
                      status_tags: {
                        _contains: 'Acquired',
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
          ) : isLoading && !initialLoad ? (
            <>
              {tableLayout ? (
                <div className="rounded-t-lg overflow-auto border-t border-x border-black/10">
                  <PlaceholderTable />
                </div>
              ) : (
                <div className="grid gap-8 gap-x-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {Array.from({ length: 9 }, (_, i) => (
                    <PlaceholderCompanyCard key={i} />
                  ))}
                </div>
              )}
            </>
          ) : tableLayout && companies?.length != 0 ? (
            <>
              {showPersonalized && (
                <div className="text-2xl font-medium mt-4">All companies</div>
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
              {showPersonalized && (
                <div className="text-2xl font-medium my-4">All companies</div>
              )}
              <div
                data-testid="companies"
                className="grid gap-8 gap-x-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4"
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

export const getServerSideProps: GetServerSideProps = async context => {
  const { data: companies } = await runGraphQl<GetCompaniesQuery>(
    GetCompaniesDocument,
    {
      offset: 0,
      limit: 50,
      where: {
        _and: [
          { slug: { _neq: '' } },
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
    context.req.cookies,
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
