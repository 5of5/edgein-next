import React, { useMemo, FC, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import moment from 'moment-timezone';
import { numberWithCommas } from '@/utils';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import { ElemTags } from '@/components/elem-tags';
import { Events } from '@/graphql/types';
import { ROUTES } from '@/routes';
import { TableEmptyCell } from '../my-list/table-empty-cell';
import { ElemTooltip } from '../elem-tooltip';
import { TableView } from '../companies/table-view';

type Props = {
  className?: string;
  events?: any[];
  pageNumber: number;
  itemsPerPage: number;
  shownItems?: number;
  totalItems: number;
  onClickPrev: () => void;
  onClickNext: () => void;
};

export const EventsTable: FC<Props> = ({
  className = '',
  events = [],
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
            original: Events;
          };
        }) => (
          <div className="flex items-center space-x-3">
            {/* <a
              href={`${ROUTES.EVENTS}/` + props.row.original?.slug}
              className="transition-all shrink-0">
              <ElemPhoto
                photo={props.row.original?.banner}
                wrapClass="flex items-center justify-center shrink-0 w-28 h-10 bg-black border border-gray-300 rounded-md overflow-hidden"
                imgClass="object-cover min-h-full min-w-full"
                imgAlt={props.value}
                placeholderClass="text-gray-300"
              />
            </a> */}

            <div>
              <a
                href={`${ROUTES.EVENTS}/` + props.row.original?.slug}
                className="font-medium break-words line-clamp-2 hover:underline">
                {props.value}
              </a>
              {props.row.original?.link && (
                <a
                  href={props.row.original.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-500 break-words hover:underline">
                  {props.row.original.link}
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
        Header: 'Date',
        accessor: 'start_date' as const,
        Cell: (props: {
          value: Date;
          row: {
            original: Events;
          };
        }) => {
          return (
            <div>
              {props.value ? (
                <>
                  {moment(props.value).format('MMM D, YYYY')}

                  {props.row.original?.end_date && (
                    <>
                      &nbsp;&ndash;&nbsp;
                      {moment(props.row.original?.end_date).format(
                        'MMM D, YYYY',
                      )}
                    </>
                  )}
                </>
              ) : (
                <TableEmptyCell />
              )}
            </div>
          );
        },
        width: 300,
      },
      {
        Header: 'Price',
        accessor: 'price' as const,
        Cell: (props: { value: number }) => (
          <div>
            {props.value > 0 ? (
              <>Starts at ${numberWithCommas(props.value)}</>
            ) : props.value?.toString() === '0' ? (
              <>Free</>
            ) : (
              <TableEmptyCell />
            )}
          </div>
        ),
        width: 200,
        minWidth: 200,
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
        accessor: 'types' as const,
        Cell: (props: { value: Array<string> }) => (
          <>
            {props.value ? (
              <ElemTags resourceType={'events'} tags={props.value} limit={6} />
            ) : (
              <TableEmptyCell />
            )}
          </>
        ),
        disableSortBy: true,
        width: 400,
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
    ],
    [],
  );

  return (
    <div className={`${className}`}>
      <TableView
        resourceType="events"
        columns={columns}
        data={events}
        pageSize={shownItems}
        pageIndex={pageNumber}
        totalItems={totalItems}
        onPreviousPage={isPaidUser ? onClickPrev : onOpenUpgradeDialog}
        onNextPage={isPaidUser ? onClickNext : onOpenUpgradeDialog}
        showUpgrade={!isPaidUser && totalItems > itemsPerPage}
        upgradeTitle={`View all ${numberWithCommas(
          totalItems,
        )} events from this search.`}
      />

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};
