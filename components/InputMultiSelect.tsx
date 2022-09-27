import React, { useState, PropsWithChildren, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IconSelector, IconCheck } from "../components/Icons";

type Props = {
	className?: string;
	value?: any;
	placeholder?: any;
	onChange?: any;
    options: Record<string, any>[];
};

export const InputMultiSelect: React.FC<PropsWithChildren<Props>> = ({
	className = "",
	value, 
	placeholder = "",
	options,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
        <Listbox
            value={value} onChange={onChange}
        >
          {() => (
            <>
              <div className="relative">
                <Listbox.Button  onClick={() => setIsOpen(!isOpen)} className="relative w-full text-dark-500 bg-white border border-dark-500/10 rounded-md pl-3 pr-10 py-1.5 text-left cursor-default focus:outline-none focus:border-primary-500 hover:ring hover:ring-primary-100 focus:ring focus:ring-primary-100">
                    <div className={` ${className} truncate`}>
                        {(value) ? value.join(', ') : placeholder}
                        <span className="text-gray-400 text-sm ml-2">
                            {/* {value?.description && value.description} */}
                        </span>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <IconSelector className="h-5 w-5 text-gray-400" />
                    </div>
                </Listbox.Button>

                <Transition
                  show={isOpen}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                 <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-dark-500/10 divide-y divide-gray-100 shadow-xl max-h-60 rounded-md overflow-auto focus:outline-none">
                    {options.map((option: any, index: number) => {
                        const selected = value.filter((item: any) => item === option.value).length > 0;
                        return <Listbox.Option
                            key={index}
                            value={option}
                            className={({ active }) =>
                                `${
                                    active
                                        ? "text-primary-500 bg-primary-100"
                                        : "text-dark-500"
                                } cursor-default select-none relative py-2 pl-3 pr-9`
                            }
                        >
                            {() => (
                                <>
                                    <div
                                        className={`${
                                            selected ? "font-bold" : "font-normal"
                                        } truncate align-bottom`}
                                        title={`${
                                            option.title ? option.title : placeholder
                                        }${option.description ? option.description : ""}`}
                                    >
                                        {option.title ? option.title : placeholder}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                        {option.description ? option.description : ""}
                                    </div>

                                    {selected && (
                                        <div className="absolute z-50 inset-y-0 right-0 flex items-center pr-4 text-primary-500">
                                            <IconCheck className="h-5 w-5" />
                                        </div>
                                    )}
                                </>
                            )}
                        </Listbox.Option>
                    })}
                </Listbox.Options>
							
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
  );
}
