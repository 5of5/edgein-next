import { FC, Fragment } from 'react';
import Link from 'next/link';
import last from 'lodash/last';
import { Breadcrumb } from '@/types/common';
import { IconChevronRight } from '../icons';

type Props = {
  breadcrumbs: Breadcrumb[];
};

const ElemDashboardBreadcrumb: FC<Props> = ({ breadcrumbs }) => {
  const current = last(breadcrumbs);
  return (
    <div className="flex items-center space-x-2 text-sm">
      {breadcrumbs.slice(0, -1).map(breadcrumbItem => (
        <Fragment key={breadcrumbItem.name}>
          <Link href={breadcrumbItem.to || ''}>
            <a
              className={`block capitalize shrink-0 hover:text-primary-500 hover:underline ${current?.name}`}
            >
              {breadcrumbItem.component}
            </a>
          </Link>
          <IconChevronRight className="w-4 h-4 shrink-0 text-slate-400" />
        </Fragment>
      ))}
      {current?.component}
    </div>
  );
};

export default ElemDashboardBreadcrumb;
