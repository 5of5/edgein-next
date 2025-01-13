import React, { PropsWithChildren } from 'react';
import { IconSearch } from '../icons';

type Props = {
  className?: string;
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const InputSearch: React.FC<PropsWithChildren<Props>> = ({
  className = '',
  label,
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className={className} role="search">
      <label className="relative block" htmlFor="search">
        <span className="sr-only">{label}</span>
        <span className="absolute inset-y-0 z-10 flex items-center pl-2 left-1">
          <IconSearch className="w-5 h-5" />
        </span>
        <input
          type="search"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full pl-10 pr-3 py-1.5 text-white relative bg-neutral-900 rounded-md border-none outline-none ring-1 ring-gray-700 hover:bg-neutral-800 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-gray-500"
        />
      </label>
    </div>
  );
};
