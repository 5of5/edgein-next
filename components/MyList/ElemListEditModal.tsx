import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState, useEffect } from "react";
import { ElemButton } from "../ElemButton";
import { InputText } from "@/components/InputText";

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
	useEffect(() => {
		setName(currentName);
		setError("");
	}, [currentName]);

	const [name, setName] = useState<string>();
	const [error, setError] = useState<string | null>(null);

	const validateName = (value: string) => {
		setName(value);
		if (value.length >= 3) {
			setError("");
		} else {
			setError("List name should have at least 3 characters.");
		}
	};

	const onSaveBtn = () => {
		if (error || !name) {
			return;
		}

		if (name) {
			validateName(name);
			onSave(name);
		}
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
									<InputText
										onChange={(event) => validateName(event?.target.value)}
										name="name"
										type="text"
										value={name}
										className={`${
											error === ""
												? "ring-1 ring-slate-200"
												: "ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400"
										}`}
									/>
									{error === "" ? null : (
										<div className="mt-2 font-bold text-sm text-rose-400">
											{error}
										</div>
									)}
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
