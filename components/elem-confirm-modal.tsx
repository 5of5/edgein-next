import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, ReactElement } from 'react';
import { ElemButton } from '@/components/elem-button';
import { IconX } from '@/components/icons';

type Props = {
  isOpen: boolean;
  title: string | ReactElement;
  description?: string;
  content: string | ReactElement;
  loading?: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export const ElemConfirmModal: FC<Props> = ({
  isOpen = false,
  title,
  description,
  content,
  loading = false,
  onClose,
  onDelete,
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
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 p-4 flex flex-col items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <Dialog.Panel className="w-full max-w-md transform rounded-lg bg-white shadow-xl transition-all overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-xl font-medium">
                    {title}
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center justify-center h-8 w-8 bg-transparent rounded-full hover:bg-gray-100 active:bg-transparent">
                    <IconX className="w-6 h-6" />
                  </button>
                </div>
                {description && (
                  <p className="mt-2 text-gray-500">{description}</p>
                )}
              </div>
              <div className="px-4 py-3">{content}</div>
              <div className="flex justify-end gap-x-2 px-4 py-3">
                <ElemButton onClick={onClose} roundedFull btn="default">
                  Cancel
                </ElemButton>
                <ElemButton
                  onClick={onDelete}
                  roundedFull
                  btn="danger"
                  loading={loading}>
                  Delete
                </ElemButton>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
