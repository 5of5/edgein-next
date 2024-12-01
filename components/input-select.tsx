import { Listbox, Transition } from '@headlessui/react';
import React, { PropsWithChildren, Fragment } from 'react';
import { IconSelector, IconCheck, IconPolygonDown } from './icons';

type Props = {
  className?: string;
  buttonClasses?: string;
  dropdownClasses?: string;
  value?: any;
  placeholder?: any;
  onChange?: any;
  options: Record<string, any>[];
  disabled?: boolean;
  multiple?: boolean;
  by?: string;
};

export const InputSelect: React.FC<PropsWithChildren<Props>> = ({
  className = '',
  buttonClasses = '',
  dropdownClasses = '',
  value, //{title: "", description: ""}
  placeholder = '',
  options,
  disabled = false,
  multiple = false,
  by,
  onChange,
}) => {
  return (
    <div className={className}>
      <Listbox
        value={value}
        onChange={onChange}
        disabled={disabled}
        multiple={multiple}
        by={by}>
        {({ open, disabled }) => (
          <>
            <div className="relative">
              <Listbox.Button
                className={`relative w-full appearance-none border-none bg-dark-100 rounded-md pl-1.5 pr-10 py-1.5 text-left cursor-pointer ring-1 ring-gray-300 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${buttonClasses} ${
                  disabled ? 'bg-gray-200 cursor-not-allowed' : ''
                }`}>
                {multiple ? (
                  <div
                    className={`${className} min-h-[24px] flex items-center flex-wrap gap-2`}>
                    {value?.length === 0 && (
                      <Listbox.Label className="text-sm text-gray-400">
                        {placeholder}
                      </Listbox.Label>
                    )}

                    {value.map((item: any) => (
                      <span
                        key={item.id}
                        className="px-2 py-1 text-sm bg-neutral-900 rounded-md">
                        {item.icon && (
                          <item.icon
                            title={item.title}
                            className="w-5 h-5 mr-1 shrink-0"
                          />
                        )}
                        {item.title}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className={` ${className} truncate`}>
                    <div className="flex items-center">
                      {value?.icon && (
                        <value.icon
                          title={value.title ? value.title : placeholder}
                          className="w-5 h-5 mr-1 shrink-0"
                        />
                      )}
                      <span>{value?.title ? value.title : placeholder}</span>
                    </div>
                  </div>
                )}

                <div className="absolute inset-y-0 flex items-center pointer-events-none right-2">
                  <IconPolygonDown className="w-5 h-5 text-gray-400" />
                </div>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options
                  className={`absolute z-10 mt-1 w-full bg-dark-100 border border-dark-500/10 divide-y divide-gray-100 shadow-xl max-h-60 rounded-md overflow-auto focus:outline-none ${dropdownClasses}`}>
                  {options.map((option: any, index: number) => (
                    <Listbox.Option
                      key={index}
                      value={option}
                      className={({ active }) =>
                        `${
                          active
                            ? 'text-primary-500 bg-gray-50'
                            : 'text-dark-500'
                        }  select-none relative py-2 pl-3 pr-4 ${
                          option.disabled
                            ? 'cursor-not-allowed opacity-50'
                            : 'cursor-pointer'
                        }`
                      }
                      disabled={option.disabled ? option.disabled : false}>
                      {({ selected }) => (
                        <>
                          <div
                            className={`truncate align-bottom flex`}
                            title={
                              option.title
                                ? option.title
                                : placeholder + option.description
                                ? option.description
                                : ''
                            }>
                            {option.icon && (
                              <option.icon
                                title={
                                  option.title ? option.title : placeholder
                                }
                                className={`h-5 w-5 mr-1 shrink-0 text-gray-500 ${
                                  selected ? 'text-primary-500' : ''
                                }`}
                              />
                            )}
                            <div>
                              <div
                                className={`truncate text-sm ${
                                  selected ? 'font-bold' : 'font-normal'
                                }
																`}>
                                {option.title ? option.title : placeholder}
                              </div>
                              <div className="text-xs text-gray-400">
                                {option.description ? option.description : ''}
                              </div>
                            </div>
                          </div>

                          {selected && (
                            <div className="absolute inset-y-0 right-0 z-50 flex items-center pr-4 text-primary-500">
                              <IconCheck className="w-5 h-5" />
                            </div>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
