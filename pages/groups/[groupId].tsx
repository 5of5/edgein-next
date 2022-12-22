import React, { useState, useMemo, useRef, MutableRefObject } from "react";
import { NextPage } from "next";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { ElemTabBar } from "@/components/ElemTabBar";
import { ElemGroupInformation } from "@/components/Group/ElemGroupInformation";
import { ElemLists } from "@/components/Group/ElemLists";
import { ElemNotes } from "@/components/Group/ElemNotes";
import ElemInviteDialog from "@/components/Group/ElemInviteDialog";

type Props = {};

const Group: NextPage<Props> = (props: Props) => {
	const homeRef = useRef() as MutableRefObject<HTMLDivElement>;
	const listsRef = useRef() as MutableRefObject<HTMLDivElement>;
	const notesRef = useRef() as MutableRefObject<HTMLDivElement>;
	const chatRef = useRef() as MutableRefObject<HTMLDivElement>;
	const settingsRef = useRef() as MutableRefObject<HTMLDivElement>;

	const [isOpenInviteDialog, setIsOpenInviteDialog] = useState(false);

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

	return (
		<DashboardLayout>
			<div ref={homeRef} />

			{/** TO-DO: Group's name | Members | Social links */}
			<ElemGroupInformation onInvite={onOpenInviteDialog} />

			{/** TO-DO: Home | Lists | Notes | Chat | Settings */}
			<ElemTabBar className="mt-12 border-t-0" tabs={tabBarItems} />
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
				groupName="Neat Protocol Wizards"
				onClose={onCloseInviteDialog}
			/>
		</DashboardLayout>
	);
};

export default Group;
