import React, { FC, useEffect, useState, Fragment } from "react";
import { GetFollowsByUserQuery } from "@/graphql/types";
import {
	getNameFromListName,
	isOnList,
	toggleFollowOnList,
} from "@/utils/reaction";
import { ElemButton } from "@/components/ElemButton";
import { InputText } from "@/components/InputText";
import { IconX, IconSaveToList } from "@/components/Icons";
import { Dialog, Transition } from "@headlessui/react";
import { InputCheckbox } from "@/components/InputCheckbox";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/context/userContext";
import { find } from "lodash";

type Props = {
	resourceName: string | null;
	resourceId: number;
	resourceType: "companies" | "vc_firms";
	slug: string;
};

type List = GetFollowsByUserQuery["list_members"][0]["list"];

export const ElemSaveToList: FC<Props> = ({
	resourceName,
	resourceId,
	resourceType,
	slug,
}) => {
	let [isOpen, setIsOpen] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [newName, setNewName] = useState<string>("");
	const [listsData, setListsData] = useState([] as List[]);

	const { user, listAndFollows, refreshProfile } = useUser();

	useEffect(() => {
		if (listAndFollows)
			setListsData(() => {
				return (
					listAndFollows.filter((item) => {
						const sentiment = getNameFromListName(item);
						return !["hot", "like", "crap"].includes(sentiment);
					}).sort((a, b) => a.name < b.name ? -1 : 1)
				);
			});
	}, [listAndFollows]);

	const toggleToList = async (listName: string, action: "add" | "remove") => {
		if (listName && user) {
			setListsData((prev) => {
				let newLists = [...prev];
				let list = find(prev, (list) => list.name === listName);
				if (!list) {
					list = {
						__typename: "lists",
						name: listName,
						id: -1,
						created_by_id: user.id,
						follows_companies: [],
						follows_vcfirms: [],
						total_no_of_resources: 0,
					};
					newLists.push(list);
				} else {
					list = { ...list };
				}
				if (action === "add") {
					if (resourceType === "companies") {
						list.follows_companies = [
							...list.follows_companies,
							{ __typename: "follows_companies", resource_id: resourceId },
						];
					}
					if (resourceType === "vc_firms") {
						list.follows_vcfirms = [
							...list.follows_vcfirms,
							{ __typename: "follows_vc_firms", resource_id: resourceId },
						];
					}
				} else {
					if (resourceType === "companies") {
						list.follows_companies = [
							...list.follows_companies.filter(
								(i) => i.resource_id !== resourceId
							),
						];
					}
					if (resourceType === "vc_firms") {
						list.follows_vcfirms = [
							...list.follows_vcfirms.filter(
								(i) => i.resource_id !== resourceId
							),
						];
					}
				}
				return newLists.sort((a, b) => a.name < b.name ? -1 : 1);
			});
			// pass event and reaction name to handleReactionClick function
			const newSentiment = await toggleFollowOnList({
				resourceId,
				resourceType,
				listName,
				pathname: `/companies/${slug}`,
			});
			refreshProfile();
			toast.custom(
				(t) => (
					<div
						className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
							t.visible ? "animate-fade-in-up" : "opacity-0"
						}`}
					>
						{action === "add" ? " Added " : " Removed "}
						{resourceName ? <>&nbsp;&ldquo;{resourceName}&rdquo;&nbsp;</> : ''}
						{action === "add" ? " to " : " from "} 
						&ldquo;{getNameFromListName({ name: listName })}&rdquo; list
					</div>
				),
				{
					duration: 3000,
					position: "top-center",
				}
			);
		}
	};

	const onCreate = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (user) {
			await toggleToList(`${user.id}-${newName}`, "add");
			// hide input
			setShowNew(false);
			setNewName("");
		}
	};

	const isSelected = (list: List) => {
		return isOnList(list, resourceId);
	};

	const onClickHandler = (
		event: React.MouseEvent<HTMLInputElement>,
		list: List,
		isSelected: boolean
	) => {
		event.preventDefault();
		event.stopPropagation();
		toggleToList(list.name, isSelected ? "remove" : "add");
	};

	const onSaveButton = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsOpen(true);
	};

	return (
		<>
			<ElemButton
				onClick={onSaveButton}
				btn="white"
				roundedFull={true}
				className="px-2.5"
			>
				<IconSaveToList className="w-5 h-5 mr-1" />
				Save
			</ElemButton>

			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					onClose={() => {
						setIsOpen(false), setShowNew(false);
					}}
					className="relative z-[60]"
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed z-10 inset-0 bg-black/20 transition-opacity backdrop-blur-sm" />
					</Transition.Child>

					<div className="fixed inset-0 z-[50] my-0 min-h-0 flex flex-col items-center justify-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="max-w-sm w-full mx-auto rounded-lg shadow-2xl my-7 bg-white overflow-x-hidden overflow-y-scroll overscroll-y-none no-scrollbar">
								<div className="flex items-center justify-between px-3 py-1 from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r">
									<h2 className="text-lg font-bold text-white">Save to List</h2>

									<button
										onClick={() => {
											setIsOpen(false), setShowNew(false);
										}}
										type="button"
										className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-black/10 focus:bg-black/20"
									>
										<span className="sr-only">Close</span>
										<IconX className="h-6 w-6 text-white" />
									</button>
								</div>

								<ul className="divide-y divide-slate-100 border-b border-b-slate-100">
									{listsData?.map((list) => {
										const selected = isSelected(list);

										//console.log(list.name + " " + selected);

										return (
											<li key={list.id}>
												<InputCheckbox
													className="w-full hover:bg-slate-100"
													inputClass="ml-3"
													labelClass="grow py-3 pr-3"
													label={getNameFromListName(list)}
													checked={selected}
													//onChange={(e) => {}}
													onClick={(e) => onClickHandler(e, list, selected)}
												/>
											</li>
										);
									})}
								</ul>

								{!showNew && (
									<div>
										<ElemButton
											btn="transparent"
											onClick={() => setShowNew(true)}
											className="py-3 w-full !justify-start"
										>
											<IconSaveToList className="w-6 h-6 mr-1" />
											Create new list
										</ElemButton>
									</div>
								)}

								{showNew && (
									<div className="p-3 ease-in-out duration-300">
										<InputText
											label="Name"
											type="text"
											onChange={(e) => setNewName(e.target.value)}
											value={newName}
											name="name"
											placeholder="Enter List Name..."
										/>
										<div className="flex">
											<ElemButton
												onClick={(e) => onCreate(e)}
												className="mt-3 ml-auto"
												roundedFull
												btn="primary"
											>
												Create
											</ElemButton>
										</div>
									</div>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
					<Toaster />
				</Dialog>
			</Transition.Root>
		</>
	);
};
