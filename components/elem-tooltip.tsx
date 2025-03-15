import { default as TheTooltip } from '@mui/material/Tooltip';
import React, { FC, PropsWithChildren } from 'react';

type Props = {
  className?: string;
  classNameArrow?: string;
  arrow?: boolean;
  direction?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';
  mode?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  content?: any;
  delay?: number;
};

export const ElemTooltip: FC<PropsWithChildren<Props>> = ({
  className = '',
  classNameArrow = '',
  arrow = true,
  direction = 'top',
  mode = 'dark',
  content,
  size = 'md',
  children,
  delay = 0,
}: any) => {
  //style
  let modeClasses = '';
  let modeArrowClasses = '';
  if (mode === 'dark') {
    modeClasses = '!bg-gray-600/90 !text-gray-300';
    modeArrowClasses = 'before:!text-gray-600/90';
  } else {
    modeClasses = '!bg-gray-50 !text-gray-600 !border ! border-neutral-700';
    modeArrowClasses =
      'before:!text-gray-50 before:!border before:! border-neutral-700';
  }

  // Sizes
  let sizeClasses = '';
  if (size === 'sm') {
    sizeClasses = '!max-w-[9rem]';
  } else if (size === 'md') {
    sizeClasses = '!max-w-[16rem]';
  } else if (size === 'lg') {
    sizeClasses = '!max-w-[24rem]';
  }

  return (
    <TheTooltip
      title={content}
      placement={direction}
      arrow={arrow}
      enterNextDelay={delay}
      classes={{
        tooltip: `${className} ${sizeClasses} ${modeClasses} !px-2 !py-1 !text-sm !font-medium !font-sans`,
        arrow: `${classNameArrow} ${modeArrowClasses}`,
        tooltipPlacementBottom: '!mt-1',
        tooltipPlacementTop: '!mb-1',
        tooltipPlacementRight: '!ml-1',
        tooltipPlacementLeft: '!mr-1',
      }}
      // open={true}
    >
      {children}
    </TheTooltip>
  );
};
