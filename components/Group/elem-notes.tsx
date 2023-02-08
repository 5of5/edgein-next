import React from "react";
import { Notes } from "@/graphql/types";
import ElemNoteCard from "./elem-note-card";
import Link from "next/link";

type Props = {
	notes: Array<Notes>;
};

export const ElemNotes: React.FC<Props> = ({ notes }) => {
	return (
		<div className="w-full mt-7 p-5 bg-white shadow rounded-lg">
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
				<div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 lg:grid-cols-3">
					{notes.map((item) => (
						<ElemNoteCard key={item.id} data={item} />
					))}
				</div>
			)}
		</div>
	);
};
