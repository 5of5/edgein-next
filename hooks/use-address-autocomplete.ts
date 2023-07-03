import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { RadarAddressResponse } from '@/types/common';

const useAddressAutocomplete = (layers: string[] = []) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [options, setOptions] = useState<RadarAddressResponse[]>([]);

  const onSearchAddress = async (keyword: string) => {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_RADAR_URL
      }/v1/search/autocomplete?query=${encodeURIComponent(
        keyword,
      )}&layers=${layers.join(',')}`,
      {
        method: 'GET',
        headers: {
          Authorization: process.env.NEXT_PUBLIC_RADAR_PUBLIC_KEY || '',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    setOptions(data?.addresses || []);
    setIsLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(query => onSearchAddress(query), 700),
    [],
  );

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    debouncedSearch(event.target.value);
  };

  return {
    isLoading,
    options,
    setOptions,
    onInputChange,
  };
};

export default useAddressAutocomplete;
