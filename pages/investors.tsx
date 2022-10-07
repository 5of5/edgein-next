import React, { useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { PlaceholderInvestorCard } from "@/components/Placeholders";
import { ElemRecentInvestments } from "@/components/Investors/ElemRecentInvestments";
import { ElemHeading } from "@/components/ElemHeading";
import { ElemFiltersWrap } from "@/components/ElemFiltersWrap";
import { InputSearch } from "@/components/InputSearch";
import { InputSelect } from "@/components/InputSelect";
import { ElemButton } from "@/components/ElemButton";
import { IconSearch, IconAnnotation } from "@/components/Icons";
import {
	GetVcFirmsDocument,
	GetVcFirmsQuery,
	useGetVcFirmsQuery,
	Vc_Firms_Bool_Exp,
	Vc_Firms,
} from "../graphql/types";
import { DeepPartial, NumericFilter } from "./companies";
import { useDebounce } from "@/hooks/useDebounce";
import { Pagination } from "@/components/Pagination";
import { runGraphQl } from "@/utils";
import { useAuth } from "@/hooks/useAuth";
import { ElemInvestorCard } from "@/components/Investors/ElemInvestorCard";

type Props = {
	vcFirmCount: number;
	initialVCFirms: GetVcFirmsQuery["vc_firms"];
	numberOfInvestments: NumericFilter[];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Investors: NextPage<Props> = ({
	vcFirmCount,
	initialVCFirms,
	numberOfInvestments,
	setToggleFeedbackForm,
}) => {
	const { user } = useAuth();
	const [initialLoad, setInitialLoad] = useState(true);

	// Search Box
	const [search, setSearch] = useState("");
	const debouncedSearchTerm = useDebounce(search, 500);

	// Investments Count
	const [selectedInvestmentCount, setSelectedInvestmentCount] = useState(
		numberOfInvestments[0]
	);

	const [page, setPage] = useState<number>(0);
	const limit = 50;
	const offset = limit * page;

	useEffect(() => {
		setPage(0);
		if (
			initialLoad &&
			debouncedSearchTerm !== "" &&
			selectedInvestmentCount.rangeEnd !== 0
		) {
			setInitialLoad(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchTerm, selectedInvestmentCount]);

	const filters: DeepPartial<Vc_Firms_Bool_Exp> = {
		_and: [{ slug: { _neq: "" }, status: { _eq: "published" } }],
	};
	if (debouncedSearchTerm !== "") {
		filters._and?.push({ name: { _ilike: `%${debouncedSearchTerm}%` } });
	}
	if (selectedInvestmentCount.rangeEnd !== 0) {
		filters._and?.push({
			_and: [
				{ num_of_investments: { _gt: selectedInvestmentCount.rangeStart } },
				{ num_of_investments: { _lte: selectedInvestmentCount.rangeEnd } },
			],
		});
	}

	const {
		data: vcFirmsData,
		error,
		isLoading,
	} = useGetVcFirmsQuery({
		offset,
		limit,
		where: filters as Vc_Firms_Bool_Exp,
		current_user: user?.id ?? 0,
	});

	if (!isLoading && initialLoad) {
		setInitialLoad(false);
	}

	const vcFirms = initialLoad ? initialVCFirms : vcFirmsData?.vc_firms

	return (
		<div className="relative overflow-hidden">
			<ElemHeading
				title="Investors"
				subtitle="We're tracking investments made in web3 companies and projects to provide you with an index of the most active and influential capital in the industry."
			></ElemHeading>

			<div className="max-w-7xl px-4 mx-auto relative z-10 sm:px-6 lg:px-8">
				{vcFirms && <ElemRecentInvestments heading="Recent Investor Updates" />}
			</div>
			<div className="max-w-7xl px-4 mx-auto mt-7 relative z-10 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg p-5">
					<h2 className="text-xl font-bold">All Investors</h2>
					<ElemFiltersWrap className="pt-2 filters-wrap">
						<InputSearch
							className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
							label="Search"
							name="search"
							value={search}
							placeholder="Quick Search..."
							onChange={(e: {
								target: { value: React.SetStateAction<string> };
							}) => setSearch(e.target.value)}
						/>
						<InputSelect
							className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
							value={selectedInvestmentCount}
							onChange={setSelectedInvestmentCount}
							options={numberOfInvestments}
						/>
					</ElemFiltersWrap>

					{vcFirms?.length === 0 && (
						<>
							<div className="flex items-center justify-center  mx-auto min-h-[40vh]">
								<div className="w-full max-w-2xl py-8 text-center bg-white border rounded-2xl border-dark-500/10">
									<IconSearch className="w-12 h-12 mx-auto text-slate-300" />
									<h2 className="mt-5 text-3xl font-bold">No results found</h2>
									<div className="mt-1 text-lg text-dark-400">
										Please check spelling, try different filters, or tell us
										about missing data.
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
						</>
					)}

					<div className="flex flex-col w-full gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3">
						{error ? (
							<h4>Error loading investors</h4>
						) : isLoading && !initialLoad ? (
							<>
								{Array.from({ length: 15 }, (_, i) => (
									<PlaceholderInvestorCard key={i} />
								))}
							</>
						) : (
							vcFirms?.map((vcfirm) => (
								<ElemInvestorCard
								key={vcfirm.id}
								vcFirm={vcfirm as Vc_Firms}
							/>
							))
						)}
					</div>
					<Pagination
						shownItems={vcFirms?.length}
						totalItems={vcFirmCount}
						page={page}
						itemsPerPage={limit}
						onClickPrev={() => setPage((prev) => prev - 1)}
						onClickNext={() => setPage((prev) => prev + 1)}
					/>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { data: vcFirms } = await runGraphQl<GetVcFirmsQuery>(
		GetVcFirmsDocument,
		{
			offset: 0,
			where: { slug: { _neq: "" }, status: { _eq: "published" } },
			current_user: 0,
		}
	);

	return {
		props: {
			metaTitle: "Web3 Investors - EdgeIn.io",
			metaDescription:
				"We're tracking investments made in web3 companies and projects to provide you with an index of the most active and influential capital in the industry.",
			vcFirmCount: vcFirms?.vc_firms?.length || null,
			initialVCFirms: vcFirms?.vc_firms.slice(0, 50) || null,
			numberOfInvestments: InvestmentsFilters,
		},
	};
};

export default Investors;

// Total Investments Filter
const InvestmentsFilters: NumericFilter[] = [
	{
		title: "Number of Investments",
		rangeStart: 0,
		rangeEnd: 0,
	},
	{
		title: "5 or less Investments",
		rangeStart: 1,
		rangeEnd: 5,
	},
	{
		title: "6-15 Investments",
		rangeStart: 6,
		rangeEnd: 15,
	},
	{
		title: "16-25 Investments",
		rangeStart: 16,
		rangeEnd: 25,
	},
	{
		title: "25+ Investments",
		rangeStart: 25,
		rangeEnd: 1000000000,
	},
];
