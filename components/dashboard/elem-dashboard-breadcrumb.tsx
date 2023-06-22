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
    <div className="flex items-center gap-2">
      {breadcrumbs.slice(0, -1).map(breadcrumbItem => (
        <Fragment key={breadcrumbItem.name}>
          <Link href={breadcrumbItem.to || ''}>
            <a className="font-bold text-xl hover:text-primary-500">
              {breadcrumbItem.component}
            </a>
          </Link>
          <IconChevronRight className="w-5 h-5" />
        </Fragment>
      ))}
      {current?.component}
    </div>
  );
};

export default ElemDashboardBreadcrumb;
