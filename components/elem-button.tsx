import { FC, PropsWithChildren } from 'react';
import { IconSpinner } from '@/components/icons';
import { ElemLink } from './elem-link';

type Props = {
  className?: string;
  loading?: boolean;
  arrow?: boolean;
  arrowLeft?: boolean;
  arrowClass?: string;
  btn?:
    | 'primary'
    | 'ol-primary'
    | 'ol-white'
    | 'danger'
    | 'dark'
    | 'transparent'
    | 'gray'
    | 'default'
    | '';
  roundedFull?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | '';
  href?: string;
  target?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

interface ElemButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'filled' | 'outlined';
}

export const ElemButton: React.FC<ElemButtonProps> = ({ children, href, variant = 'filled' }) => {
  const baseStyles = {
    padding: '12px 24px',
    borderRadius: '50px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    display: 'inline-block',
    cursor: 'pointer',
    border: '2px solid transparent',
    position: 'relative' as const,
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'scale(1)',
  };

  const variants = {
    filled: {
      backgroundColor: 'white',
      color: 'black',
      ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      },
    },
    outlined: {
      backgroundColor: 'transparent',
      color: 'white',
      border: '2px solid white',
      ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
  };

  return (
    <a 
      href={href}
      style={{
        ...baseStyles,
        ...variants[variant],
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'scale(1.05)';
        target.style.boxShadow = variant === 'filled' 
          ? '0 10px 20px rgba(255, 255, 255, 0.2)'
          : '0 10px 20px rgba(255, 255, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'scale(1)';
        target.style.boxShadow = 'none';
      }}
    >
      {children}
    </a>
  );
};

type IconProps = {
  className?: string;
  title?: string;
};

const IconArrowLeft: React.FC<IconProps> = ({
  className,
  title = 'Arrow Left',
}) => {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} group-hover:transition group-hover:duration-150 group-hover:ease-in-out`}>
      <title>{title}</title>
      <path
        className="transition ease-in-out duration-150 group-hover:-translate-x-0.5"
        d="M5 1.36365L1 5.00001L5 8.63637"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="opacity-0 group-hover:opacity-100"
        d="M5 5H1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IconArrow: React.FC<IconProps> = ({ className, title = 'Arrow' }) => {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} group-hover:transition group-hover:duration-150 group-hover:ease-in-out`}>
      <title>{title}</title>
      <path
        className="transition ease-in-out duration-150 group-hover:translate-x-0.5"
        d="M1 1.36365L5 5.00001L1 8.63637"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="opacity-0 group-hover:opacity-100"
        d="M5 5H1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
