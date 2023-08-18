import { useState, useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { SearchForSuggestionsResult } from '@aws-sdk/client-location';
import { LocationService } from '@/services/location.service';
import { DEBOUNCE_TIME } from '@/utils/constants';

const locationService = new LocationService();

const useAddressAutocomplete = (filterCategories?: string[]) => {
  const [isLoadingPlaceSuggestions, setIsLoadingPlaceSuggestions] =
    useState(false);

  const [isLoadingPlace, setIsLoadingPlace] = useState(false);

  const [options, setOptions] = useState<SearchForSuggestionsResult[]>([]);

  const onGetPlace = async (placeId: string) => {
    setIsLoadingPlace(true);

    const input = {
      IndexName: locationService.getPlaceIndex(),
      PlaceId: placeId,
      Language: 'en'
    };
    const placeResponse = await locationService.getPlace(input);

    setIsLoadingPlace(false);

    return placeResponse.Place;
  };

  const onSearchAddress = useCallback(
    async (keyword: string) => {
      const input = {
        IndexName: locationService.getPlaceIndex(),
        Text: keyword,
        Language: 'en', 
        FilterCategories: filterCategories,
      };

      const placeSuggestionResponse =
        await locationService.searchPlaceSuggestions(input);

      setOptions(placeSuggestionResponse.Results || []);
      setIsLoadingPlaceSuggestions(false);
    },
    [filterCategories],
  );

  const debouncedSearch = useMemo(
    () => debounce(query => onSearchAddress(query), DEBOUNCE_TIME),
    [onSearchAddress],
  );

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingPlaceSuggestions(true);
    debouncedSearch(event.target.value);
  };

  return {
    isLoadingPlaceSuggestions,
    isLoadingPlace,
    options,
    onInputChange,
    onGetPlace,
  };
};

export default useAddressAutocomplete;
