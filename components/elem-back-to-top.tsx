import { FC } from 'react';
import { IconChevronUp } from '@/components/icons';

import React, { useState, useEffect } from 'react';
import { ElemButton } from './elem-button';

type Props = {};

export const ElemBackToTop: FC<Props> = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (
      document.body.scrollTop > 150 ||
      document.documentElement.scrollTop > 150
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const backToTop = () => {
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showButton && (
        <ElemButton
          onClick={backToTop}
          btn="dark"
          className="!fixed shadow gap-2 h-12 w-12 bottom-[64px] right-[80px] transition-all hover:scale-110 lg:bottom-[20px]"
        >
          <IconChevronUp className="w-6 h-6" />
          {/* Back to top */}
        </ElemButton>
      )}
    </>
  );
};
