import {
  AutocompleteOptions,
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { useMemo, useState } from 'react';

import type { Hit } from '@algolia/client-search';

export type Person = {
  name: string;
  handle: string;
  work_email: string;
  personal_email: string;
  picture: string;
  slug: string;
  empty: boolean;
};

export type AutocompleteItem = Hit<Person>;

export const useAutocomplete = (
  props: AutocompleteOptions<AutocompleteItem>,
) => {
  const [state, setState] = useState<AutocompleteState<AutocompleteItem>>(
    () => ({
      collections: [],
      completion: null,
      context: {},
      isOpen: false,
      query: '',
      activeItemId: null,
      status: 'idle',
    }),
  );

  const autocomplete = useMemo(
    () =>
      createAutocomplete<
        AutocompleteItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        ...props,
        onStateChange(params) {
          props.onStateChange?.(params);
          setState(params.state);
        },
      }),
    [],
  );

  return { autocomplete, state };
};
