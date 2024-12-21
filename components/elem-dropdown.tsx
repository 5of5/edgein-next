import { FC, Fragment, ReactNode, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { IconChevronDownMini, IconCheck, IconProps } from './icons';
import { ElemButton } from './elem-button';

type Props = {
  className?: string;
  buttonClass?: string;
  buttonIconClass?: string;
  panelClass?: string;
  placement?:
    | 'auto-end'
    | 'auto-start'
    | 'auto'
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  ButtonIcon?: FC<IconProps>;
  customButton?: ReactNode;
  defaultItem?: number | null;
  items: Array<{
    className?: string;
    id: number;
    label: string;
    value: string;
    Icon?: FC<IconProps>;
    selectedIconClass?: string;
    Pill?: ReactNode;
    onClick: () => void;
    divider?: boolean | undefined;
  }>;
  itemsShowIcons?: boolean;
};

export const ElemDropdown: FC<Props> = ({
  className = '',
  buttonClass = '',
  panelClass = '',
  placement = 'bottom-start',
  ButtonIcon,
  buttonIconClass = 'text-gray-400',
  defaultItem = 0,
  customButton,
  items,
  itemsShowIcons = true,
}) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const [activeItem, setActiveItem] = useState<number | null>(defaultItem);

  return (
    <Popover className={`relative shrink-0 ${className}`}>
      <Popover.Button
        as="div"
        ref={setReferenceElement}
        className={customButton ? buttonClass : ''}>
        {customButton ? (
          customButton
        ) : (
          <ElemButton
            btn="default"
            roundedFull={false}
            className={`rounded-lg ${buttonClass}`}>
            {ButtonIcon && (
              <ButtonIcon
                className={`w-4 h-4 shrink-0 mr-1.5 ${buttonIconClass}`}
              />
            )}
            {activeItem != null && items[activeItem].label}
            <IconChevronDownMini className="w-5 h-5 shrink-0 ml-auto lg:ml-1.5" />
          </ElemButton>
        )}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className={`z-30 bg-black border border-gray-300 rounded-lg shadow-lg min-w-56 overflow-hidden ${panelClass}`}>
          {({ close }) => (
            <>
              {items.map((item, index) => {
                const isActiveItem = item.id === activeItem ? true : false;
                const activeIconClass = item.selectedIconClass
                  ? item.selectedIconClass
                  : 'text-primary-500';
                const dividerClass = '';
                // item.divider
                //   ? 'border-b  border-neutral-700'
                //   : '';

                return (
                  <Fragment key={item.id}>
                    <button
                      className={`flex items-center gap-x-2 cursor-pointer w-full text-left text-sm text-gray-600 ${
                        isActiveItem ? 'font-medium' : 'font-normal'
                      } px-4 py-2 m-0 transition-all hover:bg-neutral-900 ${dividerClass} ${
                        item.className
                      }`}
                      onClick={() => {
                        item.onClick();
                        setActiveItem(item.id);
                        close();
                      }}>
                      {itemsShowIcons && item.Icon ? (
                        <item.Icon
                          className={`w-4 h-4 shrink-0  ${
                            isActiveItem ? activeIconClass : 'text-gray-400'
                          }`}
                        />
                      ) : itemsShowIcons ? (
                        <IconCheck
                          className={`w-4 h-4 shrink-0 ${
                            isActiveItem
                              ? `opacity-100 ${activeIconClass}`
                              : 'opacity-0'
                          }`}
                        />
                      ) : null}
                      {item.label}
                      {item.Pill && item.Pill}
                    </button>
                    {item.divider && (
                      <div className="w-full h-px my-1 bg-gray-200"></div>
                    )}
                  </Fragment>
                );
              })}
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
