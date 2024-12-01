import React, {
  useState,
  FC,
  ChangeEventHandler,
  KeyboardEvent,
  useEffect,
} from 'react';
import { IconX } from './icons';

type Props = {
  inputValue: string;
  value: Array<string>;
  placeholder?: string;
  onChangeInput: ChangeEventHandler<HTMLInputElement>;
  onChange: (tags: Array<string>) => void;
  subtext?: string;
};

export const ElemTagsInput: FC<Props> = ({
  inputValue,
  value,
  placeholder = '',
  onChangeInput,
  onChange,
  subtext = '',
}) => {
  const [tags, setTags] = useState<Array<string>>(value);

  useEffect(() => {
    setTags(value);
  }, [value]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const target = event.target as HTMLInputElement;
    const data = target.value;
    if (!data.trim()) return;
    setTags([...tags, data]);
    onChange([...tags, data]);
    target.value = '';
  };

  const removeTag = (data: string) => {
    const newTags = tags.filter(item => item !== data);
    setTags(newTags);
    onChange(newTags);
  };

  return (
    <div>
      <div className="flex items-end flex-wrap px-3 py-1.5 text-sm border rounded-3xl ring-slate-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:outline-none">
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {tags.map(tag => (
              <div
                className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-full text-sm bg-slate-200"
                key={tag}>
                <span>{tag}</span>
                <button
                  onClick={() => {
                    removeTag(tag);
                  }}
                  className="text-slate-500 hover:opacity-70 focus:outline-none">
                  <IconX className="w-3 h-3" title="close" />
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="text"
          className="flex-1 py-1 text-dark-500 text-sm relative bg-dark-100 rounded-full border-none outline-none ring-0 placeholder:text-slate-400 focus:outline-none focus:ring-0"
          placeholder={placeholder}
          value={inputValue}
          onChange={onChangeInput}
          onKeyDown={handleKeyDown}
        />
      </div>
      {subtext && <p className="mt-1 text-xs text-slate-600">{subtext}</p>}
    </div>
  );
};
