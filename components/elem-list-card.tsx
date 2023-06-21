import { FC } from 'react';
import Link from 'next/link';
import moment from 'moment-timezone';
import { GetGroupsQuery, GetListsQuery } from '@/graphql/types';
import { GroupsTabItem, ListsTabItem } from '@/types/common';
import { ElemButton } from './elem-button';
import { ElemPhoto } from './elem-photo';
import { ElemTooltip } from './elem-tooltip';

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

const ElemListCard: FC<Props> = ({ selectedTab, resource, refetchList }) => {
  const isResourceList = resource.resourceType === 'list';

  const description = isResourceList ? resource.name : resource.description;

  const resourceUrl = isResourceList
    ? `/groups/${resource.id}`
    : `/lists/${resource.id}`;

  const numOfNotes = !isResourceList && resource.notes.length;

  const members = isResourceList
    ? resource.list_members
    : resource.user_group_members;

  const formatDateShown = (date: Date) => {
    const local_date = moment(date).local().format('YYYY-MM-DD');
    return moment(local_date).format('LL');
  };

  return (
    <div className="flex flex-col mx-auto w-full p-4 bg-white border border-black/10 rounded-lg shadow">
      <div>
        <ElemTooltip content={description} direction="top">
          <div className="inline-block">
            <Link href={resourceUrl} passHref>
              <a className="inline-block font-bold break-words line-clamp-2 transition-all hover:text-primary-500 hover:underline">
                {resource?.name}
              </a>
            </Link>
          </div>
        </ElemTooltip>
      </div>

      <div className="grow">
        <p className="inline text-slate-600 text-sm">
          {isResourceList ? (
            members.length > 0 && (
              <>
                {members.length}
                {members.length > 1 ? ' Followers' : ' Follower'}
              </>
            )
          ) : (
            <>
              {members.length > 0 && (
                <>
                  {members.length}
                  {members.length > 1 ? ' Members' : ' Member'}
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
        </p>

        <p className="text-primary-500 text-sm">
          Updated {formatDateShown(resource.updated_at)}
        </p>

        <div className="flex items-center mt-4 pl-1">
          <ul className="flex -space-x-3 overflow-hidden cursor-pointer">
            {members.slice(0, 6).map(mem => (
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
          <Link href={resourceUrl} passHref>
            <a className="font-medium text-sm text-slate-600 ml-1 hover:underline">
              {members.length > 1
                ? `${members.length} Members`
                : `${members.length} Member`}
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        {selectedTab.id === 'discover' ? (
          <ElemButton
            onClick={() => {}}
            btn="slate"
            size="sm"
            className="w-full block rounded-md transition ease-in-out duration-150 group"
          >
            {`Join ${isResourceList ? 'List' : 'Group'}`}
          </ElemButton>
        ) : (
          <ElemButton
            href={resourceUrl}
            btn="primary-light"
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

export default ElemListCard;
