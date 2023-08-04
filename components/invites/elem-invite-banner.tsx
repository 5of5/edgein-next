import { FC, useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import { SHOW_INVITE_BANNER } from '@/utils/constants';
import { IconX, IconArrowRight } from '../icons';
import { useUser } from '@/context/user-context';
import { usePopup } from '@/context/popup-context';

type Props = {
  className?: string;
};

export const ElemInviteBanner: FC<Props> = ({ className = '' }) => {
  const { user } = useUser();

  const { setShowPopup } = usePopup();

  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowBanner(
        localStorage.getItem(SHOW_INVITE_BANNER) === null ||
          localStorage.getItem(SHOW_INVITE_BANNER) === 'true',
      );
    }
  }, []);

  const handleCloseBanner = () => {
    setShowBanner(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SHOW_INVITE_BANNER, 'false');
    }
  };

  const handleClickBanner = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      event.preventDefault();
      setShowPopup('signup');
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-x-6 px-6 py-2.5 bg-gradient-to-tr from-[#553BE5] to-[#8E7AFE] shadow rounded-lg sm:px-3.5 sm:before:flex-1 ${className}`}
    >
      <Link href={'/account'}>
        <a className="text-white" onClick={handleClickBanner}>
          Get <strong className="font-bold">1 month free</strong> for every
          person you invite to Edgein{' '}
          <IconArrowRight className="inline-block h-5 w-5" title="Invite" />
        </a>
      </Link>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          onClick={handleCloseBanner}
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">Dismiss</span>
          <IconX className="h-5 w-5 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
