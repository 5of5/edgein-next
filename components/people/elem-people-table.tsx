import React, { useMemo, FC, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import moment from 'moment-timezone';
import { numberWithCommas } from '@/utils';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import { ElemTags } from '@/components/elem-tags';
import { Investors, People, Team_Members } from '@/graphql/types';
import { ROUTES } from '@/routes';
import { TableEmptyCell } from '../my-list/table-empty-cell';
import { TableView } from '../companies/table-view';

type Props = {
  className?: string;
  people?: any[];
  pageNumber: number;
  itemsPerPage: number;
  shownItems?: number;
  totalItems: number;
  onClickPrev: () => void;
  onClickNext: () => void;
};

export const PeopleTable: FC<Props> = ({
  className = '',
  people = [],
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
            original: People;
          };
        }) => (
          <div className="flex items-center space-x-3">
            <a
              href={`${ROUTES.PEOPLE}/` + props.row.original?.slug}
              className="transition-all shrink-0">
              <ElemPhoto
                photo={props.row.original?.picture}
                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-dark-100 border border-gray-300 rounded-full overflow-hidden"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={props.value}
                placeholderClass="text-gray-300"
                placeholder="user"
              />
            </a>

            <div>
              <a
                href={`${ROUTES.PEOPLE}/` + props.row.original?.slug}
                className="font-medium break-words line-clamp-2 hover:underline">
                {props.value}
              </a>
            </div>
          </div>
        ),
        width: 300,
        minWidth: 300,
        disableHiding: true,
      },
      {
        Header: 'Role',
        accessor: (data: {
          name: string;
          investors: Investors[];
          team_members: Team_Members[];
        }) => {
          const getJobs = [...data.investors, ...data.team_members];

          if (getJobs.length > 0) {
            return getJobs[0].title;
          } else {
            return null;
          }
        },
        Cell: (props: {
          value: string;
          row: {
            original: People;
          };
        }) => {
          return (
            <div>
              {props.value ? <>{props.value}</> : <>{<TableEmptyCell />}</>}
            </div>
          );
        },
        width: 300,
      },
      {
        Header: 'Organization',
        accessor: (data: {
          investors: Investors[];
          team_members: Team_Members[];
        }) => {
          const getJobsOrganizations = [
            ...data.investors.flatMap(item => item?.vc_firm),
            ...data.team_members.flatMap(item => item?.company),
          ].filter(org => org);

          if (getJobsOrganizations.length > 0) {
            return getJobsOrganizations[0]?.name;
          }
          return null;
        },
        Cell: (props: {
          value: string;
          row: {
            original: People;
          };
        }) => (
          <>
            {props.value ? (
              <div className="flex items-center space-x-3">
                {props.row.original.investors[0]?.vc_firm?.slug ? (
                  <>
                    <a
                      href={
                        `${ROUTES.INVESTORS}/` +
                        props.row.original.investors[0]?.vc_firm.slug
                      }
                      className="transition-all shrink-0">
                      <ElemPhoto
                        photo={props.row.original.investors[0]?.vc_firm.logo}
                        wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-dark-100 border border-gray-300 rounded-md overflow-hidden"
                        imgClass="object-fit max-w-full max-h-full"
                        imgAlt={props.value}
                        placeholderClass="text-gray-300"
                      />
                    </a>
                    <div>
                      <a
                        href={
                          `${ROUTES.INVESTORS}/` +
                          props.row.original.investors[0]?.vc_firm.slug
                        }
                        className="font-medium break-words line-clamp-2 hover:underline">
                        {props.value}
                      </a>
                      {props.row.original.investors[0]?.vc_firm?.website && (
                        <a
                          href={
                            props.row.original.investors[0]?.vc_firm.website
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-gray-500 break-words hover:underline">
                          {props.row.original.investors[0]?.vc_firm.website}
                        </a>
                      )}
                    </div>
                  </>
                ) : props.row.original.team_members[0]?.company?.slug ? (
                  <>
                    <a
                      href={
                        `${ROUTES.COMPANIES}/` +
                        props.row.original.team_members[0]?.company?.slug
                      }
                      className="transition-all shrink-0">
                      <ElemPhoto
                        photo={
                          props.row.original.team_members[0]?.company?.logo
                        }
                        wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-dark-100 border border-gray-300 rounded-md overflow-hidden"
                        imgClass="object-fit max-w-full max-h-full"
                        imgAlt={props.value}
                        placeholderClass="text-gray-300"
                      />
                    </a>
                    <div>
                      <a
                        href={
                          `${ROUTES.COMPANIES}/` +
                          props.row.original.team_members[0]?.company.slug
                        }
                        className="font-medium break-words line-clamp-2 hover:underline">
                        {props.value}
                      </a>
                      {props.row.original.team_members[0]?.company?.website && (
                        <a
                          href={
                            props.row.original.team_members[0]?.company?.website
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-gray-500 break-words hover:underline">
                          {props.row.original.team_members[0]?.company?.website}
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500 break-words line-clamp-2">
                    Undisclosed organization
                  </div>
                )}
              </div>
            ) : (
              <TableEmptyCell />
            )}
          </>
        ),
        width: 300,
      },
      {
        Header: 'Start Date',
        accessor: (data: {
          investors: Investors[];
          team_members: Team_Members[];
        }) => {
          const getJobs = [
            ...data.investors.flatMap(item => item),
            ...data.team_members.flatMap(item => item),
          ].filter(org => org);

          if (getJobs.length > 0) {
            return getJobs[0].start_date;
          }
          return null;
        },
        Cell: (props: { value: Date }) => (
          <>
            {props.value ? (
              <div>{moment(props.value).format('LL')}</div>
            ) : (
              <TableEmptyCell />
            )}
          </>
        ),
        width: 200,
      },
      {
        Header: 'End Date',
        accessor: (data: {
          investors: Investors[];
          team_members: Team_Members[];
        }) => {
          const getJobs = [
            ...data.investors.flatMap(item => item),
            ...data.team_members.flatMap(item => item),
          ].filter(org => org);

          if (getJobs.length > 0) {
            return getJobs[0].end_date;
          }
          return null;
        },
        Cell: (props: { value: Date }) => (
          <>
            {props.value ? (
              <div>{moment(props.value).format('LL')}</div>
            ) : (
              <TableEmptyCell />
            )}
          </>
        ),
        width: 200,
      },
      // {
      //   Header: 'Function',
      //   accessor: (data: {
      //     investors: Investors[];
      //     team_members: Team_Members[];
      //   }) => {
      //     const getJobs = [...data.investors, ...data.team_members];

      //     if (getJobs.length > 0) {
      //       return getJobs[0].function;
      //     } else {
      //       return null;
      //     }
      //   },
      //   Cell: (props: { value: string }) => {
      //     return (
      //       <div>
      //         {props.value ? <>{props.value}</> : <>{<TableEmptyCell />}</>}
      //       </div>
      //     );
      //   },
      //   width: 200,
      // },
      {
        Header: 'Tags',
        accessor: (data: {
          investors: Investors[];
          team_members: Team_Members[];
        }) => {
          const getTags = [
            ...data.investors.flatMap(item => item?.vc_firm?.tags),
            ...data.team_members.flatMap(item => item?.company?.tags),
          ].filter(tag => tag);

          if (getTags.length > 0) {
            return getTags;
          } else {
            return null;
          }
        },
        Cell: (props: { value: Array<string> }) => (
          <>
            {props.value ? (
              <ElemTags resourceType={'people'} tags={props.value} limit={6} />
            ) : (
              <TableEmptyCell />
            )}
          </>
        ),
        width: 400,
        disableSortBy: true,
      },
      // TODO: add location_json fields to people in db
      // {
      //   Header: 'City',
      //   accessor: 'location_json.city' as const,
      //   Cell: (props: { value: string }) => {
      //     return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
      //   },
      //   width: 200,
      // },
      // {
      //   Header: 'State',
      //   accessor: 'location_json.state' as const,
      //   Cell: (props: { value: string }) => {
      //     return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
      //   },
      //   width: 200,
      // },
      // {
      //   Header: 'Country',
      //   accessor: 'location_json.country' as const,
      //   Cell: (props: { value: string }) => {
      //     return <div>{props.value ? props.value : <TableEmptyCell />}</div>;
      //   },
      //   width: 200,
      // },
    ],
    [],
  );

  return (
    <div className={`${className}`}>
      <TableView
        resourceType="companies"
        columns={columns}
        data={people}
        pageSize={shownItems}
        pageIndex={pageNumber}
        totalItems={totalItems}
        onPreviousPage={isPaidUser ? onClickPrev : onOpenUpgradeDialog}
        onNextPage={isPaidUser ? onClickNext : onOpenUpgradeDialog}
        showUpgrade={!isPaidUser && totalItems > itemsPerPage}
        upgradeTitle={`View all ${numberWithCommas(
          totalItems,
        )} people from this search.`}
      />

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};
