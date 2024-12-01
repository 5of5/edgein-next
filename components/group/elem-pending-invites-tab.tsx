import { useMutation } from 'react-query';
import { IconEllipsisVertical } from '@/components/icons';
import { User_Groups, User_Group_Invites } from '@/graphql/types';
import { ElemPhoto } from '@/components/elem-photo';
import { useUser } from '@/context/user-context';
import { ElemDropdown } from '../elem-dropdown';
import toast from 'react-hot-toast';

type Props = {
  group: User_Groups;
  onUpdateGroupData: (data: any) => void;
};

const ElemPendingInvitesTab: React.FC<Props> = ({
  group,
  onUpdateGroupData,
}) => {
  const { user } = useUser();
  const isGroupManager = user?.id === group.created_by_user_id;

  const pendingInvites = group.user_group_invites.filter(
    invite =>
      !group.user_group_members.some(
        member => member.user?.email === invite.email,
      ),
  );

  const { mutate: deleteInvite } = useMutation(
    (inviteId: number) =>
      fetch('/api/delete-group-invite/', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: inviteId,
        }),
      }),
    {
      onSuccess: (_, inviteId) => {
        onUpdateGroupData((prev: User_Groups) => ({
          ...prev,
          user_group_invites: prev.user_group_invites.filter(
            item => item.id !== inviteId,
          ),
        }));
        toast.custom(
          t => (
            <div
              className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                t.visible ? 'animate-fade-in-up' : 'opacity-0'
              }`}>
              Invite removed
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

  const handleRemoveInvite = (memberId: number) => {
    deleteInvite(memberId);
  };

  return (
    <div className="bg-dark-100 border divide-y rounded-lg border-black/10 divide-black/10">
      {pendingInvites.length === 0 ? (
        <p className="px-4 py-3">No pending invites.</p>
      ) : (
        pendingInvites.map((invite: User_Group_Invites) => {
          const isInviteSender = user?.id === invite.created_by_user_id;
          const inviteLinks = [
            ...(isGroupManager || isInviteSender
              ? [
                  {
                    id: 2,
                    label: 'Remove Invite',
                    value: 'remove_invite',
                    onClick: () => {
                      handleRemoveInvite(invite.id);
                    },
                  },
                ]
              : []),
          ];

          const theInvite = (
            <div className="flex items-center justify-between px-4 py-3 cursor-pointer group">
              <div className="flex items-center gap-x-2">
                <ElemPhoto
                  wrapClass="w-10 h-10 aspect-square shrink-0 bg-dark-100 overflow-hidden rounded-full"
                  imgClass=" w-full h-full border border-gray-200"
                  placeholder="user"
                  placeholderClass="text-gray-300"
                  imgAlt={invite.email}
                />

                <p>{invite.email}</p>
              </div>
              {(isGroupManager || isInviteSender) && (
                <div className="opacity-30 group-hover:opacity-100">
                  <IconEllipsisVertical className="w-6 h-6" />
                </div>
              )}
            </div>
          );

          return (
            <div key={invite.id}>
              <ElemDropdown
                customButton={theInvite}
                placement="bottom-end"
                buttonClass="w-full"
                defaultItem={null}
                items={inviteLinks}
                itemsShowIcons={false}
                className="relative flex w-full text-left hover:bg-neutral-900"
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default ElemPendingInvitesTab;
