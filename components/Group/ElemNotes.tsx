import React from "react";
import { GetNotesQuery } from "@/graphql/types";
import ElemNoteCard from "./ElemNoteCard";
import Link from "next/link";
import { orderBy } from "lodash";

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
			<h2 className="text-xl font-bold py-2">{`Notes (${props.notes.length})`}</h2>

			{props.notes.length === 0 ? (
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
				<div className="flex flex-col gap-y-4">
					{sortedNotes.map((item) => (
						<ElemNoteCard key={item.id} data={item} refetch={props.refetchNotes} />
					))}
				</div>
			)}
		</div>
	);
};
