import React from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { useTable, useSortBy, usePagination } from 'react-table';
import {
  IconEditPencil,
  IconSortUp,
  IconSortDown,
  IconX,
  IconChevronDownMini,
} from '@/components/icons';
import { Menu } from '@headlessui/react';
import { Pagination } from '@/components/pagination';
import { numberWithCommas, formatDate, convertToIntNum } from '@/utils';
import { Investment_Rounds } from '@/graphql/types';
import { ElemButton } from '../elem-button';
import { useIntercom } from 'react-use-intercom';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';

type Props = {
  className?: string;
  resourceName?: string;
  heading?: string;
  investments: Investment_Rounds[];
};

export const ElemInvestments: React.FC<Props> = ({
  className,
  heading,
  resourceName,
  investments,
}) => {
  const { showNewMessages } = useIntercom();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Round',
        accessor: 'round' as const,
        Cell: (props: any) => (
          <div>{props.value ? <>{props.value}</> : <>&mdash;</>}</div>
        ),
      },
      {
        Header: 'Amount Raised',
        accessor: 'amount' as const,
        Cell: (props: any) => (
          <div>
            {props.value ? (
              <>Raised ${numberWithCommas(props.value)}</>
            ) : (
              <>&mdash;</>
            )}
            {props.row.original.valuation && (
              <div>
                {' '}
                at ${numberWithCommas(props.row.original.valuation)} valuation
              </div>
            )}
          </div>
        ),
        width: 200,
      },
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
              <>&mdash;</>
            )}
          </div>
        ),
      },
      {
        Header: 'Investors',
        accessor: 'investments' as const,
        Cell: (props: any) => {
          const vcsWithPartner = props.value?.filter(
            (investment: any) => investment.person && investment.vc_firm,
          );
          const vcs = props.value?.filter(
            (investment: any) => !investment.person && investment.vc_firm,
          );
          const angels = props.value?.filter(
            (investment: any) => investment.person && !investment.vc_firm,
          );

          return (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 !whitespace-normal">
              {!props.value && <>&mdash;</>}

              {vcsWithPartner.map((investment: any) => {
                return (
                  <div
                    key={investment.id}
                    className="p-2 space-y-2 transition-all bg-black border border-gray-300 rounded-lg h-fit">
                    {investment.vc_firm && (
                      <ElemLink
                        href={`${ROUTES.INVESTORS}/${investment.vc_firm.slug}`}
                        key={investment.vc_firm.id}
                        className="flex items-center space-x-3 vcfirm hover:opacity-70">
                        <ElemPhoto
                          photo={investment.vc_firm.logo}
                          wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 rounded-lg overflow-hidden border border-slate-200"
                          imgClass="object-fit max-w-full max-h-full"
                          imgAlt={investment.vc_firm.name}
                          placeholder="company"
                          placeholderClass="text-gray-300"
                        />
                        <span className="font-medium line-clamp-2">
                          {investment.vc_firm.name}
                        </span>
                      </ElemLink>
                    )}

                    {investment.person && (
                      <ElemLink
                        href={`${ROUTES.PEOPLE}/${investment.person.slug}`}
                        key={investment.person.id}
                        className="flex items-center space-x-3 investor">
                        <ElemPhoto
                          photo={investment.person.picture}
                          wrapClass="flex items-center justify-center shrink-0 w-12 h-12 rounded-full overflow-hidden"
                          imgClass="object-cover w-12 h-12"
                          imgAlt={investment.person.name}
                          placeholder="user"
                          placeholderClass="text-gray-300"
                        />
                        <span className="font-medium line-clamp-2">
                          {investment.person.name}
                        </span>
                      </ElemLink>
                    )}
                  </div>
                );
              })}

              {vcs.map((investment: any) => {
                return (
                  <div
                    key={investment.id}
                    className="p-2 space-y-2 transition-all bg-black border border-gray-300 rounded-lg h-fit">
                    {investment.vc_firm && (
                      <ElemLink
                        href={`${ROUTES.INVESTORS}/${investment.vc_firm.slug}`}
                        key={investment.vc_firm.id}
                        className="flex items-center space-x-3 vcfirm hover:opacity-70">
                        <ElemPhoto
                          photo={investment.vc_firm.logo}
                          wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 border border-gray-300 rounded-lg overflow-hidden"
                          imgClass="object-fit max-w-full max-h-full"
                          imgAlt={investment.vc_firm.name}
                          placeholder="company"
                          placeholderClass="text-gray-300"
                        />
                        <span className="font-medium line-clamp-2">
                          {investment.vc_firm.name}
                        </span>
                      </ElemLink>
                    )}
                  </div>
                );
              })}

              {angels.map((investment: any) => {
                return (
                  <div
                    key={investment.id}
                    className="p-2 space-y-2 transition-all bg-black border border-gray-300 rounded-lg h-fit">
                    {investment.person && (
                      <ElemLink
                        href={`${ROUTES.PEOPLE}/${investment.person.slug}`}
                        key={investment.person.id}
                        className="flex items-center space-x-3 investor hover:opacity-70">
                        <ElemPhoto
                          photo={investment.person.picture}
                          wrapClass="flex items-center justify-center shrink-0 w-12 h-12 rounded-full overflow-hidden"
                          imgClass="object-cover w-12 h-12"
                          imgAlt={investment.person.name}
                          placeholder="user"
                          placeholderClass="text-gray-300"
                        />
                        <span className="font-medium line-clamp-2">
                          {investment.person.name}
                        </span>
                      </ElemLink>
                    )}
                  </div>
                );
              })}
            </div>
          );
        },
        width: 650,
        disableSortBy: true,
      },
    ],
    [],
  );

  const dataInvestments = React.useMemo(() => {
    return investments ? investments : [{}];
  }, [investments]);

  const investmentsCount = dataInvestments.length;

  const sortees = React.useMemo(
    () => [
      {
        id: 'round_date',
        desc: true,
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
    setSortBy,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: dataInvestments,
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
        <IconSortDown className="inline-block w-5 h-5 ml-1" />
      ) : (
        <IconSortUp className="inline-block w-5 h-5 ml-1" />
      )
    ) : column.canSort ? (
      <IconSortDown className="inline-block w-5 h-5 ml-1 text-slate-400 group-hover:text-primary-500" />
    ) : (
      <></>
    );
  };

  return (
    <section className={`rounded-lg border border-gray-300 ${className}`}>
      {heading && (
        <div className="flex items-center justify-between">
          <h2 className="px-4 pt-2 text-lg font-medium">{heading}</h2>
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
                  `Hi Mentibus, I'd like to request investment data on ${resourceName}`,
                )
              }
              btn="default">
              Request data or contribute
            </ElemButton>
          </div>
        ) : (
          <>
            <div className="overflow-auto border border-gray-300 rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-300 table-auto overscroll-x-none">
                <thead>
                  {headerGroups.map(headerGroup => {
                    const { key, ...restHeaderGroupProps } =
                      headerGroup.getHeaderGroupProps();
                    return (
                      <tr
                        key={key}
                        {...restHeaderGroupProps}
                        className="table-row min-w-full text-gray-600 bg-gray-25">
                        {headerGroup.headers.map((column: any) => {
                          const { key, ...restColumnProps }: any = ({} = {
                            ...column.getHeaderProps({
                              style: {
                                width: column.width,
                                minWidth: column.minWidth,
                                maxWidth: column.maxWidth,
                              },
                            }),
                          });

                          return (
                            <th
                              key={key}
                              {...restColumnProps}
                              className={`relative px-2 py-2 whitespace-nowrap font-medium text-sm text-left min-w-content`}>
                              <div className="flex items-center min-w-content">
                                {column.render('Header')}
                                <Menu
                                  as="div"
                                  className="relative inline-block ml-1 text-left">
                                  <Menu.Button className="block text-gray-500 align-middle rounded-full ">
                                    <IconChevronDownMini className="w-5 h-5" />
                                  </Menu.Button>

                                  <Menu.Items className="absolute left-0 z-50 flex flex-col w-56 mt-2 overflow-hidden origin-top-left bg-black divide-y divide-gray-100 rounded-lg shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                        }}>
                                        <IconSortUp className="inline-block w-5 h-5 mr-1" />
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
                                        }}>
                                        <IconSortDown className="inline-block w-5 h-5 mr-1" />
                                        Sort Descending
                                      </Menu.Item>
                                    )}

                                    {column.render('Header') != 'Name' && (
                                      <Menu.Item
                                        as="button"
                                        className="flex items-center w-full px-2 py-2 text-sm font-medium text-left hover:text-primary-500 hover:bg-slate-100"
                                        onClick={(e: any) => {
                                          column.getHeaderProps(
                                            column.toggleHidden(),
                                          );
                                        }}>
                                        <IconX className="inline-block w-5 h-5 mr-1" />
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
                  className="flex-1 bg-black divide-y divide-gray-300 md:flex-none mb-96">
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
                              className="p-2 text-sm align-top">
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
