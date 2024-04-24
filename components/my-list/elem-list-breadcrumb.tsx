import { FC } from 'react';
import { ROUTES } from '@/routes';
import { getListDisplayName } from '@/utils/lists';
import ElemDashboardBreadcrumb from '../dashboard/elem-dashboard-breadcrumb';
import { Lists } from '@/graphql/types';

type Props = {
  list: Lists;
  isListAuthor: boolean;
  onOpenSettingsDialog: () => void;
};

export const ElemListBreadcrumb: FC<Props> = ({
  list,
  isListAuthor,
  onOpenSettingsDialog,
}) => {
  return (
    <div className="px-4 py-3">
      <ElemDashboardBreadcrumb
        breadcrumbs={[
          {
            name: 'my-lists',
            to: ROUTES.LISTS,
            component: 'Lists',
          },
          {
            name: 'current',
            component: isListAuthor ? (
              <button
                onClick={onOpenSettingsDialog}
                className="inline-flex items-center justify-start hover:underline"
              >
                <span className="text-left capitalize">
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
