import { getNameFromListName } from "@/utils/reaction";
import { find, kebabCase, partition, orderBy } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, Fragment, useState } from "react";
import {
	IconCustomList,
	IconPolygonDown,
	IconListPlus,
	IconInformationCircle,
	IconPlus,
	IconContributor,
	IconEllipsisHorizontal,
	IconCheck,
} from "@/components/icons";
import { EmojiHot, EmojiLike, EmojiCrap } from "@/components/emojis";
import { useUser } from "@/context/user-context";
import { ElemTooltip } from "@/components/elem-tooltip";
import { ElemUpgradeDialog } from "../elem-upgrade-dialog";
import { CreateListDialog } from "../my-list/create-list-dialog";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import useDisclosureState from "@/hooks/useDisclosureState";
import { listsSortOptions, MY_LISTS_MENU_OPEN_KEY } from "@/utils/constants";

type Props = {
	className?: string;
};

const ElemMyListsMenu: FC<Props> = ({ className = "" }) => {
	const router = useRouter();
	const { listAndFollows: lists, user } = useUser();

	const userCanSortLists = user?.entitlements.viewEmails
		? user?.entitlements.viewEmails
		: false;

	const { btnRef, isDefaultOpen, onDisclosureButtonClick } = useDisclosureState(
		MY_LISTS_MENU_OPEN_KEY
	);

	const [selectedSortOption, setSelectedSortOption] = useState(
		typeof window !== "undefined" && localStorage.getItem("myListsSortOption")
			? localStorage.getItem("myListsSortOption")
			: "default"
	);

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
	//.sort((a, b) => (a.name < b.name ? -1 : 1));

	const displayedCustomLists = getCustomLists.slice(
		0,
		user?.entitlements.listsCount
			? user?.entitlements.listsCount
			: getCustomLists.length
	);

	let sortedLists = [...displayedCustomLists];
	if (selectedSortOption === "default") {
		const partLists = partition(
			displayedCustomLists,
			(o) => o.created_by_id === user?.id
		);
		const createdLists = orderBy(
			partLists[0],
			[(o) => getNameFromListName(o)],
			["asc"]
		);
		const followedLists = orderBy(
			partLists[1],
			[(o) => getNameFromListName(o)],
			["asc"]
		);
		sortedLists = [...createdLists, ...followedLists];
	} else if (selectedSortOption === "newest") {
		sortedLists = orderBy(
			displayedCustomLists,
			[(o) => new Date(o.created_at)],
			["desc"]
		);
	} else if (selectedSortOption === "recently") {
		sortedLists = orderBy(
			displayedCustomLists,
			[(o) => new Date(o.updated_at)],
			["desc"]
		);
	}

	const [isOpenCreateListDialog, setIsOpenCreateGroupDialog] = useState(false);
	const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

	const onOpenCreateListDialog = () => {
		setIsOpenCreateGroupDialog(true);
	};
	const onCloseCreateListDialog = () => {
		setIsOpenCreateGroupDialog(false);
	};

	const onOpenUpgradeDialog = () => {
		setIsOpenUpgradeDialog(true);
	};
	const onCloseUpgradeDialog = () => {
		setIsOpenUpgradeDialog(false);
	};

	return (
		<div className={className}>
			<Disclosure defaultOpen={isDefaultOpen}>
				{({ open }) => (
					<>
						<div className="w-full flex items-center justify-between">
							<div className="flex items-center">
								<Disclosure.Button
									className="flex focus:outline-none hover:opacity-75"
									data-expanded={open}
									ref={btnRef}
									onClick={onDisclosureButtonClick}
								>
									<IconPolygonDown
										className={`${
											open ? "rotate-0" : "-rotate-90 "
										} h-6 w-6 transform transition-all`}
									/>
									<span className="text-lg font-bold">My Lists</span>
								</Disclosure.Button>
								<ElemTooltip
									content="Monitor organizations and people of your interest."
									className="ml-1"
								>
									<IconInformationCircle className="h-5 w-5 text-slate-600" />
								</ElemTooltip>
							</div>
							<div className="flex items-start gap-x-2">
								<Popover className="relative">
									<Popover.Button className="rounded-md flex items-center justify-center w-7 aspect-square text-primary-500 transition-all hover:bg-slate-200">
										<IconEllipsisHorizontal
											className="h-6 w-6 group-hover:text-primary-500"
											title="Sort"
										/>
									</Popover.Button>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-200"
										enterFrom="opacity-0 translate-y-1"
										enterTo="opacity-100 translate-y-0"
										leave="transition ease-in duration-150"
										leaveFrom="opacity-100 translate-y-0"
										leaveTo="opacity-0 translate-y-1"
									>
										<Popover.Panel className="absolute right-0 w-52 block bg-white rounded-lg shadow-md p-1">
											{({ close }) => (
												<div>
													{listsSortOptions.map((opt) => (
														<button
															key={opt.value}
															className={`flex items-center justify-between gap-x-1 cursor-pointer w-full
																text-left text-sm p-2 m-0 transition-all hover:bg-slate-100
																${opt.value === selectedSortOption ? "text-primary-600 font-medium" : ""}
																`}
															onClick={
																!userCanSortLists
																	? onOpenUpgradeDialog
																	: () => {
																			setSelectedSortOption(opt.value);
																			close();
																			if (typeof window !== undefined) {
																				localStorage.setItem(
																					"myListsSortOption",
																					opt.value
																				);
																			}
																	  }
															}
														>
															{opt.label}
															{opt.value === selectedSortOption && (
																<IconCheck className="w-4 h-4" />
															)}
														</button>
													))}
												</div>
											)}
										</Popover.Panel>
									</Transition>
								</Popover>
								<div className="flex gap-x-1">
									{getCustomLists.length > sortedLists.length ? (
										<button
											onClick={onOpenUpgradeDialog}
											className="cursor-pointer rounded-md flex items-center justify-center w-7 aspect-square text-primary-500 transition-all hover:bg-slate-200"
										>
											<IconPlus
												className="h-5 w-5"
												title="Unlock All Your Lists"
											/>
										</button>
									) : (
										<button
											onClick={onOpenCreateListDialog}
											className="cursor-pointer rounded-md flex items-center justify-center w-7 aspect-square text-primary-500 transition-all hover:bg-slate-200"
										>
											<IconPlus className="h-5 w-5" title="Create List" />
										</button>
									)}
								</div>
							</div>
						</div>

						<Disclosure.Panel as="ul" className="mt-1 space-y-1 text-slate-600">
							<li role="button">
								<Link href={`/lists/${hotId}/hot`}>
									<a
										className={`flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
											hotId,
											"hot"
										)}`}
									>
										<EmojiHot className="h-6 w-6" />
										<span className="flex-1">Hot</span>
										<div className="bg-slate-200 inline-block rounded-full font-medium py-0.5 px-2 text-xs">
											{getCountForList("hot")}
										</div>
									</a>
								</Link>
							</li>
							<li role="button">
								<Link href={`/lists/${likeId}/like`}>
									<a
										className={`flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
											likeId,
											"like"
										)}`}
									>
										<EmojiLike className="h-6 w-6" />
										<span className="flex-1">Like</span>
										<div className="bg-slate-200 inline-block rounded-full font-medium py-0.5 px-2 text-xs">
											{getCountForList("like")}
										</div>
									</a>
								</Link>
							</li>
							<li role="button">
								<Link href={`/lists/${crapId}/sh**`}>
									<a
										className={`flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
											crapId,
											"sh**"
										)} `}
									>
										<EmojiCrap className="h-6 w-6" />
										<span className="flex-1">Sh**</span>
										<div className="bg-slate-200 inline-block rounded-full font-medium py-0.5 px-2 text-xs">
											{getCountForList("crap")}
										</div>
									</a>
								</Link>
							</li>

							{sortedLists?.map((list) => (
								<li key={list.id} role="button">
									<Link
										href={`/lists/${list.id}/${kebabCase(
											getNameFromListName(list)
										)}`}
									>
										<a
											className={`flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
												list.id,
												kebabCase(getNameFromListName(list))
											)}`}
											title={getNameFromListName(list)}
										>
											<IconCustomList className="h-6 w-6 shrink-0" />
											<span className="line-clamp-1 break-all flex-1">
												{getNameFromListName(list)}
											</span>
											<div className="bg-slate-200 inline-block rounded-full font-medium py-0.5 px-2 text-xs">
												{list.total_no_of_resources}
											</div>
										</a>
									</Link>
								</li>
							))}

							{getCustomLists.length > sortedLists.length ? (
								<li role="button">
									<button
										onClick={onOpenUpgradeDialog}
										className="w-full flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all text-primary-500 hover:bg-slate-200 hover:text-primary-500"
									>
										<IconContributor
											className="inline-block w-6 h-6 p-0.5 text-primary-500 shrink-0"
											title="Unlock lists"
										/>
										{/* <IconListPlus className="h-6 w-6" title="Create List" /> */}
										<span>Unlock All Your Lists</span>
									</button>
								</li>
							) : (
								<li role="button">
									<button
										onClick={onOpenCreateListDialog}
										className="w-full flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all text-primary-500 hover:bg-slate-200 hover:text-primary-500"
									>
										<IconListPlus className="h-6 w-6" title="Create List" />
										<span>Create List</span>
									</button>
								</li>
							)}
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>

			<CreateListDialog
				isOpen={isOpenCreateListDialog}
				onClose={onCloseCreateListDialog}
			/>

			<ElemUpgradeDialog
				isOpen={isOpenUpgradeDialog}
				onClose={onCloseUpgradeDialog}
			/>
		</div>
	);
};

export default ElemMyListsMenu;
