import React, { FC, useEffect, useRef, useState } from "react";
import { IconPlus } from "@/components/icons";
import {
  companiesFilterOptions,
  investorsFilterOptions,
  eventsFilterOptions,
} from "@/utils/constants";
import { useUser } from "@/context/user-context";
import { IconContributor } from "@/components/icons";
import { ElemUpgradeDialog } from "./elem-upgrade-dialog";

type CategoryFilterOptionProps = {
  options: Array<{
    category: string;
    items: Array<{ label: string; value: string; isPremium?: boolean }>;
  }>;
  onSelectFilterOption: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onOpenUpgradeDialog: () => void;
};

type Props = {
  resourceType: "companies" | "vc_firms" | "events";
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelectFilterOption: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ElemAddFilter: FC<Props> = ({
  resourceType,
  open,
  onOpen,
  onClose,
  onSelectFilterOption,
}) => {
  const filterOptions = {
    "companies": companiesFilterOptions,
    "vc_firms": investorsFilterOptions,
    "events": eventsFilterOptions,
  }[resourceType];

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState<boolean>(false);

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

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
          className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg w-[calc(100vw-50px)] max-w-sm lg:max-w-lg p-5"
        >
          <div className="grid lg:grid-cols-2 lg:gap-8">
            <div>
              <CategoryFilterOption
                options={filterOptions.slice(0, resourceType === "events" ? 2 : 3)}
                onSelectFilterOption={onSelectFilterOption}
                onOpenUpgradeDialog={onOpenUpgradeDialog}
              />
            </div>
            <div className="mt-6 lg:mt-0">
              <CategoryFilterOption
                options={filterOptions.slice(resourceType === "events" ? 2 : 3)}
                onSelectFilterOption={onSelectFilterOption}
                onOpenUpgradeDialog={onOpenUpgradeDialog}
              />
            </div>
          </div>
        </div>
      )}
      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};

const CategoryFilterOption: FC<CategoryFilterOptionProps> = ({
  options,
  onSelectFilterOption,
  onOpenUpgradeDialog,
}) => {
  const { user } = useUser();

  const userCanUseFilter = user?.entitlements.viewEmails
    ? user?.entitlements.viewEmails
    : false;

  return (
    <div className="flex flex-col gap-y-6">
      {options.map((option) => (
        <div key={option.category}>
          <h3 className="font-bold text-sm">{option.category}</h3>

          <ul className="list-none text-slate-600 leading-tight">
            {option.items.map((item) => (
              <li key={item.value}>
                {item.isPremium ? (
                  <div className="inline-flex">
                    <button
                      onClick={
                        userCanUseFilter === true
                          ? onSelectFilterOption
                          : onOpenUpgradeDialog
                      }
                      name={item.value}
                      className="text-left underline decoration-primary-500 transition-all px-2 py-1.5 rounded-md overflow-hidden hover:text-primary-500 hover:bg-slate-100"
                    >
                      {!userCanUseFilter && (
                        <IconContributor className="inline-block w-5 h-5 text-primary-500 shrink-0 mr-1" />
                      )}

                      {item.label}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onSelectFilterOption}
                    name={item.value}
                    className="text-left underline decoration-primary-500 transition-all px-2 py-1.5 rounded-md overflow-hidden hover:text-primary-500 hover:bg-slate-100"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
