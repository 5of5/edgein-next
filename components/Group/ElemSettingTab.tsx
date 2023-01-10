import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useUser } from "@/context/userContext";
import { User_Groups } from "@/graphql/types";
import { IconSignOut, IconTrash, IconX } from "@/components/Icons";
import ElemSettingEditableField from "./ElemSettingEditableField";

type Props = {
	group: User_Groups;
	onUpdateGroupData: (data: any) => void;
};

const ElemSettingTab: React.FC<Props> = ({ group, onUpdateGroupData }) => {
	const router = useRouter();

	const { user, refetchMyGroups } = useUser();

	const [leaveError, setLeaveError] = useState<boolean>(false);

	const isGroupManager = user?.id === group.created_by_user_id;

	const fields = [
		{
			label: "Group Name",
			field: "name",
		},
		{
			label: "Description",
			field: "description",
		},
		{
			label: "Twitter",
			field: "twitter",
		},
		{
			label: "Telegram",
			field: "telegram",
		},
		{
			label: "Discord",
			field: "discord",
		},
	]

	const { mutate: deleteGroup } = useMutation(
		() =>
			fetch("/api/groups/", {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: group.id }),
			}),
		{
			onSuccess: () => {
				refetchMyGroups();
				router.push("/account");
			},
		}
	);

	const handleDelete = () => {
		deleteGroup();
	};

	const { mutate: leaveGroup } = useMutation(
    (memberId: number | undefined) =>
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
      onSuccess: () => {
        refetchMyGroups();
				router.push("/account");
      },
    }
  );

	const handleLeaveGroup = () => {
		if (user?.id === group.created_by_user_id) {
			setLeaveError(true);
		} else {
			const memberId = group.user_group_members.find(mem => mem.user.id === user?.id);
			leaveGroup(memberId?.id);
		}
	}

	return (
		<>
		
			<div className="bg-white rounded-lg border border-black/10 divide-y divide-black/10 overflow-hidden">
				{fields.map(item => (
					<ElemSettingEditableField
						key={item.field}
						label={item.label}
						field={item.field as keyof User_Groups}
						group={group}
						onUpdateGroupData={onUpdateGroupData}
					/>
				))}

				<div>
					<div
						className="flex items-start space-x-1 px-4 py-3 cursor-pointer hover:bg-slate-100"
						onClick={handleLeaveGroup}
					>
						<IconSignOut className="w-6 h-6 text-red-500" />
						<p className="font-bold text-red-500">Leave Group</p>
					</div>
					{leaveError && (
						<div className="flex justify-between px-4 pb-3 text-red-600 text-sm">
							<div>
								<p>You cannot leave the group when you are the group&apos;s manager.</p>
								<p>Please make another member as group manager then leave group or you can delete group.</p>
							</div>
							<span onClick={() => setLeaveError(false)}>
								<IconX className="w-4 h-4 text-slate-700 cursor-pointer" />
							</span>
						</div>
					)}
				</div>
			</div>

			{isGroupManager && (
				<div className="bg-white rounded-lg border border-black/10 divide-y divide-black/10 overflow-hidden mt-6">
					<div
						className="flex items-center px-4 py-3 cursor-pointer space-x-1 hover:bg-slate-100"
						onClick={handleDelete}
					>
						<IconTrash className="w-6 h-6 text-red-500" />
						<p className="font-bold text-red-500">Delete Group</p>
					</div>
				</div>
			)}
		</>
	);
};

export default ElemSettingTab;
