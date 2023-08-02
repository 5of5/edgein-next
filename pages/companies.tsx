import React, { Fragment, useEffect, useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ElemHeading } from '@/components/elem-heading';
import {
  PlaceholderCompanyCard,
  PlaceholderTable,
} from '@/components/placeholders';
import { ElemButton } from '@/components/elem-button';
import { runGraphQl } from '@/utils';
import {
  IconSearch,
  IconAnnotation,
  IconGrid,
  IconTable,
  IconDead,
  IconAcquired,
  IconTrending,
} from '@/components/icons';
import { CompaniesTable } from '@/components/companies/elem-companies-table';
import {
  Companies,
  Companies_Bool_Exp,
  GetCompaniesDocument,
  GetCompaniesQuery,
  useGetCompaniesQuery,
} from '@/graphql/types';
import { Pagination } from '@/components/pagination';
import { ElemCompanyCard } from '@/components/companies/elem-company-card';
import { companyChoices } from '@/utils/constants';
import toast, { Toaster } from 'react-hot-toast';
import { useStateParams } from '@/hooks/use-state-params';
import { onTrackView } from '@/utils/track';
import { processCompaniesFilters } from '@/utils/filter';
import { ElemFilter } from '@/components/elem-filter';
import { useIntercom } from 'react-use-intercom';
import useFilterParams from '@/hooks/use-filter-params';
import { DeepPartial } from '@/types/common';
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

function useStateParamsFilter<T>(filters: T[], name: string) {
  return useStateParams(
    filters[0],
    name,
    companyLayer => filters.indexOf(companyLayer).toString(),
    index => filters[Number(index)],
  );
}

type Props = {
  companiesCount: number;
  initialCompanies: GetCompaniesQuery['companies'];
  companyStatusTags: TextFilter[];
};

const Companies: NextPage<Props> = ({
  companiesCount,
  initialCompanies,
  companyStatusTags,
}) => {
  const { user } = useUser();

  const [initialLoad, setInitialLoad] = useState(true);

  const router = useRouter();

  const isDisplaySelectLibrary =
    user?.email &&
    (SWITCH_LIBRARY_ALLOWED_EMAILS.includes(user.email) ||
      SWITCH_LIBRARY_ALLOWED_DOMAINS.some(domain =>
        user.email.endsWith(domain),
      ));

  const { selectedLibrary } = useLibrary();

  const { selectedFilters, setSelectedFilters } = useFilterParams();

  // Company status-tag filter
  const [selectedStatusTag, setSelectedStatusTag] = useStateParamsFilter(
    companyStatusTags,
    'statusTag',
  );

  const [tableLayout, setTableLayout] = useState(false);

  const [page, setPage] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );

  // limit shown companies on table layout for free users
  const limit =
    user?.entitlements.listsCount && tableLayout
      ? user?.entitlements.listsCount
      : 50;

  // disable offset on table layout for free users
  const offset =
    user?.entitlements.listsCount && tableLayout ? 0 : limit * page;

  const defaultFilters = [
    { slug: { _neq: '' } },
    { library: { _contains: selectedLibrary } },
  ];

  const filters: DeepPartial<Companies_Bool_Exp> = {
    _and: defaultFilters,
  };

  useEffect(() => {
    if (!initialLoad) {
      setPage(0);
    }
    if (initialLoad && selectedStatusTag.value !== '') {
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
      setSelectedFilters({ ...selectedFilters, industry: undefined });
    } else {
      setSelectedFilters({
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

  if (selectedStatusTag.value) {
    filters._and?.push({
      status_tags: { _contains: selectedStatusTag.value },
    });
  }

  const {
    data: companiesData,
    error,
    isLoading,
  } = useGetCompaniesQuery({
    offset,
    limit,
    where: filters as Companies_Bool_Exp,
  });
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
          className=" mb-4 px-4 py-3 lg:flex items-center justify-between border-b border-gray-200"
          role="tablist"
        >
          <nav className="flex space-x-2 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x">
            {companyStatusTags &&
              companyStatusTags.map((tab: any, index: number) =>
                tab.disabled === true ? (
                  <Fragment key={index}></Fragment>
                ) : (
                  <ElemButton
                    key={index}
                    onClick={() => setSelectedStatusTag(tab)}
                    btn="gray"
                    roundedFull={false}
                    className="rounded-lg"
                  >
                    {tab.icon && <div className="w-5 h-5">{tab.icon}</div>}

                    {/* <IconDead className="w-5 h-5 mr-1" /> */}
                    {tab.title}
                  </ElemButton>
                ),
              )}
          </nav>

          <div className="flex space-x-2">
            {/* {isDisplaySelectLibrary &&  */}
            <ElemLibrarySelector />
            {/* } */}
            <ElemDropdown items={layoutItems} />

            <ElemFilter
              resourceType="companies"
              filterValues={selectedFilters}
              onApply={(name, filterParams) => {
                filters._and = defaultFilters;
                setSelectedFilters({
                  ...selectedFilters,
                  [name]: filterParams,
                });
              }}
              onClearOption={name => {
                filters._and = defaultFilters;
                setSelectedFilters({
                  ...selectedFilters,
                  [name]: undefined,
                });
              }}
              onReset={() => setSelectedFilters(null)}
            />

            <ElemDropdown items={sortItems} />
          </div>
        </div>

        <ElemInviteBanner className="mt-3 mx-4" />

        <div className="mt-6 px-4">
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
                <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: 9 }, (_, i) => (
                    <PlaceholderCompanyCard key={i} />
                  ))}
                </div>
              )}
            </>
          ) : tableLayout && companies?.length != 0 ? (
            <CompaniesTable
              companies={companies}
              pageNumber={page}
              itemsPerPage={limit}
              shownItems={companies?.length}
              totalItems={companies_aggregate}
              onClickPrev={() => setPage(page - 1)}
              onClickNext={() => setPage(page + 1)}
              filterByTag={filterByTag}
              filterValues={selectedFilters}
              onApply={(name, filterParams) => {
                filters._and = defaultFilters;
                setSelectedFilters({
                  ...selectedFilters,
                  [name]: filterParams,
                });
              }}
              onClearOption={name => {
                filters._and = defaultFilters;
                setSelectedFilters({
                  ...selectedFilters,
                  [name]: undefined,
                });
              }}
              onReset={() => setSelectedFilters(null)}
            />
          ) : (
            <>
              {companies?.length != 0 && (
                <div
                  data-testid="companies"
                  className="min-h-[42vh] grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
                >
                  {companies?.map(company => {
                    return (
                      <ElemCompanyCard
                        key={company.id}
                        company={company as Companies}
                        tagOnClick={filterByTag}
                      />
                    );
                  })}
                </div>
              )}
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
        _and: [{ slug: { _neq: '' } }, { library: { _contains: 'Web3' } }],
      },
    },
    context.req.cookies,
  );

  return {
    props: {
      metaTitle: 'Web3 Companies - EdgeIn.io',
      metaDescription:
        'Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset.',
      companiesCount: companies?.companies_aggregate?.aggregate?.count || 0,
      initialCompanies: companies?.companies,
      companyStatusTags,
    },
  };
};

export default Companies;

interface TextFilter {
  title: string;
  description?: string;
  icon?: string;
  value: string;
}

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

const companyStatusTags: TextFilter[] = [
  {
    title: 'New',
    value: '',
    icon: '✨',
  },
  ...companyStatusTagValues,
];
