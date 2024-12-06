import { Switch } from '@headlessui/react';
import { FC } from 'react';

type Props = {
  checked: boolean;
  label?: string;
  className?: string;
  onChange: (v: boolean) => void;
  disabled?: boolean;
};

export const InputSwitch: FC<Props> = props => {
  const { checked, label, className = '', onChange, disabled } = props;
  return (
    <Switch.Group>
      <div className="flex items-center">
        {label && (
          <Switch.Label className="mr-2 text-sm font-medium">
            {label}
          </Switch.Label>
        )}
        <Switch
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className={`${
            checked ? 'bg-primary-500' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-all ${className}`}>
          <span
            className={`${
              checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-black transition`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};
