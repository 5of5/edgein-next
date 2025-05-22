import { FC, PropsWithChildren } from 'react';
import { Loader, ArrowLeft, ArrowRight } from 'lucide-react';
import { ElemLink } from './elem-link';

type Props = {
  className?: string;
  loading?: boolean;
  arrow?: boolean;
  arrowLeft?: boolean;
  arrowClass?: string;
  btn?:
    | 'primary'
    | 'ol-tertiary'
    | 'ol-primary'
    | 'ol-white'
    | 'danger'
    | 'dark'
    | 'transparent'
    | 'gray'
    | 'default'
    | 'white'
    | 'black-to-white'
    | '';
  roundedFull?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | '';
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
    btnClass = 'text-white bg-primary-500 hover:bg-primary-800';
  } else if (btn === 'ol-primary') {
    btnClass =
      'text-primary-500 bg-transparent ring-inset ring-1 ring-primary-500 hover:text-white hover:bg-primary-500 focus:outline-none focus:ring-1';
  } else if (btn === 'ol-tertiary') {
    btnClass =
      'text-purple-400 bg-transparent ring-inset ring-1 ring-purple-400 hover:text-purple-200 hover:bg-purple-900 focus:outline-none focus:ring-1';
  } else if (btn === 'ol-white') {
    btnClass =
      'text-white bg-transparent ring-inset ring-1 ring-white hover:bg-black hover:text-primary-500 focus:outline-none focus:ring-1';
  } else if (btn === 'black-to-white') {
    btnClass = className =
      'bg-white text-black border border-transparent hover:bg-black hover:text-white hover:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all duration-300 ease-in-out';
  } else if (btn === 'white') {
    btnClass = 'text-black bg-white hover:bg-gray-100';
  } else if (btn === 'transparent') {
    btnClass = 'text-primary-500 bg-transparent hover:text-dark-500';
  } else if (btn === 'dark') {
    btnClass = 'text-white bg-gray-300 hover:bg-gray-700';
  } else if (btn === 'danger') {
    btnClass = 'text-white bg-rose-600 hover:bg-rose-500';
  } else if (btn === 'gray') {
    btnClass =
      'text-gray-300 bg-neutral-900 border border-neutral-700 hover:border-gray-300 active:border-primary-500';
  } else if (btn === 'default') {
    btnClass =
      'bg-black border  border-neutral-700 hover:bg-neutral-900 active:border-primary-500';
  } else {
    btnClass = '';
  }

  // button sizes
  let sizeClasses = '';

  if (size === 'xs') {
    sizeClasses = 'px-2 py-1.5 text-xs';
  } else if (size === 'sm') {
    sizeClasses = 'px-3.5 py-1.5 text-sm';
  } else if (size === 'md') {
    sizeClasses = 'px-4 py-2.5 text-sm';
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
      type="submit">
      {loading && <Loader className="w-5 h-5 mr-3 -ml-1 animate-spin" />}
      {arrowLeft && (
        <ArrowLeft
          className={`h-3 w-4 ${arrowClass} group-hover:-translate-x-0.5 transition-transform duration-150`}
        />
      )}
      {children}
      {arrow && (
        <ArrowRight
          className={`h-3 w-4 ml-1 ${arrowClass} group-hover:translate-x-0.5 transition-transform duration-150`}
        />
      )}
    </button>
  );

  if (href.length) {
    return (
      <ElemLink href={href} target={target}>
        {component}
      </ElemLink>
    );
  }

  return component;
};
