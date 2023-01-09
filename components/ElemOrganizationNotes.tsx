import React, { useState, FC } from "react";
import moment from "moment-timezone";
import { Notes, Notes_Bool_Exp, useGetNotesQuery } from "@/graphql/types";
import { IconGroup, IconPlus, IconLockClosed } from "@/components/Icons";
import { PlaceholderCompanyCard } from "./Placeholders";
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
      user_group_id: { _in: myGroups.map(item => item.id)},
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
				<div className="grid grid-cols-3 gap-4 mt-4">
					{Array.from({ length: 3 }, (_, i) => (
						<PlaceholderCompanyCard key={i} />
					))}
				</div>
			) : (
				<>
					{notes.length > 0 && (
						<div className="grid grid-cols-3 gap-4 mt-3">
							{notes.map((item) => (
								<div
									key={item.id}
									className="flex flex-col mx-auto w-full cursor-pointer rounded-lg border border-black/10 divide-y divide-black/10 transition-all hover:scale-102 hover:shadow md:h-full"
									onClick={() => onSelectNote(item)}
								>
									<p className="grow break-words line-clamp-7 p-4 text-slate-600">
										{item.notes}
									</p>
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
										<p className="text-sm text-slate-600">
											{moment(item.created_at).format("LL")}
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
			/>
		</>
	);
};

export default ElemOrganizationNotes;
