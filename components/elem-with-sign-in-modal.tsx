import { FC, Fragment, ReactElement, useState } from 'react';
import Link from 'next/link';
import { usePopper } from 'react-popper';
import { Popover, Transition } from '@headlessui/react';
import { ElemButton } from './elem-button';

type Props = {
  wrapperClass?: string;
  text: string;
  buttonComponent: (open: boolean) => ReactElement;
};

export const ElemWithSignInModal: FC<Props> = ({
  wrapperClass = '',
  text,
  buttonComponent,
}) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  return (
    <div className={wrapperClass}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              ref={setReferenceElement}
              className="w-full ring-0 outline-none"
            >
              {buttonComponent(open)}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="w-48 z-30"
              >
                <div className="p-4 bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
                  <p className="text-gray-500 text-sm font-normal mb-3">
                    {text}
                  </p>
                  <Link href="/sign-in" passHref>
                    <ElemButton btn="primary">Sign in</ElemButton>
                  </Link>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
