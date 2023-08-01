import { useState, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SearchForSuggestionsResult } from '@aws-sdk/client-location';
import debounce from 'lodash/debounce';
import { LocationService } from '@/services/location.service';
import { DEBOUNCE_TIME } from '@/utils/constants';
import { countries } from '@/utils/countries';

const locationService = new LocationService();

type Props = {
  defaultLocation?: any;
  defaultGeoPoint?: any;
};

const ElemAddressInput = ({ defaultLocation, defaultGeoPoint }: Props) => {
  const { setValue: setFormValue } = useFormContext();
  const [value, setValue] = useState<any>(null);
  const [options, setOptions] = useState<any>([]);

  const onGetPlace = async (placeId: string) => {
    const input = {
      IndexName: process.env.NEXT_PUBLIC_AWS_LOCATION_SERVICE_PLACE_INDEX,
      PlaceId: placeId,
    };

    const placeResponse = await locationService.getPlace(input);

    return placeResponse.Place;
  };

  const onSearchAddress = async (keyword: string) => {
    const input = {
      IndexName: process.env.NEXT_PUBLIC_AWS_LOCATION_SERVICE_PLACE_INDEX,
      Text: keyword,
    };

    const placeSuggestionResponse =
      await locationService.searchPlaceSuggestions(input);

    setOptions(placeSuggestionResponse.Results);
  };

  const debouncedSearch = useMemo(
    () => debounce(query => onSearchAddress(query), DEBOUNCE_TIME),
    [],
  );

  return (
    <Autocomplete
      id="elem-address-component"
      sx={{ width: '49%', marginBottom: 3 }}
      filterOptions={x => x}
      getOptionLabel={option => option.Text}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No addresses found."
      onChange={async (event, newValue: SearchForSuggestionsResult) => {
        if (newValue?.PlaceId) {
          const place = await onGetPlace(newValue.PlaceId);
          setValue(newValue);
          const streetAddress = `${place?.AddressNumber || ''}${
            place?.Street ? ` ${place.Street}` : ''
          }`;
          const country = countries.find(
            countryItem => countryItem.code === place?.Country,
          )?.name;
          setFormValue(
            'location_json',
            place
              ? {
                  address:
                    streetAddress === place?.Municipality ? '' : streetAddress,
                  city: place?.Municipality || '',
                  state:
                    place?.Region === place?.Municipality ? '' : place?.Region,
                  country,
                }
              : defaultLocation,
            { shouldTouch: true, shouldDirty: true },
          );
          setFormValue(
            'geopoint',
            place
              ? { type: 'Point', coordinates: place.Geometry?.Point }
              : defaultGeoPoint,
            {
              shouldTouch: true,
              shouldDirty: true,
            },
          );
        }
      }}
      onInputChange={(event, newInputValue) => {
        if (newInputValue) {
          debouncedSearch(newInputValue);
        }
      }}
      renderInput={params => (
        <TextField {...params} label="Enter an address" fullWidth />
      )}
      renderOption={(props, option: SearchForSuggestionsResult) => {
        return (
          <li {...props} key={option.PlaceId}>
            <p>{option.Text}</p>
          </li>
        );
      }}
    />
  );
};

export default ElemAddressInput;
