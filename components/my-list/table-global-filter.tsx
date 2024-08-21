import { ChangeEvent, useState, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { DEBOUNCE_TIME } from '@/utils/constants';
import { InputText } from '../input-text';

interface Props {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

export const TableGlobalFilter = ({
  className = '',
  placeholder = '',
  defaultValue = '',
  onChange,
}: Props) => {
  const [value, setValue] = useState(defaultValue);

  const debouncedSearch = useMemo(
    () => debounce(query => onChange(query), DEBOUNCE_TIME),
    [onChange],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      debouncedSearch(event.target.value);
    },
    [debouncedSearch],
  );

  return (
    <InputText
      className={className}
      name="search"
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};
