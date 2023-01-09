import { IconSignOut, IconTrash } from "@/components/Icons";
import { useUser } from "@/context/userContext";
import { User_Groups } from "@/graphql/types";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import ElemSettingEditableField from "./ElemSettingEditableField";

type Props = {
	group: User_Groups;
	onUpdateGroupData: (data: any) => void;
};

const ElemSettingTab: React.FC<Props> = ({ group, onUpdateGroupData }) => {
	const router = useRouter();

	const { refetchMyGroups } = useUser();

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

	const { mutate } = useMutation(
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
		mutate();
	};

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

				<div
					className="flex items-start px-4 py-3 cursor-pointer space-x-1 hover:bg-slate-100"
					onClick={() => {}}
				>
					<IconSignOut className="w-6 h-6 text-red-500" />
					<p className="font-bold text-red-500">Leave Group</p>
				</div>
			</div>

			<div className="bg-white rounded-lg border border-black/10 divide-y divide-black/10 overflow-hidden mt-6">
				<div
					className="flex items-center px-4 py-3 cursor-pointer space-x-1 hover:bg-slate-100"
					onClick={handleDelete}
				>
					<IconTrash className="w-6 h-6 text-red-500" />
					<p className="font-bold text-red-500">Delete Group</p>
				</div>
			</div>
		</>
	);
};

export default ElemSettingTab;
