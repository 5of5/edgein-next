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
            className={`block font-medium text-sm text-gray-300 mb-1 ${labelClass}`}>
            {label}
          </label>
        )}
        <textarea
          className={`w-full px-3 py-2.5 text-sm bg-neutral-900 text-gray-300 rounded-md border border-neutral-700 outline-none resize-none focus:border-primary-500 focus:ring focus:ring-primary-500/20 transition-colors placeholder:text-gray-500 ${className}`}
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
