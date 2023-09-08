import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { Library } from '@/types/common';

const useLibrary = () => {
  const router = useRouter();

  const [selectedLibrary, setSelectedLibrary] = useState<Library>('Web3');

  useQuery(
    ['get-library'],
    async () => await fetch('/api/library/').then(res => res.json()),
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setSelectedLibrary(data.library);
      },
    },
  );

  const { mutate: changeLibrary } = useMutation(
    (library: Library) =>
      fetch('/api/change-library/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          library,
        }),
      }),
    {
      onSuccess: (response, library) => {
        if (response.status === 200) {
          setSelectedLibrary(library);
          router.push(router.asPath.replace(/ai|web3/i, library.toLowerCase()));
        }
      },
    },
  );

  const onChangeLibrary = (value: Library) => {
    changeLibrary(value);
  };

  return {
    selectedLibrary,
    onChangeLibrary,
  };
};

export default useLibrary;
