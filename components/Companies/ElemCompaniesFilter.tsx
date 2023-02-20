import React, { FC, useMemo, useState } from "react";
import { Popover } from "@headlessui/react";
import some from "lodash/some";
import { convertToInternationalCurrencySystem } from "@/utils";
import { IconPlus } from "@/components/Icons";
import { companiesFilterOptions, roundChoices, tags } from "@/utils/constants";
import { ElemButton } from "../ElemButton";
import { InputRadio } from "../InputRadio";
import { TagInputText } from "../TagInputText";
import { ElemTagsInput } from "../ElemTagsInput";
import { ElemMultiRangeSlider } from "../ElemMultiRangeSlider";

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

type Filters = {
  country: {
    condition: "any" | "none";
    tags: Array<string>;
  };
  state: {
    condition: "any" | "none";
    tags: Array<string>;
  };
  city: {
    condition: "any" | "none";
    tags: Array<string>;
  };
  keywords: {
    tags: Array<string>;
  };
  industry: Array<string>;
  fundingType: Array<string>;
  fundingAmount: {
    minVal: number;
    maxVal: number;
  };
  fundingInvestors: {
    condition: "any" | "none";
    tags: Array<string>;
  };
  teamSize: {
    minVal: number;
    maxVal: number;
  };
};

type Props = {};

export const ElemCompaniesFilter: FC<Props> = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    {} as SelectedFilters
  );

  const [filters, setFilters] = useState<Filters>({
    country: {
      condition: "any",
      tags: [],
    },
    state: {
      condition: "any",
      tags: [],
    },
    city: {
      condition: "any",
      tags: [],
    },
    keywords: {
      tags: [],
    },
    industry: [],
    fundingType: [],
    fundingAmount: {
      minVal: 25000,
      maxVal: 1000000,
    },
    fundingInvestors: {
      condition: "any",
      tags: [],
    },
    teamSize: {
      minVal: 10,
      maxVal: 20,
    },
  });

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

  const onChangeTags = (selectedTags: Array<string>, name: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof Filters],
        tags: selectedTags,
      },
    }));
  };

  const onChangeCondition = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof Filters],
        condition: event.target.value,
      },
    }));
  };

  const onChangeIndustry = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterIndustry = [...filters.industry];
    if (event.target.checked) {
      newFilterIndustry.push(event.target.name);
    } else {
      const index = newFilterIndustry.indexOf(event.target.name);
      newFilterIndustry.splice(index, 1);
    }
    setFilters((prev) => ({
      ...prev,
      industry: newFilterIndustry,
    }));
  };

  const onChangeFundingType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterFundingType = [...filters.fundingType];
    if (event.target.checked) {
      newFilterFundingType.push(event.target.name);
    } else {
      const index = newFilterFundingType.indexOf(event.target.name);
      newFilterFundingType.splice(index, 1);
    }
    setFilters((prev) => ({
      ...prev,
      fundingType: newFilterFundingType,
    }));
  };

  const onChangeRangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [option, metric] = name.split(".");
    setFilters((prev) => ({
      ...prev,
      [option]: {
        ...prev[name as keyof Filters],
        [metric]: value,
      },
    }));
  };

  const onChangeRangeSlider = (
    name: string,
    minVal: number,
    maxVal: number
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: {
        minVal,
        maxVal,
      },
    }));
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
              <div className="flex flex-col gap-2 mt-2">
                <InputRadio
                  name="country"
                  value="any"
                  checked={filters.country.condition === "any"}
                  label="is any of these"
                  onChange={(event) => onChangeCondition(event, "country")}
                />
                <ElemTagsInput
                  value={filters.country.tags}
                  placeholder="Enter a country name"
                  onChange={(tags) => onChangeTags(tags, "country")}
                />
                <InputRadio
                  name="country"
                  value="none"
                  checked={filters.country.condition === "none"}
                  label="is none of these"
                  onChange={(event) => onChangeCondition(event, "country")}
                />
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
              <div className="flex flex-col gap-2 mt-2">
                <InputRadio
                  name="state"
                  value="any"
                  checked={filters.state.condition === "any"}
                  label="is any of these"
                  onChange={(event) => onChangeCondition(event, "state")}
                />
                <ElemTagsInput
                  value={filters.state.tags}
                  placeholder="Enter a state name"
                  onChange={(tags) => onChangeTags(tags, "state")}
                />
                <InputRadio
                  name="state"
                  value="none"
                  checked={filters.state.condition === "none"}
                  label="is none of these"
                  onChange={(event) => onChangeCondition(event, "state")}
                />
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
              <div className="flex flex-col gap-2 mt-2">
                <InputRadio
                  name="city"
                  value="any"
                  checked={filters.city.condition === "any"}
                  label="is any of these"
                  onChange={(event) => onChangeCondition(event, "city")}
                />
                <ElemTagsInput
                  value={filters.city.tags}
                  placeholder="Enter a city name"
                  onChange={(tags) => onChangeTags(tags, "city")}
                />
                <InputRadio
                  name="city"
                  value="none"
                  checked={filters.city.condition === "none"}
                  label="is none of these"
                  onChange={(event) => onChangeCondition(event, "city")}
                />
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
                <ElemTagsInput
                  value={filters.keywords.tags}
                  placeholder="e.g. Wallet, Blockchain, etc."
                  onChange={(tags) => onChangeTags(tags, "keywords")}
                />
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
              {`Industry (${filters.industry.length})`}
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
                        name={tag.id}
                        type="checkbox"
                        checked={filters.industry.some(
                          (item) => item === tag.id
                        )}
                        onChange={onChangeIndustry}
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
              {`Funding type (${filters.fundingType.length})`}
            </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg w-full max-w-xs p-5">
              <div className="font-bold text-sm">Funding type</div>
              <ul className="grid grid-cols-2 gap-x-5 overflow-y-auto no-scrollbar">
                {roundChoices.map((round) => (
                  <li
                    key={round.id}
                    className="flex items-center w-full min-w-max text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100"
                  >
                    <label className="relative flex items-center gap-2 cursor-pointer w-full  py-2 hover:bg-slate-100">
                      <input
                        id={round.id}
                        name={round.id}
                        type="checkbox"
                        checked={filters.fundingType.some(
                          (item) => item === round.id
                        )}
                        onChange={onChangeFundingType}
                        className="appearance-none w-4 h-4 border rounded border-slate-300 hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:ring-offset-0 focus:checked:bg-primary-500"
                      />
                      <div>{round.name}</div>
                    </label>
                  </li>
                ))}
              </ul>
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
              <div className="flex items-center space-x-4">
                <div className="grow">
                  <div className="text-sm text-slate-600">Min</div>
                  <input
                    name="fundingAmount.minVal"
                    type="text"
                    value={filters.fundingAmount.minVal}
                    onChange={onChangeRangeInput}
                    defaultValue={convertToInternationalCurrencySystem(25000)}
                    className="appearance-none border-none w-full border border-slate-200 rounded-md px-1 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                  />
                </div>
                <div className="pt-4 flex-none">{"–"}</div>
                <div className="grow">
                  <div className="text-sm text-slate-600">Max</div>
                  <input
                    name="fundingAmount.maxVal"
                    type="text"
                    value={filters.fundingAmount.maxVal}
                    onChange={onChangeRangeInput}
                    defaultValue={"Any"}
                    placeholder="Any"
                    className="appearance-none border-none w-full border border-slate-200 rounded-md px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <ElemMultiRangeSlider
                  value={[
                    filters.fundingAmount.minVal,
                    filters.fundingAmount.maxVal,
                  ]}
                  min={0}
                  max={1200000}
                  onChange={({ min, max }: { min: number; max: number }) =>
                    onChangeRangeSlider("fundingAmount", min, max)
                  }
                />
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
              <div className="flex flex-col gap-2 mt-2">
                <InputRadio
                  name="fundingInvestors"
                  value="any"
                  checked={filters.fundingInvestors.condition === "any"}
                  label="is any of these"
                  onChange={(event) =>
                    onChangeCondition(event, "fundingInvestors")
                  }
                />
                <ElemTagsInput
                  value={filters.fundingInvestors.tags}
                  placeholder="Enter an investor name"
                  onChange={(tags) => onChangeTags(tags, "fundingInvestors")}
                />
                <InputRadio
                  name="fundingInvestors"
                  value="none"
                  checked={filters.fundingInvestors.condition === "none"}
                  label="is none of these"
                  onChange={(event) =>
                    onChangeCondition(event, "fundingInvestors")
                  }
                />
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
                    type="text"
                    name="teamSize.minVal"
                    value={filters.teamSize.minVal}
                    onChange={onChangeRangeInput}
                    defaultValue={0}
                    className="appearance-none border-none w-20 border border-slate-200 rounded-md px-1 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                  />
                </div>
                <div className="pt-4">{"–"}</div>
                <div className="">
                  <div className="text-sm text-slate-600">Max</div>
                  <input
                    type="text"
                    name="teamSize.maxVal"
                    value={filters.teamSize.maxVal}
                    onChange={onChangeRangeInput}
                    defaultValue={"Any"}
                    placeholder="Any"
                    className="appearance-none border-none w-20 border border-slate-200 rounded-md px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <ElemMultiRangeSlider
                  value={[filters.teamSize.minVal, filters.teamSize.maxVal]}
                  min={0}
                  max={100}
                  onChange={({ min, max }: { min: number; max: number }) =>
                    onChangeRangeSlider("teamSize", min, max)
                  }
                />
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
