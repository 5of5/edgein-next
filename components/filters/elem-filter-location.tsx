import { FC, ChangeEvent, ReactNode, useState } from 'react';
import { Combobox } from '@headlessui/react';
import iso from 'iso-3166-1';
import { FilterOptionKeys } from '@/models/Filter';
import useAddressAutocomplete from '@/hooks/use-address-autocomplete';
import { ElemFilterPopup } from './elem-filter-popup';
import { InputRadio } from '../input-radio';
import { IconX } from '../icons';
import { Place, SearchForSuggestionsResult } from '@aws-sdk/client-location';

type Props = {
  open: boolean;
  option: Extract<FilterOptionKeys, 'country' | 'state' | 'city'>;
  title: string | ReactNode;
  heading?: string;
  checkedAny?: boolean;
  checkedNone?: boolean;
  tags: string[];
  placeholder?: string;
  onOpenFilterPopup: (name: FilterOptionKeys) => void;
  onCloseFilterPopup: (name: FilterOptionKeys) => void;
  onClearFilterOption: (name: FilterOptionKeys) => void;
  onApplyFilter: (name: FilterOptionKeys) => void;
  onChangeCondition?: (
    event: ChangeEvent<HTMLInputElement>,
    name: string,
  ) => void;
  onChangeTags: (selectedTags: string[], name: string) => void;
};

export const ElemFilterLocation: FC<Props> = ({
  open,
  option,
  title,
  heading,
  checkedAny = false,
  checkedNone = false,
  tags,
  placeholder,
  onOpenFilterPopup,
  onCloseFilterPopup,
  onClearFilterOption,
  onApplyFilter,
  onChangeCondition,
  onChangeTags,
}) => {
  const [inputValue, setInputValue] = useState('');

  const layers = {
    country: ['CountryType'],
    state: ['RegionType'],
    city: ['MunicipalityType'],
  }[option];

  const {
    isLoadingPlaceSuggestions,
    isLoadingPlace,
    options,
    onInputChange,
    onGetPlace,
  } = useAddressAutocomplete(layers);

  const handleGetTagValue = (place: Place) => {
    switch (option) {
      case 'country':
        return iso.whereAlpha3(place?.Country || '')?.country || place?.Country;
      case 'state':
        return place?.Region;
      default:
        return place?.Municipality;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onInputChange(event);
  };

  const handleSelect = async (value: SearchForSuggestionsResult) => {
    setInputValue('');
    if (value.PlaceId && !tags.includes(value.Text || '')) {
      const place = await onGetPlace(value.PlaceId);
      if (place) {
        onChangeTags([...tags, handleGetTagValue(place) || ''], option);
      }
    }
  };

  const handleRemove = (tag: string) => {
    const newTags = tags.filter(tagItem => tagItem !== tag);
    onChangeTags(newTags, option);
  };

  const handleApplyFilter = (name: FilterOptionKeys) => {
    onApplyFilter(name);
  };

  return (
    <ElemFilterPopup
      key={option}
      open={open}
      name={option}
      title={title}
      onOpen={onOpenFilterPopup}
      onClose={onCloseFilterPopup}
      onClear={onClearFilterOption}
      onApply={handleApplyFilter}>
      <div className="text-sm font-medium">{heading}</div>
      <div className="flex flex-col gap-4 mt-2">
        <div>
          {onChangeCondition && (
            <InputRadio
              name={option}
              value="any"
              checked={checkedAny}
              label="Is"
              onChange={event => onChangeCondition(event, option)}
            />
          )}

          <div className="relative">
            <Combobox onChange={handleSelect}>
              <div className="flex flex-wrap items-center px-2 py-1.5 rounded-3xl ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:outline-none">
                {tags.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {tags.map(item => (
                      <li
                        key={item}
                        className="flex items-center gap-1 py-1 pl-3 pr-2 text-sm rounded-full bg-slate-200">
                        {item}
                        <button
                          onClick={() => handleRemove(item)}
                          className="focus:outline-none"
                          title="Remove">
                          <IconX className="w-3 h-3" title="Remove" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {isLoadingPlace && <p className="text-sm">Loading...</p>}
                {!isLoadingPlace && (
                  <Combobox.Input
                    className="relative flex-1 px-3 py-1 text-sm bg-black border-none rounded-full outline-none text-dark-500 ring-0 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                    displayValue={(value: Place) => value?.Label || ''}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                )}
              </div>
              {inputValue && (
                <Combobox.Options className="absolute z-50 w-full mt-1 overflow-auto bg-black border divide-y divide-gray-100 rounded-md shadow-xl border-dark-500/10 max-h-60 focus:outline-none">
                  <ComboboxResults
                    isLoading={isLoadingPlaceSuggestions}
                    name={option}
                    options={options}
                  />
                </Combobox.Options>
              )}
            </Combobox>
          </div>
        </div>
        {onChangeCondition && (
          <div>
            <InputRadio
              name={option}
              value="none"
              checked={checkedNone}
              label="Is not"
              onChange={event => onChangeCondition(event, option)}
              labelClass="mb-0.5"
            />
          </div>
        )}
      </div>
    </ElemFilterPopup>
  );
};

type ComboboxResultsProps = {
  isLoading: boolean;
  name: Extract<FilterOptionKeys, 'country' | 'state' | 'city'>;
  options: SearchForSuggestionsResult[];
};

const ComboboxResults: FC<ComboboxResultsProps> = ({
  isLoading,
  name,
  options,
}) => {
  if (isLoading) {
    return <p className="p-2 text-sm text-slate-500">Searching...</p>;
  }

  if (options.length === 0) {
    return (
      <p className="p-2 text-sm text-slate-500">{`We don't cover this ${name} yet`}</p>
    );
  }

  return (
    <>
      {options.map(item => (
        <Combobox.Option
          className={({ active }) =>
            `${
              active ? 'text-primary-500 bg-primary-100' : 'text-dark-500'
            }  select-none relative py-2 pl-3 pr-4 cursor-pointer`
          }
          key={item.PlaceId}
          value={item}>
          {item.Text}
        </Combobox.Option>
      ))}
    </>
  );
};
