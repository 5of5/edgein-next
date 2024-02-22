import React, { useEffect, useState, Fragment } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { PlaceholderCompanyCard } from '@/components/placeholders';
import { ElemButton } from '@/components/elem-button';
import { runGraphQl } from '@/utils';
import { IconGroup, IconGroupPlus } from '@/components/icons';
import {
  GetGroupsDocument,
  GetGroupsQuery,
  User_Groups_Bool_Exp,
  useGetGroupsQuery,
} from '@/graphql/types';
import { Pagination } from '@/components/pagination';
import { useStateParams } from '@/hooks/use-state-params';
import { onTrackView } from '@/utils/track';
import { useIntercom } from 'react-use-intercom';
import { GroupsTabType } from '@/types/common';
import { useUser } from '@/context/user-context';
import { GROUPS_TABS } from '@/utils/constants';
import { getGroupsFilters } from '@/components/filters/processor';
import CookieService from '@/utils/cookie';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import ElemCreateGroupDialog from '@/components/group/elem-create-group-dialog';
import { ElemListCard } from '@/components/elem-list-card';
import { NextSeo } from 'next-seo';

type Props = {
  initialGroupsCount: number;
  initialGroups: GetGroupsQuery['user_groups'];
};

const LIMIT = 12;

const Groups: NextPage<Props> = ({ initialGroupsCount, initialGroups }) => {
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
    <>
      <NextSeo
        title="Groups: Discover, Join, Create or Manage Them"
        description="EdgeIn groups provide a place for professionals in the same industry or with similar interests to share their insights, ask for guidance, and build valuable connections."
      />
      <DashboardLayout>
        <div className="items-center justify-between px-8 pt-4 pb-6 lg:flex">
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
                    }`}
                  >
                    {tab.name}
                  </ElemButton>
                ),
              )}
          </nav>
        </div>

        {groups?.length === 0 ? (
          <div className="flex items-center justify-center mx-auto min-h-[40vh]">
            <div className="w-full max-w-2xl p-8 my-8 text-center bg-white border rounded-2xl border-dark-500/10">
              <IconGroup className="w-12 h-12 mx-auto text-slate-300" />
              <h1 className="mt-5 text-3xl font-bold">
                {selectedGroupTab.id === 'my-groups'
                  ? 'Create a group'
                  : selectedGroupTab.id === 'joined'
                  ? 'Join a group'
                  : selectedGroupTab.id === 'discover'
                  ? 'Discover'
                  : ''}
              </h1>
              <div className="mt-1 text-lg text-slate-600">
                {selectedGroupTab.id === 'discover'
                  ? 'There are no groups that are visible to the public yet, if you make your group public it will appear here.'
                  : 'Groups allow you to collaborate on notes, share insights, and track leads with other people.'}
              </div>
              {selectedGroupTab.id === 'my-groups' ? (
                <ElemButton
                  onClick={onClickCreateGroup}
                  btn="primary"
                  className="mt-3"
                >
                  <IconGroupPlus className="w-6 h-6 mr-1" />
                  Create New Group
                </ElemButton>
              ) : selectedGroupTab.id === 'joined' ? (
                <ElemButton
                  onClick={() =>
                    setSelectedGroupTab({
                      id: 'discover',
                      name: 'Discover',
                    })
                  }
                  btn="primary"
                  className="mt-3"
                >
                  <IconGroupPlus className="w-6 h-6 mr-1" />
                  Discover groups
                </ElemButton>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div className="px-8 pb-2">
            <h1 className="text-4xl font-medium">{selectedGroupTab.name}</h1>
          </div>
        )}

        <div className="px-8 py-3">
          <div className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {error ? (
              <div className="flex items-center justify-center mx-auto min-h-[40vh] col-span-3">
                <div className="max-w-xl mx-auto">
                  <h4 className="mt-5 text-3xl font-bold">
                    Error loading groups
                  </h4>
                  <div className="mt-1 text-lg text-slate-600">
                    Please check spelling, reset filters, or{' '}
                    <button
                      onClick={() =>
                        showNewMessages(
                          `Hi EdgeIn, I'd like to report an error on groups page`,
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
              groups?.map(group => {
                return (
                  <ElemListCard
                    key={group.id}
                    selectedTab={selectedGroupTab}
                    resource={{ ...group, resourceType: 'group' }}
                    refetchList={refetch}
                  />
                );
              })
            )}
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
