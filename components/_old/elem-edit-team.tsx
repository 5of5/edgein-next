import React from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { useTable, useSortBy, usePagination } from 'react-table';
import { IconEditPencil, IconSortUp, IconSortDown } from '@/components/icons';
import { Pagination } from '@/components/pagination';
import Link from 'next/link';
import { numberWithCommas, formatDate } from '@/utils';
import { Team_Members } from '@/graphql/types';

type Props = {
  className?: string;
  heading?: string;
  teamMembers: Team_Members[];
  onEdit: (member: any) => void;
};

export const ElemEditTeam: React.FC<Props> = ({
  className,
  heading,
  teamMembers,
  onEdit,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'person' as const,
        Cell: (props: any) => (
          <div className="inline-flex items-center ">
            <ElemPhoto
              photo={props.value.picture}
              wrapClass="flex items-center justify-center shrink-0 w-12 h-12 rounded-lg overflow-hidden"
              imgClass="object-cover w-full h-full"
              imgAlt={props.value.name}
              placeholder="user"
            />
            <span className="ml-3 font-normal text-md text-dark-500">
              {props.value.name}
            </span>
          </div>
        ),
      },
      {
        Header: 'Title',
        accessor: 'function' as const,
        Cell: (props: any) => (
          <div className="items-center mt-4">
            {props.value ? <>{props.value}</> : <>&mdash;</>}
          </div>
        ),
      },
      {
        Header: 'Start Date',
        accessor: 'start_date' as const,
        Cell: (props: any) => (
          <div className="items-center mt-4">
            {props.value ? (
              <>
                {formatDate(props.value, {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </>
            ) : (
              <>&mdash;</>
            )}
          </div>
        ),
      },
      {
        Header: 'End Date',
        accessor: 'end_date' as const,
        Cell: (props: any) => (
          <div className="items-center mt-4">
            {props.value ? (
              <>
                {formatDate(props.value, {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </>
            ) : (
              <>&mdash;</>
            )}
          </div>
        ),
      },
      {
        Header: ' ',
        accessor: '' as const,
        Cell: (props: any) => (
          <button
            onClick={() => {
              onEdit(props.row.original);
            }}
            className="px-1 py-2 text-primary-500">
            Edit
          </button>
        ),
      },
    ],
    [onEdit],
  );

  const dataInvestments = React.useMemo(() => {
    return teamMembers ? teamMembers : [{}];
  }, [teamMembers]);

  // const investmentsCount = dataInvestments.length;

  // const sortees = React.useMemo(
  // 	() => [
  // 		{
  // 			id: "round_date",
  // 			desc: true,
  // 		},
  // 	],
  // 	[]
  // );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //rows, //"rows" gets replaced with "page" for pagination
    prepareRow,
    page,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: dataInvestments,
      //autoResetPage: true, true by default
      disableSortRemove: true,
      autoResetSortBy: false,
      // initialState: {
      // 	sortBy: sortees,
      // 	pageSize: 50,
      // },
    },
    useSortBy,
    usePagination,
  );

  return (
    <section className={className}>
      <div className="mt-2 overflow-scroll border rounded-lg border-black/10">
        <table
          {...getTableProps()}
          className="min-w-full divide-y table-auto divide-black/10">
          <thead>
            {headerGroups.map(headerGroup => {
              const { key, ...restHeaderGroupProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...restHeaderGroupProps} className="table-row">
                  {headerGroup.headers.map((column: any) => {
                    const { key, ...restColumnProps }: any = ({} = {
                      ...column.getHeaderProps(column.getSortByToggleProps(), {
                        style: {
                          width: column.width,
                          minWidth: column.width,
                          maxWidth: column.width,
                        },
                      }),
                    });
                    return (
                      <th
                        key={key}
                        {...restColumnProps}
                        className={`px-4 py-2 whitespace-nowrap text-sm bg-black font-bold text-left ${
                          column.canSort ? 'group hover:text-primary-500' : ''
                        }`}
                        title={
                          column.canSort ? `Sort By ${column.Header}` : ''
                        }>
                        {column.render('Header')}
                        {/* {generateSortingIndicator(column)} */}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="flex-1 bg-black divide-y divide-black/10 md:flex-none mb-96">
            {page.map(row => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();

              return (
                <tr
                  key={key}
                  {...restRowProps}
                  className="table-row bg-black rounded-lg even:bg-slate-50">
                  {row.cells.map(cell => {
                    const { key, ...restCellProps } = cell.getCellProps({
                      style: {
                        width: cell.column.width,
                        minWidth: cell.column.width,
                        maxWidth: cell.column.width,
                      },
                    });

                    return (
                      <td
                        key={key}
                        {...restCellProps}
                        className="px-4 py-3 text-sm align-top">
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                  {/* <button onClick={() => onEdit(row.values)} className="px-1 py-2 text-primary-500">
                                        Edit
                                    </button> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
