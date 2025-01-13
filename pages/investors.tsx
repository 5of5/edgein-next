import React, { useEffect, useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import {
  PlaceholderInvestorCard,
  PlaceholderTable,
} from '@/components/placeholders';
import { Pagination } from '@/components/pagination';
import { ElemInvestorCard } from '@/components/investors/elem-investor-card';
import { IconSortDashboard, IconTable, IconGroup } from '@/components/icons';
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
  TABLE_LAYOUT_LIMIT,
  TRENDING_CATEGORY_LIMIT,
} from '@/utils/constants';
import { useStateParams } from '@/hooks/use-state-params';
import { onTrackView } from '@/utils/track';
import { ElemFilter } from '@/components/filters/elem-filter';
import { processInvestorsFilters } from '@/components/filters/processor';
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
import { ElemCategories } from '@/components/dashboard/elem-categories';
import moment from 'moment-timezone';
import { NextSeo } from 'next-seo';
import { ElemFiltersWrap } from '@/components/filters/elem-filters-wrap';
import { NoResults } from '@/components/companies/no-results';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';

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

  const [sortBy, setSortBy] = useStateParams<string>(
    'lastUpdate', // 'mostRelevant',
    'sortBy',
  );

  const [pageIndex, setPageIndex] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );

  const { selectedFilters, onChangeSelectedFilters, onSelectFilterOption } =
    useDashboardFilter({ resetPage: () => setPageIndex(0) });

  // limit shown investors on table layout for free users
  const limit = 50;

  // disable offset on table layout for free users
  const offset =
    !user?.entitlements.viewEmails && tableLayout ? 0 : limit * pageIndex;

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
      setPageIndex(0);
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
    // limit shown companies on table layout for visitors
    if ((tableLayout && !user) || tableLayout) {
      return TABLE_LAYOUT_LIMIT;
    }
    // limit shown companies on table layout for free users
    if (tableLayout && user?.entitlements.listsCount) {
      return user?.entitlements.listsCount;
    }

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

  const getTotalItems = () => {
    if (isNewTabSelected) {
      return NEW_CATEGORY_LIMIT;
    }

    if (selectedStatusTag?.value === 'Trending') {
      return TRENDING_CATEGORY_LIMIT;
    }

    return vcfirms_aggregate;
  };

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
      divider: true,
    },
    {
      id: 1,
      label: 'Last update (new to old)', //alt: Recently updated
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

  const onPreviousPage = () => {
    setPageIndex(pageIndex - 1);
  };
  const onNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

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
                />
              </div>
            )}
          </ElemFiltersWrap>

          <ElemInviteBanner className="mx-8 mt-2" />

          <div className="mx-8">
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
                pageNumber={pageIndex}
                itemsPerPage={getLimit()}
                shownItems={vcFirms?.length}
                totalItems={getTotalItems()}
                onClickPrev={onPreviousPage}
                onClickNext={onNextPage}
              />
            ) : vcFirms?.length != 0 ? (
              <>
                <div
                  data-testid="investors"
                  className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {vcFirms?.map(vcfirm => (
                    <ElemInvestorCard
                      key={vcfirm.id}
                      vcFirm={vcfirm as Vc_Firms}
                    />
                  ))}
                </div>

                <Pagination
                  shownItems={vcFirms?.length}
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
