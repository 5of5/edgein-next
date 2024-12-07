import { FC } from 'react';
import { IconSidebarNotes } from '@/components/icons';
import { useUser } from '@/context/user-context';
import { ElemWithSignInModal } from '../elem-with-sign-in-modal';
import { ElemSidebarItem } from './elem-sidebar-item';
import { ROUTES } from '@/routes';
import { useSidebar } from '@/context/sidebar-context';

type Props = {
  className?: string;
};

const ElemMyNotesMenu: FC<Props> = ({ className = '' }) => {
  const { showSidebar, setShowSidebar } = useSidebar();
  const { user } = useUser();

  return (
    <li className={className}>
      {user ? (
        <ElemSidebarItem
          IconComponent={IconSidebarNotes}
          text="Notes"
          url={ROUTES.NOTES}
          onClick={() => setShowSidebar(false)}
        />
      ) : (
        <ElemWithSignInModal
          wrapperClass="w-full"
          text="Sign in to make private or public notes on companies and investors profiles."
          buttonComponent={open => (
            <button
              className={`${
                open ? 'bg-neutral-900' : ''
              } flex w-full items-center space-x-3 p-2.5 font-medium text-sm text-gray-300 rounded-md flex-1 transition-all hover:bg-neutral-900`}>
              <IconSidebarNotes
                className={`w-5 h-5 ${
                  open ? 'text-primary-500' : 'text-gray-300'
                }`}
              />
              <p className="text-sm font-medium text-gray-300">Notes</p>
            </button>
          )}
        />
      )}
    </li>
  );
};

export default ElemMyNotesMenu;
