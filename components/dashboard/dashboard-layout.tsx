import { FC, ReactNode } from 'react';
import { DashboardSidebar } from './dashboard-sidebar';
import { DashboardFooter } from './dashboard-footer';
import { ElemBackToTop } from '../elem-back-to-top';

type Props = {
  children: ReactNode;
};

export const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="relative">
        <div style={{ marginTop: '-55px' }} className="fixed inset-0 left-0 right-auto z-10 hidden w-64 border-r  border-neutral-700 top-14 lg:block">
          <DashboardSidebar />
        </div>

        <div className="min-h-[calc(100vh_-_3rem)] mb-20 lg:mb-0 lg:pl-64">
          {children}
          <DashboardFooter />
        </div>
      </div>
      <ElemBackToTop />
    </>
  );
};
