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
    modeClasses =
      '!bg-black !text-white !border !border-gray-300 hover:!border-gray-400 transition-colors';
    modeArrowClasses = 'before:!text-black';
  } else {
    modeClasses =
      '!bg-black-50 !text-gray-300 !border !border-gray-300 hover:!border-gray-400 transition-colors';
    modeArrowClasses =
      'before:!text-gray-50 before:border before:border-gray-300 hover:before:border-gray-400 transition-colors';
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
