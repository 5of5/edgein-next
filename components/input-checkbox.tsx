import React, { useState } from 'react';

type Props = {
  className?: string;
  inputClass?: string;
  labelClass?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

export const InputCheckbox: React.FC<Props> = ({
  className,
  inputClass,
  labelClass,
  label,
  checked,
  disabled,
  ...props
}) => {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <>
      <label
        className={`relative inline-flex items-center gap-2 cursor-pointer ${className} ${
          isChecked ? 'Selected' : 'Unchecked'
        }`}>
        <input
          type="checkbox"
          {...props}
          checked={isChecked}
          disabled={disabled}
          onChange={event => {
            setIsChecked(prev => !prev);
            if (props.onChange) {
              props.onChange(event);
            }
          }}
          className={`appearance-none w-4 h-4 border rounded border-slate-300 hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:checked:bg-primary-500  ${inputClass}`} //indeterminate:bg-primary-500 indeterminate:hover:bg-primary-500
        />
        {label && <span className={`${labelClass}`}>{label}</span>}
      </label>
    </>
  );
};
