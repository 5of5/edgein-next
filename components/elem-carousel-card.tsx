import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

export const ElemCarouselCard: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={`snap-start shrink-0 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
