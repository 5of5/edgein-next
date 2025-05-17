import React, { PropsWithChildren } from 'react';

type Props = {
  className?: string;
  labelClass?: string;
  label?: string;
  type?: 'text' | 'email' | 'search' | 'password' | 'number';
  name: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const InputText: React.FC<PropsWithChildren<Props>> = ({
  className = '',
  labelClass = '',
  label,
  type = '',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  readOnly = false,
  autoComplete = 'on',
  disabled = false,
  onKeyDown,
  onBlur,
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
        className={`w-full mt-1 px-3 py-2 text-sm relative bg-neutral-900 text-white rounded-full border-none outline-none ring-1 ring-gray-700 hover:bg-neutral-800 focus:ring-gray-600 focus:outline-none placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        type={type ? type : 'text'}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        autoComplete={autoComplete}
        disabled={disabled}
        onKeyDown={onKeyDown}
      />
    </>
  );
};
