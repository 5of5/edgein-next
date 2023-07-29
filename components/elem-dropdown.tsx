import { FC, Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { IconProps, IconChevronDownMini, IconCheck } from './icons';
import { ElemButton } from './elem-button';

type Props = {
  className?: string;
  items: Array<{
    id: number;
    label: string;
    value: string;
    onClick: () => void;
  }>;
};

export const ElemDropdown: FC<Props> = ({ className = '', items }) => {
  const [itemActive, setItemActive] = useState<number>(0);

  return (
    <Popover className="relative">
      <Popover.Button as="div">
        <ElemButton btn="default" roundedFull={false} className="rounded-lg">
          {items[itemActive].label}
          <IconChevronDownMini className="w-5 h-5 ml-1" />
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
              {items.map(item => (
                <button
                  key={item.id}
                  className="flex items-center gap-x-2 cursor-pointer w-full text-left text-sm p-2 m-0 transition-all hover:bg-gray-100"
                  onClick={() => {
                    item.onClick();
                    setItemActive(item.id);
                    close();
                  }}
                >
                  <IconCheck
                    className={`w-4 h-4 text-primary-500 ${
                      item.id === itemActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
