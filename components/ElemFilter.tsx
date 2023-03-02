import React, { FC, useMemo, useState } from "react";
import { omit, cloneDeep } from "lodash";
import moment from "moment-timezone";
import { convertToInternationalCurrencySystem } from "@/utils";
import { roundChoices, tags } from "@/utils/constants";
import { ElemButton } from "./ElemButton";
import { InputRadio } from "./InputRadio";
import { ElemTagsInput } from "./ElemTagsInput";
import { ElemMultiRangeSlider } from "./ElemMultiRangeSlider";
import { InputDate } from "./InputDate";
import { ElemFilterPopup } from "./ElemFilterPopup";
import { ElemAddFilter } from "./ElemAddFilter";

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
	| "teamSize"
	| "investmentType"
	| "investmentAmountTotal"
	| "numOfInvestments"
	| "numOfExits"
	| "lastInvestmentDate"
	| "fundedCompanies";

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
		formattedMinVal?: string;
		formattedMaxVal?: string;
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
	investmentType?: {
		open?: boolean;
		tags: Array<string>;
	};
	investmentAmountTotal?: {
		open?: boolean;
		minVal?: number;
		maxVal?: number;
		formattedMinVal?: string;
		formattedMaxVal?: string;
	};
	numOfInvestments?: {
		open?: boolean;
		minVal: number;
		maxVal: number;
	};
	numOfExits?: {
		open?: boolean;
		minVal: number;
		maxVal: number;
	};
	lastInvestmentDate?: {
		open?: boolean;
		condition?: DateRangeOptions;
		fromDate?: string;
		toDate?: string;
	};
	fundedCompanies?: {
		open?: boolean;
		condition: "any" | "none";
		tags: Array<string>;
	};
};

type Props = {
  resourceType: "companies" | "vc_firms";
	defaultFilters: Filters | null;
	onApply: (name: FilterOptionKeys, filterParams: Filters) => void;
	onClearOption: (name: FilterOptionKeys) => void;
	onReset: () => void;
};

export const ElemFilter: FC<Props> = ({
  resourceType,
	defaultFilters,
	onApply,
	onClearOption,
	onReset,
}) => {
	const [openAddFilter, setOpenAddFilter] = useState<boolean>(false);

	const [filters, setFilters] = useState<Filters | null>(defaultFilters);

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
			case "fundedCompanies":
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
			case "investmentType":
				return [];
			case "fundingAmount":
			case "investmentAmountTotal":
				return {
					minVal: 0,
					maxVal: 25000000,
					formattedMinVal: 0,
					formattedMaxVal: convertToInternationalCurrencySystem(25000000),
				};
			case "lastFundingDate":
			case "lastInvestmentDate":
				return {
					condition: "30-days",
					fromDate: moment().subtract(30, "days").toISOString(),
				};
			case "teamSize":
				return {
					minVal: 0,
					maxVal: 100,
				};
			case "numOfInvestments":
				return {
					minVal: 10,
					maxVal: 50,
				};
			case "numOfExits":
				return {
					minVal: 1,
					maxVal: 3,
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

	const onChangeInvestmentType = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFilterInvestmentType = [...(filters?.investmentType?.tags || [])];
		if (event.target.checked) {
			newFilterInvestmentType.push(event.target.name);
		} else {
			const index = newFilterInvestmentType.indexOf(event.target.name);
			newFilterInvestmentType.splice(index, 1);
		}
		setFilters((prev) => ({
			...prev,
			investmentType: {
				...prev?.investmentType,
				tags: newFilterInvestmentType,
			},
		}));
	};

	const onBlurFundingAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const [key, metric] = name.split(".");
		// const metric = name.split(".")[1];
		const newFundingAmount: any = {
			...filters?.[key as keyof Filters],
		};
		if (metric === "minVal") {
			newFundingAmount.formattedMinVal = convertToInternationalCurrencySystem(
				+value
			);
		} else {
			newFundingAmount.formattedMaxVal = convertToInternationalCurrencySystem(
				+value
			);
		}
		setFilters((prev) => ({
			...prev,
			[key]: newFundingAmount,
		}));
	};

	const onFocusFundingAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = event.target;
		const [key, metric] = name.split(".");
		// const metric = name.split(".")[1];
		const newFundingAmount: any = {
			...filters?.[key as keyof Filters],
		};
		if (metric === "minVal") {
			newFundingAmount.formattedMinVal = newFundingAmount?.minVal?.toString();
		} else {
			newFundingAmount.formattedMaxVal = newFundingAmount?.maxVal?.toString();
		}
		setFilters((prev) => ({
			...prev,
			[key]: newFundingAmount,
		}));
	};

	const onChangeRangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const [option, metric] = name.split(".");
		const newData: any = {
			...filters?.[option as keyof Filters],
			[metric]: value,
		};
		if (option === "fundingAmount") {
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
		if (name === "fundingAmount") {
			newData.formattedMinVal = convertToInternationalCurrencySystem(minVal);
			newData.formattedMaxVal = convertToInternationalCurrencySystem(maxVal);
		}
		setFilters((prev) => ({
			...prev,
			[name]: newData,
		}));
	};

	const onChangeDateRange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
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
		if (name === "lastFundingDate" && filterParams?.condition === "custom") {
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
			<div className="flex flex-wrap gap-3 w-full items-center">
				<ElemAddFilter
          resourceType={resourceType}
					open={openAddFilter}
					onOpen={() => setOpenAddFilter(true)}
					onClose={() => setOpenAddFilter(false)}
					onSelectFilterOption={onSelectFilterOption}
				/>

				{filters?.country && (
					<ElemFilterPopup
						open={!!filters.country.open}
						name="country"
						title={`Country (${filters?.country?.tags?.length || 0})`}
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm">Country</div>
						<div className="flex flex-col gap-4 mt-2">
							<div>
								<InputRadio
									name="country"
									value="any"
									checked={filters?.country?.condition === "any"}
									label="is any of these"
									onChange={(event) => onChangeCondition(event, "country")}
								/>

								<ElemTagsInput
									value={filters?.country?.tags || []}
									placeholder="Add country name, press enter &#9166;"
									onChange={(tags) => onChangeTags(tags, "country")}
									//subtext={`Press "enter" after each country`}
								/>
							</div>
							<div>
								<InputRadio
									name="country"
									value="none"
									checked={filters?.country?.condition === "none"}
									label="is none of these"
									onChange={(event) => onChangeCondition(event, "country")}
									labelClass="mb-0.5"
								/>
							</div>
						</div>
					</ElemFilterPopup>
				)}

				{filters?.state && (
					<ElemFilterPopup
						open={!!filters.state.open}
						name="state"
						title={`State (${filters?.state?.tags?.length || 0})`}
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm">State</div>
						<div className="flex flex-col gap-2 mt-2">
							<div>
								<InputRadio
									name="state"
									value="any"
									checked={filters?.state?.condition === "any"}
									label="is any of these"
									onChange={(event) => onChangeCondition(event, "state")}
								/>
								<ElemTagsInput
									value={filters?.state?.tags || []}
									placeholder="Add state name, press enter &#9166;"
									onChange={(tags) => onChangeTags(tags, "state")}
								/>
							</div>
							<div>
								<InputRadio
									name="state"
									value="none"
									checked={filters?.state?.condition === "none"}
									label="is none of these"
									onChange={(event) => onChangeCondition(event, "state")}
								/>
							</div>
						</div>
					</ElemFilterPopup>
				)}

				{filters?.city && (
					<ElemFilterPopup
						open={!!filters.city.open}
						name="city"
						title={`City (${filters?.city?.tags?.length || 0})`}
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm">City</div>
						<div className="flex flex-col gap-2 mt-2">
							<div>
								<InputRadio
									name="city"
									value="any"
									checked={filters?.city?.condition === "any"}
									label="is any of these"
									onChange={(event) => onChangeCondition(event, "city")}
								/>
								<ElemTagsInput
									value={filters?.city?.tags || []}
									placeholder="Add city name, press enter &#9166;"
									onChange={(tags) => onChangeTags(tags, "city")}
								/>
							</div>
							<div>
								<InputRadio
									name="city"
									value="none"
									checked={filters?.city?.condition === "none"}
									label="is none of these"
									onChange={(event) => onChangeCondition(event, "city")}
								/>
							</div>
						</div>
					</ElemFilterPopup>
				)}

				{filters?.keywords && (
					<ElemFilterPopup
						open={!!filters.keywords.open}
						name="keywords"
						title={`Keywords (${filters?.keywords?.tags?.length || 0})`}
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm">Description Keywords</div>
						<div className="mt-1">
							<ElemTagsInput
								value={filters?.keywords?.tags || []}
								placeholder="Add keyword, press enter &#9166;"
								onChange={(tags) => onChangeTags(tags, "keywords")}
								subtext="e.g. ai, platform, blockchain, wallet, nft..."
							/>
						</div>
					</ElemFilterPopup>
				)}

				{filters?.industry && (
					<ElemFilterPopup
						open={!!filters.industry.open}
						name="industry"
						title={`Industry (${filters?.industry?.tags?.length || 0})`}
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
						popupClass="max-w-xl"
					>
						<div className="font-bold text-sm mb-1">Industry</div>
						<ul className="grid grid-cols-2 gap-x-5 overflow-y-auto scrollbar-hide lg:grid-cols-4">
							{allTags.map((tag) => (
								<li
									key={tag.id}
									className="flex items-center w-full min-w-max text-sm text-left font-medium"
								>
									<label className="relative flex items-center gap-2 cursor-pointer w-full px-2 py-1.5 rounded-md overflow-hidden hover:text-primary-500 hover:bg-slate-100">
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
					</ElemFilterPopup>
				)}

				{filters?.fundingType && (
					<ElemFilterPopup
						open={!!filters.fundingType.open}
						name="fundingType"
						title={`Funding type (${filters?.fundingType?.tags?.length || 0})`}
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm mb-1">Funding type</div>
						<ul className="grid grid-cols-2 gap-x-5 overflow-y-auto scrollbar-hide">
							{roundChoices.map((round) => (
								<li
									key={round.id}
									className="flex items-center w-full min-w-max text-sm text-left font-medium"
								>
									<label className="relative flex items-center gap-2 cursor-pointer w-full px-2 py-1.5 rounded-md overflow-hidden hover:text-primary-500 hover:bg-slate-100">
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
					</ElemFilterPopup>
				)}

				{filters?.fundingAmount && (
					<ElemFilterPopup
						open={!!filters.fundingAmount.open}
						name="fundingAmount"
						title="Funding amount"
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm">Total funding amount</div>
						<div className="flex items-center space-x-4">
							<div className="grow">
								<div className="text-sm text-slate-600">Min</div>
								<input
									name="fundingAmount.minVal"
									type="text"
									value={filters?.fundingAmount?.formattedMinVal}
									onChange={onChangeRangeInput}
									onBlur={onBlurFundingAmount}
									onFocus={onFocusFundingAmount}
									className="appearance-none border-none w-full border border-slate-200 rounded-md px-1 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
								/>
							</div>
							<div className="pt-4 flex-none">{"–"}</div>
							<div className="grow">
								<div className="text-sm text-slate-600">Max</div>
								<input
									name="fundingAmount.maxVal"
									type="text"
									value={filters?.fundingAmount?.formattedMaxVal}
									onChange={onChangeRangeInput}
									onBlur={onBlurFundingAmount}
									onFocus={onFocusFundingAmount}
									//defaultValue="Any"
									className="appearance-none border-none w-full border border-slate-200 rounded-md px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
								/>
							</div>
						</div>
						<div className="mt-2">
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
					</ElemFilterPopup>
				)}

				{filters?.lastFundingDate && (
					<ElemFilterPopup
						open={!!filters.lastFundingDate.open}
						name="lastFundingDate"
						title="Last funding date"
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm">Last funding date</div>
						<div className="flex flex-col gap-2 mt-2">
							<InputRadio
								name="lastFundingDate"
								value="30-days"
								checked={filters?.lastFundingDate?.condition === "30-days"}
								label="Past 30 days"
								onChange={onChangeDateCondition}
							/>
							<InputRadio
								name="lastFundingDate"
								value="60-days"
								checked={filters?.lastFundingDate?.condition === "60-days"}
								label="Past 60 days"
								onChange={onChangeDateCondition}
							/>
							<InputRadio
								name="lastFundingDate"
								value="90-days"
								checked={filters?.lastFundingDate?.condition === "90-days"}
								label="Past 90 days"
								onChange={onChangeDateCondition}
							/>
							<InputRadio
								name="lastFundingDate"
								value="year"
								checked={filters?.lastFundingDate?.condition === "year"}
								label="Past year"
								onChange={onChangeDateCondition}
							/>
							<InputRadio
								name="lastFundingDate"
								value="custom"
								checked={filters?.lastFundingDate?.condition === "custom"}
								label="Custom date range"
								onChange={onChangeDateCondition}
							/>
						</div>
						{filters?.lastFundingDate?.condition === "custom" && (
							<div className="flex items-center gap-x-4 mt-2">
								<InputDate
									name="lastFundingDate.fromDate"
									value={filters?.lastFundingDate?.fromDate ?? ""}
									onChange={onChangeDateRange}
									className="block max-w-sm placeholder-slate-500"
								/>
								<div className="flex-none">{"–"}</div>
								<InputDate
									name="lastFundingDate.toDate"
									value={filters?.lastFundingDate?.toDate ?? ""}
									onChange={onChangeDateRange}
									className="block max-w-sm placeholder-slate-500"
								/>
							</div>
						)}
					</ElemFilterPopup>
				)}

				{filters?.fundingInvestors && (
					<ElemFilterPopup
						open={!!filters.fundingInvestors.open}
						name="fundingInvestors"
						title={`Investors (${
							filters?.fundingInvestors?.tags?.length || 0
						})`}
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm">Investors</div>
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
								placeholder="Add investor name, press enter &#9166;"
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
					</ElemFilterPopup>
				)}

				{filters?.teamSize && (
					<ElemFilterPopup
						open={!!filters.teamSize.open}
						name="teamSize"
						title="Team size"
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
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
									name="teamSize.maxVal"
									value={filters?.teamSize?.maxVal}
									onChange={onChangeRangeInput}
									defaultValue="Any"
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
					</ElemFilterPopup>
				)}

				{filters?.investmentType && (
					<ElemFilterPopup
						open={!!filters.investmentType.open}
						name="investmentType"
						title={`Investment type (${filters?.investmentType?.tags?.length || 0})`}
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm mb-1">Funding type</div>
						<ul className="grid grid-cols-2 gap-x-5 overflow-y-auto scrollbar-hide">
							{roundChoices.map((round) => (
								<li
									key={round.id}
									className="flex items-center w-full min-w-max text-sm text-left font-medium"
								>
									<label className="relative flex items-center gap-2 cursor-pointer w-full px-2 py-1.5 rounded-md overflow-hidden hover:text-primary-500 hover:bg-slate-100">
										<input
											id={round.id}
											name={round.id}
											type="checkbox"
											checked={filters?.investmentType?.tags?.some(
												(item) => item === round.id
											)}
											onChange={onChangeInvestmentType}
											className="appearance-none w-4 h-4 border rounded border-slate-300 hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:ring-offset-0 focus:checked:bg-primary-500"
										/>
										<div>{round.name}</div>
									</label>
								</li>
							))}
						</ul>
					</ElemFilterPopup>
				)}

				{filters?.investmentAmountTotal && (
					<ElemFilterPopup
						open={!!filters.investmentAmountTotal.open}
						name="investmentAmountTotal"
						title="Investment amount"
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm">Investment amount total</div>
						<div className="flex items-center space-x-4">
							<div className="grow">
								<div className="text-sm text-slate-600">Min</div>
								<input
									name="investmentAmountTotal.minVal"
									type="text"
									value={filters?.investmentAmountTotal?.formattedMinVal}
									onChange={onChangeRangeInput}
									onBlur={onBlurFundingAmount}
									onFocus={onFocusFundingAmount}
									className="appearance-none border-none w-full border border-slate-200 rounded-md px-1 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
								/>
							</div>
							<div className="pt-4 flex-none">{"–"}</div>
							<div className="grow">
								<div className="text-sm text-slate-600">Max</div>
								<input
									name="investmentAmountTotal.maxVal"
									type="text"
									value={filters?.investmentAmountTotal?.formattedMaxVal}
									onChange={onChangeRangeInput}
									onBlur={onBlurFundingAmount}
									onFocus={onFocusFundingAmount}
									//defaultValue="Any"
									className="appearance-none border-none w-full border border-slate-200 rounded-md px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
								/>
							</div>
						</div>
						<div className="mt-2">
							<ElemMultiRangeSlider
								value={[
									filters?.investmentAmountTotal?.minVal || 0,
									filters?.investmentAmountTotal?.maxVal || 0,
								]}
								min={0}
								max={50000000}
								step={500}
								onChange={({ min, max }: { min: number; max: number }) =>
									onChangeRangeSlider("investmentAmountTotal", min, max)
								}
							/>
						</div>
					</ElemFilterPopup>
				)}

				{filters?.numOfInvestments && (
					<ElemFilterPopup
						open={!!filters.numOfInvestments.open}
						name="numOfInvestments"
						title="Number of investments"
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm">Number of investments</div>
						<div className="flex items-center space-x-2">
							<div className="">
								<div className="text-sm text-slate-600">Min</div>
								<input
									type="text"
									name="numOfInvestments.minVal"
									value={filters?.numOfInvestments?.minVal}
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
									name="numOfInvestments.maxVal"
									value={filters?.numOfInvestments?.maxVal}
									onChange={onChangeRangeInput}
									defaultValue="Any"
									className="appearance-none border-none w-20 border border-slate-200 rounded-md px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
								/>
							</div>
						</div>
						<div className="mt-4">
							<ElemMultiRangeSlider
								value={[
									filters?.numOfInvestments?.minVal || 0,
									filters?.numOfInvestments?.maxVal || 0,
								]}
								min={0}
								max={200}
								step={1}
								onChange={({ min, max }: { min: number; max: number }) =>
									onChangeRangeSlider("numOfInvestments", min, max)
								}
							/>
						</div>
					</ElemFilterPopup>
				)}

				{filters?.numOfExits && (
					<ElemFilterPopup
						open={!!filters.numOfExits.open}
						name="numOfExits"
						title="Number of exits"
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm">Number of exits</div>
						<div className="flex items-center space-x-2">
							<div className="">
								<div className="text-sm text-slate-600">Min</div>
								<input
									type="text"
									name="numOfExits.minVal"
									value={filters?.numOfExits?.minVal}
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
									name="numOfExits.maxVal"
									value={filters?.numOfExits?.maxVal}
									onChange={onChangeRangeInput}
									defaultValue="Any"
									className="appearance-none border-none w-20 border border-slate-200 rounded-md px-2 py-1 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:text-primary-500"
								/>
							</div>
						</div>
						<div className="mt-4">
							<ElemMultiRangeSlider
								value={[
									filters?.numOfExits?.minVal || 0,
									filters?.numOfExits?.maxVal || 0,
								]}
								min={0}
								max={200}
								step={1}
								onChange={({ min, max }: { min: number; max: number }) =>
									onChangeRangeSlider("numOfExits", min, max)
								}
							/>
						</div>
					</ElemFilterPopup>
				)}

				{filters?.lastInvestmentDate && (
					<ElemFilterPopup
						open={!!filters.lastInvestmentDate.open}
						name="lastInvestmentDate"
						title="Last investment date"
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm">Last investment date</div>
						<div className="flex flex-col gap-2 mt-2">
							<InputRadio
								name="lastInvestmentDate"
								value="30-days"
								checked={filters?.lastInvestmentDate?.condition === "30-days"}
								label="Past 30 days"
								onChange={onChangeDateCondition}
							/>
							<InputRadio
								name="lastInvestmentDate"
								value="60-days"
								checked={filters?.lastInvestmentDate?.condition === "60-days"}
								label="Past 60 days"
								onChange={onChangeDateCondition}
							/>
							<InputRadio
								name="lastInvestmentDate"
								value="90-days"
								checked={filters?.lastInvestmentDate?.condition === "90-days"}
								label="Past 90 days"
								onChange={onChangeDateCondition}
							/>
							<InputRadio
								name="lastInvestmentDate"
								value="year"
								checked={filters?.lastInvestmentDate?.condition === "year"}
								label="Past year"
								onChange={onChangeDateCondition}
							/>
							<InputRadio
								name="lastInvestmentDate"
								value="custom"
								checked={filters?.lastInvestmentDate?.condition === "custom"}
								label="Custom date range"
								onChange={onChangeDateCondition}
							/>
						</div>
						{filters?.lastInvestmentDate?.condition === "custom" && (
							<div className="flex items-center gap-x-4 mt-2">
								<InputDate
									name="lastInvestmentDate.fromDate"
									value={filters?.lastInvestmentDate?.fromDate ?? ""}
									onChange={onChangeDateRange}
									className="block max-w-sm placeholder-slate-500"
								/>
								<div className="flex-none">{"–"}</div>
								<InputDate
									name="lastInvestmentDate.toDate"
									value={filters?.lastInvestmentDate?.toDate ?? ""}
									onChange={onChangeDateRange}
									className="block max-w-sm placeholder-slate-500"
								/>
							</div>
						)}
					</ElemFilterPopup>
				)}

				{filters?.fundedCompanies && (
					<ElemFilterPopup
						open={!!filters.fundedCompanies.open}
						name="fundedCompanies"
						title={`Funded companies (${
							filters?.fundedCompanies?.tags?.length || 0
						})`}
						onOpen={onOpenFilterPopup}
						onClose={onCloseFilterPopup}
						onClear={onClearFilterOption}
						onApply={onApplyFilter}
					>
						<div className="font-bold text-sm">Funded companies</div>
						<div className="flex flex-col gap-2 mt-2">
							<InputRadio
								name="fundedCompanies"
								value="any"
								checked={filters?.fundedCompanies?.condition === "any"}
								label="is any of these"
								onChange={(event) =>
									onChangeCondition(event, "fundedCompanies")
								}
							/>
							<ElemTagsInput
								value={filters?.fundedCompanies?.tags || []}
								placeholder="Add company name, press enter &#9166;"
								onChange={(tags) => onChangeTags(tags, "fundedCompanies")}
							/>
							<InputRadio
								name="fundedCompanies"
								value="none"
								checked={filters?.fundedCompanies?.condition === "none"}
								label="is none of these"
								onChange={(event) =>
									onChangeCondition(event, "fundedCompanies")
								}
							/>
						</div>
					</ElemFilterPopup>
				)}

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
