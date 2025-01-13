import React, { useEffect, useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import {
  PlaceholderPersonCard,
  PlaceholderTable,
} from '@/components/placeholders';
import { runGraphQl } from '@/utils';
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
import { DashboardCategory, DeepPartial } from '@/types/common';
import { useUser } from '@/context/user-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import ElemLibrarySelector from '@/components/elem-library-selector';
import {
  ISO_DATE_FORMAT,
  NEW_CATEGORY_LIMIT,
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
  TABLE_LAYOUT_LIMIT,
} from '@/utils/constants';
import useLibrary from '@/hooks/use-library';
// import { ElemCategories } from '@/components/dashboard/elem-categories';
import moment from 'moment-timezone';
import { ElemAddFilter } from '@/components/filters/elem-add-filter';
import useDashboardFilter from '@/hooks/use-dashboard-filter';
import { ElemFilter } from '@/components/filters/elem-filter';
import { processPeopleFilter } from '@/components/filters/processor';
import { NextSeo } from 'next-seo';
import { ElemFiltersWrap } from '@/components/filters/elem-filters-wrap';
import { NoResults } from '@/components/companies/no-results';
import { IconGroup, IconTable } from '@/components/icons';
import { ElemDropdown } from '@/components/elem-dropdown';
import { PeopleTable } from '@/components/people/elem-people-table';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
import { useFetchPeopleWithPriority } from '@/hooks/use-fetch-people-with-priority';

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

  const { user, loading } = useUser();
  const router = useRouter();
  const { selectedLibrary } = useLibrary();

  const [tableLayout, setTableLayout] = useState(false);

  const { selectedFilters, onChangeSelectedFilters, onSelectFilterOption } =
    useDashboardFilter({ resetPage: () => setPageIndex(0) });

  const isDisplaySelectLibrary =
    user?.email &&
    (SWITCH_LIBRARY_ALLOWED_EMAILS.includes(user.email) ||
      SWITCH_LIBRARY_ALLOWED_DOMAINS.some(domain =>
        user.email.endsWith(domain),
      ));

  const [selectedTab] = useStateParams<DashboardCategory | null>(
    null,
    'tab',
    statusTag => (statusTag ? peopleTabs.indexOf(statusTag).toString() : ''),
    index => peopleTabs[Number(index)],
  );

  const [pageIndex, setPageIndex] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );

  const limit = 50;
  const offset =
    !user?.entitlements.viewEmails && tableLayout ? 0 : limit * pageIndex;

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
      setPageIndex(0);
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

  const getLimit = () => {
    // limit shown companies on table layout for non-paid users
    if (tableLayout && !user?.entitlements.viewEmails) {
      return TABLE_LAYOUT_LIMIT;
    }

    if (selectedTab?.value === 'new') {
      return NEW_CATEGORY_LIMIT;
    }

    return limit;
  };

  const { isLoading, peopleDataCount, peopleData } = useFetchPeopleWithPriority(
    {
      filters,
      limit,
      offset,
      prioritizedPersonId: user?.person?.id,
      selectedTab,
      enabled: !loading,
    },
  );

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const people = initialLoad ? initialPeople : peopleData;
  const people_aggregate = initialLoad ? peopleCount : peopleDataCount;

  const getTotalItems = () => {
    if (selectedTab?.value === 'new') {
      return NEW_CATEGORY_LIMIT;
    }

    return people_aggregate;
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

  const onPreviousPage = () => {
    setPageIndex(pageIndex - 1);
  };
  const onNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const pageTitle = `${selectedTab?.title || 'All'} ${
    user ? selectedLibrary : ''
  } people`;

  return (
    <>
      <NextSeo
        title={`People in the ${selectedLibrary} market`}
        description={`Information on founders, investors, and executives for ${selectedLibrary} organizations. Use the Mentibus Platform to explore the full profile.`}
      />
      <DashboardLayout>
        <div className="relative">
          <ElemFiltersWrap resultsTotal={people_aggregate}>
            {/** TO-DO: Temporary hide new category for now */}
            {/* <ElemCategories
            categories={peopleTabs}
            selectedCategory={selectedTab}
            onChangeCategory={tab => setSelectedTab(tab)}
          /> */}

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
                Location and Personal Info
              </h3>
              <ElemAddFilter
                buttonClass="w-full"
                panelClass="w-full"
                resourceType="people"
                onSelectFilterOption={onSelectFilterOption}
              />
            </div>

            {selectedFilters && (
              <ElemFilter
                className="basis-full lg:order-last"
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
            )}
          </ElemFiltersWrap>

          <ElemInviteBanner className="mx-8 my-3" />

          <div className="mx-8">
            <div className="flex justify-between py-8">
              <div className="text-4xl font-medium">{pageTitle}</div>
              {/* Removed in qol-ui-fixes */}
              {/* <ElemDropdown
                      ButtonIcon={IconSortDashboard}
                      defaultItem={defaultOrderBy}
                      items={sortChoices}
                    /> */}
            </div>
            {isLoading && !initialLoad ? (
              <>
                {tableLayout ? (
                  <div className="overflow-auto border-t rounded-t-lg border-x  border-neutral-700">
                    <PlaceholderTable />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {Array.from({ length: 9 }, (_, i) => (
                      <PlaceholderPersonCard key={i} />
                    ))}
                  </div>
                )}
              </>
            ) : tableLayout && people?.length != 0 ? (
              <PeopleTable
                people={people}
                pageNumber={pageIndex}
                itemsPerPage={getLimit()}
                shownItems={people?.length}
                totalItems={getTotalItems()}
                onClickPrev={onPreviousPage}
                onClickNext={onNextPage}
              />
            ) : people?.length != 0 ? (
              <>
                <div
                  data-testid="people"
                  className="grid grid-cols-1 gap-8 gap-x-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
                  page={pageIndex}
                  itemsPerPage={limit}
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
