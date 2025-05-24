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
          className={`block font-medium text-sm text-gray-300 mb-1 ${labelClass}`}>
          {label}
        </label>
      )}

      <input
        className={`w-full px-3 py-2.5 text-sm bg-neutral-900 text-gray-300 rounded-md border border-neutral-700 outline-none focus:border-primary-500 focus:ring focus:ring-primary-500/20 transition-colors placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
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
