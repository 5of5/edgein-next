import { FC } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { kebabCase, startCase } from 'lodash';
import { useUser } from '@/context/user-context';
import { getNameFromListName, getListDisplayName } from '@/utils/lists';
import { formatDateShown } from '@/utils';
import {
  GetGroupsQuery,
  GetListsQuery,
  List_Members,
  User_Group_Members,
} from '@/graphql/types';
import { GroupsTabItem, ListsTabItem } from '@/types/common';
import { ROUTES } from '@/routes';
import { ElemButton } from './elem-button';
import { ElemTooltip } from './elem-tooltip';
import { IconGlobe, IconLockClosed, IconSidebarList } from './icons';
import { ElemLink } from './elem-link';
import { ElemAvatarList } from './elem-avatar-list';

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
    ? (resource.list_members as Array<List_Members>)
    : (resource.user_group_members as Array<User_Group_Members>);

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

  const resourceTooltip = (
    <div className="flex-col p-2 group">
      <div className="flex items-center gap-x-2">
        {resource.public ? (
          <IconGlobe className="block w-4 h-4 shrink-0" />
        ) : (
          <IconLockClosed className="block w-4 h-4 shrink-0" />
        )}

        <ElemLink
          href={resourceUrl}
          className="block font-medium leading-snug text-gray-900 line-clamp-2 hover:underline">
          {name}
        </ElemLink>
        <div className="px-3 py-1 text-xs border border-gray-200 rounded-full">
          {resource.public ? 'Public' : 'Private'}
        </div>
      </div>

      {description && (
        <div className="mt-3 text-sm text-gray-500 line-clamp-4">
          {description}
        </div>
      )}

      <div className="flex flex-wrap mt-3 text-xs gap-x-6 gap-y-1">
        <div className="capitalize">
          {resource?.created_by?.person ? (
            <>
              By{' '}
              <ElemLink
                href={`${ROUTES.PEOPLE}/${resource?.created_by?.person?.slug}`}
                className="hover:underline">
                {resource?.created_by?.person.name}
              </ElemLink>
            </>
          ) : (
            <>
              By{' '}
              {startCase(
                resource?.created_by?.display_name
                  ? resource?.created_by.display_name
                  : '',
              )}
            </>
          )}
        </div>
        <div>Updated {formatDateShown(resource.updated_at)}</div>
        {/* {isResourceList ? (
          <div>
            {totalItems} Item{totalItems && totalItems === 1 ? '' : 's'}
          </div>
        ) : (
          <>
            {numOfLists > 0 && (
              <div>
                {numOfLists}
                {numOfLists > 1 ? ' Lists' : ' List'}
              </div>
            )}

            {numOfNotes > 0 && (
              <div>
                {numOfNotes}
                {numOfNotes > 1 ? ' Notes' : ' Note'}
              </div>
            )}
          </>
        )} */}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full p-4 mx-auto border border-gray-200 rounded-lg">
      <ElemTooltip
        content={resourceTooltip}
        direction="top-start"
        mode="light"
        size="lg"
        arrow={false}>
        <div>
          <ElemLink
            href={resourceUrl}
            className="font-medium leading-snug text-gray-900 line-clamp-2 hover:underline">
            {name}
          </ElemLink>
        </div>
      </ElemTooltip>

      {description && (
        <div className="mt-3 text-sm text-gray-500 line-clamp-2">
          {description}
        </div>
      )}

      <div className="flex flex-wrap mt-3 gap-x-6 gap-y-1">
        {isResourceList ? (
          <div>
            <ElemLink
              href={resourceUrl}
              className="text-sm text-gray-500 hover:underline">
              {totalItems} Item{totalItems && totalItems === 1 ? '' : 's'}
            </ElemLink>
          </div>
        ) : (
          <>
            {numOfLists > 0 && (
              <div>
                <ElemLink
                  href={resourceUrl}
                  className="text-sm text-gray-500 hover:underline">
                  {numOfLists}
                  {numOfLists > 1 ? ' Lists' : ' List'}
                </ElemLink>
              </div>
            )}

            {numOfNotes > 0 && (
              <div>
                <ElemLink
                  href={resourceUrl}
                  className="text-sm text-gray-500 hover:underline">
                  {numOfNotes}
                  {numOfNotes > 1 ? ' Notes' : ' Note'}
                </ElemLink>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-3 grow">
        {members && members.length > 0 && (
          <div className="flex items-center pl-1">
            <ElemAvatarList people={members} limit={6} />
            <ElemLink
              href={resourceUrl}
              className="ml-1 text-sm text-gray-500 hover:underline">
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
            className="block w-full transition duration-150 ease-in-out rounded-md group">
            {`${isResourceList ? 'Follow List' : 'Join Group'}`}
          </ElemButton>
        ) : (
          <ElemButton
            href={resourceUrl}
            btn="default"
            size="sm"
            className="block w-full transition duration-150 ease-in-out rounded-md group">
            {`View ${isResourceList ? 'List' : 'Group'}`}
          </ElemButton>
        )}
      </div>
    </div>
  );
};
