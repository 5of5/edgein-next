import { FC, useMemo } from 'react';
import { useTable, useResizeColumns, useSortBy } from 'react-table';
import { TableColumnsFilter } from '@/components/my-list/table-columns-filter';
import {
  IconSortUp,
  IconSortDown,
  IconChevronDownMini,
  IconEyeSlash,
} from '@/components/icons';
import { Pagination } from '@/components/pagination';
import { ElemButton } from '@/components/elem-button';
import { ElemDropdown } from '../elem-dropdown';
import { TableUpgrade } from './table-upgrade';

type Props = {
  resourceType:
    | 'companies'
    | 'investors'
    | 'events'
    | 'people'
    | 'lists'
    | 'groups';
  columns: any[];
  data: any;
  pageSize: number;
  pageIndex: number;
  totalItems: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  showUpgrade?: boolean;
  upgradeTitle?: string;
};

export const TableView: FC<Props> = ({
  resourceType,
  columns,
  data = [],
  pageSize,
  pageIndex,
  totalItems,
  onPreviousPage,
  onNextPage,
  showUpgrade,
  upgradeTitle,
}) => {
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setSortBy,
    allColumns,
    rows,
    //selectedFlatRows,
    toggleHideAllColumns,
    // state: { pageIndex, pageSize, selectedRowIds },
    // toggleAllRowsSelected,
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
    useSortBy,
    useResizeColumns,
  );

  return (
    <div>
      {data.length > 0 && (
        <div className="flex items-center mb-2 space-x-2">
          <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0">
            <TableColumnsFilter
              columns={allColumns}
              resetColumns={() => toggleHideAllColumns(false)}
            />
          </div>
        </div>
      )}

      <div className="relative overflow-hidden">
        <div className="w-full overflow-auto  border-neutral-700 overscroll-x-none border-y lg:border lg:rounded-lg [mask-image:linear-gradient(90deg,#000_0,#000_95%,transparent)]">
          <table
            {...getTableProps()}
            className="divide-y divide-gray-200 table-auto">
            <thead>
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
                          className="relative px-2 py-2 text-sm font-medium text-left text-gray-600 whitespace-nowrap min-w-content">
                          <div className="flex items-center min-w-content">
                            {column.disableDropdown != true ? (
                              <ElemDropdown
                                items={[
                                  ...(column.canSort
                                    ? [
                                        {
                                          id: 0,
                                          label: 'Sort Ascending',
                                          value: 'sortAscending',
                                          Icon: IconSortUp,
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
                                          id: 1,
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
                                          id: 2,
                                          label: 'Hide Column',
                                          value: 'hideColumn',
                                          Icon: IconEyeSlash,
                                          onClick: () => column.toggleHidden(),
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
                                className="h-5"
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
        </div>
        {showUpgrade && totalItems > 5 && (
          <TableUpgrade
            title={upgradeTitle}
            columns={columns}
            //rowsCount={6}
          />
        )}
      </div>

      <Pagination
        shownItems={rows?.length}
        totalItems={totalItems}
        page={pageIndex}
        itemsPerPage={pageSize}
        onClickPrev={onPreviousPage}
        onClickNext={onNextPage}
      />
    </div>
  );
};
