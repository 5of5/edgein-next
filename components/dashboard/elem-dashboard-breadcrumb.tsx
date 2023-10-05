import { FC, Fragment } from 'react';
import last from 'lodash/last';
import { Breadcrumb } from '@/types/common';
import { IconChevronRight } from '../icons';
import { ElemLink } from '../elem-link';

type Props = {
  breadcrumbs: Breadcrumb[];
};

const ElemDashboardBreadcrumb: FC<Props> = ({ breadcrumbs }) => {
  const current = last(breadcrumbs);
  return (
    <div className="flex items-center space-x-1 text-sm">
      {breadcrumbs.slice(0, -1).map(breadcrumbItem => (
        <Fragment key={breadcrumbItem.name}>
          <ElemLink
            href={breadcrumbItem.to || ''}
            className={`block capitalize shrink-0 hover:underline ${current?.name}`}
          >
            {breadcrumbItem.component}
          </ElemLink>
          <IconChevronRight className="w-4 h-4 shrink-0 text-gray-500" />
        </Fragment>
      ))}
      {current?.component}
    </div>
  );
};

export default ElemDashboardBreadcrumb;
