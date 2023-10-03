import { MouseEvent, FC, Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  companiesFilterOptions,
  investorsFilterOptions,
  eventsFilterOptions,
  peopleFilterOptions,
} from './constants';
import { useUser } from '@/context/user-context';
import {
  IconChevronDownMini,
  IconFilterDashboard,
  IconLockClosed,
  IconPlus,
} from '@/components/icons';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { ElemButton } from '../elem-button';
import { get } from 'lodash';
import { ResourceTypes } from './types';

type CategoryFilterOptionProps = {
  options: Array<{
    category?: string;
    items: Array<{ label: string; value: string; isPremium?: boolean }>;
  }>;
  excludeFilters: string[];
  onSelectFilterOption: (event: MouseEvent<HTMLButtonElement>) => void;
  onOpenUpgradeDialog: () => void;
};

type Props = {
  resourceType: ResourceTypes;
  excludeFilters?: string[];
  type?: 'icon' | 'button';
  onSelectFilterOption: (event: MouseEvent<HTMLButtonElement>) => void;
};

const FILTER_OPTIONS: Record<ResourceTypes, any> = {
  companies: companiesFilterOptions,
  vc_firms: investorsFilterOptions,
  events: eventsFilterOptions,
  people: peopleFilterOptions,
} as const;

export const ElemAddFilter: FC<Props> = ({
  resourceType,
  excludeFilters = [],
  type = 'button',
  onSelectFilterOption,
}) => {
  const filterOptions = get(FILTER_OPTIONS, resourceType, []);
  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] =
    useState<boolean>(false);

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const categoryFilterOptionsEndIndex = resourceType === 'events' ? 2 : 3;

  return (
    <>
      <Popover className="relative">
        <Popover.Button as="div">
          {type === 'button' ? (
            <ElemButton
              btn="default"
              roundedFull={false}
              className="rounded-lg">
              <IconFilterDashboard className="w-4 h-4 mr-1.5 text-gray-400" />
              Filters
              <IconChevronDownMini className="w-5 h-5 ml-1" />
            </ElemButton>
          ) : (
            <IconPlus
              strokeWidth={3}
              className="w-5 h-5 p-0.5 text-gray-500 cursor-pointer hover:bg-gray-100 hover:rounded-lg"
            />
          )}
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1">
          <Popover.Panel className="absolute z-10 mt-2 right-0 w-56 block bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
            {({ close }) => (
              <div>
                <div>
                  <CategoryFilterOption
                    options={filterOptions.slice(
                      0,
                      categoryFilterOptionsEndIndex,
                    )}
                    excludeFilters={excludeFilters}
                    onSelectFilterOption={event => {
                      close();
                      onSelectFilterOption(event);
                    }}
                    onOpenUpgradeDialog={onOpenUpgradeDialog}
                  />
                </div>
                <div className="mt-6 lg:mt-0">
                  <CategoryFilterOption
                    options={filterOptions.slice(categoryFilterOptionsEndIndex)}
                    excludeFilters={excludeFilters}
                    onSelectFilterOption={event => {
                      close();
                      onSelectFilterOption(event);
                    }}
                    onOpenUpgradeDialog={onOpenUpgradeDialog}
                  />
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </>
  );
};

const CategoryFilterOption: FC<CategoryFilterOptionProps> = ({
  options,
  excludeFilters,
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

          <ul className="list-none text-gray-600 border-b border-gray-100">
            {option.items.map(item => {
              if (excludeFilters.includes(item.value)) {
                return null;
              }

              return (
                <li key={item.value}>
                  {item.isPremium ? (
                    <button
                      onClick={
                        userCanUseFilter
                          ? onSelectFilterOption
                          : onOpenUpgradeDialog
                      }
                      name={item.value}
                      className={`flex items-center gap-x-2 cursor-pointer w-full text-left text-sm ${
                        userCanUseFilter ? '' : 'text-gray-400'
                      } px-4 py-2 m-0 transition-all hover:bg-gray-100`}>
                      {!userCanUseFilter && (
                        <IconLockClosed
                          className="inline-block w-4 h-4 shrink-0 mr-1"
                          strokeWidth={2}
                        />
                      )}

                      {item.label}
                    </button>
                  ) : (
                    <button
                      onClick={onSelectFilterOption}
                      name={item.value}
                      className="flex items-center gap-x-2 cursor-pointer w-full text-left text-sm px-4 py-2 m-0 transition-all hover:bg-gray-100">
                      {item.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
