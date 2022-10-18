import { User } from "@/models/User";
import { getNameFromListName } from "@/utils/reaction";
import { find, kebabCase } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { IconCustomList } from "@/components/Icons";
import { EmojiHot, EmojiLike, EmojiCrap } from "@/components/Emojis";
import { useUser } from "@/context/userContext";

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
	const { listAndFollows: lists } = useUser();

	const getCountForList = (listName: string) => {
		if (lists) {
			const list = find(
				lists,
				(item) => getNameFromListName(item) === listName
			);
			return list?.total_no_of_resources ?? 0;
		}
		return 0;
	};

	const getActiveClass = (id: number, name: string) => {
		return `/lists/${id}/${name}/` === router.asPath
			? "  text-primary-500 bg-slate-200"
			: "";
	};

	const hotId =
		find(lists, (list) => "hot" === getNameFromListName(list))?.id || 0;
	const likeId =
		find(lists, (list) => "like" === getNameFromListName(list))?.id || 0;
	const crapId =
		find(lists, (list) => "crap" === getNameFromListName(list))?.id || 0;
	const getCustomLists = lists?.filter(
		(list) => !["hot", "crap", "like"].includes(getNameFromListName(list))
	);

	return (
		<div className={className}>
			<h3 className="text-xl font-bold">My Lists</h3>
			<ul className="mt-1 space-y-1 text-slate-600">
				<li role="button">
					<Link href={`/lists/${hotId}/hot`}>
						<a
							className={`flex space-x-2 py-1.5 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
								hotId,
								"hot"
							)}`}
						>
							<EmojiHot className="h-6 w-6" />{" "}
							<span>Hot ({getCountForList("hot")})</span>
						</a>
					</Link>
				</li>
				<li role="button">
					<Link href={`/lists/${likeId}/like`}>
						<a
							className={`flex space-x-2 py-1.5 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
								likeId,
								"like"
							)}`}
						>
							<EmojiLike className="h-6 w-6" />
							<span>Like ({getCountForList("like")})</span>
						</a>
					</Link>
				</li>
				<li role="button">
					<Link href={`/lists/${crapId}/sh**`}>
						<a
							className={`flex space-x-2 py-1.5 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
								crapId,
								"sh**"
							)} `}
						>
							<EmojiCrap className="h-6 w-6" />
							<span>Sh** ({getCountForList("crap")})</span>
						</a>
					</Link>
				</li>

				{getCustomLists?.map((list) => (
					<li key={list.id} role="button">
						<Link
							href={`/lists/${list.id}/${kebabCase(getNameFromListName(list))}`}
						>
							<a
								className={`flex space-x-2 py-1.5 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
									list.id,
									kebabCase(getNameFromListName(list))
								)}`}
							>
								<IconCustomList className="h-6 w-6" />
								<span>
									{getNameFromListName(list)} (
									{getCountForList(getNameFromListName(list))})
								</span>
							</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
