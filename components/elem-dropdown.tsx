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
    id: number;
    label: string;
    value: string;
    Icon?: FC<IconProps>;
    selectedIconClass?: string;
    Pill?: ReactNode;
    onClick: () => void;
  }>;
  itemsShowIcons?: boolean;
  firstItemDivided?: boolean;
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
  firstItemDivided = false,
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
      <Popover.Button as="div" ref={setReferenceElement}>
        {customButton ? (
          customButton
        ) : (
          <ElemButton
            btn="default"
            roundedFull={false}
            className={`rounded-lg ${buttonClass}`}
          >
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
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className={`z-30 bg-white border border-gray-300 rounded-lg shadow-lg min-w-56 ${panelClass}`}
        >
          {({ close }) => (
            <>
              {items.map((item, index) => {
                const isActiveItem = item.id === activeItem ? true : false;
                const activeIconClass = item.selectedIconClass
                  ? item.selectedIconClass
                  : 'text-primary-500';

                return (
                  <button
                    key={item.id}
                    className={`flex items-center gap-x-2 cursor-pointer w-full text-left text-sm text-gray-600 ${
                      isActiveItem ? 'font-medium' : 'font-normal'
                    } px-4 py-2 m-0 ${
                      index === 0 && firstItemDivided
                        ? 'border-b border-gray-100'
                        : ''
                    } transition-all hover:bg-gray-100`}
                    onClick={() => {
                      item.onClick();
                      setActiveItem(item.id);
                      close();
                    }}
                  >
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
                );
              })}
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
