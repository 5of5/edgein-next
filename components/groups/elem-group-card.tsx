import { FC, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useUser } from '@/context/user-context';
import { User_Groups } from '@/graphql/types';
import { ElemButton } from '@/components/elem-button';
import { ElemPhoto } from '@/components/elem-photo';
import moment from 'moment-timezone';
import Link from 'next/link';
import {
  List_User_Groups_Bool_Exp,
  useGetListUserGroupsQuery,
} from '@/graphql/types';
import { GroupsTabItem } from '@/types/common';

type Props = {
  group: User_Groups;
  selectedGroupTab: GroupsTabItem;
  refetchGroupsPage: () => void;
};

export const ElemGroupCard: FC<Props> = ({
  group,
  selectedGroupTab,
  refetchGroupsPage,
}) => {
  const { user, refetchMyGroups } = useUser();

  const router = useRouter();

  const [groupData, setGroupData] = useState(group);

  useEffect(() => {
    setGroupData(group);
  }, [group]);

  const formatDateShown = (date: Date, timezone?: string) => {
    const local_date = moment(date).local().format('YYYY-MM-DD');
    return moment(local_date).format('LL');
  };

  const { id, name, updated_at, user_group_members, notes } = groupData;

  const { data: lists } = useGetListUserGroupsQuery(
    {
      where: {
        user_group_id: { _eq: id },
      } as List_User_Groups_Bool_Exp,
    },
    {
      enabled: Boolean(id),
    },
  );

  const { mutate: addGroupMember, isLoading: isJoiningGroup } = useMutation(
    async () => {
      const res = await fetch('/api/add-group-member/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId: groupData.id,
          userId: user?.id,
        }),
      });
      const apiResponse = await res.json();
      if (!res.ok) {
        throw apiResponse;
      } else {
        return apiResponse;
      }
    },
    {
      onSuccess: () => {
        refetchMyGroups();
        refetchGroupsPage();
        router.push(`/groups/${groupData.id}`);
      },
    },
  );

  return (
    <div className="flex flex-col mx-auto w-full p-4 bg-white border border-black/10 rounded-lg shadow">
      <div className="flex shrink-0 w-full mb-2">
        <Link href={`/groups/${id}`} passHref>
          <a className="font-bold break-words leading-none line-clamp-2 border-b border-primary-500 transition-all hover:border-b-2 hover:text-primary-500">
            {name}
          </a>
        </Link>
      </div>

      <div className="grow">
        <p className="inline text-slate-600 text-sm">
          {user_group_members.length > 0 && (
            <>
              {user_group_members.length}
              {user_group_members.length > 1 ? ' Members' : ' Member'}
            </>
          )}

          {lists?.list_user_groups && (
            <>
              {lists?.list_user_groups?.length > 0 && (
                <>
                  {' • '}
                  {lists?.list_user_groups?.length}
                  {lists?.list_user_groups?.length > 1 ? ' Lists' : ' List'}
                </>
              )}
            </>
          )}

          {notes?.length > 0 && (
            <>
              {' • '}
              {notes.length}
              {notes.length > 1 ? ' Notes' : ' Note'}
            </>
          )}
        </p>

        <p className="text-primary-500 text-sm">
          Updated {formatDateShown(updated_at)}
        </p>

        <div className="flex items-center mt-4 pl-1">
          <ul className="flex -space-x-3 overflow-hidden cursor-pointer">
            {user_group_members.slice(0, 6).map(mem => (
              <li key={mem.id}>
                {mem?.user?.person?.picture ? (
                  <ElemPhoto
                    photo={mem?.user.person?.picture}
                    wrapClass="flex items-center justify-center aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8"
                    imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
                    imgAlt={mem?.user.display_name}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center aspect-square w-8 rounded-full bg-slate-300 text-dark-500 border border-gray-50 text-lg capitalize"
                    title={
                      mem?.user?.display_name ? mem?.user?.display_name : ''
                    }
                  >
                    {mem?.user?.display_name?.charAt(0)}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Link href={`/groups/${id}`} passHref>
            <a className="font-medium text-sm text-slate-600 ml-1 hover:underline">
              {user_group_members.length > 1
                ? `${user_group_members.length} Members`
                : `${user_group_members.length} Member`}
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        {selectedGroupTab.id === 'my-groups' ||
        selectedGroupTab.id === 'joined' ? (
          <ElemButton
            href={`/groups/${id}`}
            btn="primary-light"
            size="sm"
            className="w-full block rounded-md !bg-primary-100 hover:!bg-primary-200 hover:!bg-opacity-50"
          >
            View Group
          </ElemButton>
        ) : (
          <ElemButton
            onClick={() => addGroupMember()}
            btn="slate"
            size="sm"
            loading={isJoiningGroup}
            className="w-full block rounded-md !bg-primary-100 hover:!bg-primary-200 hover:!bg-opacity-50"
          >
            Join Group
          </ElemButton>
        )}
      </div>
    </div>
  );
};
