
export function fetcher<TData, TVariables>(query: string, variables?: TVariables, options?: HeadersInit | undefined) {
  return async (): Promise<TData> => {
    const res = await fetch("/api/graphql", {
    method: "POST",
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
