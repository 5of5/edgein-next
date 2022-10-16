import useSWR from "swr";
import { useSWRConfig } from 'swr'
import { hotjar } from 'react-hotjar';

function fetcher(route: string) {
  /* our token cookie gets sent with this request */
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((user) => user || null);
}

export function useClearAuth() {
  const { cache } = useSWRConfig()
  cache.get('/api/user/')
  cache.delete('/api/user/')
}

export function useAuth() {
  const { data: user, error, isValidating } = useSWR("/api/user/", fetcher);
  const loading = isValidating;
  if (user) {
    try { 
      hotjar.identify(user.publicAddress, { email: user.email, role: user.role });
    } catch(e) {
         // hotjar not loaded
    }
  }

  return {
    user,
    loading,
    error,
  };
}