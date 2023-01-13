import { Fragment } from "react";
import { useMutation } from "react-query";
import { Menu, Transition } from "@headlessui/react";
import { IconEllipsisHorizontal } from "@/components/Icons";
import { User_Groups, User_Group_Invites } from "@/graphql/types";
import { ElemPhoto } from "@/components/ElemPhoto";
import { useUser } from "@/context/userContext";

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
    (invite) =>
      !group.user_group_members.some(
        (member) => member.user.email === invite.email
      )
  );

  const { mutate: deleteInvite } = useMutation(
    (inviteId: number) =>
      fetch("/api/delete_group_invite/", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
            (item) => item.id !== inviteId
          ),
        }));
      },
    }
  );

  const handleRemoveInvite = (memberId: number) => {
    deleteInvite(memberId);
  };

  return (
    <div className="bg-white rounded-lg border border-black/10 divide-y divide-black/10">
      {pendingInvites.length === 0 ? (
        <p className="px-4 py-3">No pending invites.</p>
      ) : (
        pendingInvites.map((invite: User_Group_Invites) => {
          const theInvite = (
            <div
              className="flex items-center justify-between px-4 py-3 group"
              key={invite.id}
            >
              <div className="flex items-center gap-x-2">
                <ElemPhoto
                  wrapClass="w-10 h-10 aspect-square shrink-0 bg-white overflow-hidden bg-slate-100 rounded-lg"
                  imgClass="object-contain w-full h-full border border-slate-100 "
                  placeholder="user"
                  placeholderClass="text-slate-300"
                  imgAlt={invite.email}
                />

                <p className="font-bold">{invite.email}</p>
              </div>
              {isGroupManager && (
                <Menu as="div" className="relative flex text-left">
                  {({ open }) => (
                    <>
                      <Menu.Button
                        className={`${
                          open ? "opacity-100" : ""
                        } self-center justify-self-center w-6 h-6 bg-slate-200 rounded-full cursor-pointer opacity-0 hover:bg-slate-300 group-hover:opacity-100`}
                      >
                        <IconEllipsisHorizontal className="" />
                      </Menu.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 top-full mt-1 p-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-red-500 text-white"
                                    : "text-red-500"
                                } group flex w-full items-center rounded-md px-2 py-1.5 text-sm`}
                                onClick={() => handleRemoveInvite(invite.id)}
                              >
                                Remove
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              )}
            </div>
          );
          return theInvite;
        })
      )}
    </div>
  );
};

export default ElemPendingInvitesTab;
