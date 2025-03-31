import React, { useEffect, useState, Fragment } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import {
  PlaceholderCompanyCard,
  PlaceholderTable,
} from '@/components/placeholders';
import { runGraphQl } from '@/utils';
import {
  GetListsQuery,
  Order_By,
  Lists_Order_By,
  GetListsDocument,
  useGetListsQuery,
  Lists_Bool_Exp,
} from '@/graphql/types';
import { Pagination } from '@/components/pagination';
import { useStateParams } from '@/hooks/use-state-params';
import { onTrackView } from '@/utils/track';
import { ListsTabType } from '@/types/common';
import { InputText } from '@/components/input-text';
import { useUser } from '@/context/user-context';
import { LISTS_TABS, PUBLIC_LISTS_TABS } from '@/utils/constants';
import { getListsFilters } from '@/components/filters/processor';
import CookieService from '@/utils/cookie';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import { ElemListCard } from '@/components/lists/elem-list-card';
import { CreateListDialog } from '@/components/my-list/create-list-dialog';
import { ElemButton } from '@/components/elem-button';
import { NextSeo } from 'next-seo';
import { ListsTable } from '@/components/lists/elem-lists-table';
import { ElemDropdown } from '@/components/elem-dropdown';
import { IconGroup, IconTable } from '@/components/icons';
import { ListsNoResults } from '@/components/lists/lists-no-results';
import {
  fetchGraphQL,
  GET_PUBLIC_LISTS,
} from '@/components/dashboard/elem-my-lists-menu';

type Props = {
  initialListsCount: number;
  initialLists: GetListsQuery['lists'];
};

type PublicListResponse = {
  lists: GetListsQuery['lists'];
  lists_aggregate: {
    aggregate: {
      count: number;
    };
  };
};

const PUBLIC_LIST = `
  query GetPublicList($limit: Int!, $offset: Int!) {
   lists(where: {public: {_eq: true}}, limit: $limit, offset: $offset) {
   id
    name
    description
    total_no_of_resources
    public
    created_at
    updated_at
    created_by {
      id
      display_name
      email
      person {
        id
        name
        slug
        picture
      }
    }
    list_members {
      id
      member_type
      user_id
      user {
        id
        display_name
        email
        person {
          id
          name
          slug
          picture
        }
      }
    }
  }
      lists_aggregate(where: {public: {_eq: true}}) {
    aggregate {
      count
    }
  }
}`;

const LIMIT = 12;

const ListsPage: NextPage<Props> = ({ initialListsCount, initialLists }) => {
  const { user, listAndFollows } = useUser();
  const [initialLoad, setInitialLoad] = useState(true);

  const [tableLayout, setTableLayout] = useState(false);
  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);
  const [isOpenCreateListDialog, setIsOpenCreateListDialog] = useState(false);
  const [publicList, setPublicList] = useState<PublicListResponse>();
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();

  const [page, setPage] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );

  const offset = LIMIT * page;

  const [selectedListTab, setSelectedListTab] = useStateParams(
    LISTS_TABS[0],
    'tab',
    tab => tab.id,
    tabId => LISTS_TABS.find(grTab => grTab.id === tabId) || LISTS_TABS[0],
  );

  const filters = getListsFilters(selectedListTab.id, user?.id || 0);

  // Add search filter to the existing filters
  const searchFilters = searchTerm
    ? {
        _or: [
          { name: { _ilike: `%${searchTerm}%` } },
          { description: { _ilike: `%${searchTerm}%` } },
        ],
      }
    : null;

  // Combine filters with AND condition
  const whereClause = searchTerm
    ? {
        _and: [filters, searchFilters],
      }
    : filters;

  //when there is no user, hence only public list is fetched
  const fetchPublicList = async () => {
    try {
      const data = await fetchGraphQL(PUBLIC_LIST, { limit: LIMIT, offset });
      setPublicList(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchPublicList();
    }
  }, [page]);

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

  const {
    data: listsData,
    error,
    isLoading,
    refetch,
  } = useGetListsQuery(
    {
      limit: LIMIT,
      offset,
      orderBy: [
        {
          list_members_aggregate: { count: Order_By.Desc },
        } as Lists_Order_By,
      ],
      where: whereClause as Lists_Bool_Exp,
    },
    { enabled: Boolean(user?.id), refetchOnWindowFocus: false },
  );

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }
  console.log(publicList);

  const lists = initialLoad
    ? initialLists
    : user
    ? listsData?.lists
    : publicList?.lists;
  const listsAggregate = initialLoad
    ? initialListsCount
    : user
    ? listsData?.lists_aggregate?.aggregate?.count
    : publicList?.lists_aggregate?.aggregate?.count || 0;

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };

  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const onOpenCreateListDialog = () => {
    setIsOpenCreateListDialog(true);
  };

  const onCloseCreateListDialog = () => {
    setIsOpenCreateListDialog(false);
  };

  const onClickCreateList = () => {
    if (
      user?.entitlements.listsCount &&
      listAndFollows.length > user?.entitlements.listsCount
    ) {
      onOpenUpgradeDialog();
    } else {
      onOpenCreateListDialog();
    }
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

  return (
    <>
      <NextSeo
        title="Lists"
        description="Level up your research, due diligence, or portfolio management. Start with lists to monitor organizations and people of your interests."
      />
      <DashboardLayout>
        <div className="items-center justify-between px-4 pt-4 pb-6 sm:px-6 sm:flex lg:px-8">
          <nav className="flex space-x-2 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x w-full">
            {LISTS_TABS && user
              ? LISTS_TABS.map((tab: any, index: number) =>
                  tab.disabled === true ? (
                    <Fragment key={index}></Fragment>
                  ) : (
                    <ElemButton
                      key={index}
                      onClick={() => setSelectedListTab(tab)}
                      btn="gray"
                      roundedFull={false}
                      className={`py-2 rounded-lg ${
                        selectedListTab?.id === tab.id
                          ? 'border-primary-500 hover:border-primary-500 '
                          : ''
                      }`}>
                      {tab.name}
                    </ElemButton>
                  ),
                )
              : PUBLIC_LISTS_TABS.map((tab: any, index: number) =>
                  tab.disabled === true ? (
                    <Fragment key={index}></Fragment>
                  ) : (
                    <ElemButton
                      key={index}
                      onClick={() => setSelectedListTab(tab)}
                      btn="gray"
                      roundedFull={false}
                      className={`py-2 rounded-lg ${
                        selectedListTab?.id === tab.id
                          ? 'border-primary-500 hover:border-primary-500 '
                          : ''
                      }`}>
                      {tab.name}
                    </ElemButton>
                  ),
                )}{' '}
            <InputText
              name="List search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search lists"
              className="!w-72 h-8 left-5"
            />
          </nav>

          <ElemDropdown
            buttonClass="mt-4 sm:mt-0"
            //panelClass="w-full"
            ButtonIcon={tableLayout ? IconTable : IconGroup}
            items={layoutItems}
          />
        </div>

        <div className="px-4 py-3 sm:px-6 lg:px-8">
          {lists?.length != 0 && (
            <div className="pb-2">
              <h1 className="text-4xl font-medium">{selectedListTab.name}</h1>
            </div>
          )}

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
          ) : tableLayout && lists?.length != 0 ? (
            <ListsTable
              lists={lists}
              pageNumber={page}
              shownItems={LIMIT}
              totalItems={listsAggregate || 0}
              onClickPrev={() => setPage(page - 1)}
              onClickNext={() => setPage(page + 1)}
            />
          ) : lists?.length != 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {lists?.map((listItem: GetListsQuery['lists'][0]) => {
                  return (
                    <ElemListCard
                      key={listItem.id}
                      selectedTab={selectedListTab}
                      resource={{ ...listItem, resourceType: 'list' }}
                      refetchList={refetch}
                      isUser={user ? true : false}
                    />
                  );
                })}
              </div>
              <Pagination
                shownItems={lists?.length}
                totalItems={listsAggregate || 0}
                page={page}
                itemsPerPage={LIMIT}
                onClickPrev={() => setPage(page - 1)}
                onClickNext={() => setPage(page + 1)}
                onClickToPage={selectedPage => setPage(selectedPage)}
              />
            </>
          ) : (
            <ListsNoResults
              selectedTab={selectedListTab}
              onChangeTab={setSelectedListTab}
              onClickCreateList={onClickCreateList}
            />
          )}
        </div>

        <ElemUpgradeDialog
          isOpen={isOpenUpgradeDialog}
          onClose={onCloseUpgradeDialog}
        />

        <CreateListDialog
          isOpen={isOpenCreateListDialog}
          onClose={onCloseCreateListDialog}
        />
      </DashboardLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const token = CookieService.getAuthToken(context.req.cookies);
  const user = await CookieService.getUser(token);

  const selectedTab = context.query.tab || 'my-lists';

  const page =
    context.query.page !== undefined ? Number(context.query.page) - 1 : 0;
  const offset = LIMIT * page;

  const { data: listsData } = await runGraphQl<GetListsQuery>(
    GetListsDocument,
    {
      offset,
      limit: LIMIT,
      orderBy: [
        {
          list_members_aggregate: { count: Order_By.Desc },
        } as Lists_Order_By,
      ],
      where: getListsFilters(selectedTab as ListsTabType, user?.id || 0),
    },
    context.req.cookies,
  );

  return {
    props: {
      initialListsCount: listsData?.lists_aggregate?.aggregate?.count || 0,
      initialLists: listsData?.lists || [],
    },
  };
};

export default ListsPage;
