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
			<h2 className="text-lg font-bold pb-1">{`Notes (${props.notes.length})`}</h2>

			{props.notes.length === 0 ? (
				<div className="bg-white shadow rounded-lg px-5 py-4">
					<p>Looks like there are no notes in this group yet.</p>
					<ul className="mt-2 list-disc list-inside space-y-1">
						<li>
							Visit a{" "}
							<Link href="/companies" passHref>
								<a className="text-primary-500 hover:underline">company</a>
							</Link>{" "}
							profile, create a note, and add to group.
						</li>
						<li>
							Visit an{" "}
							<Link href="/investors" passHref>
								<a className="text-primary-500 hover:underline">investor</a>
							</Link>{" "}
							profile, create a note, and add to group.
						</li>
					</ul>
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
