import React, { useState, useRef, useEffect, Fragment } from 'react';
import { IconSearch, IconX, IconChevronDown } from '@/components/icons';

type Props = {
  className?: string;
  labelClass?: string;
  label?: string;
  sublabel?: string;
  name: string;
  value: string;
  onChange: (tags: string[]) => void;
  suggestions?: Array<string>;
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
  allowCreate = false,
}) => {
  const [tags, setTags] = useState(defaultTags);
  const [inputValue, setInputValue] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);

  const initialRef: any = null;
  const wrapperRef = useRef(initialRef);

  const suggestionArr = suggestions
    ? suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase()),
      )
    : null;

  function changeHandler(e: any) {
    setInputValue(e.target.value);
    if (suggestionArr) {
      setShowDropdown(true);
    }
  }

  function handleClickSuggestion(e: any, suggestion: any) {
    const tagAlreadyAdded = tags.some(tag => {
      return tag.toLowerCase() === suggestion.toLowerCase();
    });

    if (tagAlreadyAdded) {
      setShowDropdown(false);
      setInputValue('');
    } else {
      setTags([...tags, suggestion]);
      onChange([...tags, suggestion]);
      setShowDropdown(false);
      setInputValue('');
    }
  }

  const handleClickOutside = (e: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  function onEnterTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == 'Enter' && allowCreate) {
      setShowDropdown(false);
      const tagAlreadyAdded = tags.some(tag => {
        return (
          tag.toLowerCase() ===
          (e.target as HTMLInputElement).value.toLowerCase()
        );
      });

      if ((e.target as HTMLInputElement).value && !tagAlreadyAdded) {
        setTags([...tags, (e.target as HTMLInputElement).value]);
        onChange([...tags, (e.target as HTMLInputElement).value]);
      }
      setInputValue('');
    }
  }

  function onRemoveTag(index: number) {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    onChange(updatedTags);
  }

  return (
    <div className={`relative z-10 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`font-medium text-sm cursor-text ${labelClass}`}>
          {label}
        </label>
      )}
      {sublabel && <p className="text-sm mb-2 text-slate-600">{sublabel}</p>}

      <div
        className="relative rounded-md w-full flex items-center mt-1 px-2 ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-primary-500"
        ref={wrapperRef}>
        <IconSearch className="flex-none h-5 w-5" />
        <input
          className="w-full appearance-none border-none block px-3 h-10 focus:ring-0 placeholder:text-slate-400"
          type="text"
          name={name}
          value={inputValue}
          onChange={changeHandler}
          onFocus={changeHandler}
          onKeyDown={event => onEnterTag(event)}
          placeholder={placeholder}
          required={required}
        />
        {suggestionArr && <IconChevronDown className="flex-none h-5 w-5" />}
        {showDropdown && (
          <div className="absolute top-[44px] right-0 left-0 w-full h-fit max-h-36 mb-10 overflow-y-auto divide-y divide-slate-100 rounded-lg bg-dark-100 shadow-xl ring-1 ring-black ring-opacity-5">
            {suggestionArr && suggestionArr.length > 0 ? (
              <Fragment>
                {suggestionArr.map((suggestion, index) => (
                  <div
                    key={'suggestion_' + index}
                    className="p-2 text-slate-600 cursor-pointer hover:bg-primary-500 hover:text-slate-100"
                    onClick={e => handleClickSuggestion(e, suggestion)}>
                    {suggestion}
                  </div>
                ))}
              </Fragment>
            ) : allowCreate ? (
              <div
                className="p-2 text-slate-600 cursor-pointer hover:bg-primary-500 hover:text-slate-100"
                onClick={e => handleClickSuggestion(e, inputValue)}>
                Add &ldquo;{inputValue}&rdquo;
              </div>
            ) : (
              <p className="p-2 text-sm text-slate-500">
                We don&apos;t have this tag yet
              </p>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => {
          return (
            <div
              key={index}
              className="bg-primary-50 inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full border border-primary-500">
              <span className="truncate max-w-xs text-primary-500 font-bold">
                {tag}
              </span>
              <button
                onClick={() => {
                  onRemoveTag(index);
                }}
                className="text-primary-500 hover:opacity-70 focus:outline-none">
                <IconX className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
