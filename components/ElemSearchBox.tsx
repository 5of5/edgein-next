import React from "react";
import { IconSearch } from "./Icons";

type Props = {
  onClick: () => void;
};

const ElemSearchBox = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="hidden sm:flex sm:flex-1 items-center text-left space-x-2 mx-2 px-2 h-9 bg-white shadow-sm rounded-lg text-slate-400 ring-1 ring-slate-900/10 lg:w-64 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 lg:flex-none"
    >
      <IconSearch className="flex-none h-5 w-5 text-dark-500" />
      <span className="flex-auto">Quick Search...</span>
      <kbd className="hidden lg:block text-sm font-semibold">
        <abbr title="Command" className="no-underline text-slate-400">
          ⌘
        </abbr>{" "}
        K
      </kbd>
    </button>
  );
};

export default ElemSearchBox;
