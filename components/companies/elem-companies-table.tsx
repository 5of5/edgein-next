import React, { FC, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import moment from 'moment-timezone';
import { first } from 'lodash';
import {
  IconSortUp,
  IconSortDown,
  IconX,
  IconChevronDownMini,
  IconChevronLeft,
  IconChevronRight,
} from '@/components/icons';
import { ElemButton } from '@/components/elem-button';
import { TableColumnsFilter } from '@/components/my-list/table-columns-filter';
import { last } from 'lodash';
import { Menu } from '@headlessui/react';
import { numberWithCommas } from '@/utils';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import { loadStripe } from '@/utils/stripe';
import { ElemTags } from '@/components/elem-tags';

import {
  useTable,
  useResizeColumns,
  useSortBy,
  usePagination,
} from 'react-table';
import { useRouter } from 'next/router';

type Props = {
  className?: string;
  companies?: any;
  pageNumber: number;
  itemsPerPage: number;
  shownItems?: number;
  totalItems: number;
  onClickPrev?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickNext?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  filterByTag: Function;
};

export const CompaniesTable: FC<Props> = ({
  className = '',
  companies,
  pageNumber,
  itemsPerPage,
  shownItems = 0,
  totalItems,
  onClickPrev,
  onClickNext,
  filterByTag,
}) => {
  const router = useRouter();
  const { user } = useUser();

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const onBillingClick = async () => {
    if (!user) {
      router.push('/sign-in');
    } else {
      loadStripe();
    }
  };

  const isDisplayAllCompanies = user?.entitlements.viewEmails
    ? user?.entitlements.viewEmails
    : false;

  if (!isDisplayAllCompanies) {
    itemsPerPage = 5;
    pageNumber = 0;
  }

  const shownItemsStart = pageNumber === 0 ? 1 : pageNumber * itemsPerPage;
  const shownItemsEnd =
    shownItems < itemsPerPage ? totalItems : (pageNumber + 1) * itemsPerPage;

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

    return latestRound;
  };

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 100,
      width: 200,
      //maxWidth: 300,
    }),
    [],
  );

  const EmptyCell = () => <div className="text-slate-400">&mdash;</div>;

  const columns = React.useMemo<any[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name' as const,
        Cell: (props: any) => (
          <a
            href={`/companies/` + props.row.original?.slug}
            className="flex items-center space-x-3 shrink-0 group transition-all"
          >
            <ElemPhoto
              photo={props.row.original?.logo}
              wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-lg overflow-hidden"
              imgClass="object-fit max-w-full max-h-full"
              imgAlt={props.value}
              placeholderClass="text-slate-300"
            />
            <p className="font-medium line-clamp-2 break-word underline group-hover:no-underline">
              {props.value}
            </p>
          </a>
        ),
        width: 170,
        minWidth: 200,
      },
      {
        Header: 'Token',
        accessor: 'coin.ticker' as const,
        Cell: (props: any) => (
          <>{props.value ? <div>{props.value}</div> : <EmptyCell />}</>
        ),
        width: 100,
      },
      {
        Header: 'Industries',
        accessor: 'tags' as const,
        Cell: (props: any) => (
          <>
            {props.value ? (
              <ElemTags resourceType={'companies'} tags={props.value} />
            ) : (
              <EmptyCell />
            )}
          </>
        ),
        disableSortBy: true,
        width: 300,
        minWidth: 200,
      },
      {
        Header: 'Description',
        accessor: 'overview' as const,
        Cell: (props: any) => (
          <div>
            {props.value ? (
              <p className="line-clamp-5 text-sm">{props.value}</p>
            ) : (
              <EmptyCell />
            )}
          </div>
        ),
        disableSortBy: true,
        width: 400,
        minWidth: 300,
      },
      {
        Header: 'Employees',
        accessor: 'total_employees' as const,
        Cell: (props: any) => {
          return (
            <>
              {props.value ? (
                <p>{numberWithCommas(props.value)}</p>
              ) : (
                <EmptyCell />
              )}
            </>
          );
        },
        width: 120,
      },
      {
        Header: 'Team',
        accessor: 'teamMembers' as const,
        Cell: (props: any) => {
          return (
            <div>
              {props.value?.length > 0 ? (
                <>
                  {props.value?.map((item: any, index: number) => {
                    return (
                      <div key={item?.id} className="inline">
                        <a
                          key={item?.person?.id}
                          href={`/people/${item.person?.slug}`}
                          className="underline hover:no-underline"
                        >
                          {item.person?.name}
                        </a>
                        {last(props.value) === item ? '' : ','}{' '}
                      </div>
                    );
                  })}
                </>
              ) : (
                <EmptyCell />
              )}
            </div>
          );
        },
        disableSortBy: true,
        width: 300,
        minWidth: 200,
      },
      {
        Header: 'City',
        accessor: 'location_json.city' as const,
        Cell: (props: any) => {
          return <div>{props.value ? props.value : <EmptyCell />}</div>;
        },
        //disableSortBy: true,
        minWidth: 180,
      },
      {
        Header: 'State',
        accessor: 'location_json.state' as const,
        Cell: (props: any) => {
          return <div>{props.value ? props.value : <EmptyCell />}</div>;
        },
        //disableSortBy: true,
        minWidth: 180,
      },
      {
        Header: 'Country',
        accessor: 'location_json.country' as const,
        Cell: (props: any) => {
          return <div>{props.value ? props.value : <EmptyCell />}</div>;
        },
        //disableSortBy: true,
        minWidth: 180,
      },
      {
        Header: 'Founded',
        accessor: 'year_founded' as const,
        Cell: (props: any) => {
          return <>{props.value ? <p>{props.value}</p> : <EmptyCell />}</>;
        },
        width: 120,
      },
      {
        Header: 'Total Funding',
        accessor: (data: { investment_rounds: Array<any> }) => {
          const totalFunding = data.investment_rounds?.reduce(
            (total: number, currentValue: any) =>
              (total = total + currentValue.amount),
            0,
          );

          return totalFunding;
        },
        Cell: (props: any) => {
          return (
            <div>
              {props.value > 0 ? (
                <>${numberWithCommas(props.value)}</>
              ) : props.value === 0 &&
                props.row.original?.investment_rounds.length > 0 ? (
                <>Undisclosed Capital</>
              ) : (
                <>${props.value}</>
              )}
            </div>
          );
        },
        width: 140,
      },
      {
        Header: '# Funding Rounds',
        accessor: 'investment_rounds.length' as const,
        Cell: (props: any) => {
          const numberOfRounds = props.value;
          return <>{numberOfRounds ? numberOfRounds : <EmptyCell />}</>;
        },
        width: 100,
      },
      {
        Header: 'Last Funding Date',
        accessor: (data: { investment_rounds: Array<any> }) => {
          if (!data.investment_rounds) {
            return 0;
          } else {
            const latestRound = getLatestRound(data.investment_rounds);

            const out = latestRound?.round_date ? latestRound?.round_date : 0;

            return out;
          }
        },
        Cell: (props: any) => {
          return (
            <div>
              {props.value ? moment(props.value).format('LL') : <EmptyCell />}
            </div>
          );
        },
        width: 120,
      },
      {
        Header: 'Last Funding Total',
        accessor: (data: { investment_rounds: Array<any> }) => {
          if (!data.investment_rounds) {
            return 0;
          } else {
            const latestRound = getLatestRound(data.investment_rounds);

            const out = latestRound?.amount ? latestRound?.amount : 0;

            return out;
          }
        },
        Cell: (props: any) => {
          return (
            <div>
              {props.value > 0 ? (
                <>${numberWithCommas(props.value)}</>
              ) : props.value === 0 &&
                props.row.original?.investment_rounds?.length > 0 ? (
                <>Undisclosed Capital</>
              ) : (
                <EmptyCell />
              )}
            </div>
          );
        },
        width: 140,
      },
      {
        Header: 'Last Funding Type',
        accessor: (data: { investment_rounds: Array<any> }) => {
          if (!data.investment_rounds) {
            return 0;
          } else {
            const latestRound = getLatestRound(data.investment_rounds);

            const out = latestRound?.round ? latestRound?.round : 0;

            return out;
          }
        },
        Cell: (props: any) => {
          return <div>{props.value ? props.value : <EmptyCell />}</div>;
        },
      },
    ],
    [],
  );

  const getCompanies = React.useMemo(() => {
    return companies ? companies : [{}];
  }, [companies]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setSortBy,
    allColumns,
    // nextPage,
    // previousPage,
    toggleHideAllColumns,
    // state: { pageIndex, pageSize, selectedRowIds },
    //toggleAllRowsSelected,
  } = useTable(
    {
      columns: columns,
      data: getCompanies,
      disableSortRemove: true,
      autoResetSortBy: false,
      initialState: {
        pageSize: itemsPerPage,
      },
      defaultColumn,
      autoResetHiddenColumns: false,
      autoResetResize: false,
    },
    useResizeColumns,
    useSortBy,
    usePagination,
  );

  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap items-center justify-between space-x-2 py-3">
        <div className="flex flex-col items-start space-y-3 lg:flex-row lg:items-center lg:space-x-3 lg:space-y-0">
          <TableColumnsFilter
            columns={allColumns}
            resetColumns={() => toggleHideAllColumns(false)}
          />
        </div>

        <div className="flex items-center mt-6 lg:mt-0">
          {shownItems === 0 ? (
            <></>
          ) : shownItems == totalItems ? (
            <div>
              {shownItemsStart}
              {' - '} {shownItemsEnd} of {totalItems} companies
            </div>
          ) : (
            <div>
              {numberWithCommas(shownItemsStart)}
              {'-'}
              {numberWithCommas(shownItemsEnd)} of{' '}
              {numberWithCommas(totalItems)} companies
            </div>
          )}
          <div className="flex space-x-1 ml-2">
            {!isDisplayAllCompanies ? (
              <>
                <ElemButton
                  onClick={onOpenUpgradeDialog}
                  btn="white"
                  roundedFull={true}
                  className={`!p-1.5 aspect-square ${
                    pageNumber * itemsPerPage > 0
                      ? ''
                      : 'opacity-50 cursor-default hover:!bg-white hover:!text-current'
                  }`}
                >
                  <IconChevronLeft className="h-5 w-5" />
                </ElemButton>

                <ElemButton
                  onClick={onOpenUpgradeDialog}
                  btn="white"
                  roundedFull={true}
                  className={`!p-1.5 aspect-square ${
                    totalItems > shownItemsEnd
                      ? ''
                      : 'opacity-50 cursor-default hover:!bg-white hover:!text-current'
                  }`}
                >
                  <IconChevronRight className="h-5 w-5" />
                </ElemButton>
              </>
            ) : (
              <>
                <ElemButton
                  onClick={
                    pageNumber * itemsPerPage > 0 ? onClickPrev : undefined
                  }
                  btn="white"
                  roundedFull={true}
                  className={`!p-1.5 aspect-square ${
                    pageNumber * itemsPerPage > 0
                      ? ''
                      : 'opacity-50 cursor-default hover:!bg-white hover:!text-current'
                  }`}
                >
                  <IconChevronLeft className="h-5 w-5" />
                </ElemButton>

                <ElemButton
                  onClick={totalItems > shownItemsEnd ? onClickNext : undefined}
                  btn="white"
                  roundedFull={true}
                  className={`!p-1.5 aspect-square ${
                    totalItems > shownItemsEnd
                      ? ''
                      : 'opacity-50 cursor-default hover:!bg-white hover:!text-current'
                  }`}
                >
                  <IconChevronRight className="h-5 w-5" />
                </ElemButton>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-auto border border-gray-300 rounded-lg overflow-y-hidden">
        <table
          {...getTableProps()}
          className="table-auto min-w-full divide-y divide-gray-300 overscroll-x-none"
        >
          <thead className="">
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
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
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

                          <div
                            {...column.getResizerProps()}
                            className={`group absolute top-0 right-0 inline-block resizer w-1 h-full touch-none ${
                              column.isResizing ? 'isResizing select-none' : ''
                            }`}
                            onClick={event => event.stopPropagation()}
                          >
                            <div
                              className={`w-px h-full translate-x-0.5 ${
                                column.isResizing
                                  ? 'bg-primary-500'
                                  : 'bg-black/10 group-hover:bg-primary-500'
                              }`}
                            ></div>
                          </div>
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
            className="bg-white divide-y divide-gray-300 flex-1"
          >
            {rows.map(row => {
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

        {!isDisplayAllCompanies && totalItems > itemsPerPage && (
          <table className="relative table-auto min-w-full overscroll-x-none">
            <tbody className="divide-y divide-black/10">
              {Array.from({ length: 10 }, (_, i) => (
                <tr key={i} className="min-w-full bg-white hover:bg-slate-100">
                  {Array.from({ length: 15 }, (_, ii) => {
                    return (
                      <td
                        key={ii}
                        className="min-w-[200px] align-middle text-sm p-2 blur-sm"
                        role="cell"
                      >
                        <div className="flex items-center h-10">
                          add figure here
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="absolute z-10 top-0 bottom-0 left-0 right-0 h-full w-full p-5 bg-gray-900/70 shadow">
                <td>
                  <div className="max-w-2xl">
                    <h2 className="text-2xl font-medium text-white lg:text-3xl">
                      View all {numberWithCommas(totalItems)} companies from
                      this search.
                    </h2>
                    <p className="text-lg text-white opacity-90">
                      Try EdgeIn Contributor FREE for 7 days.
                    </p>
                    <div className="flex items-center space-x-2 mt-4">
                      <ElemButton onClick={onBillingClick} btn="default" arrow>
                        Start your free trial
                      </ElemButton>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};
