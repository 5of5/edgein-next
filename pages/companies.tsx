import React, { useEffect, useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import {
  PlaceholderCompanyCard,
  PlaceholderTable,
} from '@/components/placeholders';
import { runGraphQl } from '@/utils';
import { IconSortDashboard, IconGroup, IconTable } from '@/components/icons';
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
  companyStatusTags,
  ISO_DATE_FORMAT,
  NEW_CATEGORY_LIMIT,
  TRENDING_CATEGORY_LIMIT,
  TABLE_LAYOUT_LIMIT,
} from '@/utils/constants';
import { useStateParams } from '@/hooks/use-state-params';
import { onTrackView } from '@/utils/track';
import { processCompaniesFilters } from '@/components/filters/processor';
import { ElemFilter } from '@/components/filters/elem-filter';
import { DashboardCategory, DeepPartial } from '@/types/common';
import { useUser } from '@/context/user-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ElemAddFilter } from '@/components/filters/elem-add-filter';
import ElemLibrarySelector from '@/components/elem-library-selector';
import {
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
} from '@/utils/constants';
import useLibrary from '@/hooks/use-library';
import { ElemDropdown } from '@/components/elem-dropdown';
import useDashboardFilter from '@/hooks/use-dashboard-filter';
import { ElemCategories } from '@/components/dashboard/elem-categories';
import moment from 'moment-timezone';
import { NextSeo } from 'next-seo';
import { ElemFiltersWrap } from '@/components/filters/elem-filters-wrap';
import { NoResults } from '@/components/companies/no-results';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';

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

  // Company status-tag filter
  const [selectedStatusTag, setSelectedStatusTag] =
    useStateParams<DashboardCategory | null>(
      null,
      'statusTag',
      companyLayer => (companyLayer ? companyLayer.value : ''),
      selectedStatusTag =>
        companyStatusTags[
          companyStatusTags.findIndex(
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
    'lastUpdate', //'mostRelevant',
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

  const limit = 50;

  // disable offset on table layout for free users
  const offset =
    !user?.entitlements.viewEmails && tableLayout ? 0 : limit * pageIndex;

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
      setPageIndex(0);
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
    // limit shown companies on table layout for non-paid users
    if (tableLayout && !user?.entitlements.viewEmails) {
      return TABLE_LAYOUT_LIMIT;
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

  const getTotalItems = () => {
    if (isNewTabSelected) {
      return NEW_CATEGORY_LIMIT;
    }

    if (selectedStatusTag?.value === 'Trending') {
      return TRENDING_CATEGORY_LIMIT;
    }

    return companies_aggregate;
  };

  const layoutItems = [
    {
      id: 0,
      label: 'Grid view',
      value: 'grid',
      Icon: IconGroup,
      onClick: () => setTableLayout(false),
    },
    {
      id: 1,
      label: 'Table view',
      value: 'table',
      Icon: IconTable,
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
    // {
    //   id: 4,
    //   label: 'Last funding date (new to old)',
    //   value: 'lastFundingDate',
    //   onClick: () => setSortBy('lastFundingDate'),
    // },
  ];

  const onPreviousPage = () => {
    setPageIndex(pageIndex - 1);
  };
  const onNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const pageTitle = `${selectedStatusTag?.title || 'All'} ${
    user ? selectedLibrary : ''
  } companies`;

  return (
    <>
      <NextSeo
        title={`${selectedLibrary} Companies`}
        description="Early-stage companies in the AI and Web3 markets require actionable intelligence and hyper-speed. Consider this your greatest asset."
      />

      <DashboardLayout>
        <div className="relative">
          <ElemFiltersWrap resultsTotal={companies_aggregate}>
            <ElemCategories
              categories={companyStatusTags}
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
                resourceType="companies"
                onSelectFilterOption={onSelectFilterOption}
              />
            </div>

            {selectedFilters && (
              <ElemFilter
                className="basis-full lg:order-last"
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
                      <PlaceholderCompanyCard key={i} />
                    ))}
                  </div>
                )}
              </>
            ) : tableLayout && companies?.length != 0 ? (
              <CompaniesTable
                companies={companies}
                pageNumber={pageIndex}
                itemsPerPage={getLimit()}
                shownItems={companies?.length}
                totalItems={getTotalItems()}
                onClickPrev={onPreviousPage}
                onClickNext={onNextPage}
              />
            ) : companies?.length != 0 ? (
              <>
                <div
                  data-testid="companies"
                  className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
  const resp = await runGraphQl<GetCompaniesQuery>(GetCompaniesDocument, {
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
  });

  const response = {
    props: {
      companiesCount: 0,
      initialCompanies: [] as GetCompaniesQuery['companies'],
      companyStatusTags,
    },
    revalidate: 60 * 60 * 2,
  };

  if (resp.errors) {
    console.error(resp.errors);
    return response;
  }

  const { data: companies } = resp;

  response.props.companiesCount =
    companies?.companies_aggregate?.aggregate?.count || 0;
  response.props.initialCompanies = companies?.companies || [];

  return response;
};

export default Companies;

export interface NumericFilter {
  title: string;
  description?: string;
  rangeStart: number;
  rangeEnd: number;
}
