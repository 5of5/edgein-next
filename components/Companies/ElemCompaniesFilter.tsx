import React, { FC, useMemo, useState } from "react";
import { Popover } from "@headlessui/react";
import some from "lodash/some";
import { convertToInternationalCurrencySystem } from "@/utils";
import { IconPlus } from "@/components/Icons";
import { companiesFilterOptions, tags } from "@/utils/constants";
import { ElemButton } from "../ElemButton";

type FilterOptionKeys =
  | "country"
  | "state"
  | "city"
  | "keywords"
  | "industry"
  | "fundingType"
  | "fundingAmount"
  | "lastFundingDate"
  | "fundingInvestors"
  | "teamSize";

type SelectedFilters = Record<FilterOptionKeys, boolean>;

type CategoryFilterOptionProps = {
  options: Array<{
    category: string;
    items: Array<{ label: string; value: string }>;
  }>;
  onSelectFilterOption: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type Props = {};

export const ElemCompaniesFilter: FC<Props> = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    {} as SelectedFilters
  );

  const allTags = useMemo(() => {
    return tags.filter(
      (tag) =>
        tag.name !== "Layer 0" &&
        tag.name !== "Layer 1" &&
        tag.name !== "Layer 2" &&
        tag.name !== "Layer 3" &&
        tag.name !== "Layer 4" &&
        tag.name !== "Layer 5" &&
        tag.name !== "Layer 6"
    );
  }, []);

  const onSelectFilterOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const onClearFilterOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const onResetFilters = () => {
    setSelectedFilters({} as SelectedFilters);
  };

  return (
    <section className="w-full flex items-center justify-between mb-6 py-3 border-b border-slate-200">
      <div className="flex items-center space-x-3 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-mandatory touch-pan-x">
        <Popover className="snap-start shrink-0">
          <Popover.Button className="relative flex items-center font-bold text-sm text-primary-500 rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-primary-500 hover:text-white hover:bg-primary-500 focus:outline-none focus:ring-1">
            <IconPlus className="w-5 h-5 mr-1" />
            Add Filter
          </Popover.Button>
          <Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content p-5">
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
          </Popover.Panel>
        </Popover>

        {selectedFilters.country && (
          <Popover className="snap-start shrink-0">
            <Popover.Button className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1">
              Country
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content max-w-xs p-5">
              <div className="font-bold text-sm">Country</div>
              <div>
                <div>is any of these</div>
                <div>Is none of these</div>
              </div>
              <div className="mt-4 pt-2 border-t border-black/5">
                <button
                  onClick={onClearFilterOption}
                  name="country"
                  className="text-primary-500"
                >
                  Clear filter
                </button>
              </div>
            </Popover.Panel>
          </Popover>
        )}

        {selectedFilters.state && (
          <Popover className="snap-start shrink-0">
            <Popover.Button className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1">
              State
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content max-w-xs p-5">
              <div className="font-bold text-sm">State</div>
              <div>
                <div>is any of these</div>
                <div>Is none of these</div>
              </div>
              <div className="mt-4 pt-2 border-t border-black/5">
                <button
                  onClick={onClearFilterOption}
                  name="state"
                  className="text-primary-500"
                >
                  Clear filter
                </button>
              </div>
            </Popover.Panel>
          </Popover>
        )}

        {selectedFilters.city && (
          <Popover className="snap-start shrink-0">
            <Popover.Button className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1">
              City
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content max-w-xs p-5">
              <div className="font-bold text-sm">City</div>
              <div>
                <div>is any of these</div>
                <div>Is none of these</div>
              </div>
              <div className="mt-4 pt-2 border-t border-black/5">
                <button
                  onClick={onClearFilterOption}
                  name="city"
                  className="text-primary-500"
                >
                  Clear filter
                </button>
              </div>
            </Popover.Panel>
          </Popover>
        )}

        {selectedFilters.keywords && (
          <Popover className="snap-start shrink-0">
            <Popover.Button className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1">
              Keywords
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg w-full max-w-xs p-5">
              <div className="font-bold text-sm">Description Keywords</div>
              <div className="mt-1">
                <textarea
                  className="appearance-none resize-none border-none w-full border border-slate-200 rounded-md px-1 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500 placeholder:text-slate-400"
                  placeholder="e.g. Wallet, Blockchain, etc."
                ></textarea>
              </div>
              <div className="mt-4 pt-2 border-t border-black/5">
                <button
                  onClick={onClearFilterOption}
                  name="keywords"
                  className="text-primary-500"
                >
                  Clear filter
                </button>
              </div>
            </Popover.Panel>
          </Popover>
        )}

        {selectedFilters.industry && (
          <Popover className="snap-start shrink-0">
            <Popover.Button className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1">
              Industry (2)
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content p-5">
              <div className="font-bold text-sm">Industry</div>
              <ul className="grid grid-cols-2 gap-x-5 overflow-y-auto no-scrollbar">
                {allTags.map((tag) => (
                  <li
                    key={tag.id}
                    className="flex items-center w-full min-w-max text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100"
                  >
                    <label className="relative flex items-center gap-2 cursor-pointer w-full  py-2 hover:bg-slate-100">
                      <input
                        id={tag.id}
                        type="checkbox"
                        className="appearance-none w-4 h-4 border rounded border-slate-300 hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:ring-offset-0 focus:checked:bg-primary-500"
                      />
                      <div>{tag.name}</div>
                    </label>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-2 border-t border-black/5">
                <button
                  onClick={onClearFilterOption}
                  name="industry"
                  className="text-primary-500"
                >
                  Clear filter
                </button>
              </div>
            </Popover.Panel>
          </Popover>
        )}

        {selectedFilters.fundingType && (
          <Popover className="snap-start shrink-0">
            <Popover.Button className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1">
              Funding type
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg w-full max-w-xs p-5">
              <div className="font-bold text-sm">Funding type</div>
              <div className="mt-1">lorem ipsum...</div>
              <div className="mt-4 pt-2 border-t border-black/5">
                <button
                  onClick={onClearFilterOption}
                  name="fundingType"
                  className="text-primary-500"
                >
                  Clear filter
                </button>
              </div>
            </Popover.Panel>
          </Popover>
        )}

        {selectedFilters.fundingAmount && (
          <Popover className="snap-start shrink-0">
            <Popover.Button className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1">
              Funding amount
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg w-full max-w-xs p-5">
              <div className="font-bold text-sm">Funding amount total</div>
              <div className="flex items-center space-x-2">
                <div className="">
                  <div className="text-sm text-slate-600">Min</div>
                  <input
                    //name=""
                    type="text"
                    //value={}
                    onChange={() => {}}
                    defaultValue={convertToInternationalCurrencySystem(25000)}
                    className="appearance-none border-none w-20 border border-slate-200 rounded-md px-1 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                  />
                </div>
                <div className="pt-4">{"–"}</div>
                <div className="">
                  <div className="text-sm text-slate-600">Max</div>
                  <input
                    //name=""
                    type="text"
                    //value={}
                    onChange={() => {}}
                    //defaultValue={"Any"}
                    placeholder="Any"
                    className="appearance-none border-none w-20 border border-slate-200 rounded-md px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                  />
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-black/5">
                <button
                  onClick={onClearFilterOption}
                  name="fundingAmount"
                  className="text-primary-500"
                >
                  Clear filter
                </button>
              </div>
            </Popover.Panel>
          </Popover>
        )}

        {selectedFilters.lastFundingDate && (
          <Popover className="snap-start shrink-0">
            <Popover.Button className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1">
              Last funding date
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg w-full max-w-xs p-5">
              <div className="font-bold text-sm">Last funding date</div>
              <div className="mt-1">lorem ipsum...</div>
              <div className="mt-4 pt-2 border-t border-black/5">
                <button
                  onClick={onClearFilterOption}
                  name="lastFundingDate"
                  className="text-primary-500"
                >
                  Clear filter
                </button>
              </div>
            </Popover.Panel>
          </Popover>
        )}

        {selectedFilters.fundingInvestors && (
          <Popover className="snap-start shrink-0">
            <Popover.Button className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1">
              Funding investors
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg w-full max-w-xs p-5">
              <div className="font-bold text-sm">Funding investors</div>
              <div className="mt-1">
                <div>is any of these</div>
                <textarea
                  className="appearance-none resize-none border-none w-full border border-slate-200 rounded-md px-1 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500 placeholder:text-slate-400"
                  placeholder="Enter an investor name"
                ></textarea>
              </div>
              <div>
                <div>Is none of these</div>
              </div>
              <div className="mt-4 pt-2 border-t border-black/5">
                <button
                  onClick={onClearFilterOption}
                  name="fundingInvestors"
                  className="text-primary-500"
                >
                  Clear filter
                </button>
              </div>
            </Popover.Panel>
          </Popover>
        )}

        {selectedFilters.teamSize && (
          <Popover className="snap-start shrink-0">
            <Popover.Button className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1">
              Team size
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content max-w-xs p-5">
              <div className="font-bold text-sm">Team size</div>
              <div className="flex items-center space-x-2">
                <div className="">
                  <div className="text-sm text-slate-600">Min</div>
                  <input
                    //name=""
                    type="text"
                    //value={}
                    onChange={() => {}}
                    defaultValue={0}
                    className="appearance-none border-none w-20 border border-slate-200 rounded-md px-1 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                  />
                </div>
                <div className="pt-4">{"–"}</div>
                <div className="">
                  <div className="text-sm text-slate-600">Max</div>
                  <input
                    //name=""
                    type="text"
                    //value={}
                    onChange={() => {}}
                    //defaultValue={"Any"}
                    placeholder="Any"
                    className="appearance-none border-none w-20 border border-slate-200 rounded-md px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                  />
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-black/5">
                <button
                  onClick={onClearFilterOption}
                  name="teamSize"
                  className="text-primary-500"
                >
                  Clear filter
                </button>
              </div>
            </Popover.Panel>
          </Popover>
        )}

        {some(selectedFilters, Boolean) && (
          <ElemButton
            btn="transparent"
            onClick={onResetFilters}
            className="snap-start shrink-0"
          >
            Reset
          </ElemButton>
        )}
      </div>
    </section>
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
