import { Library } from '@/types/common';
import { LOCAL_STORAGE_LIBRARY_KEY } from '@/utils/constants';

const useLibrary = () => {
  let selectedLibrary: Library = 'Web3';
  if (
    typeof window !== 'undefined' &&
    localStorage.getItem(LOCAL_STORAGE_LIBRARY_KEY)
  ) {
    selectedLibrary =
      localStorage.getItem(LOCAL_STORAGE_LIBRARY_KEY) !== undefined
        ? (localStorage.getItem(LOCAL_STORAGE_LIBRARY_KEY) as Library)
        : 'Web3';
  }

  const onChangeLibrary = (value: Library) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_LIBRARY_KEY, value);
    }
  };

  return {
    selectedLibrary,
    onChangeLibrary,
  };
};

export default useLibrary;
