import { FC, useMemo } from 'react';
import { Menu } from '@headlessui/react';
import {
  useTable,
  useResizeColumns,
  useSortBy,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import toast, { Toaster } from 'react-hot-toast';
import startCase from 'lodash/startCase';
import compact from 'lodash/compact';
import { TableColumnsFilter } from './table-columns-filter';
import { TableGlobalFilter } from './table-global-filter';
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
import { convertToInternationalCurrencySystem } from '@/utils';
import { useUser } from '@/context/user-context';
import { PluginHook } from 'react-table';

type Props = {
  listName: string | null;
  resourceType: 'companies' | 'investors' | 'people';
  columns: any[];
  data: any;
  pageSize: number;
  pageIndex: number;
  totalItems: number;
  fundingTotal?: number;
  noDataText: string;
  exploreBtnHref?: string;
  exploreBtnText?: string;
  searchQuery: string;
  onChangeSearchQuery: (value: string) => void;
  onRefetchData: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  disabledCheckbox?: boolean;
};

export const Table: FC<Props> = ({
  listName,
  resourceType,
  columns,
  data = [],
  pageSize,
  pageIndex,
  totalItems,
  fundingTotal,
  noDataText,
  exploreBtnHref,
  exploreBtnText,
  searchQuery,
  onChangeSearchQuery,
  onRefetchData,
  onPreviousPage,
  onNextPage,
  disabledCheckbox = false,
}) => {
  const { refreshProfile } = useUser();

  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      width: 120,
      sortType: 'alphanumericNullLast',
    }),
    [],
  );

  const sortTypes = useMemo(
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

  const hooksUseTable = useMemo(() => {
    const hooks: PluginHook<any>[] = [
      useGlobalFilter,
      useSortBy,
      useRowSelect,
      useResizeColumns,
    ];

    if (!disabledCheckbox) {
      hooks.push(useCheckboxes);
    }

    return hooks;
  }, [disabledCheckbox]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setSortBy,
    allColumns,
    rows,
    selectedFlatRows,
    toggleHideAllColumns,
    state: { selectedRowIds },
    toggleAllRowsSelected,
  } = useTable(
    {
      columns,
      data,
      disableSortRemove: true,
      autoResetSortBy: false,
      sortTypes,
      initialState: {
        pageSize: 10,
        pageIndex: 0,
      },
      defaultColumn,
      autoResetHiddenColumns: false,
      autoResetResize: false,
    },
    ...hooksUseTable,
  );

  const handleRemove = async () => {
    const followIds = compact(
      selectedFlatRows.map((row: any) => row.original?.id),
    );

    const deleteFollowsResponse = await fetch(`/api/delete-follows/`, {
      method: 'POST',
      body: JSON.stringify({ followIds }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (deleteFollowsResponse.ok) {
      onRefetchData();
      refreshProfile();
      toast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            Removed from {listName}
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
    <div className="px-4 mt-4">
      <div className="sm:flex items-start justify-between mb-2">
        <h2 className="font-medium capitalize mr-2">
          {startCase(resourceType)}
        </h2>

        {['companies', 'investors'].includes(resourceType) &&
          fundingTotal !== undefined &&
          fundingTotal > 0 && (
            <div className="flex items-center sm:justify-center sm:text-right font-bold shrink-0 mr-2">
              <div className="text-sm mr-1">{`Total ${
                resourceType === 'companies' ? 'Funding' : 'Invested'
              }`}</div>
              <div className="text-green-600 text-lg">
                ${convertToInternationalCurrencySystem(fundingTotal)}
              </div>
            </div>
          )}
      </div>

      {(data.length > 0 || searchQuery) && (
        <div className="flex items-center space-x-2 mb-2">
          {Object.keys(selectedRowIds).length > 0 ? (
            <>
              <button
                onClick={handleRemove}
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
            </>
          ) : (
            <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0">
              <TableColumnsFilter
                columns={allColumns}
                resetColumns={() => toggleHideAllColumns(false)}
              />
              <TableGlobalFilter
                placeholder={`Search ${
                  totalItems > 1 ? `${totalItems} items` : `${totalItems} item`
                }...`}
                defaultValue={searchQuery}
                onChange={onChangeSearchQuery}
              />
            </div>
          )}
        </div>
      )}

      <div className="relative">
        <div className="absolute pointer-events-none w-8 bg-gradient-to-l from-white z-10 rounded-tr-lg rounded-br-lg top-px bottom-px right-0 sm:right-px"></div>
        <div className="w-full border-y border-gray-200 overflow-auto lg:border lg:rounded-lg">
          {data.length > 0 ? (
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
                            className="relative px-2 py-2 whitespace-nowrap font-medium text-sm text-left min-w-content bg-gray-25 text-gray-600"
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
          ) : (
            <div className="flex flex-col w-full items-center justify-center  p-5 text-slate-600">
              <div className="max-w-sm text-center">{noDataText}</div>
              {['companies', 'investors'].includes(resourceType) && (
                <ElemButton
                  href={exploreBtnHref}
                  btn="transparent"
                  arrow
                  className="px-0"
                >
                  {exploreBtnText}
                </ElemButton>
              )}
            </div>
          )}
        </div>
      </div>

      <Pagination
        shownItems={rows?.length}
        totalItems={totalItems}
        page={pageIndex}
        itemsPerPage={pageSize}
        onClickPrev={onPreviousPage}
        onClickNext={onNextPage}
      />

      <Toaster />
    </div>
  );
};
