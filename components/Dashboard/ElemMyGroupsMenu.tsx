import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	IconGroup,
	IconGroupPlus,
	IconPlus,
	IconPolygonDown,
	IconInformationCircle,
} from "@/components/Icons";
import { Disclosure } from "@headlessui/react";
import { useUser } from "@/context/userContext";
import ElemCreateGroupDialog from "../Group/ElemCreateGroupDialog";
import { ElemUpgradeDialog } from "../ElemUpgradeDialog";
import { ElemTooltip } from "../ElemTooltip";

type Props = {
	className?: string;
};

const ElemMyGroupsMenu: FC<Props> = ({ className = "" }) => {
	const router = useRouter();
	const { myGroups, user } = useUser();
	const displayedGroups = myGroups.slice(0, user?.entitlements.groupsCount ? user?.entitlements.groupsCount : myGroups.length)

	const [isOpenCreateGroupDialog, setIsOpenCreateGroupDialog] = useState(false);

	const getActiveClass = (id: number) => {
		return `/groups/${id}/` === router.asPath
			? "  text-primary-500 bg-slate-200"
			: "";
	};

	const onOpenCreateGroupDialog = () => {
		setIsOpenCreateGroupDialog(true);
	};

	const onCloseCreateGroupDialog = () => {
		setIsOpenCreateGroupDialog(false);
	};

	const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

	const onOpenUpgradeDialog = () => {
		setIsOpenUpgradeDialog(true);
	}
	const onCloseUpgradeDialog = () => {
		setIsOpenUpgradeDialog(false);
	};

	return (
		<div className={className}>
			<Disclosure defaultOpen={true}>
				{({ open }) => (
					<>
						<div className="w-full flex items-center justify-between group">
							<div className="flex items-center">
								<Disclosure.Button className="flex focus:outline-none hover:opacity-75">
									<IconPolygonDown
										className={`${
											open ? "rotate-0" : "-rotate-90 "
										} h-6 w-6 transform transition-all`}
									/>
									<span className="text-xl font-bold">Groups</span>
								</Disclosure.Button>
								<ElemTooltip
									content="Share your lists and notes with others."
									className="ml-1"
								>
									<IconInformationCircle className="h-5 w-5 text-primary-500" />
								</ElemTooltip>
							</div>
							<div className="flex gap-x-1 transition-all opacity-0 group-hover:opacity-100">
								{/*** TO DO: sort group */}
								{/* {myGroups.length > 0 && (
									<Popover className="relative">
										<Popover.Button className="rounded-md h-full px-1 m-0 hover:bg-slate-200">
											<IconEllipsisHorizontal
												className="h-6 w-6 group-hover:text-primary-500"
												title="Options"
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
											<Popover.Panel className="absolute right-0 bg-white w-48 rounded-md shadow-md py-2">
												<button
													onClick={() => {}}
													className="cursor-pointer text-left w-full p-2 m-0 transition-all hover:bg-slate-100"
												>
													Sort Alphabetically
												</button>
												<button
													onClick={() => {}}
													className="cursor-pointer text-left w-full p-2 m-0 transition-all hover:bg-slate-100"
												>
													Sort by Recent Activity
												</button>
											</Popover.Panel>
										</Transition>
									</Popover>
								)} */}
								<button
									onClick={onOpenCreateGroupDialog}
									className="cursor-pointer rounded-md group px-1 m-0 transition-all hover:text-primary-500 hover:bg-slate-200"
								>
									<IconPlus className="h-5 w-5" title="Create Group" />
								</button>
							</div>
						</div>

						<Disclosure.Panel as="ul" className="mt-1 space-y-1 text-slate-600">
							{displayedGroups?.map((group) => (
								<li key={group.id} role="button">
									<Link href={`/groups/${group.id}/`}>
										<a
											className={`flex space-x-2 py-1.5 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500 ${getActiveClass(
												group.id
											)}`}
										>
											<IconGroup className="h-6 w-6" />
											<span>{group.name}</span>
										</a>
									</Link>
								</li>
							))}
							{ (myGroups.length > displayedGroups.length) && <li role="button">
								<button
									onClick={onOpenUpgradeDialog}
									className="w-full flex space-x-2 py-1.5 px-2 rounded-md flex-1 transition-all hover:text-primary-500 hover:bg-slate-200 hover:text-primary-500"
								>
									<IconGroupPlus className="h-6 w-6" title="Create Group" />
									<span>Unlock All Your Groups</span>
								</button>
							</li> }
							<li role="button">
								<button
									onClick={onOpenCreateGroupDialog}
									className="w-full flex space-x-2 py-1.5 px-2 rounded-md flex-1 transition-all text-primary-500 hover:bg-slate-200 hover:text-primary-500"
								>
									<IconGroupPlus className="h-6 w-6" title="Create Group" />
									<span>Create Group</span>
								</button>
							</li>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>

			<ElemUpgradeDialog
				isOpen={isOpenUpgradeDialog}
				onClose={onCloseUpgradeDialog}
			/>

			<ElemCreateGroupDialog
				isOpen={isOpenCreateGroupDialog}
				onClose={onCloseCreateGroupDialog}
			/>
		</div>
	);
};

export default ElemMyGroupsMenu;
