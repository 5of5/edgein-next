import { FC, useState } from 'react';
import { Combobox } from '@headlessui/react';
import useAddressAutocomplete from '@/hooks/use-address-autocomplete';
import { IconSearch, IconX } from './icons';

type Props = {
  label?: string;
  defaultTags?: string[];
  layers?: string[];
  placeholder?: string;
  onChange: (data: any[]) => void;
};

const ElemLocationTagInput: FC<Props> = ({
  label,
  defaultTags = [],
  layers = [],
  placeholder = 'Type a location',
  onChange,
}) => {
  const { isLoading, options, onInputChange } = useAddressAutocomplete(layers);

  const [tags, setTags] = useState<any[]>(defaultTags);

  const handleChange = (value: any) => {
    setTags([...tags, value]);
    onChange([...tags, value]);
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    onChange(updatedTags);
  };

  return (
    <div className="relative">
      <Combobox value="" onChange={handleChange}>
        {label && (
          <Combobox.Label className="font-bold cursor-text">
            {label}
          </Combobox.Label>
        )}
        <div className="relative max-w-sm w-full mx-auto">
          <Combobox.Input
            className="relative w-full appearance-none border-none text-dark-500 bg-white rounded-full px-10 py-2 text-left ring-1 ring-slate-300 hover:ring-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder={placeholder}
            onChange={onInputChange}
          />
          <IconSearch className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
        </div>
        <Combobox.Options className="absolute z-50 top-12 w-full bg-white border border-dark-500/10 divide-y divide-gray-100 shadow-xl max-h-60 rounded-md overflow-auto focus:outline-none">
          {isLoading ? (
            <p className="text-sm p-2 animate-pulse">Searching location...</p>
          ) : (
            options.map((item: any) => (
              <Combobox.Option
                className={({ active }) =>
                  `${
                    active ? 'text-primary-500 bg-primary-100' : 'text-dark-500'
                  }  select-none relative py-2 pl-3 pr-4 cursor-pointer`
                }
                key={item.formattedAddress}
                value={item}
              >
                {item.formattedAddress}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
      <ul className="flex items-center justify-center flex-wrap gap-3 mt-5 max-w-3xl">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="flex items-center gap-2 p-2 pl-3 rounded-md bg-gray-100"
          >
            <span className="text-sm font-medium">{tag?.formattedAddress}</span>
            <button
              onClick={() => {
                handleRemoveTag(index);
              }}
              className="hover:opacity-70 focus:outline-none"
            >
              <IconX
                className="w-3 h-3 text-gray-600"
                strokeWidth={3}
                title="close"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ElemLocationTagInput;
