import { FilterOptionKeys } from '@/models/Filter';
import React, { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { ElemButton } from './elem-button';

type Props = {
  open: boolean;
  name: FilterOptionKeys;
  title: string;
  onOpen: (name: FilterOptionKeys) => void;
  onClose: (name: FilterOptionKeys) => void;
  onClear: (name: FilterOptionKeys) => void;
  onApply: (name: FilterOptionKeys) => void;
  popupClass?: string;
};

export const ElemFilterPopup: FC<PropsWithChildren<Props>> = ({
  open,
  name,
  title,
  onOpen,
  onClose,
  onClear,
  onApply,
  children,
  popupClass,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      onCloseFilterOption();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  const onApplyFilter = () => {
    onApply(name);
  };

  return (
    <div className="snap-start shrink-0">
      <ElemButton btn="purple" size="sm" onClick={onOpenFilterOption}>
        {title}
      </ElemButton>

      {open && (
        <div
          ref={wrapperRef}
          className={`absolute z-10 bg-white shadow-lg border border-gray-400 rounded-lg w-[calc(100vw-50px)] max-w-sm p-5 ${popupClass}`}
        >
          {children}
          <div className="flex items-center gap-x-4 mt-2 pt-2 border-t border-gray-300">
            <button
              onClick={onClearFilterOption}
              name={name}
              className="text-primary-500"
            >
              Clear
            </button>
            <ElemButton btn="purple" size="sm" onClick={onApplyFilter}>
              Apply
            </ElemButton>
          </div>
        </div>
      )}
    </div>
  );
};
