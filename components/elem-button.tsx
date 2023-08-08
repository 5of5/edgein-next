import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import { IconSpinner } from '@/components/icons';

type Props = {
  className?: string;
  loading?: boolean;
  arrow?: boolean;
  arrowLeft?: boolean;
  arrowClass?: string;
  btn?:
    | 'danger'
    | 'dark'
    | 'primary'
    | 'secondary'
    | 'primary-light'
    | 'transparent'
    | 'white'
    | 'gray'
    | 'slate'
    | 'ol-white'
    | 'ol-primary'
    | 'default'
    | '';
  roundedFull?: boolean;
  size?: 'sm' | 'lg' | '';
  href?: string;
  target?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ElemButton: FC<PropsWithChildren<Props>> = ({
  className = '',
  loading = false,
  arrow = false,
  arrowLeft = false,
  arrowClass = '',
  btn = '',
  roundedFull = true,
  size = '',
  href = '',
  target = '_self',
  disabled = false,
  children,
  onClick,
}) => {
  let btnClass = '';
  // button styles
  if (btn === 'primary') {
    btnClass = 'text-white bg-primary-500 hover:bg-blue-900';
  } else if (btn === 'secondary') {
    btnClass =
      'text-primary-700 from-amber-300 to-amber-500 bg-gradient-to-r hover:to-amber-400';
  } else if (btn === 'primary-light') {
    btnClass = 'bg-primary-50 hover:bg-primary-100 text-primary-500';
  } else if (btn === 'ol-primary') {
    btnClass =
      'text-primary-500 bg-transparent ring-inset ring-1 ring-primary-500 hover:text-white hover:bg-primary-500 focus:outline-none focus:ring-1';
  } else if (btn === 'ol-white') {
    btnClass =
      'text-white bg-transparent ring-inset ring-1 ring-white hover:bg-white hover:text-primary-500 focus:outline-none focus:ring-1';
  } else if (btn === 'transparent') {
    btnClass = 'text-primary-500 bg-transparent hover:text-dark-500';
  } else if (btn === 'white') {
    btnClass =
      'bg-white ring-inset ring-1 ring-slate-200 focus:ring-dark-500 focus:!ring-1 focus:!ring-slate-200 hover:text-primary-500 hover:bg-slate-200';
  } else if (btn === 'slate') {
    btnClass =
      'text-dark-500 bg-slate-200 hover:text-primary-500 hover:bg-slate-300';
  } else if (btn === 'dark') {
    btnClass = 'text-white bg-dark-700 hover:opacity-60';
  } else if (btn === 'danger') {
    btnClass = 'text-white bg-rose-500 hover:bg-rose-600';
  } else if (btn === 'gray') {
    btnClass =
      'text-gray-900 bg-gray-100 border border-gray-100 hover:border-gray-300 active:border-primary-500';
  } else if (btn === 'default') {
    btnClass =
      'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 active:border-primary-500';
  } else {
    btnClass = '';
  }

  // button sizes
  let sizeClasses = '';

  if (size === 'sm') {
    sizeClasses = 'px-3.5 py-1.5 text-sm';
  } else if (size === 'lg') {
    sizeClasses = 'px-5 py-2 text-lg';
  } else {
    sizeClasses = 'px-2.5 py-1.5 text-sm';
  }

  btnClass += ` ${sizeClasses}`;

  // button disabled
  if (disabled || loading) {
    btnClass = btnClass + ' opacity-40 pointer-events-none';
  }

  const componentClassName = `relative inline-flex items-center font-medium focus:outline-none focus:ring-0 transition ease-in-out duration-150 group
		${btnClass}
		${roundedFull ? 'rounded-full' : ''}
		${arrow || arrowLeft ? 'justify-between' : 'justify-center'}
	`;

  const component = (
    <button
      className={componentClassName + className}
      onClick={onClick}
      type="submit"
    >
      {loading && <IconSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />}
      {arrowLeft && <IconArrowLeft className={`h-3 w-4 ${arrowClass}`} />}
      {children}
      {arrow && <IconArrow className={`h-3 w-4 ml-1 ${arrowClass}`} />}
    </button>
  );

  if (href.length) {
    return (
      <Link href={href} passHref>
        <a target={target}>{component}</a>
      </Link>
    );
  }

  return component;
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
      className={`${className} group-hover:transition group-hover:duration-150 group-hover:ease-in-out`}
    >
      <title>{title}</title>
      <path
        className="transition ease-in-out duration-150 group-hover:-translate-x-0.5"
        d="M5 1.36365L1 5.00001L5 8.63637"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="opacity-0 group-hover:opacity-100"
        d="M5 5H1"
        stroke="currentColor"
        strokeWidth="2"
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
      className={`${className} group-hover:transition group-hover:duration-150 group-hover:ease-in-out`}
    >
      <title>{title}</title>
      <path
        className="transition ease-in-out duration-150 group-hover:translate-x-0.5"
        d="M1 1.36365L5 5.00001L1 8.63637"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="opacity-0 group-hover:opacity-100"
        d="M5 5H1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
