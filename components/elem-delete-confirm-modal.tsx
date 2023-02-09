import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, ReactElement } from "react";
import { ElemButton } from "@/components/elem-button";
import { IconX } from "@/components/Icons";

type Props = {
	isOpen: boolean;
	title: string | ReactElement;
	content: string | ReactElement;
	loading?: boolean;
	onClose: () => void;
	onDelete: () => void;
};

export const ElemDeleteConfirmModal: FC<Props> = ({
	isOpen,
	title,
	content,
	loading = false,
	onClose,
	onDelete,
}) => {
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
							<Dialog.Panel className="w-full max-w-md transform rounded-lg bg-slate-100 shadow-xl transition-all overflow-hidden">
								<div className="flex items-center justify-between px-6 py-2 bg-white border-b border-black/10">
									<h2 className="text-xl font-bold capitalize">{title}</h2>
									<button
										onClick={onClose}
										type="button"
										className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100"
									>
										<IconX className="h-6 w-6" title="close" />
									</button>
								</div>

								<div className="p-6 flex flex-col gap-y-6">
									{content}
									<div className="flex justify-end gap-x-6">
										<ElemButton onClick={onClose} roundedFull btn="slate">
											Cancel
										</ElemButton>
										<ElemButton
											onClick={onDelete}
											roundedFull
											btn="danger"
											loading={loading}
										>
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
