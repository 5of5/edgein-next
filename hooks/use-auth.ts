import { User } from '@/models/user';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { useSWRConfig } from 'swr';

const THROTTLE_INTERVAL = 30 * 60000; //30m in ms

function fetcher(route: string) {
  /* our token cookie gets sent with this request */
  console.log('Client: Fetching user data from', route);
  return fetch(route, {
    // Add credentials to ensure cookies are sent
    credentials: 'include',
    // Add cache control to prevent caching issues
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  })
    .then(async r => {
      console.log(
        'Client: Received response with status:',
        r.status,
        r.statusText,
      );
      console.log(
        'Client: Response headers:',
        Array.from(r.headers.entries())
          .map(([key, value]) => `${key}: ${value}`)
          .join(', '),
      );

      // Check for redirect issues to prevent loops
      if (r.type === 'opaqueredirect') {
        console.error(
          'Client: Opaque redirect detected - this might cause a redirect loop',
        );
      }

      if (!r.ok) {
        const error: any = new Error(
          'An error occurred while fetching the data.',
        );
        // Attach extra info to the error object.
        try {
          error.info = await r.json();
          console.log('Client: Error response body:', error.info);
        } catch (e) {
          console.log('Client: Could not parse error response as JSON');
        }
        error.status = r.status;
        console.log('Client: Error fetching user data:', error);
        throw error;
      }

      const data = await r.json();
      console.log('Client: Successfully fetched user data', data);
      return data || null;
    })
    .catch(async r => {
      console.log('Client: Error in catch block:', r);
      const error: any = new Error(
        'An error occurred while fetching the data.',
      );
      // Attach extra info to the error object.
      error.status = r.status;
      error.originalError = r;

      // Prevent redirect loops
      if (
        window.location.pathname === '/sign-in' ||
        window.location.pathname === '/login' ||
        window.location.pathname === '/'
      ) {
        console.log(
          'Client: Already on auth page, not redirecting again to prevent loop',
        );
        // Don't throw the error when already on auth pages
        return { success: false, data: null };
      }

      throw error;
    });
}

export function useAuth() {
  const {
    data: response,
    error,
    isValidating,
  } = useSWR<{ success: boolean; data: User | null; error?: string }>(
    '/api/user/',
    fetcher,
    {
      focusThrottleInterval: THROTTLE_INTERVAL,
      // Add retry configuration to prevent excessive retries
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Only retry up to 2 times
        if (retryCount >= 2) return;

        // Don't retry on 401/403 errors
        if (error.status === 401 || error.status === 403) return;

        // Retry after 5 seconds
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    },
  );
  const { mutate } = useSWRConfig();
  const loading = isValidating;

  // Extract user from response, accounting for success: false cases
  const user = response?.success === true ? response.data : null;

  const refreshUser = useCallback(() => {
    mutate('/api/user/');
  }, [mutate]);

  if (user && !user?.entitlements) {
    user.entitlements = {
      viewEmails: false,
      listsCount: 10,
      groupsCount: 3,
    };
  }

  const cachedAuth = useMemo(
    () => ({
      user,
      loading,
      error,
      refreshUser,
    }),
    [user, loading, error, refreshUser],
  );

  if (error) {
    // Only redirect to '/?blocked' in specific cases and prevent redirect loops
    if (
      error.status === 403 &&
      !window.location.href.includes('/?blocked') &&
      !window.location.href.includes('/sign-in') &&
      /(\/companies\/|\/investors\/|\/people\/|\/lists\/|\/groups\/|\/events\/|\/notifications\/|\/profile\/)/.test(
        window.location.href,
      )
    ) {
      console.log('Client: Redirecting to /?blocked due to 403 error');
      window.location.href = '/?blocked';
    }
    return cachedAuth;
  }

  return cachedAuth;
}
