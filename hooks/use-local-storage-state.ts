import { useState, useEffect, useCallback } from 'react';

const useLocalStorageState = (key: string) => {
  let localStorageValue: string | null = '';

  if (typeof window !== 'undefined' && localStorage.getItem(key)) {
    localStorageValue =
      localStorage.getItem(key) !== undefined ? localStorage.getItem(key) : '';
  }

  const [value, setValue] = useState<string | null>('');

  useEffect(() => {
    if (localStorageValue && localStorageValue !== value) {
      setValue(localStorageValue);
    }
  }, [value, localStorageValue]);

  const onChangeLocalStorageValue = useCallback(
    (newValue: string) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, newValue);
      }
    },
    [key],
  );

  const onChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onChangeLocalStorageValue(newValue);
    },
    [setValue, onChangeLocalStorageValue],
  );

  return {
    value,
    onChange,
  };
};

export default useLocalStorageState;
