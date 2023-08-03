import { FilterOptionKeys } from '@/models/Filter';
import React, {
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { ElemButton } from './elem-button';
import { IconX } from './icons';

type Props = {
  open: boolean;
  name: FilterOptionKeys;
  title?: string | ReactNode;
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
    <div className="snap-start shrink-0 relative">
      <div className="flex items-center min-h-[32px] bg-primary-500 text-white text-sm rounded-full px-3 py-1">
        <button onClick={onOpenFilterOption}>{title}</button>
        <button onClick={onClearFilterOption}>
          <IconX className="w-3 h-3 ml-1" title="Remove" />
        </button>
      </div>

      {open && (
        <div
          ref={wrapperRef}
          className={`absolute z-10 bg-white border border-gray-300 shadow-lg rounded-lg w-[calc(100vw-50px)] max-w-sm ${popupClass}`}
        >
          <div className="px-4 py-2">{children}</div>
          <div className="flex justify-end items-center gap-x-4 px-4 py-2 border-t border-gray-300">
            <button
              onClick={onClearFilterOption}
              name={name}
              className="text-sm underline"
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
