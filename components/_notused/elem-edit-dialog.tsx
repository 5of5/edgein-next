import { FC, Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InputText } from '@/components/input-text';
import { IconX } from '@/components/icons';
import { ElemButton } from '../elem-button';
import { User_Groups } from '@/graphql/types';
import { groupSchema } from '@/utils/schema';
import { zodValidate } from '@/utils/validation';

type Props = {
  isOpen: boolean;
  loading?: boolean;
  fieldName: Partial<keyof User_Groups>;
  fieldLabel: string;
  fieldValue?: string;
  required?: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
};

const ElemEditDialog: FC<Props> = ({
  isOpen,
  loading = false,
  fieldName,
  fieldLabel,
  fieldValue,
  required,
  onClose,
  onSave,
}) => {
  useEffect(() => {
    setValue(fieldValue);
    setError('');
  }, [fieldValue]);

  const [value, setValue] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const onValidate = (value: string) => {
    setValue(value);

    const { errors } = zodValidate({ [fieldName]: value }, groupSchema);
    if (errors) {
      if (fieldName === 'name' || fieldName === 'description') {
        setError(errors[fieldName]?.[0] || '');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  };

  const onSaveBtn = () => {
    if (error) {
      return;
    }

    onSave(value || '');
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform rounded-lg bg-slate-100 shadow-xl transition-all overflow-hidden">
                <div className="flex items-center justify-between px-6 py-2 bg-black border-b border-black/10">
                  <h2 className="text-xl font-bold capitalize">
                    {`Edit ${fieldLabel}`}
                  </h2>
                  <button
                    onClick={onClose}
                    type="button"
                    className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100">
                    <IconX className="h-6 w-6" title="close" />
                  </button>
                </div>
                <div className="p-6 flex flex-col gap-y-6">
                  <div>
                    <InputText
                      onChange={event => onValidate(event?.target.value)}
                      name="name"
                      type="text"
                      value={value}
                      className={`${
                        error
                          ? 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                          : 'ring-1 ring-slate-200'
                      }`}
                    />
                    {error && (
                      <div className="mt-2 font-bold text-sm text-rose-400">
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-x-4">
                    <ElemButton onClick={onClose} roundedFull btn="gray">
                      Cancel
                    </ElemButton>
                    <ElemButton
                      onClick={onSaveBtn}
                      roundedFull
                      btn="primary"
                      loading={loading}
                      disabled={(required && !value) || Boolean(error)}>
                      Save
                    </ElemButton>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ElemEditDialog;
