import React, { Fragment, useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ElemHeading } from "@/components/elem-heading";
import {
	PlaceholderCompanyCard,
	PlaceholderTable,
} from "@/components/placeholders";
import { ElemRecentCompanies } from "@/components/companies/elem-recent-companies";
import { ElemButton } from "@/components/elem-button";
import { runGraphQl } from "@/utils";
import {
	IconSearch,
	IconAnnotation,
	IconGrid,
	IconTable,
} from "@/components/icons";
import { CompaniesTable } from "@/components/companies/elem-companies-table";
import {
	Companies,
	Companies_Bool_Exp,
	GetCompaniesDocument,
	GetCompaniesQuery,
	useGetCompaniesQuery,
} from "@/graphql/types";
import { Pagination } from "@/components/pagination";
import { ElemCompanyCard } from "@/components/companies/elem-company-card";
import { companyChoices } from "@/utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { useStateParams } from "@/hooks/use-state-params";
import { onTrackView } from "@/utils/track";
import { processCompaniesFilters } from "@/utils/filter";
import { ElemFilter } from "@/components/elem-filter";
import { useIntercom } from "react-use-intercom";
import useFilterParams from "@/hooks/use-filter-params";
import useLibrary from "@/hooks/use-library";
import { DeepPartial } from "@/types/common";
import { useUser } from "@/context/user-context";

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
	companyStatusTags: TextFilter[];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Companies: NextPage<Props> = ({
	companiesCount,
	initialCompanies,
	companyStatusTags,
	setToggleFeedbackForm,
}) => {
	const { user } = useUser();

	const [initialLoad, setInitialLoad] = useState(true);

	const router = useRouter();

	const { selectedLibrary } = useLibrary();

	const { selectedFilters, setSelectedFilters } = useFilterParams();

	// Company status-tag filter
	const [selectedStatusTag, setSelectedStatusTag] = useStateParamsFilter(
		companyStatusTags,
		"statusTag"
	);

	const [tableLayout, setTableLayout] = useState(false);

	const [page, setPage] = useStateParams<number>(
		0,
		"page",
		(pageIndex) => pageIndex + 1 + "",
		(pageIndex) => Number(pageIndex) - 1
	);

	// limit shown companies on table layout for free users
	const limit =
		user?.entitlements.listsCount && tableLayout
			? user?.entitlements.listsCount
			: 50;

	// disable offset on table layout for free users
	const offset =
		user?.entitlements.listsCount && tableLayout ? 0 : limit * page;

	const defaultFilters = [
		{ slug: { _neq: "" } },
		{ library: { _contains: selectedLibrary } },
	];

	const filters: DeepPartial<Companies_Bool_Exp> = {
		_and: defaultFilters,
	};

	useEffect(() => {
		if (!initialLoad) {
			setPage(0);
		}
		if (initialLoad && selectedStatusTag.value !== "") {
			setInitialLoad(false);
		}

		onTrackView({
			properties: filters,
			pathname: router.pathname,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedStatusTag]);

	const filterByTag = async (
		event: React.MouseEvent<HTMLDivElement>,
		tag: string
	) => {
		event.stopPropagation();
		event.preventDefault();

		const currentFilterOption = [...(selectedFilters?.industry?.tags || [])];
		const newFilterOption = currentFilterOption.includes(tag)
			? currentFilterOption.filter((t) => t !== tag)
			: [tag, ...currentFilterOption];

		if (newFilterOption.length === 0) {
			setSelectedFilters({ ...selectedFilters, industry: undefined });
		} else {
			setSelectedFilters({
				...selectedFilters,
				industry: {
					...selectedFilters?.industry,
					tags: newFilterOption,
				},
			});
		}

		currentFilterOption.includes(tag)
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

	/** Handle selected filter params */
	processCompaniesFilters(filters, selectedFilters, defaultFilters);

	if (selectedStatusTag.value) {
		filters._and?.push({
			status_tags: { _contains: selectedStatusTag.value },
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

	const { showNewMessages } = useIntercom();

	return (
		<div className="relative">
			{!initialLoad && (
				<ElemHeading
					title={`${selectedLibrary} Companies`}
					subtitle={`Early-stage companies in this ${selectedLibrary} market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset.`}
					className=""
				></ElemHeading>
			)}

			<div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
				<ElemRecentCompanies className="shadow" heading="Recently Discovered" />
			</div>

			<div className="max-w-7xl px-4 mx-auto mt-7 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow p-5">
					<h2 className="text-xl font-bold">Companies</h2>

					<div
						className="mt-2 flex flex-wrap items-center justify-between border-y border-black/10 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x"
						role="tablist"
					>
						<nav className="flex">
							{companyStatusTags &&
								companyStatusTags.map((tab: any, index: number) =>
									tab.disabled === true ? (
										<Fragment key={index}></Fragment>
									) : (
										<button
											key={index}
											onClick={() => setSelectedStatusTag(tab)}
											className={`whitespace-nowrap flex py-3 px-3 border-b-2 box-border font-bold transition-all ${
												selectedStatusTag.value === tab.value
													? "text-primary-500 border-primary-500"
													: "border-transparent  hover:bg-slate-200"
											} ${tab.disabled ? "cursor-not-allowed" : ""}}`}
										>
											{tab.title}
										</button>
									)
								)}
						</nav>

						<div className="flex items-center">
							<div className="text-xs font-bold leading-sm uppercase pr-1">
								Layout:
							</div>
							<div className="bg-slate-200 rounded-full p-0.5">
								<button
									onClick={() => setTableLayout(false)}
									className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full transition-all focus:ring-1 focus:ring-slate-200 ${
										!tableLayout && "bg-white shadow-sm text-primary-500"
									}`}
								>
									<IconGrid className="w-5 h-5" title="Grid layout" />
								</button>
								<button
									onClick={() => setTableLayout(true)}
									className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full transition-all focus:ring-1 focus:ring-slate-200 ${
										tableLayout && "bg-white shadow-sm text-primary-500"
									}`}
								>
									<IconTable className="w-5 h-5" title="Table layout" />
								</button>
							</div>
						</div>
					</div>

					<ElemFilter
						resourceType="companies"
						filterValues={selectedFilters}
						onApply={(name, filterParams) => {
							filters._and = defaultFilters;
							setSelectedFilters({ ...selectedFilters, [name]: filterParams });
						}}
						onClearOption={(name) => {
							filters._and = defaultFilters;
							setSelectedFilters({ ...selectedFilters, [name]: undefined });
						}}
						onReset={() => setSelectedFilters(null)}
					/>

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

					<div>
						{error ? (
							<div className="flex items-center justify-center mx-auto min-h-[40vh] col-span-3">
								<div className="max-w-xl mx-auto">
									<h4 className="mt-5 text-3xl font-bold">
										Error loading companies
									</h4>
									<div className="mt-1 text-lg text-slate-600">
										Please check spelling, reset filters, or{" "}
										<button
											onClick={() =>
												showNewMessages(
													`Hi EdgeIn, I'd like to report an error on companies page`
												)
											}
											className="inline underline decoration-primary-500 hover:text-primary-500"
										>
											<span>report error</span>
										</button>
										.
									</div>
								</div>
							</div>
						) : isLoading && !initialLoad ? (
							<>
								{tableLayout ? (
									<div className="rounded-t-lg overflow-auto border-t border-x border-black/10">
										<PlaceholderTable />
									</div>
								) : (
									<div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
										{Array.from({ length: 9 }, (_, i) => (
											<PlaceholderCompanyCard key={i} />
										))}
									</div>
								)}
							</>
						) : tableLayout && companies?.length != 0 ? (
							<CompaniesTable
								companies={companies}
								pageNumber={page}
								itemsPerPage={limit}
								shownItems={companies?.length}
								totalItems={companies_aggregate}
								onClickPrev={() => setPage(page - 1)}
								onClickNext={() => setPage(page + 1)}
								filterByTag={filterByTag}
							/>
						) : (
							<>
								{companies?.length != 0 && (
									<div className="min-h-[42vh] grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
										{companies?.map((company) => {
											return (
												<ElemCompanyCard
													key={company.id}
													company={company as Companies}
													tagOnClick={filterByTag}
												/>
											);
										})}
									</div>
								)}
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
							</>
						)}
					</div>
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
			where: {
				_and: [{ slug: { _neq: "" } }, { library: { _contains: "Web3" } }],
			},
		}
	);

	return {
		props: {
			metaTitle: "Web3 Companies - EdgeIn.io",
			metaDescription:
				"Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset.",
			companiesCount: companies?.companies_aggregate?.aggregate?.count || 0,
			initialCompanies: companies?.companies,
			companyStatusTags,
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

const companyStatusTagValues = companyChoices.map((option) => {
	return {
		title: option.name,
		value: option.id,
		icon: option.id,
		disabled: option.disabled ? option.disabled : false,
	};
});

const companyStatusTags: TextFilter[] = [
	{
		title: "All Companies",
		value: "",
	},
	...companyStatusTagValues,
];
