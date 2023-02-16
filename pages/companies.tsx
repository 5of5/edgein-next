import React, { Fragment, useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ElemHeading } from "@/components/ElemHeading";
import { PlaceholderCompanyCard } from "@/components/Placeholders";
import { Popover } from "@headlessui/react";
import { InputSelect } from "@/components/InputSelect";
import { ElemRecentCompanies } from "@/components/Companies/ElemRecentCompanies";
import { ElemButton } from "@/components/ElemButton";
import { ElemTagsCarousel } from "@/components/ElemTagsCarousel";
import {
	runGraphQl,
	numberWithCommas,
	convertToInternationalCurrencySystem,
} from "@/utils";
import { tags } from "@/utils/constants";
import {
	IconSearch,
	IconAnnotation,
	IconX,
	IconFilter,
	IconPlus,
} from "@/components/Icons";
import {
	Companies,
	Companies_Bool_Exp,
	GetCompaniesDocument,
	GetCompaniesQuery,
	useGetCompaniesQuery,
} from "@/graphql/types";
import { Pagination } from "@/components/Pagination";
import { ElemCompanyCard } from "@/components/Companies/ElemCompanyCard";
import { companyChoices, companyLayerChoices } from "@/utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { useStateParams } from "@/hooks/useStateParams";
import { onTrackView } from "@/utils/track";

function useStateParamsFilter<T>(filters: T[], name: string) {
	return useStateParams(
		filters[0],
		name,
		(companyLayer) => filters.indexOf(companyLayer).toString(),
		(index) => filters[Number(index)]
	);
}

type Props = {
	companiesCount: number;
	initialCompanies: GetCompaniesQuery["companies"];
	companyFilters: TextFilter[];
	companyLayers: TextFilter[];
	amountRaised: NumericFilter[];
	totalEmployees: NumericFilter[];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

const Companies: NextPage<Props> = ({
	companiesCount,
	initialCompanies,
	companyFilters,
	companyLayers,
	amountRaised,
	totalEmployees,
	setToggleFeedbackForm,
}) => {
	const [initialLoad, setInitialLoad] = useState(true);

	const router = useRouter();

	// Company Status Filter
	const [selectedCompanyFilters, setSelectedCompanyFilters] =
		useStateParamsFilter(companyFilters, "filter");

	const [isActiveCompanyStatus, setActiveCompanyStatus] = useState(0);

	const onClickCompanyStatus = (index: number, ref: any) => {
		setActiveCompanyStatus(index);
		setSelectedCompanyFilters(ref);
	};

	// Company Layers Filter
	const [selectedLayer, setSelectedLayer] = useStateParamsFilter(
		companyLayers,
		"layer"
	);

	// Amount Raised Filter
	const [selectedAmountRaised, setSelectedAmountRaised] = useStateParamsFilter(
		amountRaised,
		"amount"
	);

	// Total Employees Filter
	const [selectedTotalEmployees, setSelectedTotalEmployees] =
		useStateParamsFilter(totalEmployees, "totalEmp");

	const [page, setPage] = useStateParams<number>(
		0,
		"page",
		(pageIndex) => pageIndex + 1 + "",
		(pageIndex) => Number(pageIndex) - 1
	);

	const limit = 50;
	const offset = limit * page;

	const allTags = tags.filter(
		(tag) =>
			tag.name !== "Layer 0" &&
			tag.name !== "Layer 1" &&
			tag.name !== "Layer 2" &&
			tag.name !== "Layer 3" &&
			tag.name !== "Layer 4" &&
			tag.name !== "Layer 5" &&
			tag.name !== "Layer 6"
	);

	const [selectedTags, setSelectedTags] = useStateParams<string[]>(
		[],
		"tags",
		(tagArr) => tagArr.join(","),
		(tag) => tag.split(",")
	);

	const filters: DeepPartial<Companies_Bool_Exp> = {
		_and: [{ slug: { _neq: "" } }],
	};

	useEffect(() => {
		if (!initialLoad) {
			setPage(0);
		}
		if (
			initialLoad &&
			selectedTags.length !== 0 &&
			selectedLayer.value !== "" &&
			selectedCompanyFilters.value !== "" &&
			selectedAmountRaised.rangeEnd !== 0 &&
			selectedTotalEmployees.rangeEnd !== 0
		) {
			setInitialLoad(false);
		}

		onTrackView({
			properties: filters,
			pathname: router.pathname,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		selectedTags,
		selectedAmountRaised,
		selectedLayer,
		selectedTotalEmployees,
		selectedCompanyFilters,
	]);

	const filterByTag = async (
		event: React.MouseEvent<HTMLDivElement>,
		tag: string
	) => {
		event.stopPropagation();
		event.preventDefault();

		const newTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [tag, ...selectedTags];
		setSelectedTags(newTags);

		selectedTags.includes(tag)
			? toast.custom(
					(t) => (
						<div
							className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
								t.visible ? "animate-fade-in-up" : "opacity-0"
							}`}
						>
							Removed &ldquo;{tag}&rdquo; Filter
						</div>
					),
					{
						duration: 3000,
						position: "top-center",
					}
			  )
			: toast.custom(
					(t) => (
						<div
							className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
								t.visible ? "animate-fade-in-up" : "opacity-0"
							}`}
						>
							Added &ldquo;{tag}&rdquo; Filter
						</div>
					),
					{
						duration: 3000,
						position: "top-center",
					}
			  );
	};

	const clearTagFilters = async () => {
		setSelectedTags([]);

		toast.custom(
			(t) => (
				<div
					className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
						t.visible ? "animate-fade-in-up" : "opacity-0"
					}`}
				>
					Tag Filters Removed
				</div>
			),
			{
				duration: 3000,
				position: "top-center",
			}
		);
	};

	if (selectedTags.length > 0) {
		let allTags: any = [];
		selectedTags.map((tag) => {
			allTags.push({ tags: { _contains: tag } });
		});

		filters._and?.push({
			_and: allTags,
		});
	}

	if (selectedLayer?.value) {
		filters._and?.push({ layer: { _eq: selectedLayer.value } });
	}
	if (selectedCompanyFilters.value) {
		filters._and?.push({
			status_tags: { _contains: selectedCompanyFilters.value },
		});
	}
	if (selectedAmountRaised.rangeEnd !== 0) {
		filters._and?.push({
			_and: [
				{ investor_amount: { _gt: selectedAmountRaised.rangeStart } },
				{ investor_amount: { _lte: selectedAmountRaised.rangeEnd } },
			],
		});
	}
	if (selectedTotalEmployees.rangeEnd !== 0) {
		filters._and?.push({
			_and: [
				{ total_employees: { _gt: selectedTotalEmployees.rangeStart } },
				{ total_employees: { _lte: selectedTotalEmployees.rangeEnd } },
			],
		});
	}

	const {
		data: companiesData,
		error,
		isLoading,
	} = useGetCompaniesQuery({
		offset,
		limit,
		where: filters as Companies_Bool_Exp,
	});

	if (!isLoading && initialLoad) {
		setInitialLoad(false);
	}

	const companies = initialLoad ? initialCompanies : companiesData?.companies;
	const companies_aggregate = initialLoad
		? companiesCount
		: companiesData?.companies_aggregate?.aggregate?.count || 0;

	return (
		<div className="relative overflow-hidden">
			<ElemHeading
				title="Web3 Companies"
				subtitle="Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset."
			></ElemHeading>

			<div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
				<ElemRecentCompanies className="shadow" heading="Recently Discovered" />
			</div>

			<div className="max-w-7xl px-4 mx-auto mt-7 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow p-5">
					{/* {selectedTags.length > 0 ? (
						<div className="lg:flex items-baseline gap-2">
							<h2 className="text-xl font-bold">
								Companies ({numberWithCommas(companies_aggregate)})
							</h2>
							{selectedTags.length > 0 && (
								<div className="flex flex-wrap items-baseline">
									{selectedTags?.map((item, index: number) => {
										return (
											<span key={index} className="pr-1">
												{item}
												{index != selectedTags.length - 1 && ","}
											</span>
										);
									})}
									<div
										className="flex items-center text-sm cursor-pointer ml-1 text-primary-500 hover:text-dark-500"
										onClick={clearTagFilters}
									>
										clear tags filter
										<IconX className="ml-0.5 h-3" />
									</div>
								</div>
							)}
						</div>
					) : (
						<h2 className="text-xl font-bold">Companies</h2>
					)} */}

					<h2 className="text-xl font-bold">Companies</h2>

					{/* New Filters UI */}
					<div
						className="mt-2 flex items-center justify-between border-b border-black/10"
						role="tablist"
					>
						<nav className="flex">
							{companyFilters &&
								companyFilters.map((tab: any, index: number) =>
									tab.disabled === true ? (
										<Fragment key={index}></Fragment>
									) : (
										<button
											key={index}
											onClick={() => onClickCompanyStatus(index, tab)}
											className={`whitespace-nowrap flex py-3 px-3 border-b-2 box-border font-bold transition-all ${
												isActiveCompanyStatus === index
													? "text-primary-500 border-primary-500"
													: "border-transparent  hover:bg-slate-200"
											} ${tab.disabled ? "cursor-not-allowed" : ""}}`}
										>
											{tab.title}
										</button>
									)
								)}
						</nav>
					</div>

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
											<h3 className="font-bold text-sm">Location</h3>
											<ul className="list-none space-y-1 text-slate-600 leading-snug">
												<li>
													<button
														onClick={() => {}}
														className="box-border border-b border-primary-500 transition-all p-0 hover:border-b-2 hover:text-primary-500"
													>
														Add country
													</button>
												</li>
												<li>
													<button
														onClick={() => {}}
														className="border-b border-primary-500 transition-all p-0 hover:border-b-2 hover:text-primary-500"
													>
														Add state
													</button>
												</li>
												<li>
													<button
														onClick={() => {}}
														className="border-b border-primary-500 transition-all p-0 hover:border-b-2 hover:text-primary-500"
													>
														Add city
													</button>
												</li>
											</ul>

											<h3 className="mt-4 font-bold text-sm">
												Description keywords
											</h3>
											<ul className="list-none space-y-1 text-slate-600 leading-snug">
												<li>
													<button
														onClick={() => {}}
														className="border-b border-primary-500 transition-all p-0 hover:border-b-2 hover:text-primary-500"
													>
														Add keywords
													</button>
												</li>
											</ul>

											<h3 className="mt-4 font-bold text-sm">Industry</h3>
											<ul className="list-none space-y-1 text-slate-600 leading-snug">
												<li>
													<button
														onClick={() => {}}
														className="border-b border-primary-500 transition-all p-0 hover:border-b-2 hover:text-primary-500"
													>
														Select industry
													</button>
												</li>
											</ul>
										</div>
										<div>
											<h3 className="mt-4 font-bold text-sm">Financials</h3>
											<ul className="list-none space-y-1 text-slate-600 leading-snug">
												<li>
													<button
														onClick={() => {}}
														className="border-b border-primary-500 transition-all p-0 hover:border-b-2 hover:text-primary-500"
													>
														Funding type
													</button>
												</li>
												<li>
													<button
														onClick={() => {}}
														className="border-b border-primary-500 transition-all p-0 hover:border-b-2 hover:text-primary-500"
													>
														Funding amount total
													</button>
												</li>
												<li>
													<button
														onClick={() => {}}
														className="border-b border-primary-500 transition-all p-0 hover:border-b-2 hover:text-primary-500"
													>
														Last funding date
													</button>
												</li>
												<li>
													<button
														onClick={() => {}}
														className="border-b border-primary-500 transition-all p-0 hover:border-b-2 hover:text-primary-500"
													>
														Funding investors
													</button>
												</li>
											</ul>

											<h3 className="mt-4 font-bold text-sm">Team</h3>
											<ul className="list-none space-y-1 text-slate-600 leading-snug">
												<li>
													<button
														onClick={() => {}}
														className="border-b border-primary-500 transition-all p-0 hover:border-b-2 hover:text-primary-500"
													>
														Team size
													</button>
												</li>
											</ul>
										</div>
									</div>
								</Popover.Panel>
							</Popover>

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
										<button onClick={() => {}} className="text-primary-500">
											Clear filter
										</button>
									</div>
								</Popover.Panel>
							</Popover>

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
										<button onClick={() => {}} className="text-primary-500">
											Clear filter
										</button>
									</div>
								</Popover.Panel>
							</Popover>

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
										<button onClick={() => {}} className="text-primary-500">
											Clear filter
										</button>
									</div>
								</Popover.Panel>
							</Popover>

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
										<button onClick={() => {}} className="text-primary-500">
											Clear filter
										</button>
									</div>
								</Popover.Panel>
							</Popover>

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
										<button onClick={() => {}} className="text-primary-500">
											Clear filter
										</button>
									</div>
								</Popover.Panel>
							</Popover>

							<Popover className="snap-start shrink-0">
								<Popover.Button className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1">
									Funding type
								</Popover.Button>
								<Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg w-full max-w-xs p-5">
									<div className="font-bold text-sm">Funding type</div>
									<div className="mt-1">lorem ipsum...</div>
									<div className="mt-4 pt-2 border-t border-black/5">
										<button onClick={() => {}} className="text-primary-500">
											Clear filter
										</button>
									</div>
								</Popover.Panel>
							</Popover>

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
												defaultValue={convertToInternationalCurrencySystem(
													25000
												)}
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
										<button onClick={() => {}} className="text-primary-500">
											Clear filter
										</button>
									</div>
								</Popover.Panel>
							</Popover>

							<Popover className="snap-start shrink-0">
								<Popover.Button className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1">
									Last funding date
								</Popover.Button>
								<Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg w-full max-w-xs p-5">
									<div className="font-bold text-sm">Last funding date</div>
									<div className="mt-1">lorem ipsum...</div>
									<div className="mt-4 pt-2 border-t border-black/5">
										<button onClick={() => {}} className="text-primary-500">
											Clear filter
										</button>
									</div>
								</Popover.Panel>
							</Popover>

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
										<button onClick={() => {}} className="text-primary-500">
											Clear filter
										</button>
									</div>
								</Popover.Panel>
							</Popover>

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
										<button onClick={() => {}} className="text-primary-500">
											Clear filter
										</button>
									</div>
								</Popover.Panel>
							</Popover>

							{/* <ElemButton
								btn="transparent"
								onClick={() => {}}
								className="snap-start shrink-0"
							>
								Reset
							</ElemButton> */}
						</div>
					</section>

					{/* OLD Filters */}
					<section className="pt-2 pb-3">
						<div className="w-full flex flex-wrap justify-between lg:space-x-5 lg:flex-nowrap">
							{/* <InputSelect
								className="md:shrink md:basis-0"
								buttonClasses="w-auto"
								dropdownClasses="w-60"
								value={selectedCompanyFilters}
								onChange={setSelectedCompanyFilters}
								options={companyFilters}
							/> */}

							<div className="w-full overflow-hidden grow min-w-0 order-last lg:order-none">
								<ElemTagsCarousel
									onClick={filterByTag}
									selectedTags={selectedTags}
								/>
							</div>
						</div>
						<div className="mt-3 grid gap-5 grid-cols-1 lg:grid-cols-3">
							<InputSelect
								className="w-full"
								value={selectedLayer}
								onChange={setSelectedLayer}
								options={companyLayers}
							/>
							<InputSelect
								className="w-full"
								value={selectedAmountRaised}
								onChange={setSelectedAmountRaised}
								options={amountRaised}
							/>
							<InputSelect
								className="w-full"
								value={selectedTotalEmployees}
								onChange={setSelectedTotalEmployees}
								options={totalEmployees}
							/>
						</div>
					</section>

					{companies?.length === 0 && (
						<div className="flex items-center justify-center mx-auto min-h-[40vh]">
							<div className="w-full max-w-2xl my-8 p-8 text-center bg-white border rounded-2xl border-dark-500/10">
								<IconSearch className="w-12 h-12 mx-auto text-slate-300" />
								<h2 className="mt-5 text-3xl font-bold">No results found</h2>
								<div className="mt-1 text-lg text-slate-600">
									Please check spelling, try different filters, or tell us about
									missing data.
								</div>
								<ElemButton
									onClick={() => setToggleFeedbackForm(true)}
									btn="white"
									className="mt-3"
								>
									<IconAnnotation className="w-6 h-6 mr-1" />
									Tell us about missing data
								</ElemButton>
							</div>
						</div>
					)}

					<div
						className={`grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
					>
						{error ? (
							<h4>Error loading companies</h4>
						) : isLoading && !initialLoad ? (
							<>
								{Array.from({ length: 9 }, (_, i) => (
									<PlaceholderCompanyCard key={i} />
								))}
							</>
						) : (
							companies?.map((company) => {
								return (
									<ElemCompanyCard
										key={company.id}
										company={company as Companies}
										tagOnClick={filterByTag}
									/>
								);
							})
						)}
					</div>
					<Pagination
						shownItems={companies?.length}
						totalItems={companies_aggregate}
						page={page}
						itemsPerPage={limit}
						numeric
						onClickPrev={() => setPage(page - 1)}
						onClickNext={() => setPage(page + 1)}
						onClickToPage={(selectedPage) => setPage(selectedPage)}
					/>
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: companies } = await runGraphQl<GetCompaniesQuery>(
		GetCompaniesDocument,
		{
			offset: 0,
			limit: 50,
			where: { slug: { _neq: "" } },
		}
	);

	return {
		props: {
			metaTitle: "Web3 Companies - EdgeIn.io",
			metaDescription:
				"Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset.",
			companiesCount: companies?.companies_aggregate.aggregate?.count,
			initialCompanies: companies?.companies,
			companyFilters: CompaniesFilters,
			companyLayers: LayersFilters,
			amountRaised: AmountRaisedFilters,
			totalEmployees: EmployeesFilters,
		},
	};
};

export default Companies;

interface TextFilter {
	title: string;
	description?: string;
	icon?: string;
	value: string;
}

export interface NumericFilter {
	title: string;
	description?: string;
	rangeStart: number;
	rangeEnd: number;
}

const layerFilterValues = companyLayerChoices.map((option) => {
	return {
		title: option.id,
		value: option.id,
		description: option.name,
	};
});

const LayersFilters: TextFilter[] = [
	{
		title: "All Layers",
		value: "",
	},
	...layerFilterValues,
];
// Amount Raised Filter
const AmountRaisedFilters: NumericFilter[] = [
	{
		title: "All Funding Amounts",
		rangeStart: 0,
		rangeEnd: 0,
	},
	{
		title: "Less than $1M",
		rangeStart: 0,
		rangeEnd: 10e5 - 1, //999999
	},
	{
		title: "$1M",
		rangeStart: 10e5,
		rangeEnd: 10e5,
	},
	{
		title: "$1M-$10M",
		rangeStart: 10e5 + 1,
		rangeEnd: 10e6,
	},
	{
		title: "$11M-$20M",
		rangeStart: 10e6 + 1,
		rangeEnd: 20e6,
	},
	{
		title: "$21M-$50M",
		rangeStart: 20e6 + 1,
		rangeEnd: 50e6,
	},
	{
		title: "$51M-$100M",
		rangeStart: 50e6 + 1,
		rangeEnd: 10e7,
	},
	{
		title: "$101M-$200M",
		rangeStart: 10e7 + 1,
		rangeEnd: 20e7,
	},
	{
		title: "$200M+",
		rangeStart: 20e7,
		rangeEnd: 90e14,
	},
];
// Total Employees Filter
const EmployeesFilters: NumericFilter[] = [
	{
		title: "Number of Employees",
		rangeStart: 0,
		rangeEnd: 0,
	},
	{
		title: "Less than 10 Employees",
		rangeStart: 0,
		rangeEnd: 9,
	},
	{
		title: "10-15 Employees",
		rangeStart: 10,
		rangeEnd: 15,
	},
	{
		title: "16-30 Employees",
		rangeStart: 16,
		rangeEnd: 30,
	},
	{
		title: "31-100 Employees",
		rangeStart: 31,
		rangeEnd: 100,
	},
	{
		title: "101-200 Employees",
		rangeStart: 101,
		rangeEnd: 200,
	},
	{
		title: "201-500 Employees",
		rangeStart: 201,
		rangeEnd: 500,
	},
	{
		title: "501-1000 Employees",
		rangeStart: 501,
		rangeEnd: 1000,
	},
	{
		title: "1000+ Employees",
		rangeStart: 1001,
		rangeEnd: 1000000000,
	},
];

const companyFilterValues = companyChoices.map((option) => {
	return {
		title: option.name,
		value: option.id,
		icon: option.id,
		disabled: option.disabled ? option.disabled : false,
	};
});

const CompaniesFilters: TextFilter[] = [
	{
		title: "All Companies",
		value: "",
	},
	...companyFilterValues,
];
