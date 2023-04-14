import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { useGetNotesQuery, Notes_Bool_Exp } from "@/graphql/types";
import { GetStaticProps } from "next";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import ElemNoteCard from "@/components/Group/ElemNoteCard";

type Props = {
	dropdown: any[];
};

const Notes: FC<Props> = ({ dropdown }) => {
	const { user } = useAuth();

	const {
		data: notes,
		error,
		isLoading,
		refetch: refetchNotes,
	} = useGetNotesQuery({
		where: {
			created_by: { _eq: user?.id },
		} as Notes_Bool_Exp,
	});

	return (
		<DashboardLayout>
			<div className="w-full mb-2">
				<h1 className="h-6 mr-2 font-bold text-xl capitalize">My Notes</h1>
			</div>

			<div className="flex flex-col gap-y-4 max-w-2xl">
				{notes?.notes.map((note) => {
					return (
						<div key={note.id}>
							<ElemNoteCard data={note} refetch={refetchNotes} />
						</div>
					);
				})}
			</div>
			{/* </div> */}
		</DashboardLayout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};

export default Notes;
