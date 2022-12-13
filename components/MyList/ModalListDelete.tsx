import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { ElemButton } from "@/components/ElemButton";
import { IconX } from "@/components/Icons";

type Props = {
	isOpen: boolean;
	onCloseModal: () => void;
	onDelete: () => void;
};

export const ModalListDelete: FC<Props> = ({
	isOpen,
	onCloseModal,
	onDelete,
}) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onCloseModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-slate-100 shadow-xl transition-all overflow-hidden">
								<div className="flex items-center justify-between px-6 py-2 bg-white border-b border-black/10">
									<h2 className="text-xl font-bold capitalize">
										Delete this list?
									</h2>
									<button
										onClick={onCloseModal}
										type="button"
										className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100"
									>
										<IconX className="h-6 w-6" title="close" />
									</button>
								</div>

								<div className="p-6 flex flex-col gap-y-6">
									<div>
										When you delete a list, everything in it will be removed
										immediately.
										<span className="font-bold inline">
											This can&lsquo;t be undone.
										</span>
									</div>
									<div className="flex justify-end gap-x-6">
										<ElemButton onClick={onCloseModal} roundedFull btn="slate">
											Cancel
										</ElemButton>
										<ElemButton onClick={onDelete} roundedFull btn="danger">
											Delete
										</ElemButton>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
