import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { IconX } from "@/components/Icons2";
import { InputText } from "@/components/input-text";
import { useUser } from "@/context/user-context";
import { ElemButton } from "../elem-button";
import { useMutation } from "react-query";
import { kebabCase } from "lodash";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export const CreateListDialog: React.FC<Props> = ({ isOpen, onClose }) => {
	const router = useRouter();

	const { refreshProfile } = useUser();

	const [listName, setListName] = useState<string>("");

	const { mutate, isLoading } = useMutation(
		() =>
			fetch("/api/add-list/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					listName: listName,
				}),
			}).then((res) => res.json()),
		{
			onSuccess: (data) => {
				refreshProfile();
				router.push(`/lists/${data.list.id}/${kebabCase(listName)}`);
				onClose();
				setListName("");
			},
		}
	);

	const handleCreate = () => {
		mutate();
	};

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
							<Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title className="text-xl font-bold flex items-center justify-between">
									<span>Create List</span>
									<button
										type="button"
										onClick={onClose}
										className="focus-visible:outline-none"
									>
										<IconX className="w-5 h-5" />
									</button>
								</Dialog.Title>

								<div className="mt-2">
									<p className="text-slate-500">
										Lists are where you monitor and compare companies and/or
										investors that matter to you.
									</p>
								</div>

								<div className="flex flex-col space-y-6 mt-6">
									<label>
										<InputText
											name="name"
											type="text"
											label="Name"
											value={listName}
											onChange={(e) => setListName(e.target.value)}
											placeholder="Enter List Name..."
											className="ring-1 ring-slate-200"
										/>
									</label>
								</div>

								<div className="mt-6 float-right">
									<ElemButton
										btn="primary"
										disabled={!listName}
										loading={isLoading}
										onClick={handleCreate}
									>
										Create
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
