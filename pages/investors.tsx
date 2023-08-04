import React, { Fragment, useEffect, useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ElemHeading } from '@/components/elem-heading';
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
  IconGrid,
  IconTable,
} from '@/components/icons';
import { InvestorsTable } from '@/components/investors/elem-investors-table';
import {
  GetVcFirmsDocument,
  GetVcFirmsQuery,
  useGetVcFirmsQuery,
  Vc_Firms_Bool_Exp,
  Vc_Firms,
} from '@/graphql/types';
import { runGraphQl } from '@/utils';
import { investorChoices } from '@/utils/constants';
import { useStateParams } from '@/hooks/use-state-params';
import toast, { Toaster } from 'react-hot-toast';
import { onTrackView } from '@/utils/track';
import { ElemFilter } from '@/components/elem-filter';
import { processInvestorsFilters } from '@/utils/filter';
import { useIntercom } from 'react-use-intercom';
import useLibrary from '@/hooks/use-library';
import { DeepPartial } from '@/types/common';
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

type Props = {
  vcFirmCount: number;
  initialVCFirms: GetVcFirmsQuery['vc_firms'];
  investorsStatusTags: TextFilter[];
};

const Investors: NextPage<Props> = ({
  vcFirmCount,
  initialVCFirms,
  investorsStatusTags,
}) => {
  const { user } = useUser();

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
  const [selectedStatusTag, setSelectedStatusTag] = useStateParams(
    investorsStatusTags[0],
    'statusTag',
    statusTag => investorsStatusTags.indexOf(statusTag).toString(),
    index => investorsStatusTags[Number(index)],
  );

  const [tableLayout, setTableLayout] = useState(false);

  const { selectedFilters, onChangeSelectedFilters, onSelectFilterOption } =
    useDashboardFilter();

  const [page, setPage] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );

  // limit shown investors on table layout for free users
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

  if (selectedStatusTag.value) {
    filters._and?.push({
      status_tags: { _contains: selectedStatusTag.value },
    });
  }

  const {
    data: vcFirmsData,
    error,
    isLoading,
  } = useGetVcFirmsQuery({
    offset,
    limit,
    where: filters as Vc_Firms_Bool_Exp,
  });

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
      label: 'Grid View',
      value: 'grid',
      onClick: () => setTableLayout(false),
    },
    {
      id: 1,
      label: 'List View',
      value: 'list',
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
        <div>
          <div
            className="relative mb-4 px-4 py-3 flex items-center justify-between border-b border-gray-200"
            role="tablist"
          >
            <nav className="flex space-x-2 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x pr-32 sm:pr-0 lg:border-none">
              {investorsStatusTags &&
                investorsStatusTags.map((tab: any, index: number) =>
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

              <ElemAddFilter
                resourceType="vc_firms"
                onSelectFilterOption={onSelectFilterOption}
              />

              <ElemDropdown items={sortItems} />
            </div>
          </div>

          <div className="px-4">
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

          <ElemInviteBanner className="mt-3 mx-4" />

          <div className="mt-6 px-4">
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
            ) : isLoading && !initialLoad ? (
              <>
                {tableLayout ? (
                  <div className="rounded-t-lg overflow-auto border-t border-x border-black/10">
                    <PlaceholderTable />
                  </div>
                ) : (
                  <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
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
                {vcFirms?.length != 0 && (
                  <div
                    data-testid="investors"
                    className="min-h-[42vh] grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
                  >
                    {vcFirms?.map(vcfirm => (
                      <ElemInvestorCard
                        key={vcfirm.id}
                        vcFirm={vcfirm as Vc_Firms}
                        tagOnClick={filterByTag}
                      />
                    ))}
                  </div>
                )}
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
                  className="mt-3"
                >
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

export const getServerSideProps: GetServerSideProps = async context => {
  const { data: vcFirms } = await runGraphQl<GetVcFirmsQuery>(
    GetVcFirmsDocument,
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
      metaTitle: 'Web3 Investors - EdgeIn.io',
      metaDescription:
        "We're tracking investments made in web3 companies and projects to provide you with an index of the most active and influential capital in the industry.",
      vcFirmCount: vcFirms?.vc_firms_aggregate?.aggregate?.count || 0,
      initialVCFirms: vcFirms?.vc_firms || [],
      investorsStatusTags,
    },
  };
};

export default Investors;

interface TextFilter {
  title: string;
  description?: string;
  icon?: string;
  value: string;
}

const investorFilterValue = investorChoices.map(option => {
  return {
    title: option.name,
    value: option.id,
    icon: option.icon,
  };
});

const investorsStatusTags: TextFilter[] = [
  {
    title: 'New',
    value: '',
    icon: '✨',
  },
  ...investorFilterValue,
];
