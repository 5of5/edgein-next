import {
  Companies,
  Investment_Rounds,
  Team_Members,
  useGetCompaniesByListIdQuery,
} from '@/graphql/types';
import { orderBy } from 'lodash';
import moment from 'moment-timezone';
import React, { FC, useMemo, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { numberWithCommas } from '@/utils';
import { TABLE_DEFAULT_TEAM_LIMIT } from '@/utils/constants';
import { TableEmptyCell } from './table-empty-cell';
import { Table } from './table';
import { PlaceholderTable } from '../placeholders';
import { ElemTags } from '@/components/elem-tags';
import { ElemPillsPeople } from '@/components/elem-pills-people';
import { ElemTooltip } from '../elem-tooltip';
import { ROUTES } from '@/routes';

type Props = {
  listId: number;
  listName: string | null;
  isListAuthor: boolean;
};

export const CompaniesList: FC<Props> = ({
  listId,
  listName,
  isListAuthor,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState('');

  const {
    data: companiesData,
    error,
    isLoading,
    refetch,
  } = useGetCompaniesByListIdQuery(
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
        Cell: (props: {
          value: string;
          row: {
            original: {
              company: Companies;
            };
          };
        }) => (
          <div className="flex items-center space-x-3">
            <a
              href={`${ROUTES.COMPANIES}/` + props.row.original?.company?.slug}
              className="transition-all shrink-0">
              <ElemPhoto
                photo={props.row.original?.company?.logo}
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
                  `${ROUTES.COMPANIES}/` + props.row.original?.company?.slug
                }
                className="font-medium break-words line-clamp-2 hover:underline">
                {props.value}
              </a>
              {props.row.original?.company?.website && (
                <a
                  href={props.row.original.company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-500 break-words hover:underline">
                  {props.row.original.company.website}
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
        accessor: 'company.overview' as const,
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
        accessor: 'company.tags' as const,
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
        accessor: 'company.coin.ticker' as const,
        Cell: (props: { value: string }) => (
          <>{props.value ? <div>{props.value}</div> : <TableEmptyCell />}</>
        ),
        width: 100,
      },
      {
        Header: 'Team',
        accessor: 'company.teamMembers' as const,
        Cell: (props: { value: Team_Members[] }) => {
          return (
            <div className="flex flex-wrap gap-2 overflow-clip">
              {props.value?.length ? (
                <>
                  <ElemPillsPeople
                    items={props.value}
                    limit={TABLE_DEFAULT_TEAM_LIMIT}
                  />
                </>
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
        Header: 'Employees',
        accessor: 'company.total_employees' as const,
        Cell: (props: { value: number }) => {
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
        Header: 'City',
        accessor: 'company.location_json.city' as const,
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'State',
        accessor: 'company.location_json.state' as const,
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'Country',
        accessor: 'company.location_json.country' as const,
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
        width: 200,
      },
      {
        Header: 'Founded',
        accessor: 'company.year_founded' as const,
        Cell: (props: { value: string }) => {
          return <>{props.value ? <p>{props.value}</p> : <TableEmptyCell />}</>;
        },
        width: 200,
      },
      {
        Header: 'Total Funding',
        accessor: (data: {
          company: { investment_rounds: Investment_Rounds[] };
        }) => {
          const totalFunding = data.company?.investment_rounds?.reduce(
            (total: number, currentValue: any) =>
              (total = total + currentValue.amount),
            0,
          );

          return totalFunding;
        },
        Cell: (props: {
          value: number;
          row: {
            original: {
              company: Companies;
            };
          };
        }) => {
          return (
            <div>
              {props.value > 0 ? (
                <>${numberWithCommas(props.value)}</>
              ) : props.value === 0 &&
                props.row.original?.company?.investment_rounds.length > 0 ? (
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
        Cell: (props: { value: number }) => {
          const numberOfRounds = props.value;
          return <>{numberOfRounds ? numberOfRounds : <TableEmptyCell />}</>;
        },
        width: 200,
      },
      {
        Header: 'Last Funding Date',
        accessor: (data: { company: Companies }) => {
          if (data.company?.investment_rounds.length > 0) {
            const roundsByLatestDate = orderBy(
              data.company?.investment_rounds,
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
        accessor: (data: { company: Companies }) => {
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
        Cell: (props: { value: string }) => {
          return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
        },
      },
      {
        Header: 'Last Funding Amount',
        accessor: (data: { company: Companies }) => {
          if (data.company?.investment_rounds.length > 0) {
            const roundsByLatestDate = orderBy(
              data.company?.investment_rounds,
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
    return <h4>Error loading companies</h4>;
  }

  if (isLoading) {
    return (
      <div className="px-4 mt-4">
        <h2 className="mb-2 font-medium">Companies</h2>
        <div className="border border-gray-200 rounded-lg">
          <PlaceholderTable />
        </div>
      </div>
    );
  }

  return (
    <>
      <Table
        disabledCheckbox={!isListAuthor}
        listName={listName}
        resourceType="companies"
        columns={columns}
        data={companies}
        pageSize={pageSize}
        onChangePageSize={e => {
          setPageSize(Number(e.target.value));
        }}
        pageIndex={pageIndex}
        totalItems={totalItems}
        fundingTotal={fundingTotal}
        noDataText="There are no companies in this list."
        exploreBtnHref={ROUTES.COMPANIES}
        exploreBtnText="Explore Companies"
        searchQuery={query}
        onChangeSearchQuery={onChangeSearchQuery}
        onRefetchData={refetch}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </>
  );
};
