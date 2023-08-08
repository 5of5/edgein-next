import { FC, Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ElemButton } from '@/components/elem-button';
import { IconX } from '@/components/icons';
import { InputSelect } from '../input-select';

type Props = {
  isOpen: boolean;
  listOptions?: Array<any>;
  onCloseModal: () => void;
  onSave: (listIds: Array<number>) => void;
};

const ElemAddListDialog: FC<Props> = ({
  isOpen,
  listOptions = [],
  onCloseModal,
  onSave,
}) => {
  const [selectedLists, setSelectedLists] = useState<Array<any>>([]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedLists([]);
      }, 300);
    }
  }, [isOpen]);

  const onSaveBtn = () => {
    const listIds = selectedLists.map((item: any) => item.id);
    onSave(listIds);
    onCloseModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onCloseModal}>
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
              <Dialog.Panel className="w-full max-w-md transform rounded-lg bg-slate-100 shadow-xl transition-all">
                <div className="flex items-center justify-between px-6 py-2 bg-white rounded-t-2xl border-b border-black/10">
                  <h2 className="text-xl font-bold capitalize">Add List</h2>
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
                    <InputSelect
                      className="w-full"
                      buttonClasses="w-full"
                      dropdownClasses="w-full"
                      multiple
                      by="id"
                      value={selectedLists}
                      onChange={setSelectedLists}
                      options={listOptions}
                      placeholder="Add list to group"
                    />
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
                      roundedFull
                      btn="primary"
                      disabled={selectedLists.length === 0}
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

export default ElemAddListDialog;
