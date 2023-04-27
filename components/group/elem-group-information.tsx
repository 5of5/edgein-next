import React from "react";
import {
	IconGroup,
	IconChevronDownMini,
	IconPlus,
} from "@/components/icons";
import { ElemButton } from "@/components/elem-button";
import { User_Groups } from "@/graphql/types";
import { ElemMemberAvatarList } from "@/components/group/elem-member-avatar-list";
import { SettingTabProps } from "./elem-setting-dialog";

type Props = {
	isUserBelongToGroup: boolean;
	group: User_Groups;
	onInvite: () => void;
	onOpenSettingDialog: (tab?: SettingTabProps) => void;
};

export const ElemGroupInformation: React.FC<Props> = ({
	isUserBelongToGroup,
	group,
	onInvite,
	onOpenSettingDialog,
}) => {
	return (
		<div className="flex items-center justify-between lg:border-b lg:pb-2 lg:border-black/10">
			{isUserBelongToGroup ? (
				<>
					<button
						type="button"
						className="flex items-center rounded-lg px-1 py-0.5 hover:text-primary-500 hover:bg-slate-200"
						onClick={() => onOpenSettingDialog("settings")}
					>
						<IconGroup className="w-6 h-6 mr-1" />
						<span className="font-bold text-xl capitalize">{group.name}</span>
						<IconChevronDownMini className="h-5 w-5" />
					</button>
					<div className="flex items-center gap-x-2 shrink-0">
						<ElemMemberAvatarList
							members={group.user_group_members}
							onClick={() => onOpenSettingDialog("members")}
						/>
						<span className="font-bold">{group.user_group_members.length}</span>
						<ElemButton
							btn="primary"
							className="gap-x-1 !pl-3"
							onClick={onInvite}
						>
							<IconPlus className="w-5 h-5" />
							<span className="hidden sm:inline">Invite</span>
						</ElemButton>
					</div>
				</>
			) : (
				<>
					<div className="flex items-center">
						<IconGroup className="w-6 h-6 mr-1" />
						<span className="font-bold text-xl capitalize">{group.name}</span>
					</div>
					{group.public && (
						<div className="flex items-center gap-x-2 shrink-0">
							<ElemMemberAvatarList
								members={group.user_group_members}
								onClick={() => {}}
							/>
							<span className="font-bold">
								{group.user_group_members.length}
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};
