import React from "react";
import {
	IconGroup,
	IconChevronDownMini,
	IconTwitter,
	IconTelegram,
	IconDiscord,
	IconUserPlus,
} from "@/components/Icons";
import { ElemButton } from "@/components/ElemButton";
import { User_Groups } from "@/graphql/types";
import { ElemMemberAvatarList } from "@/components/Group/ElemMemberAvatarList";
import { SettingTabProps } from "./ElemSettingDialog";

type Props = {
	group: User_Groups;
	onInvite: () => void;
	onOpenSettingDialog: (tab?: SettingTabProps) => void;
};

export const ElemGroupInformation: React.FC<Props> = ({
	group,
	onInvite,
	onOpenSettingDialog,
}) => {
	return (
		<div>
			<div className="flex items-start justify-between">
				<div>
					<button
						type="button"
						className="flex items-center rounded-lg px-1 py-0.5 hover:text-primary-500 hover:bg-slate-200"
						onClick={() => onOpenSettingDialog("settings")}
					>
						<IconGroup className="w-6 h-6 mr-1" />
						<span className="font-bold text-xl capitalize">{group.name}</span>
						<IconChevronDownMini className="h-5 w-5" />
					</button>
					<p className="max-w-lg text-slate-600">{group?.description}</p>
				</div>
				<div className="flex items-center gap-x-2 shrink-0">
					<ElemMemberAvatarList
						members={group.user_group_members}
						onClick={() => onOpenSettingDialog("members")}
					/>
					<span className="font-bold">{group.user_group_members.length}</span>
					<ElemButton
						btn="primary"
						className="gap-x-1 px-1.5 sm:px-4"
						onClick={onInvite}
					>
						<IconUserPlus className="w-5 h-5" />
						<span className="hidden sm:inline">Add People</span>
					</ElemButton>
				</div>
			</div>

			{(group?.twitter || group?.telegram || group?.discord) && (
				<ul className="flex items-center gap-x-4 mt-2">
					{group?.twitter && (
						<li>
							<a href={group.twitter} className="flex items-center gap-x-1">
								<IconTwitter className="w-6 h-6" />
								<span className="text-primary-500">Twitter</span>
							</a>
						</li>
					)}

					{group?.telegram && (
						<li>
							<a href={group.telegram} className="flex items-center gap-x-1">
								<IconTelegram className="w-6 h-6" />
								<span className="text-primary-500">Telegram</span>
							</a>
						</li>
					)}

					{group?.discord && (
						<li>
							<a href={group.discord} className="flex items-center gap-x-1">
								<IconDiscord className="w-6 h-6" />
								<span className="text-primary-500">Discord</span>
							</a>
						</li>
					)}
				</ul>
			)}
		</div>
	);
};
