import React, { useState, FC, useEffect } from "react";
import moment from "moment-timezone";
import {
	GetNotesQuery,
	Notes,
	Notes_Bool_Exp,
	useGetNotesQuery,
} from "@/graphql/types";
import {
	IconGroup,
	IconPlus,
	IconLockClosed,
	IconInformationCircle,
} from "@/components/Icons";
import { PlaceholderNote } from "./Placeholders";
import { ElemButton } from "./ElemButton";
import ElemNoteForm from "./ElemNoteForm";
import { ElemPhoto } from "./ElemPhoto";
import { useUser } from "@/context/userContext";
import ElemNoteCard from "@/components/Group/ElemNoteCard";
import { ElemTooltip } from "@/components/ElemTooltip";
import { orderBy } from "lodash";

type Props = {
	resourceId: number;
	resourceType: string;
};

const ElemOrganizationNotes: FC<Props> = ({ resourceId, resourceType }) => {
	const { user, myGroups } = useUser();

	const [isOpenNoteForm, setIsOpenNoteForm] = useState<boolean>(false);

	const [selectedNote, setSelectedNote] = useState<GetNotesQuery["notes"][0]>();

	const onOpenNoteForm = () => {
		setIsOpenNoteForm(true);
	};

	const onCloseNoteForm = () => {
		setIsOpenNoteForm(false);
		setTimeout(() => {
			setSelectedNote(undefined);
		}, 400);
	};

	const onSelectNote = (note: GetNotesQuery["notes"][0]) => {
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

	const sortedNotes = orderBy(notes, (a) => new Date(a.created_at), ["desc"]);

	return (
		<>
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center space-x-1">
					<h2 className="flex items-center text-xl font-bold">
						<IconLockClosed className="h-5 w-5 mr-1" title="Private" />
						Notes{` ${notes.length > 0 ? "(" + notes.length + ")" : ""}`}{" "}
					</h2>
					<ElemTooltip
						size="md"
						content="Notes are private to you, but you can change the audience of any note."
						//content="Only you can see your notes, but you can change the audience of any specific note."
					>
						<IconInformationCircle
							className="h-5 w-5 text-primary-500"
							title="About notes"
						/>
					</ElemTooltip>
				</div>
				<ElemButton btn="primary" onClick={onOpenNoteForm} className="!pl-3">
					<IconPlus className="w-5 h-5 mr-1" />
					<span>Create note</span>
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
				<div className="mt-4 flex items-start gap-2 bg-white shadow rounded-lg px-5 py-4">
					<ElemPhoto
						photo={user?.profilePicture || user?.person?.picture}
						wrapClass="aspect-square shrink-0 bg-white overflow-hidden rounded-full w-10"
						imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
						imgAlt={user?.display_name}
						placeholder="user"
						placeholderClass="text-slate-300"
					/>
					<div
						className="w-full cursor-pointer bg-slate-100 rounded-full px-4 py-2 hover:bg-slate-200"
						onClick={onOpenNoteForm}
					>
						Write your note...
					</div>
				</div>
			) : (
				<>
					<div className="mt-4 flex items-start gap-2 bg-white shadow rounded-lg px-5 py-4">
						<ElemPhoto
							photo={user?.profilePicture || user?.person?.picture}
							wrapClass="aspect-square shrink-0 bg-white overflow-hidden rounded-full w-10"
							imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
							imgAlt={user?.display_name}
							placeholder="user"
							placeholderClass="text-slate-300"
						/>
						<div
							className="w-full cursor-pointer bg-slate-100 rounded-full px-4 py-2 hover:bg-slate-200"
							onClick={onOpenNoteForm}
						>
							Write your note...
						</div>
					</div>

					<div className="mt-4 grid grid-cols-1 gap-4">
						{sortedNotes.map((item) => (
							<ElemNoteCard
								key={item.id}
								data={item}
								refetch={refetch}
								layout="groupAndAuthor"
							/>
						))}
					</div>
					{/* {notes.length > 0 && (
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

										<p className="text-sm text-slate-600">
											Created {moment(item.created_at).format("LL")}
										</p>
									</div>
								</div>
							))}
						</div>
					)} */}
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
