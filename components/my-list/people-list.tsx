import { useGetPeopleByListIdQuery } from '@/graphql/types';
import { FC, useMemo, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { removeSpecialCharacterFromString } from '@/utils';
import { TableEmptyCell } from './table-empty-cell';
import { PlaceholderTable } from '../placeholders';
import { Table } from './table';

type Props = {
  listId: number;
  listName: string | null;
};

export const PeopleList: FC<Props> = ({ listId, listName }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [query, setQuery] = useState('');
  const limit = 10;
  const {
    data: listPeople,
    error,
    isLoading,
    refetch,
  } = useGetPeopleByListIdQuery(
    {
      list_id: listId,
      limit,
      offset: limit * pageIndex,
      query: `%${query.trim()}%`,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const people = listPeople?.follows_people;

  const totalItems =
    listPeople?.follows_people_aggregate?.aggregate?.count || 0;

  const columns = useMemo<any[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'person.name' as const,
        Cell: (props: any) => (
          <div>
            <a
              href={`/people/` + props.row.original?.person?.slug}
              className="flex items-center space-x-3 shrink-0 transition-all"
            >
              <ElemPhoto
                photo={props.row.original?.person?.picture}
                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-white border border-gray-300 rounded-lg overflow-hidden"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={props.value}
                placeholderClass="text-gray-300"
              />
              <p className="font-medium line-clamp-2 break-words hover:underline">
                {props.value}
              </p>
            </a>
          </div>
        ),
        minWidth: 320,
        disableHiding: true,
      },
      {
        Header: 'Email',
        accessor: 'person.work_email' as const,
        Cell: (props: any) => {
          const emails: any = [];

          if (props.value) {
            emails.push(props.value);
          }
          if (props.row.original?.person?.personal_email) {
            emails.push(props.row.original?.person?.personal_email);
          }

          return (
            <div>
              {emails.length > 0 ? (
                [
                  emails?.map((email: string, index: number) => {
                    return (
                      <a
                        key={index}
                        href={`mailto:${email}`}
                        className="block text-sm hover:underline"
                      >
                        {email}
                      </a>
                    );
                  }),
                ]
              ) : (
                <TableEmptyCell />
              )}
            </div>
          );
        },
        disableSortBy: true,
        minWidth: 320,
      },
      {
        Header: 'Roles',
        accessor: 'person.type' as const,
        Cell: (props: any) => {
          return (
            <div>
              {props.value ? (
                removeSpecialCharacterFromString(props.value)
              ) : (
                <TableEmptyCell />
              )}
            </div>
          );
        },
        //	disableSortBy: true,
        width: 200,
      },
      {
        Header: 'Linkedin',
        accessor: 'person.linkedin' as const,
        Cell: (props: any) => {
          return (
            <div>
              {props.value ? (
                <a
                  href={props.value}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm hover:text-primary-500"
                >
                  View LinkedIn
                </a>
              ) : (
                <TableEmptyCell />
              )}
            </div>
          );
        },
        disableSortBy: true,
        width: 200,
      },
      {
        Header: 'Github',
        accessor: 'person.github' as const,
        Cell: (props: any) => {
          return (
            <div>
              {props.value ? (
                <a
                  href={props.value}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm hover:text-primary-500"
                >
                  View Github
                </a>
              ) : (
                <TableEmptyCell />
              )}
            </div>
          );
        },
        disableSortBy: true,
        width: 200,
      },
    ],
    [],
  );

  const onChangeSearchQuery = (value: string) => {
    setQuery(value);
    setPageIndex(0);
  };

  const onPreviousPage = () => {
    setPageIndex(pageIndex - 1);
  };
  const onNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  if (error) {
    return <h4>Error loading people</h4>;
  }

  if (isLoading) {
    return (
      <div className="rounded-lg px-4 border border-gray-200">
        <PlaceholderTable />
      </div>
    );
  }

  return (
    <Table
      listName={listName}
      resourceType="people"
      columns={columns}
      data={people}
      pageSize={limit}
      pageIndex={pageIndex}
      totalItems={totalItems}
      noDataText="There are no people in this list."
      searchQuery={query}
      onChangeSearchQuery={onChangeSearchQuery}
      onRefetchData={refetch}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
    />
  );
};
