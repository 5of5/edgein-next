import { Fragment, ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Dialog, Transition } from "@headlessui/react";
import { IconX } from "@/components/Icons";
import { InputText } from "@/components/InputText";
import { useUser } from "@/context/userContext";
import { ElemButton } from "../ElemButton";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const ElemCreateGroupDialog: React.FC<Props> = ({ isOpen, onClose }) => {
	const router = useRouter();

	const { refetchMyGroups } = useUser();

	const [values, setValues] = useState({ name: "", description: "" });

	const { mutate, isLoading } = useMutation(
		() =>
			fetch("/api/groups/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ payload: values }),
			}).then((res) => res.json()),
		{
			onSuccess: (data) => {
				refetchMyGroups();
				router.push(`/groups/${data.id}`);
			},
		}
	);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValues((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

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
							<Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title className="text-xl font-bold flex items-center justify-between">
									<span>Create Group</span>
									<button type="button" onClick={onClose}>
										<IconX className="w-5 h-5" />
									</button>
								</Dialog.Title>
								<div className="mt-2">
									<p className="text-sm text-slate-500">
										Groups are where your team or business partners communicate.
										They&apos;re best when organized around a topic.
									</p>
								</div>

								<div className="flex flex-col space-y-6 mt-6">
									<label>
										<InputText
											name="name"
											type="text"
											label="Name"
											value={values.name}
											onChange={handleChange}
											placeholder="e.g: EdgeIn Wizards"
											className="ring-1 ring-slate-200"
										/>
									</label>
									<label>
										<InputText
											name="description"
											type="text"
											label="Description (Optional)"
											value={values.description}
											onChange={handleChange}
											className="ring-1 ring-slate-200"
										/>
										<div className="mt-2 text-sm text-slate-500">
											What is the group about?
										</div>
									</label>
								</div>

								<div className="mt-6 float-right">
									<ElemButton
										btn="primary"
										disabled={!values.name}
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

export default ElemCreateGroupDialog;
