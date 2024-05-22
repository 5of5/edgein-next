import { FC, useState, useEffect, MouseEvent } from 'react';
import { SHOW_DEMOCRATIZE_BANNER } from '@/utils/constants';
import { IconX, IconArrowRight } from '../icons';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';

type Props = {
  className?: string;
};

export const ElemDemocratizeBanner: FC<Props> = ({ className = '' }) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowBanner(
        localStorage.getItem(SHOW_DEMOCRATIZE_BANNER) === null ||
          localStorage.getItem(SHOW_DEMOCRATIZE_BANNER) === 'true',
      );
    }
  }, []);

  const handleCloseBanner = (event: MouseEvent) => {
    setShowBanner(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SHOW_DEMOCRATIZE_BANNER, 'false');
    }
    event.preventDefault();
  };

  if (!showBanner) {
    return null;
  }

  return (
    <ElemLink href={ROUTES.DEMOCRATIZE24} className={`block ${className} `}>
      <div
        className={`cursor-pointer flex items-center gap-x-6 px-6 py-2.5 bg-primary-500 rounded-lg sm:px-3.5 sm:before:flex-1`}>
        <div className="text-white">
          <strong className="font-bold">
            Democratize24: March 20-21, 2024
          </strong>{' '}
          - The ultimate 2-day deal making summit giving you an Edge in AI and
          Web3.{' '}
          <IconArrowRight
            className="inline-block w-5 h-5"
            title="Register Now"
          />
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
