import { FC } from 'react';
import { Combobox } from '@headlessui/react';
import { Place, SearchForSuggestionsResult } from '@aws-sdk/client-location';
import useAddressAutocomplete from '@/hooks/use-address-autocomplete';
import { IconSearch, IconX } from './icons';
import ElemLocationTag from './elem-location-tag';

type Props = {
  label?: string;
  tags: Place[];
  layers?: string[];
  placeholder?: string;
  onChange: (data: Place[]) => void;
};

const ElemLocationTagInput: FC<Props> = ({
  label,
  tags,
  layers = [],
  placeholder = 'Type a location',
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
        <div className="relative max-w-sm w-full mx-auto">
          <Combobox.Input
            className="relative w-full appearance-none border-none text-sm text-dark-500 placeholder:text-slate-400 bg-dark-100 rounded-full px-10 py-2 text-left ring-1 ring-slate-300 hover:ring-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder={placeholder}
            onChange={onInputChange}
          />
          <IconSearch className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
        </div>
        {(isLoadingPlaceSuggestions || options.length > 0) && (
          <Combobox.Options className="absolute z-50 top-12 w-full bg-dark-100 border border-dark-500/10 divide-y divide-gray-100 shadow-xl max-h-60 rounded-md overflow-auto focus:outline-none">
            {isLoadingPlaceSuggestions ? (
              <p className="text-sm p-2 animate-pulse">Searching location...</p>
            ) : (
              options.map((item: SearchForSuggestionsResult) => (
                <Combobox.Option
                  className={({ active }) =>
                    `${
                      active
                        ? 'text-primary-500 bg-primary-100'
                        : 'text-dark-500'
                    }  select-none relative py-2 pl-3 pr-4 cursor-pointer`
                  }
                  key={item.PlaceId}
                  value={item}>
                  {item.Text}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        )}
      </Combobox>
      <ElemLocationTag
        tags={tags}
        isLoadingPlace={isLoadingPlace}
        handleRemoveTag={handleRemoveTag}
      />
    </div>
  );
};

export default ElemLocationTagInput;
