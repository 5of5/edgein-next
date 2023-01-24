import React from "react";
import moment from "moment-timezone";
import { IconCustomList, IconSaveToList } from "@/components/Icons";
import { ElemButton } from "@/components/ElemButton";
import { getNameFromListName } from "@/utils/reaction";
import {
	Lists,
	List_Members_Bool_Exp,
	useGetListMembersQuery,
} from "@/graphql/types";
import { useUser } from "@/context/userContext";

type Props = {
	lists: Array<Lists>;
};

export const ElemLists: React.FC<Props> = ({ lists }) => {
	const { user } = useUser();
	const { data, refetch } = useGetListMembersQuery(
		{
			where: {
				user_id: { _eq: user?.id },
			} as List_Members_Bool_Exp,
		},
		{
			enabled: Boolean(user?.id),
		}
	);
	const listMembers = data?.list_members || [];

	const handleToggleFollow = async (listId: number) => {
		const response = await fetch("/api/toggle_follow_list/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				listId,
				userId: user?.id,
			}),
		});

		if (response.status === 200) {
			refetch();
		}
	};

	return (
		<div className="w-full mt-7 p-5 bg-white shadow rounded-lg">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-bold">{`Lists (${lists.length})`}</h2>
				</div>
				{/* To do: add user list button */}
				{/* <ElemButton btn="slate" onClick={() => {}}>
					<IconSaveToList className="w-6 h-6 mr-1" />
					<span>Add List</span>
				</ElemButton> */}
			</div>

			{lists.length > 0 ? (
				<ul className="mt-4 flex flex-col gap-4">
					{lists.map((item) => {
						const isFollowing = listMembers.some(
							(mem) => mem.list_id === item.id
						);
						const listItem = (
							<li key={item.id} className="flex items-center justify-between">
								<div className="flex items-center gap-x-4">
									<IconCustomList className="w-6 h-6" />
									<div>
										<p className="font-bold">{getNameFromListName(item)}</p>
										<p className="text-slate-500 text-sm">
											{`Created by ${item.created_by?.display_name} ${moment(
												item.created_at
											).fromNow()}`}
										</p>
									</div>
								</div>
								<ElemButton
									btn={isFollowing ? "white" : "slate"}
									className={`${
										isFollowing
											? "group hover:bg-red-100 hover:text-red-500 hover:ring-red-500"
											: ""
									}`}
									onClick={() => handleToggleFollow(item.id)}
								>
									{isFollowing ? (
										<>
											<span className="opacity-100 transition-all group-hover:opacity-0 group-hover:hidden">
												Following
											</span>
											<span className="opacity-0 transition-all hidden group-hover:opacity-100 group-hover:inline">
												Unfollow
											</span>
										</>
									) : (
										<span>Follow</span>
									)}
								</ElemButton>
							</li>
						);
						return listItem;
					})}
				</ul>
			) : (
				<p className="text-slate-500 mt-2">
					Share any of your lists with the group.
				</p>
			)}
		</div>
	);
};
