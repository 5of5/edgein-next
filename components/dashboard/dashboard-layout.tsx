import { Fragment, useState, FC, PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ElemButton } from '@/components/elem-button';
import { IconX, IconWindowSidebar } from '@/components/icons';
import { DashboardSidebar } from './dashboard-sidebar';

type Props = {};

export const DashboardLayout: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="relative mt-2">
        <ElemButton
          btn="slate"
          roundedFull={false}
          onClick={() => setSidebarOpen(true)}
          className="-ml-4 mt-4 mb-2 rounded-tr-lg rounded-br-lg pl-8 sm:pl-10 md:pl-12 hover:border-primary-500 lg:hidden"
        >
          <span className="sr-only">Dashboard Menu</span>
          <IconWindowSidebar className="w-6 h-6 mr-2" />
          More
        </ElemButton>

        <div className="hidden fixed z-10 inset-0 top-0 left-0 right-auto w-64 mt-12 border-r border-gray-200 bg-gray-50 overflow-y-auto scrollbar-hide lg:block">
          <DashboardSidebar />
        </div>

        <div className="min-h-[calc(100vh_-_3rem)] mb-20 lg:pl-64">
          {children}
        </div>
      </div>

      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
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
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-white flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute z-10 top-2 right-2">
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100"
                    >
                      <span className="sr-only">Close Sidebar</span>
                      <IconX
                        className="h-6 w-6"
                        aria-hidden="true"
                        title="close"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex-1 h-0 overflow-y-auto scrollbar-hide">
                  <DashboardSidebar />
                </div>
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
