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
      className={`relative inline-flex items-center text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 focus:outline-none focus:ring-1 ${className}`}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};
