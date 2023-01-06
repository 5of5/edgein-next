import React, { useState, useMemo, useRef, MutableRefObject } from "react";
import { NextPage, GetServerSideProps } from "next";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { ElemTabBar } from "@/components/ElemTabBar";
import { ElemGroupInformation } from "@/components/Group/ElemGroupInformation";
import { ElemLists } from "@/components/Group/ElemLists";
import { ElemNotes } from "@/components/Group/ElemNotes";
import ElemInviteDialog from "@/components/Group/ElemInviteDialog";
import ElemSettingDialog from "@/components/Group/ElemSettingDialog";
import { runGraphQl } from "@/utils";
import { GetGroupDocument, GetGroupQuery, User_Groups } from "@/graphql/types";

type Props = {
	group: User_Groups;
};

const Group: NextPage<Props> = (props: Props) => {
	const homeRef = useRef() as MutableRefObject<HTMLDivElement>;
	const listsRef = useRef() as MutableRefObject<HTMLDivElement>;
	const notesRef = useRef() as MutableRefObject<HTMLDivElement>;
	const chatRef = useRef() as MutableRefObject<HTMLDivElement>;
	const settingsRef = useRef() as MutableRefObject<HTMLDivElement>;

	const [isOpenInviteDialog, setIsOpenInviteDialog] = useState(false);

	const [isOpenSettingDialog, setIsOpenSettingDialog] = useState(false);

	const tabBarItems = useMemo(() => {
		return [
			{ name: "Home", ref: homeRef },
			{ name: "Lists", ref: listsRef },
			{ name: "Notes", ref: notesRef },
			{ name: "Chat", ref: chatRef },
			{ name: "Settings", ref: settingsRef },
		];
	}, []);

	const onOpenInviteDialog = () => {
		setIsOpenInviteDialog(true);
	};

	const onCloseInviteDialog = () => {
		setIsOpenInviteDialog(false);
	};

	const onOpenSettingDialog = () => {
		setIsOpenSettingDialog(true);
	};

	const onCloseSettingDialog = () => {
		setIsOpenSettingDialog(false);
	};

	return (
		<DashboardLayout>
			<div ref={homeRef} />

			{/** TO-DO: Group's name | Members | Social links */}
			<ElemGroupInformation
				group={props.group}
				onInvite={onOpenInviteDialog}
				onOpenSettingDialog={onOpenSettingDialog}
			/>

			{/** TO-DO: Home | Lists | Notes | Chat | Settings */}
			<ElemTabBar className="mt-2 border-t-0" tabs={tabBarItems} />
			<div ref={listsRef}>
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
			</div>

			<div ref={notesRef}>
				<ElemNotes />
			</div>

			<div ref={chatRef} />
			<div ref={settingsRef} />

			{/** TO-DO:Notes */}

			<ElemInviteDialog
				isOpen={isOpenInviteDialog}
				group={props.group}
				onClose={onCloseInviteDialog}
			/>

			<ElemSettingDialog
				isOpen={isOpenSettingDialog}
				group={props.group}
				onClose={onCloseSettingDialog}
			/>
		</DashboardLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data } = await runGraphQl<GetGroupQuery>(GetGroupDocument, {
		id: context.params?.groupId,
	});

	if (!data?.user_groups[0]) {
		return {
			notFound: true,
		};
	}

	const group = data.user_groups[0];

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
		},
	};
};

export default Group;
