import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { libraryChoices } from '@/utils/constants';
import { useUser } from '@/context/user-context';
import { IconChevronDown, IconCheck } from './icons';

const ElemLibrarySelector = () => {
  const { selectedLibrary, onChangeLibrary } = useUser();

  if (!selectedLibrary) {
    return null;
  }

  return (
    <Popover className="relative">
      <Popover.Button
        className={`
              relative inline-flex items-center px-3 py-2 text-sm  font-bold  group rounded-lg
             hover:bg-slate-200 focus:outline-none transition ease-in-out duration-150
            ${
              selectedLibrary === 'Web3'
                ? 'ring-inset ring-2 ring-primary-500 text-primary-500 hover:text-primary-500'
                : 'ring-inset ring-2 ring-pink-500 text-pink-500 hover:text-pink-500'
            }
            `}
        title={`Library: ${selectedLibrary}`}
      >
        <span>{selectedLibrary}</span>
        <IconChevronDown className="w-5 h-5 ml-1" title={`Select library`} />
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
        <Popover.Panel className="absolute z-10 left-0 w-28 block bg-white rounded-lg shadow-md p-1">
          {({ close }) => (
            <div>
              {libraryChoices.map(item => (
                <button
                  key={item.id}
                  className={`flex items-center justify-between gap-x-1 cursor-pointer w-full text-left text-sm font-bold p-2 m-0 transition-all hover:bg-slate-100 ${
                    item?.id === 'Web3'
                      ? 'text-primary-500'
                      : item?.id === 'AI'
                      ? 'text-pink-500'
                      : ''
                  }`}
                  title={item?.id}
                  onClick={() => {
                    onChangeLibrary(item);
                    close();
                  }}
                >
                  {item.name}
                  {item.id === selectedLibrary && (
                    <IconCheck
                      className="w-4 h-4"
                      title={`${item?.id} Selected`}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ElemLibrarySelector;
