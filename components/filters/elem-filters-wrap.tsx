import React, { PropsWithChildren, useEffect, useState } from 'react';
import { IconFilter } from '@/components/icons';
import { ElemSticky } from '@/components/elem-sticky';
import { ElemModal } from '@/components/elem-modal';
import { ElemButton } from '@/components/elem-button';
import { numberWithCommas } from '@/utils';

type Props = {
  resultsTotal?: number;
};

export const ElemFiltersWrap: React.FC<PropsWithChildren<Props>> = ({
  children,
  resultsTotal,
}) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // tailwind lg = 1024px
      if (window.innerWidth > 1024) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <ElemSticky activeClass="top-[3rem] bg-opacity-30 bg-black backdrop-blur-lg shadow-sm">
        <div className="px-8 py-3" role="tablist">
          {isDesktop ? (
            <div className="flex flex-wrap w-full gap-3">{children}</div>
          ) : (
            <ElemButton
              btn="ol-primary"
              onClick={() => setShowMobileFilters(true)}
              roundedFull={false}
              className="w-full rounded-lg group">
              <IconFilter className="w-4 h-4 mr-1.5 text-inherit" />
              Filters
            </ElemButton>
          )}
        </div>
      </ElemSticky>

      <ElemModal
        isOpen={showMobileFilters && !isDesktop}
        onClose={() => setShowMobileFilters(false)}
        overlay={false}
        showCloseIcon={false}
        panelClass="w-full my-14 bg-black">
        <div className="flex flex-col h-[calc(100vh_-_7rem)] gap-4">
          <div className="sticky top-0 z-20 px-4 py-2 bg-black border-b  border-neutral-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">Filters</h2>
              <ElemButton
                btn="transparent"
                onClick={() => setShowMobileFilters(false)}
                className="!p-1"
                aria-label="Close">
                <span className="sr-only">Close</span>
                View {resultsTotal && numberWithCommas(resultsTotal)} results
              </ElemButton>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-4">{children}</div>

          <div className="px-4 mt-auto bg-black h-14">
            <div className="py-2 border-t  border-neutral-700">
              <ElemButton
                btn="primary"
                onClick={() => setShowMobileFilters(false)}
                className="!block !w-full ">
                View {resultsTotal && numberWithCommas(resultsTotal)} results
              </ElemButton>
            </div>
          </div>
        </div>
      </ElemModal>
    </>
  );
};
