import React, { useMemo, FC } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import moment from 'moment-timezone';
import { startCase } from 'lodash';
import { getNameFromListMember } from '@/utils/lists';
import { Users_Public, User_Groups, User_Group_Members } from '@/graphql/types';
import { ROUTES } from '@/routes';
import { TableView } from '../companies/table-view';
import { TableEmptyCell } from '../my-list/table-empty-cell';
import { ElemTooltip } from '../elem-tooltip';
import { ElemAvatarList } from '../elem-avatar-list';

type Props = {
  className?: string;
  groups?: any[];
  pageNumber: number;
  shownItems?: number;
  totalItems: number;
  onClickPrev: () => void;
  onClickNext: () => void;
};

export const GroupsTable: FC<Props> = ({
  className = '',
  groups = [],
  pageNumber,
  shownItems = 0,
  totalItems,
  onClickPrev,
  onClickNext,
}) => {
  const columns = useMemo<any[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name' as const,
        Cell: (props: {
          value: string;
          row: {
            original: User_Groups;
          };
        }) => (
          <a
            href={`${ROUTES.GROUPS}/${props.row.original?.id}/`}
            className="font-medium break-words line-clamp-2 hover:underline">
            {props.value}
          </a>
        ),
        width: 300,
        minWidth: 300,
        disableHiding: true,
      },
      {
        Header: 'Description',
        accessor: 'description' as const,
        Cell: (props: {
          value: string;
          row: {
            original: User_Groups;
          };
        }) => (
          <div>
            {props.value ? (
              <>
                <ElemTooltip
                  content={props.value}
                  mode="light"
                  direction="top"
                  size="lg"
                  delay={1000}
                  className="overflow-y-scroll max-h-72">
                  <div className="text-sm text-gray-500 line-clamp-3">
                    <a href={`${ROUTES.GROUPS}/${props.row.original?.id}/`}>
                      {props.value}
                    </a>
                  </div>
                </ElemTooltip>
              </>
            ) : (
              <TableEmptyCell />
            )}
          </div>
        ),
        disableSortBy: true,
        width: 400,
        minWidth: 300,
      },
      {
        Header: 'Notes',
        accessor: 'notes.length' as const,
        Cell: (props: { value: number }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 150,
      },
      {
        Header: 'Lists',
        accessor: 'list_user_groups.length' as const,
        Cell: (props: { value: number }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 150,
      },
      {
        Header: 'Members',
        accessor: 'user_group_members.length' as const,
        Cell: (props: {
          value: number;
          row: {
            original: User_Groups;
          };
        }) => {
          const groupMembers = props.row.original.user_group_members.filter(
            member => member.user?.id != props.row.original?.created_by?.id,
          );
          return (
            <div>
              {groupMembers.length > 0 ? (
                <div className="flex flex-wrap items-center">
                  <ElemAvatarList people={groupMembers} limit={6} />
                  <a
                    href={`${ROUTES.GROUPS}/${props.row.original?.id}/`}
                    className="ml-1 text-sm break-words line-clamp-2 hover:underline">
                    {groupMembers.length} Member
                    {groupMembers.length > 1 && 's'}
                  </a>
                </div>
              ) : (
                <TableEmptyCell />
              )}
            </div>
          );
        },
        width: 250,
      },
      {
        Header: 'Updated',
        accessor: 'updated_at' as const,
        Cell: (props: { value: Date }) => {
          return (
            <div>
              {props.value ? (
                moment(props.value).format('ll')
              ) : (
                <TableEmptyCell />
              )}
            </div>
          );
        },
        width: 200,
      },
      {
        Header: 'Author',
        accessor: (data: { created_by: Users_Public }) => {
          if (data?.created_by.person) {
            return data.created_by.person.name;
          } else if (data.created_by.display_name) {
            return data.created_by.display_name;
          } else {
            return null;
          }
        },
        Cell: (props: {
          value: string;
          row: {
            original: User_Groups;
          };
        }) => {
          const author = (
            <div className="flex items-center space-x-2">
              <ElemPhoto
                photo={props.row.original.created_by?.person?.picture}
                wrapClass="flex items-center justify-center aspect-square shrink-0 bg-black overflow-hidden rounded-full w-8"
                imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
                imgAlt={props.value}
                placeholder="user"
                placeholderClass="text-gray-500"
              />
              <div>{startCase(props.value)}</div>
            </div>
          );

          return (
            <div>
              {props.value && props.row.original.created_by?.person?.slug ? (
                <a
                  href={`${ROUTES.PEOPLE}/${props.row.original.created_by?.person?.slug}/`}
                  className="hover:underline">
                  {author}
                </a>
              ) : props.value ? (
                author
              ) : (
                <TableEmptyCell />
              )}
            </div>
          );
        },
        width: 240,
      },
      {
        Header: 'Visibility',
        accessor: 'public' as const,
        Cell: (props: { value: number }) => {
          return <div>{props.value ? 'Public' : 'Private'}</div>;
        },
        width: 150,
      },
      {
        Header: 'Created',
        accessor: 'created_at' as const,
        Cell: (props: { value: Date }) => {
          return (
            <div>
              {props.value ? (
                moment(props.value).format('ll')
              ) : (
                <TableEmptyCell />
              )}
            </div>
          );
        },
        width: 200,
      },
    ],
    [],
  );

  return (
    <div className={`${className}`}>
      <TableView
        resourceType="groups"
        columns={columns}
        data={groups}
        pageSize={shownItems}
        pageIndex={pageNumber}
        totalItems={totalItems}
        onPreviousPage={onClickPrev}
        onNextPage={onClickNext}
        showUpgrade={false}
      />
    </div>
  );
};
