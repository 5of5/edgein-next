import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useGetNotesQuery, Notes_Bool_Exp } from "@/graphql/types";
import { GetStaticProps } from "next";
import { FC } from "react";
import { IconDocumentDownload } from "@/components/icons";
import ElemNoteCard from "@/components/group/elem-note-card";
import { PlaceholderNote } from "@/components/placeholders";
import { orderBy } from "lodash";
//import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/context/user-context";

type Props = {};

const Notes: FC<Props> = () => {
	const { user, myGroups } = useUser();

	const {
		data: noteList,
		error,
		isLoading,
		refetch: refetchNotes,
	} = useGetNotesQuery({
		where: {
			created_by: { _eq: user?.id },
			_or: [
				{
					_or: [
						{
							_and: [
								{ audience: { _eq: "public" } },
								{ created_by: { _eq: user?.id } },
							],
						},
					],
				},
				{ _or: [{ user_group_id: { _in: myGroups.map((item) => item.id) } }] },
				{
					_or: [
						{
							_and: [
								{ audience: { _eq: "only_me" } },
								{ created_by: { _eq: user?.id } },
							],
						},
					],
				},
			],
		} as Notes_Bool_Exp,
	});

	const notes = noteList?.notes || [];

	//sort by created date
	const sortedNotes = orderBy(notes, (a) => new Date(a.created_at), ["desc"]);

	return (
		<DashboardLayout>
			<div className="pb-20">
				<div className="w-full mb-2">
					<h1 className="h-6 mr-2 font-bold text-xl capitalize">My Notes</h1>
				</div>

				{error ? (
					<h4>Error loading notes</h4>
				) : isLoading ? (
					<div className="flex flex-col gap-y-4 mt-4">
						{Array.from({ length: 2 }, (_, i) => (
							<div key={i} className="max-w-2xl bg-white shadow rounded-lg">
								<PlaceholderNote />
							</div>
						))}
					</div>
				) : notes.length === 0 ? (
					<div className="max-w-2xl bg-white shadow rounded-lg px-5 py-4">
						<div className="w-full p-12 text-center">
							<IconDocumentDownload
								className="mx-auto h-12 w-12 text-slate-300"
								title="notes"
							/>
							<h3 className="mt-2 text-lg font-bold">No notes yet</h3>
							<p className="mt-1 text-slate-600">
								Get started by creating a note in a company or investor profile.
							</p>
						</div>
					</div>
				) : (
					<div className="flex flex-col gap-y-4 max-w-2xl">
						{sortedNotes.map((item) => (
							<ElemNoteCard
								key={item.id}
								data={item}
								refetch={refetchNotes}
								layout={`${
									item.user_group_id
										? "groupAndAuthor"
										: "organizationAndAuthor"
								}`}
							/>
						))}
					</div>
				)}
			</div>
		</DashboardLayout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};

export default Notes;
