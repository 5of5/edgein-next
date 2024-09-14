import { useGetPeopleByListIdQuery } from '@/graphql/types';
import { FC, useMemo, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { removeSpecialCharacterFromString } from '@/utils';
import { TableEmptyCell } from './table-empty-cell';
import { PlaceholderTable } from '../placeholders';
import { Table } from './table';
import { ROUTES } from '@/routes';

type Props = {
  listId: number;
  listName: string | null;
  isListAuthor: boolean;
};

export const PeopleList: FC<Props> = ({ listId, listName, isListAuthor }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState('');

  const {
    data: listPeople,
    error,
    isLoading,
    refetch,
  } = useGetPeopleByListIdQuery(
    {
      list_id: listId,
      limit: pageSize,
      offset: pageSize * pageIndex,
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
              href={`${ROUTES.PEOPLE}/` + props.row.original?.person?.slug}
              className="flex items-center space-x-3 transition-all shrink-0">
              <ElemPhoto
                photo={props.row.original?.person?.picture}
                wrapClass={`flex items-center justify-center shrink-0 w-10 h-10 bg-white  overflow-hidden ${
                  props.row.original?.person?.picture
                    ? 'rounded-lg border border-gray-300'
                    : 'rounded-full'
                }`}
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={props.value}
                placeholder="user"
                placeholderClass="text-gray-300"
              />
              <p className="font-medium break-words line-clamp-2 hover:underline">
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
                        className="block text-sm hover:underline">
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
                  className="inline-block text-sm hover:text-primary-500">
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
                  className="inline-block text-sm hover:text-primary-500">
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
      <div className="px-4 mt-4">
        <h2 className="mb-2 font-medium">People</h2>
        <div className="border border-gray-200 rounded-lg">
          <PlaceholderTable />
        </div>
      </div>
    );
  }

  return (
    <Table
      disabledCheckbox={!isListAuthor}
      listName={listName}
      resourceType="people"
      columns={columns}
      data={people}
      pageSize={pageSize}
      onChangePageSize={e => {
        setPageSize(Number(e.target.value));
      }}
      pageIndex={pageIndex}
      totalItems={totalItems}
      noDataText="There are no people in this list."
      exploreBtnHref={ROUTES.PEOPLE}
      exploreBtnText="Explore People"
      searchQuery={query}
      onChangeSearchQuery={onChangeSearchQuery}
      onRefetchData={refetch}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
    />
  );
};
