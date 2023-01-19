import React, { useState } from "react";
import moment from "moment-timezone";
import toast, { Toaster } from "react-hot-toast";
import { kebabCase } from "lodash";
import { IconCustomList, IconSaveToList } from "@/components/Icons";
import { ElemButton } from "@/components/ElemButton";
import { getNameFromListName } from "@/utils/reaction";
import Link from "next/link";
import {
	Lists,
	List_Members_Bool_Exp,
	User_Groups,
	useGetListMembersQuery,
} from "@/graphql/types";
import { useUser } from "@/context/userContext";
import ElemAddListDialog from "./ElemAddListDialog";
import differenceBy from "lodash/differenceBy";

type Props = {
	group: User_Groups;
	lists: Array<Lists>;
	refetchLists: () => void;
};

export const ElemLists: React.FC<Props> = ({ group, lists, refetchLists }) => {
	const { user, listAndFollows } = useUser();

	const [isOpenAddList, setIsOpenAddList] = useState<boolean>(false);

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

	const customLists = listAndFollows
		?.filter(
			(list) => !["hot", "crap", "like"].includes(getNameFromListName(list))
		)
		.sort((a, b) => (a.name < b.name ? -1 : 1));

	const listOptions = differenceBy(customLists, lists, "id").map((item) => ({
		id: item.id,
		title: getNameFromListName(item),
	}));

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

	const handleAddList = async (listIds: Array<number>) => {
		const response = await fetch("/api/add_list_to_group/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				groupId: group?.id,
				listIds,
			}),
		});

		if (response.status === 200) {
			refetchLists();
			toast.custom(
				(t) => (
					<div
						className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
							t.visible ? "animate-fade-in-up" : "opacity-0"
						}`}
					>
						Lists Added
					</div>
				),
				{
					duration: 3000,
					position: "top-center",
				}
			);
		}
	};

	return (
		<div className="w-full mt-7 p-5 bg-white shadow rounded-lg">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-bold">{`Lists (${lists.length})`}</h2>
				</div>
				<ElemButton btn="primary" onClick={() => setIsOpenAddList(true)}>
					<IconSaveToList className="w-6 h-6 mr-1" />
					<span>Add List</span>
				</ElemButton>
			</div>

			{lists.length > 0 ? (
				<ul className="mt-4 flex flex-col gap-4">
					{lists.map((item) => {
						const isFollowing = listMembers.some(
							(mem) => mem.list_id === item.id
						);
						const listItem = (
							<li
								key={item.id}
								className="flex items-center justify-between space-x-6"
							>
								<Link
									href={`/lists/${item.id}/${kebabCase(
										getNameFromListName(item)
									)}`}
								>
									<a className="flex items-center grow space-x-4 group">
										<IconCustomList className="w-6 h-6 group-hover:text-primary-500" />
										<div>
											<h3 className="font-bold group-hover:text-primary-500">
												{getNameFromListName(item)}
											</h3>

											<p className="text-slate-500 text-sm">
												{`Created by ${item.created_by?.display_name} ${moment(
													item.created_at
												).fromNow()}`}
											</p>
										</div>
									</a>
								</Link>
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
				<p className="text-slate-500 mt-2">No lists found.</p>
			)}

			<ElemAddListDialog
				isOpen={isOpenAddList}
				listOptions={listOptions}
				onCloseModal={() => setIsOpenAddList(false)}
				onSave={handleAddList}
			/>

			<Toaster />
		</div>
	);
};
