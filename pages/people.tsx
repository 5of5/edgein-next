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
  useGetPeopleQuery,
  People_Bool_Exp,
  People_Order_By,
  GetPeopleDocument,
  GetPeopleQuery,
} from '@/graphql/types';
import type { People } from '@/graphql/types';
import { Pagination } from '@/components/pagination';
import { ElemCompanyCard } from '@/components/companies/elem-company-card';
import { ElemPersonCard } from '@/components/people/elem-person-card';
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
import { getPersonalizedData } from '@/utils/personalizedTags';

const ITEMS_PER_PAGE = 8;

type Props = {
  peopleCount: number;
  initialPeople: GetPeopleQuery['people'];
};

const People: NextPage<Props> = ({ peopleCount, initialPeople }) => {
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

  const defaultFilters: DeepPartial<People_Bool_Exp>[] = [
    { library: { _contains: selectedLibrary } },
  ];

  const filters: DeepPartial<People_Bool_Exp> = {
    _and: defaultFilters,
  };

  const { orderByQuery, orderByParam, sortChoices } =
    useDashboardSortBy<People_Order_By>();

  const defaultOrderBy = sortChoices.find(
    sortItem => sortItem.value === orderByParam,
  )?.id;

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
  processCompaniesFilters(filters, selectedFilters, defaultFilters);

  const {
    data: peopleData,
    error,
    isLoading,
  } = useGetPeopleQuery(
    {
      offset: offset,
      limit: limit,
      where: filters as People_Bool_Exp,
      orderBy: [{ created_at: Order_By.Desc } as People_Order_By],
    },
    { refetchOnWindowFocus: false },
  );

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const people = initialLoad ? initialPeople : peopleData?.people;
  const people_aggregate = initialLoad
    ? peopleCount
    : peopleData?.people.length || 0; //peopleData?.people_aggregate?.aggregate?.count || 0;

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

  const showPersonalized = user && !selectedFilters;

  return (
    <DashboardLayout>
      <div className="relative">
        <div
          className="px-6 py-3 flex flex-wrap gap-3 items-center justify-between border-b border-gray-200 lg:items-center"
          role="tablist">
          <div className="flex flex-wrap gap-2">
            {isDisplaySelectLibrary && <ElemLibrarySelector />}

            <ElemDropdown
              IconComponent={tableLayout ? IconTable : IconGroup}
              items={layoutItems}
            />

            {/* <ElemDropdown
                IconComponent={IconSortDashboard}
                defaultItem={defaultOrderBy}
                items={sortChoices}
              /> */}
          </div>
        </div>

        <ElemInviteBanner className="mx-6 my-3" />

        <div className="mx-6">
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
                    className="inline underline decoration-primary-500 hover:text-primary-500">
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
          ) : tableLayout && people?.length != 0 ? (
            <>
              {showPersonalized && (
                <div className="text-2xl font-medium mt-4">All people</div>
              )}
              <CompaniesTable
                companies={people}
                pageNumber={page}
                itemsPerPage={limit}
                shownItems={people?.length}
                totalItems={people_aggregate}
                onClickPrev={() => setPage(page - 1)}
                onClickNext={() => setPage(page + 1)}
                filterByTag={filterByTag}
              />
            </>
          ) : (
            <>
              {showPersonalized && (
                <div className="text-2xl font-medium my-4">All people</div>
              )}
              <div
                data-testid="people"
                className="grid gap-8 gap-x-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4">
                {people?.map(person => {
                  return (
                    <ElemPersonCard key={person.id} person={person as People} />
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
                className="mt-3">
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
  const { data: people } = await runGraphQl<GetPeopleQuery>(GetPeopleDocument, {
    offset: 0,
    limit: 50,
    where: {
      _and: [{ library: { _contains: 'Web3' } }],
    },
    orderBy: [{ name: Order_By.Asc }],
  });

  return {
    props: {
      metaTitle: 'Web3 People - EdgeIn.io',
      metaDescription: 'People in the Web3 market.',
      peopleCount: people?.people_aggregate?.aggregate?.count || 0, //people?.people?.length || 0,
      initialPeople: people?.people || [],
    },
    revalidate: 60 * 60 * 2,
  };
};

export default People;

export interface NumericFilter {
  title: string;
  description?: string;
  rangeStart: number;
  rangeEnd: number;
}
