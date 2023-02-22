import React, { FC, useEffect, useRef } from "react";
import { IconPlus } from "@/components/Icons";
import { companiesFilterOptions } from "@/utils/constants";

type CategoryFilterOptionProps = {
  options: Array<{
    category: string;
    items: Array<{ label: string; value: string }>;
  }>;
  onSelectFilterOption: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type Props = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelectFilterOption: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ElemCompaniesAddFilter: FC<Props> = ({
  open,
  onOpen,
  onClose,
  onSelectFilterOption,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="snap-start shrink-0">
      <button
        className="relative flex items-center font-bold text-sm text-primary-500 rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-primary-500 hover:text-white hover:bg-primary-500 focus:outline-none focus:ring-1"
        onClick={onOpen}
      >
        <IconPlus className="w-5 h-5 mr-1" />
        Add Filter
      </button>
      {open && (
        <div
          ref={wrapperRef}
          className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content p-5"
        >
          <div className="grid grid-cols-2 gap-16">
            <div>
              <CategoryFilterOption
                options={companiesFilterOptions.slice(0, 3)}
                onSelectFilterOption={onSelectFilterOption}
              />
            </div>
            <div>
              <CategoryFilterOption
                options={companiesFilterOptions.slice(3)}
                onSelectFilterOption={onSelectFilterOption}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CategoryFilterOption: FC<CategoryFilterOptionProps> = ({
  options,
  onSelectFilterOption,
}) => {
  return (
    <div className="flex flex-col gap-y-6">
      {options.map((option) => (
        <div key={option.category}>
          <h3 className="font-bold text-sm">{option.category}</h3>
          <ul className="list-none space-y-1 text-slate-600 leading-snug">
            {option.items.map((item) => (
              <li key={item.value}>
                <button
                  onClick={onSelectFilterOption}
                  name={item.value}
                  className="box-border border-b border-primary-500 transition-all p-0 hover:border-b-2 hover:text-primary-500"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
