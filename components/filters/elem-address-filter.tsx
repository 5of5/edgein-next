import { FC } from 'react';
import { Combobox } from '@headlessui/react';
import { SearchForSuggestionsResult, Place } from '@aws-sdk/client-location';
import useAddressAutocomplete from '@/hooks/use-address-autocomplete';

type Props = {
  value: any;
  onChange: (data: Place) => void;
};

const ElemAddressFilter: FC<Props> = ({ value, onChange }) => {
  const {
    isLoadingPlaceSuggestions,
    isLoadingPlace,
    options,
    onInputChange,
    onGetPlace,
  } = useAddressAutocomplete();

  const handleChange = async (location: SearchForSuggestionsResult) => {
    if (location.PlaceId) {
      const place = await onGetPlace(location.PlaceId);
      if (place) {
        onChange(place);
      }
    }
  };

  return (
    <div className="relative">
      <Combobox value={value} onChange={handleChange}>
        <Combobox.Input
          className={`relative w-full appearance-none border-none ${
            isLoadingPlace ? ' animate-pulse' : ''
          } bg-black rounded-full px-3 pr-10 py-2.5 text-left text-sm ring-1 placeholder:text-gray-500 ring-gray-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:outline-none`}
          displayValue={(value: Place) =>
            isLoadingPlace ? 'Loading...' : value?.Label || ''
          }
          placeholder="Enter an address"
          onChange={onInputChange}
        />
        {(isLoadingPlaceSuggestions || options.length > 0) && (
          <Combobox.Options className="absolute z-50 w-full overflow-auto bg-black border divide-y divide-gray-100 rounded-md shadow-xl top-10 border-dark-500/10 max-h-60 focus:outline-none">
            {isLoadingPlaceSuggestions ? (
              <p className="p-2 text-sm animate-pulse">Searching location...</p>
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
    </div>
  );
};

export default ElemAddressFilter;
