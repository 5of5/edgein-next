import React, {
	useState,
	useMemo,
	useRef,
	MutableRefObject,
	useEffect,
} from "react";
import { NextPage, GetServerSideProps } from "next";
import { useMutation } from "react-query";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ElemTabBar } from "@/components/elem-tab-bar";
import { ElemGroupInformation } from "@/components/group/elem-group-information";
import { ElemGroupAbout } from "@/components/group/elem-group-about";
import { ElemLists } from "@/components/group/elem-lists";
import { ElemNotes } from "@/components/group/elem-notes";
import ElemInviteDialog from "@/components/group/elem-invite-dialog";
import ElemSettingDialog, {
	SettingTabProps,
} from "@/components/group/elem-setting-dialog";
import { runGraphQl } from "@/utils";
import CookieService from "@/utils/cookie";
import {
	GetGroupDocument,
	GetGroupQuery,
	useGetListUserGroupsQuery,
	User_Groups,
	List_User_Groups_Bool_Exp,
	Lists,
	useGetNotesQuery,
	Notes_Bool_Exp,
	User_Group_Members,
} from "@/graphql/types";
import { IconInformationCircle } from "@/components/icons";
import { ElemButton } from "@/components/elem-button";
import { useUser } from "@/context/user-context";

type Props = {
	group: User_Groups;
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

	const { data: notes, refetch: refetchNotes } = useGetNotesQuery(
		{
			where: {
				user_group_id: { _eq: groupData.id },
			} as Notes_Bool_Exp,
		},
		{
			enabled: Boolean(groupData.id),
		}
	);

	const isUserBelongToGroup = groupData.user_group_members.some(
		(mem) => mem.user.id === user?.id
	);

	// const homeRef = useRef() as MutableRefObject<HTMLDivElement>;
	const aboutRef = useRef() as MutableRefObject<HTMLDivElement>;
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
			//{ name: "About", ref: aboutRef },
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
				<ElemGroupInformation
					isUserBelongToGroup={isUserBelongToGroup}
					group={groupData}
					onInvite={onOpenInviteDialog}
					onOpenSettingDialog={onOpenSettingDialog}
				/>

				<ElemTabBar
					className="border-t-transparent lg:hidden"
					tabs={tabBarItems}
					showDropdown={false}
				/>
				<div className="lg:flex lg:gap-x-4">
					<div ref={notesRef} className="mt-4 flex justify-center flex-1">
						<ElemNotes
							className="flex flex-col max-w-2xl w-full"
							notes={notes?.notes || []}
							refetchNotes={refetchNotes}
						/>
					</div>
					<div className="flex justify-center flex-1 lg:block lg:max-w-lg">
						<div className="flex flex-col space-y-4 w-full max-w-2xl lg:max-w-lg">
							<div ref={aboutRef}>
								<ElemGroupAbout
									className="mt-4 lg:mt-12"
									isUserBelongToGroup={isUserBelongToGroup}
									group={groupData}
								/>
							</div>

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
						</div>
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
			</DashboardLayout>
		);
	}

	if (groupData.public) {
		return (
			<DashboardLayout>
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
		);
	} else {
		return (
			<DashboardLayout>
				<ElemGroupInformation
					isUserBelongToGroup={isUserBelongToGroup}
					group={groupData}
					onInvite={onOpenInviteDialog}
					onOpenSettingDialog={onOpenSettingDialog}
				/>

				<div className="flex justify-center space-y-4 lg:justify-start">
					<div ref={aboutRef} className="w-full max-w-2xl lg:max-w-lg">
						<ElemGroupAbout
							className="mt-4"
							isUserBelongToGroup={isUserBelongToGroup}
							group={groupData}
						/>
					</div>
				</div>
			</DashboardLayout>
		);
	}
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
