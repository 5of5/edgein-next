import React, { useState, useEffect, Fragment } from "react";
import { ElemButton } from "../ElemButton";
import { DeepPartial } from "../Company/ElemCohort";
import { Dialog, Transition } from "@headlessui/react";
import {
	Companies_Bool_Exp,
	Vc_Firms_Bool_Exp,
	useGetRelevantCompaniesQuery,
	useGetRelevantVcFirmsQuery,
} from "@/graphql/types";
import { createListWithMultipleResources } from "@/utils/reaction";

type Props = {
	selectedOption: string;
	locationTags: string[];
	industryTags: string[];
	show: boolean;
	onClose: () => void;
	onNext: () => void;
	onBack: () => void;
	user: {
		display_name?: string;
		email?: string;
		id: number;
		role: string;
	} | null;
};

export default function OnBoardingStep3Modal(props: Props) {
	const [list, setList] = useState<any[]>([]);
	const [locationTags, setLocationTags] = useState<string[]>([]);
	const [industryTags, setIndustryTags] = useState<string[]>([]);

	const onClose = () => {
		props.onClose();
	};

	const handleCreateList = async () => {
		const path =
			props.selectedOption === "companies" ? "companies" : "investors";
		const payload = {
			sentiment: "My First List",
			[props.selectedOption === "companies" ? "companies" : "vcfirms"]:
				list.map((item) => ({
					[props.selectedOption === "companies" ? "company" : "vcfirm"]:
						item.id,
					pathname: `/${path}/${item.slug}`,
				})),
		};
		const newSentiment = await createListWithMultipleResources(payload);
		props.onClose();
	};

	const onFinishSetup = () => {
		// props.onClose();
		handleCreateList();
	};

	const filtersCompanies: DeepPartial<Companies_Bool_Exp> = {
		_or: [
			...locationTags.map((tag) => ({
				location: { _ilike: tag },
			})),
			...industryTags.map((tag) => ({
				tags: { _contains: tag },
			})),
		],
	};

	const filterVCFirms: DeepPartial<Vc_Firms_Bool_Exp> = {
		_or: [
			...locationTags.map((tag) => ({
				location: { _ilike: tag },
			})),
			...industryTags.map((tag) => ({
				tags: { _contains: tag },
			})),
		],
	};

	const {
		data: companiesData,
		// error,
		isLoading: loadingCompany,
	} = useGetRelevantCompaniesQuery({
		where: filtersCompanies as Companies_Bool_Exp,
		current_user: props.user?.id ?? 0,
	});

	const {
		data: vcFirmsData,
		// error,
		isLoading: loadingVCFirm,
	} = useGetRelevantVcFirmsQuery({
		where: filterVCFirms as Vc_Firms_Bool_Exp,
		current_user: props.user?.id ?? 0,
	});

	useEffect(() => {
		setLocationTags(props.locationTags);
		setIndustryTags(props.industryTags);
	}, [props]);

	useEffect(() => {
		if (props.selectedOption === "companies") {
			setList(companiesData ? companiesData.companies : []);
		} else {
			setList(vcFirmsData ? vcFirmsData.vc_firms : []);
		}
	}, [companiesData, vcFirmsData, props.selectedOption]);

	return (
		<>
			<Transition.Root show={props.show} as={Fragment}>
				<Dialog as="div" onClose={onClose} className="relative z-[60]">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed z-10 inset-0 bg-black/20 transition-opacity backdrop-blur-sm" />
					</Transition.Child>

					<div className="fixed inset-0 z-[50] m-6 min-h-0 flex flex-col items-center justify-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-300"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="max-w-2xl w-full p-6 mx-auto rounded-lg shadow-2xl bg-white overflow-x-hidden overflow-y-scroll overscroll-y-none lg:p-12">
								<h3 className="text-2xl font-bold">
									We started your first list
								</h3>
								<p className="text-sm text-slate-500">Step 3 of 3</p>
								<div className="mt-4 text-slate-600">
									{`Based on your area of interest here is a list of organizations we think you might like. You can add or remove organizations by going to "My Edge List".`}
								</div>
								<div className="w-full my-5 grid grid-cols-2 gap-5 sm:grid-cols-3">
									{list.length > 0 &&
										list.map((item, index) => {
											return (
												<div
													key={index}
													className="flex items-center space-x-2"
												>
													<div className="flex items-center justify-center shrink-0 w-10 h-10 p-1 rounded shadow">
														<img
															className="object-contain max-w-full max-h-full"
															src={item.logo ? item.logo.url : ""}
															alt={item.name}
														/>
													</div>
													<h1 className="font-bold truncate">{item.name}</h1>
												</div>
											);
										})}
								</div>
								<div className="w-full flex justify-end mt-8">
									<ElemButton
										onClick={props.onBack}
										btn="transparent"
										className="text-slate-600"
									>
										Back
									</ElemButton>
									<ElemButton onClick={onFinishSetup} btn="primary">
										Finish Setup
									</ElemButton>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
}
