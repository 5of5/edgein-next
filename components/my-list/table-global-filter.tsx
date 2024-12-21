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
      className="px-3 py-1.5 text-sm relative bg-black rounded-full border border-gray-300 outline-none hover:border-white focus:border-white focus:outline-none placeholder:text-slate-400"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};
