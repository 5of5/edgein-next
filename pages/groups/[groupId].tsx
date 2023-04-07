import React, {
	useState,
	useMemo,
	useRef,
	MutableRefObject,
	useEffect,
} from "react";
import { NextPage, GetServerSideProps } from "next";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { ElemTabBar } from "@/components/ElemTabBar";
import { ElemGroupInformation } from "@/components/Group/ElemGroupInformation";
import { ElemLists } from "@/components/Group/ElemLists";
import { ElemNotes } from "@/components/Group/ElemNotes";
import ElemInviteDialog from "@/components/Group/ElemInviteDialog";
import ElemSettingDialog, {
	SettingTabProps,
} from "@/components/Group/ElemSettingDialog";
import { runGraphQl } from "@/utils";
import CookieService from "@/utils/cookie";
import {
	GetGroupDocument,
	GetGroupQuery,
	GetNotesDocument,
	GetNotesQuery,
	Notes,
	useGetListUserGroupsQuery,
	User_Groups,
	List_User_Groups_Bool_Exp,
	Lists,
} from "@/graphql/types";
import { IconLockClosed } from "@/components/Icons";

type Props = {
	isUserBelongToGroup: boolean;
	group: User_Groups;
	notes: Array<Notes>;
};

const Group: NextPage<Props> = (props: Props) => {
	const [groupData, setGroupData] = useState<User_Groups>(props.group);

	const [selectedSettingTab, setSelectedSettingTab] =
		useState<SettingTabProps>("settings");

	useEffect(() => {
		setGroupData(props.group);
	}, [props.group]);

	const { data: lists, refetch: refetchLists } = useGetListUserGroupsQuery(
		{
			where: {
				user_group_id: { _eq: groupData.id },
			} as List_User_Groups_Bool_Exp,
		},
		{
			enabled: Boolean(groupData.id),
		}
	);

	// const homeRef = useRef() as MutableRefObject<HTMLDivElement>;
	const listsRef = useRef() as MutableRefObject<HTMLDivElement>;
	const notesRef = useRef() as MutableRefObject<HTMLDivElement>;
	const chatRef = useRef() as MutableRefObject<HTMLDivElement>;
	const settingsRef = useRef() as MutableRefObject<HTMLDivElement>;

	const [isOpenInviteDialog, setIsOpenInviteDialog] = useState(false);

	const [isOpenSettingDialog, setIsOpenSettingDialog] = useState(false);

	const tabBarItems = useMemo(() => {
		return [
			{ name: "Notes", ref: notesRef },
			{ name: "Lists", ref: listsRef },
			// { name: "Chat", ref: chatRef },
		];
	}, []);

	const onOpenInviteDialog = () => {
		setIsOpenInviteDialog(true);
	};

	const onCloseInviteDialog = () => {
		setIsOpenInviteDialog(false);
	};

	const onOpenSettingDialog = (selectedTab?: SettingTabProps) => {
		setSelectedSettingTab(selectedTab || "settings");

		setIsOpenSettingDialog(true);
	};

	const onCloseSettingDialog = () => {
		setIsOpenSettingDialog(false);
	};

	//mx-auto px-1 py-1 sm:px-3
	return (
		<DashboardLayout>
			<ElemGroupInformation
				isUserBelongToGroup={props.isUserBelongToGroup}
				group={groupData}
				onInvite={onOpenInviteDialog}
				onOpenSettingDialog={onOpenSettingDialog}
			/>

			{props.isUserBelongToGroup ? (
				<>
					<ElemTabBar
						className="block mt-2 border-t-0 lg:hidden"
						tabs={tabBarItems}
						showDropdown={false}
					/>
					<div className="border-t border-transparent lg:mt-7 lg:border-black/10 lg:flex lg:gap-x-4">
						<div ref={notesRef} className="flex justify-center flex-1">
							<ElemNotes
								className="flex flex-col max-w-2xl"
								notes={props.notes}
							/>
						</div>
						<div
							ref={listsRef}
							className="flex justify-center flex-1 lg:block lg:max-w-lg"
						>
							<ElemLists
								className="flex flex-col w-full max-w-2xl lg:max-w-lg"
								group={groupData}
								lists={
									(lists?.list_user_groups?.map(
										(item) => item.list
									) as Array<Lists>) || []
								}
								refetchLists={refetchLists}
							/>
						</div>
					</div>

					<div ref={chatRef} />

					<ElemInviteDialog
						isOpen={isOpenInviteDialog}
						group={groupData}
						onUpdateGroupData={setGroupData}
						onClose={onCloseInviteDialog}
					/>

					<ElemSettingDialog
						isOpen={isOpenSettingDialog}
						selectedTab={selectedSettingTab}
						group={groupData}
						onClose={onCloseSettingDialog}
						onUpdateGroupData={setGroupData}
						onInvite={onOpenInviteDialog}
					/>
				</>
			) : (
				<div className="flex items-stretch gap-1 w-full mt-7 p-5 bg-white shadow rounded-lg">
					<IconLockClosed className="h-5 w-5" title="Private" />
					<p>This is a private group and you has not been invited to.</p>
				</div>
			)}
		</DashboardLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const token = CookieService.getAuthToken(context.req.cookies);
	const user = await CookieService.getUser(token);

	const { data } = await runGraphQl<GetGroupQuery>(
		GetGroupDocument,
		{
			id: context.params?.groupId,
		},
		context.req.cookies
	);

	if (!data?.user_groups[0]) {
		return {
			notFound: true,
		};
	}

	const group = data.user_groups[0];

	const isUserBelongToGroup = group.user_group_members.some(
		(mem) => mem.user.id === user?.id
	);

	const { data: noteList } = await runGraphQl<GetNotesQuery>(
		GetNotesDocument,
		{
			where: { user_group_id: { _eq: group.id } },
		},
		context.req.cookies
	);

	const notes = noteList?.notes || [];

	let metaTitle = null;
	if (group.name) {
		metaTitle = group.name;
	}
	let metaDescription = null;
	if (group.description) {
		metaDescription = group.description;
	}

	return {
		props: {
			metaTitle,
			metaDescription,
			isUserBelongToGroup,
			group,
			notes,
		},
	};
};

export default Group;
