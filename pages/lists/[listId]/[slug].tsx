import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { CompaniesList } from '@/components/my-list/companies-list';
import { InvestorsList } from '@/components/my-list/investors-list';
import { ElemListInformation } from '@/components/my-list/elem-list-information';
import { IconCustomList } from '@/components/icons';
import {
  useGetListUserGroupsQuery,
  List_User_Groups_Bool_Exp,
  useGetListQuery,
  Lists,
  GetListQuery,
  GetListDocument,
} from '@/graphql/types';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { runGraphQl } from '@/utils';
import { getNameFromListName } from '@/utils/lists';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '@/context/user-context';
import { ElemButton } from '@/components/elem-button';
import { PeopleList } from '@/components/my-list/people-list';
import { useMutation } from 'react-query';
import { ROUTES } from '@/routes';
import { NextSeo } from 'next-seo';
import { toLabel } from 'utils';
import { ElemListBreadcrumb } from '@/components/my-list/elem-list-breadcrumb';
import { ElemListSettings } from '@/components/my-list/elem-list-settings';

type Props = {
  list: Lists;
};

const MyList: NextPage<Props> = ({ list }) => {
  const { user, refetchMyLists } = useUser();
  const router = useRouter();
  const { listId } = router.query;

  const [openListSettings, setOpenListSettings] = useState(false);
  const [theList, setTheList] = useState<Lists>(list);

  const listName = theList?.name === 'crap' ? 'sh**' : theList?.name;

  const isListAuthor = theList?.created_by?.id === user?.id;
  const isFollowing = theList?.list_members.some(
    mem => mem.user?.id === user?.id,
  );
  const isPublicList = !!theList?.public;
  const isCustomList = theList
    ? !['hot', 'like', 'crap'].includes(getNameFromListName(theList))
    : false;

  const {
    data: listData,
    refetch: refetchList,
    isRefetching: isListDataReFetching,
    // error,
    // isLoading,
  } = useGetListQuery({
    id: parseInt(listId as string),
  });

  useEffect(() => {
    if (listData) {
      setTheList(listData?.lists[0] as Lists);
    }
  }, [listData]);

  const onSaveListName = async (name: string) => {
    const updateNameRes = await fetch(`/api/update-list/`, {
      method: 'PUT',
      body: JSON.stringify({
        id: theList?.id,
        payload: { name },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (updateNameRes.ok) {
      refetchList();
      toast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
            List name updated
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
        id: theList?.id,
        payload: { description },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (updateDescRes.ok) {
      refetchList();
      toast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
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

  const { data: groups, refetch: refetchGroups } = useGetListUserGroupsQuery(
    {
      where: {
        list_id: { _eq: theList?.id },
      } as List_User_Groups_Bool_Exp,
    },
    {
      enabled: Boolean(theList?.id),
    },
  );

  const onSaveListGroups = async (groupIds: Array<number>) => {
    const res = await fetch('/api/add-group-to-list/', {
      method: 'POST',
      body: JSON.stringify({
        listId: theList?.id,
        groupIds,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      refetchGroups();
      refetchList();
      toast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
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
        id: theList?.id,
        payload: { public: value },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      refetchList();
      toast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
            {value ? `List set "Public"` : `List set "Private"`}
          </div>
        ),
        {
          duration: 3000,
          position: 'top-center',
        },
      );
    }
  };

  const { mutate: onDeleteList, isLoading: isDeleting } = useMutation(
    (id: number) =>
      fetch(`/api/delete-list/?listId=${id}`, {
        method: 'DELETE',
      }),
    {
      onSuccess: () => {
        router.push(ROUTES.LISTS);
        refetchMyLists();
        toast.custom(
          t => (
            <div
              className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                t.visible ? 'animate-fade-in-up' : 'opacity-0'
              }`}>
              List Deleted
            </div>
          ),
          {
            duration: 3000,
            position: 'top-center',
          },
        );
      },
    },
  );

  const { mutate: followList, isLoading: isFollowListLoading } = useMutation(
    () =>
      fetch('/api/toggle-follow-list', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listId: theList?.id,
          userId: user?.id,
        }),
      }),
    {
      onSuccess: () => {
        refetchList();
      },
    },
  );

  const onFollowList = () => {
    followList();
    refetchList();
  };

  const onOpenSettingsDialog = () => {
    setOpenListSettings(true);
  };

  const onCloseSettingsDialog = () => {
    setOpenListSettings(false);
  };

  const isFollowButtonLoading = isFollowListLoading || isListDataReFetching;

  return (
    <>
      <NextSeo
        title={`List: ${toLabel(theList?.name ? theList?.name : '')}`}
        description={`${
          theList?.description
            ? `By ${theList?.created_by?.person?.name} - ${theList?.description}`
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
        <ElemListBreadcrumb
          list={theList}
          isListAuthor={isListAuthor}
          onOpenSettingsDialog={onOpenSettingsDialog}
        />

        <ElemListInformation
          list={theList}
          isListAuthor={isListAuthor}
          isPublicList={isPublicList}
          isFollowing={isFollowing}
          isFollowButtonLoading={isFollowButtonLoading}
          onFollowList={onFollowList}
          onOpenSettingsDialog={onOpenSettingsDialog}
        />

        <ElemListSettings
          list={theList}
          isPublicList={isPublicList}
          onSaveListName={onSaveListName}
          onSaveListDescription={onSaveListDescription}
          onSaveListGroups={onSaveListGroups}
          groups={
            groups
              ? groups?.list_user_groups?.map(group => group.user_group)
              : []
          }
          onChangePublic={onChangePublic}
          onDeleteList={onDeleteList}
          isDeleting={isDeleting}
          listSettingsModal={openListSettings}
          onCloseSettingsDialog={onCloseSettingsDialog}
        />

        {!user && (
          <div className="mx-4">
            <div className="w-full p-12 text-center border border-gray-300 rounded-lg">
              <div className="max-w-md mx-auto">
                <IconCustomList
                  className="w-12 h-12 mx-auto text-gray-300"
                  title="Join List"
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

        {user && (!isCustomList || isFollowing || isListAuthor) && (
          <>
            <CompaniesList
              listId={theList?.id}
              listName={listName}
              isListAuthor={isListAuthor}
            />

            <InvestorsList
              listId={theList?.id}
              listName={listName}
              isListAuthor={isListAuthor}
            />

            <PeopleList
              listId={theList?.id}
              listName={listName}
              isListAuthor={isListAuthor}
            />
          </>
        )}

        {user && !isListAuthor && !isFollowing && (
          <div className="mx-4">
            <div className="w-full p-12 text-center border border-gray-200 rounded-lg">
              <IconCustomList
                className="w-12 h-12 mx-auto text-gray-300"
                title="Follow List"
              />
              <h3 className="mt-2 text-lg font-medium">
                {isPublicList
                  ? 'Follow list to access and view updates.'
                  : 'Private List. Only list author can view this list.'}
              </h3>
              {isPublicList && (
                <ElemButton
                  btn="purple"
                  loading={isFollowButtonLoading}
                  onClick={onFollowList}
                  className="mt-2">
                  Follow
                </ElemButton>
              )}
            </div>
          </div>
        )}
        <Toaster />
      </DashboardLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { data: list } = await runGraphQl<GetListQuery>(
    GetListDocument,
    { id: context.params?.listId },
    context.req.cookies,
  );

  const theList = list?.lists[0];

  if (!theList) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      list: theList,
    },
  };
};

export default MyList;
