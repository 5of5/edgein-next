import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Cookies from 'js-cookie';

function useCookieState<T>(
  key: string,
  defaultValue: T,
  options?: Cookies.CookieAttributes,
): [T, Dispatch<SetStateAction<T>>] {
  const initialCookieValue = Cookies.get(key)
    ? (Cookies.get(key) as T)
    : defaultValue;
  const [value, setValue] = useState<T>(initialCookieValue);

  useEffect(() => {
    Cookies.set(key, value as string, options);
  }, [key, value, options]);

  return [value, setValue];
}

export default useCookieState;
