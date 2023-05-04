import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { ElemButton } from "./elem-button";

type Props = {
	show: boolean;
	messageType: string;
	onConfirm?: () => void;
	onCancel: () => void;
	message: string;
};

const ElemConfirmationMessageModal: React.FC<Props> = ({
	show,
	messageType,
	onConfirm = () => {},
	onCancel = () => {},
	message,
}) => {
	return (
		<>
			<Transition.Root show={show} as={Fragment}>
				<Dialog as="div" onClose={onCancel} className="relative z-[60]">
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
								<div className="max-w-xs mx-auto w-full">
									<>
										<p className="mt-2 text-slate-600 text-center">{message}</p>
										{messageType === "confirmation" && (
											<div className="flex justify-center gap-x-5">
												<ElemButton
													onClick={onCancel}
													btn="ol-primary"
													className="mt-5"
												>
													Cancel
												</ElemButton>
												<ElemButton
													onClick={onConfirm}
													btn="primary"
													className="mt-5"
												>
													Confirm
												</ElemButton>
											</div>
										)}
									</>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default ElemConfirmationMessageModal;
