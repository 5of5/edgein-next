import React, { useState } from 'react';
import moment from 'moment-timezone';
import toast, { Toaster } from 'react-hot-toast';
import { kebabCase } from 'lodash';
import { IconSidebarList, IconPlus, IconCheck } from '@/components/icons';
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
        toast.custom(
          t => (
            <div
              className={`bg-gray-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                t.visible ? 'animate-fade-in-up' : 'opacity-0'
              }`}>
              List unfollowed
            </div>
          ),
          {
            duration: 3000,
            position: 'top-center',
          },
        );
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
      toast.custom(
        t => (
          <div
            className={`bg-gray-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
            Lists Added
          </div>
        ),
        {
          duration: 3000,
          position: 'top-center',
        },
      );
    }
  };

  return (
    <div className={`${className ? className : ''}`}>
      <div className="border border-gray-300 rounded-lg shrink-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
          <div>
            <h2 className="text-lg font-medium">{`Lists (${groupLists.length})`}</h2>
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
            {groupLists.map(item => {
              if (!item) {
                return;
              }
              const isFollowing = listMembers.some(
                mem => mem.list_id === item.id,
              );

              return (
                <li
                  key={item.id}
                  className="flex items-start justify-between space-x-4">
                  <ElemLink
                    href={`${ROUTES.LISTS}/${item.id}/${kebabCase(
                      getNameFromListName(item),
                    )}`}
                    className="flex items-start space-x-2 text-sm">
                    <div>
                      {item.description ? (
                        <ElemTooltip
                          content={item.description}
                          direction="top"
                          size="lg"
                          mode="dark">
                          <div className="inline">
                            <h3
                              className="font-medium break-all line-clamp-1 hover:underline"
                              title={getNameFromListName(item)}>
                              {getNameFromListName(item)}
                            </h3>
                          </div>
                        </ElemTooltip>
                      ) : (
                        <h3
                          className="font-medium break-all line-clamp-1 hover:underline"
                          title={getNameFromListName(item)}>
                          {getNameFromListName(item)}
                        </h3>
                      )}

                      {item?.updated_at ? (
                        <ElemTooltip
                          content={`Edited ${moment
                            .utc(item?.updated_at)
                            .local()
                            .format('ll HH:mma')} Created by ${
                            item.created_by?.display_name
                          } ${moment
                            .utc(item?.created_at)
                            .local()
                            .format('ll HH:mma')}`}
                          direction="top-start"
                          mode="dark">
                          <p className="text-gray-500">
                            By {item.created_by?.display_name}
                          </p>
                        </ElemTooltip>
                      ) : (
                        <ElemTooltip
                          content={moment
                            .utc(item?.created_at)
                            .local()
                            .format('ll HH:mma')}
                          direction="top-start"
                          mode="dark">
                          <p className="text-gray-500">
                            Created By {item.created_by?.display_name}
                          </p>
                        </ElemTooltip>
                      )}
                    </div>
                  </ElemLink>

                  {item.created_by?.id != user?.id && (
                    <ElemButton
                      btn="default"
                      className={`${isFollowing ? '' : ''}`}
                      onClick={() => handleToggleFollow(item.id, isFollowing)}>
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
