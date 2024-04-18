import React, { useMemo, FC } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import moment from 'moment-timezone';
import { startCase } from 'lodash';
import {
  getListDisplayName,
  getNameFromListMember,
  getNameFromListName,
} from '@/utils/lists';
import { List_Members, Lists, Users_Public } from '@/graphql/types';
import { ROUTES } from '@/routes';
import { TableView } from '../companies/table-view';
import { TableEmptyCell } from '../my-list/table-empty-cell';
import { ElemTooltip } from '../elem-tooltip';
import { kebabCase } from 'lodash';

type Props = {
  className?: string;
  lists?: any[];
  pageNumber: number;
  shownItems?: number;
  totalItems: number;
  onClickPrev: () => void;
  onClickNext: () => void;
};

export const ListsTable: FC<Props> = ({
  className = '',
  lists = [],
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
        accessor: (data: Lists) => {
          if (data?.name) {
            const name = getNameFromListName(data);
            if (name === 'crap') {
              return 'sh**';
            }
            return name;
          } else {
            return null;
          }
        },
        Cell: (props: {
          value: string;
          row: {
            original: Lists;
          };
        }) => (
          <div>
            <a
              href={`${ROUTES.LISTS}/${props.row.original?.id}/${kebabCase(
                props.value,
              )}`}
              className="font-medium break-words line-clamp-2 hover:underline"
            >
              {getListDisplayName(props.row.original)}
            </a>
          </div>
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
            original: Lists;
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
                  className="overflow-y-scroll max-h-72"
                >
                  <div className="text-sm text-gray-500 line-clamp-3">
                    <a
                      href={`${ROUTES.LISTS}/${
                        props.row.original?.id
                      }/${kebabCase(props.value)}`}
                    >
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
        Header: '# of Items',
        accessor: 'total_no_of_resources' as const,
        Cell: (props: { value: number }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 150,
      },
      {
        Header: 'Followers',
        accessor: 'list_members.length' as const,
        Cell: (props: {
          value: number;
          row: {
            original: Lists;
          };
        }) => {
          return (
            <div>
              {props.value ? (
                <div>
                  <div className="flex items-center space-x-2">
                    <ul className="flex -space-x-3 overflow-hidden">
                      {props.row.original.list_members
                        .slice(0, 6)
                        .map((member: List_Members) => (
                          <li key={member.id}>
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
                                    imgAlt={member.user?.person?.name}
                                    placeholder="user"
                                    placeholderClass="text-gray-500"
                                  />
                                </div>
                              ) : (
                                <div
                                  className="flex items-center justify-center w-8 text-lg capitalize border rounded-full aspect-square bg-slate-300 text-dark-500 border-gray-50"
                                  title={getNameFromListMember(member)}
                                >
                                  {getNameFromListMember(member).charAt(0)}
                                </div>
                              )}
                            </ElemTooltip>
                          </li>
                        ))}
                    </ul>
                    <a
                      href={`${ROUTES.LISTS}/${
                        props.row.original?.id
                      }/${kebabCase(getNameFromListName(props.row.original))}`}
                      className="ml-1 text-sm break-words line-clamp-2 hover:underline"
                    >
                      {props.value} Follower{props.value > 1 && 's'}
                    </a>
                  </div>
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
            original: Lists;
          };
        }) => {
          const author = (
            <div className="flex items-center space-x-2">
              <ElemPhoto
                photo={props.row.original.created_by?.person?.picture}
                wrapClass="flex items-center justify-center aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8"
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
                  className="hover:underline"
                >
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

  console.log(lists);

  return (
    <div className={`${className}`}>
      <TableView
        resourceType="lists"
        columns={columns}
        data={lists}
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
