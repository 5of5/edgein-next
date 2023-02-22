import React, { FC, PropsWithChildren, useEffect, useRef } from "react";
import { FilterOptionKeys } from "./ElemCompaniesFilter";

type Props = {
  open: boolean;
  name: FilterOptionKeys;
  title: string;
  onOpen: (name: FilterOptionKeys) => void;
  onClose: (name: FilterOptionKeys) => void;
  onClear: (name: FilterOptionKeys) => void;
};

export const ElemCompaniesFilterPopover: FC<PropsWithChildren<Props>> = ({
  open,
  name,
  title,
  onOpen,
  onClose,
  onClear,
  children,
}) => {
  const wrapperRef = useRef<any>(null);

  const handleClickOutside = (e: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      onCloseFilterOption();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const onOpenFilterOption = () => {
    onOpen(name);
  };

  const onCloseFilterOption = () => {
    onClose(name);
  };

  const onClearFilterOption = () => {
    onClear(name);
  };

  return (
    <div className=" snap-start shrink-0">
      <div
        className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 cursor-pointer ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1"
        onClick={onOpenFilterOption}
      >
        {title}
      </div>
      {open && (
        <div
          ref={wrapperRef}
          className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content p-5"
        >
          {children}
          <div className="mt-4 pt-2 border-t border-black/5">
            <button
              onClick={onClearFilterOption}
              name={name}
              className="text-primary-500"
            >
              Clear filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
