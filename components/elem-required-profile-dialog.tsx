import { FC } from 'react';
import { ElemButton } from '@/components/elem-button';
import { usePopup } from '@/context/popup-context';
import { ElemModal } from './elem-modal';

type Props = {
  isOpen: boolean;
  title: string;
  content?: string;
  onClose: () => void;
};

export const ElemRequiredProfileDialog: FC<Props> = ({
  isOpen,
  title,
  content,
  onClose,
}) => {
  const { setShowPopup } = usePopup();

  const onSearchName = () => {
    if (setShowPopup) {
      setShowPopup('search');
    }
  };

  return (
    <ElemModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseIcon={true}
      placement="center"
      panelClass="relative w-full max-w-lg bg-black rounded-lg px-4 py-3 z-40 my-10">
      <div className="pb-3 border-b border-gray-200">
        <h2 className="text-xl font-medium">{title}</h2>
      </div>

      <div className="mt-2 text-gray-500">
        <p className="text-gray-500">{content}</p>
      </div>

      <div className="flex justify-start pt-3 mt-3">
        <ElemButton
          onClick={() => {
            onSearchName();
            onClose();
          }}
          btn="primary">
          Search name
        </ElemButton>
      </div>
    </ElemModal>
  );
};
