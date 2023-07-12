import React, {
  useState,
  useMemo,
  useRef,
  MutableRefObject,
  useEffect,
} from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useMutation } from 'react-query';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ElemTabBar } from '@/components/elem-tab-bar';
import { ElemGroupInformation } from '@/components/group/elem-group-information';
import { ElemGroupAbout } from '@/components/group/elem-group-about';
import { ElemLists } from '@/components/group/elem-lists';
import { ElemNotes } from '@/components/group/elem-notes';
import ElemInviteDialog from '@/components/group/elem-invite-dialog';
import ElemSettingDialog, {
  SettingTabProps,
} from '@/components/group/elem-setting-dialog';
import { runGraphQl } from '@/utils';
import CookieService from '@/utils/cookie';
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
} from '@/graphql/types';
import { IconUsers, IconLockClosed } from '@/components/icons';
import { ElemButton } from '@/components/elem-button';
import { useUser } from '@/context/user-context';

type Props = {
  group: User_Groups;
};

const Group: NextPage<Props> = (props: Props) => {
  const { user, refetchMyGroups } = useUser();

  const [groupData, setGroupData] = useState<User_Groups>(props.group);

  const [selectedSettingTab, setSelectedSettingTab] =
    useState<SettingTabProps>('settings');

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
    },
  );

  const { data: notes, refetch: refetchNotes } = useGetNotesQuery(
    {
      where: {
        user_group_id: { _eq: groupData.id },
      } as Notes_Bool_Exp,
    },
    {
      enabled: Boolean(groupData.id),
    },
  );

  const isUserBelongToGroup = groupData.user_group_members.some(
    mem => mem.user?.id === user?.id,
  );
  const isPublicGroup = groupData.public;
  const isPrivateGroup = !groupData.public && !isUserBelongToGroup;

  const notesRef = useRef() as MutableRefObject<HTMLDivElement>;
  const aboutRef = useRef() as MutableRefObject<HTMLDivElement>;
  const listsRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [isOpenInviteDialog, setIsOpenInviteDialog] = useState(false);

  const [isOpenSettingDialog, setIsOpenSettingDialog] = useState(false);

  const tabBarItems = useMemo(() => {
    return [
      { name: 'About', ref: aboutRef },
      { name: 'Lists', ref: listsRef },
      { name: 'Notes', ref: notesRef },
    ];
  }, []);

  const onOpenInviteDialog = () => {
    setIsOpenSettingDialog(false);
    setIsOpenInviteDialog(true);
  };

  const onCloseInviteDialog = () => {
    setIsOpenInviteDialog(false);
  };

  const onOpenSettingDialog = (selectedTab?: SettingTabProps) => {
    setSelectedSettingTab(selectedTab || 'settings');

    setIsOpenSettingDialog(true);
  };

  const onCloseSettingDialog = () => {
    setIsOpenSettingDialog(false);
  };

  const { mutate: addGroupMember, isLoading: isAddingGroupMember } =
    useMutation(
      async () => {
        const res = await fetch('/api/add-group-member/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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
          refetchMyGroups();
          refetchLists();
        },
      },
    );

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="border-b border-black/10">
        <ElemGroupInformation
          isUserBelongToGroup={isUserBelongToGroup}
          group={groupData}
          onInvite={onOpenInviteDialog}
          onOpenSettingDialog={onOpenSettingDialog}
          isAddingGroupMember={isAddingGroupMember}
          onAddGroupMember={() => addGroupMember()}
        />

        {isUserBelongToGroup && (
          <ElemTabBar
            className="mt-3 border-b-transparent lg:hidden"
            tabs={tabBarItems}
            showDropdown={false}
          />
        )}
      </div>

      <div className="mt-7 grid lg:grid-cols-11 lg:gap-7">
        <div className="mt-4 lg:mt-0 lg:col-span-7">
          <div ref={notesRef}>
            {isUserBelongToGroup && (
              <ElemNotes
                className="flex flex-col"
                notes={notes?.notes || []}
                refetchNotes={refetchNotes}
              />
            )}
          </div>

          {isPublicGroup && !isUserBelongToGroup && (
            <div className="bg-white shadow rounded-lg px-5 py-4">
              <div className="p-12 text-center">
                <IconUsers
                  className="mx-auto h-12 w-12 text-slate-300"
                  title="Join Group"
                />
                <h3 className="mt-2 text-lg font-bold">
                  Join this group to view and participate.
                </h3>
                <ElemButton
                  btn="primary"
                  loading={isAddingGroupMember}
                  onClick={() => addGroupMember()}
                  className="mt-2"
                >
                  Join group
                </ElemButton>
              </div>
            </div>
          )}

          {isPrivateGroup && !isUserBelongToGroup && (
            <div className="bg-white shadow rounded-lg px-5 py-4">
              <div className="p-12 text-center">
                <IconLockClosed
                  className="mx-auto h-12 w-12 text-slate-300"
                  title="Join Group"
                />
                <h3 className="mt-2 text-lg font-bold">Private Group</h3>
                <p>
                  Only members can see who’s in the group and what they post.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="order-first lg:order-none lg:col-span-4">
          <div className="flex flex-col space-y-4">
            <div ref={aboutRef}>
              <ElemGroupAbout
                isUserBelongToGroup={isUserBelongToGroup}
                onOpenSettingDialog={onOpenSettingDialog}
                group={groupData}
              />
            </div>

            <div ref={listsRef}>
              {isUserBelongToGroup && (
                <ElemLists
                  group={groupData}
                  lists={
                    (lists?.list_user_groups?.map(
                      item => item.list,
                    ) as Array<Lists>) || []
                  }
                  refetchLists={refetchLists}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ElemInviteDialog
        isOpen={isOpenInviteDialog}
        group={groupData}
        onUpdateGroupData={setGroupData}
        onClose={onCloseInviteDialog}
      />
      {(isUserBelongToGroup || isPublicGroup) && (
        <ElemSettingDialog
          isOpen={isOpenSettingDialog}
          selectedTab={selectedSettingTab}
          group={groupData}
          onClose={onCloseSettingDialog}
          onUpdateGroupData={setGroupData}
          onInvite={onOpenInviteDialog}
        />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const token = CookieService.getAuthToken(context.req.cookies);
  const user = await CookieService.getUser(token);

  const { data } = await runGraphQl<GetGroupQuery>(
    GetGroupDocument,
    {
      id: context.params?.groupId,
    },
    context.req.cookies,
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
