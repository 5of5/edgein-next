import { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconX } from '@/components/icons';
import { ElemLogo } from '@/components/elem-logo';
import { ElemButton } from '@/components/elem-button';

type Props = {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onClickSearch: () => void;
};

export const ElemRequiredProfileDialog: FC<Props> = ({
  isOpen,
  title,
  content,
  onClose,
  onClickSearch,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform rounded-lg bg-white p-6 shadow-xl transition-all">
                <div className="flex justify-end items-center">
                  <button
                    type="button"
                    onClick={onClose}
                    className="focus-visible:outline-none"
                  >
                    <IconX className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex items-center h-12 w-12 p-2 mx-auto rounded-full shadow">
                  <ElemLogo mode="icon" className="w-10 aspect-square" />
                </div>

                <Dialog.Title className="mt-4 text-2xl text-center font-bold lg:text-3xl">
                  {title}
                </Dialog.Title>

                <div className="mt-4 text-slate-600">
                  <p className="text-slate-600">{content}</p>
                </div>

                <ElemButton
                  onClick={onClickSearch}
                  btn="primary"
                  className="mx-auto mt-6"
                >
                  Search name
                </ElemButton>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
