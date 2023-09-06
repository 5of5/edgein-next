import { FC, Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { IconChevronDownMini, IconCheck, IconProps } from './icons';
import { ElemButton } from './elem-button';

type Props = {
  className?: string;
  IconComponent?: FC<IconProps>;
  defaultItem?: number;
  items: Array<{
    id: number;
    label: string;
    value: string;
    StartIcon?: FC<IconProps>;
    onClick: () => void;
  }>;
};

export const ElemDropdown: FC<Props> = ({
  className = '',
  IconComponent,
  defaultItem = 0,
  items,
}) => {
  const [activeItem, setActiveItem] = useState<number>(defaultItem);

  return (
    <Popover className={`relative shrink-0 ${className}`}>
      <Popover.Button as="div">
        <ElemButton btn="default" roundedFull={false} className="rounded-lg">
          {IconComponent && (
            <IconComponent className="w-4 h-4 mr-1.5 text-gray-400" />
          )}
          {items[activeItem].label}
          <IconChevronDownMini className="w-5 h-5 ml-1.5" />
        </ElemButton>
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
        <Popover.Panel className="absolute z-10 mt-2 right-0 w-56 block bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
          {({ close }) => (
            <div>
              {items.map(item => {
                const isActiveItem = item.id === activeItem;
                return (
                  <button
                    key={item.id}
                    className={`flex items-center gap-x-2 cursor-pointer w-full text-left text-sm ${
                      isActiveItem ? 'font-medium' : 'font-normal'
                    } px-4 py-2 m-0 transition-all hover:bg-gray-100`}
                    onClick={() => {
                      item.onClick();
                      setActiveItem(item.id);
                      close();
                    }}
                  >
                    {item.StartIcon ? (
                      <item.StartIcon
                        className={`w-4 h-4  ${
                          isActiveItem ? 'text-primary-500' : 'text-gray-400'
                        }`}
                      />
                    ) : (
                      <IconCheck
                        className={`w-4 h-4 text-primary-500 ${
                          isActiveItem ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    )}

                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
