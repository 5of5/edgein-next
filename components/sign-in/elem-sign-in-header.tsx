import { FC } from 'react';
import { ElemLogo } from '@/components/elem-logo';
import { ElemLink } from '../elem-link';

type Props = {
  rightComponent?: JSX.Element | null;
};

export const ElemSignInHeader: FC<Props> = ({ rightComponent }) => {
  return (
    <nav
      className="px-6 py-6 sm:py-6 z-50 flex items-center justify-center border-b border-neutral-700 bg-black"
      aria-label="Global">
      <ElemLink href="/" className="select-none focus:outline-none">
        <ElemLogo
          mode="logo-inverted"
          className="w-auto h-6 select-none pointer-events-auto focus:outline-none"
        />
      </ElemLink>

      {rightComponent && (
        <div className="absolute right-6">{rightComponent}</div>
      )}
    </nav>
  );
};
