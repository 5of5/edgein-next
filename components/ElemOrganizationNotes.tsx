import React, { useState, FC } from "react";
import moment from "moment-timezone";
import { Notes, Notes_Bool_Exp, useGetNotesQuery } from "@/graphql/types";
import { IconGroup, IconPlus } from "@/components/Icons";
import { PlaceholderCompanyCard } from "./Placeholders";
import { ElemButton } from "./ElemButton";
import ElemNoteForm from "./ElemNoteForm";

type Props = {
	resourceId: number;
	resourceType: string;
};

const ElemOrganizationNotes: FC<Props> = ({ resourceId, resourceType }) => {
	const [isOpenNoteForm, setIsOpenNoteForm] = useState<boolean>(false);

	const [selectedNote, setSelectedNote] = useState<Notes>();

	const onOpenNoteForm = () => {
		setIsOpenNoteForm(true);
	};

	const onCloseNoteForm = () => {
		setIsOpenNoteForm(false);
		setTimeout(() => {
			setSelectedNote(undefined);
		}, 400);
	};

	const onSelectNote = (note: Notes) => {
		setSelectedNote(note);
		onOpenNoteForm();
	};

	const {
		data: noteList,
		error,
		isLoading,
	} = useGetNotesQuery({
		where: {
			resource_id: { _eq: resourceId },
			resource_type: { _eq: resourceType },
		} as Notes_Bool_Exp,
	});

	const notes = noteList?.notes || [];

	return (
		<>
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold">{`Notes (${notes.length || 0})`}</h2>
				<ElemButton btn="slate" onClick={onOpenNoteForm}>
					<IconPlus className="w-6 h-6 mr-1" />
					<span>Start a note</span>
				</ElemButton>
			</div>

			{error ? (
				<h4>Error loading notes</h4>
			) : isLoading ? (
				<div className="grid grid-cols-3 gap-4 mt-4">
					{Array.from({ length: 3 }, (_, i) => (
						<PlaceholderCompanyCard key={i} />
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
				<div className="grid grid-cols-3 gap-4 mt-4">
					{notes.map((item) => (
						<div
							key={item.id}
							className="flex flex-col mx-auto w-full p-5 cursor-pointer rounded-lg border border-dark-500/10 transition-all hover:scale-102 hover:shadow md:h-full"
							onClick={() => onSelectNote(item)}
						>
							<p className="text-slate-500 break-words line-clamp-6">
								{item.notes}
							</p>
							<div className="border-t border-dark-500/10 mt-3 pt-3">
								<div className="flex gap-1">
									<IconGroup className="w-6 h-6" />
									<p className="text-lg font-bold">{item.user_group.name}</p>
								</div>
								<p className="text-sm text-slate-500 mt-1">
									{moment(item.created_at).format("LL")}
								</p>
							</div>
						</div>
					))}
				</div>
			)}

			<ElemNoteForm
				isOpen={isOpenNoteForm}
				type={selectedNote ? "edit" : "create"}
				selectedNote={selectedNote}
				resourceId={resourceId}
				resourceType={resourceType}
				onClose={onCloseNoteForm}
			/>
		</>
	);
};

export default ElemOrganizationNotes;
