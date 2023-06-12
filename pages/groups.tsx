import React, { useEffect, useState, Fragment } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { PlaceholderCompanyCard } from '@/components/placeholders';
import { ElemGroupCard } from '@/components/groups/elem-group-card';
import { ElemButton } from '@/components/elem-button';
import { runGraphQl } from '@/utils';
import { IconSearch, IconAnnotation } from '@/components/icons';
import {
  User_Groups,
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
import { getGroupsFilters } from '@/utils/filter';
import CookieService from '@/utils/cookie';

type Props = {
  initialGroupsCount: number;
  initialGroups: GetGroupsQuery['user_groups'];
};

const LIMIT = 12;

const Groups: NextPage<Props> = ({ initialGroupsCount, initialGroups }) => {
  const { user } = useUser();
  const [initialLoad, setInitialLoad] = useState(true);

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
  } = useGetGroupsQuery({
    limit: LIMIT,
    offset,
    where: filters as User_Groups_Bool_Exp,
  });

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const groups = initialLoad ? initialGroups : groupsData?.user_groups;
  const groups_aggregate = initialLoad
    ? initialGroupsCount
    : groupsData?.user_groups_aggregate?.aggregate?.count || 0;

  const { showNewMessages } = useIntercom();

  return (
    <DashboardLayout>
      <div className="pb-20">
        <nav className="flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x bg-white shadow rounded-lg shrink-0">
          {GROUPS_TABS &&
            GROUPS_TABS.map((tab, index: number) =>
              tab.disabled === true ? (
                <Fragment key={index}></Fragment>
              ) : (
                <button
                  key={index}
                  onClick={() => setSelectedGroupTab(tab)}
                  className={`whitespace-nowrap flex py-3 px-3 border-b-2 box-border font-bold transition-all ${
                    selectedGroupTab.id === tab.id
                      ? 'text-primary-500 border-primary-500'
                      : 'border-transparent  hover:bg-slate-200'
                  } ${tab.disabled ? 'cursor-not-allowed' : ''}`}
                >
                  {tab.name}
                </button>
              ),
            )}
        </nav>

        <div className="w-full mt-6 mb-2">
          <h1 className="font-bold text-xl capitalize">
            {selectedGroupTab.name}
          </h1>
          {/* <p className="text-slate-600">Groups you manage.</p> */}
        </div>
        {groups?.length === 0 && (
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
                    `Hi EdgeIn, I'd like to report an issue on groups page`,
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

        <div className={`grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
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
                <ElemGroupCard
                  key={group.id}
                  group={group as User_Groups}
                  selectedGroupTab={selectedGroupTab}
                  refetchGroupsPage={refetch}
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
          numeric
          onClickPrev={() => setPage(page - 1)}
          onClickNext={() => setPage(page + 1)}
          onClickToPage={selectedPage => setPage(selectedPage)}
        />
      </div>
    </DashboardLayout>
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
      metaTitle: 'Groups - EdgeIn.io',
      metaDescription:
        'Connect with people who share your interests. Meet new people, share knowledge or get support. Find the group for you.',
      initialGroupsCount: group?.user_groups_aggregate?.aggregate?.count || 0,
      initialGroups: group?.user_groups || [],
    },
  };
};

export default Groups;
