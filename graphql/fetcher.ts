export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: HeadersInit | undefined,
) {
  return async (): Promise<TData> => {
    try {
      console.log('GraphQL Client: Making request to Hasura GraphQL API');
      const res = await fetch(
        process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL ||
          'https://unique-crow-54.hasura.app/v1/graphql',
        {
          method: 'POST',
          body: JSON.stringify({ query, variables }),
          headers: {
            'Content-Type': 'application/json',
            'is-viewer': 'true',
            'x-hasura-admin-secret':
              'H2qMpIzxHTQYpxhhuVoOrDvMEW3coQFLE42kiShCEJ5sHATlv7Fk12NfQIoSCjid',
          },
        },
      );

      console.log(
        'GraphQL Client: Response status:',
        res.status,
        res.statusText,
      );

      if (!res.ok) {
        // Handle redirects more safely to prevent loops
        if (res.redirected && res.url) {
          console.log('GraphQL Client: Detected redirect to:', res.url);

          // Prevent redirect loops by checking the current URL
          const currentPath = window.location.pathname;
          const redirectUrl = new URL(res.url);

          if (
            (currentPath === '/sign-in' &&
              redirectUrl.pathname === '/sign-in') ||
            (currentPath === '/' && redirectUrl.pathname === '/') ||
            (currentPath === '/login' && redirectUrl.pathname === '/login')
          ) {
            console.error('GraphQL Client: Prevented redirect loop!', {
              from: currentPath,
              to: redirectUrl.pathname,
            });
            throw new Error('Prevented redirect loop');
          }

          // Safe to redirect
          console.log('GraphQL Client: Redirecting to', res.url);
          location.href = res.url;
          throw new Error('Redirect');
        } else {
          console.error(
            'GraphQL Client: Request failed with status',
            res.status,
          );
          throw new Error(res.statusText);
        }
      }

      const json = await res.json();

      if (json.errors) {
        const { message } = json.errors[0];
        console.error('GraphQL Client: GraphQL error:', message);
        throw new Error(message);
      }

      return json.data;
    } catch (e: any) {
      console.error('GraphQL Client: Error in fetcher:', e.message);
      throw new Error(e['message']);
    }
  };
}
