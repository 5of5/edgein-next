import React, { MouseEvent } from 'react';
import { IconSearch } from './icons';

type Props = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const ElemSearchBox: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="hidden w-full max-w-xl mx-auto lg:flex items-center text-left space-x-2 px-2 h-9 bg-white rounded-full border border-gray-300 hover:bg-gray-50 focus:outline-none"
    >
      <IconSearch className="flex-none h-5 w-5 text-gray-400" />
      <span className="flex-auto text-gray-400">Try &quot;Coinbase&quot;</span>
      {/* <kbd className="hidden lg:block text-sm font-semibold">
        <abbr title="Command" className="no-underline text-slate-400">
          ⌘
        </abbr>{' '}
        K
      </kbd> */}
    </button>
  );
};
