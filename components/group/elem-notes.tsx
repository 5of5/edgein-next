import React from "react";
import { GetNotesQuery } from "@/graphql/types";
import { IconDocumentDownload } from "@/components/icons";
import { orderBy } from "lodash";
import ElemNoteCard from "./elem-note-card";

type Props = {
	className?: string;
	notes: GetNotesQuery["notes"];
	refetchNotes: () => void;
};

export const ElemNotes: React.FC<Props> = (props) => {
	//sort by created date
	const sortedNotes = orderBy(props.notes, (a) => new Date(a.created_at), [
		"desc",
	]);

	return (
		<div className={`${props.className}`}>
			<h2 className="text-lg font-bold pb-1">{`Notes (${props.notes.length})`}</h2>

			{props.notes.length === 0 ? (
				<div className="bg-white shadow rounded-lg w-full p-12 text-center">
					<IconDocumentDownload
						className="mx-auto h-12 w-12 text-slate-300"
						title="Notes"
					/>
					<h3 className="mt-2 text-lg font-bold">
						No notes have been added to group yet
					</h3>

					<p className="mt-1 text-slate-600">
						Create a note in a company or investor profile and select group as
						audience.
					</p>
				</div>
			) : (
				<div className="flex flex-col gap-y-4">
					{sortedNotes.map((item) => (
						<ElemNoteCard
							key={item.id}
							data={item}
							refetch={props.refetchNotes}
						/>
					))}
				</div>
			)}
		</div>
	);
};