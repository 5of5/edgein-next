import React from "react";
import { Notes } from "@/graphql/types";
import ElemNoteCard from "./ElemNoteCard";

type Props = {
	notes: Array<Notes>;
};

export const ElemNotes: React.FC<Props> = ({ notes }) => {
	return (
		<div className="w-full mt-7 p-5 bg-white shadow rounded-lg">
			<h2 className="text-xl font-bold">{`Notes (${notes.length})`}</h2>

			{notes.length === 0 ? (
				<p className="text-slate-500 mt-2">No notes found.</p>
			) : (
				<div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 lg:grid-cols-3">
					{notes.map((item) => (
						<ElemNoteCard key={item.id} data={item} />
					))}
				</div>
			)}
		</div>
	);
};
