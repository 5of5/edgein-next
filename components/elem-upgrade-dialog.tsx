import { Fragment, PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconX } from '@/components/icons';
import { ElemButton } from '@/components/elem-button';
import { loadStripe } from '@/utils/stripe';
import { useUser } from '@/context/user-context';
import { ROUTES } from '@/routes';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export const ElemUpgradeDialog: React.FC<PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const { user } = useUser();

  const defaultTitle = user
    ? 'Gain access to unlimited data, lists, and groups with an EdgeIn Contributor trial'
    : 'Gain access to unlimited data, lists, and groups with EdgeIn Contributor';

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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform rounded-lg bg-slate-100 p-6 shadow-xl transition-all">
                <Dialog.Title className="text-xl font-medium flex items-start justify-between">
                  <span className="text-center px-8">
                    {title ? title : defaultTitle}
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="focus-visible:outline-none"
                  >
                    <IconX className="w-5 h-5" />
                  </button>
                </Dialog.Title>

                <div className="mt-4 text-gray-500 text-center">
                  {children ? (
                    children
                  ) : (
                    <p className="text-gray-500">
                      EdgeIn customers close deals faster thanks to real-time
                      updates on relevant companies, investors, people, and
                      deals.
                    </p>
                  )}
                </div>

                <div className="flex justify-center mt-6">
                  {user ? (
                    <ElemButton onClick={() => loadStripe()} btn="purple">
                      Start free trial
                    </ElemButton>
                  ) : (
                    <ElemButton btn="purple" href={ROUTES.SIGN_IN}>
                      Sign in to start
                    </ElemButton>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
