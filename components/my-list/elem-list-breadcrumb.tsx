import { FC } from 'react';
import { ROUTES } from '@/routes';
import { getListDisplayName } from '@/utils/lists';
import ElemDashboardBreadcrumb from '../dashboard/elem-dashboard-breadcrumb';
import { Lists } from '@/graphql/types';

type Props = {
  list: Lists;
  isListAuthor: boolean;
  isListFollower: boolean;
  onOpenSettingsDialog: () => void;
};

export const ElemListBreadcrumb: FC<Props> = ({
  list,
  isListAuthor,
  isListFollower,
  onOpenSettingsDialog,
}) => {
  return (
    <div className="px-4 py-3">
      <ElemDashboardBreadcrumb
        breadcrumbs={[
          ...(isListAuthor
            ? [
                {
                  name: 'my-lists',
                  to: `${ROUTES.LISTS}/?page=1&tab=my-lists`,
                  component: 'My Lists',
                },
              ]
            : isListFollower
            ? [
                {
                  name: 'following-lists',
                  to: `${ROUTES.LISTS}/?page=1&tab=following`,
                  component: 'Following Lists',
                },
              ]
            : [
                {
                  name: 'lists',
                  to: ROUTES.LISTS,
                  component: 'Lists',
                },
              ]),
          {
            name: 'current',
            component: isListAuthor ? (
              <button
                onClick={onOpenSettingsDialog}
                className="inline-flex items-center justify-start hover:underline">
                <span className="max-w-xs text-left capitalize truncate">
                  {getListDisplayName(list)}
                </span>
              </button>
            ) : (
              <h1 className="text-left">{getListDisplayName(list)}</h1>
            ),
          },
        ]}
      />
    </div>
  );
};
