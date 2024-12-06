import React, { PropsWithChildren, forwardRef, useRef } from 'react';

type Props = {
  className?: string;
  labelClass?: string;
  label?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onClick?: React.MouseEventHandler<HTMLTextAreaElement>;
} & { ref?: React.Ref<HTMLTextAreaElement> };

export const InputTextarea: React.FC<PropsWithChildren<Props>> = forwardRef(
  (
    {
      className = '',
      labelClass = '',
      label,
      name,
      value,
      onChange,
      placeholder = '',
      required = false,
      rows = 2,
      onKeyDown,
      onClick,
    },
    ref,
  ) => {
    const localRef = useRef(null);
    const textareaRef = ref || localRef;

    return (
      <>
        {label && (
          <label
            htmlFor={name}
            className={`font-medium text-sm cursor-text ${labelClass}`}>
            {label}
          </label>
        )}
        <textarea
          className={`appearance-none resize-none w-full mt-1 px-3 py-2 text-sm relative bg-black rounded-lg border-none outline-none ring-1 ring-gray-300 hover:bg-gray-50 focus:ring-gray-300 focus:outline-none placeholder:text-gray-500 ${className}`}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows}
          onKeyDown={onKeyDown}
          onClick={onClick}
          ref={textareaRef}
        />
      </>
    );
  },
);

InputTextarea.displayName = 'InputTextarea';
