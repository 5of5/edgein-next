import { Fragment, useState, useEffect, useRef } from 'react';
import { IconSearch, IconCheck, IconPolygonDown } from './icons';

type Option = {
  title: string;
  value: any;
  description?: string;
  icon?: any;
};

type Props = {
  className?: string;
  labelClass?: string;
  buttonClasses?: string;
  dropdownClasses?: string;
  value?: Option;
  placeholder?: string;
  onChange: (option: Option) => void;
  options: Option[];
  allOptions?: Option[];
  disabled?: boolean;
  label?: string;
};

export const SearchableInputSelect = ({
  className = '',
  labelClass = '',
  buttonClasses = '',
  dropdownClasses = '',
  value,
  placeholder = 'Select an option',
  onChange,
  options,
  allOptions,
  disabled = false,
  label,
}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle filter changes
  useEffect(() => {
    if (searchValue) {
      const filtered = (allOptions || options)
        .filter(
          option =>
            option.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            (option.description &&
              option.description
                .toLowerCase()
                .includes(searchValue.toLowerCase())),
        )
        .slice(0, 100); // Limit to 100 matches for performance
      setFilteredOptions(filtered);
    } else {
      // Reset to initial options
      setFilteredOptions(options.slice(0, 100));
    }
  }, [searchValue, options, allOptions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle option selection
  const handleSelect = (option: Option) => {
    onChange(option);
    setSearchValue('');
    setIsOpen(false);
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={className} ref={wrapperRef}>
      {label && (
        <label
          className={`block font-medium text-sm text-gray-300 mb-1 ${labelClass}`}>
          {label}
        </label>
      )}

      <div className="relative">
        {/* Button/Display area */}
        <div
          onClick={toggleDropdown}
          className={`relative w-full px-3 py-2.5 text-sm bg-neutral-900 text-gray-300 rounded-md border border-neutral-700 outline-none flex items-center justify-between cursor-pointer focus:border-primary-500 hover:border-neutral-600 transition-colors ${buttonClasses} ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}>
          <div className="flex items-center truncate">
            {value?.icon && (
              <value.icon
                title={value.title}
                className="w-5 h-5 mr-1 shrink-0"
              />
            )}
            {value?.title ? (
              <div className="flex flex-col">
                <span className="text-gray-300 truncate">{value.title}</span>
                {value.description && className.includes('w-full') && (
                  <span className="text-xs text-gray-500 truncate">
                    {value.description}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>

          <div className="flex items-center">
            <IconPolygonDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            className={`absolute z-20 w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg overflow-hidden ${dropdownClasses}`}>
            {/* Search input */}
            <div className="sticky top-0 z-10 px-3 py-2 border-b border-neutral-700 bg-neutral-900">
              <div className="flex items-center">
                <IconSearch className="flex-none w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  className="block w-full px-3 py-1 text-sm bg-transparent border-none appearance-none focus:ring-0 text-gray-300 placeholder:text-gray-500"
                  placeholder="Search..."
                  autoFocus
                />
              </div>
            </div>

            {/* Options list */}
            <div className="max-h-60 overflow-y-auto py-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`px-4 py-3 cursor-pointer hover:bg-neutral-700 ${
                      value?.value === option.value
                        ? 'bg-neutral-700/50 text-primary-400'
                        : 'text-gray-300'
                    } ${
                      dropdownClasses?.includes('company-type-dropdown')
                        ? 'border-b border-neutral-700/50 last:border-0'
                        : ''
                    }`}
                    onClick={() => handleSelect(option)}>
                    <div
                      className={`flex flex-col ${
                        dropdownClasses?.includes('company-type-dropdown')
                          ? 'space-y-1'
                          : ''
                      }`}>
                      {option.icon && (
                        <option.icon
                          title={option.title}
                          className={`h-5 w-5 mr-1 shrink-0 ${
                            value?.value === option.value
                              ? 'text-primary-500'
                              : 'text-gray-400'
                          }`}
                        />
                      )}
                      <div className="flex flex-col">
                        <div
                          className={`text-sm ${
                            value?.value === option.value
                              ? 'font-medium text-primary-400'
                              : 'font-normal'
                          } ${
                            dropdownClasses?.includes('company-type-dropdown')
                              ? 'font-semibold text-white'
                              : ''
                          }`}>
                          {option.title}
                        </div>
                        {option.description && (
                          <div
                            className={`${
                              dropdownClasses?.includes('company-type-dropdown')
                                ? 'text-sm text-gray-300 mt-1'
                                : 'text-xs text-gray-400 mt-0.5'
                            }`}>
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>

                    {value?.value === option.value && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-500">
                        <IconCheck className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-sm">
                  No matching options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
