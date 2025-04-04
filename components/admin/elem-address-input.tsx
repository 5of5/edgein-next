import { useState, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Place, SearchForSuggestionsResult } from '@aws-sdk/client-location';
import debounce from 'lodash/debounce';
import iso from 'iso-3166-1';
import { LocationService } from '@/services/location.service';
import { DEBOUNCE_TIME } from '@/utils/constants';
import { getGeometryPlace } from '@/utils/helpers';

const locationService = new LocationService();

type Props = {
  defaultLocation?: any;
  defaultGeoPoint?: any;
  onFound?: (place?: Place) => void;
  filterCategories?: string[];
  width?: string | number;
  marginBottom?: string | number;
};

const ElemAddressInput = ({
  defaultLocation,
  defaultGeoPoint,
  onFound,
  filterCategories,
  width,
  marginBottom,
}: Props) => {
  const { setValue: setFormValue } = useFormContext();
  const [value, setValue] = useState<any>();
  const [options, setOptions] = useState<any>([]);

  const onGetPlace = async (placeId: string) => {
    const input = {
      IndexName: locationService.getPlaceIndex(),
      PlaceId: placeId,
      Language: 'en',
    };

    const placeResponse = await locationService.getPlace(input);

    return placeResponse.Place;
  };

  const onSearchAddress = async (keyword: string) => {
    if (keyword.trim()) {
      const input = {
        IndexName: locationService.getPlaceIndex(),
        Text: keyword,
        Language: 'en',
        FilterCategories: filterCategories,
      };

      const placeSuggestionResponse =
        await locationService.searchPlaceSuggestions(input);

      setOptions(placeSuggestionResponse.Results);
    } else {
      setOptions([]);
    }
  };

  const debouncedSearch = useMemo(
    () => debounce(query => onSearchAddress(query), DEBOUNCE_TIME),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Autocomplete
      id="elem-address-component"
      sx={{
        width: width ?? '49%',
        marginBottom: marginBottom ?? '24px',
      }}
      filterOptions={x => x}
      getOptionLabel={option => option?.Text}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No addresses found."
      onChange={async (event, newValue: SearchForSuggestionsResult) => {
        if (newValue?.PlaceId) {
          const place = await onGetPlace(newValue.PlaceId);
          if (!onFound) {
            setValue(newValue);
            const streetAddress = `${place?.AddressNumber || ''}${
              place?.Street ? ` ${place.Street}` : ''
            }`;
            const country = iso.whereAlpha3(place?.Country || '')?.country;

            setFormValue(
              'location_json',
              place
                ? {
                    address:
                      streetAddress === place?.Municipality
                        ? ''
                        : streetAddress,
                    city: place?.Municipality || '',
                    state:
                      place?.Region === place?.Municipality
                        ? ''
                        : place?.Region,
                    country,
                  }
                : defaultLocation,
              { shouldTouch: true, shouldDirty: true },
            );
            setFormValue(
              'geopoint',
              place ? getGeometryPlace(place) : defaultGeoPoint,
              {
                shouldTouch: true,
                shouldDirty: true,
              },
            );
          } else {
            onFound(place);
          }
        }
      }}
      onInputChange={(event, newInputValue) => {
        if (newInputValue) {
          debouncedSearch(newInputValue);
        }
      }}
      renderInput={params => (
        <TextField
          {...params}
          label="Enter address to fill address, city, state, and country fields"
          fullWidth
        />
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
