import React, { PropsWithChildren } from 'react';
import { IconSearch } from './icons';

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
        <span className="absolute z-10 inset-y-0 left-1 flex items-center pl-2">
          <IconSearch className="h-5 w-5" />
        </span>
        <input
          type="search"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full pl-10 pr-3 py-1.5 text-dark-500 relative bg-white rounded-md border-none outline-none ring-1 ring-slate-300 hover:ring-slate-400 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400"
        />
      </label>
    </div>
  );
};
