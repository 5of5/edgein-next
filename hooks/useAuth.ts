import { User } from "@/models/User";
import useSWR from "swr";
import { useSWRConfig } from 'swr'

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

const loadStripe = async () => {
  try {
    const response = await fetch("/api/stripe_load/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json && json.success && json.redirect) {
      window.location.href = json.redirect;
    }
  } catch (e) {
    console.log(e);
  }  
}


export function useAuth() {
  const { data: user, error, isValidating } = useSWR<User>("/api/user/", fetcher, {revalidateOnFocus: false});
  const loading = isValidating;

  return {
    user,
    loading,
    error,
    loadStripe,
  };
}