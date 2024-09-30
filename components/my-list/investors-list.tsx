import { FC, useState, useMemo } from 'react';
import { first, orderBy } from 'lodash';
import moment from 'moment-timezone';
import {
  useGetVcFirmsByListIdQuery,
  Investments,
  Investment_Rounds,
  Vc_Firms,
  Team_Members,
} from '@/graphql/types';
import { numberWithCommas } from '@/utils';
import { TABLE_DEFAULT_TEAM_LIMIT } from '@/utils/constants';
import { ElemPhoto } from '@/components/elem-photo';
import { PlaceholderTable } from '../placeholders';
import { Table } from './table';
import { TableEmptyCell } from './table-empty-cell';
import { ElemTags } from '@/components/elem-tags';
import { ElemPillsPeople } from '@/components/elem-pills-people';
import { ElemTooltip } from '../elem-tooltip';
import { ROUTES } from '@/routes';

type Props = {
  listId: number;
  listName: string | null;
  isListAuthor: boolean;
};

export const InvestorsList: FC<Props> = ({
  listId,
  listName,
  isListAuthor,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState('');

  const {
    data: vcFirms,
    error,
    isLoading,
    refetch,
  } = useGetVcFirmsByListIdQuery(
    {
      list_id: listId,
      limit: pageSize,
      offset: pageSize * pageIndex,
      query: `%${query.trim()}%`,
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const investors = vcFirms?.follows_vc_firms;

  const totalItems = vcFirms?.follows_vc_firms_aggregate?.aggregate?.count || 0;

  const fundingTotal = useMemo(() => {
    let funding = 0;

    if (investors) {
      investors.forEach(item => {
        item.vc_firm?.investments.forEach(investmentItem => {
          const getAmount = investmentItem.investment_round?.amount as number;
          if (getAmount > 0) {
            funding += investmentItem.investment_round?.amount as number;
          }
        });
      });
    }

    return funding;
  }, [investors]);

  const getLatestRound = (rounds: Investment_Rounds[]) => {
    const latestRound = first(
      rounds
        ?.sort(
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

  const columns = useMemo<any[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'vc_firm.name' as const,
        Cell: (props: {
          value: string;
          row: {
            original: {
              vc_firm?: Vc_Firms;
            };
          };
        }) => (
          <div className="flex items-center space-x-3">
            <a
              href={`${ROUTES.INVESTORS}/` + props.row.original?.vc_firm?.slug}
              className="transition-all shrink-0">
              <ElemPhoto
                photo={props.row.original?.vc_firm?.logo}
                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-white border border-gray-300 rounded-md overflow-hidden"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={props.value}
                placeholder="company"
                placeholderClass="text-gray-300"
              />
            </a>

            <div>
              <a
                href={
                  `${ROUTES.INVESTORS}/` + props.row.original?.vc_firm?.slug
                }
                className="font-medium break-words line-clamp-2 hover:underline">
                {props.value}
              </a>
              {props.row.original?.vc_firm?.website && (
                <a
                  href={props.row.original.vc_firm.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-500 break-words hover:underline">
                  {props.row.original.vc_firm.website}
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
        accessor: 'vc_firm.overview' as const,
        Cell: (props: { value: string }) => (
          <div>
            {props.value ? (
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
        accessor: 'vc_firm.tags' as const,
        Cell: (props: { value: Array<string> }) => (
          <>
            {props.value ? (
              <>
                <ElemTags
                  resourceType={'investors'}
                  tags={props.value}
                  limit={6}
                />
              </>
            ) : (
              <TableEmptyCell />
            )}
          </>
        ),
        disableSortBy: true,
        width: 400,
      },
      {
        Header: 'Team',
        accessor: 'vc_firm.investors' as const,
        Cell: (props: { value: Team_Members[] }) => {
          return (
            <div className="flex flex-wrap gap-2 overflow-clip">
              {props.value?.length ? (
                <ElemPillsPeople
                  items={props.value}
                  limit={TABLE_DEFAULT_TEAM_LIMIT}
                />
              ) : (
                <TableEmptyCell />
              )}
            </div>
          );
        },
        disableSortBy: true,
        width: 450,
        minWidth: 300,
      },
      {
        Header: 'City',
        accessor: 'vc_firm.location_json.city' as const,
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'State',
        accessor: 'vc_firm.location_json.state' as const,
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'Country',
        accessor: 'vc_firm.location_json.country' as const,
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'Founded',
        accessor: 'vc_firm.year_founded' as const,
        Cell: (props: { value: string }) => {
          return <>{props.value ? <p>{props.value}</p> : <TableEmptyCell />}</>;
        },
        width: 200,
      },
      {
        Header: 'Investments Total',
        accessor: (data: { vc_firm: Vc_Firms }) => {
          const investmentRounds = data.vc_firm?.investments?.flatMap(
            (item: any) => item.investment_round,
          );

          const investmentsTotal = investmentRounds?.reduce(
            (total: number, round: Investments) =>
              (total = total + (round ? round.amount : 0)),
            0,
          );

          return investmentsTotal;
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
        width: 200,
      },
      {
        Header: '# Investment Rounds',
        accessor: 'vc_firm.num_of_investments' as const,
        Cell: (props: { value: number }) => {
          return <>{props.value ? props.value : <TableEmptyCell />}</>;
        },
        width: 40,
      },
      {
        Header: 'Last Investment Date',
        accessor: (data: {
          vc_firm: {
            investments: Investments[];
          };
        }) => {
          const investmentRounds = data.vc_firm?.investments?.flatMap(
            (item: any) => item?.investment_round,
          );

          if (!investmentRounds) {
            return null;
          } else {
            const latestRound = investmentRounds
              ? getLatestRound(investmentRounds)
              : null;

            const out = latestRound?.round_date
              ? latestRound?.round_date
              : null;

            return out;
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
        Header: 'Last Investment Type',
        accessor: (data: {
          vc_firm: {
            investments: Investments[];
          };
        }) => {
          const investmentRounds = data.vc_firm?.investments?.flatMap(
            (item: any) => item.investment_round,
          );

          if (!investmentRounds) {
            return null;
          } else {
            const latestRound = getLatestRound(investmentRounds);

            const out = latestRound?.round ? latestRound?.round : null;

            return out;
          }
        },
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
      },
      {
        Header: 'Last Investment Amount',
        accessor: (data: { vc_firm: Vc_Firms }) => {
          if (data.vc_firm?.investments.length > 0) {
            const roundsByLatestDate = orderBy(
              data.vc_firm?.investments,
              a => new Date(a.investment_round?.round_date),
              ['desc'],
            );

            const fundingAmount = roundsByLatestDate[0].investment_round
              ?.amount ? (
              <>
                $
                {numberWithCommas(
                  roundsByLatestDate[0].investment_round?.amount,
                )}
              </>
            ) : (
              'Undisclosed Capital'
            );

            return fundingAmount;
          } else {
            return 0;
          }
        },
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
      },
    ],
    [],
  );

  const onChangeSearchQuery = (value: string) => {
    setQuery(value);
    setPageIndex(0);
  };

  const onPreviousPage = () => {
    setPageIndex(pageIndex - 1);
  };
  const onNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  if (error) {
    return <h4>Error loading investors</h4>;
  }

  if (isLoading) {
    return (
      <div className="px-4 mt-4">
        <h2 className="mb-2 font-medium">Investors</h2>
        <div className="border border-gray-200 rounded-lg">
          <PlaceholderTable />
        </div>
      </div>
    );
  }

  return (
    <Table
      disabledCheckbox={!isListAuthor}
      listName={listName}
      resourceType="investors"
      columns={columns}
      data={investors}
      pageSize={pageSize}
      onChangePageSize={e => {
        setPageSize(Number(e.target.value));
      }}
      pageIndex={pageIndex}
      totalItems={totalItems}
      fundingTotal={fundingTotal}
      noDataText="There are no investors in this list."
      exploreBtnHref={ROUTES.INVESTORS}
      exploreBtnText="Explore Investors"
      searchQuery={query}
      onChangeSearchQuery={onChangeSearchQuery}
      onRefetchData={refetch}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
    />
  );
};
