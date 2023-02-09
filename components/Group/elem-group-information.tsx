import React, { MutableRefObject, useRef, useState, useEffect } from "react";
import {
	IconProps,
	IconGroup,
	IconChevronDownMini,
	IconTwitter,
	IconTelegram,
	IconDiscord,
	IconUserPlus,
} from "@/components/Icons";
import { ElemButton } from "@/components/elem-button";
import { User_Groups } from "@/graphql/types";
import { ElemMemberAvatarList } from "@/components/Group/elem-member-avatar-list";
import { SettingTabProps } from "./elem-setting-dialog";

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
	const [descriptionShowAll, setDescriptionShowAll] = useState(false);
	const descriptionDiv = useRef() as MutableRefObject<HTMLDivElement>;
	const [descriptionDivHeight, setDescriptionDivHeight] = useState(0);

	useEffect(() => {
		if (group.description) {
			setDescriptionDivHeight(descriptionDiv.current.scrollHeight);
		}
	}, [group.description]);

	let groupLinks: {
		icon?: React.FC<IconProps>;
		link?: string;
		text: string;
		target?: string;
	}[] = [];

	if (group.twitter) {
		groupLinks.push({
			icon: IconTwitter,
			text: "Twitter",
			link: group.twitter,
		});
	}

	if (group.telegram) {
		groupLinks.push({
			icon: IconTelegram,
			text: "Telegram",
			link: group.telegram,
		});
	}

	if (group.discord) {
		groupLinks.push({
			icon: IconDiscord,
			text: "Discord",
			link: group.discord,
		});
	}

	return (
		<div>
			<div className="flex items-center justify-between">
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
						className="gap-x-1 px-1.5 sm:px-4"
						onClick={onInvite}
					>
						<IconUserPlus className="w-5 h-5" />
						<span className="hidden sm:inline">Add People</span>
					</ElemButton>
				</div>
			</div>

			{group?.description && (
				<div className="">
					<p
						ref={descriptionDiv}
						className={`block max-w-lg text-slate-600 mt-4 lg:mt-1 ${
							!descriptionShowAll && "line-clamp-1"
						}`}
					>
						{group?.description}
					</p>

					{descriptionDivHeight > 24 && !descriptionShowAll && (
						<button
							type="button"
							onClick={() => setDescriptionShowAll(!descriptionShowAll)}
							className="inline text-primary-500"
						>
							See {descriptionShowAll ? "less" : "more"}
						</button>
					)}
				</div>
			)}

			{groupLinks.length > 0 && (
				<ul className="flex items-center gap-x-4 mt-2">
					{groupLinks?.map((item, index) => {
						return (
							<li key={index}>
								<a
									href={item.link}
									className="flex items-center gap-x-1"
									target={item.target ? item.target : "_blank"}
									rel="noreferrer"
								>
									{item.icon && (
										<item.icon title={item.text} className="w-6 h-6" />
									)}
									<span className="text-slate-600 hover:text-primary-500">
										{item.text}
									</span>
								</a>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};
