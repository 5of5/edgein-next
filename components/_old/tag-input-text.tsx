import React, { PropsWithChildren, useState } from 'react';
import { IconSearch, IconX } from '../icons';

type Props = {
  className?: string;
  labelClass?: string;
  label?: string;
  sublabel?: string;
  type?: 'text' | 'email' | 'search' | '';
  name: string;
  value: string;
  onChange: (tags: string[]) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  defaultTags?: string[];
};

export const TagInputText: React.FC<PropsWithChildren<Props>> = ({
  className = '',
  labelClass = '',
  label,
  sublabel,
  type = '',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  autoComplete = 'on',
  defaultTags = [],
}) => {
  const [tags, setTags] = useState(defaultTags);
  const [inputValue, setInputValue] = useState('');

  function onEnterTag(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == 'Enter') {
      if ((event.target as HTMLInputElement).value) {
        setTags([...tags, (event.target as HTMLInputElement).value]);
        onChange([...tags, (event.target as HTMLInputElement).value]);
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
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className={`block font-medium text-sm text-gray-300 mb-1 ${labelClass}`}>
          {label}
        </label>
      )}
      {sublabel && <p className="mb-2 text-sm text-gray-500">{sublabel}</p>}
      <div>
        <div className="flex items-center w-full px-3 py-2 rounded-md border border-neutral-700 focus-within:border-primary-500 focus-within:ring focus-within:ring-primary-500/20 bg-neutral-900 transition-colors">
          <IconSearch className="flex-none w-5 h-5 text-gray-400" />
          <input
            value={inputValue}
            name={name}
            onChange={event => setInputValue(event.target.value)}
            type="text"
            onKeyDown={event => onEnterTag(event)}
            className="block w-full px-3 py-0.5 text-sm bg-transparent border-none appearance-none focus:ring-0 text-gray-300 placeholder:text-gray-500"
            placeholder={placeholder}
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => {
            return (
              <div
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-neutral-800 text-gray-300 border border-neutral-700 rounded-md">
                <span className="max-w-xs font-medium truncate">{tag}</span>
                <button
                  onClick={() => {
                    onRemoveTag(index);
                  }}
                  className="text-gray-400 hover:text-gray-300 transition-colors focus:outline-none">
                  <IconX className="w-4 h-4" strokeWidth={3} title="close" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
