import { FC, Fragment, ReactElement, useState } from 'react';
import { usePopper } from 'react-popper';
import { Popover, Transition } from '@headlessui/react';
import { ElemButton } from './elem-button';
import { ROUTES } from '@/routes';

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
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              as="div"
              ref={setReferenceElement}
              className="w-full ring-0 outline-none">
              {buttonComponent(open)}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition-opacity"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Popover.Panel
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="w-72 z-30">
                <div className="p-4 bg-black rounded-lg shadow-lg border border-gray-200">
                  <p className="text-gray-500 text-sm">{text}</p>
                  <ElemButton
                    btn="primary"
                    href={ROUTES.SIGN_IN}
                    className="mt-3">
                    Sign in
                  </ElemButton>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
