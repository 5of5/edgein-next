export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: HeadersInit | undefined,
) {
  return async (): Promise<TData> => {
    try {
      const res = await fetch('https://unique-crow-54.hasura.app/v1/graphql', {
        method: 'POST',
        body: JSON.stringify({ query, variables }),
        headers: {
          'is-viewer': 'true',
          'x-hasura-admin-secret': `H2qMpIzxHTQYpxhhuVoOrDvMEW3coQFLE42kiShCEJ5sHATlv7Fk12NfQIoSCjid`,
        },
      });
      if (!res.ok) {
        if (res.redirected && res.url) {
          location.href = res.url;
          throw new Error('Redirect');
        } else {
          throw new Error(res.statusText);
        }
      }
      const json = await res.json();

      if (json.errors) {
        const { message } = json.errors[0];

        throw new Error(message);
      }

      return json.data;
    } catch (e: any) {
      throw new Error(e['message']);
    }
  };
}
