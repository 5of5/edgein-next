import React, {
	useState,
	useMemo,
	useRef,
	MutableRefObject,
	useEffect,
} from "react";
import { NextPage, GetServerSideProps } from "next";
import { DashboardLayout } from "@/components/Dashboard/dashboard-layout";
import { ElemTabBar } from "@/components/elem-tab-bar";
import { ElemGroupInformation } from "@/components/Group/elem-group-information";
import { ElemLists } from "@/components/Group/elem-lists";
import { ElemNotes } from "@/components/Group/elem-notes";
import ElemInviteDialog from "@/components/Group/elem-invite-dialog";
import ElemSettingDialog, {
	SettingTabProps,
} from "@/components/Group/elem-setting-dialog";
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

type Props = {
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
			//{ name: "Home", ref: homeRef },
			{ name: "Lists", ref: listsRef },
			{ name: "Notes", ref: notesRef },
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

	return (
		<DashboardLayout>
			{/* <div ref={homeRef} /> */}

			<ElemGroupInformation
				group={groupData}
				onInvite={onOpenInviteDialog}
				onOpenSettingDialog={onOpenSettingDialog}
			/>

			<ElemTabBar
				className="mt-2 border-t-0"
				tabs={tabBarItems}
				showDropdown={false}
			/>
			<div ref={listsRef}>
				<ElemLists
					group={groupData}
					lists={
						(lists?.list_user_groups?.map(
							(item) => item.list
						) as Array<Lists>) || []
					}
					refetchLists={refetchLists}
				/>
			</div>

			<div ref={notesRef}>
				<ElemNotes notes={props.notes} />
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
		</DashboardLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const token = CookieService.getAuthToken(context.req.cookies);
	const user = await CookieService.getUser(token);

	const { data } = await runGraphQl<GetGroupQuery>(GetGroupDocument, {
		id: context.params?.groupId,
	});

	if (!data?.user_groups[0]) {
		return {
			notFound: true,
		};
	}

	const group = data.user_groups[0];

	const isUserBelongToGroup = group.user_group_members.find(
		(mem) => mem.user.id === user?.id
	);
	if (!isUserBelongToGroup) {
		return {
			notFound: true,
		};
	}

	const { data: noteList } = await runGraphQl<GetNotesQuery>(GetNotesDocument, {
		where: { user_group_id: { _eq: group.id } },
	});

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
			group,
			notes,
		},
	};
};

export default Group;
