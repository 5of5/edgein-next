import { FC } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { kebabCase } from 'lodash';
import { useUser } from '@/context/user-context';
import { getNameFromListName } from '@/utils/reaction';
import { formatDateShown, truncateWords } from '@/utils';
import { getListDisplayName } from '@/utils/lists';
import { GetGroupsQuery, GetListsQuery } from '@/graphql/types';
import { GroupsTabItem, ListsTabItem } from '@/types/common';
import { GROUPS, LISTS } from '@/routes';
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

  const description = isResourceList ? name : resource.description;

  const resourceUrl = isResourceList
    ? `${LISTS}/${resource.id}/${kebabCase(getNameFromListName(resource))}`
    : `${GROUPS}/${resource.id}`;

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

  const ListItemName = (
    <div className="inline-block">
      <ElemLink
        href={resourceUrl}
        className="inline-block font-medium underline break-words line-clamp-2"
      >
        {name}
      </ElemLink>
    </div>
  );

  return (
    <div className="flex flex-col mx-auto w-full p-4 rounded-lg border border-gray-200 ">
      <div>
        {!isResourceList && description ? (
          <ElemTooltip
            content={truncateWords(description)}
            direction="top"
            mode="light"
          >
            {ListItemName}
          </ElemTooltip>
        ) : (
          ListItemName
        )}
      </div>

      <div className="grow">
        <div className="inline-block items-center text-gray-500 text-sm">
          {resource.public ? (
            <ElemTooltip content="Public" direction="top" mode="light">
              <div className="inline">
                <IconGlobe
                  className="inline-block w-4 h-4 shrink-0"
                  title="Public"
                />
              </div>
            </ElemTooltip>
          ) : (
            <ElemTooltip content="Private" direction="top" mode="light">
              <div className="inline">
                <IconLockClosed
                  className="inline-block w-4 h-4 shrink-0"
                  title="Private"
                />
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
          Updated {formatDateShown(resource.updated_at)}
        </p>

        <div className="flex items-center mt-4 pl-1">
          <ul className="flex -space-x-3 overflow-hidden">
            {members.slice(0, 6).map(member => (
              <li key={member.id}>
                {member?.user?.person?.picture ? (
                  <ElemPhoto
                    photo={member?.user.person?.picture}
                    wrapClass="flex items-center justify-center aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8"
                    imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
                    imgAlt={member?.user.display_name}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center aspect-square w-8 rounded-full bg-slate-300 text-dark-500 border border-gray-50 text-lg capitalize"
                    title={
                      member?.user?.display_name
                        ? member?.user?.display_name
                        : ''
                    }
                  >
                    {member?.user?.display_name?.charAt(0)}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <ElemLink
            href={resourceUrl}
            className="font-medium text-sm text-gray-500 ml-1 hover:underline"
          >
            {members.length > 1
              ? `${members.length} ${isResourceList ? 'Followers' : 'Members'}`
              : `${members.length} ${isResourceList ? 'Follower' : 'Member'}`}
          </ElemLink>
        </div>
      </div>
      <div className="mt-4">
        {selectedTab.id === 'discover' ? (
          <ElemButton
            onClick={handleClickJoin}
            btn="default"
            size="sm"
            loading={isFollowingListLoading || isJoiningGroupLoading}
            className="w-full block rounded-md transition ease-in-out duration-150 group"
          >
            {`${isResourceList ? 'Follow List' : 'Join Group'}`}
          </ElemButton>
        ) : (
          <ElemButton
            href={resourceUrl}
            btn="default"
            size="sm"
            className="w-full block rounded-md transition ease-in-out duration-150 group"
          >
            {`View ${isResourceList ? 'List' : 'Group'}`}
          </ElemButton>
        )}
      </div>
    </div>
  );
};
