import { useGetCompaniesByListIdQuery } from '@/graphql/types';
import { orderBy } from 'lodash';
import moment from 'moment-timezone';
import React, { FC, useMemo, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { numberWithCommas } from '@/utils';
import Link from 'next/link';
import { TableEmptyCell } from './table-empty-cell';
import { Table } from './table';
import { PlaceholderTable } from '../placeholders';
import { ElemTags } from '@/components/elem-tags';
import { ElemTooltip } from '../elem-tooltip';
import { COMPANIES } from '@/routes';

type Props = {
  listId: number;
  listName: string | null;
};

export const CompaniesList: FC<Props> = ({ listId, listName }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [query, setQuery] = useState('');
  const limit = 10;
  const {
    data: companiesData,
    error,
    isLoading,
    refetch,
  } = useGetCompaniesByListIdQuery(
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

  const companies = companiesData?.follows_companies;

  const totalItems =
    companiesData?.follows_companies_aggregate?.aggregate?.count || 0;

  const fundingTotal = useMemo(() => {
    let funding = 0;

    if (companies) {
      companies.forEach(item => {
        item.company?.investment_rounds.forEach(round => {
          funding += round.amount;
        });
      });
    }

    return funding;
  }, [companies]);

  const columns = useMemo<any[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'company.name' as const,
        Cell: (props: any) => (
          <div className="flex items-center space-x-3">
            <a
              href={`${COMPANIES}/` + props.row.original?.company?.slug}
              className="shrink-0 transition-all"
            >
              <ElemPhoto
                photo={props.row.original?.company?.logo}
                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-white border border-gray-300 rounded-md overflow-hidden"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={props.value}
                placeholderClass="text-gray-300"
              />
            </a>

            <div>
              <a
                href={`${COMPANIES}/` + props.row.original?.company?.slug}
                className="font-medium line-clamp-2 break-words hover:underline"
              >
                {props.value}
              </a>
              {props.row.original?.company?.website && (
                <a
                  href={props.row.original.company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="break-words hover:underline text-sm text-gray-500"
                >
                  {props.row.original.company.website}
                </a>
              )}
            </div>
          </div>
        ),
        width: 300,
        minWidth: 300,
        //disableDropdown: true,
        //disableResizing: true,
        disableHiding: true,
      },
      {
        Header: 'Description',
        accessor: 'company.overview' as const,
        Cell: (props: any) => (
          <div>
            {props.value ? (
              <>
                <ElemTooltip
                  content={props.value}
                  mode="light"
                  direction="top"
                  size="lg"
                  delay={1200}
                  className="max-h-72 overflow-y-scroll"
                >
                  <div className="text-sm line-clamp-3 text-gray-500">
                    {props.value}
                  </div>
                </ElemTooltip>
                {/* <p className="line-clamp-3 text-sm text-gray-500">
                 {props.value}
              </p> */}
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
        accessor: 'company.tags' as const,
        Cell: (props: any) => (
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
        accessor: 'company.coin.ticker' as const,
        Cell: (props: any) => (
          <>{props.value ? <div>{props.value}</div> : <TableEmptyCell />}</>
        ),
        width: 100,
      },
      {
        Header: 'City',
        accessor: 'company.location_json.city' as const,
        Cell: (props: any) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'State',
        accessor: 'company.location_json.state' as const,
        Cell: (props: any) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'Country',
        accessor: 'company.location_json.country' as const,
        Cell: (props: any) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'Founded',
        accessor: 'company.year_founded' as const,
        Cell: (props: any) => {
          return <>{props.value ? <p>{props.value}</p> : <TableEmptyCell />}</>;
        },
        width: 200,
      },
      {
        Header: 'Employees',
        accessor: 'company.total_employees' as const,
        Cell: (props: any) => {
          return (
            <>
              {props.value ? (
                <p>{numberWithCommas(props.value)}</p>
              ) : (
                <TableEmptyCell />
              )}
            </>
          );
        },
        width: 200,
      },
      {
        Header: 'Total Funding',
        accessor: (data: { company: { investment_rounds: Array<any> } }) => {
          const totalFunding = data.company?.investment_rounds?.reduce(
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
                props.row.original?.company.investment_rounds.length > 0 ? (
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
        accessor: 'company.investment_rounds.length' as const,
        Cell: (props: any) => {
          const numberOfRounds = props.value;
          return <>{numberOfRounds ? numberOfRounds : <TableEmptyCell />}</>;
        },
        width: 200,
      },
      {
        Header: 'Last Funding Date',
        accessor: (data: { company: { investment_rounds: Array<any> } }) => {
          if (data.company?.investment_rounds.length > 0) {
            const roundsByLatestDate = orderBy(
              data.company?.investment_rounds,
              a => new Date(a.round_date),
              ['desc'],
            );

            return roundsByLatestDate[0].round_date;
          } else {
            return 0;
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
        Header: 'Last Funding Type',
        accessor: (data: { company: { investment_rounds: Array<any> } }) => {
          if (data.company?.investment_rounds.length > 0) {
            const roundsByLatestDate = orderBy(
              data.company?.investment_rounds,
              a => new Date(a.round_date),
              ['desc'],
            );

            return roundsByLatestDate[0].round;
          } else {
            return 0;
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
    return <h4>Error loading companies</h4>;
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
      resourceType="companies"
      columns={columns}
      data={companies}
      pageSize={limit}
      pageIndex={pageIndex}
      totalItems={totalItems}
      fundingTotal={fundingTotal}
      noDataText="There are no companies in this list."
      exploreBtnHref={COMPANIES}
      exploreBtnText="Explore Companies"
      searchQuery={query}
      onChangeSearchQuery={onChangeSearchQuery}
      onRefetchData={refetch}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
    />
  );
};
