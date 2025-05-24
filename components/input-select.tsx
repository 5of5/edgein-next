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
  label?: string;
  labelClass?: string;
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
  label,
  labelClass = '',
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          className={`block font-medium text-sm text-gray-300 mb-1 ${labelClass}`}>
          {label}
        </label>
      )}

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
                className={`relative w-full px-3 py-2.5 text-sm bg-neutral-900 text-gray-300 rounded-md border border-neutral-700 outline-none flex items-center justify-between focus:border-primary-500 focus:ring focus:ring-primary-500/20 transition-colors ${buttonClasses} ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                {multiple ? (
                  <div
                    className={`min-h-[24px] flex items-center flex-wrap gap-2`}>
                    {value?.length === 0 && (
                      <Listbox.Label className="text-gray-500">
                        {placeholder}
                      </Listbox.Label>
                    )}

                    {value.map((item: any) => (
                      <span
                        key={item.id}
                        className="px-2 py-1 text-sm bg-neutral-800 text-gray-300 rounded-md">
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
                  <div className={`truncate`}>
                    <div className="flex items-center">
                      {value?.icon && (
                        <value.icon
                          title={value.title ? value.title : placeholder}
                          className="w-5 h-5 mr-1 shrink-0"
                        />
                      )}
                      {value?.title ? (
                        <div className="flex flex-col">
                          <span className="text-gray-300">{value.title}</span>
                          {value.description &&
                            className.includes('w-full') &&
                            !dropdownClasses?.includes(
                              'company-type-dropdown',
                            ) && (
                              <span className="text-xs text-gray-500">
                                {value.description}
                              </span>
                            )}
                        </div>
                      ) : (
                        <span className="text-gray-500">{placeholder}</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center pointer-events-none">
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
                  className={`absolute z-10 mt-1 w-full bg-neutral-800 border border-neutral-700 shadow-xl max-h-60 rounded-md overflow-auto focus:outline-none py-1 ${dropdownClasses}`}>
                  {options.map((option: any, index: number) => (
                    <Listbox.Option
                      key={index}
                      value={option}
                      className={({ active }) =>
                        `${
                          active
                            ? 'bg-neutral-700 text-gray-100'
                            : 'text-gray-300'
                        } select-none relative py-3 px-4 cursor-pointer hover:bg-neutral-700 ${
                          dropdownClasses?.includes('company-type-dropdown')
                            ? 'border-b border-neutral-700/50 last:border-0'
                            : ''
                        } ${
                          option.disabled ? 'opacity-50 cursor-not-allowed' : ''
                        }`
                      }
                      disabled={option.disabled ? option.disabled : false}>
                      {({ selected }) => (
                        <>
                          <div
                            className={`flex flex-col ${
                              dropdownClasses?.includes('company-type-dropdown')
                                ? 'space-y-1'
                                : ''
                            }`}
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
                                className={`h-5 w-5 mr-1 shrink-0 ${
                                  selected
                                    ? 'text-primary-500'
                                    : 'text-gray-400'
                                }`}
                              />
                            )}
                            <div className="flex flex-col">
                              <div
                                className={`text-sm ${
                                  selected
                                    ? 'font-medium text-primary-400'
                                    : 'font-normal'
                                } ${
                                  dropdownClasses?.includes(
                                    'company-type-dropdown',
                                  )
                                    ? 'font-semibold text-white'
                                    : ''
                                }`}>
                                {option.title ? option.title : placeholder}
                              </div>
                              {option.description &&
                                !dropdownClasses?.includes(
                                  'company-type-dropdown',
                                ) && (
                                  <div
                                    className={`${
                                      dropdownClasses?.includes(
                                        'company-type-dropdown',
                                      )
                                        ? 'text-sm text-gray-300 mt-1'
                                        : 'text-xs text-gray-400 mt-0.5'
                                    }`}>
                                    {option.description}
                                  </div>
                                )}
                            </div>
                          </div>

                          {selected && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-500">
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
