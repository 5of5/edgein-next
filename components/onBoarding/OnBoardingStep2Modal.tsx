import React, { useState, Fragment } from "react";
import { ElemButton } from "@/components/ElemButton";
import { TagInputText } from "@/components/TagInputText";
import { TagInputSelect } from "@/components/TagInputSelect";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

type Props = {
	selectedOption: string;
	locationTags: string[];
	industryTags: string[];
	show: boolean;
	onClose: () => void;
	onNext: (locationTags: string[], industryTags: string[]) => void;
	onBack: (locationTags: string[], industryTags: string[]) => void;
};

export default function OnBoardingStep2Modal(props: Props) {
	const [locationTags, setLocationTags] = useState(props.locationTags);
	const [industryTags, setIndustryTags] = useState(props.industryTags);

	const router = useRouter();

	const onNext = () => {
		props.onNext(locationTags, industryTags);
		router.push(`/` + props.selectedOption);
	};

	const onBack = () => {
		props.onBack(locationTags, industryTags);
	};

	const interestsSuggestions = [
		"Analytics",
		"API",
		"Asset",
		"Bitcoin",
		"Blockchain",
		"Centralized",
		"Chain Tools",
		"Crypto",
		"DAO",
		"D-App",
		"Database",
		"DeFi",
		"Dev Tools",
		"Ethereum",
		"Exchange",
		"Gaming",
		"Marketplace",
		"Messaging",
		"Metaverse",
		"NFT",
		"Oracle",
		"Platform",
		"Storage",
		"Wallet",
		"Native Code",
		"Nodes",
	];

	return (
		<>
			<Transition.Root show={props.show} as={Fragment}>
				<Dialog as="div" onClose={() => {}} className="relative z-[60]">
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
									Let&rsquo;s set up your areas of interest
								</h3>
								<p className="text-sm text-slate-500">Step 2 of 2</p>
								<div className="mt-4 text-slate-600">
									This will help you discover relevant companies and investors.
								</div>

								<TagInputText
									defaultTags={locationTags}
									className="mt-8"
									label="Locations"
									sublabel="Type and press enter"
									value=""
									name="Location"
									placeholder="e.g. Germany, San Francisco"
									onChange={(tags) => {
										setLocationTags(tags);
									}}
								/>

								<TagInputSelect
									defaultTags={industryTags}
									suggestions={interestsSuggestions}
									className="mt-5"
									label="Interests"
									sublabel="Type or select"
									value=""
									name="Interests"
									placeholder="e.g. DeFi, D-App, NFT, Gaming..."
									onChange={(tags) => {
										setIndustryTags(tags);
									}}
								/>
								<div className="w-full flex justify-end mt-20">
									<ElemButton
										onClick={onBack}
										btn="transparent"
										className="text-slate-600"
									>
										Back
									</ElemButton>
									<ElemButton onClick={onNext} btn="primary">
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
