import React, { FC, useMemo, useState } from "react";
import { Popover } from "@headlessui/react";
import { omit, cloneDeep } from "lodash";
import moment from "moment-timezone";
import { convertToInternationalCurrencySystem } from "@/utils";
import { IconPlus } from "@/components/Icons";
import { companiesFilterOptions, roundChoices, tags } from "@/utils/constants";
import { ElemButton } from "../ElemButton";
import { InputRadio } from "../InputRadio";
import { ElemTagsInput } from "../ElemTagsInput";
import { ElemMultiRangeSlider } from "../ElemMultiRangeSlider";
import { InputDate } from "../InputDate";
import { ElemCompaniesFilterPopover } from "./ElemCompaniesFilterPopover";
import { ElemCompaniesAddFilter } from "./ElemCompaniesAddFilter";

export type FilterOptionKeys =
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

type DateRangeOptions =
  | "30-days"
  | "60-days"
  | "90-days"
  | "year"
  | "custom"
  | undefined;

export type Filters = {
  country?: {
    open?: boolean;
    condition: "any" | "none";
    tags: Array<string>;
  };
  state?: {
    open?: boolean;
    condition: "any" | "none";
    tags: Array<string>;
  };
  city?: {
    open?: boolean;
    condition: "any" | "none";
    tags: Array<string>;
  };
  keywords?: {
    open?: boolean;
    tags: Array<string>;
  };
  industry?: {
    open?: boolean;
    tags: Array<string>;
  };
  fundingType?: {
    open?: boolean;
    tags: Array<string>;
  };
  fundingAmount?: {
    open?: boolean;
    minVal?: number;
    maxVal?: number;
  };
  lastFundingDate?: {
    open?: boolean;
    condition?: DateRangeOptions;
    fromDate?: string;
    toDate?: string;
  };
  fundingInvestors?: {
    open?: boolean;
    condition: "any" | "none";
    tags: Array<string>;
  };
  teamSize?: {
    open?: boolean;
    minVal: number;
    maxVal: number;
  };
};

type Props = {
  onApply: (filterParams: Filters) => void;
  onReset: () => void;
};

export const ElemCompaniesFilter: FC<Props> = ({ onApply, onReset }) => {
  const [openAddFilter, setOpenAddFilter] = useState<boolean>(false);

  const [filters, setFilters] = useState<Filters>();

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

  const getDefaultFilter = (name: FilterOptionKeys) => {
    switch (name) {
      case "country":
      case "state":
      case "city":
      case "fundingInvestors":
        return {
          condition: "any",
          tags: [],
        };
      case "keywords":
        return {
          tags: [],
        };
      case "industry":
      case "fundingType":
        return [];
      case "fundingAmount":
        return {
          minVal: 0,
          maxVal: 25000000,
        };
      case "lastFundingDate":
        return {
          condition: "30-days",
          fromDate: moment().subtract(30, "days").toISOString(),
        };
      case "teamSize":
        return {
          minVal: 0,
          maxVal: 100,
        };
      default:
        return null;
    }
  };

  const onSelectFilterOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenAddFilter(false);
    const { name } = event.target as HTMLButtonElement;
    setFilters((prev) => ({
      ...prev,
      [name]: {
        ...getDefaultFilter(name as FilterOptionKeys),
        open: true,
      },
    }));
  };

  const onClearFilterOption = (name: FilterOptionKeys) => {
    setFilters(omit(filters, name));
    onApply(onFormatFilterParams(omit(filters, name)));
  };

  const onOpenFilterPopover = (name: FilterOptionKeys) => {
    setFilters((prev) => ({
      ...prev,
      [name]: {
        ...prev?.[name],
        open: true,
      },
    }));
  };

  const onCloseFilterPopover = (name: FilterOptionKeys) => {
    setFilters((prev) => ({
      ...prev,
      [name]: {
        ...prev?.[name],
        open: false,
      },
    }));
  };

  const onChangeTags = (selectedTags: Array<string>, name: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: {
        ...prev?.[name as keyof Filters],
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
        ...prev?.[name as keyof Filters],
        condition: event.target.value,
      },
    }));
  };

  const onChangeLastFundingDateCondition = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedCondition = event.target.value as DateRangeOptions;
    let fromDateString: string | undefined;
    if (selectedCondition === "30-days") {
      fromDateString = moment().subtract(30, "days").toISOString();
    } else if (selectedCondition === "60-days") {
      fromDateString = moment().subtract(60, "days").toISOString();
    } else if (selectedCondition === "90-days") {
      fromDateString = moment().subtract(90, "days").toISOString();
    } else if (selectedCondition === "year") {
      fromDateString = moment().subtract(1, "years").toISOString();
    } else {
      fromDateString = undefined;
    }

    setFilters((prev) => ({
      ...prev,
      lastFundingDate: {
        ...prev?.lastFundingDate,
        condition: selectedCondition,
        fromDate: fromDateString,
      },
    }));
  };

  const onChangeIndustry = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterIndustry = [...(filters?.industry?.tags || [])];
    if (event.target.checked) {
      newFilterIndustry.push(event.target.name);
    } else {
      const index = newFilterIndustry.indexOf(event.target.name);
      newFilterIndustry.splice(index, 1);
    }
    setFilters((prev) => ({
      ...prev,
      industry: {
        ...prev?.industry,
        tags: newFilterIndustry,
      },
    }));
  };

  const onChangeFundingType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterFundingType = [...(filters?.fundingType?.tags || [])];
    if (event.target.checked) {
      newFilterFundingType.push(event.target.name);
    } else {
      const index = newFilterFundingType.indexOf(event.target.name);
      newFilterFundingType.splice(index, 1);
    }
    setFilters((prev) => ({
      ...prev,
      fundingType: {
        ...prev?.fundingType,
        tags: newFilterFundingType,
      },
    }));
  };

  const onChangeRangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [option, metric] = name.split(".");
    setFilters((prev) => ({
      ...prev,
      [option]: {
        ...prev?.[name as keyof Filters],
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

  const onChangeLastFundingDateRange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      lastFundingDate: {
        ...prev?.lastFundingDate,
        [name]: value,
      },
    }));
  };

  const onFormatFilterParams = (filter: Filters) => {
    const filterParams = cloneDeep(filter);
    if (filterParams?.lastFundingDate?.condition === "custom") {
      filterParams.lastFundingDate.fromDate = moment(
        filterParams.lastFundingDate.fromDate
      ).toISOString();
      filterParams.lastFundingDate.toDate = moment(
        filterParams.lastFundingDate.toDate
      ).toISOString();
    }
    return filterParams;
  };

  const onApplyFilters = () => {
    onApply(onFormatFilterParams(filters as Filters));
  };

  const onResetFilters = () => {
    setFilters({});
    onApply({});
  };

  return (
    <section className="w-full flex items-center justify-between mb-1 py-3">
      <div className="flex items-center space-x-3 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-mandatory touch-pan-x">
        <ElemCompaniesAddFilter
          open={openAddFilter}
          onOpen={() => setOpenAddFilter(true)}
          onClose={() => setOpenAddFilter(false)}
          onSelectFilterOption={onSelectFilterOption}
        />

        {filters?.country && (
          <ElemCompaniesFilterPopover
            open={!!filters.country.open}
            name="country"
            title={`Country (${filters?.country?.tags?.length || 0})`}
            onOpen={onOpenFilterPopover}
            onClose={onCloseFilterPopover}
            onClear={onClearFilterOption}
          >
            <div className="font-bold text-sm">Country</div>
            <div className="flex flex-col gap-2 mt-2">
              <InputRadio
                name="country"
                value="any"
                checked={filters?.country?.condition === "any"}
                label="is any of these"
                onChange={(event) => onChangeCondition(event, "country")}
              />
              <ElemTagsInput
                value={filters?.country?.tags || []}
                placeholder="Enter a country name"
                onChange={(tags) => onChangeTags(tags, "country")}
              />
              <InputRadio
                name="country"
                value="none"
                checked={filters?.country?.condition === "none"}
                label="is none of these"
                onChange={(event) => onChangeCondition(event, "country")}
              />
            </div>
          </ElemCompaniesFilterPopover>
        )}

        {filters?.state && (
          <ElemCompaniesFilterPopover
            open={!!filters.state.open}
            name="state"
            title={`State (${filters?.state?.tags?.length || 0})`}
            onOpen={onOpenFilterPopover}
            onClose={onCloseFilterPopover}
            onClear={onClearFilterOption}
          >
            <div className="font-bold text-sm">State</div>
            <div className="flex flex-col gap-2 mt-2">
              <InputRadio
                name="state"
                value="any"
                checked={filters?.state?.condition === "any"}
                label="is any of these"
                onChange={(event) => onChangeCondition(event, "state")}
              />
              <ElemTagsInput
                value={filters?.state?.tags || []}
                placeholder="Enter a state name"
                onChange={(tags) => onChangeTags(tags, "state")}
              />
              <InputRadio
                name="state"
                value="none"
                checked={filters?.state?.condition === "none"}
                label="is none of these"
                onChange={(event) => onChangeCondition(event, "state")}
              />
            </div>
          </ElemCompaniesFilterPopover>
        )}

        {filters?.city && (
          <ElemCompaniesFilterPopover
            open={!!filters.city.open}
            name="city"
            title={`City (${filters?.city?.tags?.length || 0})`}
            onOpen={onOpenFilterPopover}
            onClose={onCloseFilterPopover}
            onClear={onClearFilterOption}
          >
            <div className="font-bold text-sm">City</div>
            <div className="flex flex-col gap-2 mt-2">
              <InputRadio
                name="city"
                value="any"
                checked={filters?.city?.condition === "any"}
                label="is any of these"
                onChange={(event) => onChangeCondition(event, "city")}
              />
              <ElemTagsInput
                value={filters?.city?.tags || []}
                placeholder="Enter a city name"
                onChange={(tags) => onChangeTags(tags, "city")}
              />
              <InputRadio
                name="city"
                value="none"
                checked={filters?.city?.condition === "none"}
                label="is none of these"
                onChange={(event) => onChangeCondition(event, "city")}
              />
            </div>
          </ElemCompaniesFilterPopover>
        )}

        {filters?.keywords && (
          <ElemCompaniesFilterPopover
            open={!!filters.keywords.open}
            name="keywords"
            title={`Keywords (${filters?.keywords?.tags?.length || 0})`}
            onOpen={onOpenFilterPopover}
            onClose={onCloseFilterPopover}
            onClear={onClearFilterOption}
          >
            <div className="font-bold text-sm">Description Keywords</div>
            <div className="mt-1">
              <ElemTagsInput
                value={filters?.keywords?.tags || []}
                placeholder="e.g. Wallet, Blockchain, etc."
                onChange={(tags) => onChangeTags(tags, "keywords")}
              />
            </div>
          </ElemCompaniesFilterPopover>
        )}

        {filters?.industry && (
          <ElemCompaniesFilterPopover
            open={!!filters.industry.open}
            name="industry"
            title={`Industry (${filters?.industry?.tags?.length || 0})`}
            onOpen={onOpenFilterPopover}
            onClose={onCloseFilterPopover}
            onClear={onClearFilterOption}
          >
            <div className="font-bold text-sm">Industry</div>
            <ul className="grid grid-cols-4 gap-x-5 overflow-y-auto no-scrollbar">
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
                      checked={filters?.industry?.tags?.some(
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
          </ElemCompaniesFilterPopover>
        )}

        {filters?.fundingType && (
          <ElemCompaniesFilterPopover
            open={!!filters.fundingType.open}
            name="fundingType"
            title={`Funding type (${filters?.fundingType?.tags?.length || 0})`}
            onOpen={onOpenFilterPopover}
            onClose={onCloseFilterPopover}
            onClear={onClearFilterOption}
          >
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
                      checked={filters?.fundingType?.tags?.some(
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
          </ElemCompaniesFilterPopover>
        )}

        {filters?.fundingAmount && (
          <ElemCompaniesFilterPopover
            open={!!filters.fundingAmount.open}
            name="fundingAmount"
            title="Funding amount"
            onOpen={onOpenFilterPopover}
            onClose={onCloseFilterPopover}
            onClear={onClearFilterOption}
          >
            <div className="font-bold text-sm">Funding amount total</div>
            <div className="flex items-center space-x-4">
              <div className="grow">
                <div className="text-sm text-slate-600">Min</div>
                <input
                  name="fundingAmount.minVal"
                  type="text"
                  value={filters?.fundingAmount?.minVal}
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
                  value={filters?.fundingAmount?.maxVal}
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
                  filters?.fundingAmount?.minVal || 0,
                  filters?.fundingAmount?.maxVal || 0,
                ]}
                min={0}
                max={50000000}
                step={500}
                onChange={({ min, max }: { min: number; max: number }) =>
                  onChangeRangeSlider("fundingAmount", min, max)
                }
              />
            </div>
          </ElemCompaniesFilterPopover>
        )}

        {filters?.lastFundingDate && (
          <ElemCompaniesFilterPopover
            open={!!filters.lastFundingDate.open}
            name="lastFundingDate"
            title="Last funding date"
            onOpen={onOpenFilterPopover}
            onClose={onCloseFilterPopover}
            onClear={onClearFilterOption}
          >
            <div className="font-bold text-sm">Last funding date</div>
            <div className="flex flex-col gap-2 mt-2">
              <InputRadio
                name="lastFundingDate"
                value="30-days"
                checked={filters?.lastFundingDate?.condition === "30-days"}
                label="Past 30 days"
                onChange={onChangeLastFundingDateCondition}
              />
              <InputRadio
                name="lastFundingDate"
                value="60-days"
                checked={filters?.lastFundingDate?.condition === "60-days"}
                label="Past 60 days"
                onChange={onChangeLastFundingDateCondition}
              />
              <InputRadio
                name="lastFundingDate"
                value="90-days"
                checked={filters?.lastFundingDate?.condition === "90-days"}
                label="Past 90 days"
                onChange={onChangeLastFundingDateCondition}
              />
              <InputRadio
                name="lastFundingDate"
                value="year"
                checked={filters?.lastFundingDate?.condition === "year"}
                label="Past year"
                onChange={onChangeLastFundingDateCondition}
              />
              <InputRadio
                name="lastFundingDate"
                value="custom"
                checked={filters?.lastFundingDate?.condition === "custom"}
                label="Custom date range"
                onChange={onChangeLastFundingDateCondition}
              />
            </div>
            {filters?.lastFundingDate?.condition === "custom" && (
              <div className="flex items-center gap-x-4 mt-2">
                <InputDate
                  name="fromDate"
                  value={filters?.lastFundingDate?.fromDate ?? ""}
                  onChange={onChangeLastFundingDateRange}
                  className="block max-w-sm placeholder-slate-500"
                />
                <div className="flex-none">{"–"}</div>
                <InputDate
                  name="toDate"
                  value={filters?.lastFundingDate?.toDate ?? ""}
                  onChange={onChangeLastFundingDateRange}
                  className="block max-w-sm placeholder-slate-500"
                />
              </div>
            )}
          </ElemCompaniesFilterPopover>
        )}

        {filters?.fundingInvestors && (
          <ElemCompaniesFilterPopover
            open={!!filters.fundingInvestors.open}
            name="fundingInvestors"
            title={`Funding investors (${
              filters?.fundingInvestors?.tags?.length || 0
            })`}
            onOpen={onOpenFilterPopover}
            onClose={onCloseFilterPopover}
            onClear={onClearFilterOption}
          >
            <div className="font-bold text-sm">Funding investors</div>
            <div className="flex flex-col gap-2 mt-2">
              <InputRadio
                name="fundingInvestors"
                value="any"
                checked={filters?.fundingInvestors?.condition === "any"}
                label="is any of these"
                onChange={(event) =>
                  onChangeCondition(event, "fundingInvestors")
                }
              />
              <ElemTagsInput
                value={filters?.fundingInvestors?.tags || []}
                placeholder="Enter an investor name"
                onChange={(tags) => onChangeTags(tags, "fundingInvestors")}
              />
              <InputRadio
                name="fundingInvestors"
                value="none"
                checked={filters?.fundingInvestors?.condition === "none"}
                label="is none of these"
                onChange={(event) =>
                  onChangeCondition(event, "fundingInvestors")
                }
              />
            </div>
          </ElemCompaniesFilterPopover>
        )}

        {filters?.teamSize && (
          <ElemCompaniesFilterPopover
            open={!!filters.teamSize.open}
            name="teamSize"
            title="Team size"
            onOpen={onOpenFilterPopover}
            onClose={onCloseFilterPopover}
            onClear={onClearFilterOption}
          >
            <div className="font-bold text-sm">Team size</div>
            <div className="flex items-center space-x-2">
              <div className="">
                <div className="text-sm text-slate-600">Min</div>
                <input
                  type="text"
                  name="teamSize.minVal"
                  value={filters?.teamSize?.minVal}
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
                  name="teamSize.?maxVal"
                  value={filters?.teamSize?.maxVal}
                  onChange={onChangeRangeInput}
                  defaultValue={"Any"}
                  placeholder="Any"
                  className="appearance-none border-none w-20 border border-slate-200 rounded-md px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <ElemMultiRangeSlider
                value={[
                  filters?.teamSize?.minVal || 0,
                  filters?.teamSize?.maxVal || 0,
                ]}
                min={0}
                max={200}
                step={5}
                onChange={({ min, max }: { min: number; max: number }) =>
                  onChangeRangeSlider("teamSize", min, max)
                }
              />
            </div>
          </ElemCompaniesFilterPopover>
        )}

        {filters && Object.keys(filters).length > 0 && (
          <div>
            <ElemButton
              btn="primary-light"
              onClick={onApplyFilters}
              className="snap-start shrink-0"
            >
              Apply
            </ElemButton>
            <ElemButton
              btn="transparent"
              onClick={onResetFilters}
              className="snap-start shrink-0"
            >
              Reset
            </ElemButton>
          </div>
        )}
      </div>
    </section>
  );
};
