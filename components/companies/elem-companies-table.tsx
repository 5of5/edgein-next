import React, { useMemo, FC, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import moment from 'moment-timezone';
import { orderBy } from 'lodash';
import { numberWithCommas } from '@/utils';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import { ElemTags } from '@/components/elem-tags';
import {
  Companies,
  Investment_Rounds,
  Investment_Rounds_Aggregate,
} from '@/graphql/types';
import { ROUTES } from '@/routes';
import { TableEmptyCell } from '../my-list/table-empty-cell';
import { ElemTooltip } from '../elem-tooltip';
import { TableView } from '../companies/table-view';

type Props = {
  className?: string;
  companies?: any[];
  pageNumber: number;
  itemsPerPage: number;
  shownItems?: number;
  totalItems: number;
  onClickPrev: () => void;
  onClickNext: () => void;
};

export const CompaniesTable: FC<Props> = ({
  className = '',
  companies = [],
  pageNumber,
  itemsPerPage,
  shownItems = 0,
  totalItems,
  onClickPrev,
  onClickNext,
}) => {
  const { user } = useUser();

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const isPaidUser = user?.entitlements.viewEmails;

  const columns = useMemo<any[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name' as const,
        Cell: (props: {
          value: string;
          row: {
            original: Companies;
          };
        }) => (
          <div className="flex items-center space-x-3">
            <a
              href={`${ROUTES.COMPANIES}/` + props.row.original?.slug}
              className="transition-all shrink-0">
              <ElemPhoto
                photo={props.row.original?.logo}
                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-dark-100 border border-gray-300 rounded-md overflow-hidden"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={props.value}
                placeholderClass="text-gray-300"
              />
            </a>

            <div>
              <a
                href={`${ROUTES.COMPANIES}/` + props.row.original?.slug}
                className="font-medium break-words line-clamp-2 hover:underline">
                {props.value}
              </a>
              {props.row.original?.website && (
                <a
                  href={props.row.original.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-500 break-words hover:underline">
                  {props.row.original.website}
                </a>
              )}
            </div>
          </div>
        ),
        width: 300,
        minWidth: 300,
        disableHiding: true,
      },
      {
        Header: 'Description',
        accessor: 'overview' as const,
        Cell: (props: { value: string }) => (
          <div>
            {props.value ? (
              <>
                <ElemTooltip
                  content={props.value}
                  mode="light"
                  direction="top"
                  size="lg"
                  delay={1200}
                  className="overflow-y-scroll max-h-72">
                  <div className="text-sm text-gray-500 line-clamp-3">
                    {props.value}
                  </div>
                </ElemTooltip>
              </>
            ) : (
              <TableEmptyCell />
            )}
          </div>
        ),
        disableSortBy: true,
        width: 400,
        minWidth: 300,
      },
      {
        Header: 'Tags',
        accessor: 'tags' as const,
        Cell: (props: { value: Array<string> }) => (
          <>
            {props.value ? (
              <ElemTags
                resourceType={'companies'}
                tags={props.value}
                limit={6}
              />
            ) : (
              <TableEmptyCell />
            )}
          </>
        ),
        disableSortBy: true,
        width: 400,
      },
      {
        Header: 'Token',
        accessor: 'coin.ticker' as const,
        Cell: (props: { value: string }) => (
          <>{props.value ? <div>{props.value}</div> : <TableEmptyCell />}</>
        ),
        width: 100,
      },
      // TO DO: Need separate query for table view
      // {
      //   Header: 'Team',
      //   accessor: 'teamMembers' as const,
      //   Cell: (props: { value: Team_Members[] }) => {
      //     return (
      //       <div className="flex flex-wrap gap-2 overflow-clip">
      //         {props.value?.length ? (
      //           <>
      //             <ElemPillsPeople
      //               items={props.value}
      //               limit={TABLE_DEFAULT_TEAM_LIMIT}
      //             />
      //           </>
      //         ) : (
      //           <TableEmptyCell />
      //         )}
      //       </div>
      //     );
      //   },
      //   disableSortBy: true,
      //   width: 450,
      //   minWidth: 300,
      // },
      {
        Header: 'Employees',
        accessor: 'total_employees' as const,
        Cell: (props: { value: number }) => {
          return (
            <div>
              {props.value ? numberWithCommas(props.value) : <TableEmptyCell />}
            </div>
          );
        },
        width: 200,
      },
      {
        Header: 'City',
        accessor: 'location_json.city' as const,
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'State',
        accessor: 'location_json.state' as const,
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'Country',
        accessor: 'location_json.country' as const,
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'Founded',
        accessor: 'year_founded' as const,
        Cell: (props: { value: string }) => {
          return <>{props.value ? <p>{props.value}</p> : <TableEmptyCell />}</>;
        },
        width: 200,
      },
      {
        Header: 'Total Funding',
        accessor: (data: {
          investment_rounds: Investment_Rounds[];
          investor_amount: number;
        }) => {
          const totalFunding = data.investment_rounds?.reduce(
            (total: number, currentValue: any) =>
              (total = total + currentValue.amount),
            0,
          );

          if (totalFunding === 0 && data.investor_amount) {
            return data.investor_amount;
          } else {
            return totalFunding;
          }
        },
        Cell: (props: {
          value: number;
          row: {
            original: Companies;
          };
        }) => {
          return (
            <div>
              {props.value > 0 ? (
                <>${numberWithCommas(props.value)}</>
              ) : props.value === 0 &&
                props.row.original?.investment_rounds.length > 0 ? (
                <>Undisclosed Capital</>
              ) : (
                <>{<TableEmptyCell />}</>
              )}
            </div>
          );
        },
        width: 200,
      },
      {
        Header: '# Funding Rounds',
        accessor: (data: {
          investment_rounds_aggregate: Investment_Rounds_Aggregate;
        }) => {
          const totalRounds = data.investment_rounds_aggregate?.aggregate
            ? data.investment_rounds_aggregate?.aggregate?.count
            : 0;

          return totalRounds;
        },
        Cell: (props: { value: number }) => {
          return (
            <>
              {props.value && props.value > 0 ? (
                props.value
              ) : (
                <TableEmptyCell />
              )}
            </>
          );
        },
        width: 165,
      },
      {
        Header: 'Last Funding Date',
        accessor: (data: Companies) => {
          if (data?.investment_rounds.length > 0) {
            const roundsByLatestDate = orderBy(
              data?.investment_rounds,
              a => new Date(a.round_date),
              ['desc'],
            );

            return roundsByLatestDate[0].round_date;
          } else {
            return null;
          }
        },
        Cell: (props: { value: Date }) => {
          return (
            <div>
              {props.value ? (
                moment(props.value).format('LL')
              ) : (
                <TableEmptyCell />
              )}
            </div>
          );
        },
        width: 200,
      },
      {
        Header: 'Last Funding Type',
        accessor: (data: Companies) => {
          if (data?.investment_rounds.length > 0) {
            const roundsByLatestDate = orderBy(
              data?.investment_rounds,
              a => new Date(a.round_date),
              ['desc'],
            );

            return roundsByLatestDate[0].round;
          } else {
            return 0;
          }
        },
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 160,
      },
      {
        Header: 'Last Funding Amount',
        accessor: (data: Companies) => {
          if (data.investment_rounds.length > 0) {
            const roundsByLatestDate = orderBy(
              data.investment_rounds,
              a => new Date(a.round_date),
              ['desc'],
            );

            const fundingAmount = roundsByLatestDate[0].amount ? (
              <>${numberWithCommas(roundsByLatestDate[0].amount)}</>
            ) : (
              'Undisclosed Capital'
            );

            return fundingAmount;
          } else {
            return 0;
          }
        },
        Cell: (props: { value: number }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
      },
    ],
    [],
  );

  return (
    <div className={`${className}`}>
      <TableView
        resourceType="companies"
        columns={columns}
        data={companies}
        pageSize={shownItems}
        pageIndex={pageNumber}
        totalItems={totalItems}
        onPreviousPage={isPaidUser ? onClickPrev : onOpenUpgradeDialog}
        onNextPage={isPaidUser ? onClickNext : onOpenUpgradeDialog}
        showUpgrade={!isPaidUser && totalItems > itemsPerPage}
        upgradeTitle={`View all ${numberWithCommas(
          totalItems,
        )} companies from this search.`}
      />

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};
