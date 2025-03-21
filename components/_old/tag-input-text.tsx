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
          className={`font-medium text-sm cursor-text ${labelClass}`}>
          {label}
        </label>
      )}
      {sublabel && <p className="mb-2 text-sm text-slate-600">{sublabel}</p>}
      <div>
        <div className="flex items-center w-full px-2 mt-1 rounded-md ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-primary-500">
          <IconSearch className="flex-none w-5 h-5" />
          <input
            value={inputValue}
            name={name}
            onChange={event => setInputValue(event.target.value)}
            type="text"
            onKeyDown={event => onEnterTag(event)}
            className="block w-full h-10 px-3 border-none appearance-none focus:ring-0 placeholder:text-slate-400"
            placeholder={placeholder}
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => {
            return (
              <div
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 text-sm border rounded-full bg-primary-50 border-primary-500">
                <span className="max-w-xs font-bold truncate text-primary-500">
                  {tag}
                </span>
                <button
                  onClick={() => {
                    onRemoveTag(index);
                  }}
                  className="text-primary-500 hover:opacity-70 focus:outline-none">
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
