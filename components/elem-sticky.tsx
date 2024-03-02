import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';

type Props = {
  className?: string;
  activeClass?: string;
  fromTop?: number;
};

export const ElemSticky: React.FC<PropsWithChildren<Props>> = ({
  className = '',
  activeClass = '',
  fromTop,
  children,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const boundingRect = elementRef.current.getBoundingClientRect();
        setTimeout(() => {
          if (scrollPosition >= boundingRect.top) {
            setActive(true);
          } else {
            setActive(false);
          }
        }, 300);

        setScrollPosition(window ? window.scrollY : 0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef, scrollPosition]);

  return (
    <>
      <div
        ref={elementRef}
        className={`sticky z-30 transition-all ${className} ${
          active && activeClass
        }`}
        style={active && fromTop ? { top: `${fromTop}px` } : {}}
      >
        {children}
      </div>
    </>
  );
};
