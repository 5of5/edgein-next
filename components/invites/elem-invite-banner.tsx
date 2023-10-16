import { FC, useState, useEffect, MouseEvent } from 'react';
import { SHOW_INVITE_BANNER } from '@/utils/constants';
import { IconX, IconArrowRight } from '../icons';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';

type Props = {
  className?: string;
};

export const ElemInviteBanner: FC<Props> = ({ className = '' }) => {
  const { user } = useUser();

  const router = useRouter();

  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowBanner(
        localStorage.getItem(SHOW_INVITE_BANNER) === null ||
          localStorage.getItem(SHOW_INVITE_BANNER) === 'true',
      );
    }
  }, []);

  const handleCloseBanner = (event: MouseEvent) => {
    setShowBanner(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SHOW_INVITE_BANNER, 'false');
    }
    event.preventDefault();
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      <ElemLink
        href={user ? ROUTES.INVITE_A_FRIEND : ROUTES.SIGN_IN}
        className="flex items-center justify-center gap-x-6 px-6 py-2.5 bg-primary-500 rounded-lg sm:px-3.5"
      >
        <div className=" text-white">
          Invite a friend and get{' '}
          <strong className="font-bold">1,500 credits</strong> for 1 month of
          EdgeIn for free{' '}
          <IconArrowRight className="inline-block h-5 w-5" title="Invite" />
        </div>
      </ElemLink>
      <button
        type="button"
        onClick={handleCloseBanner}
        className="absolute top-0 right-2 bottom-0 focus-visible:outline-offset-[-4px]"
      >
        <span className="sr-only">Dismiss</span>
        <IconX className="h-5 w-5 text-white" aria-hidden="true" />
      </button>
    </div>
  );
};
