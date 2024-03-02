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
import { ElemFilter } from '@/components/filters/elem-filter';
import { processInvestorsFilters } from '@/components/filters/processor';
import { useIntercom } from 'react-use-intercom';
import useLibrary from '@/hooks/use-library';
import { DashboardCategory, DeepPartial } from '@/types/common';
import { useUser } from '@/context/user-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import ElemLibrarySelector from '@/components/elem-library-selector';
import {
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
} from '@/utils/constants';
import { ElemDropdown } from '@/components/elem-dropdown';
import { ElemAddFilter } from '@/components/filters/elem-add-filter';
import useDashboardFilter from '@/hooks/use-dashboard-filter';
import { getPersonalizedData } from '@/utils/personalizedTags';
import { ElemCategories } from '@/components/dashboard/elem-categories';
import moment from 'moment-timezone';
//import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
import { ElemDemocratizeBanner } from '@/components/invites/elem-democratize-banner';
import { NextSeo } from 'next-seo';
import { ElemSticky } from '@/components/elem-sticky';
import { ElemFiltersWrap } from '@/components/filters/elem-filters-wrap';

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
  const [initialLoad, setInitialLoad] = useState(true);

  const { user } = useUser();
  const router = useRouter();
  const { selectedLibrary } = useLibrary();

  const personalizedTags = getPersonalizedData({ user });

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
      statusTag => (statusTag ? statusTag?.value : ''),
      selectedStatusTag =>
        investorsStatusTags[
          investorsStatusTags.findIndex(
            statusTag => statusTag.value === selectedStatusTag,
          )
        ],
    );

  const isNewTabSelected = selectedStatusTag?.value === 'new';
  const isSortDropdownVisible =
    ['Dead', 'Raising'].includes(selectedStatusTag?.value || '') ||
    !selectedStatusTag;

  const [tableLayout, setTableLayout] = useState(false);

  const [sortBy, setSortBy] = useStateParams<string>('mostRelevant', 'sortBy');

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

  const pageTitle = `${selectedStatusTag?.title || 'All'} ${
    user ? selectedLibrary : ''
  } investors`;

  return (
    <>
      <NextSeo
        title={`${selectedLibrary} Investors`}
        description={`We're tracking investments made in ${selectedLibrary} companies and projects to provide you with an index of the most active and influential capital in the industry.`}
      />
      <DashboardLayout>
        <div className="relative">
          <ElemFiltersWrap resultsTotal={vcfirms_aggregate}>
            <ElemCategories
              categories={investorsStatusTags}
              selectedCategory={selectedStatusTag}
              onChangeCategory={setSelectedStatusTag}
            />

            <div className="hidden lg:block lg:ml-auto"></div>
            {isDisplaySelectLibrary && (
              <div>
                <h3 className="mb-1 font-medium lg:hidden">Library</h3>
                <ElemLibrarySelector />
              </div>
            )}
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
                Industry, Location, and Financials
              </h3>
              <ElemAddFilter
                buttonClass="w-full"
                panelClass="w-full"
                resourceType="vc_firms"
                onSelectFilterOption={onSelectFilterOption}
              />
            </div>

            {selectedFilters && (
              <ElemFilter
                className="basis-full lg:order-last"
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
            )}

            {isSortDropdownVisible && (
              <div>
                <h3 className="mb-1 font-medium lg:hidden">Sort</h3>
                <ElemDropdown
                  buttonClass="w-full"
                  panelClass="w-full"
                  ButtonIcon={IconSortDashboard}
                  items={sortItems}
                  defaultItem={sortItems.findIndex(
                    sortItem => sortItem.value === sortBy,
                  )}
                  firstItemDivided
                />
              </div>
            )}
          </ElemFiltersWrap>

          <ElemDemocratizeBanner className="mx-8 my-3" />

          <div className="mx-8">
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
                </div>

                {isLoading && !initialLoad ? (
                  <>
                    {tableLayout ? (
                      <div className="overflow-auto border-t rounded-t-lg border-x border-black/10">
                        <PlaceholderTable />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {Array.from({ length: 9 }, (_, i) => (
                          <PlaceholderInvestorCard key={i} />
                        ))}
                      </div>
                    )}
                  </>
                ) : tableLayout && vcFirms?.length != 0 ? (
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
                ) : (
                  <>
                    <div
                      data-testid="investors"
                      className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                    >
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
              <div className="w-full max-w-2xl p-8 my-8 text-center bg-white border rounded-2xl border-dark-500/10">
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
    </>
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
