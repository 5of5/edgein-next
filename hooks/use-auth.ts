import { User } from "@/models/user";
import useSWR from "swr";
import { useSWRConfig } from 'swr'

function fetcher(route: string) {
  /* our token cookie gets sent with this request */
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((user) => user || null);
}

export function useAuth() {
  const { data: user, error, isValidating } = useSWR<User>("/api/user/", fetcher, {revalidateOnFocus: false});
  const { mutate } = useSWRConfig()
  const loading = isValidating;

  const refreshUser = () => {
    mutate("/api/user/")
  }

  if (user && !user?.entitlements) {
    user.entitlements = {
      viewEmails: false,
      listsCount: 10,
      groupsCount: 3,
    }
  }

  return {
    user,
    loading,
    error,
    refreshUser,
  };
}