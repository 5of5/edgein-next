import { Switch } from '@headlessui/react';
import { FC } from 'react';

type Props = {
  checked: boolean;
  label: string;
  className?: string;
  onChange: (v: boolean) => void;
};

const InputSwitch: FC<Props> = props => {
  const { checked, label, className = '', onChange } = props;
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="font-medium mr-2">{label}</Switch.Label>
        <Switch
          checked={checked}
          onChange={onChange}
          className={`${
            checked ? 'bg-primary-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full ${className}`}
        >
          <span
            className={`${
              checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};
export default InputSwitch;
