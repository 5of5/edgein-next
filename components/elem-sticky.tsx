import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';

type Props = {
  className?: string;
  activeClass?: string;
  fromTop?: number;
};

export const ElemSticky: React.FC<PropsWithChildren<Props>> = ({
  className = '',
  activeClass = '',
  fromTop = 0,
  children,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [elementHeight, setElementHeight] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();

        if (!active && rect.top <= fromTop) {
          setActive(true);
          setElementHeight(rect.height);
        } else if (
          active &&
          placeholderRef.current &&
          placeholderRef.current.getBoundingClientRect().top > fromTop
        ) {
          setActive(false);
        }

        setScrollPosition(window ? window.scrollY : 0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [active, fromTop]);

  return (
    <>
      <div
        ref={placeholderRef}
        style={{ height: active ? elementHeight : 0 }}
      />
      <div
        ref={elementRef}
        className={`${
          active ? 'fixed' : 'relative'
        } transition-all ${className} ${active && activeClass}`}
        style={{
          top: active ? `${fromTop}px` : 'auto',
          left: active ? '0' : 'auto',
          right: active ? '0' : 'auto',
          width: active ? '100%' : 'auto',
        }}>
        {children}
      </div>
    </>
  );
};
