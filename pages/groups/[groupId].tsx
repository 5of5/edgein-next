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
	User_Groups,
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

	// const homeRef = useRef() as MutableRefObject<HTMLDivElement>;
	//const listsRef = useRef() as MutableRefObject<HTMLDivElement>;
	const notesRef = useRef() as MutableRefObject<HTMLDivElement>;
	const chatRef = useRef() as MutableRefObject<HTMLDivElement>;
	const settingsRef = useRef() as MutableRefObject<HTMLDivElement>;

	const [isOpenInviteDialog, setIsOpenInviteDialog] = useState(false);

	const [isOpenSettingDialog, setIsOpenSettingDialog] = useState(false);

	const tabBarItems = useMemo(() => {
		return [
			//{ name: "Home", ref: homeRef },
			// { name: "Lists", ref: listsRef },
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

			{/** TO-DO: Home | Lists | Chat */}
			<ElemTabBar className="mt-2 border-t-0" tabs={tabBarItems} />
			{/* <div ref={listsRef}>
				<ElemLists
					lists={[
						{
							id: "1",
							name: "Near Protocol Wizards",
							createdBy: "Ashley Brown",
							createdAt: "2022-10-05T14:48:00.000Z",
							following: false,
						},
						{
							id: "2",
							name: "Near Protocol technology",
							createdBy: "Ed Parsons",
							createdAt: "2022-12-05T14:48:00.000Z",
							following: true,
						},
					]}
				/>
			</div> */}

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
