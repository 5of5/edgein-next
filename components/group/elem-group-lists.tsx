import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import useToast from '@/hooks/use-toast';
import { kebabCase } from 'lodash';
import {
  IconSidebarList,
  IconPlus,
  IconCheck,
  IconInformationCircle,
} from '@/components/icons';
import { ElemButton } from '@/components/elem-button';
import { getNameFromListName } from '@/utils/lists';
import {
  Lists,
  List_Members_Bool_Exp,
  User_Groups,
  useGetListMembersQuery,
} from '@/graphql/types';
import { useUser } from '@/context/user-context';
import ElemAddListDialog from './elem-add-list-dialog';
import differenceBy from 'lodash/differenceBy';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';
import { ElemTooltip } from '../elem-tooltip';
import { formatDateShown, numberWithCommas } from '@/utils';
import { ElemListTooltip } from '../lists/elem-list-tooltip';

type Props = {
  className?: string;
  group: User_Groups;
  lists: Array<Lists>;
  refetchLists: () => void;
};

export const ElemGroupLists: React.FC<Props> = ({
  group,
  lists,
  refetchLists,
  className,
}) => {
  const { user, listAndFollows, refreshProfile } = useUser();
  const { toast } = useToast();

  const [isOpenAddList, setIsOpenAddList] = useState<boolean>(false);

  const { data, refetch } = useGetListMembersQuery(
    {
      where: {
        user_id: { _eq: user?.id },
      } as List_Members_Bool_Exp,
    },
    {
      enabled: Boolean(user?.id),
    },
  );
  const listMembers = data?.list_members || [];

  const userCustomLists = listAndFollows?.filter(
    list => !['hot', 'crap', 'like'].includes(getNameFromListName(list)),
  );

  const userSortedLists = [
    ...userCustomLists.filter(list => list?.created_by?.id === user?.id), // lists created by user
    ...userCustomLists.filter(list => list?.created_by?.id != user?.id), // lists followed by user
  ];

  const listOptions = differenceBy(userSortedLists, lists, 'id').map(item => ({
    id: item.id,
    title: `${getNameFromListName(item)}`,
    description: `by ${item.created_by?.display_name} | ${item.total_no_of_resources} items`,
  }));

  const groupLists = [
    ...lists.filter(list => list?.created_by?.id != user?.id), // lists shared by other group members
    ...lists.filter(list => list?.created_by?.id === user?.id), // lists shared by user
  ];

  const handleToggleFollow = async (listId: number, isFollowing: boolean) => {
    const response = await fetch('/api/toggle-follow-list/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listId,
        userId: user?.id,
      }),
    });

    if (response.status === 200) {
      refetch();
      if (isFollowing) {
        toast('List unfollowed');
      }
      refreshProfile();
    }
  };

  const handleAddList = async (listIds: Array<number>) => {
    const response = await fetch('/api/add-list-to-group/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupId: group?.id,
        listIds,
      }),
    });

    if (response.status === 200) {
      refetchLists();
      refreshProfile();
      toast('Lists Added');
    }
  };

  return (
    <div className={`${className ? className : ''}`}>
      <div className="border border-gray-300 rounded-lg shrink-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
          <div className="flex items-center">
            <h2 className="mr-1 text-lg font-medium">{`Lists (${groupLists.length})`}</h2>
            <ElemTooltip
              size="md"
              content="Access lists that are shared with this group or share your own."
              mode="light">
              <div>
                <IconInformationCircle
                  className="w-5 h-5 text-gray-500"
                  title="About lists"
                />
              </div>
            </ElemTooltip>
          </div>

          <ElemButton btn="default" onClick={() => setIsOpenAddList(true)}>
            <IconPlus className="w-5 h-5 mr-1" />
            <span>Add List</span>
          </ElemButton>
        </div>

        {lists?.length === 0 ? (
          <div className="w-full p-12 text-center">
            <IconSidebarList
              className="w-12 h-12 mx-auto text-gray-300"
              title="Lists"
            />
            <h3 className="mt-2 text-lg font-medium">
              No lists have been added to this group.
            </h3>

            <ElemButton
              className="mt-2"
              btn="default"
              onClick={() => setIsOpenAddList(true)}>
              <IconPlus className="w-5 h-5 mr-1" />
              <span>Add List</span>
            </ElemButton>
          </div>
        ) : (
          <ul className="flex flex-col px-4 py-3 space-y-3">
            {groupLists.map(list => {
              if (!list) {
                return;
              }
              const isFollowing = listMembers.some(
                mem => mem.list_id === list.id,
              );

              const listUrl = `${ROUTES.LISTS}/${list.id}/${kebabCase(
                getNameFromListName(list),
              )}}`;

              return (
                <li
                  key={list.id}
                  className="flex items-center justify-between space-x-2">
                  <div className="flex-1">
                    <ElemListTooltip list={list}>
                      <ElemLink
                        href={listUrl}
                        className="flex items-center space-x-2 group">
                        <h3
                          className="font-medium break-all line-clamp-1 group-hover:underline"
                          title={getNameFromListName(list)}>
                          {getNameFromListName(list)}
                        </h3>
                      </ElemLink>
                    </ElemListTooltip>

                    <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-1 gap-y-0.5">
                      <ElemTooltip
                        content="Author"
                        mode="dark"
                        direction="bottom"
                        size="lg">
                        <div className="capitalize">
                          {list?.created_by?.person ? (
                            <ElemLink
                              href={`${ROUTES.PEOPLE}/${list?.created_by?.person?.slug}`}
                              className="hover:underline">
                              {list?.created_by?.person.name}
                            </ElemLink>
                          ) : (
                            <>
                              {list?.created_by?.display_name
                                ? list?.created_by.display_name
                                : ''}
                            </>
                          )}
                        </div>
                      </ElemTooltip>
                      &middot;
                      <ElemTooltip
                        content={
                          <div className="p-1 text-sm">
                            Updated{' '}
                            {formatDateShown(list.updated_at, `LL [at] h:mmA`)}
                          </div>
                        }
                        mode="dark"
                        direction="bottom"
                        size="lg">
                        <div>
                          <ElemLink href={listUrl} className="hover:underline">
                            {formatDateShown(list.updated_at, `ll`)}
                          </ElemLink>
                        </div>
                      </ElemTooltip>
                      &middot;
                      <div>
                        <ElemLink href={listUrl} className="hover:underline">
                          {numberWithCommas(
                            list.total_no_of_resources
                              ? list.total_no_of_resources
                              : 0,
                          )}{' '}
                          item
                          {list.total_no_of_resources &&
                            list.total_no_of_resources > 1 &&
                            's'}
                        </ElemLink>
                      </div>
                    </div>
                  </div>

                  {list.created_by?.id != user?.id && (
                    <ElemButton
                      btn="default"
                      className={`${isFollowing ? '' : ''}`}
                      onClick={() => handleToggleFollow(list.id, isFollowing)}>
                      {isFollowing ? (
                        <>
                          <IconCheck className="w-5 h-5 mr-1" />
                          Following
                        </>
                      ) : (
                        <>Follow</>
                      )}
                    </ElemButton>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <ElemAddListDialog
        isOpen={isOpenAddList}
        listOptions={listOptions}
        onCloseModal={() => setIsOpenAddList(false)}
        onSave={handleAddList}
      />

      <Toaster />
    </div>
  );
};
