import React from 'react';
import { IconProps } from './icons';
import { LucideIcon } from 'lucide-react';

// This wrapper adapts Lucide React icons to work with our IconProps interface
export const LucideIconWrapper = (
  LucideComponent: LucideIcon,
): React.FC<IconProps> => {
  const WrappedIcon: React.FC<IconProps> = ({
    className,
    strokeWidth = 1.5,
    title,
    width,
    height,
  }) => {
    return (
      <LucideComponent
        className={className}
        strokeWidth={strokeWidth}
        width={width}
        height={height}
        aria-hidden={!title}>
        {title && <title>{title}</title>}
      </LucideComponent>
    );
  };

  return WrappedIcon;
};
