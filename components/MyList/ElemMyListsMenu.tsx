import { Lists, useGetListsByUserQuery } from "@/graphql/types";
import { User } from "@/models/User";
import { getName } from "@/utils/reaction";
import { find, kebabCase } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { IconCustomList } from "@/components/Icons";
import { EmojiHot, EmojiLike, EmojiCrap } from "@/components/Emojis";

type Props = {
	className?: string;
	user: User;
	setIsCustom?: Function;
	setSelectedListName?: Function;
	isUpdated?: number;
};

export const ElemMyListsMenu: FC<Props> = ({
	className = "",
	user,
	setIsCustom,
	setSelectedListName,
	isUpdated,
}) => {
	const router = useRouter();
	const [hotId, setHotId] = useState(0);
	const [crapId, setCrapId] = useState(0);
	const [likeId, setLikeId] = useState(0);
	const [userLists, setUserLists] = useState<Lists[]>();

	const { data: lists, refetch } = useGetListsByUserQuery({
		current_user: user?.id ?? 0,
	});

	useEffect(() => {
		if (isUpdated) refetch();
	}, [isUpdated, refetch]);

	useEffect(() => {
		if (lists) {
			setUserLists(lists.lists as Lists[]);
			setHotId(
				() =>
					find(lists.lists, (list) => getName(list as Lists) === "hot")?.id ?? 0
			);
			setLikeId(
				() =>
					find(lists.lists, (list) => getName(list as Lists) === "like")?.id ??
					0
			);
			setCrapId(
				() =>
					find(lists.lists, (list) => getName(list as Lists) === "crap")?.id ??
					0
			);

			const list = find(lists.lists, {
				id: parseInt((router.query.listId as string) || "0"),
			});

			if (setIsCustom)
				setIsCustom(() => {
					return list
						? !["hot", "like", "crap"].includes(getName(list as Lists))
						: false;
				});

			if (setSelectedListName)
				setSelectedListName(() => {
					return list ? getName(list as Lists) : "";
				});
		}
	}, [lists, router.query.listId, setIsCustom, setSelectedListName]);

	const getCountForList = (listName: string) => {
		if (userLists) {
			const list = find(userLists, (item) => getName(item) === listName);
			return list?.total_no_of_resources ?? 0;
		}
		return 0;
	};

	const getActiveClass = (id: number) => {
		return `/lists/${id}/` === router.asPath ? "  text-primary-500" : "";
	};

	const renderMyCustomList = () => {
		return userLists
			?.filter((list) => !["hot", "crap", "like"].includes(getName(list)))
			.map((list) => (
				<li
					key={list.id}
					className={`${getActiveClass(list.id)}`}
					role="button"
				>
					<Link href={`/lists/${list.id}/${kebabCase(getName(list))}`}>
						<a
							className={`flex space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
								list.id
							)}`}
						>
							<IconCustomList className="h-6 w-6" />
							<span>
								{getName(list)} ({getCountForList(getName(list))})
							</span>
						</a>
					</Link>
				</li>
			));
	};

	return (
		<div className={className}>
			<h3 className="text-xl font-bold">My Lists</h3>
			<ul className="mt-1 space-y-2 text-slate-600">
				<li className={`${getActiveClass(hotId)}`} role="button">
					<Link href={`/lists/${hotId}/hot`}>
						<a className="flex space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
							<EmojiHot className="h-6 w-6" />{" "}
							<span>Hot ({getCountForList("hot")})</span>
						</a>
					</Link>
				</li>
				<li className={`${getActiveClass(likeId)}`} role="button">
					<Link href={`/lists/${likeId}/like`}>
						<a className="flex space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
							<EmojiLike className="h-6 w-6" />
							<span>Like ({getCountForList("like")})</span>
						</a>
					</Link>
				</li>
				<li className={`${getActiveClass(crapId)}`} role="button">
					<Link href={`/lists/${crapId}/crap`}>
						<a className="flex space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
							<EmojiCrap className="h-6 w-6" />
							<span>Crap ({getCountForList("crap")})</span>
						</a>
					</Link>
				</li>
				{renderMyCustomList()}
			</ul>
		</div>
	);
};
