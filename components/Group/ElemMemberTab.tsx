import { Fragment } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Menu, Transition } from "@headlessui/react";
import { IconPlus, IconEllipsisHorizontal } from "@/components/Icons";
import { User_Groups, User_Group_Members } from "@/graphql/types";
import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";
import { useUser } from "@/context/userContext";

type Props = {
	group: User_Groups;
	onUpdateGroupData: (data: any) => void;
};

const ElemMemberTab: React.FC<Props> = ({ group, onUpdateGroupData }) => {
	const router = useRouter();
	const { user } = useUser();
	const isGroupManager = user?.id === group.created_by_user_id;

	const { mutate: makeGroupManager } = useMutation(
		(userId: number) =>
			fetch("/api/groups/", {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: group.id,
					payload: {
						created_by_user_id: userId,
					},
				}),
			}),
		{
			onSuccess: async (response) => {
				if (response.status === 200) {
					const data = await response.json();
					onUpdateGroupData((prev: User_Groups) => ({
						...prev,
						created_by_user_id: data.created_by_user_id,
						created_by: data.created_by,
					}));
				}
			},
		}
	);

	const { mutate: deleteMember } = useMutation(
		(memberId: number) =>
			fetch("/api/delete_group_member/", {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: memberId,
				}),
			}),
		{
			onSuccess: (_, memberId) => {
				onUpdateGroupData((prev: User_Groups) => ({
					...prev,
					user_group_members: prev.user_group_members.filter(
						(mem) => mem.id !== memberId
					),
				}));
			},
		}
	);

	const handleViewProfile = (slug: string | undefined) => {
		if (slug) {
			router.push(`/people/${slug}`);
		}
	};

	const handleMakeGroupManager = (memberId: number) => {
		makeGroupManager(memberId);
	};

	const handleRemoveFromGroup = (memberId: number) => {
		deleteMember(memberId);
	};

	return (
		<div className="bg-white rounded-lg border border-black/10 divide-y divide-black/10 overflow-hidden">
			<div className="hover:bg-slate-100">
				<ElemButton
					btn="transparent"
					className="flex items-center gap-x-2 w-full px-4 py-3 !justify-start"
				>
					<div className="p-2 bg-primary-100 rounded-md">
						<IconPlus className="w-6 h-6 text-primary-500" />
					</div>
					<p className="font-bold text-primary-500">Add People</p>
				</ElemButton>
			</div>

			{group.user_group_members.map((member: User_Group_Members) => (
				<div
					key={member.id}
					className="flex items-center justify-between px-4 py-3 cursor-pointer group hover:bg-slate-100"
				>
					<div className="flex items-center gap-x-2">
						{member.user.person?.picture ? (
							<ElemPhoto
								wrapClass="w-10 h-10 aspect-square shrink-0 bg-white overflow-hidden bg-slate-100 rounded-lg"
								imgClass="object-contain w-full h-full border border-slate-100 "
								photo={member.user.person?.picture}
								placeholder="user2"
								placeholderClass="text-slate-300"
								imgAlt={member.user.display_name}
							/>
						) : (
							<div className="flex items-center justify-center aspect-square w-10 rounded-lg bg-slate-200 text-dark-500 text-xl capitalize">
								{member.user.display_name?.charAt(0)}
							</div>
						)}

						<p className="font-bold">{member.user.display_name}</p>
					</div>
					{isGroupManager && member.user.id !== group.created_by_user_id && (
						<Menu as="div" className="relative inline-block text-left">
							<div>
								<Menu.Button>
									<IconEllipsisHorizontal className="w-6 h-6 bg-slate-200 rounded-full cursor-pointer opacity-0 hover:bg-slate-300 group-hover:opacity-100" />
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute right-0 mt-2 p-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									{member.user.person?.slug && (
										<Menu.Item>
											{({ active }) => (
												<button
													className={`${
														active
															? "bg-primary-500 text-white"
															: "text-slate-800"
													} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
													onClick={() =>
														handleViewProfile(member.user.person?.slug)
													}
												>
													View Profile
												</button>
											)}
										</Menu.Item>
									)}
									<Menu.Item>
										{({ active }) => (
											<button
												className={`${
													active
														? "bg-primary-500 text-white"
														: "text-slate-800"
												} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
												onClick={() => handleMakeGroupManager(member.user.id)}
											>
												Make Group Manager
											</button>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<button
												className={`${
													active ? "bg-primary-500 text-white" : "text-red-500"
												} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
												onClick={() => handleRemoveFromGroup(member.id)}
											>
												Remove from Group
											</button>
										)}
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>
					)}
				</div>
			))}
		</div>
	);
};

export default ElemMemberTab;
