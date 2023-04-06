import React from "react";
import { Notes } from "@/graphql/types";
import ElemNoteCard from "./ElemNoteCard";
import Link from "next/link";
import { orderBy } from "lodash";

type Props = {
	notes: Array<Notes>;
};

export const ElemNotes: React.FC<Props> = ({ notes }) => {
	//sort by created date
	const sortedNotes = orderBy(notes, (a) => new Date(a.created_at), ["desc"]);
console.log('@sortedNotes', sortedNotes)
	return (
		<div className="w-full mt-7">
			<h2 className="text-xl font-bold">{`Notes (${notes.length})`}</h2>

			{notes.length === 0 ? (
				<p className="text-slate-500 mt-2">
					Add a note to a{" "}
					<Link href="/companies" passHref>
						<a className="font-bold hover:border-b hover:text-primary-500">
							company
						</a>
					</Link>{" "}
					or{" "}
					<Link href="/investors" passHref>
						<a className="font-bold hover:border-b hover:text-primary-500">
							investor
						</a>
					</Link>{" "}
					profile and share with the group.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
					{sortedNotes.map((item) => (
						<ElemNoteCard key={item.id} data={item} />
					))}
				</div>
			)}
		</div>
	);
};
