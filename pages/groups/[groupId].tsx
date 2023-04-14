import React, {
	useState,
	useMemo,
	useRef,
	MutableRefObject,
	useEffect,
} from "react";
import { NextPage, GetServerSideProps } from "next";
import { useMutation } from "react-query";
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
	User_Group_Members,
} from "@/graphql/types";
import { IconInformationCircle, IconLockClosed } from "@/components/Icons";
import { ElemButton } from "@/components/ElemButton";
import { useUser } from "@/context/userContext";

type Props = {
	group: User_Groups;
	notes: Array<Notes>;
};

const Group: NextPage<Props> = (props: Props) => {
	const { user } = useUser();

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

	const isUserBelongToGroup = groupData.user_group_members.some(
		(mem) => mem.user.id === user?.id
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

	const { mutate: addGroupMember, isLoading: isAddingGroupMember } =
    useMutation(
      async () => {
        const res = await fetch("/api/add_group_member/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groupId: groupData.id,
            userId: user?.id,
          }),
        });
        const apiResponse = await res.json();
        if (!res.ok) {
          throw apiResponse;
        } else {
          return apiResponse;
        }
      },
      {
        onSuccess: async (response: User_Group_Members) => {
          setGroupData((prev: User_Groups) => ({
            ...prev,
            user_group_members: [...prev.user_group_members, response],
          }));
        },
      }
    );

	if (!user) {
		return null;
	}

	if (isUserBelongToGroup) {
		return (
			<DashboardLayout>
				{/* <div ref={homeRef} /> */}
	
				<ElemGroupInformation
					isUserBelongToGroup={isUserBelongToGroup}
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
	}

	if (groupData.public) {
		return (
			<DashboardLayout>
			{/* <div ref={homeRef} /> */}
	
				<ElemGroupInformation
					isUserBelongToGroup={isUserBelongToGroup}
					group={groupData}
					onInvite={onOpenInviteDialog}
					onOpenSettingDialog={onOpenSettingDialog}
				/>
				<div className="flex items-center gap-1 w-full mt-7 p-5 bg-white shadow rounded-lg">
					<IconInformationCircle className="h-5 w-5" title="Private" />
					<p>Join group to explore more information</p>
					<ElemButton
						btn="primary"
						className="px-8 ml-4"
						loading={isAddingGroupMember}
						onClick={() => addGroupMember()}
					>
						Join
					</ElemButton>
				</div>
			</DashboardLayout>
		)
	}

	return (
		<DashboardLayout>
		{/* <div ref={homeRef} /> */}

			<ElemGroupInformation
				isUserBelongToGroup={isUserBelongToGroup}
				group={groupData}
				onInvite={onOpenInviteDialog}
				onOpenSettingDialog={onOpenSettingDialog}
			/>
			<div className="flex items-stretch gap-1 w-full mt-7 p-5 bg-white shadow rounded-lg">
				<IconLockClosed className="h-5 w-5" title="Private" />
				<p>This is a private group and you has not been invited to.</p>
			</div>
		</DashboardLayout>
	)
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
			group,
			notes,
		},
	};
};

export default Group;
