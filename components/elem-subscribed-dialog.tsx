import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconX, IconCheck } from "@/components/icons";
import { ElemButton } from "@/components/elem-button";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const ElemSubscribedDialog: React.FC<Props> = ({ isOpen, onClose }) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-40" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-xl transform rounded-lg bg-white p-6 shadow-xl transition-all">
								<div className="flex justify-end items-center">
									<button
										type="button"
										onClick={onClose}
										className="focus-visible:outline-none"
									>
										<IconX className="h-6 w-6" title="close" />
									</button>
								</div>

								<div className="flex items-center h-12 w-12 p-2 mx-auto rounded-full bg-white shadow">
									<IconCheck className="w-10 aspect-square text-primary-500" />
								</div>

								<Dialog.Title className="mt-4 text-2xl text-center font-bold lg:text-3xl">
									Purchase Complete.
									<br />
									Welcome to EdgeIn Contributor!
								</Dialog.Title>

								<div className="mt-4 mb-8">
									<p className="text-slate-600">
										As a contributor, you help support our free community data
										model. Get real-time updates on the companies, people, deals
										and events you’re most interested in, giving you an
										unprecedented edge in web3.
									</p>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
