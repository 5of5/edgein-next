import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { IconGroup, IconX } from "@/components/icons";
import { User_Groups } from "@/graphql/types";
import ElemSettingTab from "./ElemSettingTab";
import ElemMemberTab from "./ElemMemberTab";
import ElemPendingInvitesTab from "./ElemPendingInvitesTab";

export type SettingTabProps = "settings" | "members" | "pending_invites";

type Props = {
	isOpen: boolean;
	selectedTab?: SettingTabProps;
	group: User_Groups;
	onClose: () => void;
	onUpdateGroupData: (data: any) => void;
	onInvite: () => void;
};

const ElemSettingDialog: React.FC<Props> = ({
	isOpen,
	selectedTab,
	group,
	onClose,
	onUpdateGroupData,
	onInvite,
}) => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	useEffect(() => {
		setSelectedIndex(selectedTab === "members" ? 1 : 0);
	}, [selectedTab]);

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-40" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-xl transform rounded-lg bg-slate-100 text-left align-middle shadow-xl transition-all">
								<Dialog.Title className="flex items-center justify-between px-6 pt-6 pb-2 rounded-t-2xl bg-white">
									<div className="flex items-center justify-between gap-x-1">
										<IconGroup className="w-6 h-6" />
										<div className="text-xl font-bold capitalize">
											{group.name}
										</div>
									</div>
									<button type="button" onClick={onClose}>
										<IconX className="h-6 w-6" />
									</button>
								</Dialog.Title>
								<Tab.Group
									selectedIndex={selectedIndex}
									onChange={setSelectedIndex}
								>
									<Tab.List className="whitespace-nowrap flex gap-x-4 px-6 font-semibold bg-white border-b border-black/10 transition-all">
										<Tab
											className={({ selected }) =>
												selected
													? "text-primary-500 border-b-2 border-primary-500 outline-none"
													: ""
											}
										>
											Settings
										</Tab>
										<Tab
											className={({ selected }) =>
												selected
													? "text-primary-500 border-b-2 border-primary-500 outline-none"
													: ""
											}
										>
											Members
										</Tab>
										<Tab
											className={({ selected }) =>
												selected
													? "text-primary-500 border-b-2 border-primary-500 outline-none"
													: ""
											}
										>
											Pending Invites
										</Tab>
									</Tab.List>
									<Tab.Panels>
										<div className="p-6">
											<Tab.Panel>
												<ElemSettingTab
													group={group}
													onUpdateGroupData={onUpdateGroupData}
												/>
											</Tab.Panel>
											<Tab.Panel>
												<ElemMemberTab
													group={group}
													onUpdateGroupData={onUpdateGroupData}
													onInvite={onInvite}
												/>
											</Tab.Panel>
											<Tab.Panel>
												<ElemPendingInvitesTab
													group={group}
													onUpdateGroupData={onUpdateGroupData}
												/>
											</Tab.Panel>
										</div>
									</Tab.Panels>
								</Tab.Group>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ElemSettingDialog;
