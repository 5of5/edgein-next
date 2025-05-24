import React, { useState, useEffect } from 'react';

type Props = {
  className?: string;
  labelClass?: string;
  label?: string;
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  showCurrentYearButton?: boolean;
  showPresets?: boolean;
  presetYears?: number[];
};

export const InputYear: React.FC<Props> = ({
  className = '',
  labelClass = '',
  label,
  name,
  value,
  onChange,
  placeholder = 'YYYY',
  required = false,
  disabled = false,
  min = 1900,
  max = new Date().getFullYear(), // Default max is current year
  showCurrentYearButton = true,
  showPresets = true,
  presetYears,
}) => {
  const [inputValue, setInputValue] = useState<string>(value?.toString() || '');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();

  // Generate default preset years if not provided
  const defaultPresets = presetYears || [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 5,
    currentYear - 10,
    2015,
    2010,
    2000,
  ];

  // Update input value when prop value changes
  useEffect(() => {
    setInputValue(value?.toString() || '');
  }, [value]);

  // Validate input and update parent
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Only allow digits, limit to 4 characters
    if (newValue === '' || (/^\d+$/.test(newValue) && newValue.length <= 4)) {
      setInputValue(newValue);

      // Validate year is within min/max range
      const yearNum = parseInt(newValue, 10);
      const valid =
        newValue === '' ||
        (!isNaN(yearNum) && yearNum >= min && yearNum <= max);

      setIsValid(valid);

      // Only update parent if we have a valid 4-digit year or empty string
      if (valid && (newValue.length === 4 || newValue === '')) {
        onChange(newValue);
      }
    }
  };

  // Set to specific year
  const setYear = (year: number) => {
    const yearStr = year.toString();
    setInputValue(yearStr);
    setIsValid(true);
    onChange(yearStr);
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

      <div className="flex items-start space-x-2">
        <div className={`relative flex-grow ${disabled ? 'opacity-50' : ''}`}>
          <input
            className={`w-full px-3 py-2.5 text-sm bg-neutral-900 rounded-md border outline-none transition-colors placeholder:text-gray-500 
              ${
                isFocused
                  ? 'border-primary-500 ring ring-primary-500/20'
                  : 'border-neutral-700 hover:border-neutral-600'
              } 
              ${!isValid ? 'border-red-500/70 ring ring-red-500/20' : ''}
              ${disabled ? 'cursor-not-allowed' : ''}
              text-gray-300`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name={name}
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={4}
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

        {showCurrentYearButton && !disabled && (
          <button
            type="button"
            onClick={() => setYear(currentYear)}
            className="px-3 py-2.5 text-sm bg-neutral-800 text-gray-300 rounded-md border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600 transition-colors whitespace-nowrap">
            Current Year
          </button>
        )}
      </div>

      {showPresets && !disabled && (
        <div className="mt-2 flex flex-wrap gap-2">
          {defaultPresets.slice(0, 6).map(year => (
            <button
              key={year}
              type="button"
              onClick={() => setYear(year)}
              className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                inputValue === year.toString()
                  ? 'bg-primary-500/20 text-primary-400 border-primary-500/50'
                  : 'bg-neutral-800 text-gray-300 border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600'
              }`}>
              {year}
            </button>
          ))}
        </div>
      )}

      {!isValid && inputValue !== '' && (
        <p className="text-xs text-red-500 mt-1">
          Please enter a valid year between {min} and {max}
        </p>
      )}
    </div>
  );
};
