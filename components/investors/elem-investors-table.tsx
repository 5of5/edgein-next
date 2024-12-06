import React, { FC, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import moment from 'moment-timezone';
import { numberWithCommas } from '@/utils';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import { TableEmptyCell } from '../my-list/table-empty-cell';
import { Investment_Rounds, Vc_Firms } from '@/graphql/types';
import { ROUTES } from '@/routes';
import { TableView } from '../companies/table-view';
import { ElemTags } from '../elem-tags';
import { ElemTooltip } from '../elem-tooltip';

type Props = {
  className?: string;
  investors?: any[];
  pageNumber: number;
  itemsPerPage: number;
  shownItems?: number;
  totalItems: number;
  onClickPrev: () => void;
  onClickNext: () => void;
};

export const InvestorsTable: FC<Props> = ({
  className = '',
  investors = [],
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

  const columns = React.useMemo<any[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name' as const,
        Cell: (props: {
          value: string;
          row: {
            original: Vc_Firms;
          };
        }) => (
          <div className="flex items-center space-x-3">
            <a
              href={`${ROUTES.INVESTORS}/` + props.row.original?.slug}
              className="transition-all shrink-0">
              <ElemPhoto
                photo={props.row.original?.logo}
                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-black border border-gray-300 rounded-md overflow-hidden"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={props.value}
                placeholderClass="text-gray-300"
              />
            </a>

            <div>
              <a
                href={`${ROUTES.INVESTORS}/` + props.row.original?.slug}
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
      // TO DO: Need separate query for table view
      // {
      //   Header: 'Team',
      //   accessor: 'investors' as const,
      //   Cell: (props: { value: Investors[] }) => {
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
      // TODO: add "total_employees" field to vc_firms in db
      // {
      //   Header: 'Employees',
      //   accessor: 'total_employees' as const,
      //   Cell: (props: { value: number }) => {
      //     return (
      //       <div>
      //         {props.value ? numberWithCommas(props.value) : <TableEmptyCell />}
      //       </div>
      //     );
      //   },
      //   width: 200,
      // },
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
      // TO DO: Need separate query for table view
      // {
      // 	Header: "Team",
      // 	accessor: "investors" as const,
      // 	Cell: (props: any) => {
      // 		return (
      // 			<div>
      // 				{props.value.length > 0 ? (
      // 					<>
      // 						{props.value?.map((item: any, index: number) => {
      // 							return (
      // 								<div key={item?.id} className="inline">
      // 									<a
      // 										key={item.person?.id}
      // 										href={`/people/${item.person?.slug}`}
      // 										className="transition-all border-b border-primary-500 hover:border-b-2 hover:text-primary-500"
      // 									>
      // 										{item.person?.name}
      // 									</a>
      // 									{last(props.value) === item ? "" : ","}{" "}
      // 								</div>
      // 							);
      // 						})}
      // 					</>
      // 				) : (
      // 					emptyCell
      // 				)}
      // 			</div>
      // 		);
      // 	},
      // 	disableSortBy: true,
      // 	width: 300,
      // 	minWidth: 200,
      // },
      // TO DO: Need separate query for table view
      // {
      //   Header: 'Investments Total',
      //   accessor: (data: { investments: Investments[] }) => {
      //     const investmentRounds = data?.investments?.flatMap(
      //       (item: any) => item.investment_round,
      //     );

      //     const investmentsTotal = investmentRounds?.reduce(
      //       (total: number, round: Investments) =>
      //         (total = total + (round ? round.amount : 0)),
      //       0,
      //     );
      //     return investmentsTotal;
      //   },
      //   Cell: (props: {
      //     value: number;
      //     row: {
      //       original: Vc_Firms;
      //     };
      //   }) => {
      //     return (
      //       <div>
      //         {props.value > 0 ? (
      //           <>${numberWithCommas(props.value)}</>
      //         ) : props.value === 0 &&
      //           props.row.original?.investments.length > 0 ? (
      //           <>Undisclosed Capital</>
      //         ) : (
      //           <>{<TableEmptyCell />}</>
      //         )}
      //       </div>
      //     );
      //   },
      //   width: 200,
      // },
      {
        Header: '# Investment Rounds',
        accessor: 'num_of_investments' as const,
        Cell: (props: { value: number }) => {
          return <>{props.value ? props.value : <TableEmptyCell />}</>;
        },
        width: 180,
      },
      {
        Header: 'Last Investment Date',
        accessor: (data: {
          investments: {
            investment_round: Pick<
              Investment_Rounds,
              'amount' | 'round' | 'round_date' | 'id'
            >;
          }[];
        }) => {
          const latestRound = data?.investments?.[0]?.investment_round;
          const out = latestRound?.round_date ? latestRound?.round_date : 0;
          return out;
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
        Header: 'Last Investment Type',
        accessor: (data: {
          investments: {
            investment_round: Pick<
              Investment_Rounds,
              'amount' | 'round' | 'round_date' | 'id'
            >;
          }[];
        }) => {
          const latestRound = data?.investments?.[0]?.investment_round;
          const out = latestRound?.round ? latestRound?.round : 0;
          return out;
        },
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'Last Investment Amount',
        accessor: (data: {
          investments: {
            investment_round: Pick<
              Investment_Rounds,
              'amount' | 'round' | 'round_date' | 'id'
            >;
          }[];
        }) => {
          const latestRound = data?.investments?.[0]?.investment_round;
          const out = latestRound?.amount ? latestRound?.amount : 0;
          return out;
        },
        Cell: (props: { value: number }) => {
          return (
            <div>
              {props.value ? (
                <>${numberWithCommas(props.value)}</>
              ) : (
                <TableEmptyCell />
              )}
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className={`${className}`}>
      <TableView
        resourceType="investors"
        columns={columns}
        data={investors}
        pageSize={shownItems}
        pageIndex={pageNumber}
        totalItems={totalItems}
        onPreviousPage={isPaidUser ? onClickPrev : onOpenUpgradeDialog}
        onNextPage={isPaidUser ? onClickNext : onOpenUpgradeDialog}
        showUpgrade={!isPaidUser && totalItems > itemsPerPage}
        upgradeTitle={`View all ${numberWithCommas(
          totalItems,
        )} investors from this search.`}
      />

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};
