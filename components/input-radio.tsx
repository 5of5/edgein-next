import React from 'react';

type Props = {
  className?: string;
  inputClass?: string;
  labelClass?: string;
  name?: string;
  label?: string;
  value: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const InputRadio: React.FC<Props> = ({
  className,
  inputClass,
  labelClass,
  label,
  value,
  checked,
  onChange,
  ...props
}) => {
  return (
    <label
      className={`flex items-center text-sm font-normal text-gray-500 cursor-pointer mb-1 ${labelClass}`}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className={`appearance-none text-primary-500 accent-primary-500 focus:ring-0 bg-dark-100 checked:border-none ${inputClass}`}
        {...props}
      />
      <span className={`ml-2 ${labelClass}`}>{label}</span>
    </label>
  );
};
