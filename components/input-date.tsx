import React, { PropsWithChildren } from 'react';

type Props = {
  className?: string;
  labelClass?: string;
  label?: string;
  type?: 'date';
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  min?: string | number;
  max?: string | number;
};

export const InputDate: React.FC<PropsWithChildren<Props>> = ({
  className = '',
  labelClass = '',
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  autoComplete = 'on',
  disabled,
  min,
  max,
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className={`font-medium text-sm cursor-text ${labelClass}`}>
          {label}
        </label>
      )}
      <input
        className={`w-full appearance-none border-none mt-1 px-3 py-1.5 text-dark-500 relative bg-black rounded-md outline-none ring-1 ring-slate-300 hover:ring-slate-400 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400 ${className} ${
          disabled ? 'text-gray-300' : ''
        }`}
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        disabled={disabled}
        min={min}
        max={max}
      />
    </>
  );
};
