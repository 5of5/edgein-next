import React, { FC, Fragment } from 'react';
import { ElemButton } from '@/components/elem-button';
import { IconX, IconListPlus } from '@/components/icons';
import { Dialog, Transition } from '@headlessui/react';
import { MAXIMUM_ITEMS_ON_LIST } from '@/utils/constants';

type Props = {
  isOpen: boolean;
  listName: string;
  onClose: () => void;
  onCreate: () => void;
};

export const ElemFullListDialog: FC<Props> = ({
  isOpen,
  listName,
  onClose,
  onCreate,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-[60]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed z-10 inset-0 bg-black/20 transition-opacity backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-[50] my-0 min-h-0 flex flex-col items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative max-w-sm w-full mx-auto rounded-lg shadow-2xl my-7 bg-white overflow-x-hidden overflow-y-auto overscroll-y-none scrollbar-hide">
              <div className="absolute top-1 right-1">
                <button
                  onClick={onClose}
                  type="button"
                  className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-black/10 focus:bg-black/20"
                >
                  <span className="sr-only">Close</span>
                  <IconX className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex items-center justify-between px-3 py-1.5 from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r">
                <Dialog.Title className="text-lg font-bold text-white" as="h1">
                  {`${listName} is full`}
                </Dialog.Title>
              </div>

              <div className="p-4">
                <p>
                  {`Soon, you'll be able to add more than ${MAXIMUM_ITEMS_ON_LIST} companies and
                  investors to your list. For now, try creating a new list and
                  save them there.`}
                </p>
                <div className="flex justify-end mt-4">
                  <ElemButton onClick={onCreate} roundedFull btn="primary">
                    <IconListPlus className="w-6 h-6 mr-1" />
                    Create a New List
                  </ElemButton>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
