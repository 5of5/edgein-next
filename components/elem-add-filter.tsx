import React, { FC, useEffect, useRef, useState } from 'react';
import {
  companiesFilterOptions,
  investorsFilterOptions,
  eventsFilterOptions,
} from '@/utils/constants';
import { useUser } from '@/context/user-context';
import {
  IconChevronDownMini,
  IconLockClosed,
  IconPlus,
} from '@/components/icons';
import { ElemUpgradeDialog } from './elem-upgrade-dialog';
import { ElemButton } from './elem-button';

type CategoryFilterOptionProps = {
  options: Array<{
    category?: string;
    items: Array<{ label: string; value: string; isPremium?: boolean }>;
  }>;
  onSelectFilterOption: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onOpenUpgradeDialog: () => void;
};

type Props = {
  isOpenFilters: boolean;
  resourceType: 'companies' | 'vc_firms' | 'events';
  type?: 'icon' | 'button';
  onOpenFilters: () => void;
  onCloseFilters: () => void;
  onSelectFilterOption: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ElemAddFilter: FC<Props> = ({
  isOpenFilters,
  resourceType,
  type = 'button',
  onSelectFilterOption,
  onOpenFilters,
  onCloseFilters,
}) => {
  const filterOptions = {
    companies: companiesFilterOptions,
    vc_firms: investorsFilterOptions,
    events: eventsFilterOptions,
  }[resourceType];

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] =
    useState<boolean>(false);

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      onCloseFilters();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const categoryFilterOptionsEndIndex = resourceType === 'events' ? 2 : 3;

  return (
    <div className="relative shrink-0">
      {type === 'button' ? (
        <ElemButton
          btn="default"
          roundedFull={false}
          className="rounded-lg"
          onClick={onOpenFilters}
        >
          Filters
          <IconChevronDownMini className="w-5 h-5 ml-1" />
        </ElemButton>
      ) : (
        <ElemButton
          btn="slate"
          size="sm"
          onClick={onOpenFilters}
          className="!p-1"
        >
          <IconPlus className="w-4 h-4" />
        </ElemButton>
      )}

      {isOpenFilters && (
        <div
          ref={wrapperRef}
          className="absolute right-0 z-10 bg-white shadow-lg border border-gray-300 rounded-lg w-56 mt-2"
        >
          <div>
            <CategoryFilterOption
              options={filterOptions.slice(0, categoryFilterOptionsEndIndex)}
              onSelectFilterOption={onSelectFilterOption}
              onOpenUpgradeDialog={onOpenUpgradeDialog}
            />
          </div>
          <div className="mt-6 lg:mt-0">
            <CategoryFilterOption
              options={filterOptions.slice(categoryFilterOptionsEndIndex)}
              onSelectFilterOption={onSelectFilterOption}
              onOpenUpgradeDialog={onOpenUpgradeDialog}
            />
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
    <div className="">
      {options.map((option, index) => (
        <div key={index}>
          {option.category && (
            <h3 className="flex items-center gap-x-2 w-full text-left text-sm font-medium px-4 py-2">
              {option.category}
            </h3>
          )}

          <ul className="list-none text-gray-600">
            {option.items.map(item => (
              <li key={item.value}>
                {item.isPremium ? (
                  <button
                    onClick={
                      userCanUseFilter
                        ? onSelectFilterOption
                        : onOpenUpgradeDialog
                    }
                    name={item.value}
                    className="flex items-center gap-x-2 cursor-pointer w-full text-left text-sm px-4 py-2 m-0 transition-all hover:bg-gray-100"
                  >
                    {!userCanUseFilter && (
                      <IconLockClosed
                        className="inline-block w-4 h-4 text-primary-500 shrink-0 mr-1"
                        strokeWidth={2}
                      />
                    )}

                    {item.label}
                  </button>
                ) : (
                  <button
                    onClick={onSelectFilterOption}
                    name={item.value}
                    className="flex items-center gap-x-2 cursor-pointer w-full text-left text-sm px-4 py-2 m-0 transition-all hover:bg-gray-100"
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
