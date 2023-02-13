import { FC, Fragment, useState, useEffect, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ElemButton } from "@/components/ElemButton";
import { IconX } from "@/components/Icons";
import { InputSelect } from "../InputSelect";
import { useUser } from "@/context/userContext";

type Props = {
	isOpen: boolean;
	listGroups?: Array<any>;
	onCloseModal: () => void;
	onSave: (groupIds: Array<number>) => void;
};

export const ModalListGroups: FC<Props> = ({
	isOpen,
	listGroups = [],
	onCloseModal,
	onSave,
}) => {
	const { myGroups } = useUser();

	const [selectedGroups, setSelectedGroups] = useState<Array<any>>([]);
	const [error, setError] = useState<string | null>(null);

	const groupOptions = useMemo(() => {
		return myGroups.map((item) => ({
			id: item.id,
			title: item.name,
		}));
	}, [myGroups]);

	useEffect(() => {
		setSelectedGroups(
			listGroups.map((item) => ({
				id: item.id,
				title: item.name,
			}))
		);
		setError("");
	}, [listGroups]);

	const onSaveBtn = () => {
		if (error) {
			return;
		}

		const groupIds = selectedGroups.map((item: any) => item.id);
		onSave(groupIds);
		onCloseModal();
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
							<Dialog.Panel className="w-full max-w-md transform rounded-lg bg-slate-100 shadow-xl transition-all">
								<div className="flex items-center justify-between px-6 py-2 bg-white rounded-t-2xl border-b border-black/10">
									<h2 className="text-xl font-bold capitalize">
										Edit List Groups
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
										<InputSelect
											className="w-full"
											buttonClasses="w-full"
											dropdownClasses="w-full"
											multiple
											by="id"
											value={selectedGroups}
											onChange={setSelectedGroups}
											options={groupOptions}
											placeholder="Select group"
										/>
										{error === "" ? null : (
											<div className="mt-2 font-bold text-sm text-rose-400">
												{error}
											</div>
										)}
									</div>
									<div className="flex justify-end gap-x-6">
										<ElemButton onClick={onCloseModal} roundedFull btn="slate">
											Cancel
										</ElemButton>
										<ElemButton onClick={onSaveBtn} roundedFull btn="primary">
											Save
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
