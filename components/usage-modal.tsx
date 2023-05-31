import { useEffect, Fragment } from "react";
import { ElemButton } from "@/components/elem-button";
import { ElemLogo } from "@/components/elem-logo";
import { IconBadgeCheck, IconContributor } from "@/components/icons";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
	show: boolean;
	onSignUp: (email: string, password: string) => void;
	onClose: () => void;
};

const UsageModal: React.FC<Props> = (props: Props) => {
	useEffect(() => {}, [props.show]);

	const onSignUp = (email: string, password: string) => {
		props.onClose();
		props.onSignUp(email, password);
	};

	const onClose = () => {
		props.onClose();
	};

	const features = [
		{
			text: "Access unlimited companies",
		},
		{
			text: "Access unlimited investors",
		},
		{
			text: "Access unlimited people",
		},
		{
			text: "Access unlimited events",
		},
		{
			text: "Access unlimited search",
		},
		{
			text: "Create custom lists",
		},
		{
			text: "Create custom groups",
		},
		{
			text: "Save notes on organizations",
		},
		{
			text: "Express your sentiments towards organizations",
		},
		{
			text: "Explore reactions of the web3 community",
		},
	];

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
							<Dialog.Panel className="max-w-2xl w-full mx-auto rounded-lg bg-white shadow-2xl overflow-x-hidden overflow-y-auto overscroll-y-none">
								<div className="p-3 bg-gradient-to-r from-blue-800 via-primary-500 to-primary-400 text-xl font-bold text-white text-center">
									{`You ran out of page views :(`}
								</div>
								<div className="max-w-xl mx-auto w-full">
									<div className="p-6 lg:p-12">
										<div className="hidden items-center h-12 w-12 p-2 mx-auto rounded-full shadow lg:flex">
											<ElemLogo mode="icon" className="w-10 aspect-square" />
										</div>
										<h1 className="mt-0 text-2xl font-bold text-center lg:mt-4 lg:mx-8 lg:text-4xl">
											Access more than 43,000 Web3 profiles
										</h1>
										<div className="flex items-center justify-center">
											<ul className="my-8 space-y-2 lg:text-lg">
												{features.map((feature, index) => (
													<li
														className="flex items-start lg:items-center"
														key={index}
													>
														<IconBadgeCheck className="shrink-0 w-5 h-5 mr-1 text-primary-500" />
														{feature.text}
													</li>
												))}
											</ul>
										</div>

										<div className="flex items-center justify-center">
											<ElemButton
												className=" my-2"
												onClick={() => onSignUp("", "")}
												btn="primary"
												loading={false}
											>
												<IconContributor
													className="w-5 h-5 mr-1"
													title="Free Access"
												/>
												Sign up and get free access
											</ElemButton>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default UsageModal;
