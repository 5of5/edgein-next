import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { libraryChoices } from '@/utils/constants';
import { useUser } from '@/context/user-context';
import { IconChevronDownMini, IconCheck, IconMarket } from './icons';
import { ElemButton } from './elem-button';

const ElemLibrarySelector = () => {
  const { selectedLibrary, onChangeLibrary } = useUser();

  if (!selectedLibrary) {
    return null;
  }

  return (
    <Popover className="relative">
      <Popover.Button
        as="div"
        className={``}
        title={`Library: ${selectedLibrary}`}
      >
        <ElemButton
          //onClick={() => setSelectedStatusTag(tab)}
          btn="default"
          roundedFull={false}
          className={`rounded-lg border ${
            selectedLibrary === 'Web3' ? 'border-primary-500' : 'border-pink-25'
          }`}
        >
          <IconMarket
            className={`w-4 h-4 ${
              selectedLibrary === 'Web3' ? 'text-primary-500' : 'text-pink-25'
            } mr-1.5`}
          />
          {selectedLibrary}
          <IconChevronDownMini
            className="w-5 h-5 ml-1"
            title={`Select library`}
          />
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
            <>
              {libraryChoices.map(item => (
                <button
                  key={item.id}
                  className={`flex items-center gap-x-2 cursor-pointer w-full text-left text-sm ${
                    item.id === selectedLibrary ? 'font-medium' : 'font-normal'
                  } px-4 py-2 m-0 transition-all hover:bg-gray-100`}
                  title={item?.id}
                  onClick={() => {
                    onChangeLibrary(item);
                    close();
                  }}
                >
                  <IconCheck
                    className={`w-4 h-4 ${
                      selectedLibrary === 'Web3'
                        ? 'text-primary-500'
                        : 'text-pink-25'
                    } ${
                      item.id === selectedLibrary ? 'opacity-100' : 'opacity-0'
                    }`}
                    title={`${item?.id} Selected`}
                  />
                  {item.name}
                  {item.id === 'AI' && (
                    <span className="px-2.5 py-0.5 rounded-2lg bg-pink-25 bg-opacity-15 text-xs text-pink-25 font-medium">
                      New
                    </span>
                  )}
                </button>
              ))}
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ElemLibrarySelector;
