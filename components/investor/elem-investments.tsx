import React from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { Investment_Rounds } from '@/graphql/types';
import {
  useTable,
  useResizeColumns,
  useSortBy,
  usePagination,
} from 'react-table';
import { numberWithCommas, formatDate } from '@/utils';
import {
  IconEditPencil,
  IconSortUp,
  IconSortDown,
  IconChevronDownMini,
  IconX,
} from '@/components/icons';
import { Menu } from '@headlessui/react';
import { Pagination } from '@/components/pagination';
import { ElemButton } from '../elem-button';
import { useIntercom } from 'react-use-intercom';
import { COMPANIES, INVESTORS, PEOPLE } from '@/routes';
import { ElemLink } from '../elem-link';

type Props = {
  className?: string;
  resourceName?: string;
  heading?: string;
  investments: Investment_Rounds[];
};

export const ElemInvestments: React.FC<Props> = ({
  className,
  resourceName,
  heading,
  investments,
}) => {
  const { showNewMessages } = useIntercom();

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 100,
      width: 120,
      //maxWidth: 300,
      sortType: 'alphanumericNullLast',
    }),
    [],
  );

  const emptyCell = React.useMemo(
    () => <div className="text-gray-500">&mdash;</div>,
    [],
  );

  const sortTypes = React.useMemo(
    () => ({
      alphanumericNullLast(rowA: any, rowB: any, columnId: string, desc: any) {
        const a = rowA.values[columnId];
        const b = rowB.values[columnId];

        if (!a && !b) {
          return 0;
        }

        if (!a) {
          return desc ? -1 : 1;
        }

        if (!b) {
          return desc ? 1 : -1;
        }

        return a
          .toString()
          .localeCompare(b.toString(), 'en', { numeric: true });
      },
    }),
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'round_date' as const,
        Cell: (props: any) => (
          <div>
            {props.value ? (
              <>
                {formatDate(props.value, {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </>
            ) : (
              emptyCell
            )}
          </div>
        ),
        //width: 120,
      },
      {
        Header: 'Company',
        accessor: 'company' as const,
        Cell: (props: any) => (
          <div className="flex items-center shrink-0 w-full">
            {!props.value ? (
              emptyCell
            ) : (
              <ElemLink
                href={`${COMPANIES}/${props.value.slug}`}
                className="company flex items-center space-x-3 hover:opacity-70"
              >
                <ElemPhoto
                  photo={props.value.logo}
                  wrapClass="flex items-center justify-center shrink-0 w-10 h-10 p-1 rounded-lg overflow-hidden bg-white border border-slate-200"
                  imgClass="object-fit max-w-full max-h-full rounded"
                  imgAlt={props.value.name}
                />
                <p className="ml-2 line-clamp-2 break-words">
                  {props.value.name}
                </p>
              </ElemLink>
            )}
          </div>
        ),
        width: 200,
        disableSortBy: true,
      },
      {
        Header: 'Round',
        accessor: 'round' as const,
        //width: 120,
        Cell: (props: any) => (
          <div>{props.value ? <>{props.value}</> : emptyCell}</div>
        ),
      },
      {
        Header: 'Amount',
        accessor: 'amount' as const,
        //width: 120,
        Cell: (props: any) => (
          <div>
            {props.value ? <>${numberWithCommas(props.value)}</> : emptyCell}
          </div>
        ),
      },
      {
        Header: 'Investors',
        accessor: 'id' as const,
        Cell: (props: any) => {
          const vcsWithPartner = props.row.original?.investments?.filter(
            (investment: any) => investment.person && investment.vc_firm,
          );
          const vcs = props.row.original?.investments?.filter(
            (investment: any) => !investment.person && investment.vc_firm,
          );
          const angels = props.row.original?.investments?.filter(
            (investment: any) => investment.person && !investment.vc_firm,
          );

          return (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 !whitespace-normal">
              {props.row.original?.investments ? (
                <>
                  {vcsWithPartner?.map((investment: any) => {
                    return (
                      <div
                        key={investment.id}
                        className="h-fit bg-white border border-gray-300 space-y-2 rounded-lg p-2"
                      >
                        {investment.vc_firm && (
                          <ElemLink
                            href={`${INVESTORS}/${investment.vc_firm.slug}`}
                            key={investment.vc_firm.id}
                            className="vcfirm flex items-center space-x-3 hover:opacity-70"
                          >
                            <ElemPhoto
                              photo={investment.vc_firm.logo}
                              wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 rounded-lg overflow-hidden border border-slate-200"
                              imgClass="object-fit max-w-full max-h-full"
                              imgAlt={investment.vc_firm.name}
                              placeholderClass="text-slate-300"
                            />
                            <span className="line-clamp-2 font-medium">
                              {investment.vc_firm.name}
                            </span>
                          </ElemLink>
                        )}

                        {investment.person && (
                          <ElemLink
                            href={`${PEOPLE}/${investment.person.slug}`}
                            key={investment.person.id}
                            className="investor flex items-center space-x-3 hover:opacity-70"
                          >
                            <ElemPhoto
                              photo={investment.person.picture}
                              wrapClass="flex items-center justify-center shrink-0 w-12 h-12 rounded-full overflow-hidden"
                              imgClass="object-cover w-12 h-12"
                              imgAlt={investment.person.name}
                              placeholder="user"
                              placeholderClass="text-slate-300"
                            />
                            <span className="line-clamp-2 font-medium">
                              {investment.person.name}
                            </span>
                          </ElemLink>
                        )}
                      </div>
                    );
                  })}

                  {vcs?.map((investment: any) => {
                    return (
                      <div
                        key={investment.id}
                        className="h-fit bg-white border border-gray-300 space-y-2 rounded-lg p-2"
                      >
                        {investment.vc_firm && (
                          <ElemLink
                            href={`${INVESTORS}/${investment.vc_firm.slug}`}
                            key={investment.vc_firm.id}
                            className="vcfirm flex items-center space-x-3 hover:opacity-70"
                          >
                            <ElemPhoto
                              photo={investment.vc_firm.logo}
                              wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 border border-black/10 rounded-lg overflow-hidden"
                              imgClass="object-fit max-w-full max-h-full"
                              imgAlt={investment.vc_firm.name}
                              placeholderClass="text-slate-300"
                            />
                            <span className="line-clamp-2 font-medium">
                              {investment.vc_firm.name}
                            </span>
                          </ElemLink>
                        )}
                      </div>
                    );
                  })}

                  {angels?.map((investment: any) => {
                    return (
                      <div
                        key={investment.id}
                        className="h-fit bg-white border border-gray-300 space-y-2 rounded-lg p-2"
                      >
                        {investment.person && (
                          <ElemLink
                            href={`${PEOPLE}/${investment.person.slug}`}
                            key={investment.person.id}
                            className="investor flex items-center space-x-3 hover:opacity-70"
                          >
                            <ElemPhoto
                              photo={investment.person.picture}
                              wrapClass="flex items-center justify-center shrink-0 w-12 h-12 rounded-full overflow-hidden"
                              imgClass="object-cover w-12 h-12"
                              imgAlt={investment.person.name}
                              placeholder="user"
                              placeholderClass="text-slate-300"
                            />
                            <span className="line-clamp-2 font-medium">
                              {investment.person.name}
                            </span>
                          </ElemLink>
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                emptyCell
              )}
            </div>
          );
        },
        width: 650,
        disableSortBy: true,
      },
    ],
    [emptyCell],
  );

  const dataInvestments = React.useMemo(() => {
    return investments ? investments : [{}];
  }, [investments]);

  const investmentsCount = dataInvestments.length;

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
    setSortBy,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: dataInvestments,
      //autoResetPage: true, true by default
      disableSortRemove: true,
      autoResetSortBy: false,
      sortTypes,
      initialState: {
        //sortBy: sortees,
        pageSize: 50,
      },
      defaultColumn,
      autoResetHiddenColumns: false,
      autoResetResize: false,
    },
    useSortBy,
    usePagination,
    useResizeColumns,
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
    <section className={`border border-gray-300 rounded-lg ${className}`}>
      {heading && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium px-4 pt-2">{heading}</h2>
        </div>
      )}

      <div className="px-4 py-4">
        {investments.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">
              There is no investment data on this organization.
            </div>
            <ElemButton
              className="mt-2"
              onClick={() =>
                showNewMessages(
                  `Hi EdgeIn, I'd like to request investment data on ${resourceName}`,
                )
              }
              btn="default"
            >
              Request data or contribute
            </ElemButton>
          </div>
        ) : (
          <>
            <div className="overflow-auto border border-gray-300 rounded-lg">
              <table
                {...getTableProps()}
                className="table-auto min-w-full divide-y divide-gray-300 overscroll-x-none"
              >
                <thead>
                  {headerGroups.map(headerGroup => {
                    const { key, ...restHeaderGroupProps } =
                      headerGroup.getHeaderGroupProps();
                    return (
                      <tr
                        key={key}
                        {...restHeaderGroupProps}
                        className="table-row min-w-full bg-gray-25 text-gray-600"
                      >
                        {headerGroup.headers.map((column: any) => {
                          const { key, ...restColumnProps }: any = ({} = {
                            ...column.getHeaderProps({
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
                              className={`relative px-2 py-2 whitespace-nowrap font-medium text-sm text-left min-w-content`}
                            >
                              <div className="flex items-center min-w-content">
                                {column.render('Header')}
                                <Menu
                                  as="div"
                                  className="relative inline-block text-left ml-1"
                                >
                                  <Menu.Button className="block align-middle text-gray-400 rounded-full hover:bg-slate-100">
                                    <IconChevronDownMini className="h-5 w-5" />
                                  </Menu.Button>

                                  <Menu.Items className="absolute z-50 left-0 origin-top-left flex flex-col mt-2 w-56 divide-y divide-gray-100 rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5 overflow-hidden focus:outline-none">
                                    {column.canSort && (
                                      <Menu.Item
                                        as="button"
                                        className={`flex items-center w-full px-2 py-2 text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100 ${
                                          column.isSorted &&
                                          column.isSortedDesc === false
                                            ? 'text-primary-500'
                                            : ''
                                        }`}
                                        onClick={(e: any) => {
                                          column.getHeaderProps(
                                            setSortBy([
                                              { id: column.id, desc: false },
                                            ]),
                                          );
                                        }}
                                      >
                                        <IconSortUp className="mr-1 h-5 w-5 inline-block" />
                                        Sort Ascending
                                      </Menu.Item>
                                    )}

                                    {column.canSort && (
                                      <Menu.Item
                                        as="button"
                                        className={`flex items-center w-full px-2 py-2 text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100 ${
                                          column.isSorted &&
                                          column.isSortedDesc === true
                                            ? 'text-primary-500'
                                            : ''
                                        }`}
                                        onClick={(e: any) => {
                                          column.getHeaderProps(
                                            setSortBy([
                                              { id: column.id, desc: true },
                                            ]),
                                          );
                                        }}
                                      >
                                        <IconSortDown className="mr-1 h-5 w-5 inline-block" />
                                        Sort Descending
                                      </Menu.Item>
                                    )}

                                    {column.render('Header') != 'Name' && (
                                      <Menu.Item
                                        as="button"
                                        className="flex items-center w-full px-2 py-2 text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100"
                                        onClick={(e: any) => {
                                          column.getHeaderProps(
                                            column.toggleHidden(),
                                          );
                                        }}
                                      >
                                        <IconX className="mr-1 h-5 w-5 inline-block" />
                                        Hide Column
                                      </Menu.Item>
                                    )}
                                  </Menu.Items>
                                </Menu>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    );
                  })}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-300 flex-1 md:flex-none mb-96"
                >
                  {page.map(row => {
                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps();

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
                              className="align-top text-sm px-4 py-3"
                            >
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
              totalItems={investmentsCount}
              page={pageIndex}
              itemsPerPage={pageSize}
              onClickPrev={() => previousPage()}
              onClickNext={() => nextPage()}
            />
          </>
        )}
      </div>
    </section>
  );
};
