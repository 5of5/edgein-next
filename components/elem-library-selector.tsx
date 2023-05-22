import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";
import { IconChevronDown } from "./icons";
import useLibrary from "@/hooks/use-library";
import { libraryChoices } from "@/utils/constants";

type Library = {
  id: string;
  name: string;
};

const ElemLibrarySelector = () => {
  const router = useRouter();

  const { selectedLibrary, onChangeLibrary } = useLibrary();
  const [library, setLibrary] = useState<Library | undefined>();

  useEffect(() => {
    if (selectedLibrary && selectedLibrary !== library?.id) {
      setLibrary(libraryChoices.find((item) => item.id === selectedLibrary));
    }
  }, [selectedLibrary, library]);

  const handleSelectLibrary = (value: Library) => {
    setLibrary(value);
    onChangeLibrary(value?.id as "Web3" | "AI");
    router.reload();
  };

  if (!!library) {
    return (
      <Popover className="relative">
        <>
          <Popover.Button
            className={`
              relative inline-flex items-center px-3 py-2 text-sm text-dark-500 font-bold bg-slate-200 group rounded-lg
            hover:text-primary-500 hover:bg-slate-300 focus:outline-none transition ease-in-out duration-150
            `}
          >
            <span>{library?.name}</span>
            <IconChevronDown className="w-5 h-5 ml-1" />
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
            <Popover.Panel className="absolute left-1/2 -translate-x-1/2 transform px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative w-28 bg-white py-2">
                  {libraryChoices.map((item) => (
                    <div
                      key={item.id}
                      className="px-3 py-1.5 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleSelectLibrary(item)}
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    );
  }

  return null;
};

export default ElemLibrarySelector;
