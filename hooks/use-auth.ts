import { User } from '@/models/user';
import useSWR from 'swr';
import { useSWRConfig } from 'swr';

function fetcher(route: string) {
  /* our token cookie gets sent with this request */
  return fetch(route)
    .then(async r => {
      if (!r.ok) {
        const error: any = new Error(
          'An error occurred while fetching the data.',
        );
        // Attach extra info to the error object.
        try {
          error.info = await r.json();
        } catch (e) {} /* eslint-disable-line no-empty */
        error.status = r.status;
        throw error;
      }
      return r.json() || null;
    })
    .catch(async r => {
      const error: any = new Error(
        'An error occurred while fetching the data.',
      );
      // Attach extra info to the error object.
      error.status = r.status;
      throw error;
    });
}

export function useAuth() {
  const {
    data: user,
    error,
    isValidating,
  } = useSWR<User>('/api/user/', fetcher, { revalidateOnFocus: false });
  const { mutate } = useSWRConfig();
  const loading = isValidating;

  const refreshUser = () => {
    mutate('/api/user/');
  };

  if (error) {
    if (
      error.status == 403 &&
      /(\/companies\/|\/investors\/|\/people\/|\/lists\/|\/groups\/|\/events\/|\/notifications\/|\/profile\/)/.test(
        window.location.href,
      )
    ) {
      window.location.href = '/?blocked';
    }
    return {
      user,
      loading,
      error,
      refreshUser,
    };
  }

  if (user && !user?.entitlements) {
    user.entitlements = {
      viewEmails: false,
      listsCount: 10,
      groupsCount: 3,
    };
  }

  return {
    user,
    loading,
    error,
    refreshUser,
  };
}
