import { MouseEvent, FC, Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';
import {
  companiesFilterOptions,
  investorsFilterOptions,
  eventsFilterOptions,
  peopleFilterOptions,
} from './constants';
import { useUser } from '@/context/user-context';
import {
  IconChevronDownMini,
  IconFilter,
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
  buttonClass?: string;
  panelClass?: string;
  placement?:
    | 'auto-end'
    | 'auto-start'
    | 'auto'
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
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
  buttonClass = '',
  panelClass = '',
  placement = 'bottom-start',
  resourceType,
  excludeFilters = [],
  type = 'button',
  onSelectFilterOption,
}) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

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
      <Popover className="relative shrink-0">
        <Popover.Button as="div" ref={setReferenceElement}>
          {type === 'button' ? (
            <ElemButton
              btn="default"
              roundedFull={false}
              className={`rounded-lg ${buttonClass}`}>
              <IconFilter className="w-4 h-4 shrink-0 mr-1.5 text-gray-400" />
              Filters
              <IconChevronDownMini className="w-5 h-5 shrink-0 ml-auto lg:ml-1.5" />
            </ElemButton>
          ) : (
            <IconPlus
              strokeWidth={3}
              className="w-5 h-5 p-0.5 text-gray-500 cursor-pointer hover:bg-neutral-900 hover:rounded-lg"
            />
          )}
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0">
          <Popover.Panel
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className={`z-30 bg-black border border-gray-300 rounded-lg shadow-lg min-w-56 max-h ${panelClass}`}>
            {({ close }) => (
              <>
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
                <CategoryFilterOption
                  options={filterOptions.slice(categoryFilterOptionsEndIndex)}
                  excludeFilters={excludeFilters}
                  onSelectFilterOption={event => {
                    close();
                    onSelectFilterOption(event);
                  }}
                  onOpenUpgradeDialog={onOpenUpgradeDialog}
                />
              </>
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
    <>
      {options.map((option, index) => (
        <Fragment key={index}>
          {option.category && (
            <h3 className="flex items-center w-full px-4 py-2 text-sm font-medium text-left gap-x-2">
              {option.category}
            </h3>
          )}
          <ul className="text-gray-600 list-none border-b border-gray-100">
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
                      } px-4 py-2 m-0 transition-all hover:bg-neutral-900`}>
                      {!userCanUseFilter && (
                        <IconLockClosed
                          className="inline-block w-4 h-4 mr-1 shrink-0"
                          strokeWidth={2}
                        />
                      )}

                      {item.label}
                    </button>
                  ) : (
                    <button
                      onClick={onSelectFilterOption}
                      name={item.value}
                      className="flex items-center w-full px-4 py-2 m-0 text-sm text-left transition-all cursor-pointer gap-x-2 hover:bg-neutral-900">
                      {item.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </Fragment>
      ))}
    </>
  );
};
