import React, { useState, Fragment } from "react";
import { ElemButton } from "@/components/elem-button";
import { ElemTooltip } from "@/components/elem-tooltip";
import { IconFindCompanies, IconFindInvestors } from "@/components/icons";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
	selectedOption: string;
	show: boolean;
	onClose: () => void;
	onNext: (selectedOption: string) => void;
	user: {
		display_name?: string | null;
		email?: string | null;
		id: number;
	} | null;
};

export default function OnboardingStep1(props: Props) {
	const [selectedOption, setSelectedOption] = useState(props.selectedOption);

	const onNext = () => {
		if (selectedOption) {
			props.onNext(selectedOption);
		}
	};

	const submitButtonComponent = (
    <ElemButton btn="primary" disabled={!selectedOption} onClick={onNext}>
      Next
    </ElemButton>
  );

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
							<Dialog.Panel className="max-w-2xl w-full p-6 mx-auto rounded-lg shadow-2xl bg-white overflow-x-hidden overflow-y-auto overscroll-y-none lg:p-12">
								<h3 className="text-2xl font-bold">
									Hi <span className="capitalize">{
										props.user && props.user.display_name
											? props.user.display_name
											: props.user
											? props.user.email
											: ""
									}</span>, How will you use EdgeIn?
								</h3>
								<p className="text-sm text-slate-500">Step 1 of 5</p>
								<div className="mt-4 text-slate-600">
									We&rsquo;ll get you set so you can start exploring
								</div>
								<div className="mt-8 flex flex-col items-center space-y-4">
									<button
										onClick={() => {
											setSelectedOption("companies");
										}}
										className={`${
											selectedOption === "companies"
												? "ring-2 ring-primary-500"
												: "ring-1 ring-slate-300"
										} flex items-center space-x-3 w-full font-bold border-0 px-6 py-4 ring-inset rounded-lg focus:!outline-none`}
									>
										<IconFindCompanies className="w-6 h-6" />
										<h2>Find companies</h2>
									</button>
									<button
										onClick={() => {
											setSelectedOption("investors");
										}}
										className={`${
											selectedOption === "investors"
												? "ring-2 ring-primary-500"
												: "ring-1 ring-slate-300"
										} flex items-center space-x-3 w-full font-bold border-0 px-6 py-4 ring-inset rounded-lg focus:!outline-none`}
									>
										<IconFindInvestors className="w-6 h-6" />
										<h2 className="self-center">Find investors</h2>
									</button>
								</div>
								<div className="w-full flex justify-end mt-8">
                  {selectedOption ? (
                    submitButtonComponent
                  ) : (
                    <ElemTooltip
                      content="Please click one of the options"
                      className="cursor-auto"
                    >
                      {submitButtonComponent}
                    </ElemTooltip>
                  )}
                </div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
}
