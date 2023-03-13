import React, { FC, useState, useEffect } from "react";
import { omit, cloneDeep } from "lodash";
import moment from "moment-timezone";
import { convertToInternationalCurrencySystem } from "@/utils";
import { getDefaultFilter, getFilterOptionMetadata } from "@/utils/filter";
import { Filters, FilterOptionKeys, DateRangeOptions } from "@/models/Filter";
import { ElemButton } from "./ElemButton";
import { InputRadio } from "./InputRadio";
import { ElemTagsInput } from "./ElemTagsInput";
import { ElemMultiRangeSlider } from "./ElemMultiRangeSlider";
import { InputDate } from "./InputDate";
import { ElemFilterPopup } from "./ElemFilterPopup";
import { ElemAddFilter } from "./ElemAddFilter";
import ElemAddressFilter from "./ElemAddressFilter";
import { InputText } from "./InputText";

type Props = {
  resourceType: "companies" | "vc_firms";
  filterValues: Filters | null;
  onApply: (name: FilterOptionKeys, filterParams: Filters) => void;
  onClearOption: (name: FilterOptionKeys) => void;
  onReset: () => void;
};

export const ElemFilter: FC<Props> = ({
  resourceType,
  filterValues,
  onApply,
  onClearOption,
  onReset,
}) => {
  const [openAddFilter, setOpenAddFilter] = useState<boolean>(false);

  const [filters, setFilters] = useState<Filters | null>(filterValues);

  useEffect(() => {
    setFilters(filterValues);
  }, [filterValues]);

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
    onClearOption(name);
  };

  const onOpenFilterPopup = (name: FilterOptionKeys) => {
    setFilters((prev) => ({
      ...prev,
      [name]: {
        ...prev?.[name],
        open: true,
      },
    }));
  };

  const onCloseFilterPopup = (name: FilterOptionKeys) => {
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

  const onChangeDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      address: {
        ...prev?.address,
        distance: +event.target.value,
      },
    }));
  }

  const onChangeAddress = (value: any) => {
    setFilters((prev) => ({
      ...prev,
      address: {
        ...prev?.address,
        value,
      },
    }));
  };

  const onChangeDateCondition = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const optionKey = event.target.name;
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
      [optionKey]: {
        ...prev?.[optionKey as keyof Filters],
        condition: selectedCondition,
        fromDate: fromDateString,
      },
    }));
  };

  const onChangeCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    option: FilterOptionKeys
  ) => {
    const newFilterOption = [...((filters?.[option] as any)?.tags || [])];
    if (event.target.checked) {
      newFilterOption.push(event.target.name);
    } else {
      const index = newFilterOption.indexOf(event.target.name);
      newFilterOption.splice(index, 1);
    }
    setFilters((prev) => ({
      ...prev,
      [option]: {
        ...prev?.[option],
        tags: newFilterOption,
      },
    }));
  };

  const onBlurAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [key, metric] = name.split(".");
    const newAmount: any = {
      ...filters?.[key as keyof Filters],
    };
    if (metric === "minVal") {
      newAmount.formattedMinVal = convertToInternationalCurrencySystem(+value);
    } else {
      newAmount.formattedMaxVal = convertToInternationalCurrencySystem(+value);
    }
    setFilters((prev) => ({
      ...prev,
      [key]: newAmount,
    }));
  };

  const onFocusAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const [key, metric] = name.split(".");
    const newAmount: any = {
      ...filters?.[key as keyof Filters],
    };
    if (metric === "minVal") {
      newAmount.formattedMinVal = newAmount?.minVal?.toString();
    } else {
      newAmount.formattedMaxVal = newAmount?.maxVal?.toString();
    }
    setFilters((prev) => ({
      ...prev,
      [key]: newAmount,
    }));
  };

  const onChangeRangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [option, metric] = name.split(".");
    const newData: any = {
      ...filters?.[option as keyof Filters],
      [metric]: value,
    };
    if (option === "fundingAmount" || option === "investmentAmountTotal") {
      if (metric === "minVal") {
        newData.formattedMinVal = value;
      }
      if (metric === "maxVal") {
        newData.formattedMaxVal = value;
      }
    }
    setFilters((prev) => ({
      ...prev,
      [option]: newData,
    }));
  };

  const onChangeRangeSlider = (
    name: FilterOptionKeys,
    minVal: number,
    maxVal: number
  ) => {
    const newData: any = {
      ...filters?.[name],
      minVal,
      maxVal,
    };
    if (name === "fundingAmount" || name === "investmentAmountTotal") {
      newData.formattedMinVal = convertToInternationalCurrencySystem(minVal);
      newData.formattedMaxVal = convertToInternationalCurrencySystem(maxVal);
    }
    setFilters((prev) => ({
      ...prev,
      [name]: newData,
    }));
  };

  const onChangeDateRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [option, metric] = name.split(".");
    setFilters((prev) => ({
      ...prev,
      [option]: {
        ...prev?.[option as keyof Filters],
        [metric]: value,
      },
    }));
  };

  const onFormatFilterParams = (name: FilterOptionKeys) => {
    const filterParams: any = cloneDeep(filters?.[name]);
    if (
      (name === "lastFundingDate" || name === "lastInvestmentDate") &&
      filterParams?.condition === "custom"
    ) {
      filterParams.fromDate = moment(filterParams.fromDate).toISOString();
      filterParams.toDate = moment(filterParams.toDate).toISOString();
    }
    delete filterParams.open;
    return filterParams;
  };

  const onApplyFilter = (name: FilterOptionKeys) => {
    onApply(name, onFormatFilterParams(name));
    onCloseFilterPopup(name);
  };

  const onResetFilters = () => {
    setFilters({});
    onReset();
  };

  return (
    <section className="w-full flex items-center justify-between mb-1 py-3">
      <div className="flex flex-col flex-wrap w-full gap-3 items-start lg:flex-row lg:items-center">
        <ElemAddFilter
          resourceType={resourceType}
          open={openAddFilter}
          onOpen={() => setOpenAddFilter(true)}
          onClose={() => setOpenAddFilter(false)}
          onSelectFilterOption={onSelectFilterOption}
        />

        {filters &&
          (Object.keys(filters) as FilterOptionKeys[]).map((option) => {
            const optionMetadata = getFilterOptionMetadata(option);
            if (
              option === "country" ||
              option === "state" ||
              option === "city" ||
              option === "fundingInvestors" ||
              option === "fundedCompanies"
            ) {
              return (
                <ElemFilterPopup
                  key={option}
                  open={!!filters[option]?.open}
                  name={option}
                  title={`${optionMetadata.title} (${
                    filters?.[option]?.tags?.length || 0
                  })`}
                  onOpen={onOpenFilterPopup}
                  onClose={onCloseFilterPopup}
                  onClear={onClearFilterOption}
                  onApply={onApplyFilter}
                >
                  <div className="font-bold text-sm">
                    {optionMetadata.heading}
                  </div>
                  <div className="flex flex-col gap-4 mt-2">
                    <div>
                      <InputRadio
                        name={option}
                        value="any"
                        checked={filters?.[option]?.condition === "any"}
                        label="is any of these"
                        onChange={(event) => onChangeCondition(event, option)}
                      />

                      <ElemTagsInput
                        value={filters?.[option]?.tags || []}
                        placeholder={optionMetadata.placeholder}
                        onChange={(tags) => onChangeTags(tags, option)}
                      />
                    </div>
                    <div>
                      <InputRadio
                        name={option}
                        value="none"
                        checked={filters?.[option]?.condition === "none"}
                        label="is none of these"
                        onChange={(event) => onChangeCondition(event, option)}
                        labelClass="mb-0.5"
                      />
                    </div>
                  </div>
                </ElemFilterPopup>
              );
            }

            if (option === "address") {
              return (
                <ElemFilterPopup
                  open={!!filters[option]?.open}
                  name={option}
                  title={optionMetadata.title || ''}
                  onOpen={onOpenFilterPopup}
                  onClose={onCloseFilterPopup}
                  onClear={onClearFilterOption}
                  onApply={onApplyFilter}
                >
                  <div className="font-bold text-sm">{optionMetadata.heading}</div>
                  <div className="flex items-center flex-wrap gap-2">
                    <span>Find within</span>
                    <InputText
                      type="number"
                      onChange={onChangeDistance}
                      value={filters[option]?.distance}
                      name="distance"
                      className="w-16"
                    />
                    <span>miles from this address:</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <ElemAddressFilter
                      value={filters[option]?.value}
                      onChange={onChangeAddress}
                    />
                  </div>
                </ElemFilterPopup>
              );
            }

            if (option === "keywords") {
              return (
                <ElemFilterPopup
                  key={option}
                  open={!!filters[option]?.open}
                  name={option}
                  title={`${optionMetadata.title} (${
                    filters?.[option]?.tags?.length || 0
                  })`}
                  onOpen={onOpenFilterPopup}
                  onClose={onCloseFilterPopup}
                  onClear={onClearFilterOption}
                  onApply={onApplyFilter}
                >
                  <div className="font-bold text-sm">
                    {optionMetadata.heading}
                  </div>
                  <div className="mt-1">
                    <ElemTagsInput
                      value={filters?.[option]?.tags || []}
                      placeholder={optionMetadata.placeholder}
                      onChange={(tags) => onChangeTags(tags, option)}
                      subtext={optionMetadata.subtext}
                    />
                  </div>
                </ElemFilterPopup>
              );
            }

            if (
              option === "industry" ||
              option === "fundingType" ||
              option === "investmentType"
            ) {
              return (
                <ElemFilterPopup
                  key={option}
                  open={!!filters[option]?.open}
                  name={option}
                  title={`${optionMetadata.title} (${
                    filters?.[option]?.tags?.length || 0
                  })`}
                  onOpen={onOpenFilterPopup}
                  onClose={onCloseFilterPopup}
                  onClear={onClearFilterOption}
                  onApply={onApplyFilter}
                  popupClass="max-w-xl"
                >
                  <div className="font-bold text-sm mb-1">
                    {optionMetadata.heading}
                  </div>
                  <ul className="grid grid-cols-2 gap-x-5 overflow-y-auto scrollbar-hide lg:grid-cols-4">
                    {optionMetadata.choices?.map((choice) => (
                      <li
                        key={choice.id}
                        className="flex items-center w-full min-w-max text-sm text-left font-medium"
                      >
                        <label className="relative flex items-center gap-2 cursor-pointer w-full px-2 py-1.5 rounded-md overflow-hidden hover:text-primary-500 hover:bg-slate-100">
                          <input
                            id={choice.id}
                            name={choice.id}
                            type="checkbox"
                            checked={filters?.[option]?.tags?.some(
                              (item) => item === choice.id
                            )}
                            onChange={(e) => onChangeCheckbox(e, option)}
                            className="appearance-none w-4 h-4 border rounded border-slate-300 hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:ring-offset-0 focus:checked:bg-primary-500"
                          />
                          <div>{choice.name}</div>
                        </label>
                      </li>
                    ))}
                  </ul>
                </ElemFilterPopup>
              );
            }

            if (
              option === "fundingAmount" ||
              option === "investmentAmountTotal"
            ) {
              return (
                <ElemFilterPopup
                  key={option}
                  open={!!filters[option]?.open}
                  name={option}
                  title={optionMetadata.title || ""}
                  onOpen={onOpenFilterPopup}
                  onClose={onCloseFilterPopup}
                  onClear={onClearFilterOption}
                  onApply={onApplyFilter}
                >
                  <div className="font-bold text-sm">
                    {optionMetadata.heading}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="grow">
                      <div className="text-sm text-slate-600">Min</div>
                      <input
                        name={`${option}.minVal`}
                        type="text"
                        value={filters?.[option]?.formattedMinVal}
                        onChange={onChangeRangeInput}
                        onBlur={onBlurAmount}
                        onFocus={onFocusAmount}
                        className="appearance-none border-none w-full border border-slate-200 rounded-md px-1 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                      />
                    </div>
                    <div className="pt-4 flex-none">{"–"}</div>
                    <div className="grow">
                      <div className="text-sm text-slate-600">Max</div>
                      <input
                        name={`${option}.maxVal`}
                        type="text"
                        value={filters?.[option]?.formattedMaxVal}
                        onChange={onChangeRangeInput}
                        onBlur={onBlurAmount}
                        onFocus={onFocusAmount}
                        className="appearance-none border-none w-full border border-slate-200 rounded-md px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <ElemMultiRangeSlider
                      value={[
                        filters?.[option]?.minVal || 0,
                        filters?.[option]?.maxVal || 0,
                      ]}
                      min={optionMetadata.min || 0}
                      max={optionMetadata.max || 1000000000}
                      step={optionMetadata.step || 1}
                      onChange={({ min, max }: { min: number; max: number }) =>
                        onChangeRangeSlider(option, min, max)
                      }
                    />
                  </div>
                </ElemFilterPopup>
              );
            }

            if (
              option === "lastFundingDate" ||
              option === "lastInvestmentDate"
            ) {
              return (
                <ElemFilterPopup
                  key={option}
                  open={!!filters[option]?.open}
                  name={option}
                  title={optionMetadata.title || ""}
                  onOpen={onOpenFilterPopup}
                  onClose={onCloseFilterPopup}
                  onClear={onClearFilterOption}
                  onApply={onApplyFilter}
                >
                  <div className="font-bold text-sm">
                    {optionMetadata.heading}
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <InputRadio
                      name={option}
                      value="30-days"
                      checked={filters?.[option]?.condition === "30-days"}
                      label="Past 30 days"
                      onChange={onChangeDateCondition}
                    />
                    <InputRadio
                      name={option}
                      value="60-days"
                      checked={filters?.[option]?.condition === "60-days"}
                      label="Past 60 days"
                      onChange={onChangeDateCondition}
                    />
                    <InputRadio
                      name={option}
                      value="90-days"
                      checked={filters?.[option]?.condition === "90-days"}
                      label="Past 90 days"
                      onChange={onChangeDateCondition}
                    />
                    <InputRadio
                      name={option}
                      value="year"
                      checked={filters?.[option]?.condition === "year"}
                      label="Past year"
                      onChange={onChangeDateCondition}
                    />
                    <InputRadio
                      name={option}
                      value="custom"
                      checked={filters?.[option]?.condition === "custom"}
                      label="Custom date range"
                      onChange={onChangeDateCondition}
                    />
                  </div>
                  {filters?.[option]?.condition === "custom" && (
                    <div className="flex items-center gap-x-4 mt-2">
                      <InputDate
                        name={`${option}.fromDate`}
                        value={filters?.[option]?.fromDate ?? ""}
                        onChange={onChangeDateRange}
                        className="block max-w-sm placeholder-slate-500"
                      />
                      <div className="flex-none">{"–"}</div>
                      <InputDate
                        name={`${option}.toDate`}
                        value={filters?.[option]?.toDate ?? ""}
                        onChange={onChangeDateRange}
                        className="block max-w-sm placeholder-slate-500"
                      />
                    </div>
                  )}
                </ElemFilterPopup>
              );
            }

            if (
              option === "teamSize" ||
              option === "numOfInvestments" ||
              option === "numOfExits"
            ) {
              return (
                <ElemFilterPopup
                  key={option}
                  open={!!filters[option]?.open}
                  name={option}
                  title={optionMetadata.title || ""}
                  onOpen={onOpenFilterPopup}
                  onClose={onCloseFilterPopup}
                  onClear={onClearFilterOption}
                  onApply={onApplyFilter}
                >
                  <div className="font-bold text-sm">
                    {optionMetadata.heading}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="">
                      <div className="text-sm text-slate-600">Min</div>
                      <input
                        type="text"
                        name={`${option}.minVal`}
                        value={filters?.[option]?.minVal}
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
                        name={`${option}.maxVal`}
                        value={filters?.[option]?.maxVal}
                        onChange={onChangeRangeInput}
                        defaultValue="Any"
                        className="appearance-none border-none w-20 border border-slate-200 rounded-md px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <ElemMultiRangeSlider
                      value={[
                        filters?.[option]?.minVal || 0,
                        filters?.[option]?.maxVal || 0,
                      ]}
                      min={optionMetadata.min || 0}
                      max={optionMetadata.max || 200}
                      step={optionMetadata.step || 5}
                      onChange={({ min, max }: { min: number; max: number }) =>
                        onChangeRangeSlider(option, min, max)
                      }
                    />
                  </div>
                </ElemFilterPopup>
              );
            }

            return null;
          })}

        {filters && Object.keys(filters).length > 0 && (
          <div>
            <ElemButton
              btn="transparent"
              size="sm"
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
