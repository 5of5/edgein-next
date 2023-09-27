import { Fragment, FC, PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DashboardSidebar } from './dashboard-sidebar';
import { DashboardBanner } from './dashboard-banner';
import { useSidebar } from '@/context/sidebar-context';

type Props = {};

export const DashboardLayout: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { showSidebar, setShowSidebar } = useSidebar();

  return (
    <>
      <div className="relative mt-2">
        <div className="hidden fixed z-10 inset-0 top-0 left-0 right-auto w-64 mt-12 border-r border-gray-200 overflow-y-auto scrollbar-hide lg:block">
          <DashboardSidebar />
          <DashboardBanner className="fixed bottom-0 w-64 p-4" />
        </div>

        <div className="min-h-[calc(100vh_-_3rem)] mb-20 lg:pl-64">
          {children}
        </div>
      </div>

      <Transition.Root show={showSidebar} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setShowSidebar}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative max-w-xs w-full bg-white flex flex-col flex-1 overflow-y-auto scrollbar-hide">
                <DashboardSidebar />
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
