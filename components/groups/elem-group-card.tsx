import { User_Groups } from "@/graphql/types";
import { FC, useEffect, useState } from "react";
import { ElemButton } from "@/components/elem-button";
import { ElemPhoto } from "@/components/elem-photo";
import moment from "moment-timezone";
import Link from "next/link";
import {
	List_User_Groups_Bool_Exp,
	useGetListUserGroupsQuery,
} from "@/graphql/types";

type Props = {
	group: User_Groups;
};

export const ElemGroupCard: FC<Props> = ({ group }) => {
	const [groupData, setGroupData] = useState(group);

	useEffect(() => {
		setGroupData(group);
	}, [group]);

	const formatDateShown = (date: Date, timezone?: string) => {
		const local_date = moment(date).local().format("YYYY-MM-DD");
		return moment(local_date).format("LL");
	};

	const {
		id,
		name,
		created_at,
		description,
		created_by,
		updated_at,
		user_group_members,
		notes,
	} = groupData;

	const { data: lists } = useGetListUserGroupsQuery(
		{
			where: {
				user_group_id: { _eq: id },
			} as List_User_Groups_Bool_Exp,
		},
		{
			enabled: Boolean(id),
		}
	);

	return (
		<div className="flex flex-col mx-auto w-full p-4 bg-white border border-black/10 rounded-lg shadow">
			<div className="flex shrink-0 w-full mb-2">
				<Link href={`/groups/${id}`} passHref>
					<a className="font-bold break-words leading-none line-clamp-2 border-b border-primary-500 transition-all hover:border-b-2 hover:text-primary-500">
						{name}
					</a>
				</Link>
			</div>

			<div className="grow">
				<p className="inline text-slate-600 text-sm">
					{user_group_members.length > 0 && (
						<>
							{user_group_members.length}
							{user_group_members.length > 1 ? " Members" : " Member"}
						</>
					)}

					{lists?.list_user_groups && (
						<>
							{lists?.list_user_groups?.length > 0 && (
								<>
									{" • "}
									{lists?.list_user_groups?.length}
									{lists?.list_user_groups?.length > 1 ? " Lists" : " List"}
								</>
							)}
						</>
					)}

					{notes?.length > 0 && (
						<>
							{" • "}
							{notes.length}
							{notes.length > 1 ? " Notes" : " Note"}
						</>
					)}
				</p>

				<p className="text-primary-500 text-sm">
					Updated {formatDateShown(updated_at)}
				</p>

				{/* <p className="text-slate-600 text-sm">
					Created {formatDateShown(group.created_at)} by{" "}
					{created_by?.display_name}
				</p> */}

				<div className="flex items-center mt-4 pl-1">
					<ul
						className="flex -space-x-3 overflow-hidden cursor-pointer"
						//onClick={onClick}
					>
						{user_group_members.slice(0, 6).map((mem, index) => (
							<li key={mem.id}>
								{mem.user.person?.picture ? (
									<ElemPhoto
										photo={mem.user.person?.picture}
										wrapClass="flex items-center justify-center aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8"
										imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
										imgAlt={mem.user.display_name}
									/>
								) : (
									<div
										className="flex items-center justify-center aspect-square w-8 rounded-full bg-slate-300 text-dark-500 border border-gray-50 text-lg capitalize"
										title={mem.user?.display_name ? mem.user?.display_name : ""}
									>
										{mem.user.display_name?.charAt(0)}
									</div>
								)}
							</li>
						))}
					</ul>
					<Link href={`/groups/${id}`} passHref>
						<a className="font-medium text-sm text-slate-600 ml-1 hover:underline">
							{user_group_members.length > 1
								? `${user_group_members.length} Members`
								: `${user_group_members.length} Member`}
						</a>
					</Link>
				</div>

				{/* {description && (
					<div className="grow mt-2">
						<div className="text-slate-600 text-sm line-clamp-5">
							{description}
						</div>
					</div>
				)} */}
			</div>
			<div
				className="flex items-center justify-between mt-4 gap-x-5"
				onClick={(e) => e.stopPropagation()}
			>
				<ElemButton onClick={() => {}} btn="slate" size="sm" className="w-full">
					Join group
				</ElemButton>
			</div>
		</div>
	);
};
