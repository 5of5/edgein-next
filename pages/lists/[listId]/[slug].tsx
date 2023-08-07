import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { CompaniesList } from '@/components/my-list/companies-list';
import { InvestorsList } from '@/components/my-list/investors-list';
import { ElemListInformation } from '@/components/my-list/elem-list-information';
import { IconCustomList } from '@/components/icons';
import { PlaceholderTable } from '@/components/placeholders';

import {
  Follows_Companies,
  Follows_Vc_Firms,
  Follows_People,
  useGetVcFirmsByListIdQuery,
  useGetCompaniesByListIdQuery,
  useGetListUserGroupsQuery,
  List_User_Groups_Bool_Exp,
  useGetPeopleByListIdQuery,
  Users,
  List_Members_Bool_Exp,
  useGetListMembersQuery,
} from '@/graphql/types';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { find } from 'lodash';
import {
  getNameFromListName,
  getUserIdFromListCreator,
} from '@/utils/reaction';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '@/context/user-context';
import { ElemButton } from '@/components/elem-button';
import { PeopleList } from '@/components/my-list/people-list';
import { useMutation } from 'react-query';

type Props = {};

const MyList: NextPage<Props> = () => {
  const { listAndFollows: lists, refreshProfile, user } = useUser();
  const router = useRouter();

  const {
    data,
    refetch,
    isRefetching: isListMembersReFetching,
  } = useGetListMembersQuery(
    {
      where: {
        user_id: { _eq: user?.id },
      } as List_Members_Bool_Exp,
    },
    {
      enabled: Boolean(user?.id),
      refetchOnWindowFocus: false,
    },
  );
  const listMembers = data?.list_members || [];

  const [selectedListName, setSelectedListName] = useState<null | string>(
    router.query.slug as string,
  );

  const [isCustomList, setIsCustomList] = useState(false);

  const [companies, setCompanies] = useState<Follows_Companies[]>([]);
  const [vcfirms, setVcfirms] = useState<Follows_Vc_Firms[]>([]);
  const [people, setPeople] = useState<Follows_People[]>([]);

  const { data: groups, refetch: refetchGroups } = useGetListUserGroupsQuery(
    {
      where: {
        list_id: { _eq: parseInt(router.query.listId as string) },
      } as List_User_Groups_Bool_Exp,
    },
    {
      enabled: Boolean(router.query.listId),
    },
  );

  const onSaveListName = async (name: string) => {
    const updateNameRes = await fetch(`/api/update-list/`, {
      method: 'PUT',
      body: JSON.stringify({
        id: parseInt(router.query.listId as string),
        payload: { name },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (updateNameRes.ok) {
      setSelectedListName(name);
      refreshProfile();
      toast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            List updated
          </div>
        ),
        {
          duration: 3000,
          position: 'top-center',
        },
      );
    }
  };

  const onDeleteList = async (id: number) => {
    const deleteRes = await fetch(`/api/delete-list/?listId=${id}`, {
      method: 'DELETE',
    });

    if (deleteRes.ok) {
      const hotId =
        find(lists, list => 'hot' === getNameFromListName(list))?.id || 0;

      router.push(`/lists/${hotId}/hot`);
      //router.reload();
      refreshProfile();
      toast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            List Deleted
          </div>
        ),
        {
          duration: 3000,
          position: 'top-center',
        },
      );
    }
  };

  const onAddGroups = async (groupIds: Array<number>) => {
    const res = await fetch('/api/add-group-to-list/', {
      method: 'POST',
      body: JSON.stringify({
        listId: parseInt(router.query.listId as string),
        groupIds,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      refetchGroups();
      refreshProfile();
      toast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            Groups Changed
          </div>
        ),
        {
          duration: 3000,
          position: 'top-center',
        },
      );
    }
  };

  const onChangePublic = async (value: boolean) => {
    const res = await fetch(`/api/update-list/`, {
      method: 'PUT',
      body: JSON.stringify({
        id: parseInt(router.query.listId as string),
        payload: { public: value },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      setTheListPublic(value);
      refreshProfile();
      toast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            List updated
          </div>
        ),
        {
          duration: 3000,
          position: 'top-center',
        },
      );
    }
  };
  const { mutate: followList, isLoading: isFollowListLoading } = useMutation(
    () =>
      fetch('/api/toggle-follow-list', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listId: theListId,
          userId: user?.id,
        }),
      }),
    {
      onSuccess: () => {
        refetch();
        refreshProfile();
        refetchCompanies();
        refetchVcFirms();
        refetchPeople();
      },
    },
  );

  const handleFollowList = () => {
    followList();
  };

  const [theListId, setTheListId] = useState(0);

  const [theListCreatorId, setTheListCreatorId] = useState<any>();

  const [theListPublic, setTheListPublic] = useState<boolean>(false);

  const [theList, setTheList] = useState<any>();

  useEffect(() => {
    if (lists) {
      const list = find(lists, {
        id: parseInt((router.query.listId as string) || '0'),
      });

      if (list) {
        setTheList(() => {
          return list ? list : null;
        });

        setSelectedListName(() => {
          return list ? getNameFromListName(list) : '';
        });

        setTheListPublic(!!list?.public);

        setTheListCreatorId(() => {
          return list ? getUserIdFromListCreator(list) : '';
        });

        setIsCustomList(() => {
          return list
            ? !['hot', 'like', 'crap'].includes(getNameFromListName(list))
            : false;
        });
      } else {
        setSelectedListName(router.query.slug as string);
        setIsCustomList(
          !['like', 'hot', 'sh**'].includes(router.query.slug as string),
        );
      }
    }
  }, [
    lists,
    router.query.listId,
    router.query.slug,
    setTheList,
    setSelectedListName,
    setTheListCreatorId,
    setIsCustomList,
    setTheListPublic,
  ]);

  const isFollowing = listMembers.some(mem => mem.list_id === theList?.id);

  useEffect(() => {
    if (router.isReady) {
      setTheListId(parseInt(router.query?.listId as string));
    }
  }, [router]);

  const {
    data: companiesData,
    error: companiesError,
    isLoading: companiesLoading,
    refetch: refetchCompanies,
  } = useGetCompaniesByListIdQuery({
    list_id: theListId,
  });

  const {
    data: vcFirms,
    error: vcFirmsError,
    isLoading: vcFirmsLoading,
    refetch: refetchVcFirms,
  } = useGetVcFirmsByListIdQuery({
    list_id: theListId,
  });

  const {
    data: listPeople,
    error: listPeopleError,
    isLoading: listPeopleLoading,
    refetch: refetchPeople,
  } = useGetPeopleByListIdQuery({
    list_id: theListId,
  });

  useEffect(() => {
    if (companiesData)
      setCompanies(companiesData?.follows_companies as Follows_Companies[]);
    if (vcFirms) setVcfirms(vcFirms?.follows_vc_firms as Follows_Vc_Firms[]);
    if (listPeople) setPeople(listPeople?.follows_people as Follows_People[]);
  }, [companiesData, vcFirms, listPeople]);

  const isFollowButtonLoading = isFollowListLoading || isListMembersReFetching;

  return (
    <DashboardLayout>
      <ElemListInformation
        list={theList}
        groups={groups?.list_user_groups?.map(group => group.user_group) || []}
        onSaveListName={onSaveListName}
        onDeleteList={onDeleteList}
        onAddGroups={onAddGroups}
        onChangePublic={onChangePublic}
        isFollowing={isFollowing}
        isFollowButtonLoading={isFollowButtonLoading}
        onFollowList={handleFollowList}
      />

      {(!isCustomList || isFollowing || theListCreatorId === user?.id) && (
        <>
          {companiesError ? (
            <h4>Error loading companies</h4>
          ) : companiesLoading ? (
            <div className="rounded-lg px-4 border border-gray-200">
              <PlaceholderTable />
            </div>
          ) : (
            <CompaniesList
              companies={companies}
              selectedListName={selectedListName}
              isCustomList={isCustomList}
            />
          )}

          {vcFirmsError ? (
            <h4>Error loading Investors</h4>
          ) : vcFirmsLoading ? (
            <div className="rounded-lg px-4 border border-gray-200">
              <PlaceholderTable />
            </div>
          ) : (
            <InvestorsList
              vcfirms={vcfirms}
              selectedListName={selectedListName}
              isCustomList={isCustomList}
            />
          )}

          {listPeopleError ? (
            <h4>Error loading people</h4>
          ) : listPeopleLoading ? (
            <div className="rounded-lg p-5 bg-white shadow mb-8 overflow-auto">
              <PlaceholderTable />
            </div>
          ) : (
            <PeopleList people={people} selectedListName={selectedListName} />
          )}
        </>
      )}

      {theListCreatorId != user?.id && !isFollowing && (
        <div className="mx-4">
          <div className="border border-gray-300 rounded-lg w-full p-12 text-center">
            <IconCustomList
              className="mx-auto h-12 w-12 text-gray-300"
              title="Join Group"
            />
            <h3 className="mt-2 text-lg font-medium">
              Follow list to access and view updates.
            </h3>
            <ElemButton
              btn="purple"
              loading={isFollowButtonLoading}
              onClick={handleFollowList}
              className="mt-2"
            >
              Follow
            </ElemButton>
          </div>
        </div>
      )}

      <Toaster />
    </DashboardLayout>
  );
};

export default MyList;
