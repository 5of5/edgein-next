import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { useGetNotesQuery, Notes_Bool_Exp } from "@/graphql/types";
import { GetStaticProps } from "next";
import { FC } from "react";
import Link from "next/link";
import ElemNoteCard from "@/components/Group/ElemNoteCard";
import { orderBy } from "lodash";
//import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/context/userContext";

type Props = {
	dropdown: any[];
};

const Notes: FC<Props> = ({ dropdown }) => {
	//const { user, myGroups } = useAuth();
	const { user, myGroups } = useUser();

	const {
		data: notes,
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

	const theNotes = notes?.notes || [];

	//sort by created date
	const sortedNotes = orderBy(theNotes, (a) => new Date(a.created_at), [
		"desc",
	]);

	return (
		<DashboardLayout>
			<div className="pb-20">
				<div className="w-full mb-2">
					<h1 className="h-6 mr-2 font-bold text-xl capitalize">My Notes</h1>
				</div>

				{sortedNotes.length === 0 ? (
					<div className="bg-white shadow rounded-lg px-5 py-4 max-w-2xl">
						<p>Looks like you haven&rsquo;t created any notes.</p>
						<ul className="mt-2 list-disc list-inside space-y-1">
							<li>
								Visit a{" "}
								<Link href="/companies" passHref>
									<a className="text-primary-500 hover:underline">company</a>
								</Link>{" "}
								profile and create a note about company.
							</li>
							<li>
								Visit an{" "}
								<Link href="/investors" passHref>
									<a className="text-primary-500 hover:underline">investor</a>
								</Link>{" "}
								profile and create a note about investor.
							</li>
						</ul>
					</div>
				) : (
					<div className="flex flex-col gap-y-4 max-w-2xl">
						{sortedNotes.map((item) => (
							<ElemNoteCard
                key={item.id}
                data={item}
                refetch={refetchNotes}
                layout={`${item.user_group_id ? "groupAndAuthor" : "author"}`}
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
