import { AutocompleteOptions } from '@algolia/autocomplete-core';
import {
  getAlgoliaResults,
  parseAlgoliaHitHighlight,
} from '@algolia/autocomplete-preset-algolia';
import type { Hit } from '@algolia/client-search';
import algoliasearch from 'algoliasearch/lite';
import React, { Fragment, useEffect, useRef } from 'react';
import getCaretCoordinates from 'textarea-caret';
import { IconUserPlaceholder } from '@/components/icons';
import { useAutocomplete } from '@/hooks/use-autocomplete';
import type { Person, AutocompleteItem } from '@/hooks/use-autocomplete';
import {
  getActiveToken,
  isValidTwitterUsername,
  replaceAt,
} from '@/utils/algolia';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  hasFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  textareaClass?: string;
  className?: string;
  handleSubmit?: () => void;
}

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!,
);

export const Autocomplete: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (props.hasFocus && inputRef.current) inputRef.current.focus();
  }, [props.hasFocus]);

  const { autocomplete, state } = useAutocomplete({
    ...props,
    //id: 'notes-autocomplete',
    defaultActiveItemId: 0,
    insights: true,
    getSources({ query }) {
      const cursorPosition = inputRef.current?.selectionEnd || 0;
      const activeToken = getActiveToken(query, cursorPosition);

      if (activeToken?.word && isValidTwitterUsername(activeToken?.word)) {
        return [
          {
            sourceId: 'people',
            onSelect({ item, setQuery }) {
              const [index] = activeToken.range;
              const replacement = `@${item.name.replace(/\s/g, '')}`; //`@${item.name}`;
              const newQuery = replaceAt(
                query,
                replacement,
                index,
                activeToken.word.length,
              );

              setQuery(newQuery);

              if (inputRef.current) {
                inputRef.current.selectionEnd = index + replacement.length;
              }
            },
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'people',
                    query: activeToken.word.slice(1),
                    params: {
                      hitsPerPage: 8,
                    },
                  },
                ],
              });
            },
          },
        ];
      }

      return [];
    },
    initialState: {
      query: props.value ? props.value : '',
    },
    onSubmit: props.handleSubmit,
  });

  function onInputNavigate() {
    const cursorPosition = inputRef.current?.selectionEnd || 0;
    const activeToken = getActiveToken(state.query, cursorPosition);
    const shouldOpen = isValidTwitterUsername(activeToken?.word || '');

    autocomplete.setIsOpen(shouldOpen);
    autocomplete.refresh();
  }

  const { top, height } = inputRef.current
    ? getCaretCoordinates(inputRef.current, inputRef.current?.selectionEnd)
    : { top: 0, height: 0 };

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current as HTMLInputElement | null,
    autoFocus: false,
    onKeyDown: props.onKeyDown,
    onKeyUp: (event: { key: string }) => {
      if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        onInputNavigate();
      }
    },
  });

  return (
    <div
      {...autocomplete.getRootProps({})}
      className={`relative grow ${props.className ? props.className : ''}`}>
      <form
        {...autocomplete.getFormProps({
          inputElement: inputRef.current as HTMLInputElement | null,
        })}>
        <textarea
          className={`w-full bg-white px-3 py-2 resize-none rounded-lg border-none outline-none ring-1 ring-gray-300 focus:ring-gray-300 placeholder:text-gray-500 hover:bg-gray-50 ${
            state.query.length > 280 ? 'text-base' : 'text-lg'
          } ${props.textareaClass}`}
          ref={inputRef}
          {...inputProps}
          value={props.value === '' ? props.value : inputProps.value}
          onChange={event => {
            inputProps.onChange(event);
            props.onChange(event);
          }}
          onClick={event => {
            inputProps.onClick(event);
            onInputNavigate();
          }}
          rows={2}
        />
      </form>

      <div
        {...autocomplete.getPanelProps({})}
        className="autocomplete-panel absolute left-0 z-30 w-full max-w-xs bg-white rounded-lg shadow-2xl"
        style={{ top: `${top + height}px` }}>
        {state.status === 'stalled' && !state.isOpen && (
          <div className="text-primary-500 py-3">
            <svg
              className="block w-8 h-8 mx-auto"
              viewBox="0 0 100 100"
              fill="currentColor">
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="currentColor"
                strokeDasharray="164.93361431346415 56.97787143782138"
                strokeWidth="6">
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  keyTimes="0;0.40;0.65;1"
                  repeatCount="indefinite"
                  type="rotate"
                  values="0 50 50;90 50 50;180 50 50;360 50 50"></animateTransform>
              </circle>
            </svg>
          </div>
        )}

        {state.isOpen &&
          state.collections.map(({ source, items }) => {
            return (
              <div
                key={`source-${source.sourceId}`}
                className={[
                  'w-full mt-2 py-2 overflow-hidden rounded-lg',
                  state.status === 'stalled' && 'opacity-80 grayscale',
                ]
                  .filter(Boolean)
                  .join(' ')}>
                {items.length > 0 && (
                  <ul
                    {...autocomplete.getListProps()}
                    className="h-full overflow-y-scroll list-none m-0 p-0 max-h-96">
                    {items.map(item => {
                      const itemProps = autocomplete.getItemProps({
                        item,
                        source,
                      });

                      return (
                        <li key={item.name} {...itemProps}>
                          <div
                            className={[
                              'autocomplete-item flex flex-col cursor-pointer px-6 py-2',
                              itemProps['aria-selected'] &&
                                'autocomplete-item-selected bg-gray-100',
                            ]
                              .filter(Boolean)
                              .join(' ')}>
                            <AccountItem hit={item} />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
      </div>

      {/* <button type="submit" onClick={props.handleSubmit}>
        Submit
      </button> */}
    </div>
  );
};

type PersonItemProps = {
  hit: Hit<Person>;
};

function AccountItem({ hit }: PersonItemProps) {
  return (
    <div className="account-body flex gap-2 items-center">
      <div className="account-avatar h-10 w-10 flex-none rounded-full overflow-hidden">
        {hit.picture ? (
          <img src={hit.picture} alt={hit.name} />
        ) : (
          <IconUserPlaceholder className="object-fit max-w-full max-h-full text-gray-400" />
        )}
      </div>
      <div>
        <div className="account-name font-bold">
          <Highlight hit={hit} attribute="name" />
        </div>
        <div className="account-handle text-sm text-gray-500">
          @<Highlight hit={hit} attribute="name" />
        </div>
      </div>
    </div>
  );
}

type HighlightParams<THit> = {
  hit: THit;
  attribute: keyof THit | string[];
};

function Highlight<THit extends { _highlightResult?: {} | undefined }>({
  hit,
  attribute,
}: HighlightParams<THit>) {
  return (
    <>
      {parseAlgoliaHitHighlight({
        hit,
        attribute,
      }).map(({ value, isHighlighted }, index) => {
        if (isHighlighted) {
          return (
            <mark
              key={index}
              className="account-highlighted bg-gray-200 text-inherit rounded-sm">
              {value}
            </mark>
          );
        }

        return <Fragment key={index}>{value}</Fragment>;
      })}
    </>
  );
}
