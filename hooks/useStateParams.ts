import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function useStateParams<T>(
  initialState: T,
  paramsName: string,
  serialize: (state: T) => string = (s) => s as unknown as string,
  deserialize: (state: string) => T = (s) => s as unknown as T,
): [T, (state: T) => void] {
  const router = useRouter()
  //const search = router.query
  const query = router.asPath.split('?')[1] || ''
  const search = new URLSearchParams(query);

  const existingValue = search.get(paramsName);
  const initialValue = existingValue ? deserialize(existingValue) : initialState

  //const existingValue = getParam(search[paramsName]);
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    // Updates state when user navigates backwards or forwards in browser history
    if (existingValue && deserialize(existingValue) !== state) {
      setState(deserialize(existingValue));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingValue]);

  const onChange = (s: T) => {
    setState(s);
    const search = router.query
    search[paramsName] = serialize(s);
    const pathname = router.pathname
    window.disableRouterEvents = true
    router.push({ pathname, query: search }, undefined, { shallow: true, scroll: false }).then(() => {
      window.disableRouterEvents = false
    })
  };

  return [state, onChange];
}