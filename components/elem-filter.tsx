import React, { FC, useState, useEffect, Fragment } from 'react';
import { omit, cloneDeep, lowerCase } from 'lodash';
import moment from 'moment-timezone';
import {
  convertCurrencyStringToIntNumber,
  convertToInternationalCurrencySystem,
} from '@/utils';
import { Place } from '@aws-sdk/client-location';
import { getFilterOptionMetadata } from '@/utils/filter';
import {
  Filters,
  FilterOptionKeys,
  DateRangeOptions,
  DateCondition,
  FilterOptionMetadata,
} from '@/models/Filter';
import { InputRadio } from './input-radio';
import { ElemMultiRangeSlider } from './elem-multi-range-slider';
import { InputDate } from './input-date';
import { ElemFilterPopup } from './elem-filter-popup';
import ElemAddressFilter from './elem-address-filter';
import { InputText } from './input-text';
import { InputSelect } from './input-select';
import { eventSizeChoices, ISO_DATE_FORMAT } from '@/utils/constants';
import ElemFilterTagsInput from './elem-filter-tags-input';
import { ElemFilterLocation } from './elem-filter-location';
import { ElemAddFilter } from './elem-add-filter';
import { getGeometryPlace } from '@/utils/helpers';
import ElemFilterCheckboxTags from './elem-filter-checkbox-tags';
import { useUser } from '@/context/user-context';

type Props = {
  className?: string;
  resourceType: 'companies' | 'vc_firms' | 'events';
  excludeFilters?: string[];
  filterValues: Filters | null;
  onChangeFilterValues: (values: Filters | null) => void;
  dateCondition?: DateCondition;
  onSelectFilterOption: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onApply: (name: FilterOptionKeys, filterParams: Filters) => void;
  onClearOption: (name: FilterOptionKeys) => void;
  onReset: () => void;
};

export const ElemFilter: FC<Props> = ({
  className = '',
  resourceType,
  excludeFilters = [],
  filterValues,
  dateCondition = 'past',
  onChangeFilterValues,
  onSelectFilterOption,
  onApply,
  onClearOption,
  onReset,
}) => {
  const { selectedLibrary } = useUser();

  const [filters, setFilters] = useState<Filters | null>(filterValues);

  useEffect(() => {
    setFilters(filterValues);
  }, [filterValues]);

  const onClearFilterOption = (name: FilterOptionKeys) => {
    if (Object.keys(filters || {}).length > 1) {
      onClearOption(name);
    } else {
      onReset();
    }
  };

  const onOpenFilterPopup = (name: FilterOptionKeys) => {
    setFilters(prev => ({
      ...prev,
      [name]: {
        ...prev?.[name],
        open: true,
      },
    }));
  };

  const onCloseFilterPopup = (name: FilterOptionKeys) => {
    onChangeFilterValues({
      ...filterValues,
      [name]: {
        ...filterValues?.[name],
        open: false,
      },
    });
  };

  const onChangeTags = (selectedTags: Array<string>, name: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: {
        ...prev?.[name as keyof Filters],
        tags: selectedTags,
      },
    }));
  };

  const onChangeCondition = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    setFilters(prev => ({
      ...prev,
      [name]: {
        ...prev?.[name as keyof Filters],
        condition: event.target.value,
      },
    }));
  };

  const onChangeDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      address: {
        ...prev?.address,
        distance: +event.target.value,
      },
    }));
  };

  const onChangeAddress = (value: Place) => {
    setFilters(prev => ({
      ...prev,
      address: {
        ...prev?.address,
        value: {
          ...value,
          geometry: getGeometryPlace(value),
        },
      },
    }));
  };

  const onChangeDateCondition = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const optionKey = event.target.name;
    const selectedCondition = event.target.value as DateRangeOptions;
    let fromDateString: string | undefined;
    let toDateString: string | undefined;

    if (resourceType === 'events') {
      if (selectedCondition === '30-days') {
        fromDateString =
          dateCondition === 'past'
            ? moment().subtract(30, 'days').toISOString()
            : moment().toISOString();
        toDateString =
          dateCondition === 'past'
            ? moment().toISOString()
            : moment().add(30, 'days').toISOString();
      } else if (selectedCondition === '60-days') {
        fromDateString =
          dateCondition === 'past'
            ? moment().subtract(60, 'days').toISOString()
            : moment().toISOString();
        toDateString =
          dateCondition === 'past'
            ? moment().toISOString()
            : moment().add(60, 'days').toISOString();
      } else if (selectedCondition === '90-days') {
        fromDateString =
          dateCondition === 'past'
            ? moment().subtract(90, 'days').toISOString()
            : moment().toISOString();
        toDateString =
          dateCondition === 'past'
            ? moment().toISOString()
            : moment().add(90, 'days').toISOString();
      } else if (selectedCondition === 'year') {
        fromDateString =
          dateCondition === 'past'
            ? moment().subtract(1, 'years').toISOString()
            : moment().toISOString();
        toDateString =
          dateCondition === 'past'
            ? moment().toISOString()
            : moment().add(1, 'years').toISOString();
      } else {
        fromDateString = undefined;
      }
    } else {
      if (selectedCondition === '30-days') {
        fromDateString = moment().subtract(30, 'days').toISOString();
      } else if (selectedCondition === '60-days') {
        fromDateString = moment().subtract(60, 'days').toISOString();
      } else if (selectedCondition === '90-days') {
        fromDateString = moment().subtract(90, 'days').toISOString();
      } else if (selectedCondition === 'year') {
        fromDateString = moment().subtract(1, 'years').toISOString();
      } else {
        fromDateString = undefined;
      }
    }

    setFilters(prev => ({
      ...prev,
      [optionKey]: {
        ...prev?.[optionKey as keyof Filters],
        condition: selectedCondition,
        fromDate: fromDateString,
        toDate: toDateString,
      },
    }));
  };

  const onChangeCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    option: FilterOptionKeys,
  ) => {
    const newFilterOption = [...((filters?.[option] as any)?.tags || [])];
    if (event.target.checked) {
      newFilterOption.push(event.target.name);
    } else {
      const index = newFilterOption.indexOf(event.target.name);
      newFilterOption.splice(index, 1);
    }
    setFilters(prev => ({
      ...prev,
      [option]: {
        ...prev?.[option],
        tags: newFilterOption,
      },
    }));
  };

  const onToggleSelectAllTags = (
    option: FilterOptionKeys,
    checked: boolean,
    choices: FilterOptionMetadata['choices'],
  ) => {
    setFilters(prev => ({
      ...prev,
      [option]: {
        ...prev?.[option],
        tags: checked ? choices?.map(item => item.name) : [],
      },
    }));
  };

  const onBlurAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [key, metric] = name.split('.');
    const newAmount: any = {
      ...filters?.[key as keyof Filters],
    };
    const numberValue = convertCurrencyStringToIntNumber(value);
    if (metric === 'minVal') {
      newAmount.formattedMinVal =
        convertToInternationalCurrencySystem(numberValue);
      newAmount.minVal = numberValue;
    } else {
      newAmount.formattedMaxVal =
        convertToInternationalCurrencySystem(numberValue);
      newAmount.maxVal = numberValue;
    }
    setFilters(prev => ({
      ...prev,
      [key]: newAmount,
    }));
  };

  const onFocusAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const [key, metric] = name.split('.');
    const newAmount: any = {
      ...filters?.[key as keyof Filters],
    };
    if (metric === 'minVal') {
      newAmount.formattedMinVal = newAmount?.minVal?.toString();
    } else {
      newAmount.formattedMaxVal = newAmount?.maxVal?.toString();
    }
    setFilters(prev => ({
      ...prev,
      [key]: newAmount,
    }));
  };

  const onChangeRangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [option, metric] = name.split('.');
    const newData: any = {
      ...filters?.[option as keyof Filters],
      [metric]: convertCurrencyStringToIntNumber(value),
    };
    if (
      option === 'fundingAmount' ||
      option === 'investmentAmountTotal' ||
      option === 'eventPrice'
    ) {
      if (metric === 'minVal') {
        newData.formattedMinVal = value;
      }
      if (metric === 'maxVal') {
        newData.formattedMaxVal = value;
      }
    }
    setFilters(prev => ({
      ...prev,
      [option]: newData,
    }));
  };

  const onChangeRangeSlider = (
    name: FilterOptionKeys,
    minVal: number,
    maxVal: number,
  ) => {
    const newData: any = {
      ...filters?.[name],
      minVal,
      maxVal,
    };
    if (
      name === 'fundingAmount' ||
      name === 'investmentAmountTotal' ||
      name === 'eventPrice'
    ) {
      newData.formattedMinVal = convertToInternationalCurrencySystem(minVal);
      newData.formattedMaxVal = convertToInternationalCurrencySystem(maxVal);
    }
    setFilters(prev => ({
      ...prev,
      [name]: newData,
    }));
  };

  const onChangeDateRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const [option, metric] = name.split('.');
    setFilters(prev => ({
      ...prev,
      [option]: {
        ...prev?.[option as keyof Filters],
        [metric]: value,
      },
    }));
  };

  const onChangeEventSize = (value: Record<string, any>) => {
    setFilters(prev => ({
      ...prev,
      eventSize: {
        ...prev?.eventSize,
        value,
      },
    }));
  };

  const onFormatFilterParams = (name: FilterOptionKeys) => {
    const filterParams: any = cloneDeep(filters?.[name]);
    if (
      (name === 'lastFundingDate' ||
        name === 'lastInvestmentDate' ||
        name === 'eventDate') &&
      filterParams?.condition === 'custom'
    ) {
      filterParams.fromDate = moment(filterParams.fromDate).toISOString();
      filterParams.toDate = moment(filterParams.toDate).toISOString();
    }
    delete filterParams.open;
    return filterParams;
  };

  const onApplyFilter = (name: FilterOptionKeys) => {
    onApply(name, onFormatFilterParams(name));
  };

  const onApplyFilterTags = (name: FilterOptionKeys, tags: string[]) => {
    onChangeTags(tags, name);
    if (
      [
        'country',
        'state',
        'city',
        'fundingInvestors',
        'fundedCompanies',
        'keywords',
      ].includes(name)
    ) {
      const filterParams = cloneDeep(filters?.[name]);
      if (filterParams && 'tags' in filterParams) {
        filterParams.tags = tags;
        delete filterParams.open;
        onApply(name, filterParams as Filters);
      }
    }
  };

  const extractTagsArrayToText = (tags: string[]) => {
    const numOfTags = tags.length;
    return tags.map((tagItem, tagIndex) => (
      <Fragment key={tagItem}>
        <span className="font-medium">{tagItem}</span>
        {tagIndex < numOfTags - 1 &&
          (tagIndex < numOfTags - 2 ? ', ' : ' and ')}
      </Fragment>
    ));
  };

  return (
    <section className={`${className}`}>
      <div className="flex flex-col flex-wrap w-full gap-3 items-start lg:flex-row lg:items-center">
        {filters &&
          (Object.keys(filters) as FilterOptionKeys[]).map(option => {
            const optionMetadata = getFilterOptionMetadata(
              option,
              dateCondition,
              selectedLibrary,
            );
            if (
              option === 'country' ||
              option === 'state' ||
              option === 'city'
            ) {
              const numOfTags = filters?.[option]?.tags?.length || 0;
              return (
                <ElemFilterLocation
                  key={option}
                  open={Boolean(filters[option]?.open)}
                  option={option}
                  title={
                    numOfTags > 0 && (
                      <div>
                        {optionMetadata.title} {numOfTags > 1 ? 'are' : 'is'}{' '}
                        {filters?.[option]?.condition === 'none' ? 'not ' : ''}
                        {extractTagsArrayToText(filters?.[option]?.tags || [])}
                      </div>
                    )
                  }
                  heading={optionMetadata.heading}
                  checkedAny={filters?.[option]?.condition === 'any'}
                  checkedNone={filters?.[option]?.condition === 'none'}
                  tags={filters?.[option]?.tags || []}
                  placeholder={optionMetadata.placeholder}
                  onOpenFilterPopup={onOpenFilterPopup}
                  onCloseFilterPopup={onCloseFilterPopup}
                  onClearFilterOption={onClearFilterOption}
                  onApplyFilter={onApplyFilter}
                  onChangeCondition={onChangeCondition}
                  onChangeTags={onChangeTags}
                />
              );
            }
            if (option === 'fundingInvestors' || option === 'fundedCompanies') {
              const numOfTags = filters?.[option]?.tags?.length || 0;
              return (
                <ElemFilterTagsInput
                  key={option}
                  open={Boolean(filters[option]?.open)}
                  option={option}
                  title={
                    numOfTags > 0 && (
                      <div>
                        {optionMetadata.title} {numOfTags > 1 ? 'are' : 'is'}{' '}
                        {filters?.[option]?.condition === 'none' ? 'not ' : ''}
                        {extractTagsArrayToText(filters?.[option]?.tags || [])}
                      </div>
                    )
                  }
                  heading={optionMetadata.heading}
                  checkedAny={filters?.[option]?.condition === 'any'}
                  checkedNone={filters?.[option]?.condition === 'none'}
                  tags={filters?.[option]?.tags || []}
                  placeholder={optionMetadata.placeholder}
                  onOpenFilterPopup={onOpenFilterPopup}
                  onCloseFilterPopup={onCloseFilterPopup}
                  onClearFilterOption={onClearFilterOption}
                  onApplyFilter={onApplyFilterTags}
                  onChangeCondition={onChangeCondition}
                  onChangeTags={onChangeTags}
                />
              );
            }

            if (option === 'address') {
              return (
                <ElemFilterPopup
                  open={Boolean(filters[option]?.open)}
                  name={option}
                  title={
                    filters[option]?.value && (
                      <div>
                        Address is{' '}
                        <b>{`${filters[option]?.distance} miles `}</b>
                        around <b>{filters[option]?.value?.Label}</b>
                      </div>
                    )
                  }
                  onOpen={onOpenFilterPopup}
                  onClose={onCloseFilterPopup}
                  onClear={onClearFilterOption}
                  onApply={onApplyFilter}
                >
                  <div className="font-medium text-sm">
                    {optionMetadata.heading}
                  </div>
                  <div className="flex items-center flex-wrap gap-1 mt-1.5">
                    <span className="text-sm font-normal text-gray-500">
                      Find within
                    </span>
                    <InputText
                      type="number"
                      onChange={onChangeDistance}
                      value={filters[option]?.distance}
                      name="distance"
                      className="w-16 !rounded-2lg"
                    />
                  </div>
                  <p className="text-sm font-normal text-gray-500 mt-3">
                    miles from this address:
                  </p>
                  <div className="flex flex-col gap-2 mt-1.5">
                    <ElemAddressFilter
                      value={filters[option]?.value}
                      onChange={onChangeAddress}
                    />
                  </div>
                </ElemFilterPopup>
              );
            }

            if (option === 'keywords') {
              const numOfTags = filters?.[option]?.tags?.length || 0;
              return (
                <ElemFilterTagsInput
                  key={option}
                  open={Boolean(filters[option]?.open)}
                  option={option}
                  title={
                    numOfTags > 0 && (
                      <div>
                        {optionMetadata.title} {numOfTags > 1 ? 'are' : 'is'}{' '}
                        {extractTagsArrayToText(filters?.[option]?.tags || [])}
                      </div>
                    )
                  }
                  heading={optionMetadata.heading}
                  subtext={optionMetadata.subtext}
                  tags={filters?.[option]?.tags || []}
                  placeholder={optionMetadata.placeholder}
                  onOpenFilterPopup={onOpenFilterPopup}
                  onCloseFilterPopup={onCloseFilterPopup}
                  onClearFilterOption={onClearFilterOption}
                  onApplyFilter={onApplyFilterTags}
                  onChangeTags={onChangeTags}
                />
              );
            }

            if (
              option === 'industry' ||
              option === 'fundingType' ||
              option === 'investmentType' ||
              option === 'eventType'
            ) {
              const isSelectedAll =
                filters[option]?.tags?.length ===
                optionMetadata.choices?.length;
              const numOfTags = filters?.[option]?.tags?.length || 0;
              return (
                <ElemFilterCheckboxTags
                  key={option}
                  open={Boolean(filters[option]?.open)}
                  option={option}
                  title={
                    numOfTags > 0 && (
                      <>
                        {optionMetadata.title} {numOfTags > 1 ? 'are' : 'is'}{' '}
                        {extractTagsArrayToText(filters?.[option]?.tags || [])}
                      </>
                    )
                  }
                  heading={optionMetadata.heading}
                  isSelectedAll={isSelectedAll}
                  choices={optionMetadata.choices}
                  tags={filters?.[option]?.tags}
                  onOpenFilterPopup={onOpenFilterPopup}
                  onCloseFilterPopup={onCloseFilterPopup}
                  onClearFilterOption={onClearFilterOption}
                  onApplyFilter={onApplyFilter}
                  onToggleSelectAllTags={onToggleSelectAllTags}
                  onChangeCheckbox={onChangeCheckbox}
                />
              );
            }

            if (
              option === 'fundingAmount' ||
              option === 'investmentAmountTotal' ||
              option === 'eventPrice'
            ) {
              return (
                <ElemFilterPopup
                  key={option}
                  open={Boolean(filters[option]?.open)}
                  name={option}
                  title={
                    <div>
                      {optionMetadata.title} is between{' '}
                      <b>{filters?.[option]?.formattedMinVal}</b> and{' '}
                      <b>{filters?.[option]?.formattedMaxVal}</b>
                    </div>
                  }
                  onOpen={onOpenFilterPopup}
                  onClose={onCloseFilterPopup}
                  onClear={onClearFilterOption}
                  onApply={onApplyFilter}
                >
                  <div className="font-medium text-sm mb-3">
                    {optionMetadata.heading}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="grow">
                      <div className="text-sm text-slate-600 mb-2">Min</div>
                      <input
                        name={`${option}.minVal`}
                        type="text"
                        value={filters?.[option]?.formattedMinVal}
                        onChange={onChangeRangeInput}
                        onBlur={onBlurAmount}
                        onFocus={onFocusAmount}
                        className="appearance-none border-none w-full border border-slate-200 rounded-2lg px-1 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                      />
                    </div>
                    <div className="pt-4 flex-none">{'–'}</div>
                    <div className="grow">
                      <div className="text-sm text-slate-600 mb-2">Max</div>
                      <input
                        name={`${option}.maxVal`}
                        type="text"
                        value={filters?.[option]?.formattedMaxVal}
                        onChange={onChangeRangeInput}
                        onBlur={onBlurAmount}
                        onFocus={onFocusAmount}
                        className="appearance-none border-none w-full border border-slate-200 rounded-2lg px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
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
              option === 'lastFundingDate' ||
              option === 'lastInvestmentDate' ||
              option === 'eventDate'
            ) {
              return (
                <ElemFilterPopup
                  key={option}
                  open={Boolean(filters[option]?.open)}
                  name={option}
                  title={
                    <div>
                      {optionMetadata.title}
                      {filters?.[option]?.condition === 'custom' ? (
                        <>
                          {' '}
                          from{' '}
                          <b>
                            {moment(filters?.[option]?.fromDate).format(
                              ISO_DATE_FORMAT,
                            )}
                          </b>{' '}
                          to{' '}
                          <b>
                            {moment(filters?.[option]?.toDate).format(
                              ISO_DATE_FORMAT,
                            )}
                          </b>
                        </>
                      ) : (
                        <>
                          {' '}
                          in{' '}
                          <b>{`${dateCondition} ${lowerCase(
                            filters?.[option]?.condition,
                          )}`}</b>
                        </>
                      )}
                    </div>
                  }
                  onOpen={onOpenFilterPopup}
                  onClose={onCloseFilterPopup}
                  onClear={onClearFilterOption}
                  onApply={onApplyFilter}
                >
                  <div className="font-medium text-sm">
                    {optionMetadata.heading}
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <InputRadio
                      name={option}
                      value="30-days"
                      checked={filters?.[option]?.condition === '30-days'}
                      label={`${
                        dateCondition === 'past' ? 'Past' : 'Next'
                      } 30 days`}
                      onChange={onChangeDateCondition}
                    />
                    <InputRadio
                      name={option}
                      value="60-days"
                      checked={filters?.[option]?.condition === '60-days'}
                      label={`${
                        dateCondition === 'past' ? 'Past' : 'Next'
                      } 60 days`}
                      onChange={onChangeDateCondition}
                    />
                    <InputRadio
                      name={option}
                      value="90-days"
                      checked={filters?.[option]?.condition === '90-days'}
                      label={`${
                        dateCondition === 'past' ? 'Past' : 'Next'
                      } 90 days`}
                      onChange={onChangeDateCondition}
                    />
                    <InputRadio
                      name={option}
                      value="year"
                      checked={filters?.[option]?.condition === 'year'}
                      label={`${
                        dateCondition === 'past' ? 'Past' : 'Next'
                      } year`}
                      onChange={onChangeDateCondition}
                    />
                    <InputRadio
                      name={option}
                      value="custom"
                      checked={filters?.[option]?.condition === 'custom'}
                      label="Custom date range"
                      onChange={onChangeDateCondition}
                    />
                  </div>
                  {filters?.[option]?.condition === 'custom' && (
                    <div className="flex items-center gap-x-4 mt-2">
                      <InputDate
                        name={`${option}.fromDate`}
                        value={
                          filters?.[option]?.fromDate
                            ? moment(filters?.[option]?.fromDate).format(
                                ISO_DATE_FORMAT,
                              )
                            : ''
                        }
                        onChange={onChangeDateRange}
                        className="block max-w-sm placeholder-slate-500 !rounded-2lg"
                        min={optionMetadata.minDate}
                        max={optionMetadata.maxDate}
                      />
                      <div className="flex-none">{'–'}</div>
                      <InputDate
                        name={`${option}.toDate`}
                        value={
                          filters?.[option]?.toDate
                            ? moment(filters?.[option]?.toDate).format(
                                ISO_DATE_FORMAT,
                              )
                            : ''
                        }
                        onChange={onChangeDateRange}
                        className="block max-w-sm placeholder-slate-500 !rounded-2lg"
                        min={optionMetadata.minDate}
                        max={optionMetadata.maxDate}
                      />
                    </div>
                  )}
                </ElemFilterPopup>
              );
            }

            if (
              option === 'teamSize' ||
              option === 'numOfInvestments' ||
              option === 'numOfExits'
            ) {
              return (
                <ElemFilterPopup
                  key={option}
                  open={Boolean(filters[option]?.open)}
                  name={option}
                  title={
                    <div>
                      {optionMetadata.title} is between{' '}
                      <b>{filters?.[option]?.minVal}</b> and{' '}
                      <b>{filters?.[option]?.maxVal}</b>
                    </div>
                  }
                  onOpen={onOpenFilterPopup}
                  onClose={onCloseFilterPopup}
                  onClear={onClearFilterOption}
                  onApply={onApplyFilter}
                >
                  <div className="font-medium text-sm">
                    {optionMetadata.heading}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="">
                      <div className="text-sm text-slate-600 mb-2">Min</div>
                      <input
                        type="text"
                        name={`${option}.minVal`}
                        value={filters?.[option]?.minVal}
                        onChange={onChangeRangeInput}
                        defaultValue={0}
                        className="appearance-none border-none w-20 border border-slate-200 rounded-2lg px-1 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
                      />
                    </div>
                    <div className="pt-4">{'–'}</div>
                    <div className="">
                      <div className="text-sm text-slate-600 mb-2">Max</div>
                      <input
                        type="text"
                        name={`${option}.maxVal`}
                        value={filters?.[option]?.maxVal}
                        onChange={onChangeRangeInput}
                        defaultValue="Any"
                        className="appearance-none border-none w-20 border border-slate-200 rounded-2lg px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
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

            if (option === 'eventSize') {
              return (
                <ElemFilterPopup
                  key={option}
                  open={Boolean(filters[option]?.open)}
                  name={option}
                  title={
                    filters[option]?.value && (
                      <div>
                        {optionMetadata.title} is{' '}
                        <b>{filters[option]?.value?.title}</b>
                      </div>
                    )
                  }
                  onOpen={onOpenFilterPopup}
                  onClose={onCloseFilterPopup}
                  onClear={onClearFilterOption}
                  onApply={onApplyFilter}
                >
                  <div className="font-medium text-sm">
                    {optionMetadata.heading}
                  </div>
                  <div className="py-2">
                    <InputSelect
                      options={eventSizeChoices.map(item => ({
                        id: item.id,
                        title: item.name,
                      }))}
                      value={filters[option]?.value}
                      onChange={onChangeEventSize}
                      className="text-slate-600 text-base w-full"
                      buttonClasses="h-10"
                    />
                  </div>
                </ElemFilterPopup>
              );
            }

            return null;
          })}

        {filters && Object.keys(filters).length > 0 && (
          <ElemAddFilter
            resourceType={resourceType}
            excludeFilters={excludeFilters}
            type="icon"
            onSelectFilterOption={onSelectFilterOption}
          />
        )}
      </div>
    </section>
  );
};
