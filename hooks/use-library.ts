import { useRouter } from 'next/router';
import { Library } from '@/types/common';
import { LIBRARY_COOKIE } from '@/utils/constants';
import useCookieState from './use-cookie-state';

const useLibrary = () => {
  const router = useRouter();

  const [selectedLibrary, setSelectedLibrary] = useCookieState<Library>(
    LIBRARY_COOKIE,
    'Web3',
  );

  const onChangeLibrary = (value: Library) => {
    setSelectedLibrary(value);
    router.replace(router.asPath.replace(/ai|web3/i, value.toLowerCase()));
  };

  return {
    selectedLibrary,
    onChangeLibrary,
  };
};

export default useLibrary;
