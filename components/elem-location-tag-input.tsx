import { FC, useState } from 'react';
import { Combobox } from '@headlessui/react';
import useAddressAutocomplete from '@/hooks/use-address-autocomplete';
import { IconX } from './icons';
import { Place, SearchForSuggestionsResult } from '@aws-sdk/client-location';

type Props = {
  label?: string;
  tags: Place[];
  layers?: string[];
  onChange: (data: Place[]) => void;
};

const ElemLocationTagInput: FC<Props> = ({
  label,
  tags,
  layers = [],
  onChange,
}) => {
  const {
    isLoadingPlaceSuggestions,
    isLoadingPlace,
    options,
    onInputChange,
    onGetPlace,
  } = useAddressAutocomplete(layers);

  const handleChange = async (value: SearchForSuggestionsResult) => {
    if (value.PlaceId) {
      const place = await onGetPlace(value.PlaceId);
      if (place) {
        onChange([...tags, place]);
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    onChange(updatedTags);
  };

  return (
    <div className="relative">
      <Combobox onChange={handleChange}>
        {label && (
          <Combobox.Label className="font-bold cursor-text">
            {label}
          </Combobox.Label>
        )}
        <Combobox.Input
          className="relative w-full appearance-none border-none text-dark-500
           bg-white rounded-md mt-2 pl-3 pr-10 py-2 text-left ring-1 ring-slate-300 hover:ring-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Type a location"
          onChange={onInputChange}
        />
        <Combobox.Options className=" absolute z-50 top-20 w-full bg-white border border-dark-500/10 divide-y divide-gray-100 shadow-xl max-h-60 rounded-md overflow-auto focus:outline-none">
          {isLoadingPlaceSuggestions ? (
            <p className="text-sm p-2 animate-pulse">Searching location...</p>
          ) : (
            options.map((item: SearchForSuggestionsResult) => (
              <Combobox.Option
                className={({ active }) =>
                  `${
                    active ? 'text-primary-500 bg-primary-100' : 'text-dark-500'
                  }  select-none relative py-2 pl-3 pr-4 cursor-pointer`
                }
                key={item.PlaceId}
                value={item}
              >
                {item.Text}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
      <div className="flex items-center flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => {
          return (
            <div
              key={index}
              className="bg-primary-50 inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full border border-primary-500"
            >
              <span className="truncate max-w-xs text-primary-500 font-bold">
                {tag?.Label}
              </span>
              <button
                onClick={() => {
                  handleRemoveTag(index);
                }}
                className="text-primary-500 hover:opacity-70 focus:outline-none"
              >
                <IconX className="w-4 h-4" strokeWidth={3} title="close" />
              </button>
            </div>
          );
        })}
        {isLoadingPlace && <p className="text-sm text-dark-400">Loading...</p>}
      </div>
    </div>
  );
};

export default ElemLocationTagInput;
