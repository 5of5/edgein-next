import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { CompaniesList } from '@/components/my-list/companies-list';
import { InvestorsList } from '@/components/my-list/investors-list';
import { ElemListInformation } from '@/components/my-list/elem-list-information';
import { IconCustomList } from '@/components/icons';
import {
  useGetListUserGroupsQuery,
  List_User_Groups_Bool_Exp,
  List_Members_Bool_Exp,
  useGetListMembersQuery,
  GetListsDocument,
  GetListsQuery,
} from '@/graphql/types';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { find } from 'lodash';
import { runGraphQl } from '@/utils';
import { getNameFromListName } from '@/utils/reaction';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '@/context/user-context';
import { ElemButton } from '@/components/elem-button';
import { PeopleList } from '@/components/my-list/people-list';
import { useMutation } from 'react-query';
import { ROUTES } from '@/routes';
import { NextSeo } from 'next-seo';
import { toLabel } from 'utils';

type Props = {
  list: GetListsQuery['lists'][0];
};

const MyList: NextPage<Props> = (props: Props) => {
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

  const [listDescription, setListDescription] = useState<null | string>('');

  const [isCustomList, setIsCustomList] = useState(false);

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

  const onSaveListDescription = async (description: string) => {
    const updateDescRes = await fetch(`/api/update-list/`, {
      method: 'PUT',
      body: JSON.stringify({
        id: parseInt(router.query.listId as string),
        payload: { description },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (updateDescRes.ok) {
      setListDescription(description);
      refreshProfile();
      toast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            List description updated
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

      router.push(ROUTES.LISTS);
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

        setListDescription(() => {
          return list ? list.description : '';
        });

        setTheListPublic(!!list?.public);

        setTheListCreatorId(() => {
          return list ? list.created_by_id : '';
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
  }, [lists, router.query]);

  const listName = selectedListName === 'crap' ? 'sh**' : selectedListName;

  const isFollowing = listMembers.some(mem => mem.list_id === theList?.id);

  useEffect(() => {
    if (router.isReady) {
      setTheListId(parseInt(router.query?.listId as string));
    }
  }, [router]);

  const isFollowButtonLoading = isFollowListLoading || isListMembersReFetching;

  return (
    <>
      <NextSeo
        title={`List: ${toLabel(listName ? listName : '')}`}
        description={`${
          listDescription
            ? `By ${theList?.created_by?.person?.name} - ${listDescription}`
            : ''
        }`}
        openGraph={{
          images: [
            {
              url: 'https://edgein.io/images/og/list-sharing.jpg',
              width: 800,
              height: 600,
              alt: 'List',
              type: 'image/jpeg',
            },
          ],
        }}
      />
      <DashboardLayout>
        <ElemListInformation
          list={theList}
          groups={
            groups?.list_user_groups?.map(group => group.user_group) || []
          }
          onSaveListName={onSaveListName}
          onSaveListDescription={onSaveListDescription}
          onDeleteList={onDeleteList}
          onAddGroups={onAddGroups}
          onChangePublic={onChangePublic}
          isFollowing={isFollowing}
          isFollowButtonLoading={isFollowButtonLoading}
          onFollowList={handleFollowList}
        />

        {!user && (
          <div className="mx-4">
            <div className="border border-gray-300 rounded-lg w-full p-12 text-center">
              <div className="max-w-md mx-auto">
                <IconCustomList
                  className="mx-auto h-12 w-12 text-gray-300"
                  title="Join Group"
                />
                <h3 className="mt-2 text-lg font-medium">
                  Sign in to access list and view updates.
                </h3>
                <p className="mt-1 text-gray-500">
                  Access list, get unlimited browsing, personalized results,
                  custom tools, and much more.
                </p>
                <ElemButton btn="purple" href={ROUTES.SIGN_IN} className="mt-2">
                  Sign in for free
                </ElemButton>
              </div>
            </div>
          </div>
        )}

        {user &&
          (!isCustomList || isFollowing || theListCreatorId === user?.id) && (
            <>
              <CompaniesList createdById={theList?.created_by_id} listId={theListId} listName={listName} />

              <InvestorsList createdById={theList?.created_by_id} listId={theListId} listName={listName} />

              <PeopleList createdById={theList?.created_by_id} listId={theListId} listName={listName} />
            </>
          )}

        {user && theListCreatorId != user?.id && !isFollowing && (
          <div className="mx-4">
            <div className="border border-gray-300 rounded-lg w-full p-12 text-center">
              <IconCustomList
                className="mx-auto h-12 w-12 text-gray-300"
                title="Follow List"
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { data: lists } = await runGraphQl<GetListsQuery>(
    GetListsDocument,
    {
      limit: null,
      offset: null,
      where: {
        id: { _eq: parseInt(context.params?.listId as string) },
      },
    },
    context.req.cookies,
  );

  if (!lists?.lists[0]) {
    return {
      notFound: true,
    };
  }

  const list = lists?.lists[0];

  return {
    props: {
      list,
    },
  };
};

export default MyList;
