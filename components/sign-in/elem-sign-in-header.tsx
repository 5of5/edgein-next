import { FC } from 'react';
import { ElemLogo } from '@/components/elem-logo';
import { ElemLink } from '../elem-link';

type Props = {
  rightComponent?: JSX.Element | null;
};

export const ElemSignInHeader: FC<Props> = ({ rightComponent }) => {
  return (
    <nav
      className="px-5 py-3.5 z-50 flex items-center justify-center border-b border-slate-200 bg-black"
      aria-label="Global">
      <ElemLink href="/" className="w-auto outline-none">
        <ElemLogo mode="logo" className="w-auto h-6" />
      </ElemLink>

      {rightComponent && (
        <div className="absolute right-5">{rightComponent}</div>
      )}
    </nav>
  );
};
