import { IconSignOut, IconTrash } from "@/components/Icons";
import { useUser } from "@/context/userContext";
import { User_Groups } from "@/graphql/types";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { ElemButton } from "../ElemButton";

type Props = {
	group: User_Groups;
};

const ElemSettingTab: React.FC<Props> = ({ group }) => {
	const router = useRouter();

	const { refetchMyGroups } = useUser();

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
				<div
					className="flex items-start justify-between px-4 py-3 cursor-pointer hover:bg-slate-100"
					onClick={() => {}}
				>
					<div>
						<p className="font-bold">Group Name</p>
						<p className="text-slate-500">{group.name}</p>
					</div>
					<div className="font-bold text-sm text-primary-500">Edit</div>
				</div>

				<div
					className="flex items-start justify-between px-4 py-3 cursor-pointer hover:bg-slate-100"
					onClick={() => {}}
				>
					<div>
						<p className="font-bold">Description</p>
						<p className="text-slate-500">{group.description}</p>
					</div>
					<div className="font-bold text-sm text-primary-500">Edit</div>
				</div>

				<div
					className="flex items-start justify-between px-4 py-3 cursor-pointer hover:bg-slate-100"
					onClick={() => {}}
				>
					<div>
						<p className="font-bold">Twitter</p>
						<p className="text-slate-500">{group.twitter}</p>
					</div>
					<div className="font-bold text-sm text-primary-500">Edit</div>
				</div>

				<div
					className="flex items-start justify-between px-4 py-3 cursor-pointer hover:bg-slate-100"
					onClick={() => {}}
				>
					<div>
						<p className="font-bold">Telegram</p>
						<p className="text-slate-500">{group.telegram}</p>
					</div>
					<div className="font-bold text-sm text-primary-500">Edit</div>
				</div>

				<div
					className="flex items-start justify-between px-4 py-3 cursor-pointer hover:bg-slate-100"
					onClick={() => {}}
				>
					<div>
						<p className="font-bold">Discord</p>
						<p className="text-slate-500">{group.discord}</p>
					</div>
					<div className="font-bold text-sm text-primary-500">Edit</div>
				</div>

				<div className="flex items-start px-4 py-3" onClick={() => {}}>
					<div>
						<p className="font-bold">Created by</p>
						<p className="text-slate-500">{`${
							group.created_by?.display_name
						} on ${moment(group.created_at).format("LL")}`}</p>
					</div>
				</div>

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
