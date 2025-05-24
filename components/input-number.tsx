import React, { useState, useEffect } from 'react';

type Props = {
  className?: string;
  labelClass?: string;
  label?: string;
  name: string;
  value: string | number | null;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
  disabled?: boolean;
};

export const InputNumber: React.FC<Props> = ({
  className = '',
  labelClass = '',
  label,
  name,
  value,
  onChange,
  placeholder = '',
  min,
  max,
  required = false,
  disabled = false,
}) => {
  // Convert value to string for input, handle null/undefined
  const [inputValue, setInputValue] = useState<string>(
    value === null || value === undefined || value === 0 ? '' : String(value),
  );

  // Update input value when prop changes
  useEffect(() => {
    // Only update if the value is different (avoid cursor jumping)
    if (value !== null && value !== undefined && value !== 0) {
      const stringValue = String(value);
      if (stringValue !== inputValue) {
        setInputValue(stringValue);
      }
    } else if (inputValue !== '') {
      setInputValue('');
    }
  }, [value, inputValue]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Allow empty string or numeric values
    if (newValue === '' || /^[0-9]*$/.test(newValue)) {
      setInputValue(newValue);

      // Pass the value to parent component
      onChange(newValue);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className={`block font-medium text-sm text-gray-300 mb-1 ${labelClass}`}>
          {label}
        </label>
      )}
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        name={name}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        disabled={disabled}
        className="w-full px-3 py-2.5 text-sm bg-neutral-900 text-gray-300 rounded-md border border-neutral-700 outline-none focus:border-primary-500 focus:ring focus:ring-primary-500/20 transition-colors placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};
