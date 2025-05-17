import { FC, MouseEvent } from 'react';
import { IconSearch } from './icons';

type Props = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const ElemSearchBox: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-[85%] ml-8 max-w-xl px-2 pr-4 space-x-2 text-left bg-gradient-to-r from-black to-gray-950 border border-gray-700 rounded-full h-12 hover:border-gray-500 focus:border-gray-400 focus:outline-none">
      <IconSearch className="flex-none w-5 h-5 text-gray-100 ml-2" />
      <span className="flex-auto text-md text-[#838383] font-mon_book truncate">
        Search for companies or investors
      </span>
    </button>
  );
};
