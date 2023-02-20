import React from "react";

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
      className={`flex items-center text-sm font-Metropolis font-normal text-slate-600 cursor-pointer ${labelClass}`}
    >
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className={inputClass}
        {...props}
      />
      <span className={`ml-2 ${labelClass}`}>{label}</span>
    </label>
  );
};
