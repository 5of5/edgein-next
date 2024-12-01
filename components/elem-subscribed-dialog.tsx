import { IconCheck } from '@/components/icons';
import { ElemModal } from './elem-modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ElemSubscribedDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <ElemModal
        isOpen={isOpen}
        onClose={onClose}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-lg bg-dark-100 rounded-lg px-6 py-6 z-10 my-10">
        <div className="flex w-12 h-12 p-2 mb-4 bg-dark-100 rounded-full shadow">
          <IconCheck className="w-10 aspect-square text-primary-500" />
        </div>

        <div>
          <h2 className="text-xl font-medium">
            Purchase Complete!
            <br /> Welcome to EdgeIn Contributor!
          </h2>
        </div>

        <p className="pt-1 text-gray-600">
          As a contributor, you help support our free community data model. Get
          real-time updates on the companies, people, deals and events you’re
          most interested in, giving you an unprecedented edge in web3.
        </p>
      </ElemModal>
    </>
  );
};
