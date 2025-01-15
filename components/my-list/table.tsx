import { FC, useMemo } from 'react';
import {
  useTable,
  useResizeColumns,
  useSortBy,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import { Toaster } from 'react-hot-toast';
import useToast from '@/hooks/use-toast';
import compact from 'lodash/compact';
import { TableColumnsFilter } from './table-columns-filter';
import { TableGlobalFilter } from './table-global-filter';
import {
  IconSortUp,
  IconSortDown,
  IconX,
  IconTrash,
  IconEyeSlash,
  IconChevronDownMini,
} from '@/components/icons';
import { Pagination } from '@/components/pagination';
import { ElemButton } from '@/components/elem-button';
import { useCheckboxes } from './indeterminate-checkbox';
import { convertToInternationalCurrencySystem, toLabel } from '@/utils';
import { useUser } from '@/context/user-context';
import { PluginHook } from 'react-table';
import { ElemDropdown } from '../elem-dropdown';

type Props = {
  listName: string | null;
  resourceType: 'companies' | 'investors' | 'people';
  columns: any[];
  data: any;
  pageSize: number;
  onChangePageSize?: React.ChangeEventHandler<HTMLSelectElement>;
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
  onChangePageSize,
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
  const { toast } = useToast();

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
      toast(`Removed from "${listName}"`);
    }
  };

  return (
    <div className="px-4 mt-4">
      <div className="items-start justify-between mb-2 sm:flex">
        <h2 className="mr-2 font-medium capitalize">{toLabel(resourceType)}</h2>

        {['companies', 'investors'].includes(resourceType) &&
          fundingTotal !== undefined &&
          fundingTotal > 0 && (
            <div className="flex items-center mr-2 font-bold sm:justify-center sm:text-right shrink-0">
              <div className="mr-1 text-sm">{`Total ${
                resourceType === 'companies' ? 'Funding' : 'Invested'
              }`}</div>
              <div className="text-lg text-green-600">
                ${convertToInternationalCurrencySystem(fundingTotal)}
              </div>
            </div>
          )}
      </div>
      {(data.length > 0 || searchQuery) && (
        <div className="flex items-center mb-2 space-x-2">
          {Object.keys(selectedRowIds).length > 0 ? (
            <>
              <ElemButton
                onClick={() => {
                  handleRemove();
                }}
                roundedFull
                btn="danger"
                className="gap-x-1">
                <IconTrash className="w-5 h-5" title="Remove from list" />
                <div>
                  Remove {Object.keys(selectedRowIds).length} item
                  {Object.keys(selectedRowIds).length > 1 && 's'}
                </div>
              </ElemButton>

              <ElemButton
                onClick={() => toggleAllRowsSelected(false)}
                roundedFull
                btn="default"
                className="gap-x-1">
                <IconX className="w-5 h-5" title="Clear Selection" />
                <div>Cancel</div>
              </ElemButton>

              <div className="text-sm shrink-0">
                {Object.keys(selectedRowIds).length} selected
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:justify-between sm:space-x-3 sm:space-y-0">
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
        <div className="w-full overflow-auto border-neutral-700 border-y lg:border lg:rounded-lg">
          {data.length > 0 ? (
            <table
              {...getTableProps()}
              className="divide-y divide-gray-200 table-auto overscroll-x-none">
              <thead className="">
                {headerGroups.map(headerGroup => {
                  const { key, ...restHeaderGroupProps } =
                    headerGroup.getHeaderGroupProps();
                  return (
                    <tr
                      key={key}
                      {...restHeaderGroupProps}
                      className="table-row min-w-full">
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
                            className="relative px-2 py-2 text-sm font-medium text-left text-gray-600 whitespace-nowrap min-w-content bg-gray-25">
                            <div className="flex items-center min-w-content">
                              {column.disableDropdown != true &&
                              column.canSort ? (
                                <ElemDropdown
                                  items={[
                                    ...(column.canSort
                                      ? [
                                          {
                                            id: 1,
                                            label: 'Sort Ascending',
                                            value: 'sortAscending',
                                            Icon: IconSortUp,
                                            selectedIconClass:
                                              'text-primary-500',
                                            onClick: () => {
                                              column.getHeaderProps(
                                                setSortBy([
                                                  {
                                                    id: column.id,
                                                    desc: false,
                                                  },
                                                ]),
                                              );
                                            },
                                          },
                                          {
                                            id: 2,
                                            label: 'Sort Descending',
                                            value: 'sortDescending',
                                            Icon: IconSortDown,
                                            onClick: () => {
                                              column.getHeaderProps(
                                                setSortBy([
                                                  {
                                                    id: column.id,
                                                    desc: true,
                                                  },
                                                ]),
                                              );
                                            },
                                          },
                                        ]
                                      : []),
                                    ...(!column.disableHiding
                                      ? [
                                          {
                                            id: 3,
                                            label: 'Hide Column',
                                            value: 'hideColumn',
                                            Icon: IconEyeSlash,
                                            onClick: () =>
                                              column.toggleHidden(),
                                          },
                                        ]
                                      : []),
                                  ]}
                                  customButton={
                                    <ElemButton className="!p-0">
                                      {column.render('Header')}
                                      <IconChevronDownMini
                                        className="w-5 h-5 ml-1"
                                        title="Options"
                                      />
                                    </ElemButton>
                                  }
                                  itemsShowIcons={true}
                                  placement="bottom-start"
                                />
                              ) : (
                                column.render('Header')
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
                className="divide-y divide-gray-200">
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
                            className="p-2 text-sm align-middle">
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
            <div className="flex flex-col items-center justify-center w-full p-5 text-gray-500">
              <div className="max-w-sm text-center">{noDataText}</div>
              {['companies', 'investors', 'people'].includes(resourceType) && (
                <ElemButton
                  href={exploreBtnHref}
                  btn="transparent"
                  arrow
                  className="px-0">
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
        onChangePageSize={onChangePageSize}
        onClickPrev={onPreviousPage}
        onClickNext={onNextPage}
      />
      <Toaster />
    </div>
  );
};
