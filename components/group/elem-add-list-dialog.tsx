import { FC, useEffect, useState } from 'react';
import { ElemButton } from '@/components/elem-button';
import { InputSelect } from '../input-select';
import { ElemModal } from '../elem-modal';

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
    <ElemModal
      isOpen={isOpen}
      onClose={onCloseModal}
      showCloseIcon={true}
      placement="center"
      panelClass="relative w-full max-w-lg bg-dark-100 rounded-lg px-6 pt-6 pb-3 z-10 my-10 !overflow-visible">
      <div>
        <h2 className="text-xl font-medium">Add List(s)</h2>
      </div>

      <p className="pt-1 text-gray-600">
        Share your lists or lists you follow with this group.
      </p>

      <div className="py-3">
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

      <div className="flex items-center justify-end pt-3 mt-3 border-t border-gray-200 gap-x-2">
        <ElemButton onClick={onCloseModal} roundedFull btn="default">
          Cancel
        </ElemButton>

        <ElemButton
          btn="primary"
          disabled={selectedLists.length === 0}
          onClick={onSaveBtn}>
          Share list
        </ElemButton>
      </div>
    </ElemModal>
  );
};

export default ElemAddListDialog;
