import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import { ElemButton } from "../ElemButton";

type Props = {
	isOpen: boolean;
	currentName?: string;
	onCloseModal: () => void;
	onSave: (name: string) => void;
};

export const ElemListEditModal: FC<Props> = ({
	isOpen,
	currentName,
	onCloseModal,
	onSave,
}) => {
	const [name, setName] = useState<string | undefined>();
	const [error, setError] = useState<string | null>(null);

	const onSaveBtn = () => {
		if (name) onSave(name);
	};

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
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 pb-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r -mx-6 p-3 text-white font-bold px-4"
								>
									Edit List
								</Dialog.Title>
								<div className="mt-2">
									<label className="block font-bold ">Name</label>
									<input
										onChange={(event) => setName(event.target.value)}
										defaultValue={currentName ? currentName : ""}
										className="pl-4 mt-1 h-10 w-full relative bg-white rounded-md border border-black/10 outline-none placeholder:text-slate-400 focus:bg-white focus:outline-none"
									/>
									{error && <p className=" text-red-400">{error}</p>}
								</div>

								<div className="mt-4">
									<ElemButton
										onClick={onSaveBtn}
										roundedFull
										btn="primary"
										className="float-right"
									>
										Save
									</ElemButton>
									<ElemButton
										onClick={onCloseModal}
										roundedFull
										btn="white"
										className="float-right mr-3"
									>
										Cancel
									</ElemButton>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
