import React, { useEffect, useState, Fragment } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import {
  PlaceholderCompanyCard,
  PlaceholderTable,
} from '@/components/placeholders';
import { ElemButton } from '@/components/elem-button';
import { runGraphQl } from '@/utils';
import { IconGroup, IconTable } from '@/components/icons';
import {
  GetGroupsDocument,
  GetGroupsQuery,
  User_Groups_Bool_Exp,
  Order_By,
  User_Groups_Order_By,
  useGetGroupsQuery,
} from '@/graphql/types';
import { Pagination } from '@/components/pagination';
import { useStateParams } from '@/hooks/use-state-params';
import { onTrackView } from '@/utils/track';
import { GroupsTabType } from '@/types/common';
import { useUser } from '@/context/user-context';
import { GROUPS_TABS } from '@/utils/constants';
import { getGroupsFilters } from '@/components/filters/processor';
import CookieService from '@/utils/cookie';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import { CreateGroupDialog } from '@/components/group/create-group-dialog';
import { ElemListCard } from '@/components/lists/elem-list-card';
import { NextSeo } from 'next-seo';
import { GroupsNoResults } from '@/components/groups/groups-no-results';
import { ElemDropdown } from '@/components/elem-dropdown';
import { GroupsTable } from '@/components/groups/elem-groups-table';

type Props = {
  initialGroupsCount: number;
  initialGroups: GetGroupsQuery['user_groups'];
};

const LIMIT = 12;

const Groups: NextPage<Props> = ({ initialGroupsCount, initialGroups }) => {
  const { user, myGroups } = useUser();
  const [initialLoad, setInitialLoad] = useState(true);

  const [tableLayout, setTableLayout] = useState(false);
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

  const [selectedGroupTab, setSelectedGroupTab] = useStateParams(
    GROUPS_TABS[0],
    'tab',
    tab => tab.id,
    tabId => GROUPS_TABS.find(grTab => grTab.id === tabId) || GROUPS_TABS[0],
  );

  const filters = getGroupsFilters(selectedGroupTab.id, user?.id || 0);

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
    data: groupsData,
    error,
    isLoading,
    refetch,
  } = useGetGroupsQuery(
    {
      limit: LIMIT,
      offset,
      where: filters as User_Groups_Bool_Exp,
      orderBy: [
        {
          user_group_members_aggregate: { count: Order_By.Desc },
          // created_at: Order_By.Desc
        } as User_Groups_Order_By,
      ],
    },
    { enabled: Boolean(user?.id), refetchOnWindowFocus: false },
  );

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const groups = initialLoad ? initialGroups : groupsData?.user_groups;
  const groups_aggregate = initialLoad
    ? initialGroupsCount
    : groupsData?.user_groups_aggregate?.aggregate?.count || 0;

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
        title="Groups: Discover, Join, Create or Manage Them"
        description="EdgeIn groups provide a place for professionals in the same industry or with similar interests to share their insights, ask for guidance, and build valuable connections."
      />
      <DashboardLayout>
        <div className="items-center justify-between px-4 pt-4 pb-6 sm:px-6 sm:flex lg:px-8">
          <nav className="flex space-x-2 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x">
            {GROUPS_TABS &&
              GROUPS_TABS.map((tab: any, index: number) =>
                tab.disabled === true ? (
                  <Fragment key={index}></Fragment>
                ) : (
                  <ElemButton
                    key={index}
                    onClick={() => setSelectedGroupTab(tab)}
                    btn="gray"
                    roundedFull={false}
                    className={`py-2 rounded-lg ${
                      selectedGroupTab?.id === tab.id
                        ? 'border-primary-500 hover:border-primary-500 hover:bg-gray-200'
                        : ''
                    }`}>
                    {tab.name}
                  </ElemButton>
                ),
              )}
          </nav>
          <ElemDropdown
            buttonClass="mt-4 sm:mt-0"
            //panelClass="w-full"
            ButtonIcon={tableLayout ? IconTable : IconGroup}
            items={layoutItems}
          />
        </div>

        <div className="px-4 py-3 sm:px-6 lg:px-8">
          {groups?.length != 0 && (
            <div className="pb-2">
              <h1 className="text-4xl font-medium">{selectedGroupTab.name}</h1>
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
          ) : tableLayout && groups?.length != 0 ? (
            <GroupsTable
              groups={groups}
              pageNumber={page}
              shownItems={LIMIT}
              totalItems={groups_aggregate}
              onClickPrev={() => setPage(page - 1)}
              onClickNext={() => setPage(page + 1)}
            />
          ) : groups?.length != 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {groups?.map(group => {
                  return (
                    <ElemListCard
                      key={group.id}
                      selectedTab={selectedGroupTab}
                      resource={{ ...group, resourceType: 'group' }}
                      refetchList={refetch}
                    />
                  );
                })}
              </div>
              <Pagination
                shownItems={groups?.length}
                totalItems={groups_aggregate}
                page={page}
                itemsPerPage={LIMIT}
                onClickPrev={() => setPage(page - 1)}
                onClickNext={() => setPage(page + 1)}
                onClickToPage={selectedPage => setPage(selectedPage)}
              />
            </>
          ) : (
            <GroupsNoResults
              selectedTab={selectedGroupTab}
              onChangeTab={setSelectedGroupTab}
              onClickCreateGroup={onClickCreateGroup}
            />
          )}
        </div>

        <ElemUpgradeDialog
          isOpen={isOpenUpgradeDialog}
          onClose={onCloseUpgradeDialog}
        />
        <CreateGroupDialog
          isOpen={isOpenCreateGroupDialog}
          onClose={onCloseCreateGroupDialog}
        />
      </DashboardLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const token = CookieService.getAuthToken(context.req.cookies);
  const user = await CookieService.getUser(token);

  const selectedTab = context.query.tab || 'my-groups';

  const page =
    context.query.page !== undefined ? Number(context.query.page) - 1 : 0;
  const offset = LIMIT * page;

  const { data: group } = await runGraphQl<GetGroupsQuery>(
    GetGroupsDocument,
    {
      offset,
      limit: LIMIT,
      where: getGroupsFilters(selectedTab as GroupsTabType, user?.id || 0),
    },
    context.req.cookies,
  );

  return {
    props: {
      initialGroupsCount: group?.user_groups_aggregate?.aggregate?.count || 0,
      initialGroups: group?.user_groups || [],
    },
  };
};

export default Groups;
