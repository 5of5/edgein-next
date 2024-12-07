import { FC, MouseEvent } from 'react';
import { IconSearch } from './icons';

type Props = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const ElemSearchBox: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="items-center hidden w-full max-w-xl px-2 space-x-2 text-left bg-neutral-900 rounded-full lg:mx-auto sm:flex h-9 hover:bg-black focus:bg-black focus:outline-none">
      <IconSearch className="flex-none w-4 h-4 text-gray-400" />
      <span className="flex-auto text-sm text-gray-400">
        Try &quot;Coinbase&quot;
      </span>
      {/* <kbd className="hidden text-sm font-semibold lg:block">
        <abbr title="Command" className="no-underline text-slate-400">
          ⌘
        </abbr>{' '}
        K
      </kbd> */}
    </button>
  );
};
