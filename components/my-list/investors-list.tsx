import { Follows_Vc_Firms } from '@/graphql/types';
import { compact, first, last } from 'lodash';
import moment from 'moment-timezone';
import React, { FC, useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import {
  useTable,
  useResizeColumns,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import { TableColumnsFilter } from './table-columns-filter';
import { TableGlobalFilter } from './table-global-filter';
import { ElemPhoto } from '@/components/elem-photo';
import {
  IconSortUp,
  IconSortDown,
  IconX,
  IconTrash,
  IconChevronDown,
} from '@/components/icons';
import { Pagination } from '@/components/pagination';
import { ElemButton } from '@/components/elem-button';
import { useCheckboxes } from './indeterminate-checkbox';
import {
  convertToInternationalCurrencySystem,
  numberWithCommas,
} from '@/utils';
import { ElemReactions } from '@/components/elem-reactions';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '@/context/user-context';
import Link from 'next/link';

type Props = {
  vcfirms?: Follows_Vc_Firms[];
  isCustomList?: boolean;
  selectedListName: string | null;
};

export const InvestorsList: FC<Props> = ({
  vcfirms,
  isCustomList,
  selectedListName,
}) => {
  const { refreshProfile } = useUser();

  const [resourceList, setResourceList] = useState<Follows_Vc_Firms[]>();

  const [fundingTotal, setFundingTotal] = useState(0);

  const [tags, setTags] = useState<any>([]);

  const listNameTitle = selectedListName === 'crap' ? 'sh**' : selectedListName;

  useEffect(() => {
    const allInvestorsTags: any = [];
    let funding = 0;
    if (vcfirms) {
      setResourceList(vcfirms);
    }
    if (vcfirms) {
      vcfirms.forEach(({ vc_firm }) => {
        if (vc_firm?.tags && vc_firm?.tags.length > 0) {
          vc_firm?.tags.forEach((tag: string) => {
            allInvestorsTags.push(tag);
          });
        }

        vc_firm?.investments?.forEach(round => {
          const getAmount = round.investment_round?.amount as number;
          if (getAmount > 0) {
            funding += round.investment_round?.amount as number;
          }
        });
      });
    }
    setTags(allInvestorsTags);
    setFundingTotal(funding);
  }, [vcfirms]);

  const reducedTagsArray = tags.reduce(
    (tag: { name: any; count: number }[], curr: any, _: any, arr: any) => {
      if (tag.length == 0) tag.push({ name: curr, count: 1 });
      else if (tag.findIndex(f => f.name === curr) === -1)
        tag.push({ name: curr, count: 1 });
      else ++tag[tag.findIndex(f => f.name === curr)].count;
      return tag;
    },
    [],
  );

  const sortedTags = reducedTagsArray.sort(
    (a: { count: number }, b: { count: number }) => b.count - a.count,
  );

  const getLatestRound = (theRounds: any) => {
    const latestRound: any = first(
      theRounds
        .sort(
          (
            a: { round_date: string | number | Date },
            b: { round_date: string | number | Date },
          ) => {
            const distantPast = new Date('April 2, 1900 00:00:00');
            const dateA = a?.round_date ? new Date(a.round_date) : distantPast;
            const dateB = b?.round_date ? new Date(b.round_date) : distantPast;
            return dateA.getTime() - dateB.getTime();
          },
        )
        .reverse(),
    );

    //const out = latestRound?.round_date ? latestRound?.round_date : 0;

    return latestRound;
  };

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
    () => <div className="text-slate-400">&mdash;</div>,
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

  const columns = React.useMemo<any[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'vc_firm.name' as const,
        Cell: (props: any) => (
          <div>
            <a
              href={`/investors/` + props.row.original?.vc_firm?.slug}
              className="flex items-center space-x-3 shrink-0 transition-all"
            >
              <ElemPhoto
                photo={props.row.original?.vc_firm?.logo}
                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-white border border-gray-300 rounded-md overflow-hidden"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={props.value}
                placeholderClass="text-slate-300"
              />
              <p className="font-medium line-clamp-2 break-words hover:underline">
                {props.value}
              </p>
            </a>
          </div>
        ),
        width: 170,
        minWidth: 200,
        //disableDropdown: true,
        //disableResizing: true,
        disableHiding: true,
      },
      {
        Header: 'Description',
        accessor: 'vc_firm.overview' as const,
        Cell: (props: any) => (
          <div>
            {props.value ? (
              <p className="line-clamp-3 text-sm text-gray-500">
                {props.value}
              </p>
            ) : (
              emptyCell
            )}
          </div>
        ),
        disableSortBy: true,
        width: 400,
        minWidth: 300,
      },
      {
        Header: 'Tags',
        accessor: 'vc_firm.tags' as const,
        Cell: (props: any) => (
          <div className="flex flex-wrap gap-1">
            {props.value ? (
              <>
                {props.value?.map((tag: string, index: number) => {
                  return (
                    <Link href={`/investors/?tags=${tag}`} key={index}>
                      <a className="shrink-0 bg-gray-100 text-xs font-medium px-3 py-1 rounded-full hover:bg-gray-200">
                        {tag}
                      </a>
                    </Link>
                  );
                })}
              </>
            ) : (
              emptyCell
            )}
          </div>
        ),
        disableSortBy: true,
        width: 400,
      },
      {
        Header: 'Location',
        accessor: 'vc_firm.location' as const,
        Cell: (props: any) => {
          return <div>{props.value ? props.value : emptyCell}</div>;
        },
        disableSortBy: true,
        width: 200,
      },
      {
        Header: 'Founded',
        accessor: 'vc_firm.year_founded' as const,
        Cell: (props: any) => {
          return <>{props.value ? <p>{props.value}</p> : emptyCell}</>;
        },
        width: 200,
      },
      // {
      // 	Header: "Employees",
      // 	accessor: "vc_firm.total_employees" as const,
      // 	Cell: (props: any) => {
      // 		return (
      // 			<>
      // 				{props.value ? <p>{numberWithCommas(props.value)}</p> : emptyCell}
      // 			</>
      // 		);
      // 	},
      // 	width: 120,
      // },
      {
        Header: 'Investments Total',
        accessor: (data: {
          vc_firm: {
            investments: {
              [x: string]: any;
              investment_round: Object;
            };
          };
        }) => {
          const investmentRounds = data.vc_firm?.investments?.flatMap(
            (item: any) => item.investment_round,
          );

          const investmentsTotal = investmentRounds?.reduce(
            (total: number, currentValue: any) =>
              (total = total + (currentValue ? currentValue.amount : 0)),
            0,
          );

          return investmentsTotal;
        },
        Cell: (props: any) => {
          return (
            <div>
              {props.value ? <>${numberWithCommas(props.value)}</> : emptyCell}
            </div>
          );
        },
        width: 200,
      },
      {
        Header: '# Investment Rounds',
        accessor: 'vc_firm.num_of_investments' as const,
        Cell: (props: any) => {
          return <>{props.value ? props.value : emptyCell}</>;
        },
        width: 40,
      },
      {
        Header: 'Last Investment Date',
        accessor: (data: {
          vc_firm: {
            investments: {
              [x: string]: any;
              investment_round: Object;
            };
          };
        }) => {
          const investmentRounds = data.vc_firm?.investments?.flatMap(
            (item: any) => item.investment_round,
          );

          if (!investmentRounds) {
            return 0;
          } else {
            const latestRound = getLatestRound(investmentRounds);

            const out = latestRound?.round_date ? latestRound?.round_date : 0;

            return out;
          }
        },
        Cell: (props: any) => {
          return (
            <div>
              {props.value ? moment(props.value).format('LL') : emptyCell}
            </div>
          );
        },
        width: 200,
      },
      {
        Header: 'Last Investment Type',
        accessor: (data: {
          vc_firm: {
            investments: {
              [x: string]: any;
              investment_round: Object;
            };
          };
        }) => {
          const investmentRounds = data.vc_firm?.investments?.flatMap(
            (item: any) => item.investment_round,
          );

          if (!investmentRounds) {
            return 0;
          } else {
            const latestRound = getLatestRound(investmentRounds);

            const out = latestRound?.round ? latestRound?.round : 0;

            return out;
          }
        },
        Cell: (props: any) => {
          return <div>{props.value ? props.value : emptyCell}</div>;
        },
      },
    ],
    [emptyCell],
  );

  const getInvestors = React.useMemo(() => {
    return resourceList ? resourceList : [{}];
  }, [resourceList]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //rows, "rows" gets replaced with "page" for pagination
    prepareRow,
    setSortBy,
    allColumns,
    page,
    nextPage,
    previousPage,
    selectedFlatRows,
    toggleHideAllColumns,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
    toggleAllRowsSelected,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns: columns,
      data: getInvestors,
      disableSortRemove: true,
      autoResetSortBy: false,
      sortTypes,
      initialState: {
        pageSize: 20,
      },
      defaultColumn,
      autoResetHiddenColumns: false,
      autoResetResize: false,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useResizeColumns,
    useCheckboxes,
  );

  const onRemove = async () => {
    const followIds = compact(
      selectedFlatRows.map((row: any, index: number) => row.original?.id),
    );

    const deleteInvestorsRes = await fetch(`/api/delete-follows/`, {
      method: 'POST',
      body: JSON.stringify({ followIds }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (deleteInvestorsRes.ok) {
      setResourceList(prev => {
        return prev?.filter(
          resource => !followIds.includes(resource.id as number),
        );
      });
      refreshProfile();
      toast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            Removed from {listNameTitle}
          </div>
        ),
        {
          duration: 3000,
          position: 'top-center',
        },
      );
    }
  };

  return (
    <div className="px-4 mt-10">
      <div className="sm:flex items-start justify-between mb-2">
        <h2 className="font-medium capitalize mr-2">Investors</h2>

        {fundingTotal > 0 && (
          <div className="flex items-center sm:justify-center sm:text-right font-medium shrink-0 mr-2">
            <div className="text-sm mr-1">Total Invested</div>
            <div className="text-green-600 text-lg">
              ${convertToInternationalCurrencySystem(fundingTotal)}
            </div>
          </div>
        )}
      </div>

      {preGlobalFilteredRows.length > 0 &&
        Object.keys(selectedRowIds).length > 0 && (
          <div className="flex items-center space-x-2 mb-2">
            <button
              onClick={onRemove}
              className="relative inline-flex items-center text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-red-600 hover:bg-slate-200 focus:outline-none focus:ring-1"
            >
              <IconTrash className="h-5 w-5 mr-1" title="Remove from list" />
              <div>Remove from list</div>
            </button>
            <button
              onClick={() => toggleAllRowsSelected(false)}
              className="relative inline-flex items-center text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1"
            >
              <IconX className="h-5 w-5 mr-1" title="Clear Selection" />
              <div>Cancel</div>
            </button>

            <div className="text-sm shrink-0">
              {Object.keys(selectedRowIds).length} organization
              {Object.keys(selectedRowIds).length > 1 && 's'} selected
            </div>
          </div>
        )}

      <div className="relative -mx-5 lg:mx-0">
        <div className="absolute pointer-events-none w-8 bg-gradient-to-l from-white z-10 rounded-tr-lg rounded-br-lg top-px bottom-px right-0 sm:right-px"></div>
        <div className="border-y border-gray-200 overflow-auto lg:border lg:rounded-lg">
          {preGlobalFilteredRows.length > 0 ? (
            <table
              {...getTableProps()}
              className="table-auto divide-y divide-gray-200 overscroll-x-none"
            >
              <thead className="">
                {headerGroups.map(headerGroup => {
                  const { key, ...restHeaderGroupProps } =
                    headerGroup.getHeaderGroupProps();
                  return (
                    <tr
                      key={key}
                      {...restHeaderGroupProps}
                      className="table-row min-w-full"
                    >
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
                            className={`relative px-2 py-2 whitespace-nowrap font-medium text-sm text-left min-w-content bg-[#FCFCFC] text-gray-600`}
                          >
                            <div className="flex items-center min-w-content">
                              {column.render('Header')}

                              {column.disableDropdown != true && (
                                <Menu
                                  as="div"
                                  className="relative inline-block text-left ml-1"
                                >
                                  <Menu.Button className="block align-middle text-slate-400 rounded-full hover:text-primary-500 hover:bg-slate-100">
                                    <IconChevronDown className="h-5 w-5" />
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

                                    {!column.disableHiding && (
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
                              )}

                              {/* {column.canResize && (
                                <div
                                  {...column.getResizerProps()}
                                  className={`group absolute top-0 right-0 inline-block resizer w-1 h-full touch-none ${
                                    column.isResizing
                                      ? 'isResizing select-none'
                                      : ''
                                  }`}
                                  onClick={event => event.stopPropagation()}>
                                  <div
                                    className={`w-px h-full ${
                                      column.isResizing
                                        ? 'bg-primary-500'
                                        : 'bg-black/10 group-hover:bg-primary-500'
                                    }`}></div>
                                </div>
                              )} */}
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
                className="divide-y divide-gray-200"
              >
                {page.map(row => {
                  prepareRow(row);
                  const { key, ...restRowProps } = row.getRowProps();

                  return (
                    <tr key={key} {...restRowProps} className="min-w-full">
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
                            className="align-middle text-sm p-2"
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
          ) : (
            <div className="flex flex-col w-full items-center justify-center  p-5 text-slate-600">
              <div className="max-w-sm text-center">
                There are no investors in this list.
              </div>
              <ElemButton
                href="/investors"
                btn="transparent"
                arrow
                className="px-0"
              >
                Explore Investors
              </ElemButton>
            </div>
          )}
        </div>
      </div>
      <Pagination
        shownItems={page?.length}
        totalItems={getInvestors.length}
        page={pageIndex}
        itemsPerPage={pageSize}
        onClickPrev={() => previousPage()}
        onClickNext={() => nextPage()}
      />
      <Toaster />
    </div>
  );
};
