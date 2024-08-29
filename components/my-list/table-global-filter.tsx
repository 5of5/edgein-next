import { ChangeEvent, useState, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { DEBOUNCE_TIME } from '@/utils/constants';

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
    <input
      className={`px-3 py-1.5 text-sm relative bg-white rounded-full border-none outline-none ring-1 ring-gray-300 hover:bg-gray-50 focus:ring-gray-300 focus:outline-none placeholder:text-slate-400 ring-1 ring-gray-200 ${className}`}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};
