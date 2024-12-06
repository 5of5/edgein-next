import { FilterOptionKeys } from '@/models/Filter';
import { usePopper } from 'react-popper';
import React, {
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { ElemButton } from '../elem-button';
import { IconX } from '../icons';

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
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(containerRef, popperRef, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
    ],
  });

  const handleClickOutside = (e: MouseEvent) => {
    if (popperRef && !popperRef.contains(e.target as Node)) {
      onCloseFilterOption();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  useEffect(() => {
    if (!open && !title) {
      onClearFilterOption();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, title]);

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
    <div
      ref={setContainerRef}
      className="relative max-w-full snap-start shrink-0">
      <div className="flex items-center min-h-[32px] bg-primary-500 text-white text-sm rounded-full px-3 py-1">
        <button
          onClick={onOpenFilterOption}
          className="inline-block max-w-full truncate">
          {title}
        </button>
        <button onClick={onClearFilterOption}>
          <IconX className="w-3 h-3 ml-1" title="Remove" />
        </button>
      </div>

      {open && (
        <div
          ref={setPopperRef}
          style={styles.popper}
          {...attributes.popper}
          className={`z-10 bg-black border border-gray-300 shadow-lg rounded-lg w-[calc(100vw-50px)] max-w-sm ${popupClass}`}>
          <div className="px-4 py-3">{children}</div>
          <div className="flex items-center justify-end px-4 py-2 border-t border-gray-100 gap-x-4">
            <button
              onClick={onClearFilterOption}
              name={name}
              className="text-sm underline">
              Clear
            </button>
            <ElemButton btn="primary" size="sm" onClick={onApplyFilter}>
              Apply
            </ElemButton>
          </div>
        </div>
      )}
    </div>
  );
};
