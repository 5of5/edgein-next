import { PropsWithChildren } from 'react';
import { ElemButton } from '@/components/elem-button';
import { loadStripe } from '@/utils/stripe';
import { useUser } from '@/context/user-context';
import { ROUTES } from '@/routes';
import { ElemModal } from './elem-modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export const ElemUpgradeDialog: React.FC<PropsWithChildren<Props>> = ({
  isOpen,
  onClose,
  title,
}) => {
  const { user } = useUser();

  const defaultTitle = user
    ? 'Gain access to unlimited data, lists, and groups with an Mentibus Contributor trial.'
    : 'Gain access to unlimited data, lists, and groups with Mentibus Contributor.';

  return (
    <ElemModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseIcon={true}
      placement="center"
      panelClass="relative w-full max-w-lg bg-black rounded-lg px-4 py-3 z-40 my-10">
      <div className="mt-6">
        <h2 className="text-xl font-medium text-center">
          {title ? title : defaultTitle}
        </h2>
      </div>
      <div className="mt-2 text-center text-gray-500">
        <p className="text-gray-500">
          Mentibus customers close deals faster thanks to real-time updates on
          relevant companies, investors, people, and deals.
        </p>
      </div>

      <div className="flex justify-center pt-3 mt-3 border-t  border-neutral-700">
        {user ? (
          <ElemButton onClick={() => loadStripe()} btn="primary">
            Start free trial
          </ElemButton>
        ) : (
          <ElemButton btn="primary" href={ROUTES.SIGN_IN}>
            Sign in to start
          </ElemButton>
        )}
      </div>
    </ElemModal>
  );
};
