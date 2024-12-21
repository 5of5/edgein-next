import { FC } from 'react';
import { IconArrowUp } from '@/components/icons';

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
          btn="default"
          size="sm"
          className="!fixed z-10 left-1/2 lg:left-[calc(50%+8rem)] bottom-16 lg:bottom-5 -translate-x-1/2 text-sm shadow-lg transition-all hover:scale-110 !bg-white !text-black">
          <IconArrowUp className="w-4 h-4 mr-1.5" /> Back to Top
        </ElemButton>
      )}
    </>
  );
};
