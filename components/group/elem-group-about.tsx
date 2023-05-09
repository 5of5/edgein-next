import React from "react";
import {
	IconProps,
	IconGlobe,
	IconTwitter,
	IconTelegram,
	IconDiscord,
	IconLockClosed,
} from "@/components/icons";
import { User_Groups } from "@/graphql/types";
import Link from "next/link";
import { ElemPhoto } from "@/components/elem-photo";

type Props = {
	className?: string;
	isUserBelongToGroup: boolean;
	group: User_Groups;
};

export const ElemGroupAbout: React.FC<Props> = ({
	className = "",
	isUserBelongToGroup,
	group,
}) => {
	const isPublicGroup = group.public;
	const groupAdmins = group.user_group_members.filter(
		(member) => member?.user?.id === group?.created_by_user_id
	);

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
		<>
			<div className={className}>
				<div className="bg-white shadow rounded-lg px-4 py-4 shrink-0">
					<div>
						<h2 className="text-lg font-bold">About Group</h2>
					</div>
					{group?.description && (
						<p className="text-gray-400 mb-3">{group?.description}</p>
					)}

					{isPublicGroup ? (
						<div className="flex text-sm">
							<IconGlobe className="w-5 h-5 mr-2 text-gray-400" />
							<div>
								<h4 className="font-bold">Public</h4>
								<p className="text-gray-400">Anyone can find this group.</p>
							</div>
						</div>
					) : (
						<div className="flex text-sm">
							<IconLockClosed className="w-5 h-5 mr-2 text-gray-400" />
							<div>
								<h4 className="font-bold">Private</h4>
								<p className="text-gray-400">
									Only members can see who&rsquo;s in the group and what they
									post.
								</p>
							</div>
						</div>
					)}

					{isUserBelongToGroup && groupLinks.length > 0 && (
						<ul className="mt-2 flex flex-col space-y-2">
							{groupLinks?.map((item, index) => {
								return (
									<li key={index}>
										<a
											href={item.link}
											className="flex items-center"
											target={item.target ? item.target : "_blank"}
											rel="noreferrer"
										>
											{item.icon && (
												<item.icon
													title={item.text}
													className="w-5 h-5 mr-2 text-gray-400"
												/>
											)}
											<span className="text-sm text-slate-600 hover:text-primary-500">
												{item.text}
											</span>
										</a>
									</li>
								);
							})}
						</ul>
					)}

					{groupAdmins && (
						<ul className="mt-4 overflow-hidden border-t pt-2 border-black/10">
							{groupAdmins.map((mem) => (
								<li key={mem.id}>
									<Link href={`/people/${mem.user.person?.slug}/`}>
										<a>
											{mem.user?.person?.picture ? (
												<ElemPhoto
													photo={mem.user?.person?.picture}
													wrapClass="flex items-center justify-center aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8"
													imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
													imgAlt={mem.user?.display_name}
												/>
											) : (
												<div
													className="flex items-center justify-center aspect-square w-8 rounded-full bg-slate-300 text-dark-500 border border-gray-50 text-lg capitalize"
													title={
														mem.user?.display_name ? mem.user?.display_name : ""
													}
												>
													{mem.user.display_name?.charAt(0)}
												</div>
											)}
										</a>
									</Link>
									<p className="text-sm text-gray-400">
										<span className="capitalize">
											{mem.user?.display_name ? mem.user?.display_name : ""}
										</span>{" "}
										is an admin.
									</p>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
};
