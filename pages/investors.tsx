import React, { useEffect, useState } from "react";
import type { NextPage, GetStaticProps } from "next";
import { PlaceholderInvestorCard } from "@/components/Placeholders";
import { ElemRecentInvestments } from "@/components/Investors/ElemRecentInvestments";
import { ElemHeading } from "@/components/ElemHeading";
import { ElemFiltersWrap } from "@/components/ElemFiltersWrap";
import { InputSelect } from "@/components/InputSelect";
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
import { investorChoices } from "../utils/constants";

type Props = {
	vcFirmCount: number;
	initialVCFirms: GetVcFirmsQuery["vc_firms"];
	investorFilters: TextFilter[];
	numberOfInvestments: NumericFilter[];
	setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Investors: NextPage<Props> = ({
	vcFirmCount,
	initialVCFirms,
	investorFilters,
	numberOfInvestments,
	setToggleFeedbackForm,
}) => {
	const { user } = useAuth();
	const [initialLoad, setInitialLoad] = useState(true);

	// Investor Filter
	const [selectedInvestorFilters, setSelectedInvestorFilters] = useState(
		investorFilters[0]
	);

	// Investments Count
	const [selectedInvestmentCount, setSelectedInvestmentCount] = useState(
		numberOfInvestments[0]
	);

	const [page, setPage] = useState<number>(0);
	const limit = 50;
	const offset = limit * page;

	useEffect(() => {
		setPage(0);
		if (initialLoad && selectedInvestmentCount.rangeEnd !== 0) {
			setInitialLoad(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedInvestmentCount]);

	const filters: DeepPartial<Vc_Firms_Bool_Exp> = {
		_and: [{ slug: { _neq: "" }, status: { _eq: "published" } }],
	};

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
	});

	if (!isLoading && initialLoad) {
		setInitialLoad(false);
	}

	const vcFirms = initialLoad ? initialVCFirms : vcFirmsData?.vc_firms;
	const vcfirm_aggregate = initialLoad ? vcFirmCount : vcFirmsData?.vc_firms_aggregate?.aggregate?.count || 0;

	return (
		<div className="relative overflow-hidden">
			<ElemHeading
				title="Investors"
				subtitle="We're tracking investments made in web3 companies and projects to provide you with an index of the most active and influential capital in the industry."
			></ElemHeading>

			<div className="max-w-7xl px-4 mx-auto relative z-10 sm:px-6 lg:px-8">
				<ElemRecentInvestments heading="Recent Investor Updates" />
			</div>
			<div className="max-w-7xl px-4 mx-auto mt-7 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow p-5">
					<h2 className="text-xl font-bold">All Investors</h2>
					<ElemFiltersWrap className="pt-2 filters-wrap">
						<InputSelect
							className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
							value={selectedInvestorFilters}
							onChange={setSelectedInvestorFilters}
							options={investorFilters}
						/>
						<InputSelect
							className="w-full md:grow md:shrink md:basis-0 md:max-w-[16rem]"
							value={selectedInvestmentCount}
							onChange={setSelectedInvestmentCount}
							options={numberOfInvestments}
						/>
					</ElemFiltersWrap>

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
								<ElemInvestorCard key={vcfirm.id} vcFirm={vcfirm as Vc_Firms} />
							))
						)}
					</div>
					<Pagination
						shownItems={vcFirms?.length}
						totalItems={vcfirm_aggregate}
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
			limit: 50,
			where: { slug: { _neq: "" }, status: { _eq: "published" } },
		}
	);

	return {
		props: {
			metaTitle: "Web3 Investors - EdgeIn.io",
			metaDescription:
				"We're tracking investments made in web3 companies and projects to provide you with an index of the most active and influential capital in the industry.",
			vcFirmCount: vcFirms?.vc_firms_aggregate.aggregate?.count || 0,
			initialVCFirms: vcFirms?.vc_firms || [],
			investorFilters: investorsFilters,
			numberOfInvestments: InvestmentsFilters,
		},
	};
};

export default Investors;

interface TextFilter {
	title: string;
	description?: string;
	icon?: string;
	value: string;
}

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

const investorFilterValue = investorChoices.map((option) => {
	return {
		title: option.name,
		value: option.id,
		icon: option.id,
		disabled: option.disabled ? option.disabled : false,
	};
});

const investorsFilters: TextFilter[] = [
	{
		title: "All Investors",
		value: "",
	},
	...investorFilterValue,
];
