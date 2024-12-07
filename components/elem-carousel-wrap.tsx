import React, {
  FC,
  PropsWithChildren,
  useState,
  useRef,
  useEffect,
} from 'react';
import { IconChevronLeft, IconChevronRight } from '@/components/icons';

type Props = {
  className?: string;
};

export const ElemCarouselWrap: FC<PropsWithChildren<Props>> = ({
  className = '',
  children,
}) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState<any>(0);
  const carousel: any = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState: number) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState: number) => prevState + 1);
    }
  };

  const isDisabled = (direction: string) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className={`${className}`}>
      <div className="relative overflow-hidden">
        <div className="absolute top left flex justify-between w-full h-full">
          <button
            onClick={movePrev}
            className="cursor-pointer bg-gradient-to-r from-white w-10 h-full rounded-lg group z-10 p-0 m-0 disabled:opacity-0 active:bg-transparent focus:bg-transparent"
            disabled={isDisabled('prev')}>
            <div className="flex items-center justify-center bg-black ring-inset ring-1 ring-slate-200 rounded-full w-10 h-10 opacity-75 transition-all ease-in-out duration-150 group-hover:opacity-100 group-hover:bg-slate-200 group-hover:text-primary-500 sm:ml-1">
              <IconChevronLeft title="Prev" className="h-6 w-6" />
            </div>
            <span className="sr-only">Prev</span>
          </button>

          <button
            onClick={moveNext}
            className="cursor-pointer bg-gradient-to-l from-white w-10 h-full rounded-lg group z-10 p-0 m-0 transition-all ease-in-out duration-300 disabled:opacity-0"
            disabled={isDisabled('next')}>
            <div className="flex items-center justify-center bg-black ring-inset ring-1 ring-slate-200 rounded-full w-10 h-10 opacity-75 transition-all ease-in-out duration-150 group-hover:opacity-100 group-hover:bg-slate-200 group-hover:text-primary-500 sm:-ml-1">
              <IconChevronRight title="Next" className="h-6 w-6" />
            </div>

            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="relative flex flex-row overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x">
          {children}
        </div>
      </div>
    </div>
  );
};
