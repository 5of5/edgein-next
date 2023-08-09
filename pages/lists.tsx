import React, { useEffect, useState, Fragment } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { PlaceholderCompanyCard } from '@/components/placeholders';
import { runGraphQl } from '@/utils';
import {
  GetListsQuery,
  GetListsDocument,
  useGetListsQuery,
  Lists_Bool_Exp,
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
import { ElemListCard } from '@/components/elem-list-card';
import { CreateListDialog } from '@/components/my-list/create-list-dialog';
import { ElemButton } from '@/components/elem-button';
import { ElemEmptyState } from '@/components/lists/elem-empty-state';

type Props = {
  initialListsCount: number;
  initialLists: GetListsQuery['lists'];
};

const LIMIT = 12;

const ListsPage: NextPage<Props> = ({ initialListsCount, initialLists }) => {
  const { user, listAndFollows } = useUser();
  const [initialLoad, setInitialLoad] = useState(true);

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);
  const [isOpenCreateListDialog, setIsOpenCreateListDialog] = useState(false);

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
  } = useGetListsQuery(
    {
      limit: LIMIT,
      offset,
      where: filters as Lists_Bool_Exp,
    },
    { enabled: Boolean(user?.id), refetchOnWindowFocus: false },
  );

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

  return (
    <DashboardLayout>
      <div className="mb-4 px-4 py-3 lg:flex items-center justify-between border-b border-gray-200">
        <nav className="flex space-x-2 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x">
          {LISTS_TABS &&
            LISTS_TABS.map((tab: any, index: number) =>
              tab.disabled === true ? (
                <Fragment key={index}></Fragment>
              ) : (
                <ElemButton
                  key={index}
                  onClick={() => setSelectedListTab(tab)}
                  btn="gray"
                  roundedFull={false}
                  className="rounded-lg"
                >
                  {tab.name}
                </ElemButton>
              ),
            )}
        </nav>
      </div>

      {lists?.length === 0 ? (
        <ElemEmptyState
          selectedTab={selectedListTab}
          onChangeTab={setSelectedListTab}
          onClickCreateList={onClickCreateList}
        />
      ) : (
        <div className="px-4 pb-2">
          <h1 className="font-medium text-xl capitalize">
            {selectedListTab.name}
          </h1>
        </div>
      )}

      <div className="px-4 py-3">
        <div className="grid gap-8 gap-x-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
          onClickPrev={() => setPage(page - 1)}
          onClickNext={() => setPage(page + 1)}
          onClickToPage={selectedPage => setPage(selectedPage)}
        />
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
        'Level up your research, due diligence, or portfolio management. Start with lists to monitor organizations and people of your interests.',
      initialListsCount: listsData?.lists_aggregate?.aggregate?.count || 0,
      initialLists: listsData?.lists || [],
    },
  };
};

export default ListsPage;
