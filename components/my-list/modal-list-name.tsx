import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useState, useEffect } from 'react';
import { ElemButton } from '@/components/elem-button';
import { InputText } from '@/components/input-text';
import { IconX } from '@/components/icons';
import { listSchema } from '@/utils/schema';
import { zodValidate } from '@/utils/validation';

type Props = {
  isOpen: boolean;
  theListName?: string;
  onCloseModal: () => void;
  onSave: (name: string) => void;
};

export const ModalListName: FC<Props> = ({
  isOpen,
  theListName,
  onCloseModal,
  onSave,
}) => {
  useEffect(() => {
    setName(theListName);
    setError('');
  }, [theListName]);

  const [name, setName] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const validateName = (value: string) => {
    setName(value);
    const { errors } = zodValidate({ name: value }, listSchema);
    if (errors) {
      setError(errors['name']?.[0] || '');
    } else {
      setError('');
    }
  };

  const onSaveBtn = () => {
    if (error || !name) {
      return;
    }

    if (name) {
      validateName(name);
      onSave(name);
      onCloseModal();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
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
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-lg bg-slate-100 shadow-xl transition-all overflow-hidden">
                <div className="flex items-center justify-between px-6 py-2 bg-white border-b border-black/10">
                  <h2 className="text-xl font-bold capitalize">
                    Edit List Name
                  </h2>
                  <button
                    onClick={onCloseModal}
                    type="button"
                    className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100"
                  >
                    <IconX className="h-6 w-6" title="close" />
                  </button>
                </div>
                <div className="p-6 flex flex-col gap-y-6">
                  <div>
                    <InputText
                      onChange={e => validateName(e?.target.value)}
                      name="name"
                      type="text"
                      value={name}
                      className={`${
                        error === ''
                          ? 'ring-1 ring-slate-200'
                          : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                      }`}
                    />
                    {error && (
                      <div className="mt-2 font-bold text-sm text-rose-400">
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-x-6">
                    <ElemButton
                      onClick={onCloseModal}
                      roundedFull
                      btn="default"
                    >
                      Cancel
                    </ElemButton>
                    <ElemButton
                      onClick={onSaveBtn}
                      disabled={name === '' || Boolean(error)}
                      roundedFull
                      btn="primary"
                    >
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
