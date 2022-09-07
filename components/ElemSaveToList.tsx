import React, { FC, useEffect } from "react";
import { useState, Fragment } from "react";
import { Lists, useGetListsByUserQuery } from "@/graphql/types";
import { findIndex } from "lodash";
import { getName } from "@/utils/reaction";
import { useAuth } from "@/hooks/useAuth";
import { ElemButton } from "@/components/ElemButton";
import { IconX, IconSaveToList } from "@/components/Icons";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
	follows: any;
	onCreateNew: (
		reaction: string,
		alreadyReacted: boolean
	) => (e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>) => void;
};

export const ElemSaveToList: FC<Props> = ({ follows, onCreateNew }) => {
	const { user } = useAuth();

	let [isOpen, setIsOpen] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [newName, setNewName] = useState<string>("");
	const [listsData, setListsData] = useState([] as Lists[]);

	const { data: lists } = useGetListsByUserQuery({
		current_user: user?.id ?? 0,
	});

	useEffect(() => {
		if (lists)
			setListsData(() => {
				return lists?.lists?.filter((item) => {
					const fragments = item.name.split("-");
					const sentiment = fragments[fragments.length - 1];
					return !["hot", "like", "crap"].includes(sentiment);
				}) as Lists[];
			});
	}, [lists]);

	const isSelected = (list: any) => {
		const name = getName(list);
		// check and return index if the company or investor is added to list already
		return (
			findIndex(follows, (item: any) => {
				return getName(item.list) === name;
			}) !== -1
		);
	};

	const onCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (newName) {
			// pass event and reaction name to handleReactionClick function
			onCreateNew(newName, false)(event);
			// push sentiment to list
			setListsData((prev: Lists[]) => {
				return [...prev, { name: `sentiment-${user.id}-${newName}` } as Lists];
			});
			// hide input
			setShowNew(false);
			setNewName("");
		}
	};

	const onClickHandler = (
		event: React.MouseEvent<HTMLInputElement>,
		list: Lists
	) => {
		// TODO: handle uncheck
		onCreateNew(getName(list), isSelected(list))(event);
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
				roundedFull={true}
				className="border border-black/10 hover:bg-slate-100 px-2"
			>
				<IconSaveToList className="w-5 h-5 mr-1" />
				Save
			</ElemButton>

			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					onClose={() => setIsOpen(false)}
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
							<Dialog.Panel className="max-w-sm w-full mx-auto rounded-lg shadow-2xl my-7 bg-white overflow-x-hidden overflow-y-scroll overscroll-y-none">
								<div className="flex items-center justify-between px-3 py-1 from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r">
									<h2 className="text-lg font-bold text-white">Save to List</h2>

									<button
										onClick={() => setIsOpen(false)}
										type="button"
										className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-black/10 focus:bg-black/20"
									>
										<span className="sr-only">Close</span>
										<IconX className="h-6 w-6 text-white" />
									</button>
								</div>

								<ul className="divide-y divide-slate-100">
									{listsData?.map((item, index: number) => {
										return (
											<li key={index}>
												<label className="flex items-center p-3 w-full hover:bg-slate-100">
													<input
														type="checkbox"
														checked={isSelected(item)}
														onClick={(e) => onClickHandler(e, item)}
														onChange={(e) => {}}
														className="accent-primary-500 border border-slate-100 rounded"
													></input>
													<h1 className="ml-2">{getName(item)}</h1>
												</label>
											</li>
										);
									})}
								</ul>

								{!showNew && (
									<div>
										<button
											onClick={() => setShowNew(true)}
											className="flex items-center justify-center p-3"
										>
											<IconSaveToList className="w-7 h-7 mr-1" />
											Create new list
										</button>
									</div>
								)}

								{showNew && (
									<div className="p-3 ease-in-out duration-300">
										<label className="block font-bold ">Name</label>
										<input
											onChange={(e) => setNewName(e.target.value)}
											className="pl-4 mt-1 h-10 w-full relative bg-white rounded-md border border-black/10 outline-none placeholder:text-slate-400 focus:bg-white focus:outline-none`"
											type="text"
											placeholder="Enter List Name..."
											value={newName}
										></input>
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
				</Dialog>
			</Transition.Root>
		</>
	);
};
