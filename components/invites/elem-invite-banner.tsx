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

  const handleClickBanner = (event: MouseEvent<HTMLDivElement>) => {
    if (!user) {
      event.preventDefault();
      router.push(ROUTES.SIGN_IN);
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <ElemLink href={ROUTES.REFERRALS_AND_POINTS}>
      <div
        className={`cursor-pointer flex items-center gap-x-6 px-6 py-2.5 bg-primary-500 rounded-lg sm:px-3.5 sm:before:flex-1 ${className}`}>
        <div className="text-white" onClick={handleClickBanner}>
          Claim your profile, correct data, or refer a friend to get{' '}
          <strong className="font-bold">1,500-4,500 points</strong> for 1-3
          months of EdgeIn for free{' '}
          <IconArrowRight className="inline-block w-5 h-5" title="Invite" />
        </div>
        <div className="flex justify-end flex-1">
          <button
            type="button"
            onClick={handleCloseBanner}
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
            <span className="sr-only">Dismiss</span>
            <IconX className="w-5 h-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </ElemLink>
  );
};
