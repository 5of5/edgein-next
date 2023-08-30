import { FC } from 'react';
import Link from 'next/link';
import { ElemLogo } from '@/components/elem-logo';

type Props = {
  rightComponent?: JSX.Element | null;
};

export const ElemSignInHeader: FC<Props> = ({ rightComponent }) => {
  return (
    <nav
      className="fixed top-0 left-0 right-0 px-5 py-3.5 z-50 flex items-center justify-center border-b border-slate-200 bg-white"
      aria-label="Global"
    >
      <Link href="/" passHref>
        <a className="w-auto outline-none">
          <ElemLogo mode="logo" className="h-6 w-auto" />
        </a>
      </Link>

      {rightComponent && (
        <div className="absolute right-5">{rightComponent}</div>
      )}
    </nav>
  );
};
