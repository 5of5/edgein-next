import React, { useEffect, useState, Fragment } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { PlaceholderCompanyCard } from '@/components/placeholders';
import { ElemGroupCard } from '@/components/groups/elem-group-card';
import { ElemButton } from '@/components/elem-button';
import { runGraphQl } from '@/utils';
import { IconGroup, IconGroupPlus } from '@/components/icons';
import {
  GetListsQuery,
  GetListsDocument,
  useGetListsQuery,
  Lists_Bool_Exp,
  Lists,
} from '@/graphql/types';
import { Pagination } from '@/components/pagination';
import { useStateParams } from '@/hooks/use-state-params';
import { onTrackView } from '@/utils/track';
import { useIntercom } from 'react-use-intercom';
import { ListsTabType } from '@/types/common';
import { useUser } from '@/context/user-context';
import { LISTS_TABS } from '@/utils/constants';
import { getListsFilters } from '@/utils/filter';
import CookieService from '@/utils/cookie';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import ElemCreateGroupDialog from '@/components/group/elem-create-group-dialog';
import ElemListCard from '@/components/elem-list-card';

type Props = {
  initialListsCount: number;
  initialLists: GetListsQuery['lists'];
};

const LIMIT = 12;

const ListsPage: NextPage<Props> = ({ initialListsCount, initialLists }) => {
  const { user, myGroups } = useUser();
  const [initialLoad, setInitialLoad] = useState(true);

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);
  const [isOpenCreateGroupDialog, setIsOpenCreateGroupDialog] = useState(false);

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
  } = useGetListsQuery({
    limit: LIMIT,
    offset,
    where: filters as Lists_Bool_Exp,
  });

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const lists = initialLoad ? initialLists : listsData?.lists;
  const listsAggregate = initialLoad
    ? initialListsCount
    : listsData?.lists_aggregate?.aggregate?.count || 0;

  const { showNewMessages } = useIntercom();

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };

  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const onOpenCreateGroupDialog = () => {
    setIsOpenCreateGroupDialog(true);
  };

  const onCloseCreateGroupDialog = () => {
    setIsOpenCreateGroupDialog(false);
  };

  const onClickCreateGroup = () => {
    if (
      user?.entitlements.groupsCount &&
      myGroups.length > user?.entitlements.groupsCount
    ) {
      onOpenUpgradeDialog();
    } else {
      onOpenCreateGroupDialog();
    }
  };

  return (
    <DashboardLayout>
      <div className="pb-20">
        <nav className="flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x bg-white shadow rounded-lg shrink-0">
          {LISTS_TABS &&
            LISTS_TABS.map((tab, index: number) =>
              tab.disabled === true ? (
                <Fragment key={index}></Fragment>
              ) : (
                <button
                  key={index}
                  onClick={() => setSelectedListTab(tab)}
                  className={`whitespace-nowrap flex py-3 px-3 border-b-2 box-border font-bold transition-all ${
                    selectedListTab.id === tab.id
                      ? 'text-primary-500 border-primary-500'
                      : 'border-transparent  hover:bg-slate-200'
                  } ${tab.disabled ? 'cursor-not-allowed' : ''}`}
                >
                  {tab.name}
                </button>
              ),
            )}
        </nav>

        {lists?.length === 0 ? (
          <div className="flex items-center justify-center mx-auto min-h-[40vh]">
            <div className="w-full max-w-2xl my-8 p-8 text-center bg-white border rounded-2xl border-dark-500/10">
              <IconGroup className="w-12 h-12 mx-auto text-slate-300" />
              <h1 className="mt-5 text-3xl font-bold">
                {selectedListTab.id === 'my-lists'
                  ? 'Create a group'
                  : selectedListTab.id === 'joined'
                  ? 'Join a group'
                  : selectedListTab.id === 'discover'
                  ? 'Discover'
                  : ''}
              </h1>
              <div className="mt-1 text-lg text-slate-600">
                {selectedListTab.id === 'discover'
                  ? 'There are no lists that are visible to the public yet, if you make your list public it will appear here.'
                  : 'Lists allow you to collaborate on notes, share insights, and track leads with other people.'}
              </div>
              {selectedListTab.id === 'my-lists' ? (
                <ElemButton
                  onClick={onClickCreateGroup}
                  btn="primary"
                  className="mt-3"
                >
                  <IconGroupPlus className="w-6 h-6 mr-1" />
                  Create New List
                </ElemButton>
              ) : selectedListTab.id === 'joined' ? (
                <ElemButton
                  onClick={() =>
                    setSelectedListTab({
                      id: 'discover',
                      name: 'Discover',
                    })
                  }
                  btn="primary"
                  className="mt-3"
                >
                  <IconGroupPlus className="w-6 h-6 mr-1" />
                  Discover lists
                </ElemButton>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full mt-6 mb-2">
            <h1 className="font-bold text-xl capitalize">
              {selectedListTab.name}
            </h1>
          </div>
        )}

        <div className={`grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
          {error ? (
            <div className="flex items-center justify-center mx-auto min-h-[40vh] col-span-3">
              <div className="max-w-xl mx-auto">
                <h4 className="mt-5 text-3xl font-bold">Error loading lists</h4>
                <div className="mt-1 text-lg text-slate-600">
                  Please check spelling, reset filters, or{' '}
                  <button
                    onClick={() =>
                      showNewMessages(
                        `Hi EdgeIn, I'd like to report an error on lists page`,
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
              {Array.from({ length: 9 }, (_, i) => (
                <PlaceholderCompanyCard key={i} />
              ))}
            </>
          ) : (
            lists?.map(listItem => {
              return (
                <ElemListCard
                  key={listItem.id}
                  selectedTab={selectedListTab}
                  resource={{ ...listItem, resourceType: 'list' }}
                  refetchList={refetch}
                />
              );
            })
          )}
        </div>

        <Pagination
          shownItems={lists?.length}
          totalItems={listsAggregate}
          page={page}
          itemsPerPage={LIMIT}
          numeric
          onClickPrev={() => setPage(page - 1)}
          onClickNext={() => setPage(page + 1)}
          onClickToPage={selectedPage => setPage(selectedPage)}
        />
      </div>

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />

      <ElemCreateGroupDialog
        isOpen={isOpenCreateGroupDialog}
        onClose={onCloseCreateGroupDialog}
      />
    </DashboardLayout>
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
      where: getListsFilters(selectedTab as ListsTabType, user?.id || 0),
    },
    context.req.cookies,
  );

  return {
    props: {
      metaTitle: 'Lists - EdgeIn.io',
      metaDescription:
        'Connect with people who share your interests. Meet new people, share knowledge or get support. Find the group for you.',
      initialListsCount: listsData?.lists_aggregate?.aggregate?.count || 0,
      initialLists: listsData?.lists || [],
    },
  };
};

export default ListsPage;
