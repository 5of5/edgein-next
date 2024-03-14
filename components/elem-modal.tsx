import { FC, Fragment, PropsWithChildren } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconX } from '@/components/icons';

type Props = {
  className?: string;
  panelClass?: string;
  isOpen: boolean;
  onClose: () => void;
  overlay?: boolean;
  showCloseIcon?: boolean;
  placement?:
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'left'
    | 'center'
    | 'right'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight';
  transition?:
    | 'fadeIn'
    | 'slideFromTop'
    | 'slideFromRight'
    | 'slideFromLeft'
    | '';
};

export const ElemModal: FC<PropsWithChildren<Props>> = ({
  className = '',
  panelClass = '',
  isOpen,
  onClose,
  overlay = true,
  showCloseIcon = true,
  placement,
  transition,
  children,
}) => {
  let transitionClasses = null;
  if (transition === 'slideFromTop') {
    transitionClasses = {
      enter: 'transition ease-in-out duration-300 transform',
      enterFrom: 'opacity-0 -translate-y-full',
      enterTo: 'opacity-100 translate-y-0',
      leave: 'transition ease-in-out duration-300 transform',
      leaveFrom: 'opacity-100 translate-y-0',
      leaveTo: 'opacity-0 -translate-y-full',
    };
  } else if (transition === 'slideFromLeft') {
    transitionClasses = {
      enter: 'transition ease-in-out duration-300 transform',
      enterFrom: 'opacity-0 -translate-x-full',
      enterTo: 'opacity-100 translate-x-0',
      leave: 'transition ease-in-out duration-300 transform',
      leaveFrom: 'opacity-100 translate-x-0',
      leaveTo: 'opacity-0 -translate-x-full',
    };
  } else if (transition === 'slideFromRight') {
    transitionClasses = {
      enter: 'transition ease-in-out duration-300 transform',
      enterFrom: 'opacity-0 translate-x-full',
      enterTo: 'opacity-100 translate-x-0',
      leave: 'transition ease-in-out duration-300 transform',
      leaveFrom: 'opacity-100 translate-x-0',
      leaveTo: 'opacity-0 translate-x-full',
    };
  } else {
    transitionClasses = {
      enter: 'ease-out duration-300',
      enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
      enterTo: 'opacity-100 translate-y-0 sm:scale-100',
      leave: 'ease-in duration-200',
      leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
      leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
    };
  }
  let placementClasses = null;
  if (placement === 'top') {
    placementClasses = 'items-center justify-start';
  } else if (placement === 'topLeft') {
    placementClasses = 'items-start justify-start';
  } else if (placement === 'topRight') {
    placementClasses = 'items-end justify-start';
  } else if (placement === 'left') {
    placementClasses = 'items-start justify-center';
  } else if (placement === 'right') {
    placementClasses = 'items-end justify-center';
  } else {
    placementClasses = 'items-center justify-center';
  }

  return (
    <Transition
      appear
      show={isOpen}
      as={Dialog}
      onClose={onClose}
      className={`relative z-40 ${className}`}
    >
      {overlay && (
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        </Transition.Child>
      )}
      <div className={`fixed inset-0 flex flex-col ${placementClasses}`}>
        <Transition.Child as={Fragment} {...transitionClasses}>
          <Dialog.Panel
            className={`overflow-y-auto overscroll-none scrollbar-hide ${panelClass}`}
          >
            {children}
            {showCloseIcon && (
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <IconX className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Transition>
  );
};
