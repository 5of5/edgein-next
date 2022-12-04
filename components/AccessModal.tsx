import { useEffect, useState, Fragment } from "react";
import { ElemButton } from "@/components/ElemButton";
import { ElemLogo } from "@/components/ElemLogo";
import { IconSparkles, IconBadgeCheck } from "@/components/Icons";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
	show: boolean;
	onSignUp: (email: string, password: string) => void;
	onClose: () => void;
};

const AccessModal: React.FC<Props> = (props: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {}, [props.show]);

	const onSignUp = (email: string, password: string) => {
		props.onClose();
		props.onSignUp(email, password);
	};

	const onClose = () => {
		props.onClose();
	};

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
							<Dialog.Panel className="max-w-2xl w-full mx-auto rounded-lg bg-white shadow-2xl overflow-x-hidden overflow-y-scroll overscroll-y-none">
								<div className="p-3 bg-gradient-to-r from-blue-800 via-primary-500 to-primary-400 text-xl font-bold text-white text-center">
									{`You ran run out of page views :(`}
								</div>
								<div className="max-w-xl mx-auto w-full">
									<div className="p-6 lg:p-12">
										<div className="flex items-center h-12 w-12 p-2 mx-auto rounded-full shadow">
											<ElemLogo mode="icon" className="w-10 aspect-square" />
										</div>
										<h1 className="mt-4 mx-8 text-3xl font-bold text-center lg:text-4xl">
											Access more than 17,000 web3 profiles
										</h1>
										<div className="flex items-center justify-center">
											<ul className="my-8 text-lg space-y-2">
												<li className="flex items-center">
													<IconBadgeCheck className="w-5 h-5 mr-1 text-primary-500" />
													Access unlimited companies
												</li>
												<li className="flex items-center">
													<IconBadgeCheck className="w-5 h-5 mr-1 text-primary-500" />
													Access unlimited investors
												</li>
												<li className="flex items-center">
													<IconBadgeCheck className="w-5 h-5 mr-1 text-primary-500" />
													Access unlimited people
												</li>
												<li className="flex items-center">
													<IconBadgeCheck className="w-5 h-5 mr-1 text-primary-500" />
													Monitor reaction lists
												</li>
												<li className="flex items-center">
													<IconBadgeCheck className="w-5 h-5 mr-1 text-primary-500" />
													Create custom lists
												</li>
												<li className="flex items-center">
													<IconBadgeCheck className="w-5 h-5 mr-1 text-primary-500" />
													Express your sentiments towards organizations
												</li>
												<li className="flex items-center">
													<IconBadgeCheck className="w-5 h-5 mr-1 text-primary-500" />
													Explore reactions of the web3 community
												</li>
											</ul>
										</div>

										<div className="flex items-center justify-center">
											<ElemButton
												className=" my-2"
												onClick={() => onSignUp("", "")}
												btn="primary"
												loading={isLoading}
											>
												<IconSparkles
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

export default AccessModal;
