import { Dialog, Transition, Switch } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import { ModalListName } from "@/components/my-list/modal-list-name";
import {
	IconX,
	IconTrash,
	IconCustomList,
	IconChevronDownMini,
} from "@/components/icons";
import { ModalListGroups } from "./modal-list-groups";
import { ElemDeleteConfirmModal } from "../elem-delete-confirm-modal";

type Props = {
	theListName?: string;
	theListDescription?: string;
	theListCreator: string;
	allowEdit?: boolean;
	theListDate?: string;
	theListId: number;
	theListPublic: boolean;
	groups: Array<any>;
	onSaveListName: (name: string) => void;
	onDeleteList: (id: number) => void;
	onAddGroups: (ids: Array<number>) => void;
	onChangePublic: (value: boolean) => void;
};

export const ModalListDetails: FC<Props> = ({
	theListName,
	theListDescription,
	theListCreator,
	theListDate,
	theListId,
	theListPublic,
	groups,
	onSaveListName,
	onDeleteList,
	onAddGroups,
	onChangePublic,
}) => {
	const [listDetailsModal, setListDetailsModal] = useState(false);
	const [listNameModal, setListNameModal] = useState(false);
	const [listDeleteModal, setListDeleteModal] = useState(false);
	const [listGroupsModal, setListGroupsModal] = useState(false);

	const isOpen = () => {
		setListDetailsModal(true);
	};

	const isClosed = () => {
		setListDetailsModal(false);
	};

	return (
		<>
			<button
				onClick={isOpen}
				className="flex items-center rounded-lg px-1 py-0.5 hover:text-primary-500 hover:bg-slate-200"
			>
				<IconCustomList className="w-6 h-6 mr-1" />
				<div className="font-bold text-xl capitalize">{theListName}</div>
				<IconChevronDownMini className="h-5 w-5" />
			</button>
			<Transition appear show={listDetailsModal} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={isClosed}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-lg transform rounded-lg bg-slate-100 shadow-xl transition-all overflow-hidden">
									<div className="flex items-center justify-between px-6 py-2 bg-white border-b border-black/10">
										<h2 className="text-xl font-bold capitalize">
											{theListName}
										</h2>
										<button
											onClick={isClosed}
											type="button"
											className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100"
										>
											<IconX className="h-6 w-6" title="close" />
										</button>
									</div>

									<div className="p-6 flex flex-col gap-y-4">
										<div className="bg-white rounded-lg border border-black/10 divide-y divide-black/10 overflow-hidden">
											<button
												className="flex justify-between w-full p-3 hover:bg-slate-100"
												onClick={() => setListNameModal(true)}
											>
												<div className="text-left">
													<h3 className="font-bold">Name</h3>
													<p className="capitalize">{theListName}</p>
												</div>
												<div className="text-primary-500 text-sm font-bold">
													Edit
												</div>
											</button>

											<button
												className="flex justify-between w-full p-3 hover:bg-slate-100"
												onClick={() => setListGroupsModal(true)}
											>
												<div className="text-left">
													<h3 className="font-bold">Groups</h3>
													{groups.length > 0 ? (
														<div className="flex flex-wrap gap-2 mt-2">
															{groups.map((item: any, index: number) => {
																if (!item) {
																	return;
																}
																return (
																	<p
																		key={index}
																		className="capitalize bg-slate-200 px-2 py-1 rounded-md"
																	>
																		{item?.name}
																	</p>
																);
															})}
														</div>
													) : (
														<p className="text-slate-500">Share with group</p>
													)}
												</div>
												<div className="text-primary-500 text-sm font-bold">
													Edit
												</div>
											</button>

											{theListDescription && (
												<button
													className="flex justify-between w-full p-3 hover:bg-slate-100"
													onClick={isClosed}
												>
													<div className="text-left">
														<h3 className="font-bold">Description</h3>
														<p>
															{theListDescription ? theListDescription : ""}
														</p>
													</div>
													<div className="text-primary-500">Edit</div>
												</button>
											)}

											<div>
												<div className="flex items-center justify-between space-x-1 p-3 cursor-pointer hover:bg-slate-100">
													<p className="font-bold">Public</p>
													<Switch
														checked={theListPublic}
														onChange={onChangePublic}
														className={`${
															theListPublic ? "bg-primary-600" : "bg-gray-200"
														} relative inline-flex h-6 w-11 items-center rounded-full`}
													>
														<span className="sr-only">Set list public</span>
														<span
															className={`${
																theListPublic
																	? "translate-x-6"
																	: "translate-x-1"
															} inline-block h-4 w-4 transform rounded-full bg-white transition`}
														/>
													</Switch>
												</div>
											</div>

											<div className="flex justify-between w-full p-3">
												<div className="text-left">
													<h3 className="font-bold">Created by</h3>
													<p>
														<span className="capitalize">{theListCreator}</span>{" "}
														on {theListDate}
													</p>
												</div>
											</div>
										</div>
										<div className="bg-white rounded-lg border border-black/10 divide-y divide-black/10 overflow-hidden">
											<button
												className="flex justify-between w-full p-3 hover:bg-slate-100"
												onClick={() => {
													setListDetailsModal(false);
													setTimeout(() => {
														setListDeleteModal(true);
													}, 300);
												}}
											>
												<div className="text-left text-rose-500">
													<h3 className="flex items-center font-bold">
														<IconTrash
															className="h-5 w-5 mr-2"
															title="Delete List"
														/>
														Delete List
													</h3>
												</div>
											</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			<ModalListName
				isOpen={listNameModal}
				onCloseModal={() => setListNameModal(false)}
				theListName={theListName ? theListName : ""}
				onSave={onSaveListName}
			/>

			<ElemDeleteConfirmModal
				isOpen={listDeleteModal}
				title="Delete this list?"
				content={
					<div>
						When you delete a list, everything in it will be removed
						immediately.
						<span className="font-bold inline">
							This can&lsquo;t be undone.
						</span>
					</div>
				}
				onClose={() => setListDeleteModal(false)}
				onDelete={() => onDeleteList(theListId)}
			/>

			<ModalListGroups
				isOpen={listGroupsModal}
				onCloseModal={() => setListGroupsModal(false)}
				listGroups={groups}
				onSave={onAddGroups}
			/>
		</>
	);
};
