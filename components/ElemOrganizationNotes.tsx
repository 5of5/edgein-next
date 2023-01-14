import React, { useState, FC, useEffect } from "react";
import moment from "moment-timezone";
import { GetNotesQuery, Notes, Notes_Bool_Exp, useGetNotesQuery } from "@/graphql/types";
import { IconGroup, IconPlus, IconLockClosed } from "@/components/Icons";
import { PlaceholderNote } from "./Placeholders";
import { ElemButton } from "./ElemButton";
import ElemNoteForm from "./ElemNoteForm";
import { useUser } from "@/context/userContext";

type Props = {
	resourceId: number;
	resourceType: string;
};

const ElemOrganizationNotes: FC<Props> = ({ resourceId, resourceType }) => {
	const { myGroups } = useUser();

	const [isOpenNoteForm, setIsOpenNoteForm] = useState<boolean>(false);

	const [selectedNote, setSelectedNote] = useState<GetNotesQuery['notes'][0]>();

	const onOpenNoteForm = () => {
		setIsOpenNoteForm(true);
	};

	const onCloseNoteForm = () => {
		setIsOpenNoteForm(false);
		setTimeout(() => {
			setSelectedNote(undefined);
		}, 400);
	};

	const onSelectNote = (note: GetNotesQuery['notes'][0]) => {
		setSelectedNote(note);
		onOpenNoteForm();
	};

	const {
		data: noteList,
		error,
		isLoading,
		refetch,
	} = useGetNotesQuery({
		where: {
			resource_id: { _eq: resourceId },
			resource_type: { _eq: resourceType },
			user_group_id: { _in: myGroups.map((item) => item.id) },
		} as Notes_Bool_Exp,
	});

	const notes = noteList?.notes || [];

	return (
		<>
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-bold">
						Notes{` ${notes.length > 0 ? "(" + notes.length + ")" : ""}`}
					</h2>
					<div className="flex gap-1">
						<IconLockClosed className="h-4 w-4" title="Private" />
						<p className="text-sm">Private</p>
					</div>
				</div>
				<ElemButton btn="slate" onClick={onOpenNoteForm}>
					<IconPlus className="w-6 h-6 mr-1" />
					<span>Start a note</span>
				</ElemButton>
			</div>

			{error ? (
				<h4>Error loading notes</h4>
			) : isLoading ? (
				<div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 3 }, (_, i) => (
						<PlaceholderNote key={i} />
					))}
				</div>
			) : notes.length === 0 ? (
				<div className="flex items-center justify-center mx-auto">
					<div className="w-full max-w-2xl p-8 text-center bg-white lg:my-8">
						<h2 className="mt-5 text-3xl font-bold">No notes found</h2>
						<div className="mt-1 text-lg text-slate-600">
							There are no notes for this organization.
						</div>
					</div>
				</div>
			) : (
				<>
					{notes.length > 0 && (
						<div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
							{notes.map((item) => (
								<div
									key={item.id}
									className="flex flex-col mx-auto w-full cursor-pointer rounded-lg border border-black/10 divide-y divide-black/10 transition-all hover:scale-102 hover:shadow md:h-full"
									onClick={() => onSelectNote(item)}
								>
									<div className="grow p-4">
										<p className="break-words line-clamp-7 text-slate-600">
											{item.notes}
										</p>
									</div>
									<div className="p-4">
										<div
											className="flex gap-1"
											title={`Group: ${item.user_group.name}`}
										>
											<IconGroup className="w-6 h-6" />
											<p className="text-lg font-bold">
												{item.user_group.name}
											</p>
										</div>

										{/* <p className="text-sm text-slate-600">
											Last edit {moment(item.updated_at).format("LL h:mma")}
										</p> */}

										<p className="text-sm text-slate-600">
											Created {moment(item.created_at).format("LL")}
										</p>
									</div>
								</div>
							))}
						</div>
					)}
				</>
			)}

			<ElemNoteForm
				isOpen={isOpenNoteForm}
				type={selectedNote ? "edit" : "create"}
				selectedNote={selectedNote}
				resourceId={resourceId}
				resourceType={resourceType}
				onClose={onCloseNoteForm}
				onRefetchNotes={refetch}
			/>
		</>
	);
};

export default ElemOrganizationNotes;
