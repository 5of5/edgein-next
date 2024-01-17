import { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconX } from '@/components/icons';
import { ElemLogo } from '@/components/elem-logo';
import { ElemButton } from '@/components/elem-button';
import { usePopup } from '@/context/popup-context';

type Props = {
  isOpen: boolean;
  title: string;
  content?: string;
  onClose: () => void;
};

export const ElemRequiredProfileDialog: FC<Props> = ({
  isOpen,
  title,
  content,
  onClose,
}) => {
  const { setShowPopup } = usePopup();

  const onSearchName = () => {
    if (setShowPopup) {
      setShowPopup('search');
    }
  };

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
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="w-full max-w-lg transform rounded-lg bg-white shadow-xl transition-all overflow-hidden">
              <div className="px-4 py-3">
                <div className="flex items-start justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center justify-center h-8 w-8 bg-transparent rounded-full hover:bg-gray-100 active:bg-transparent"
                  >
                    <IconX className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="px-4 py-3 lg:px-14">
                <ElemLogo mode="logo" className="w-28 mx-auto mb-6" />
                <div className="mt-3 text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium tracking-tight"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2 text-sm">{content}</div>
                </div>
              </div>

              <div className="px-4 pt-3 pb-6 max-w-xs mx-auto lg:px-14">
                <ElemButton
                  onClick={() => {
                    onSearchName();
                    onClose();
                  }}
                  btn="primary"
                  className="w-full"
                >
                  Search name
                </ElemButton>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
