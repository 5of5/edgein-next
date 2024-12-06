import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { IconSortUp, IconSortDown } from '@/components/icons';
import { ElemPhoto } from '@/components/elem-photo';
import { Pagination } from '@/components/pagination';
import { GetEventQuery } from '@/graphql/types';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';

type Props = {
  organizations: GetEventQuery['events'][0]['event_organization'];
};

export const ElemSponsorGrid: React.FC<Props> = ({ organizations }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Type',
        accessor: 'sponsor_type' as const,
        width: 80,
        Cell: (props: any) => <span>{props.value}</span>,
      },
      {
        Header: 'Sponsor',
        accessor: 'company' as const,
        Cell: (props: any) => {
          if (props.row.original.company) {
            return (
              <div className="flex items-center shrink-0 w-full">
                <ElemLink
                  href={`${ROUTES.COMPANIES}/${props.row.original.company.slug}`}
                  className="company flex items-center space-x-3 hover:opacity-70">
                  <ElemPhoto
                    photo={props.row.original.company.logo}
                    wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 rounded-lg overflow-hidden bg-black border border-slate-200"
                    imgClass="object-fit max-w-full max-h-full rounded"
                    imgAlt={props.row.original.company.name}
                  />
                  <p className="ml-2 line-clamp-2 break-words">
                    {props.row.original.company.name}
                  </p>
                </ElemLink>
              </div>
            );
          }

          if (props.row.original.vc_firm) {
            return (
              <div className="flex items-center shrink-0 w-full">
                <ElemLink
                  href={`${ROUTES.INVESTORS}/${props.row.original.vc_firm.slug}`}
                  className="investor flex items-center space-x-3 hover:opacity-70">
                  <ElemPhoto
                    photo={props.row.original.vc_firm.logo}
                    wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 rounded-lg overflow-hidden bg-black border border-slate-200"
                    imgClass="object-fit max-w-full max-h-full rounded"
                    imgAlt={props.row.original.vc_firm.name}
                  />
                  <p className="ml-2 line-clamp-2 break-words">
                    {props.row.original.vc_firm.name}
                  </p>
                </ElemLink>
              </div>
            );
          }
          return null;
        },
        width: 280,
        disableSortBy: true,
      },
    ],
    [],
  );

  const sortees = React.useMemo(
    () => [
      {
        id: 'sponsor_type',
        desc: false,
      },
    ],
    [],
  );

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
      data: organizations,
      //autoResetPage: true, true by default
      disableSortRemove: true,
      autoResetSortBy: false,
      initialState: {
        sortBy: sortees,
        pageSize: 50,
      },
    },
    useSortBy,
    usePagination,
  );

  const generateSortingIndicator = (column: any) => {
    return column.isSorted ? (
      column.isSortedDesc ? (
        <IconSortDown className="ml-1 h-5 w-5 inline-block" />
      ) : (
        <IconSortUp className="ml-1 h-5 w-5 inline-block" />
      )
    ) : column.canSort ? (
      <IconSortDown className="ml-1 h-5 w-5 inline-block text-slate-400 group-hover:text-primary-500" />
    ) : (
      <></>
    );
  };

  return (
    <section className="rounded-lg border border-gray-300">
      <h2 className="text-xl font-medium px-4 pt-2">Sponsors</h2>

      <div className="px-4 py-4">
        <div className="overflow-auto border border-gray-300 rounded-lg">
          <table
            {...getTableProps()}
            className="table-auto min-w-full divide-y divide-black/10 overscroll-x-none">
            <thead>
              {headerGroups.map(headerGroup => {
                const { key, ...restHeaderGroupProps } =
                  headerGroup.getHeaderGroupProps();

                return (
                  <tr
                    key={key}
                    {...restHeaderGroupProps}
                    className="table-row min-w-full bg-gray-25 text-gray-600">
                    {headerGroup.headers.map((column: any) => {
                      const { key, ...restColumnProps }: any = ({} = {
                        ...column.getHeaderProps(
                          column.getSortByToggleProps(),
                          {
                            style: {
                              width: column.width,
                              minWidth: column.width,
                              maxWidth: column.width,
                            },
                          },
                        ),
                      });
                      return (
                        <th
                          key={key}
                          {...restColumnProps}
                          className={`relative px-2 py-2 whitespace-nowrap font-medium text-sm text-left min-w-content`}>
                          {column.render('Header')}
                          {generateSortingIndicator(column)}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-black divide-y divide-gray-300 flex-1 md:flex-none mb-96">
              {page.map(row => {
                prepareRow(row);
                const { key, ...restRowProps } = row.getRowProps();

                const rowAllValuesAreEmpty = row.cells.every(
                  item => item?.value === null,
                );

                if (rowAllValuesAreEmpty) {
                  return;
                }

                return (
                  <tr key={key} {...restRowProps} className="table-row">
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
                          className="align-middle text-sm px-4 py-3">
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          shownItems={page?.length}
          totalItems={organizations.length}
          page={pageIndex}
          itemsPerPage={pageSize}
          onClickPrev={() => previousPage()}
          onClickNext={() => nextPage()}
        />
      </div>
    </section>
  );
};
