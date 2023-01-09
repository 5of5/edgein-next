import { Fragment, ChangeEvent, useState, useEffect, useMemo } from "react";
import { useMutation } from "react-query";
import { Dialog, Transition } from "@headlessui/react";
import { IconX } from "@/components/Icons";
import { InputTextarea } from "@/components/InputTextarea";
import { useUser } from "@/context/userContext";
import { ElemButton } from "./ElemButton";
import { ElemPhoto } from "./ElemPhoto";
import { InputSelect } from "./InputSelect";
import { Notes, Notes_Bool_Exp, useGetNotesQuery } from "@/graphql/types";

type Props = {
	isOpen: boolean;
	type: "create" | "edit";
	selectedNote?: Notes;
	resourceId: number;
	resourceType: string;
	onClose: () => void;
};

const ElemNoteForm: React.FC<Props> = ({
	isOpen,
	type,
	selectedNote,
	resourceId,
	resourceType,
	onClose,
}) => {
	const { user, myGroups } = useUser();

	const [notes, setNotes] = useState(selectedNote?.notes);

	const groupOptions = useMemo(() => {
		return myGroups.map((item) => ({
			id: item.id,
			title: item.name,
		}));
	}, [myGroups]);

	const defaultSelectedGroup =
		groupOptions.find((item) => item.id === selectedNote?.user_group_id) ||
		groupOptions[0];

	const [selectedGroup, setSelectedGroup] = useState(defaultSelectedGroup);

	useEffect(() => {
		setNotes(selectedNote?.notes);
		setSelectedGroup(
			groupOptions.find((item) => item.id === selectedNote?.user_group_id) ||
				groupOptions[0]
		);
	}, [selectedNote, groupOptions]);

	const { refetch } = useGetNotesQuery(
		{
			where: {
				resource_id: { _eq: resourceId },
				resource_type: { _eq: resourceType },
			} as Notes_Bool_Exp,
		},
		{ enabled: false }
	);

	const { mutate, isLoading } = useMutation(
		() => {
			const args = {
				create: {
					method: "POST",
					params: {
						notes,
						groupId: selectedGroup.id,
						resourceType,
						resourceId: resourceId,
					},
				},
				edit: {
					method: "PUT",
					params: {
						id: selectedNote?.id,
						notes,
					},
				},
			};
			return fetch("/api/notes/", {
				method: args[type].method,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(args[type].params),
			}).then((res) => res.json());
		},
		{
			onSuccess: () => {
				onClose();
				refetch();
			},
		}
	);

	const handleChangeNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setNotes(event.target.value);
	};

	const handleSubmit = () => {
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
									<span>{type === "edit" ? "Edit Note" : "Create Note"}</span>
									<button type="button" onClick={onClose}>
										<IconX className="w-5 h-5" />
									</button>
								</Dialog.Title>
								<div className="flex items-start gap-2 mt-3 mb-2">
									<ElemPhoto
										photo={user?.profilePicture}
										wrapClass="aspect-square shrink-0 bg-white overflow-hidden rounded-full w-10"
										imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
										imgAlt={user?.display_name}
										placeholder="user"
										placeholderClass="text-slate-300"
									/>
									<div>
										<p className="font-bold capitalize mb-1">
											{user?.display_name}
										</p>
                    <div>
                      {!selectedNote && <label className="text-slate-500">Select the group to add for</label>}
                      <InputSelect
                        options={groupOptions}
                        value={selectedGroup}
                        onChange={setSelectedGroup}
                        className="w-80 text-slate-600 text-base"
                        disabled={!!selectedNote}
                      />
                    </div>
										
									</div>
								</div>

								<label>
									<InputTextarea
										name="notes"
										rows={6}
										value={notes}
										onChange={handleChangeNote}
										placeholder="What's important about this organization?"
										className="ring-1 ring-slate-200"
									/>
								</label>

								<div className="mt-6">
									<ElemButton
										btn="primary"
										disabled={!notes || !selectedGroup}
										loading={isLoading}
										onClick={handleSubmit}
									>
										{type === "edit" ? "Update Note" : "Save Note"}
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

export default ElemNoteForm;
