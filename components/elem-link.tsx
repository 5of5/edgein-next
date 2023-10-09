import { FC, AnchorHTMLAttributes, PropsWithChildren } from 'react';
import Link from 'next/link';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  className?: string;
};

export const ElemLink: FC<PropsWithChildren<Props>> = ({
  className = '',
  href,
  children,
  ...props
}) => {
  return (
    <Link href={href} passHref>
      <a className={className} {...props}>
        {children}
      </a>
    </Link>
  );
};
