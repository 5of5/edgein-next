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
          className={`block font-medium text-sm text-gray-300 mb-1 ${labelClass}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-3 py-2.5 text-sm bg-neutral-900 text-gray-300 rounded-md border border-neutral-700 outline-none focus:border-primary-500 focus:ring focus:ring-primary-500/20 transition-colors placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
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
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
