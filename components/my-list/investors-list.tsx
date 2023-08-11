import { FC, useState, useMemo } from 'react';
import { first } from 'lodash';
import moment from 'moment-timezone';
import { useGetVcFirmsByListIdQuery } from '@/graphql/types';
import { numberWithCommas } from '@/utils';
import { ElemPhoto } from '@/components/elem-photo';
import { PlaceholderTable } from '../placeholders';
import { Table } from './table';
import { TableEmptyCell } from './table-empty-cell';
import Link from 'next/link';

type Props = {
  listId: number;
  listName: string | null;
};

export const InvestorsList: FC<Props> = ({ listId, listName }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [query, setQuery] = useState('');
  const limit = 10;

  const {
    data: vcFirms,
    error,
    isLoading,
    refetch,
  } = useGetVcFirmsByListIdQuery(
    {
      list_id: listId,
      limit,
      offset: limit * pageIndex,
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

  const getLatestRound = (rounds: any) => {
    const latestRound: any = first(
      rounds
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

  const columns = useMemo<any[]>(
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
              <TableEmptyCell />
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
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        disableSortBy: true,
        width: 200,
      },
      {
        Header: 'Founded',
        accessor: 'vc_firm.year_founded' as const,
        Cell: (props: any) => {
          return <>{props.value ? <p>{props.value}</p> : <TableEmptyCell />}</>;
        },
        width: 200,
      },
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
        Cell: (props: any) => {
          return <>{props.value ? props.value : <TableEmptyCell />}</>;
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
      <div className="rounded-lg px-4 border border-gray-200">
        <PlaceholderTable />
      </div>
    );
  }

  return (
    <Table
      listName={listName}
      resourceType="investors"
      columns={columns}
      data={investors}
      pageSize={limit}
      pageIndex={pageIndex}
      totalItems={totalItems}
      fundingTotal={fundingTotal}
      noDataText="There are no investors in this list."
      exploreBtnHref="/investors"
      exploreBtnText="Explore Investors"
      searchQuery={query}
      onChangeSearchQuery={onChangeSearchQuery}
      onRefetchData={refetch}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
    />
  );
};
