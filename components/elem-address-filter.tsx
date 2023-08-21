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
            isLoadingPlace ? 'text-dark-400 animate-pulse' : 'text-dark-500'
          } bg-white rounded-md pl-3 pr-10 py-1.5 text-left ring-1 ring-slate-300 hover:ring-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500`}
          displayValue={(value: Place) =>
            isLoadingPlace ? 'Loading...' : value?.Label || ''
          }
          placeholder="Enter an address"
          onChange={onInputChange}
        />
        {(isLoadingPlaceSuggestions || options.length > 0) && (
          <Combobox.Options className=" absolute z-50 top-10 w-full bg-white border border-dark-500/10 divide-y divide-gray-100 shadow-xl max-h-60 rounded-md overflow-auto focus:outline-none">
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
                  value={item}
                >
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
