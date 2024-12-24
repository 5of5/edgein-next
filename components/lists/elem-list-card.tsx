import { FC } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { kebabCase, startCase } from 'lodash';
import { useUser } from '@/context/user-context';
import { getNameFromListName, getListDisplayName } from '@/utils/lists';
import { formatDateShown, numberWithCommas } from '@/utils';
import {
  GetGroupsQuery,
  GetListsQuery,
  List_Members,
  User_Group_Members,
} from '@/graphql/types';
import { GroupsTabItem, ListsTabItem } from '@/types/common';
import { ROUTES } from '@/routes';
import { ElemButton } from '../elem-button';
import { IconGlobeAmericas, IconLockClosed } from '../icons';
import { ElemLink } from '../elem-link';
import { ElemAvatarList } from '../elem-avatar-list';
import { ElemTooltip } from '../elem-tooltip';

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
  isUser?: Boolean;
  refetchList: () => void;
};

export const ElemListCard: FC<Props> = ({
  selectedTab,
  resource,
  isUser,
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

  const groupTotalLists = isResourceList
    ? 0
    : resource.list_user_groups?.length;

  const groupTotalNotes = isResourceList ? 0 : resource.notes.length;

  const members = isResourceList
    ? (resource.list_members.filter(
        member => member.user?.id != resource?.created_by?.id,
      ) as Array<List_Members>)
    : (resource.user_group_members.filter(
        member => member.user?.id != resource?.created_by?.id,
      ) as Array<User_Group_Members>);

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
  //  border-neutral-700
  return (
    <div className="flex flex-col justify-between w-full p-4 mx-auto border border-gray-200 rounded-lg">
      <div>
        <ElemLink
          href={resourceUrl}
          className="inline-block first-letter:uppercase">
          <div className="inline mr-2 text-lg font-medium leading-snug text-gray-300 align-middle line-clamp-2 hover:underline">
            {name}
          </div>
          <div className="leading-snug inline-flex space-x-0.5 align-middle px-2 py-0.5 text-xs border border-gray-200 text-gray-600 rounded-full">
            {resource.public ? (
              <IconGlobeAmericas
                title="Public"
                className="block w-4 h-4 shrink-0"
              />
            ) : (
              <IconLockClosed
                title="Private"
                className="block w-4 h-4 shrink-0"
              />
            )}
            <div>{resource.public ? 'Public' : 'Private'}</div>
          </div>
        </ElemLink>

        <div className="mt-1 flex flex-wrap items-center text-xs text-gray-500 gap-x-1 gap-y-0.5">
          <ElemTooltip
            content="Author"
            mode="dark"
            direction="bottom"
            size="lg">
            <div>
              {resource?.created_by?.person ? (
                <ElemLink
                  href={`${ROUTES.PEOPLE}/${resource?.created_by?.person?.slug}`}
                  className="capitalize hover:underline">
                  {resource?.created_by?.person.name}
                </ElemLink>
              ) : (
                <>
                  {startCase(
                    resource?.created_by?.display_name
                      ? resource?.created_by.display_name
                      : '',
                  )}
                </>
              )}
            </div>
          </ElemTooltip>
          &middot;
          <ElemTooltip
            content={
              <div className="p-1ext-sm">
                Updated {formatDateShown(resource.updated_at, `LL [at] h:mmA`)}
              </div>
            }
            mode="dark"
            direction="bottom"
            size="lg">
            <div>
              <ElemLink href={resourceUrl} className="hover:underline">
                {formatDateShown(resource.updated_at, `ll`)}
              </ElemLink>
            </div>
          </ElemTooltip>
          &middot;
          {isResourceList ? (
            <div>
              <ElemLink href={resourceUrl} className="hover:underline">
                {numberWithCommas(totalItems ? totalItems : 0)} Item
                {totalItems === 1 ? '' : 's'}
              </ElemLink>
            </div>
          ) : (
            <>
              <div>
                <ElemLink href={resourceUrl} className="hover:underline">
                  {numberWithCommas(groupTotalLists ? groupTotalLists : 0)} List
                  {groupTotalLists === 1 ? '' : 's'}
                </ElemLink>
              </div>
              &middot;
              <div>
                <ElemLink href={resourceUrl} className="hover:underline">
                  {numberWithCommas(groupTotalNotes ? groupTotalNotes : 0)} Note
                  {groupTotalNotes === 1 ? '' : 's'}
                </ElemLink>
              </div>
            </>
          )}
        </div>
        {description && (
          <div className="mt-2 text-sm line-clamp-4">
            <ElemLink href={resourceUrl}>{description}</ElemLink>
          </div>
        )}
      </div>

      <div>
        {members && members.length > 0 && (
          <div className="flex items-center mt-2">
            <ElemAvatarList people={members} limit={10} />
            <ElemLink
              href={resourceUrl}
              className="ml-1 text-xs hover:underline">
              {members.length > 1
                ? `${numberWithCommas(members.length)} ${
                    isResourceList ? 'Followers' : 'Members'
                  }`
                : `${members.length} ${isResourceList ? 'Follower' : 'Member'}`}
            </ElemLink>
          </div>
        )}

        {isUser ? (
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};



