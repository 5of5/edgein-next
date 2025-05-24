import React, { useState, useRef, useEffect, Fragment } from 'react';
import { IconSearch, IconX, IconChevronDown } from '../icons';

/**
 * TagInputSelect - A component for selecting and managing tags with autocomplete functionality.
 *
 * Features:
 * - Displays a searchable input field with dropdown suggestions
 * - Shows suggestions based on input value
 * - Allows adding selected tags from suggestions
 * - Can allow or prevent adding custom tags not in suggestions
 * - Displays selected tags with delete option
 *
 * Use this component for fields that need tag selection with autocomplete functionality,
 * such as selecting industry tags for companies.
 */
type Props = {
  className?: string;
  labelClass?: string;
  label?: string;
  sublabel?: string;
  name: string;
  value: string;
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  required?: boolean;
  defaultTags?: string[];
  allowCreate?: boolean;
};

export const TagInputSelect: React.FC<Props> = ({
  className = '',
  labelClass = '',
  label,
  sublabel,
  name,
  value,
  onChange,
  suggestions,
  placeholder = '',
  required = false,
  defaultTags = [],
  allowCreate = true,
}) => {
  const [tags, setTags] = useState(defaultTags);
  const [inputValue, setInputValue] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);

  const initialRef: any = null;
  const wrapperRef = useRef(initialRef);

  // Filter suggestions based on input value
  const filteredSuggestions = suggestions
    ? suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase()),
      )
    : [];

  // Handle input change
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setShowDropdown(!!e.target.value);
  }

  // Handle suggestion click
  function handleSuggestionClick(suggestion: string) {
    // Check if tag already exists
    const tagExists = tags.some(
      tag => tag.toLowerCase() === suggestion.toLowerCase(),
    );

    if (!tagExists) {
      const newTags = [...tags, suggestion];
      setTags(newTags);
      onChange(newTags);
    }

    setShowDropdown(false);
    setInputValue('');
  }

  // Handle click outside to close dropdown
  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
    }
  };

  // Add event listener for click outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle key press (Enter)
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && inputValue.trim() && allowCreate) {
      e.preventDefault();

      // Check if tag already exists
      const tagExists = tags.some(
        tag => tag.toLowerCase() === inputValue.toLowerCase(),
      );

      if (!tagExists) {
        const newTags = [...tags, inputValue];
        setTags(newTags);
        onChange(newTags);
      }

      setShowDropdown(false);
      setInputValue('');
    }
  }

  // Handle tag removal
  function removeTag(index: number) {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    onChange(updatedTags);
  }

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className={`block font-medium text-sm text-gray-300 mb-1 ${labelClass}`}>
          {label}
        </label>
      )}
      {sublabel && <p className="mb-2 text-sm text-gray-500">{sublabel}</p>}

      <div className="relative" ref={wrapperRef}>
        <div className="flex items-center w-full px-3 py-2.5 rounded-md border border-neutral-700 focus-within:border-primary-500 focus-within:ring focus-within:ring-primary-500/20 bg-neutral-900 transition-colors">
          <IconSearch className="flex-none w-5 h-5 text-gray-400" />
          <input
            type="text"
            name={name}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="block w-full px-3 py-0.5 text-sm bg-transparent border-none appearance-none focus:ring-0 text-gray-300 placeholder:text-gray-500"
            placeholder={placeholder}
            required={required}
          />
          {filteredSuggestions.length > 0 && (
            <div
              className="cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}>
              <IconChevronDown className="flex-none w-5 h-5 text-gray-400" />
            </div>
          )}
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute z-20 w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredSuggestions.length > 0 ? (
              <div className="py-1">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-neutral-700 text-gray-300"
                    onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </div>
                ))}
              </div>
            ) : allowCreate && inputValue.trim() ? (
              <div
                className="px-4 py-2 cursor-pointer hover:bg-neutral-700 text-gray-300"
                onClick={() => handleSuggestionClick(inputValue)}>
                Add &quot;{inputValue}&quot;
              </div>
            ) : (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No matching tags found
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-neutral-800 text-gray-300 border border-neutral-700 rounded-md">
              <span className="max-w-xs font-medium truncate">{tag}</span>
              <button
                onClick={() => removeTag(index)}
                className="text-gray-400 hover:text-gray-300 transition-colors focus:outline-none">
                <IconX className="w-4 h-4" strokeWidth={3} title="close" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
