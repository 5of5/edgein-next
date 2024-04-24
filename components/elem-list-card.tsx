import { FC } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { kebabCase } from 'lodash';
import { useUser } from '@/context/user-context';
import { getNameFromListName, getNameFromListMember } from '@/utils/lists';
import { formatDateShown } from '@/utils';
import { getListDisplayName } from '@/utils/lists';
import {
  GetGroupsQuery,
  GetListsQuery,
  // List_Members,
  // User_Group_Members,
} from '@/graphql/types';
import { GroupsTabItem, ListsTabItem } from '@/types/common';
import { ROUTES } from '@/routes';
import { ElemButton } from './elem-button';
import { ElemPhoto } from './elem-photo';
import { ElemTooltip } from './elem-tooltip';
import { IconGlobe, IconLockClosed } from './icons';
import { ElemLink } from './elem-link';

type ResourceDataType<T> = T;

interface ResourceList extends ResourceDataType<GetListsQuery['lists'][0]> {
  resourceType: 'list';
}

interface ResourceGroup
  extends ResourceDataType<GetGroupsQuery['user_groups'][0]> {
  resourceType: 'group';
}

type Props = {
  selectedTab: GroupsTabItem | ListsTabItem;
  resource: ResourceList | ResourceGroup;
  refetchList: () => void;
};

export const ElemListCard: FC<Props> = ({
  selectedTab,
  resource,
  refetchList,
}) => {
  const router = useRouter();

  const { user, refreshProfile, refetchMyGroups } = useUser();

  const isResourceList = resource.resourceType === 'list';

  const name = isResourceList ? getListDisplayName(resource) : resource.name;

  const totalItems = isResourceList
    ? resource.total_no_of_resources
    : resource.notes.length;

  const description = resource.description ? resource.description : null;

  const resourceUrl = isResourceList
    ? `${ROUTES.LISTS}/${resource.id}/${kebabCase(
        getNameFromListName(resource),
      )}`
    : `${ROUTES.GROUPS}/${resource.id}`;

  const numOfLists = isResourceList ? 0 : resource.list_user_groups.length;

  const numOfNotes = isResourceList ? 0 : resource.notes.length;

  const members = isResourceList
    ? resource.list_members
    : resource.user_group_members;

  const { mutate: followList, isLoading: isFollowingListLoading } = useMutation(
    async () => {
      await fetch('/api/toggle-follow-list', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listId: resource.id,
          userId: user?.id,
        }),
      });
    },
    {
      onSuccess: () => {
        refreshProfile();
        router.push(resourceUrl);
      },
    },
  );

  const { mutate: joinGroup, isLoading: isJoiningGroupLoading } = useMutation(
    async () => {
      await fetch('/api/add-group-member/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId: resource.id,
          userId: user?.id,
        }),
      });
    },
    {
      onSuccess: () => {
        refetchMyGroups();
        refetchList();
        router.push(resourceUrl);
      },
    },
  );

  const handleClickJoin = () => {
    if (isResourceList) {
      followList();
    } else {
      joinGroup();
    }
  };

  return (
    <div className="flex flex-col w-full p-4 mx-auto border border-gray-200 rounded-lg">
      <div className="pb-2">
        <ElemLink
          href={resourceUrl}
          className="font-medium leading-snug break-words line-clamp-2 hover:underline"
        >
          {name}{' '}
          <ElemTooltip
            content={`${totalItems} ${isResourceList ? 'Item' : 'Note'}${
              totalItems && totalItems === 1 ? '' : 's'
            }`}
            direction="top"
            mode="dark"
          >
            <div className="inline text-gray-500">({totalItems})</div>
          </ElemTooltip>
        </ElemLink>
      </div>

      {description && (
        <ElemTooltip content={description} direction="top" mode="light">
          <div className="inline">
            <div className="mb-3 text-sm text-gray-500 line-clamp-2">
              {description}
            </div>
          </div>
        </ElemTooltip>
      )}

      <div className="pt-2 border-t border-gray-200 grow">
        <div className="items-center inline-block text-sm text-gray-500">
          {resource.public ? (
            <ElemTooltip content="Public" direction="top" mode="dark">
              <div className="inline">
                <IconGlobe className="inline-block w-4 h-4 shrink-0" />
              </div>
            </ElemTooltip>
          ) : (
            <ElemTooltip content="Private" direction="top" mode="dark">
              <div className="inline">
                <IconLockClosed className="inline-block w-4 h-4 shrink-0" />
              </div>
            </ElemTooltip>
          )}

          {isResourceList ? (
            members.length > 0 && (
              <>
                {' • '}
                {members.length}
                {members.length > 1 ? ' Followers' : ' Follower'}
              </>
            )
          ) : (
            <>
              {members.length > 0 && (
                <>
                  {' • '}
                  {members.length}
                  {members.length > 1 ? ' Members' : ' Member'}
                </>
              )}

              {numOfLists > 0 && (
                <>
                  {' • '}
                  {numOfLists}
                  {numOfLists > 1 ? ' Lists' : ' List'}
                </>
              )}

              {numOfNotes > 0 && (
                <>
                  {' • '}
                  {numOfNotes}
                  {numOfNotes > 1 ? ' Notes' : ' Note'}
                </>
              )}
            </>
          )}
        </div>

        <p className="text-sm text-gray-500">
          Edited {formatDateShown(resource.updated_at)}
        </p>

        {members && members.length > 0 && (
          <div className="flex items-center pl-1 mt-4">
            <ul className="flex -space-x-3 overflow-hidden">
              {members?.slice(0, 6).map((member: any) => {
                return (
                  <li key={member?.id}>
                    <ElemTooltip
                      content={getNameFromListMember(member)}
                      mode="dark"
                      direction="top"
                      size="lg"
                    >
                      {member?.user?.person?.picture ? (
                        <div>
                          <ElemPhoto
                            photo={member?.user.person?.picture}
                            wrapClass="flex items-center justify-center aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8"
                            imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
                            imgAlt={getNameFromListMember(member)}
                            placeholder="user"
                            placeholderClass="text-gray-500"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-8 text-lg capitalize bg-gray-300 border rounded-full aspect-square text-dark-500 border-gray-50">
                          {getNameFromListMember(member).charAt(0)}
                        </div>
                      )}
                    </ElemTooltip>
                  </li>
                );
              })}
            </ul>
            <ElemLink
              href={resourceUrl}
              className="ml-1 text-sm font-medium text-gray-500 hover:underline"
            >
              {members.length > 1
                ? `${members.length} ${
                    isResourceList ? 'Followers' : 'Members'
                  }`
                : `${members.length} ${isResourceList ? 'Follower' : 'Member'}`}
            </ElemLink>
          </div>
        )}
      </div>

      <div className="mt-4">
        {selectedTab.id === 'discover' ? (
          <ElemButton
            onClick={handleClickJoin}
            btn="default"
            size="sm"
            loading={isFollowingListLoading || isJoiningGroupLoading}
            className="block w-full transition duration-150 ease-in-out rounded-md group"
          >
            {`${isResourceList ? 'Follow List' : 'Join Group'}`}
          </ElemButton>
        ) : (
          <ElemButton
            href={resourceUrl}
            btn="default"
            size="sm"
            className="block w-full transition duration-150 ease-in-out rounded-md group"
          >
            {`View ${isResourceList ? 'List' : 'Group'}`}
          </ElemButton>
        )}
      </div>
    </div>
  );
};
