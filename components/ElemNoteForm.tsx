import { Fragment, ChangeEvent, useState, useEffect, useMemo } from "react";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { IconTrash, IconX } from "@/components/Icons";
import { InputTextarea } from "@/components/InputTextarea";
import { ElemTooltip } from "@/components/ElemTooltip";
import { useUser } from "@/context/userContext";
import { ElemButton } from "./ElemButton";
import { ElemPhoto } from "./ElemPhoto";
import { InputSelect } from "./InputSelect";
import moment from "moment-timezone";
import { GetNotesQuery } from "@/graphql/types";
import { ElemDeleteConfirmModal } from "./ElemDeleteConfirmModal";

type Props = {
	isOpen: boolean;
	type: "create" | "edit";
	selectedNote?: GetNotesQuery["notes"][0];
	resourceId: number;
	resourceType: string;
	onClose: () => void;
	onRefetchNotes: () => void;
};

const ElemNoteForm: React.FC<Props> = ({
	isOpen,
	type,
	selectedNote,
	resourceId,
	resourceType,
	onClose,
	onRefetchNotes,
}) => {
	const { user, myGroups } = useUser();

	const [notes, setNotes] = useState(selectedNote?.notes);

	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

	const groupOptions = useMemo(() => {
		return myGroups.map((item) => ({
			id: item.id,
			title: "Group: " + item.name,
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

	const handleOpenDeleteModal = () => {
		setIsOpenDeleteModal(true);
	};

	const handleCloseDeleteModal = () => {
		setIsOpenDeleteModal(false);
	};

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
				onRefetchNotes();
			},
		}
	);

	const handleChangeNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setNotes(event.target.value);
	};

	const handleSubmit = () => {
		mutate();
	};

	const { mutate: deleteNote, isLoading: isDeletingNote } = useMutation(
		() => {
			return fetch("/api/notes/", {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: selectedNote?.id,
				}),
			});
		},
		{
			onSuccess: async (response) => {
				handleCloseDeleteModal();
				if (response.status !== 200) {
					const err = await response.json();
					toast.custom(
						(t) => (
							<div
								className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
									t.visible ? "animate-fade-in-up" : "opacity-0"
								}`}
							>
								{err?.message}
							</div>
						),
						{
							duration: 3000,
							position: "top-center",
						}
					);
				} else {
					onClose();
					onRefetchNotes();
				}
			},
		}
	);

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
							<Dialog.Panel className="w-full max-w-lg transform rounded-lg bg-white p-5 text-left align-middle shadow-xl transition-all">
								<div className="relative flex items-center justify-between pb-2 border-b border-slate-200">
									<Dialog.Title className="flex-1 text-xl text-center font-bold">
										{type === "edit" ? "Edit Note" : "Create Note"}
									</Dialog.Title>
									<button
										type="button"
										onClick={onClose}
										className="absolute -top-0.5 right-0 flex items-center justify-center h-8 w-8 bg-transparent active:bg-transparent rounded-full hover:bg-black/10"
									>
										<IconX className="h-6 w-6" />
									</button>
								</div>

								<div className="flex items-start gap-2 mt-3 mb-2">
									{/* TODO: Get selectedNote.last_update_by  */}
									{type === "edit" ? (
										<ElemTooltip
											content={`Last edited by ${
												user?.display_name
											} on ${moment(selectedNote?.updated_at).format(
												"LL h:mma"
											)}`}
											className="cursor-pointer"
										>
											<ElemPhoto
												photo={user?.profilePicture || user?.person?.picture}
												wrapClass="aspect-square shrink-0 bg-white overflow-hidden rounded-full w-10"
												imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
												imgAlt={user?.display_name}
												placeholder="user"
												placeholderClass="text-slate-300"
											/>
										</ElemTooltip>
									) : (
										<ElemPhoto
											photo={user?.person?.picture}
											wrapClass="aspect-square shrink-0 bg-white overflow-hidden rounded-full w-10"
											imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
											imgAlt={user?.display_name}
											placeholder="user"
											placeholderClass="text-slate-300"
										/>
									)}

									<div className="grow">
										<p className="font-bold capitalize mb-1">
											{/* TODO: Get selectedNote.last_update_by  */}
											{user?.display_name}
										</p>
										<div>
											{!selectedNote && (
												<label className="text-slate-500">
													Select audience
													{/* What group can see your note? */}
												</label>
											)}
											<InputSelect
												options={groupOptions}
												value={selectedGroup}
												onChange={setSelectedGroup}
												className="mt-0.5 text-slate-600 text-base w-full"
												buttonClasses="w-full sm:w-fit"
												disabled={!!selectedNote}
											/>
										</div>
									</div>
								</div>

								<label>
									<InputTextarea
										name="notes"
										rows={8}
										value={notes}
										onChange={handleChangeNote}
										placeholder="Write your note..."
										className="ring-1 ring-slate-200"
									/>
								</label>

								<div className="mt-6 flex items-center justify-between">
									<ElemButton
										btn="primary"
										disabled={!notes || !selectedGroup}
										loading={isLoading}
										onClick={handleSubmit}
									>
										{type === "edit" ? "Update Note" : "Create Note"}
									</ElemButton>

									{type === "edit" && selectedNote?.created_by === user?.id && (
										<ElemButton
											btn="transparent"
											onClick={handleOpenDeleteModal}
											className="text-red-500 !px-0 shrink-0"
										>
											<div className="flex items-center gap-1">
												<IconTrash className="w-6 h-6" />
												<span>Delete Note</span>
											</div>
										</ElemButton>
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>

				<ElemDeleteConfirmModal
					isOpen={isOpenDeleteModal}
					title="Delete this note?"
					content={
						<div>
							When you delete a note, it will be removed immediately.
							<span className="font-bold inline">
								This can&lsquo;t be undone.
							</span>
						</div>
					}
					loading={isDeletingNote}
					onClose={handleCloseDeleteModal}
					onDelete={deleteNote}
				/>

				<Toaster />
			</Dialog>
		</Transition>
	);
};

export default ElemNoteForm;
