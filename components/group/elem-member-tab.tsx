import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { IconPlus, IconEllipsisVertical } from '@/components/icons';
import { User_Groups, User_Group_Members } from '@/graphql/types';
import { ElemButton } from '@/components/elem-button';
import { ElemPhoto } from '@/components/elem-photo';
import { useUser } from '@/context/user-context';
import { ROUTES } from '@/routes';
import { ElemDropdown } from '../elem-dropdown';
import toast from 'react-hot-toast';

type Props = {
  group: User_Groups;
  onUpdateGroupData: (data: any) => void;
  onInvite: () => void;
};

const ElemMemberTab: React.FC<Props> = ({
  group,
  onUpdateGroupData,
  onInvite,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const isGroupManager = user?.id === group.created_by_user_id;

  const { mutate: makeGroupManager } = useMutation(
    (userId: number) =>
      fetch('/api/groups/', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: group.id,
          payload: {
            created_by_user_id: userId,
          },
        }),
      }),
    {
      onSuccess: async response => {
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          onUpdateGroupData((prev: User_Groups) => ({
            ...prev,
            created_by_user_id: data.created_by_user_id,
            created_by: data.created_by,
          }));
        }
      },
    },
  );

  const { mutate: deleteMember } = useMutation(
    (memberId: number) =>
      fetch('/api/delete-group-member/', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: memberId,
        }),
      }),
    {
      onSuccess: (_, memberId) => {
        onUpdateGroupData((prev: User_Groups) => ({
          ...prev,
          user_group_members: prev.user_group_members.filter(
            mem => mem.id !== memberId,
          ),
        }));
        toast.custom(
          t => (
            <div
              className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                t.visible ? 'animate-fade-in-up' : 'opacity-0'
              }`}>
              Member removed from group
            </div>
          ),
          {
            duration: 3000,
            position: 'top-center',
          },
        );
      },
    },
  );

  const handleViewProfile = (slug: string | undefined) => {
    if (slug) {
      router.push(`${ROUTES.PEOPLE}/${slug}`);
    }
  };

  const handleMakeGroupManager = (memberId: number) => {
    makeGroupManager(memberId);
  };

  const handleRemoveFromGroup = (memberId: number) => {
    deleteMember(memberId);
  };

  return (
    <>
      <div className="bg-black border border-gray-200 divide-y divide-gray-200 rounded-lg">
        <div className="rounded-t-lg hover:bg-neutral-900">
          <ElemButton
            btn="transparent"
            className="flex items-center gap-x-2 w-full px-4 py-3 !justify-start"
            onClick={onInvite}>
            <div className="p-2 rounded-full bg-primary-500">
              <IconPlus className="w-6 h-6 text-white" />
            </div>
            <p className="text-base font-medium">Add People</p>
          </ElemButton>
        </div>

        {group.user_group_members.map((member: User_Group_Members) => {
          const memberLinks = [
            ...(member.user?.person?.slug
              ? [
                  {
                    id: 1,
                    label: 'View Profile',
                    value: 'view_profile',
                    onClick: () => {
                      handleViewProfile(member.user?.person?.slug);
                    },
                  },
                ]
              : []),
            ...(isGroupManager && member.user?.id !== group.created_by_user_id
              ? [
                  {
                    id: 2,
                    label: 'Make Group Admin',
                    value: 'make_group_admin',
                    onClick: () => {
                      handleMakeGroupManager(member.user!.id!);
                    },
                  },
                  {
                    id: 3,
                    label: 'Remove from Group',
                    value: 'remove_from_group',
                    onClick: () => {
                      handleRemoveFromGroup(member.id);
                    },
                  },
                ]
              : []),
          ];

          const theMember = (
            <div
              className={`flex items-center justify-between px-4 py-3 group ${
                memberLinks.length > 0 && 'cursor-pointer'
              }`}>
              <div className="flex items-center gap-x-2">
                {member.user?.person?.picture ? (
                  <ElemPhoto
                    wrapClass="w-10 h-10 aspect-square shrink-0 bg-black overflow-hidden rounded-full"
                    imgClass="object-contain w-full h-full border border-gray-200"
                    photo={member.user?.person?.picture}
                    placeholder="user"
                    placeholderClass="text-gray-300"
                    imgAlt={member.user?.display_name}
                  />
                ) : (
                  <div className="flex items-center justify-center w-10 text-xl capitalize bg-black rounded-full aspect-square text-dark-500">
                    {member.user?.display_name?.charAt(0)}
                  </div>
                )}

                <p className="capitalize">{member.user?.display_name}</p>
                {member.user?.id === group.created_by_user_id && (
                  <span>(Admin)</span>
                )}
              </div>

              {memberLinks.length > 0 && (
                <div className="opacity-30 group-hover:opacity-100">
                  <IconEllipsisVertical className="w-6 h-6" />
                </div>
              )}
            </div>
          );

          return (
            <div key={member.id}>
              {memberLinks && memberLinks.length > 0 ? (
                <ElemDropdown
                  customButton={theMember}
                  placement="bottom-end"
                  buttonClass="w-full"
                  defaultItem={null}
                  items={memberLinks}
                  itemsShowIcons={false}
                  className="relative flex w-full text-left hover:bg-neutral-900"
                />
              ) : (
                theMember
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ElemMemberTab;
